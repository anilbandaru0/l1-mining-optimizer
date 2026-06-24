from __future__ import annotations

import json
from dataclasses import dataclass
from pathlib import Path
from typing import Any


@dataclass(frozen=True)
class OptimizerConfig:
    energy_price_usd_per_kwh: float = 0.14
    min_margin_usd_per_hour: float = 0.25
    thermal_limit_c: float = 82.0
    critical_thermal_limit_c: float = 88.0
    max_wattage: float = 950.0
    preferred_target: str = "pearl-mainnet"
    fallback_target: str = "pearl-low-diff"
    power_limit_script: str | None = None
    switch_target_script: str | None = None
    shutdown_script: str | None = None

    @classmethod
    def from_json(cls, path: Path) -> "OptimizerConfig":
        data: dict[str, Any] = json.loads(path.read_text(encoding="utf-8"))
        return cls(**data)
