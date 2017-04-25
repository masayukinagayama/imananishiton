function myFunction() {
  var email = 'xxxxx'
  var token = 'xxxxx'
  var ima = new Imananishiton(email, token)
  ima.nanishiton()
}

var Imananishiton = function(email, token) {
    this.email = email
    this.token = token
}

Imananishiton.prototype = {
  nanishiton: function() {
    var events = this.getCurrentEvents()
    var message = this.createStatusMessage(events[0])
    this.changeSlackStatus(message)
  },
  getCurrentEvents: function() {
    var start = new Date()
    var end = new Date(start.getTime() + 60 * 1000)
    var calendar = CalendarApp.getCalendarById(this.email)
    var events = calendar.getEvents(start, end)
    return events.filter(function(event) {
      return !event.isAllDayEvent()
    })
  },
  createStatusMessage: function(event) {
    if (!event || this.isPrivateEvent(event)) {
      return 'カレンダー予定：予定なし'
    }
    var schedule = this.getEventSchedule(event)
    var message = 'カレンダー予定：' + event.getTitle()
    if (event.getLocation() !== '') {
      message += ' @ ' + event.getLocation().substr(0, 20)
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
  changeSlackStatus: function(message) {
    var profile = {
      'status_text': message,
      'status_emoji': ':date:',
    }
    UrlFetchApp.fetch("https://slack.com/api/users.profile.set?token=" + this.token + "&profile=" + encodeURIComponent(JSON.stringify(profile)))
  },
}
