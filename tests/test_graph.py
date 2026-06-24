from datetime import UTC, datetime
import unittest

from mining_orchestrator.config import OptimizerConfig
from mining_orchestrator.graph import MiningDecisionGraph
from mining_orchestrator.models import ActionKind, ChainMetrics, HardwareTelemetry, OrchestratorState


def _chain(price: float = 0.7, difficulty: float = 1.1) -> ChainMetrics:
    return ChainMetrics(
        target="pearl-mainnet",
        block_reward_tokens=4,
        difficulty=difficulty,
        token_price_usd=price,
        network_hashrate_ths=9000,
        observed_at=datetime(2026, 6, 24, tzinfo=UTC),
    )


def _hardware(temp: float = 72, hotspot: float = 80, watts: float = 800) -> HardwareTelemetry:
    return HardwareTelemetry(
        rig_id="rig-a",
        hashrate_ths=130,
        gpu_temp_c=temp,
        hotspot_temp_c=hotspot,
        wattage=watts,
        fan_percent=70,
        observed_at=datetime(2026, 6, 24, tzinfo=UTC),
    )


class GraphTests(unittest.TestCase):
    def test_supervisor_prioritizes_hardware_protection(self) -> None:
        config = OptimizerConfig(min_margin_usd_per_hour=0.25, thermal_limit_c=82)
        state = OrchestratorState(chain=_chain(), hardware=_hardware(temp=85))

        result = MiningDecisionGraph().invoke(state, config)

        self.assertIsNotNone(result.final_decision)
        self.assertEqual(result.final_decision.kind, ActionKind.THROTTLE_POWER)

    def test_financial_agent_switches_unprofitable_target(self) -> None:
        config = OptimizerConfig(min_margin_usd_per_hour=0.25, fallback_target="pearl-low-diff")
        state = OrchestratorState(
            chain=_chain(price=0.01, difficulty=30),
            hardware=_hardware(watts=900),
        )

        result = MiningDecisionGraph().invoke(state, config)

        self.assertIsNotNone(result.final_decision)
        self.assertEqual(result.final_decision.kind, ActionKind.SWITCH_TARGET)
        self.assertEqual(result.final_decision.target, "pearl-low-diff")


if __name__ == "__main__":
    unittest.main()
