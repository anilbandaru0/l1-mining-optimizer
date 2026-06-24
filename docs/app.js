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
  keryx: {
    name: "Keryx",
    tag: "KRX",
    algorithm: "KeryxHash",
    coingeckoId: null,
    exchange: "Nonkyc",
    exchangeRateBtc: 0.00000001,
    blockReward: 4.76,
    blockTime: 0.1,
    networkHashrate: 931.97,
    networkHashrateLabel: "931.97 Gh/s",
    difficulty: 46645,
    difficultyLabel: "46,645M",
    gpuMultiplier: 18.4,
  },
  pearl: {
    name: "Pearl",
    tag: "PRL",
    algorithm: "Pearl",
    coingeckoId: null,
    exchange: "SafeTrade",
    exchangeRateBtc: 0.00001119,
    blockReward: 2576.85,
    blockTime: 193,
    networkHashrate: 29629060,
    networkHashrateLabel: "29,629.06 Ph/s",
    difficulty: 20315869.375,
    difficultyLabel: "20,315,869.375",
    gpuMultiplier: 1.0,
  },
  qubitcoin: {
    name: "Qubitcoin",
    tag: "QTC",
    algorithm: "Qhash",
    coingeckoId: null,
    exchange: "SafeTrade",
    exchangeRateBtc: 0.00001023,
    blockReward: 50,
    blockTime: 633,
    networkHashrate: 11610,
    networkHashrateLabel: "11.61 Th/s",
    difficulty: 7346558.635,
    difficultyLabel: "7,346,558,635M",
    gpuMultiplier: 8.5,
  },
  zano: {
    name: "Zano",
    tag: "ZANO",
    algorithm: "ProgPowZ",
    coingeckoId: "zano",
    exchange: "MEXC",
    exchangeRateBtc: 0.00017052,
    blockReward: 1,
    blockTime: 120,
    networkHashrate: 441.06,
    networkHashrateLabel: "441.06 Gh/s",
    difficulty: 52926.837,
    difficultyLabel: "52,926,837M",
    gpuMultiplier: 1.35,
  },
  tariCuckaroo: {
    name: "Tari-Cuckaroo29",
    tag: "XTM",
    algorithm: "Cuckaroo29",
    coingeckoId: null,
    exchange: "Nonkyc",
    exchangeRateBtc: 0.00000001,
    blockReward: 10802.94,
    blockTime: 469,
    networkHashrate: 20.07,
    networkHashrateLabel: "20.07 kh/s",
    difficulty: 9425922,
    difficultyLabel: "9,425,922",
    gpuMultiplier: 0.05,
  },
  epicProgpow: {
    name: "EPIC-ProgPow",
    tag: "EPIC",
    algorithm: "ProgPow",
    coingeckoId: null,
    exchange: "Nonkyc",
    exchangeRateBtc: 0.0000028,
    blockReward: 0.99,
    blockTime: 120,
    networkHashrate: 9.98,
    networkHashrateLabel: "9.98 Gh/s",
    difficulty: 598695,
    difficultyLabel: "598,695M",
    gpuMultiplier: 1.18,
  },
  mewc: {
    name: "MEWC-MeowPow",
    tag: "MEWC",
    algorithm: "MeowPow",
    coingeckoId: null,
    exchange: "Nonkyc",
    exchangeRateBtc: 0.000000004,
    blockReward: 3000,
    blockTime: 120,
    networkHashrate: 4.41,
    networkHashrateLabel: "4.41 Gh/s",
    difficulty: 123.289,
    difficultyLabel: "123.289",
    gpuMultiplier: 0.9,
  },
  karlsen: {
    name: "Karlsen",
    tag: "KLS",
    algorithm: "Karlsenhashv2",
    coingeckoId: null,
    exchange: "Nonkyc",
    exchangeRateBtc: 0.000000004,
    blockReward: 21.83,
    blockTime: 1,
    networkHashrate: 19.97,
    networkHashrateLabel: "19.97 Gh/s",
    difficulty: 19984,
    difficultyLabel: "19,984M",
    gpuMultiplier: 1.12,
  },
  kaspa: {
    name: "Kaspa",
    tag: "KAS",
    algorithm: "kHeavyHash",
    coingeckoId: "kaspa",
    exchange: "MEXC",
    exchangeRateBtc: null,
    blockReward: 103.83,
    blockTime: 1,
    networkHashrate: 950000,
    networkHashrateLabel: "950 Th/s",
    difficulty: 1.2,
    difficultyLabel: "1.2",
    gpuMultiplier: 1.12,
  },
  ravencoin: {
    name: "Ravencoin",
    tag: "RVN",
    algorithm: "KawPow",
    coingeckoId: "ravencoin",
    exchange: "Binance",
    exchangeRateBtc: null,
    blockReward: 1250,
    blockTime: 60,
    networkHashrate: 1580,
    networkHashrateLabel: "1.58 Th/s",
    difficulty: 22103.804,
    difficultyLabel: "22,103.804",
    gpuMultiplier: 0.88,
  },
  ergo: {
    name: "Ergo",
    tag: "ERG",
    algorithm: "Autolykos",
    coingeckoId: "ergo",
    exchange: "MEXC",
    exchangeRateBtc: null,
    blockReward: 3,
    blockTime: 122,
    networkHashrate: 686.92,
    networkHashrateLabel: "686.92 Gh/s",
    difficulty: 83804,
    difficultyLabel: "83,804G",
    gpuMultiplier: 0.92,
  },
  conflux: {
    name: "Conflux",
    tag: "CFX",
    algorithm: "Octopus",
    coingeckoId: "conflux-token",
    exchange: "Binance",
    exchangeRateBtc: null,
    blockReward: 0.4,
    blockTime: 0.5,
    networkHashrate: 718.72,
    networkHashrateLabel: "718.72 Gh/s",
    difficulty: 361443,
    difficultyLabel: "361,443M",
    gpuMultiplier: 1.05,
  },
  ironfish: {
    name: "IronFish",
    tag: "IRON",
    algorithm: "FishHash",
    coingeckoId: "iron-fish",
    exchange: "MEXC",
    exchangeRateBtc: 0.00000132,
    blockReward: 17.25,
    blockTime: 60,
    networkHashrate: 359.5,
    networkHashrateLabel: "359.50 Gh/s",
    difficulty: 21570,
    difficultyLabel: "21,570G",
    gpuMultiplier: 1.22,
  },
  monero: {
    name: "Monero",
    tag: "XMR",
    algorithm: "RandomX",
    coingeckoId: "monero",
    exchange: "Kraken",
    exchangeRateBtc: null,
    blockReward: 0.6,
    blockTime: 120,
    networkHashrate: 4200,
    networkHashrateLabel: "4.20 Gh/s",
    difficulty: 1.0,
    difficultyLabel: "1.0",
    gpuMultiplier: 0.18,
  },
  ethereumClassic: {
    name: "Ethereum Classic",
    tag: "ETC",
    algorithm: "Etchash",
    coingeckoId: "ethereum-classic",
    exchange: "WhiteBIT",
    exchangeRateBtc: null,
    blockReward: 1.99,
    blockTime: 13.36,
    networkHashrate: 191750,
    networkHashrateLabel: "191.75 Th/s",
    difficulty: 2561039,
    difficultyLabel: "2,561,039G",
    gpuMultiplier: 1.0,
  },
  custom: {
    name: "Custom target",
    tag: "CUSTOM",
    algorithm: "Manual",
    coingeckoId: null,
    exchange: "Manual",
    exchangeRateBtc: null,
    blockReward: 4,
    blockTime: 12,
    networkHashrate: 9000,
    difficulty: 1.15,
    gpuMultiplier: 1.0,
  },
};

