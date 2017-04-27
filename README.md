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

## Installation

1. 適当なGoogle Spreadsheetを作成
2. ツール → スクリプトエディタ からスクリプトエディタを開く
3. テンプレートとして入力されているスクリプトを削除し、 `imananishiton.gs` の内容をコピペ
4. 以下の変数の内容を入れ替え
- var email = 'xxxxx'; ← 読み込ませたいGoogle Calendarのメールアドレス
- var token = 'xxxxx'; ← Slackのtoken（後述）
5. 実行ボタンを押し、自分のステータスが正常に変更されるか確認する
6. 編集 → 現在のスクリプトのトリガー を選択し、myFunctionをトリガーに設定する（後述）


### Slack tokenの取得方法

以下のリンクから `xoxp-xxxxxxxx-xxxxxxxx-xxxxxxxx` のような形式のtokenを得られます。<br>
**tokenは決して公開したり、リポジトリに含めたりしないでください**

https://api.slack.com/custom-integrations/legacy-tokens

### トリガーの設定

GogoleAppsScriptのトリガーにて、以下の通り設定を行って下さい。
- 実行：myFunction
- イベント：時間主導型/分タイマー/1分ごと

![func](https://cloud.githubusercontent.com/assets/12445714/25301893/bb21ccca-276c-11e7-880f-1daebd4146ed.png)

