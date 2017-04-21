imananishiton
====
Slack status とGoogleCalendarを同期し、
現在の予定がstatusに表示されるようにします。

## Description
現在時刻と現在時刻の1分後の間に存在するスケジュールを取得し、
Slack status としてpushするプログラムです。
GASの分トリガーを使用することで、1分毎に実行を行うことが出来、
擬似的なリアルタイム更新を可能にしています。

## Demo
- 予定がある場合(場所の予約無し)

![demo](https://cloud.githubusercontent.com/assets/12445714/25271187/3cf48bc0-26be-11e7-99ae-d04c46db98f9.png)

- 予定がある場合(場所の予約有り) → @ で場所が表示されます

![demo2](https://cloud.githubusercontent.com/assets/12445714/25271399/02c79bbc-26bf-11e7-8b14-ddfb0cefbde8.png)

- 予定が無い場合 / 限定公開の予定が入っている場合

![demo3](https://cloud.githubusercontent.com/assets/12445714/25271400/02d69c16-26bf-11e7-83e6-daa16c2690ed.png)

## other
GogoleAppsScriptのトリガーにて、以下の通り設定を行って下さい。
- 実行：myFunction
- イベント：時間主導型/分タイマー/1分ごと

