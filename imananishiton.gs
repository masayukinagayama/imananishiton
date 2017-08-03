function myFunction() {
  var email = 'xxxxx'
  var token = 'xxxxx'
  var inEventEmoji = ':date:'
  var noEventEmoji = ':smile:'
  var ima = new Imananishiton(email, token, inEventEmoji, noEventEmoji)
  ima.nanishiton()
}

var Imananishiton = function(email, token, inEventEmoji, noEventEmoji) {
    this.email = email
    this.token = token
    this.inEventEmoji = inEventEmoji
    this.noEventEmoji = noEventEmoji
}

Imananishiton.prototype = {
  nanishiton: function() {
    var events = this.getCurrentEvents()
    var message = this.createStatusMessage(events[0])
    var emoji = this.createStatusEmoji(events[0])
    this.changeSlackStatus(message, emoji)
  },
  getCurrentEvents: function() {
    var start = new Date()
    var end = new Date(start.getTime() + 60 * 1000)
    var calendar = CalendarApp.getCalendarById(this.email)
    return calendar.getEvents(start, end)
  },
  holidaysInNextWeek: function() {
    var start = new Date()
    var weekAsMillisecond = 7 * 24 * 60 * 60 * 1000    
    var end = new Date(start.getTime() + weekAsMillisecond)
    var calendar = CalendarApp.getCalendarById(this.email)
    var events = calendar.getEvents(start, end)
            
    return events.filter(function(e) {
      return e.getTitle().indexOf('休暇') !== -1
    })
  },
  createHolidayStatusMessage: function(holidayEvents) {
    var formattedDate = function(event) {
      var day = Utilities.formatDate(event.getStartTime(), 'Asia/Tokyo', 'M/d')
      var dayOfWeekIndex = Utilities.formatDate(event.getStartTime(), 'Asia/Tokyo', 'u')
      var dayOfWeek = [ "日", "月", "火", "水", "木", "金", "土" ][dayOfWeekIndex % 7]

      return day + '(' + dayOfWeek + ')'
    }
    var convertToHolidayDescription = function(event) {
      var title = event.getTitle()
      if (title.indexOf('休暇') === -1) {
        return null
      }
      return title + formattedDate(event)            
    }
    return holidayEvents.map(convertToHolidayDescription).filter(function(e) { return e != null }).join(', ')
  },
  createStatusMessage: function(event) {
    var noEvent = !event || this.isPrivateEvent(event)
    if (noEvent) {
      var holidayEvents = this.holidaysInNextWeek()
      if (holidayEvents.length == 0) {
        return 'カレンダー予定：予定なし'        
      } else {
        return 'カレンダー予定：' + this.createHolidayStatusMessage(holidayEvents)
      }
    }
    var schedule = this.getEventSchedule(event)
    var message = 'カレンダー予定：' + event.getTitle()
    if (event.getLocation() !== '') {
      message += ' @ ' + event.getLocation()
    }
    return message + '【' + schedule['start'] + ' ～ ' + schedule['end'] + '】'
  },
  isPrivateEvent: function(event) {
    return event.getVisibility() !== CalendarApp.Visibility.DEFAULT
  },
  getEventSchedule: function(event) {
    return {
      start: Utilities.formatDate(event.getStartTime(), 'Asia/Tokyo', 'HH:mm'),
      end: Utilities.formatDate(event.getEndTime(), 'Asia/Tokyo', 'HH:mm'),
    }
  },
  createStatusEmoji: function(event) {
    if (!event || this.isPrivateEvent(event)) {
      return this.noEventEmoji
    } else {
      return this.inEventEmoji
    }
  },
  changeSlackStatus: function(message, emoji) {
    var profile = {
      'status_text': message,
      'status_emoji': emoji,
    }
    UrlFetchApp.fetch("https://slack.com/api/users.profile.set?token=" + this.token + "&profile=" + encodeURIComponent(JSON.stringify(profile)))
  },
}