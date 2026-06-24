const defaults = {
  gpuCount: 6,
  hashratePerGpu: 22,
  wattsPerGpu: 135,
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
  return Object.fromEntries(
    ids.map((id) => {
      const value = Number(inputs[id].value);
      return [id, Number.isFinite(value) ? value : defaults[id]];
    }),
  );
}

function calculate(config) {
  const totalHashrate = config.gpuCount * config.hashratePerGpu;
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
  const result = calculate(config);
  const recommendation = decide(config, result);

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

output.resetButton.addEventListener("click", reset);

render();