const livePrices = {};
const PRICE_REFRESH_MS = 60000;
const PLACEHOLDER_TOKEN = {
  id: "ethereum-classic",
  symbol: "PLACEHOLDER",
};
const tickerCoins = [
  ["bitcoin", "BTC"],
  ["ethereum-classic", "ETC"],
  ["ethereum", "ETH"],
  ["zelcash", "FLUX"],
  ["litecoin", "LTC"],
  ["ravencoin", "RVN"],
  ["monero", "XMR"],
];

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
  tickerBar: document.querySelector("#tickerBar"),
  agentConsole: document.querySelector("#agentConsole"),
};

function money(value) {
  return value.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 2,
  });
}

function compactMoney(value) {
  if (!Number.isFinite(value)) return "-";
  if (value < 0.01) return `$${value.toFixed(6)}`;
  if (value < 1) return `$${value.toFixed(4)}`;
  return money(value);
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
  const btcUsd = livePrices.bitcoin?.usd || 0;
  const livePrice = target.coingeckoId ? livePrices[target.coingeckoId]?.usd : null;
  const btcPrice = target.exchangeRateBtc && btcUsd ? target.exchangeRateBtc * btcUsd : null;
  return {
    ...config,
    targetId,
    targetName: target.name,
    targetTag: target.tag,
    algorithm: target.algorithm,
    exchange: target.exchange,
    exchangeRateBtc: target.exchangeRateBtc,
    networkHashrateLabel: target.networkHashrateLabel,
    difficultyLabel: target.difficultyLabel,
    tokenPrice: livePrice || btcPrice || config.tokenPrice,
    blockReward: target.blockReward,
    blockTime: target.blockTime,
    networkHashrate: target.networkHashrate,
    difficulty: target.difficulty,
    gpuMultiplier: target.gpuMultiplier,
    isLivePrice: Boolean(livePrice || btcPrice),
    priceSource: livePrice ? "CoinGecko" : btcPrice ? "BTC exchange rate" : "manual",
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
  const bestProfit = comparison[0]?.result.dailyProfit || 0;
  comparison.forEach(({ id, config, result }) => {
    const recommendation = decide(config, result);
    const profitability = bestProfit !== 0 ? (result.dailyProfit / bestProfit) * 100 : 0;
    const exchangeLabel = config.exchangeRateBtc
      ? `${config.exchangeRateBtc.toFixed(8)} BTC (${config.exchange})`
      : `${compactMoney(config.tokenPrice)} (${config.exchange || config.priceSource})`;
    const row = document.createElement("tr");
    if (id === activeTargetId) row.classList.add("selected-row");
    row.innerHTML = `
      <td>${config.targetName}(${config.targetTag || ""})</td>
      <td>${config.algorithm || "-"}</td>
      <td>BT: ${formatBlockTime(config.blockTime)}<br>BR: ${number(config.blockReward, 4)}</td>
      <td>${config.difficultyLabel || number(config.difficulty, 2)}</td>
      <td>${config.networkHashrateLabel || `${number(config.networkHashrate, 2)} TH/s`}</td>
      <td>${number(result.tokensPerDay, 4)}</td>
      <td>${exchangeLabel}</td>
      <td>${money(result.dailyRevenue)}</td>
      <td>${money(result.dailyProfit)}</td>
      <td>${number(profitability, 0)}%</td>
      <td class="${recommendation.className}">${recommendation.action}</td>
    `;
    row.addEventListener("click", () => {
      inputs.miningTarget.value = id;
      applyMiningTarget();
    });
    output.targetTable.append(row);
  });
}

function formatBlockTime(seconds) {
  if (seconds < 1) return `${seconds}s`;
  if (seconds < 60) return `${number(seconds, 2)}s`;
  const minutes = Math.floor(seconds / 60);
  const rest = Math.round(seconds % 60);
  return rest ? `${minutes}m ${rest}s` : `${minutes}m`;
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
  const idsToFetch = [
    ...Object.values(miningTargets)
    .map((target) => target.coingeckoId)
    .filter(Boolean),
    ...tickerCoins.map(([id]) => id),
  ]
    .filter((id, index, values) => values.indexOf(id) === index)
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
    renderTicker();
    applyMiningTarget();
  } catch (error) {
    output.priceStatus.textContent = "Could not load live prices. The calculator is using manual/demo prices.";
    render();
  }
}

