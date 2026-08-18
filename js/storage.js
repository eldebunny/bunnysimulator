(function () {
  "use strict";
  const KEY = "bunnysimulator.save.v1";
  const freshData = () => ({
    currentNode: null,
    checkpointNode: null,
    badEndCount: 0,
    seenBadEnds: [],
    newGameCount: 0,
    choiceHistory: []
  });

  function load() {
    try {
      return { ...freshData(), ...JSON.parse(localStorage.getItem(KEY) || "{}") };
    } catch (error) {
      console.warn("セーブデータを読み込めませんでした。", error);
      return freshData();
    }
  }

  function save(data) {
    localStorage.setItem(KEY, JSON.stringify(data));
  }

  window.SaveData = { load, save };
}());
