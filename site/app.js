const state = {
  tick: 0,
  running: true,
  minMargin: 15,
  thermalLimit: 82,
  criticalThermalLimit: 98,
  fallbackTarget: "pearl-low-diff",
};

const elements = {
  price: document.querySelector("#price"),
  difficulty: document.querySelector("#difficulty"),
  hashrate: document.querySelector("#hashrate"),
  gpuTemp: document.querySelector("#gpuTemp"),
  wattage: document.querySelector("#wattage"),
  margin: document.querySelector("#margin"),
  action: document.querySelector("#action"),
  reason: document.querySelector("#reason"),
  financialAgent: document.querySelector("#financialAgent"),
  operationsAgent: document.querySelector("#operationsAgent"),
  log: document.querySelector("#log"),
  status: document.querySelector("#status"),
  toggleButton: document.querySelector("#toggleButton"),
  clearButton: document.querySelector("#clearButton"),
};

function wave(value, size) {
  return Math.sin(state.tick / value) * size;
}

function telemetry() {
  const heatSpike = state.tick >= 5 && state.tick <= 7 ? 11 : 0;
  const wattSpike = state.tick >= 6 && state.tick <= 7 ? 180 : 0;
  return {
    price: Math.max(0.05, 0.72 + wave(3, 0.18)),
    difficulty: Math.max(0.8, 1.15 + Math.cos(state.tick / 4) * 0.22),
    hashrate: Math.max(1, 132 + wave(2, 8)),
    gpuTemp: 72 + heatSpike + wave(2.5, 4),
    hotspot: 81 + heatSpike + wave(2, 5),
    wattage: 810 + wattSpike,
  };
}

function estimateProfit(data) {
  const blocksPerHour = 3600 / 12;
  const minerShare = data.hashrate / 9000;
  const expectedTokens = minerShare * 4 * blocksPerHour * (1 / data.difficulty);
  const revenue = expectedTokens * data.price;
  const energyCost = (data.wattage / 1000) * 0.14;
  return revenue - energyCost;
}

function decide(data, margin) {
  const financial =
    margin < state.minMargin
      ? {
          action: "SWITCH TARGET",
          reason: `Margin $${margin.toFixed(2)}/hr is below $${state.minMargin.toFixed(2)}/hr. Switch to ${state.fallbackTarget}.`,
          priority: 50,
          className: "warn",
        }
      : {
          action: "HOLD",
          reason: `Margin $${margin.toFixed(2)}/hr remains profitable.`,
          priority: 10,
          className: "good",
        };

  const operations =
    data.hotspot >= state.criticalThermalLimit
      ? {
          action: "SHUTDOWN MINER",
          reason: `Hotspot ${data.hotspot.toFixed(1)}C exceeds critical limit.`,
          priority: 100,
          className: "danger",
        }
      : data.gpuTemp >= state.thermalLimit || data.wattage > 950
        ? {
            action: "THROTTLE POWER",
            reason: `GPU ${data.gpuTemp.toFixed(1)}C or ${data.wattage.toFixed(0)}W exceeds safe envelope.`,
            priority: 80,
            className: "warn",
          }
        : {
            action: "HOLD",
            reason: "Hardware telemetry is inside the operating envelope.",
            priority: 10,
            className: "good",
          };

  const finalDecision = operations.priority > financial.priority ? operations : financial;
  return { financial, operations, finalDecision };
}

function addLog(decision, data, margin) {
  const item = document.createElement("li");
  item.innerHTML = `<strong class="${decision.className}">${decision.action}</strong> at tick ${state.tick}: ${decision.reason} Margin $${margin.toFixed(2)}/hr, GPU ${data.gpuTemp.toFixed(1)}C, ${data.wattage.toFixed(0)}W.`;
  elements.log.prepend(item);

  while (elements.log.children.length > 8) {
    elements.log.lastElementChild.remove();
  }
}

function render() {
  if (!state.running) return;

  state.tick += 1;
  const data = telemetry();
  const margin = estimateProfit(data);
  const decisions = decide(data, margin);

  elements.price.textContent = `$${data.price.toFixed(3)}`;
  elements.difficulty.textContent = data.difficulty.toFixed(2);
  elements.hashrate.textContent = `${data.hashrate.toFixed(1)} TH/s`;
  elements.gpuTemp.textContent = `${data.gpuTemp.toFixed(1)}C`;
  elements.wattage.textContent = `${data.wattage.toFixed(0)}W`;
  elements.margin.textContent = `$${margin.toFixed(2)}/hr`;
  elements.action.textContent = decisions.finalDecision.action;
  elements.action.className = decisions.finalDecision.className;
  elements.reason.textContent = decisions.finalDecision.reason;
  elements.financialAgent.textContent = decisions.financial.reason;
  elements.operationsAgent.textContent = decisions.operations.reason;

  addLog(decisions.finalDecision, data, margin);
}

elements.toggleButton.addEventListener("click", () => {
  state.running = !state.running;
  elements.toggleButton.textContent = state.running ? "Pause" : "Resume";
  elements.status.textContent = state.running ? "LIVE" : "PAUSED";
});

elements.clearButton.addEventListener("click", () => {
  elements.log.innerHTML = "";
});

render();
setInterval(render, 1200);

