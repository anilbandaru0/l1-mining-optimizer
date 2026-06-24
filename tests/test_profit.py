from datetime import UTC, datetime
import unittest

from mining_orchestrator.models import ChainMetrics, HardwareTelemetry
from mining_orchestrator.profit import estimate_profit


class ProfitTests(unittest.TestCase):
    def test_profit_margin_accounts_for_energy_cost(self) -> None:
        observed_at = datetime(2026, 6, 24, tzinfo=UTC)
        chain = ChainMetrics(
            target="pearl-mainnet",
            block_reward_tokens=4,
            difficulty=1,
            token_price_usd=1,
            network_hashrate_ths=1000,
            observed_at=observed_at,
        )
        hardware = HardwareTelemetry(
            rig_id="rig-a",
            hashrate_ths=100,
            gpu_temp_c=70,
            hotspot_temp_c=78,
            wattage=1000,
            fan_percent=60,
            observed_at=observed_at,
        )

        snapshot = estimate_profit(chain, hardware, energy_price_usd_per_kwh=0.20)

        self.assertEqual(snapshot.revenue_usd_per_hour, 120.0)
        self.assertEqual(snapshot.energy_cost_usd_per_hour, 0.20)
        self.assertEqual(snapshot.margin_usd_per_hour, 119.8)


if __name__ == "__main__":
    unittest.main()
