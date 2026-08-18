# うさうさ散歩（bunnysimulator）

恋愛ゲーム風ブラウザノベルゲーム「うさうさ散歩」の、拡張しやすいプロトタイプです。主人公は画面に登場する固定キャラクターではなく、遊んでいるプレイヤー本人です。

## ローカルで起動する

外部ライブラリやビルドは不要です。リポジトリのルートで簡易Webサーバーを起動してください。

```bash
python3 -m http.server 8000
```

ブラウザで <http://localhost:8000> を開きます。セーブデータはブラウザの `localStorage` に保存されます。

## ファイル構成

```text
index.html                    画面のHTML
css/style.css                 レイアウトと見た目
js/game.js                    画面遷移・ノベルエンジン
js/storage.js                 localStorageの読み書き
js/scenario.js                編集用シナリオデータ
assets/backgrounds/           背景画像
assets/characters/            立ち絵
```

## シナリオを追加する

`js/scenario.js` の `nodes` に、重複しない名前でノードを追加します。エンジン本体の変更は不要です。

台詞ノードでは `type: "line"`、話者 `speaker`、本文 `text`、次のノード名 `next` を設定します。背景と立ち絵を変える場面だけ `background` と `sprite` を指定してください。省略した場合は直前の画像を引き継ぎます。

```js
park_talk: {
  type: "line",
  speaker: "うさぴょん",
  text: "新しい台詞。",
  background: "assets/backgrounds/city-day.jpg",
  sprite: "assets/characters/usapyon.png",
  next: "next_node"
}
```

選択肢は `type: "choice"` にして、`choices` に表示文、分岐先、履歴保存用IDを並べます。

```js
sample_choice: {
  type: "choice",
  speaker: "うさぴょん",
  text: "どちらにする？",
  choices: [
    { text: "選択肢A", next: "route_a", recordAs: "route_a" },
    { text: "選択肢B", next: "route_b", recordAs: "route_b" }
  ]
}
```

`recordAs` は後から変更しない短いIDにすると、将来のメタ演出で履歴を参照しやすくなります。

## 立ち絵・背景画像を追加する

1. 背景を `assets/backgrounds/`、立ち絵を `assets/characters/` に置きます（PNG、JPG、WebP、SVGが利用可能です）。
2. `js/scenario.js` の対象ノードで、リポジトリルートからのパスを指定します。
3. 立ち絵は透過背景かつ、キャラクターの足元が画像下端にある縦長画像を推奨します。
4. 背景は16:9程度を推奨します。画面比率に応じて中央基準でトリミングされます。

## BAD ENDを追加する

選択肢の `next` を、新しいBAD ENDノードへつなぎます。共通画面と記録処理はエンジンが担当するため、固有IDと死亡理由だけで追加できます。

```js
new_bad_end: {
  type: "badEnd",
  id: "unique_bad_end_id",
  reason: "このBAD END固有の短いテキスト。"
}
```

直前の選択肢は自動的にチェックポイントとして保存され、「直前の選択肢からやり直す」で戻れます。死亡時の背景と立ち絵を残したまま共通演出が重なります。`id` は各BAD ENDで必ず一意にしてください。

将来のミニうさぴょん画像は `assets/characters/mini-devil-usapyon.png` として追加すると、BAD END画面の隅に自動表示されます。ファイルが存在しない間は何も表示されません。

保存データには現在位置、直前の選択肢、BAD END閲覧回数・閲覧済みID、新規ゲーム開始回数、選択履歴（日時を含む）が入ります。保存形式を変更する場合は `js/storage.js` のキー末尾のバージョンも更新してください。

## GitHub Pagesで公開する

1. このリポジトリをGitHubへpushします。
2. GitHubのリポジトリ画面で **Settings → Pages** を開きます。
3. **Build and deployment** のSourceを **Deploy from a branch** にします。
4. 公開するブランチ（通常は `main`）と `/ (root)` を選び、**Save** を押します。
5. 表示された公開URLへアクセスします。すべて相対パスなので追加設定は不要です。

## 操作

- メッセージウィンドウのクリック、`Enter`、または`Space`で文章を送ります。
- 選択肢はクリック、または`Tab`で選んで`Enter`で決定します。
- 左上のホームボタンからタイトルに戻れます。進行状況とプレイ履歴は各ノード表示時に自動保存されます（タイトル画面にCONTINUE機能はありません）。
