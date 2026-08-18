/**
 * シナリオデータ。エンジンを触らず、このファイルにノードを追加できます。
 * type: "line" は台詞、"choice" は選択肢、"badEnd" はBAD ENDです。
 */
window.SCENARIO = {
  startNode: "meeting_01",
  nodes: {
    meeting_01: {
      type: "line", speaker: "うさぴょん",
      text: "来た！　今日は遊ぶ約束、忘れてなかったんだね。",
      background: "assets/backgrounds/city-day.jpg",
      sprite: "assets/characters/usapyon.png",
      next: "meeting_02"
    },
    meeting_02: {
      type: "line", speaker: "うさぴょん",
      text: "まずは公園を歩こうか。それとも、その前にひとつ質問。",
      next: "snack_choice"
    },
    snack_choice: {
      type: "choice", speaker: "うさぴょん",
      text: "おやつを持ってきたんだけど、どこで食べる？",
      choices: [
        { text: "ベンチに座って食べよう", next: "bench_accident", recordAs: "bench" },
        { text: "地面に正座して北を向いて食べよう", next: "continue_01", recordAs: "north_seiza" }
      ]
    },
    bench_accident: {
      type: "badEnd", id: "falling_bench",
      reason: "ベンチは突如として発進した。あなたは振り落とされ、帰らぬ人となった。"
    },
    continue_01: {
      type: "line", speaker: "うさぴょん",
      text: "……ずいぶん独特。でも、今日はそういう日にしよう。",
      next: "prototype_end"
    },
    prototype_end: {
      type: "line", speaker: "うさぴょん",
      text: "この先のお話は、まだ準備中。また遊ぼうね。",
      next: "prototype_end"
    }
  }
};
