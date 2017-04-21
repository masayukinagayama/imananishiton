function myFunction() {
  var email = 'xxxxx'
  var token = 'xxxxx';

  events = getCalendarEvents(email);
  if (events.length == 0 || isPrivateEvent(events[0])) {
    statusMessage = createStatusMessage();
    changeSlackStatus(statusMessage, token);
    return;
  }

  schedule = getEventSchedule(events[0]);
  statusMessage = createStatusMessage(events[0], schedule);

  changeSlackStatus(statusMessage, token);
}

function changeSlackStatus(message, token) {
  var profile = {
    'status_text': message,
    'status_emoji': ':date:'
  };
  encodedProfile = encodeURIComponent(JSON.stringify(profile));
  UrlFetchApp.fetch("https://slack.com/api/users.profile.set?token=" + token + "&profile=" + encodedProfile);
}

function createStatusMessage(event, schedule) {
  if (!event) {
    return 'カレンダー予定：予定なし';
  }

  if (event.getLocation() != '') {
    return "カレンダー予定：" + event.getTitle() + " @ " + event.getLocation() + "【" + schedule['start'] + " ～ " + schedule['end'] + "】";
  } else {
    return "カレンダー予定：" + event.getTitle() + "【" + schedule['start'] + " ～ " + schedule['end'] + "】";
  }
}

function getEventSchedule(event) {
  return {
    start: Utilities.formatDate(event.getStartTime(), 'Asia/Tokyo', 'HH:mm'),
    end: Utilities.formatDate(event.getEndTime(), 'Asia/Tokyo', 'HH:mm')
  };
}

function isPrivateEvent(event) {
  if (event.getVisibility() != 'DEFAULT') {
    return true;
  }
  return false;
}

function getCalendarEvents(email) {
  var start = new Date();
  var end = new Date();
  end.setMinutes(end.getMinutes() + 1);

  var calendar = CalendarApp.getCalendarById(email);
  return calendar.getEvents(start, end);
}
