function cal() {
  
  // ↓↓個人のデータに更新↓↓
  
  var address = "xxxxx";
  var token = "xoxp-xxxxx";
  var usrid = "Uxxxxx";
  
  //↑↑ここまで個人データ↑↑
  
  //↓↓ここからは更新不要↓↓
  
  //現在の時間と1分後の間におけるイベントを取得
  var cal = CalendarApp.getCalendarById(address);
  var start = new Date();
  var end = new Date();
  end.setMinutes(end.getMinutes() + 1);
  var events = cal.getEvents(
    new Date(start), 
    new Date(end));
  
  if(events.length > 0){ //イベントが存在した場合
    if(events[0].getLocation() == ""){ //イベントに場所が存在しなかった場合
      var Time = events[0].getStartTime();
      var Hour = Time.getHours();
      var Min = Time.getMinutes();
      var Time = events[0].getEndTime();
      var Hour2 = Time.getHours();
      var Min2 = Time.getMinutes();
      if(Hour < 10){
        Hour = "0"+ Hour;
      }
      if(Min < 10){
        Min = "0" + Min;
      }
      if(Hour2 < 10){
        Hour2 = "0"+ Hour2;
      }
      if(Min2 < 10){
        Min2 = "0" + Min2;
      }
      var statustext = "カレンダー予定：" + events[0].getTitle() + "【" + Hour + ":" + Min + " ～ "+ Hour2 + ":" + Min2 + "】";
      var emoji = "date";
      var url = "slack.com/api/users.profile.set?token=" + token + "&user=" + usrid + "&profile=%7B%22status_text%22%3A%22"+ statustext +"%22%2C%22status_emoji%22%3A%22%3A"+ emoji +"%3A%22%7D";
      UrlFetchApp.fetch(url);
    }else{ //イベントに場所が存在した場合
      var Time = events[0].getStartTime();
      var Hour = Time.getHours();
      var Min = Time.getMinutes();
      var Time = events[0].getEndTime();
      var Hour2 = Time.getHours();
      var Min2 = Time.getMinutes();
      if(Hour < 10){
        Hour = "0"+ Hour;
      }
      if(Min < 10){
        Min = "0" + Min;
      }
      if(Hour2 < 10){
        Hour2 = "0"+ Hour2;
      }
      if(Min2 < 10){
        Min2 = "0" + Min2;
      }
      var statustext = "カレンダー予定：" + events[0].getTitle() + " @ " + events[0].getLocation() + "【" + Hour + ":" + Min + " ～ "+ Hour2 + ":" + Min2 + "】";
      Logger.log(events[0].getStartTime());
      var emoji = "date";
      var url = "slack.com/api/users.profile.set?token=" + token + "&user=" + usrid + "&profile=%7B%22status_text%22%3A%22"+ statustext +"%22%2C%22status_emoji%22%3A%22%3A"+ emoji +"%3A%22%7D";
      UrlFetchApp.fetch(url);
    }
  }else{ //イベントが存在しない場合
    var statustext = "カレンダー予定：予定なし";
    var emoji = "date";
    var url = "slack.com/api/users.profile.set?token=" + token + "&user=" + usrid + "&profile=%7B%22status_text%22%3A%22"+ statustext +"%22%2C%22status_emoji%22%3A%22%3A"+ emoji +"%3A%22%7D";
    UrlFetchApp.fetch(url);
  }
  
}
