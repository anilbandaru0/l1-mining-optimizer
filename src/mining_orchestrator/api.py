from __future__ import annotations

import logging
import os
from typing import Literal, TypedDict

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field

try:
    from langgraph.graph import END, StateGraph
except ImportError as exc:  # pragma: no cover - import guard for local docs readers
    raise RuntimeError(
        "LangGraph is required for the FastAPI backend. Install with `pip install -e .`."
    ) from exc


logging.basicConfig(level=os.getenv("LOG_LEVEL", "INFO"))
logger = logging.getLogger("mining_orchestrator.api")

MIN_PROFIT_SCORE = float(os.getenv("MIN_PROFIT_SCORE", "0.35"))
THERMAL_LIMIT_C = float(os.getenv("THERMAL_LIMIT_C", "80"))


class State(TypedDict):
    current_hashrate: float
    gpu_temp: float
    token_price: float
    network_difficulty: float
    recommended_action: str


class TelemetryPayload(BaseModel):
    current_hashrate: float = Field(..., gt=0, description="Current rig hashrate")
    gpu_temp: float = Field(..., ge=0, description="GPU temperature in Celsius")
    token_price: float = Field(..., ge=0, description="Token price in USD")
    network_difficulty: float = Field(..., gt=0, description="Network difficulty factor")


class DecisionResponse(BaseModel):
    recommended_action: str
    current_hashrate: float
    gpu_temp: float
    token_price: float
    network_difficulty: float


def operations_agent(state: State) -> State:
    if state["gpu_temp"] > THERMAL_LIMIT_C:
        state["recommended_action"] = (
            f"CRITICAL: GPU temp {state['gpu_temp']:.1f}C exceeds "
            f"{THERMAL_LIMIT_C:.1f}C. Route to power-limit execution."
        )
    return state


def financial_agent(state: State) -> State:
    profitability_score = state["token_price"] * state["current_hashrate"] / state["network_difficulty"]
    if profitability_score < MIN_PROFIT_SCORE:
        state["recommended_action"] = (
            f"SWITCH_TARGET: profitability score {profitability_score:.4f} "
            f"is below {MIN_PROFIT_SCORE:.4f}."
        )
    else:
        state["recommended_action"] = (
            f"HOLD_MINING: profitability score {profitability_score:.4f} "
            "is above threshold."
        )
    return state


def lower_power_limit_executor(state: State) -> State:
    # Cloud-native safety: emit a structured decision instead of executing an arbitrary shell command.
    state["recommended_action"] = (
        "LOWER_POWER_LIMIT: approved action payload generated for rig executor "
        f"because GPU temp is {state['gpu_temp']:.1f}C."
    )
    logger.warning(
        "power_limit_action_generated",
        extra={
            "gpu_temp": state["gpu_temp"],
            "current_hashrate": state["current_hashrate"],
        },
    )
    return state


def route_after_operations(state: State) -> Literal["execute_power_limit", "financial_agent"]:
    if state["gpu_temp"] > THERMAL_LIMIT_C:
        return "execute_power_limit"
    return "financial_agent"


def build_workflow():
    graph = StateGraph(State)
    graph.add_node("operations_agent", operations_agent)
    graph.add_node("financial_agent", financial_agent)
    graph.add_node("execute_power_limit", lower_power_limit_executor)
    graph.set_entry_point("operations_agent")
    graph.add_conditional_edges(
        "operations_agent",
        route_after_operations,
        {
            "execute_power_limit": "execute_power_limit",
            "financial_agent": "financial_agent",
        },
    )
    graph.add_edge("execute_power_limit", END)
    graph.add_edge("financial_agent", END)
    return graph.compile()


workflow = build_workflow()

app = FastAPI(
    title="Layer-1 Mining Profitability & Telemetry Orchestrator",
    version="0.1.0",
    description="FastAPI backend using a LangGraph workflow for autonomous mining decisions.",
)

allowed_origins = [
    origin.strip()
    for origin in os.getenv("CORS_ALLOW_ORIGINS", "*").split(",")
    if origin.strip()
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=allowed_origins,
    allow_credentials=False,
    allow_methods=["POST", "GET"],
    allow_headers=["*"],
)


@app.get("/healthz")
def healthz() -> dict[str, str]:
    return {"status": "ok"}


@app.post("/telemetry", response_model=DecisionResponse)
def receive_telemetry(payload: TelemetryPayload) -> DecisionResponse:
    state: State = {
        "current_hashrate": payload.current_hashrate,
        "gpu_temp": payload.gpu_temp,
        "token_price": payload.token_price,
        "network_difficulty": payload.network_difficulty,
        "recommended_action": "PENDING",
    }
    result = workflow.invoke(state)
    logger.info("telemetry_decision", extra={"recommended_action": result["recommended_action"]})
    return DecisionResponse(**result)
