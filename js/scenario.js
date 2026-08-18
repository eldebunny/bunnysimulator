/**
 * シナリオデータ。エンジンを触らず、このファイルにノードを追加できます。
 * type: "line" は台詞、"choice" は選択肢、"badEnd" はBAD ENDです。
 */
window.SCENARIO = {
  startNode: "intro_01",
  nodes: {
    intro_01: {
      type: "line",
      text: "今日はうさぴょんと遊ぶ約束をしていたっけ",
      background: "assets/backgrounds/city-day.jpg",
      next: "intro_02"
    },
    intro_02: {
      type: "line",
      text: "どこに行くんだったっけかな...",
      next: "outing_choice"
    },
    outing_choice: {
      type: "choice",
      choices: [
        { text: "やっぱアウトドアっしょ！", next: "meteor_bad_end", recordAs: "outdoor" },
        { text: "あいつ陰キャだしどうせヲタ活だろうなぁ...", next: "usapyon_01", recordAs: "otaku" }
      ]
    },
    meteor_bad_end: {
      type: "badEnd", id: "meteor",
      reason: "突如飛来した隕石によってこんがり焼けた\n外に出なければこんな目に合わなかったのにネ"
    },
    usapyon_01: {
      type: "line", speaker: "うさぴょん",
      text: "おまたせ～！待った？",
      sprite: "assets/characters/usapyon.png",
      next: "usapyon_02"
    },
    usapyon_02: {
      type: "line", speaker: "うさぴょん",
      text: "ねぇねぇ何分待った？何時間待った？",
      next: "reaction_choice"
    },
    reaction_choice: {
      type: "choice",
      choices: [
        { text: "（唐突にうさぴょんに腹パンをかます）", next: "usapyon_punched_01", recordAs: "punch" },
        { text: "いまきたところだよ", next: "killer_rabbit_01", recordAs: "just_arrived" }
      ]
    },
    killer_rabbit_01: {
      type: "line", text: "やせい　の　さつじんうさぎ　があらわれた！", next: "killer_rabbit_02"
    },
    killer_rabbit_02: {
      type: "line", text: "さつじんうさぎ　の　さつじんキック！", next: "kick_bad_end"
    },
    kick_bad_end: {
      type: "badEnd", id: "killer_kick",
      reason: "さつじんうさぎ　の　さつじんキック！"
    },
    usapyon_punched_01: {
      type: "line", speaker: "うさぴょん", text: "グエー死んだンゴｗ", next: "usapyon_punched_02"
    },
    usapyon_punched_02: {
      type: "line", speaker: "うさぴょん", text: "...なんてね！それじゃあいこっか！", next: "prototype_end"
    },
    prototype_end: {
      type: "line", text: "続きは制作中"
    }
  }
};
