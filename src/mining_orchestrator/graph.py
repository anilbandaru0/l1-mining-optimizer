from __future__ import annotations

from collections.abc import Callable

from .agents import financial_agent, operations_agent, supervisor_agent
from .config import OptimizerConfig
from .models import OrchestratorState


GraphNode = Callable[[OrchestratorState, OptimizerConfig], OrchestratorState]


class MiningDecisionGraph:
    """Small deterministic graph shaped like a LangGraph workflow.

    The nodes are intentionally pure functions so the same logic can be wired
    into LangGraph StateGraph in production while remaining dependency-free for
    local demos and tests.
    """

    def __init__(self) -> None:
        self.nodes: list[tuple[str, GraphNode]] = [
            ("financial_agent", financial_agent),
            ("operations_agent", operations_agent),
            ("supervisor_agent", supervisor_agent),
        ]

    def invoke(
        self,
        state: OrchestratorState,
        config: OptimizerConfig,
    ) -> OrchestratorState:
        current = state
        for _, node in self.nodes:
            current = node(current, config)
        return current

