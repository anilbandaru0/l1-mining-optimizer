const gpuProfiles = {
  rtx5090: {
    name: "NVIDIA RTX 5090",
    hashratePerGpu: 38,
    wattsPerGpu: 300,
    note: "High-end demo preset. Real RTX 5090 mining performance depends on the exact algorithm and power limit.",
  },
  rtx4090: {
    name: "NVIDIA RTX 4090",
    hashratePerGpu: 30,
    wattsPerGpu: 260,
    note: "Efficient high-end demo preset for a tuned RTX 4090.",
  },
  rtx4080super: {
    name: "NVIDIA RTX 4080 Super",
    hashratePerGpu: 22,
    wattsPerGpu: 210,
    note: "Upper-mid demo preset with lower power draw than 4090-class cards.",
  },
  rtx4070tisuper: {
    name: "NVIDIA RTX 4070 Ti Super",
    hashratePerGpu: 18,
    wattsPerGpu: 170,
    note: "Efficient demo preset for smaller rigs.",
  },
  rtx3090: {
    name: "NVIDIA RTX 3090",
    hashratePerGpu: 24,
    wattsPerGpu: 285,
    note: "Older high-end demo preset. Watch memory thermals on real cards.",
  },
  rtx3080: {
    name: "NVIDIA RTX 3080",
    hashratePerGpu: 19,
    wattsPerGpu: 230,
    note: "Older high-end demo preset with moderate efficiency.",
  },
  rx7900xtx: {
    name: "AMD Radeon RX 7900 XTX",
    hashratePerGpu: 20,
    wattsPerGpu: 250,
    note: "AMD high-end demo preset. Real values vary by miner and driver stack.",
  },
  rx7800xt: {
    name: "AMD Radeon RX 7800 XT",
    hashratePerGpu: 14,
    wattsPerGpu: 170,
    note: "AMD efficiency-focused demo preset.",
  },
  custom: {
    name: "Custom GPU",
    hashratePerGpu: 22,
    wattsPerGpu: 180,
    note: "Custom mode. Enter your own measured hashrate and wattage.",
  },
};

const miningTargets = {
  kaspa: {
    name: "Kaspa",
    coingeckoId: "kaspa",
    blockReward: 103.83,
    blockTime: 1,
    networkHashrate: 950000,
    difficulty: 1.2,
    gpuMultiplier: 1.12,
  },
  ravencoin: {
    name: "Ravencoin",
    coingeckoId: "ravencoin",
    blockReward: 2500,
    blockTime: 60,
    networkHashrate: 180000,
    difficulty: 1.35,
    gpuMultiplier: 0.88,
  },
  ergo: {
    name: "Ergo",
    coingeckoId: "ergo",
    blockReward: 3,
    blockTime: 120,
    networkHashrate: 24000,
    difficulty: 1.1,
    gpuMultiplier: 0.92,
  },
  monero: {
    name: "Monero",
    coingeckoId: "monero",
    blockReward: 0.6,
    blockTime: 120,
    networkHashrate: 4200,
    difficulty: 1.0,
    gpuMultiplier: 0.18,
  },
  ethereumClassic: {
    name: "Ethereum Classic",
    coingeckoId: "ethereum-classic",
    blockReward: 2.56,
    blockTime: 13,
    networkHashrate: 180000,
    difficulty: 1.25,
    gpuMultiplier: 1.0,
  },
  pearl: {
    name: "Pearl demo target",
    coingeckoId: null,
    blockReward: 4,
    blockTime: 12,
    networkHashrate: 9000,
    difficulty: 1.15,
    gpuMultiplier: 1.0,
  },
  custom: {
    name: "Custom target",
    coingeckoId: null,
    blockReward: 4,
    blockTime: 12,
    networkHashrate: 9000,
    difficulty: 1.15,
    gpuMultiplier: 1.0,
  },
};

const livePrices = {};

