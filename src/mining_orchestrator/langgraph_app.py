from __future__ import annotations

from typing import Any, TypedDict

from .agents import financial_agent, operations_agent, supervisor_agent
from .config import OptimizerConfig
from .models import OrchestratorState


class GraphPayload(TypedDict):
    state: OrchestratorState
    config: OptimizerConfig


def build_langgraph_app() -> Any:
    """Build the production LangGraph app when langgraph is installed."""
    try:
        from langgraph.graph import END, StateGraph
    except ImportError as exc:
        raise RuntimeError(
            "langgraph is not installed. Install the optional dependency with "
            "`pip install -e .[langgraph]` or use MiningDecisionGraph."
        ) from exc

    graph = StateGraph(GraphPayload)

    def run_financial(payload: GraphPayload) -> GraphPayload:
        return {
            **payload,
            "state": financial_agent(payload["state"], payload["config"]),
        }

    def run_operations(payload: GraphPayload) -> GraphPayload:
        return {
            **payload,
            "state": operations_agent(payload["state"], payload["config"]),
        }

    def run_supervisor(payload: GraphPayload) -> GraphPayload:
        return {
            **payload,
            "state": supervisor_agent(payload["state"], payload["config"]),
        }

    graph.add_node("financial_agent", run_financial)
    graph.add_node("operations_agent", run_operations)
    graph.add_node("supervisor_agent", run_supervisor)
    graph.set_entry_point("financial_agent")
    graph.add_edge("financial_agent", "operations_agent")
    graph.add_edge("operations_agent", "supervisor_agent")
    graph.add_edge("supervisor_agent", END)
    return graph.compile()

