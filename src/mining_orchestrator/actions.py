from __future__ import annotations

import subprocess
from dataclasses import dataclass
from pathlib import Path

from .config import OptimizerConfig
from .models import ActionKind, AgentDecision


@dataclass(frozen=True)
class ActionResult:
    executed: bool
    message: str


class SafeActionExecutor:
    def __init__(self, config: OptimizerConfig, dry_run: bool = True) -> None:
        self.config = config
        self.dry_run = dry_run

    def execute(self, decision: AgentDecision) -> ActionResult:
        if decision.kind == ActionKind.HOLD:
            return ActionResult(False, f"HOLD: {decision.reason}")
        if self.dry_run:
            return ActionResult(False, f"DRY RUN {decision.kind.value}: {decision.reason}")
        if decision.kind == ActionKind.THROTTLE_POWER:
            return self._run_power_limit(decision)
        if decision.kind == ActionKind.SWITCH_TARGET:
            return self._run_switch_target(decision)
        if decision.kind == ActionKind.SHUTDOWN_MINER:
            return self._run_shutdown(decision)
        return ActionResult(False, f"unsupported action {decision.kind.value}")

    def _run_power_limit(self, decision: AgentDecision) -> ActionResult:
        if not self.config.power_limit_script or decision.power_limit_watts is None:
            return ActionResult(False, "power limit script or wattage missing")
        return self._run_script(
            [self.config.power_limit_script, str(decision.power_limit_watts)],
            f"set power limit to {decision.power_limit_watts}W",
        )

    def _run_switch_target(self, decision: AgentDecision) -> ActionResult:
        if not self.config.switch_target_script or not decision.target:
            return ActionResult(False, "switch target script or target missing")
        return self._run_script(
            [self.config.switch_target_script, decision.target],
            f"switched target to {decision.target}",
        )

    def _run_shutdown(self, decision: AgentDecision) -> ActionResult:
        if not self.config.shutdown_script:
            return ActionResult(False, "shutdown requested but no shutdown script is configured")
        return self._run_script(
            [self.config.shutdown_script, decision.reason],
            "shutdown command sent to miner",
        )

    @staticmethod
    def _run_script(command: list[str], success_message: str) -> ActionResult:
        script = Path(command[0])
        if not script.is_absolute():
            script = Path.cwd() / script
        command = [str(script), *command[1:]]
        completed = subprocess.run(command, check=False, capture_output=True, text=True)
        if completed.returncode != 0:
            return ActionResult(
                False,
                f"script failed ({completed.returncode}): {completed.stderr.strip()}",
            )
        return ActionResult(True, success_message)