const defaults = {
  gpuModel: "rtx5090",
  miningTarget: "auto",
  gpuCount: 6,
  hashratePerGpu: 38,
  wattsPerGpu: 300,
  baseWatts: 120,
  electricityCost: 0.14,
  poolFee: 1,
  tokenPrice: 0.72,
  blockReward: 4,
  blockTime: 12,
  networkHashrate: 9000,
  difficulty: 1.15,
  minProfit: 5,
};

const ids = Object.keys(defaults);
const inputs = Object.fromEntries(ids.map((id) => [id, document.querySelector(`#${id}`)]));

const output = {
  totalHashrate: document.querySelector("#totalHashrate"),
  totalWatts: document.querySelector("#totalWatts"),
  dailyRevenue: document.querySelector("#dailyRevenue"),
  dailyEnergy: document.querySelector("#dailyEnergy"),
  dailyProfit: document.querySelector("#dailyProfit"),
  monthlyProfit: document.querySelector("#monthlyProfit"),
  tokensPerDay: document.querySelector("#tokensPerDay"),
  revenueAfterFee: document.querySelector("#revenueAfterFee"),
  breakEvenPower: document.querySelector("#breakEvenPower"),
  efficiency: document.querySelector("#efficiency"),
  agentAction: document.querySelector("#agentAction"),
  agentReason: document.querySelector("#agentReason"),
  gpuNote: document.querySelector("#gpuNote"),
  gpuTable: document.querySelector("#gpuTable"),
  miningTarget: document.querySelector("#miningTarget"),
  selectedTarget: document.querySelector("#selectedTarget"),
  targetReason: document.querySelector("#targetReason"),
  targetTable: document.querySelector("#targetTable"),
  priceStatus: document.querySelector("#priceStatus"),
  refreshPricesButton: document.querySelector("#refreshPricesButton"),
  resetButton: document.querySelector("#resetButton"),
};

function money(value) {
  return value.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 2,
  });
}

function number(value, digits = 2) {
  return value.toLocaleString("en-US", {
    maximumFractionDigits: digits,
  });
}

function readConfig() {
  const values = Object.fromEntries(
    ids.map((id) => {
      if (id === "gpuModel") return [id, inputs[id].value];
      if (id === "miningTarget") return [id, inputs[id].value];
      const value = Number(inputs[id].value);
      return [id, Number.isFinite(value) ? value : defaults[id]];
    }),
  );
  return values;
}

function targetConfig(config, targetId) {
  const target = miningTargets[targetId] || miningTargets.custom;
  const livePrice = target.coingeckoId ? livePrices[target.coingeckoId]?.usd : null;
  return {
    ...config,
    targetId,
    targetName: target.name,
    tokenPrice: livePrice || config.tokenPrice,
    blockReward: target.blockReward,
    blockTime: target.blockTime,
    networkHashrate: target.networkHashrate,
    difficulty: target.difficulty,
    gpuMultiplier: target.gpuMultiplier,
    isLivePrice: Boolean(livePrice),
  };
}

function calculate(config) {
  const totalHashrate = config.gpuCount * config.hashratePerGpu * (config.gpuMultiplier || 1);
  const totalWatts = config.gpuCount * config.wattsPerGpu + config.baseWatts;
  const blocksPerDay = 86400 / Math.max(config.blockTime, 1);
  const minerShare = totalHashrate / Math.max(config.networkHashrate, 1);
  const difficultyPenalty = 1 / Math.max(config.difficulty, 0.1);
  const tokensPerDay = minerShare * config.blockReward * blocksPerDay * difficultyPenalty;
  const grossRevenue = tokensPerDay * config.tokenPrice;
  const poolFeeCost = grossRevenue * (config.poolFee / 100);
  const dailyRevenue = grossRevenue - poolFeeCost;
  const dailyEnergy = (totalWatts / 1000) * 24 * config.electricityCost;
  const dailyProfit = dailyRevenue - dailyEnergy;
  const monthlyProfit = dailyProfit * 30;
  const breakEvenPower =
    totalWatts > 0 ? dailyRevenue / ((totalWatts / 1000) * 24) : 0;
  const efficiency = totalHashrate > 0 ? totalWatts / totalHashrate : 0;

  return {
    totalHashrate,
    totalWatts,
    tokensPerDay,
    dailyRevenue,
    dailyEnergy,
    dailyProfit,
    monthlyProfit,
    breakEvenPower,
    efficiency,
  };
}

