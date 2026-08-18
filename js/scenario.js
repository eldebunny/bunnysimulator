/**
 * シナリオデータ。エンジンを触らず、このファイルにノードを追加できます。
 * type: "line" は台詞、"choice" は選択肢、"badEnd" はBAD ENDです。
 */
window.SCENARIO = {
  startNode: "opening_01",
  nodes: {
    opening_01: {
      type: "line", speaker: "",
      text: "今日はうさぴょんと遊ぶ約束をしていたっけ",
      background: "assets/backgrounds/city-day.jpg",
      sprite: null,
      next: "opening_02"
    },
    opening_02: {
      type: "line", speaker: "",
      text: "どこに行くんだったっけかな...",
      next: "destination_choice"
    },
    destination_choice: {
      type: "choice", speaker: "", text: "",
      choices: [
        { text: "やっぱアウトドアっしょ！", next: "meteor_bad_end", recordAs: "outdoor" },
        { text: "あいつ陰キャだしどうせヲタ活だろうなぁ...", next: "usapyon_arrives", recordAs: "otaku_activity" }
      ]
    },
    meteor_bad_end: {
      type: "badEnd", id: "meteor",
      reason: "突如飛来した隕石によってこんがり焼けた\n外に出なければこんな目に合わなかったのにネ"
    },
    usapyon_arrives: {
      type: "line", speaker: "うさぴょん",
      text: "おまたせ～！待った？",
      sprite: "assets/characters/usapyon.png",
      next: "usapyon_question"
    },
    usapyon_question: {
      type: "line", speaker: "うさぴょん",
      text: "ねぇねぇ何分待った？何時間待った？",
      next: "greeting_choice"
    },
    greeting_choice: {
      type: "choice", speaker: "", text: "",
      choices: [
        { text: "（唐突にうさぴょんに腹パンをかます）", next: "fake_death", recordAs: "punch" },
        { text: "いまきたところだよ", next: "killer_rabbit_01", recordAs: "just_arrived" }
      ]
    },
    killer_rabbit_01: {
      type: "line", speaker: "", text: "やせい　の　さつじんうさぎ　があらわれた！", next: "killer_rabbit_02"
    },
    killer_rabbit_02: {
      type: "line", speaker: "", text: "さつじんうさぎ　の　さつじんキック！", next: "rabbit_bad_end"
    },
    rabbit_bad_end: {
      type: "badEnd", id: "killer_rabbit", reason: "さつじんうさぎ　の　さつじんキック！"
    },
    fake_death: {
      type: "line", speaker: "うさぴょん", text: "グエー死んだンゴｗ", next: "lets_go"
    },
    lets_go: {
      type: "line", speaker: "うさぴょん", text: "...なんてね！それじゃあいこっか！", next: "development_end"
    },
    development_end: {
      type: "end"
    }
  }
};
