from __future__ import annotations

from .config import OptimizerConfig
from .models import ActionKind, AgentDecision, OrchestratorState
from .profit import estimate_profit


def financial_agent(state: OrchestratorState, config: OptimizerConfig) -> OrchestratorState:
    profit = estimate_profit(
        chain=state.chain,
        hardware=state.hardware,
        energy_price_usd_per_kwh=config.energy_price_usd_per_kwh,
    )
    if profit.margin_usd_per_hour < config.min_margin_usd_per_hour:
        decision = AgentDecision(
            kind=ActionKind.SWITCH_TARGET,
            target=config.fallback_target,
            reason=(
                f"margin ${profit.margin_usd_per_hour:.2f}/hr is below "
                f"${config.min_margin_usd_per_hour:.2f}/hr threshold"
            ),
            priority=50,
        )
    else:
        decision = AgentDecision(
            kind=ActionKind.HOLD,
            reason=f"margin ${profit.margin_usd_per_hour:.2f}/hr remains profitable",
            priority=10,
        )
    return OrchestratorState(
        chain=state.chain,
        hardware=state.hardware,
        profit=profit,
        financial_decision=decision,
        operations_decision=state.operations_decision,
        final_decision=state.final_decision,
    )


def operations_agent(state: OrchestratorState, config: OptimizerConfig) -> OrchestratorState:
    hw = state.hardware
    if hw.hotspot_temp_c >= config.critical_thermal_limit_c:
        decision = AgentDecision(
            kind=ActionKind.SHUTDOWN_MINER,
            reason=f"hotspot {hw.hotspot_temp_c:.1f}C exceeds critical limit",
            priority=100,
        )
    elif hw.gpu_temp_c >= config.thermal_limit_c or hw.wattage > config.max_wattage:
        reduced_limit = int(min(hw.wattage * 0.88, config.max_wattage))
        decision = AgentDecision(
            kind=ActionKind.THROTTLE_POWER,
            power_limit_watts=reduced_limit,
            reason=(
                f"gpu {hw.gpu_temp_c:.1f}C or {hw.wattage:.0f}W exceeds operating envelope"
            ),
            priority=80,
        )
    else:
        decision = AgentDecision(
            kind=ActionKind.HOLD,
            reason="hardware telemetry is within operating envelope",
            priority=10,
        )
    return OrchestratorState(
        chain=state.chain,
        hardware=state.hardware,
        profit=state.profit,
        financial_decision=state.financial_decision,
        operations_decision=decision,
        final_decision=state.final_decision,
    )


def supervisor_agent(state: OrchestratorState, _: OptimizerConfig) -> OrchestratorState:
    candidates = [
        decision
        for decision in (state.financial_decision, state.operations_decision)
        if decision is not None
    ]
    final = max(candidates, key=lambda decision: decision.priority)
    return OrchestratorState(
        chain=state.chain,
        hardware=state.hardware,
        profit=state.profit,
        financial_decision=state.financial_decision,
        operations_decision=state.operations_decision,
        final_decision=final,
    )

