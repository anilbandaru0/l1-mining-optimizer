const gpuProfiles = {
  rtx5090: {
    name: "NVIDIA RTX 5090",
    vramGb: 32,
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

const gpuAlgorithmProfiles = {
  rtx5090: {
    name: "NVIDIA RTX 5090",
    RandomX: { hashrate: 0, unit: "kH/s", watts: 0, note: "RandomX is CPU-focused; GPU mining is disabled for this model." },
    MeowPow: { hashrate: 76, unit: "MH/s", watts: 310 },
    kHeavyHash: { hashrate: 3.05, unit: "GH/s", watts: 260 },
    Karlsenhashv2: { hashrate: 3.25, unit: "GH/s", watts: 265 },
    FishHash: { hashrate: 92, unit: "GH/s", watts: 285 },
    KawPow: { hashrate: 82, unit: "MH/s", watts: 310 },
    Etchash: { hashrate: 160, unit: "MH/s", watts: 290 },
    Pearl: { hashrate: 100, unit: "matrix index", watts: 300, tensorTflops: 1650, cudaUtilization: 94 },
    ProofOfModel: { hashrate: 100, unit: "inference index", watts: 320, vramTier: "32 GB top tier", cudaUtilization: 96 },
  },
  rtx4090: {
    name: "NVIDIA RTX 4090",
    vramGb: 24,
    RandomX: { hashrate: 0, unit: "kH/s", watts: 0, note: "RandomX is CPU-focused; use host CPU metrics." },
    MeowPow: { hashrate: 66, unit: "MH/s", watts: 280 },
    kHeavyHash: { hashrate: 2.55, unit: "GH/s", watts: 225 },
    Karlsenhashv2: { hashrate: 2.72, unit: "GH/s", watts: 230 },
    FishHash: { hashrate: 78, unit: "GH/s", watts: 255 },
    KawPow: { hashrate: 70, unit: "MH/s", watts: 285 },
    Etchash: { hashrate: 132, unit: "MH/s", watts: 255 },
    Pearl: { hashrate: 72, unit: "matrix index", watts: 245, tensorTflops: 1050, cudaUtilization: 91 },
    ProofOfModel: { hashrate: 76, unit: "inference index", watts: 275, vramTier: "24 GB high tier", cudaUtilization: 92 },
  },
  rtx4080super: {
    name: "NVIDIA RTX 4080 Super",
    vramGb: 16,
    RandomX: { hashrate: 0, unit: "kH/s", watts: 0, note: "RandomX is CPU-focused; use host CPU metrics." },
    MeowPow: { hashrate: 52, unit: "MH/s", watts: 235 },
    kHeavyHash: { hashrate: 1.85, unit: "GH/s", watts: 190 },
    Karlsenhashv2: { hashrate: 2.02, unit: "GH/s", watts: 195 },
    FishHash: { hashrate: 58, unit: "GH/s", watts: 215 },
    KawPow: { hashrate: 54, unit: "MH/s", watts: 235 },
    Etchash: { hashrate: 105, unit: "MH/s", watts: 220 },
    Pearl: { hashrate: 50, unit: "matrix index", watts: 210, tensorTflops: 720, cudaUtilization: 88 },
    ProofOfModel: { hashrate: 42, unit: "inference index", watts: 230, vramTier: "16 GB mid tier", cudaUtilization: 86 },
  },
  rtx4070tisuper: {
    name: "NVIDIA RTX 4070 Ti Super",
    vramGb: 16,
    RandomX: { hashrate: 0, unit: "kH/s", watts: 0, note: "RandomX is CPU-focused; use host CPU metrics." },
    MeowPow: { hashrate: 43, unit: "MH/s", watts: 190 },
    kHeavyHash: { hashrate: 1.45, unit: "GH/s", watts: 155 },
    Karlsenhashv2: { hashrate: 1.62, unit: "GH/s", watts: 160 },
    FishHash: { hashrate: 47, unit: "GH/s", watts: 175 },
    KawPow: { hashrate: 45, unit: "MH/s", watts: 190 },
    Etchash: { hashrate: 85, unit: "MH/s", watts: 175 },
    Pearl: { hashrate: 39, unit: "matrix index", watts: 170, tensorTflops: 540, cudaUtilization: 86 },
    ProofOfModel: { hashrate: 36, unit: "inference index", watts: 190, vramTier: "16 GB mid tier", cudaUtilization: 84 },
  },
  rtx3090: {
    name: "NVIDIA RTX 3090",
    vramGb: 24,
    RandomX: { hashrate: 0, unit: "kH/s", watts: 0, note: "RandomX is CPU-focused; use host CPU metrics." },
    MeowPow: { hashrate: 48, unit: "MH/s", watts: 330 },
    kHeavyHash: { hashrate: 1.2, unit: "GH/s", watts: 245 },
    Karlsenhashv2: { hashrate: 1.35, unit: "GH/s", watts: 250 },
    FishHash: { hashrate: 44, unit: "GH/s", watts: 285 },
    KawPow: { hashrate: 58, unit: "MH/s", watts: 335 },
    Etchash: { hashrate: 122, unit: "MH/s", watts: 300 },
    Pearl: { hashrate: 34, unit: "matrix index", watts: 285, tensorTflops: 360, cudaUtilization: 82 },
    ProofOfModel: { hashrate: 52, unit: "inference index", watts: 330, vramTier: "24 GB high tier", cudaUtilization: 83 },
  },
  rtx3080: {
    name: "NVIDIA RTX 3080",
    vramGb: 10,
    RandomX: { hashrate: 0, unit: "kH/s", watts: 0, note: "RandomX is CPU-focused; use host CPU metrics." },
    MeowPow: { hashrate: 38, unit: "MH/s", watts: 270 },
    kHeavyHash: { hashrate: 0.95, unit: "GH/s", watts: 210 },
    Karlsenhashv2: { hashrate: 1.05, unit: "GH/s", watts: 215 },
    FishHash: { hashrate: 34, unit: "GH/s", watts: 240 },
    KawPow: { hashrate: 47, unit: "MH/s", watts: 275 },
    Etchash: { hashrate: 98, unit: "MH/s", watts: 230 },
    Pearl: { hashrate: 28, unit: "matrix index", watts: 225, tensorTflops: 290, cudaUtilization: 80 },
    ProofOfModel: { hashrate: 16, unit: "inference index", watts: 250, vramTier: "10 GB low tier", cudaUtilization: 78 },
  },
  rx7900xtx: {
    name: "AMD Radeon RX 7900 XTX",
    vramGb: 24,
    RandomX: { hashrate: 0, unit: "kH/s", watts: 0, note: "RandomX is CPU-focused; use host CPU metrics." },
    MeowPow: { hashrate: 42, unit: "MH/s", watts: 285 },
    kHeavyHash: { hashrate: 1.35, unit: "GH/s", watts: 235 },
    Karlsenhashv2: { hashrate: 1.48, unit: "GH/s", watts: 240 },
    FishHash: { hashrate: 45, unit: "GH/s", watts: 260 },
    KawPow: { hashrate: 49, unit: "MH/s", watts: 285 },
    Etchash: { hashrate: 105, unit: "MH/s", watts: 255 },
    Pearl: { hashrate: 31, unit: "matrix index", watts: 250, tensorTflops: 320, cudaUtilization: 0 },
    ProofOfModel: { hashrate: 45, unit: "inference index", watts: 285, vramTier: "24 GB high VRAM tier", cudaUtilization: 0 },
  },
  rx7800xt: {
    name: "AMD Radeon RX 7800 XT",
    vramGb: 16,
    RandomX: { hashrate: 0, unit: "kH/s", watts: 0, note: "RandomX is CPU-focused; use host CPU metrics." },
    MeowPow: { hashrate: 31, unit: "MH/s", watts: 205 },
    kHeavyHash: { hashrate: 0.98, unit: "GH/s", watts: 165 },
    Karlsenhashv2: { hashrate: 1.08, unit: "GH/s", watts: 170 },
    FishHash: { hashrate: 33, unit: "GH/s", watts: 185 },
    KawPow: { hashrate: 35, unit: "MH/s", watts: 205 },
    Etchash: { hashrate: 75, unit: "MH/s", watts: 180 },
    Pearl: { hashrate: 22, unit: "matrix index", watts: 175, tensorTflops: 230, cudaUtilization: 0 },
    ProofOfModel: { hashrate: 28, unit: "inference index", watts: 205, vramTier: "16 GB mid VRAM tier", cudaUtilization: 0 },
  },
};

const miningTargets = {
  keryx: {
    name: "Keryx",
    tag: "KRX",
    algorithm: "Proof-of-Model",
    profileAlgorithm: "ProofOfModel",
    coingeckoId: null,
    exchange: "Nonkyc",
    exchangeRateBtc: 0.00000024,
    blockReward: 1,
    blockTime: 60,
    networkHashrate: 6800,
    networkHashrateLabel: "6,800 inference-index",
    difficulty: 1,
    difficultyLabel: "VRAM-tiered",
    gpuMultiplier: 1,
    aiWorkload: "VRAM-resident model inference",
  },
  pearl: {
    name: "Pearl",
    tag: "PRL",
    algorithm: "Pearl",
    profileAlgorithm: "Pearl",
    coingeckoId: null,
    exchange: "SafeTrade",
    exchangeRateBtc: 0.0000001,
    blockReward: 1,
    blockTime: 86400,
    networkHashrate: 3560,
    networkHashrateLabel: "3,560 matrix-index",
    difficulty: 1,
    difficultyLabel: "matrix math load",
    gpuMultiplier: 1.0,
    aiWorkload: "PoUW matrix multiplication",
  },
  qubitcoin: {
    name: "Qubitcoin",
    tag: "QTC",
    algorithm: "Qhash",
    profileAlgorithm: "kHeavyHash",
    coingeckoId: null,
    exchange: "SafeTrade",
    exchangeRateBtc: 0.00001023,
    blockReward: 50,
    blockTime: 633,
    networkHashrate: 11610000,
    networkHashrateLabel: "11.61 Th/s",
    difficulty: 7346558.635,
    difficultyLabel: "7,346,558,635M",
    gpuMultiplier: 8.5,
  },
  zano: {
    name: "Zano",
    tag: "ZANO",
    algorithm: "ProgPowZ",
    profileAlgorithm: "MeowPow",
    coingeckoId: "zano",
    exchange: "MEXC",
    exchangeRateBtc: 0.00017052,
    blockReward: 1,
    blockTime: 120,
    networkHashrate: 441060,
    networkHashrateLabel: "441.06 Gh/s",
    difficulty: 52926.837,
    difficultyLabel: "52,926,837M",
    gpuMultiplier: 1.35,
  },
  tariCuckaroo: {
    name: "Tari-Cuckaroo29",
    tag: "XTM",
    algorithm: "Cuckaroo29",
    profileAlgorithm: "RandomX",
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
    profileAlgorithm: "MeowPow",
    coingeckoId: null,
    exchange: "Nonkyc",
    exchangeRateBtc: 0.0000028,
    blockReward: 0.99,
    blockTime: 120,
    networkHashrate: 9980,
    networkHashrateLabel: "9.98 Gh/s",
    difficulty: 598695,
    difficultyLabel: "598,695M",
    gpuMultiplier: 1.18,
  },
  mewc: {
    name: "MEWC-MeowPow",
    tag: "MEWC",
    algorithm: "MeowPow",
    profileAlgorithm: "MeowPow",
    coingeckoId: null,
    exchange: "Nonkyc",
    exchangeRateBtc: 0.000000004,
    blockReward: 3000,
    blockTime: 120,
    networkHashrate: 4410,
    networkHashrateLabel: "4.41 Gh/s",
    difficulty: 123.289,
    difficultyLabel: "123.289",
    gpuMultiplier: 0.9,
  },
  karlsen: {
    name: "Karlsen",
    tag: "KLS",
    algorithm: "Karlsenhashv2",
    profileAlgorithm: "Karlsenhashv2",
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
    profileAlgorithm: "kHeavyHash",
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
    profileAlgorithm: "KawPow",
    coingeckoId: "ravencoin",
    exchange: "Binance",
    exchangeRateBtc: null,
    blockReward: 1250,
    blockTime: 60,
    networkHashrate: 1580000,
    networkHashrateLabel: "1.58 Th/s",
    difficulty: 22103.804,
    difficultyLabel: "22,103.804",
    gpuMultiplier: 0.88,
  },
  ergo: {
    name: "Ergo",
    tag: "ERG",
    algorithm: "Autolykos",
    profileAlgorithm: "Etchash",
    coingeckoId: "ergo",
    exchange: "MEXC",
    exchangeRateBtc: null,
    blockReward: 3,
    blockTime: 122,
    networkHashrate: 686920,
    networkHashrateLabel: "686.92 Gh/s",
    difficulty: 83804,
    difficultyLabel: "83,804G",
    gpuMultiplier: 0.92,
  },
  conflux: {
    name: "Conflux",
    tag: "CFX",
    algorithm: "Octopus",
    profileAlgorithm: "Etchash",
    coingeckoId: "conflux-token",
    exchange: "Binance",
    exchangeRateBtc: null,
    blockReward: 0.4,
    blockTime: 0.5,
    networkHashrate: 718720,
    networkHashrateLabel: "718.72 Gh/s",
    difficulty: 361443,
    difficultyLabel: "361,443M",
    gpuMultiplier: 1.05,
  },
  ironfish: {
    name: "IronFish",
    tag: "IRON",
    algorithm: "FishHash",
    profileAlgorithm: "FishHash",
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
    profileAlgorithm: "RandomX",
    coingeckoId: "monero",
    exchange: "Kraken",
    exchangeRateBtc: null,
    blockReward: 0.6,
    blockTime: 120,
    networkHashrate: 4200000,
    networkHashrateLabel: "4.20 Gh/s",
    difficulty: 1.0,
    difficultyLabel: "1.0",
    gpuMultiplier: 0.18,
  },
  ethereumClassic: {
    name: "Ethereum Classic",
    tag: "ETC",
    algorithm: "Etchash",
    profileAlgorithm: "Etchash",
    coingeckoId: "ethereum-classic",
    exchange: "WhiteBIT",
    exchangeRateBtc: null,
    blockReward: 1.99,
    blockTime: 13.36,
    networkHashrate: 191750000,
    networkHashrateLabel: "191.75 Th/s",
    difficulty: 2561039,
    difficultyLabel: "2,561,039G",
    gpuMultiplier: 1.0,
  },
  custom: {
    name: "Custom target",
    tag: "CUSTOM",
    algorithm: "Manual",
    profileAlgorithm: "Custom",
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
  aiTelemetrySignal: document.querySelector("#aiTelemetrySignal"),
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
    profileAlgorithm: target.profileAlgorithm || target.algorithm,
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

function getGpuMetrics(gpuModel, algorithm) {
  if (gpuModel === "custom" || algorithm === "Custom" || algorithm === "Manual") {
    return {
      hashrate: Number(inputs.hashratePerGpu.value) || 0,
      unit: "custom",
      watts: Number(inputs.wattsPerGpu.value) || 0,
      note: "Custom GPU metrics from the manual input fields.",
    };
  }

  const profile = gpuAlgorithmProfiles[gpuModel] || gpuAlgorithmProfiles.rtx4090;
  const metrics = profile[algorithm];
  if (metrics) return metrics;

  return {
    hashrate: Number(inputs.hashratePerGpu.value) || 0,
    unit: "custom",
    watts: Number(inputs.wattsPerGpu.value) || 0,
    note: `No ${algorithm} preset found for ${profile.name}. Using manual fields.`,
  };
}

function describeAiTelemetry(gpuModel, config, result) {
  const profile = gpuAlgorithmProfiles[gpuModel] || gpuAlgorithmProfiles.rtx4090;
  const metrics = getGpuMetrics(gpuModel, config.profileAlgorithm || config.algorithm);
  if (config.profileAlgorithm === "Pearl") {
    return `Pearl matrix load: ${number(metrics.tensorTflops || 0, 0)} tensor TFLOPS index, ${number(metrics.cudaUtilization || 0, 0)}% CUDA target, ${number(result.totalWatts, 0)}W spike budget`;
  }
  if (config.profileAlgorithm === "ProofOfModel") {
    return `Keryx PoM: ${profile.vramGb || 0}GB VRAM, ${metrics.vramTier || "custom tier"}, ${number(metrics.cudaUtilization || 0, 0)}% compute burst`;
  }
  if (config.profileAlgorithm === "RandomX") {
    return "RandomX is CPU-focused; GPU hashrate is treated as zero unless custom metrics are entered.";
  }
  return `Traditional ${config.algorithm} mining: ${number(result.totalHashrate, 2)} ${result.algorithmUnit}, ${number(result.totalWatts, 0)}W`;
}

function calculate(config) {
  const metrics = getGpuMetrics(config.gpuModel, config.profileAlgorithm || config.algorithm);
  const totalHashrate = config.gpuCount * metrics.hashrate;
  const totalWatts = config.gpuCount * metrics.watts + config.baseWatts;
  const blocksPerDay = 86400 / Math.max(config.blockTime, 1);
  const minerShare = totalHashrate / Math.max(config.networkHashrate, 1);
  // Use network-hashrate share for reward estimates. Difficulty is displayed as telemetry;
  // using both net hash and difficulty here would double-count network hardness.
  const tokensPerDay = minerShare * config.blockReward * blocksPerDay;
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
    algorithmHashrate: metrics.hashrate,
    algorithmUnit: metrics.unit,
    algorithmWatts: metrics.watts,
    algorithmNote: metrics.note || "",
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

  output.totalHashrate.textContent = `${number(result.totalHashrate, 2)} ${result.algorithmUnit}`;
  output.totalWatts.textContent = `${number(result.totalWatts, 0)} W`;
  output.dailyRevenue.textContent = money(result.dailyRevenue);
  output.dailyEnergy.textContent = money(result.dailyEnergy);
  output.dailyProfit.textContent = money(result.dailyProfit);
  output.monthlyProfit.textContent = money(result.monthlyProfit);
  output.tokensPerDay.textContent = `${number(result.tokensPerDay, 4)} tokens/day`;
  output.revenueAfterFee.textContent = `${money(result.dailyRevenue)}/day`;
  output.breakEvenPower.textContent = `${money(result.breakEvenPower)}/kWh`;
  output.efficiency.textContent = `${number(result.efficiency, 2)} W per ${result.algorithmUnit}`;
  output.aiTelemetrySignal.textContent = describeAiTelemetry(config.gpuModel, activeConfig, result);
  output.agentAction.textContent = recommendation.action;
  output.agentAction.className = recommendation.className;
  output.agentReason.textContent = recommendation.reason;
  output.gpuNote.textContent = profile.note;
  output.selectedTarget.textContent = activeConfig.targetName || "Custom target";
  output.targetReason.textContent = resolved.reason;
  renderTargetTable(resolved.comparison, activeConfig.targetId || "custom");
  updateProfitabilityTable();
}

function applyGpuProfile() {
  const profile = gpuProfiles[inputs.gpuModel.value] || gpuProfiles.custom;
  const defaultMetrics = getGpuMetrics(inputs.gpuModel.value, "Etchash");
  inputs.hashratePerGpu.value = defaultMetrics.hashrate || profile.hashratePerGpu;
  inputs.wattsPerGpu.value = defaultMetrics.watts || profile.wattsPerGpu;
  render();
}

function renderGpuTable() {
  output.gpuTable.innerHTML = "";
  Object.entries(gpuProfiles)
    .filter(([id]) => id !== "custom")
    .forEach(([id, profile]) => {
      const primaryMetrics = getGpuMetrics(id, "Etchash");
      const efficiency = primaryMetrics.watts / primaryMetrics.hashrate;
      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${profile.name}</td>
        <td>${number(primaryMetrics.hashrate, 1)} ${primaryMetrics.unit} Etchash</td>
        <td>${number(primaryMetrics.watts, 0)} W</td>
        <td>${number(efficiency, 2)} W per ${primaryMetrics.unit}</td>
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
    row.dataset.targetId = id;
    row.dataset.algorithm = config.profileAlgorithm || config.algorithm || "";
    if (id === activeTargetId) row.classList.add("selected-row");
    row.innerHTML = `
      <td>${config.targetName}(${config.targetTag || ""})</td>
      <td>${config.algorithm || "-"}</td>
      <td>BT: ${formatBlockTime(config.blockTime)}<br>BR: ${number(config.blockReward, 4)}</td>
      <td>${config.difficultyLabel || number(config.difficulty, 2)}</td>
      <td>${config.networkHashrateLabel || `${number(config.networkHashrate, 2)} TH/s`}</td>
      <td class="cell-rewards">${number(result.tokensPerDay, 4)}</td>
      <td>${exchangeLabel}</td>
      <td class="cell-revenue">${money(result.dailyRevenue)}</td>
      <td class="cell-profit">${money(result.dailyProfit)}</td>
      <td class="cell-profitability">${number(profitability, 0)}%</td>
      <td class="cell-agent ${recommendation.className}">${recommendation.action}</td>
    `;
    row.addEventListener("click", () => {
      inputs.miningTarget.value = id;
      applyMiningTarget();
    });
    output.targetTable.append(row);
  });
}

function calculateTargetRow(targetId, config) {
  const candidateConfig = targetConfig(config, targetId);
  return {
    config: candidateConfig,
    result: calculate(candidateConfig),
  };
}

function updateProfitabilityTable() {
  const baseConfig = readConfig();
  const rows = [...output.targetTable.querySelectorAll("tr")];
  const rowResults = rows.map((row) => {
    const targetId = row.dataset.targetId;
    const rowAlgorithm = row.dataset.algorithm;
    const metrics = getGpuMetrics(baseConfig.gpuModel, rowAlgorithm);
    const { config, result } = calculateTargetRow(targetId, baseConfig);
    const recommendation = decide(config, result);
    const totalRigPowerWatts = metrics.watts * baseConfig.gpuCount + baseConfig.baseWatts;
    const dailyPowerCost = (totalRigPowerWatts * 24) / 1000 * baseConfig.electricityCost;
    const dailyRevenue = result.tokensPerDay * config.tokenPrice * (1 - baseConfig.poolFee / 100);
    const netDailyProfit = dailyRevenue - dailyPowerCost;

    row.querySelector(".cell-rewards").textContent = number(result.tokensPerDay, 4);
    row.querySelector(".cell-revenue").textContent = money(dailyRevenue);
    row.querySelector(".cell-profit").textContent = money(netDailyProfit);
    row.querySelector(".cell-agent").textContent = recommendation.action;
    row.querySelector(".cell-agent").className = `cell-agent ${recommendation.className}`;

    return {
      row,
      targetId,
      config,
      result: {
        ...result,
        dailyRevenue,
        dailyEnergy: dailyPowerCost,
        dailyProfit: netDailyProfit,
      },
    };
  });

  const best = rowResults.sort((a, b) => b.result.dailyProfit - a.result.dailyProfit)[0];
  if (!best) return;

  const bestProfit = best.result.dailyProfit || 1;
  rowResults.forEach(({ row, result }) => {
    const profitability = (result.dailyProfit / bestProfit) * 100;
    row.querySelector(".cell-profitability").textContent = `${number(profitability, 0)}%`;
    row.classList.toggle("selected-row", row === best.row);
  });

  if (baseConfig.miningTarget === "auto") {
    const recommendation = decide(baseConfig, best.result);
    output.selectedTarget.textContent = best.config.targetName;
    output.targetReason.textContent = `${best.config.targetName} currently has the highest actual net profit after algorithm-specific hashrate and power costs.`;
    output.agentAction.textContent = recommendation.action;
    output.agentAction.className = recommendation.className;
    output.agentReason.textContent = recommendation.reason;
    output.dailyRevenue.textContent = money(best.result.dailyRevenue);
    output.dailyEnergy.textContent = money(best.result.dailyEnergy);
    output.dailyProfit.textContent = money(best.result.dailyProfit);
    output.monthlyProfit.textContent = money(best.result.dailyProfit * 30);
    output.totalHashrate.textContent = `${number(best.result.totalHashrate, 2)} ${best.result.algorithmUnit}`;
    output.totalWatts.textContent = `${number(best.result.totalWatts, 0)} W`;
    output.tokensPerDay.textContent = `${number(best.result.tokensPerDay, 4)} tokens/day`;
    output.revenueAfterFee.textContent = `${money(best.result.dailyRevenue)}/day`;
    output.breakEvenPower.textContent = `${money(best.result.breakEvenPower)}/kWh`;
    output.efficiency.textContent = `${number(best.result.efficiency, 2)} W per ${best.result.algorithmUnit}`;
    output.aiTelemetrySignal.textContent = describeAiTelemetry(baseConfig.gpuModel, best.config, best.result);
  }
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
    ["Financial Agent", "Calculated margin from live token price, block rewards, and network load.", "info"],
    ["Operations Agent", "Telemetry normal: VRAM allocation stable and wattage inside envelope.", "info"],
    ["Financial Agent", "Pearl matrix workload repriced after difficulty and exchange-rate shift.", "warning"],
    ["Operations Agent", "Inference burst detected: CUDA utilization and hotspot temperature spiked. THROTTLING POWER LIMIT.", "critical"],
    ["Financial Agent", "Auto-selected highest estimated net profit target after algorithm-specific GPU metrics.", "info"],
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