function compareTargets(config) {
  return Object.keys(miningTargets)
    .filter((id) => id !== "custom")
    .map((id) => {
      const candidateConfig = targetConfig(config, id);
      return {
        id,
        config: candidateConfig,
        result: calculate(candidateConfig),
      };
    })
    .sort((a, b) => b.result.dailyProfit - a.result.dailyProfit);
}

function resolveActiveTarget(config) {
  if (config.miningTarget !== "auto") {
    const activeConfig =
      config.miningTarget === "custom" ? config : targetConfig(config, config.miningTarget);
    return {
      activeConfig,
      comparison: compareTargets(config),
      reason: config.miningTarget === "custom"
        ? "Using your custom manual target values."
        : `Using ${activeConfig.targetName} with ${activeConfig.isLivePrice ? "live" : "manual"} price data.`,
    };
  }

  const comparison = compareTargets(config);
  const best = comparison[0];
  return {
    activeConfig: best.config,
    comparison,
    reason: `${best.config.targetName} currently has the highest estimated daily profit among the demo targets.`,
  };
}

function decide(config, result) {
  if (result.dailyProfit < 0) {
    return {
      action: "UNPROFITABLE: STOP OR SWITCH",
      className: "danger",
      reason: `This rig is losing ${money(Math.abs(result.dailyProfit))} per day at ${money(config.electricityCost)}/kWh. Switch target, reduce power, or do not mine.`,
    };
  }

  if (result.dailyProfit < config.minProfit) {
    return {
      action: "LOW PROFIT: OPTIMIZE",
      className: "warn",
      reason: `Profit is ${money(result.dailyProfit)} per day, below your ${money(config.minProfit)} target. Lower wattage, find cheaper power, or mine a better target.`,
    };
  }

  if (result.efficiency > 8) {
    return {
      action: "PROFITABLE BUT INEFFICIENT",
      className: "warn",
      reason: `The rig is profitable, but efficiency is ${number(result.efficiency)} W per TH/s. Undervolting or power limits may improve margin.`,
    };
  }

  return {
    action: "PROFITABLE: MINE",
    className: "good",
    reason: `Estimated profit is ${money(result.dailyProfit)} per day and ${money(result.monthlyProfit)} per month. This setup clears your target.`,
  };
}

function render() {
  const config = readConfig();
  const resolved = resolveActiveTarget(config);
  const activeConfig = resolved.activeConfig;
  const result = calculate(activeConfig);
  const recommendation = decide(config, result);
  const profile = gpuProfiles[config.gpuModel] || gpuProfiles.custom;

  output.totalHashrate.textContent = `${number(result.totalHashrate, 1)} TH/s`;
  output.totalWatts.textContent = `${number(result.totalWatts, 0)} W`;
  output.dailyRevenue.textContent = money(result.dailyRevenue);
  output.dailyEnergy.textContent = money(result.dailyEnergy);
  output.dailyProfit.textContent = money(result.dailyProfit);
  output.monthlyProfit.textContent = money(result.monthlyProfit);
  output.tokensPerDay.textContent = `${number(result.tokensPerDay, 4)} tokens/day`;
  output.revenueAfterFee.textContent = `${money(result.dailyRevenue)}/day`;
  output.breakEvenPower.textContent = `${money(result.breakEvenPower)}/kWh`;
  output.efficiency.textContent = `${number(result.efficiency, 2)} W per TH/s`;
  output.agentAction.textContent = recommendation.action;
  output.agentAction.className = recommendation.className;
  output.agentReason.textContent = recommendation.reason;
  output.gpuNote.textContent = profile.note;
  output.selectedTarget.textContent = activeConfig.targetName || "Custom target";
  output.targetReason.textContent = resolved.reason;
  renderTargetTable(resolved.comparison, activeConfig.targetId || "custom");
}

