(function () {
  "use strict";
  const scenario = window.SCENARIO;
  let save = window.SaveData.load();
  let currentNodeId = null;
  let acceptingInput = false;
  let typingTimer = null;
  let isTyping = false;
  let fullText = "";
  const TEXT_INTERVAL = 46;
  const MINI_USAPYON_PATH = "assets/characters/mini-devil-usapyon.png";

  const elements = {
    screens: document.querySelectorAll(".screen"),
    title: document.querySelector("#title-screen"), game: document.querySelector("#game-screen"),
    end: document.querySelector("#development-end-screen"), start: document.querySelector("#start-button"),
    titleButton: document.querySelector("#title-button"), endTitle: document.querySelector("#end-title-button"),
    retry: document.querySelector("#retry-button"), overlay: document.querySelector("#bad-end-overlay"),
    miniUsapyon: document.querySelector("#mini-usapyon"),
    background: document.querySelector("#scene-background"), sprite: document.querySelector("#character-sprite"),
    speaker: document.querySelector("#speaker-name"), text: document.querySelector("#message-text"),
    message: document.querySelector("#message-window"), choices: document.querySelector("#choices"),
    reason: document.querySelector("#bad-end-reason")
  };

  function showScreen(screen) {
    elements.screens.forEach((item) => item.classList.toggle("is-active", item === screen));
  }

  function showTitle() {
    save = window.SaveData.load();
    resetBadEndOverlay();
    showScreen(elements.title);
  }

  function startNewGame() {
    save.newGameCount += 1;
    save.currentNode = scenario.startNode;
    save.checkpointNode = null;
    window.SaveData.save(save);
    renderNode(scenario.startNode);
  }

  function renderNode(nodeId) {
    const node = scenario.nodes[nodeId];
    if (!node) { console.error(`シナリオノード「${nodeId}」がありません。`); return showTitle(); }
    currentNodeId = nodeId;
    save.currentNode = nodeId;
    window.SaveData.save(save);

    if (node.type === "badEnd") return showBadEnd(node);
    if (node.type === "end") { acceptingInput = false; return showScreen(elements.end); }
    showScreen(elements.game);
    acceptingInput = node.type === "line";
    elements.speaker.textContent = node.speaker || "";
    elements.speaker.hidden = !node.speaker;
    displayText(node.text || "");
    if (node.background) elements.background.style.backgroundImage = `url("${node.background}")`;
    if (Object.hasOwn(node, "sprite")) {
      elements.sprite.hidden = !node.sprite;
      if (node.sprite) { elements.sprite.src = node.sprite; elements.sprite.alt = node.speaker || "キャラクター"; }
    }
    elements.choices.replaceChildren();
    elements.choices.classList.toggle("is-visible", node.type === "choice");
    document.querySelector(".next-indicator").hidden = node.type === "choice";

    if (node.type === "choice") {
      save.checkpointNode = nodeId;
      window.SaveData.save(save);
      node.choices.forEach((choice, index) => {
        const button = document.createElement("button");
        button.className = "choice-button";
        button.textContent = choice.text;
        button.addEventListener("click", (event) => { event.stopPropagation(); choose(node, choice, index); });
        elements.choices.append(button);
      });
      elements.choices.querySelector("button")?.focus();
    }
  }

  function advance() {
    if (!acceptingInput) return;
    if (isTyping) return finishTyping();
    const node = scenario.nodes[currentNodeId];
    if (node?.next) renderNode(node.next);
  }

  function displayText(text) {
    clearInterval(typingTimer);
    fullText = text;
    elements.text.textContent = "";
    let characterIndex = 0;
    isTyping = Boolean(text);
    document.querySelector(".next-indicator").hidden = isTyping;
    if (!text) return;
    typingTimer = setInterval(() => {
      characterIndex += 1;
      elements.text.textContent = fullText.slice(0, characterIndex);
      if (characterIndex >= fullText.length) finishTyping();
    }, TEXT_INTERVAL);
  }

  function finishTyping() {
    clearInterval(typingTimer);
    elements.text.textContent = fullText;
    isTyping = false;
    document.querySelector(".next-indicator").hidden = scenario.nodes[currentNodeId]?.type === "choice";
  }

  function choose(node, choice, index) {
    save.choiceHistory.push({ nodeId: currentNodeId, choiceId: choice.recordAs || String(index), text: choice.text, selectedAt: new Date().toISOString() });
    window.SaveData.save(save);
    renderNode(choice.next);
  }

  function showBadEnd(node) {
    acceptingInput = false;
    save.badEndCount += 1;
    if (!save.seenBadEnds.includes(node.id)) save.seenBadEnds.push(node.id);
    window.SaveData.save(save);
    elements.reason.textContent = node.reason;
    showScreen(elements.game);
    elements.choices.classList.remove("is-visible");
    elements.overlay.classList.add("is-visible");
    elements.overlay.setAttribute("aria-hidden", "false");
    loadOptionalMiniUsapyon();
    window.setTimeout(() => elements.retry.focus(), 1800);
  }

  function loadOptionalMiniUsapyon() {
    elements.miniUsapyon.hidden = true;
    const probe = new Image();
    probe.onload = () => { elements.miniUsapyon.src = MINI_USAPYON_PATH; elements.miniUsapyon.hidden = false; };
    probe.src = MINI_USAPYON_PATH;
  }

  function resetBadEndOverlay() {
    elements.overlay.classList.remove("is-visible");
    elements.overlay.setAttribute("aria-hidden", "true");
    elements.miniUsapyon.hidden = true;
    elements.miniUsapyon.removeAttribute("src");
  }

  elements.start.addEventListener("click", startNewGame);
  elements.message.addEventListener("click", advance);
  elements.titleButton.addEventListener("click", showTitle);
  elements.endTitle.addEventListener("click", showTitle);
  elements.retry.addEventListener("click", () => { resetBadEndOverlay(); renderNode(save.checkpointNode || scenario.startNode); });
  document.addEventListener("keydown", (event) => {
    if ((event.key === "Enter" || event.key === " ") && elements.game.classList.contains("is-active") && !elements.choices.classList.contains("is-visible")) {
      event.preventDefault(); advance();
    }
  });

  showTitle();
}());
