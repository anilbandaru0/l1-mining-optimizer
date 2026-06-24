from __future__ import annotations

from .models import ChainMetrics, HardwareTelemetry, ProfitSnapshot


SECONDS_PER_HOUR = 3600
BLOCK_TIME_SECONDS = 12


def estimate_profit(
    chain: ChainMetrics,
    hardware: HardwareTelemetry,
    energy_price_usd_per_kwh: float,
) -> ProfitSnapshot:
    """Estimate mining economics from chain reward, difficulty proxy, and rig draw."""
    network_hashrate = max(chain.network_hashrate_ths, 1.0)
    miner_share = max(hardware.hashrate_ths, 0.0) / network_hashrate
    difficulty_penalty = 1.0 / max(chain.difficulty, 1.0)
    blocks_per_hour = SECONDS_PER_HOUR / BLOCK_TIME_SECONDS
    expected_tokens = (
        miner_share
        * chain.block_reward_tokens
        * blocks_per_hour
        * difficulty_penalty
    )
    revenue = expected_tokens * chain.token_price_usd
    energy_cost = (hardware.wattage / 1000.0) * energy_price_usd_per_kwh
    margin = revenue - energy_cost
    margin_percent = (margin / revenue * 100.0) if revenue > 0 else -100.0
    return ProfitSnapshot(
        revenue_usd_per_hour=revenue,
        energy_cost_usd_per_hour=energy_cost,
        margin_usd_per_hour=margin,
        margin_percent=margin_percent,
    )

