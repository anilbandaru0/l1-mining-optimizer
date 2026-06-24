from __future__ import annotations

import argparse
import json
from itertools import islice
from pathlib import Path
from time import sleep
from dataclasses import asdict, is_dataclass
from datetime import datetime

from .actions import SafeActionExecutor
from .config import OptimizerConfig
from .graph import MiningDecisionGraph
from .models import OrchestratorState
from .streams import simulated_chain_stream, simulated_hardware_stream


def build_parser() -> argparse.ArgumentParser:
    parser = argparse.ArgumentParser(description="Run the L1 mining optimizer demo.")
    parser.add_argument("--config", type=Path, default=None)
    parser.add_argument("--ticks", type=int, default=10)
    parser.add_argument("--delay", type=float, default=0.0)
    parser.add_argument("--jsonl", type=Path, default=None)
    parser.add_argument("--show-agents", action="store_true")
    parser.add_argument("--dry-run", action="store_true", default=True)
    parser.add_argument("--live-actions", action="store_true")
    return parser


def _json_default(value: object) -> object:
    if isinstance(value, datetime):
        return value.isoformat()
    if is_dataclass(value):
        return asdict(value)
    return str(value)


def _write_jsonl(path: Path, payload: dict[str, object]) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    with path.open("a", encoding="utf-8") as handle:
        handle.write(json.dumps(payload, default=_json_default) + "\n")


def main() -> None:
    args = build_parser().parse_args()
    config = OptimizerConfig.from_json(args.config) if args.config else OptimizerConfig()
    graph = MiningDecisionGraph()
    executor = SafeActionExecutor(config, dry_run=not args.live_actions)

    chain_feed = simulated_chain_stream()
    hardware_feed = simulated_hardware_stream()

    for index, (chain, hardware) in enumerate(
        islice(zip(chain_feed, hardware_feed), args.ticks),
        start=1,
    ):
        state = OrchestratorState(chain=chain, hardware=hardware)
        result = graph.invoke(state, config)
        action = executor.execute(result.final_decision)
        profit = result.profit
        assert profit is not None
        assert result.final_decision is not None
        print(
            f"tick={index:02d} "
            f"price=${chain.token_price_usd:.3f} "
            f"diff={chain.difficulty:.2f} "
            f"hash={hardware.hashrate_ths:.1f}TH/s "
            f"gpu={hardware.gpu_temp_c:.1f}C "
            f"hotspot={hardware.hotspot_temp_c:.1f}C "
            f"watts={hardware.wattage:.0f} "
            f"margin=${profit.margin_usd_per_hour:.2f}/hr "
            f"action={result.final_decision.kind.value} "
            f"executed={action.executed} "
            f"note=\"{action.message}\""
        )
        if args.show_agents:
            print(f"  financial: {result.financial_decision.reason}")
            print(f"  operations: {result.operations_decision.reason}")
        if args.jsonl:
            _write_jsonl(
                args.jsonl,
                {
                    "tick": index,
                    "chain": chain,
                    "hardware": hardware,
                    "profit": profit,
                    "financial_decision": result.financial_decision,
                    "operations_decision": result.operations_decision,
                    "final_decision": result.final_decision,
                    "action": action,
                },
            )
        if args.delay > 0 and index < args.ticks:
            sleep(args.delay)


if __name__ == "__main__":
    main()