function applyGpuProfile() {
  const profile = gpuProfiles[inputs.gpuModel.value] || gpuProfiles.custom;
  inputs.hashratePerGpu.value = profile.hashratePerGpu;
  inputs.wattsPerGpu.value = profile.wattsPerGpu;
  render();
}

function renderGpuTable() {
  output.gpuTable.innerHTML = "";
  Object.entries(gpuProfiles)
    .filter(([id]) => id !== "custom")
    .forEach(([id, profile]) => {
      const efficiency = profile.wattsPerGpu / profile.hashratePerGpu;
      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${profile.name}</td>
        <td>${number(profile.hashratePerGpu, 1)} TH/s</td>
        <td>${number(profile.wattsPerGpu, 0)} W</td>
        <td>${number(efficiency, 2)} W per TH/s</td>
      `;
      row.addEventListener("click", () => {
        inputs.gpuModel.value = id;
        applyGpuProfile();
      });
      output.gpuTable.append(row);
    });
}

function renderTargetTable(comparison, activeTargetId) {
  output.targetTable.innerHTML = "";
  comparison.forEach(({ id, config, result }) => {
    const recommendation = decide(config, result);
    const priceLabel = config.isLivePrice ? money(config.tokenPrice) : `${money(config.tokenPrice)} manual`;
    const row = document.createElement("tr");
    if (id === activeTargetId) row.classList.add("selected-row");
    row.innerHTML = `
      <td>${config.targetName}</td>
      <td>${priceLabel}</td>
      <td>${money(result.dailyProfit)}</td>
      <td class="${recommendation.className}">${recommendation.action}</td>
    `;
    row.addEventListener("click", () => {
      inputs.miningTarget.value = id;
      applyMiningTarget();
    });
    output.targetTable.append(row);
  });
}

function applyMiningTarget() {
  const selected = inputs.miningTarget.value;
  if (selected !== "auto" && selected !== "custom") {
    const target = miningTargets[selected];
    inputs.blockReward.value = target.blockReward;
    inputs.blockTime.value = target.blockTime;
    inputs.networkHashrate.value = target.networkHashrate;
    inputs.difficulty.value = target.difficulty;
    if (target.coingeckoId && livePrices[target.coingeckoId]?.usd) {
      inputs.tokenPrice.value = livePrices[target.coingeckoId].usd;
    }
  }
  render();
}

async function refreshPrices() {
  const idsToFetch = Object.values(miningTargets)
    .map((target) => target.coingeckoId)
    .filter(Boolean)
    .join(",");

  output.priceStatus.textContent = "Loading live prices from CoinGecko...";
  try {
    const url = `https://api.coingecko.com/api/v3/simple/price?ids=${idsToFetch}&vs_currencies=usd&include_24hr_change=true&include_last_updated_at=true`;
    const response = await fetch(url, { cache: "no-store" });
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const data = await response.json();
    Object.assign(livePrices, data);
    const updatedAt = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
    output.priceStatus.textContent = `Live prices updated from CoinGecko at ${updatedAt}. Network rewards and difficulty remain editable demo assumptions.`;
    applyMiningTarget();
  } catch (error) {
    output.priceStatus.textContent = "Could not load live prices. The calculator is using manual/demo prices.";
    render();
  }
}

function reset() {
  ids.forEach((id) => {
    inputs[id].value = defaults[id];
  });
  render();
}

ids.forEach((id) => {
  inputs[id].addEventListener("input", render);
});

inputs.gpuModel.addEventListener("change", applyGpuProfile);
inputs.miningTarget.addEventListener("change", applyMiningTarget);
output.refreshPricesButton.addEventListener("click", refreshPrices);
output.resetButton.addEventListener("click", reset);

renderGpuTable();
render();
refreshPrices();