async function fetchLiveCryptoPrices() {
  const ids = ["bitcoin", PLACEHOLDER_TOKEN.id].join(",");
  try {
    const url = `https://api.coingecko.com/api/v3/simple/price?ids=${ids}&vs_currencies=usd&include_24hr_change=true`;
    const response = await fetch(url, { cache: "no-store" });
    if (response.status === 429) {
      throw new Error("CoinGecko rate limit reached. Please wait and refresh again.");
    }
    if (!response.ok) {
      throw new Error(`CoinGecko request failed with HTTP ${response.status}.`);
    }

    const data = await response.json();
    livePrices.bitcoin = data.bitcoin || livePrices.bitcoin;
    livePrices[PLACEHOLDER_TOKEN.id] = data[PLACEHOLDER_TOKEN.id] || livePrices[PLACEHOLDER_TOKEN.id];

    const bitcoinPrice = compactMoney(data.bitcoin?.usd);
    const placeholderPrice = compactMoney(data[PLACEHOLDER_TOKEN.id]?.usd);
    output.tickerBar.innerHTML = `
      <span><strong>BTC</strong>${bitcoinPrice}</span>
      <span><strong>${PLACEHOLDER_TOKEN.symbol}</strong>${placeholderPrice}</span>
    `;
    return data;
  } catch (error) {
    output.tickerBar.innerHTML = `
      <span><strong>Live prices unavailable</strong>${error.message || "Using cached/manual values."}</span>
    `;
    return null;
  }
}

