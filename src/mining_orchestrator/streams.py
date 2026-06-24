from __future__ import annotations

import math
import random
from collections.abc import Iterator

from .models import ChainMetrics, HardwareTelemetry, utc_now


def simulated_chain_stream(seed: int = 7) -> Iterator[ChainMetrics]:
    rng = random.Random(seed)
    tick = 0
    while True:
        price_wave = math.sin(tick / 3.0) * 0.18
        difficulty_wave = math.cos(tick / 4.0) * 0.22
        yield ChainMetrics(
            target="pearl-mainnet",
            block_reward_tokens=4.0,
            difficulty=max(0.8, 1.15 + difficulty_wave + rng.uniform(-0.06, 0.06)),
            token_price_usd=max(0.05, 0.72 + price_wave + rng.uniform(-0.04, 0.04)),
            network_hashrate_ths=9000 + rng.uniform(-700, 900),
            observed_at=utc_now(),
        )
        tick += 1


def simulated_hardware_stream(seed: int = 19) -> Iterator[HardwareTelemetry]:
    rng = random.Random(seed)
    tick = 0
    while True:
        heat_spike = 11 if tick in {4, 5, 6} else 0
        watt_spike = 180 if tick in {5, 6} else 0
        yield HardwareTelemetry(
            rig_id="rig-a",
            hashrate_ths=max(1.0, 132 + math.sin(tick / 2.0) * 8 + rng.uniform(-3, 3)),
            gpu_temp_c=72 + heat_spike + math.sin(tick / 2.5) * 4 + rng.uniform(-1.5, 1.5),
            hotspot_temp_c=81 + heat_spike + math.sin(tick / 2.0) * 5 + rng.uniform(-1.5, 1.5),
            wattage=810 + watt_spike + rng.uniform(-35, 35),
            fan_percent=68 + heat_spike * 0.8 + rng.uniform(-4, 4),
            observed_at=utc_now(),
        )
        tick += 1

