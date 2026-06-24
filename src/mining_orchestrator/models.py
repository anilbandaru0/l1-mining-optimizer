from __future__ import annotations

from dataclasses import dataclass
from datetime import UTC, datetime
from enum import Enum


class ActionKind(str, Enum):
    HOLD = "hold"
    THROTTLE_POWER = "throttle_power"
    SWITCH_TARGET = "switch_target"
    SHUTDOWN_MINER = "shutdown_miner"


@dataclass(frozen=True)
class ChainMetrics:
    target: str
    block_reward_tokens: float
    difficulty: float
    token_price_usd: float
    network_hashrate_ths: float
    observed_at: datetime


@dataclass(frozen=True)
class HardwareTelemetry:
    rig_id: str
    hashrate_ths: float
    gpu_temp_c: float
    hotspot_temp_c: float
    wattage: float
    fan_percent: float
    observed_at: datetime


@dataclass(frozen=True)
class ProfitSnapshot:
    revenue_usd_per_hour: float
    energy_cost_usd_per_hour: float
    margin_usd_per_hour: float
    margin_percent: float


@dataclass(frozen=True)
class AgentDecision:
    kind: ActionKind
    reason: str
    target: str | None = None
    power_limit_watts: int | None = None
    priority: int = 0


@dataclass(frozen=True)
class OrchestratorState:
    chain: ChainMetrics
    hardware: HardwareTelemetry
    profit: ProfitSnapshot | None = None
    financial_decision: AgentDecision | None = None
    operations_decision: AgentDecision | None = None
    final_decision: AgentDecision | None = None


def utc_now() -> datetime:
    return datetime.now(UTC)