function renderTicker() {
  output.tickerBar.innerHTML = "";
  tickerCoins.forEach(([id, symbol]) => {
    const price = livePrices[id]?.usd;
    const change = livePrices[id]?.usd_24h_change;
    const item = document.createElement("span");
    const direction = change >= 0 ? "good" : "danger";
    item.innerHTML = `<strong>${symbol}</strong>${compactMoney(price)} <em class="${direction}">${Number.isFinite(change) ? `${change.toFixed(1)}%` : ""}</em>`;
    output.tickerBar.append(item);
  });
}

function logAgentAction(agentName, actionText, severity = "info") {
  const firstLine = output.agentConsole.querySelector(".muted");
  if (firstLine) firstLine.remove();

  const line = document.createElement("p");
  line.className = "console-line";

  const agentClass = agentName === "Financial Agent" ? "agent-financial" : "agent-operations";
  const severityClass = severity === "critical" ? "severity-critical" : "";
  const timestamp = new Date().toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });

  line.innerHTML = `
    <span class="console-time">[${timestamp}]</span>
    <span class="agent-tag ${agentClass}">${agentName}</span>
    <span class="${severityClass}">${actionText}</span>
  `;

  output.agentConsole.append(line);
  output.agentConsole.scrollTop = output.agentConsole.scrollHeight;
}

function startMockAgentDecisionLoop() {
  const decisions = [
    ["Financial Agent", "Calculated margin from live token price and network difficulty.", "info"],
    ["Operations Agent", "GPU telemetry normal. Holding current power limit.", "info"],
    ["Financial Agent", "Pearl dropped below profit target. Evaluating target switch.", "warning"],
    ["Operations Agent", "GPU temperature crossed 80C. THROTTLING POWER LIMIT.", "critical"],
    ["Financial Agent", "Auto-selected highest estimated profit target from ranking table.", "info"],
  ];

  let index = 0;
  window.setInterval(() => {
    const [agentName, actionText, severity] = decisions[index % decisions.length];
    logAgentAction(agentName, actionText, severity);
    index += 1;
  }, 2200);
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
fetchLiveCryptoPrices().then(() => {
  renderTicker();
  render();
});
window.setInterval(() => {
  fetchLiveCryptoPrices().then(() => {
    renderTicker();
    render();
  });
}, PRICE_REFRESH_MS);
startMockAgentDecisionLoop();
refreshPrices();
