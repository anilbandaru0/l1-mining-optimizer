# Layer-1 Mining Profitability & Telemetry Orchestrator

Autonomous Python backend for evaluating live Layer-1 mining profitability and hardware telemetry, then issuing guarded operational actions such as throttling power limits or switching mining targets.

The prototype runs without external services by using deterministic simulated streams. Production integrations can replace the stream adapters and action scripts without changing the agent graph.

## Project Blueprint

**The Problem:** The profitability of mining dynamic Layer-1 blockchains like Pearl fluctuates wildly based on tokenomics, network difficulty, and real-time hardware energy costs. Miners usually have to stare at dashboards to make manual adjustments.

**The Unique Twist:** Build an autonomous, agent-driven mining optimizer that controls hardware based on live data streams.

**The Architecture:** The Python backend ingests two heavy data streams: live L1 blockchain metrics such as block rewards and difficulty, plus local hardware telemetry such as hashrate, GPU thermals, and wattage.

**The AI Engine:** A multi-agent LangGraph-style setup powers decisions. The Financial Agent calculates real-time profit margins. The Operations Agent monitors hardware health.

**The Action:** Instead of just showing a dashboard, the system can execute scripts to throttle hardware power limits or switch mining targets when an L1 stops being profitable.

**Why It Wins:** It merges high-throughput data engineering with financial optimization and shows agents interacting directly with physical hardware and financial data streams.

## Website

The GitHub Pages site includes a GPU-based mining calculator. Users can select GPU profiles such as RTX 5090, RTX 4090, RTX 3090, RX 7900 XTX, or Custom GPU, then enter rig size, electricity cost, chain assumptions, and profit targets.

The site can fetch live USD token prices from CoinGecko and compare mining targets in a WhatToMine-style table with algorithm, block time, block reward, difficulty, net hash, estimated rewards, exchange rate, revenue, profit, and profitability ranking.

WhatToMine's documented API requires an API token for calculation endpoints, so the public GitHub Pages version does not depend on private API credentials. It uses live CoinGecko prices plus editable/reference mining assumptions. Network hashrate, rewards, difficulty, and GPU algorithm performance remain editable because exact mining profitability requires chain-specific telemetry and miner-specific benchmark data.

The frontend now uses algorithm-specific GPU profiles instead of one flat hashrate. For example, the same RTX 4090 has different demo metrics for KawPow, kHeavyHash, FishHash, Etchash, Pearl, and RandomX. RandomX is treated as CPU-focused, so GPU hashrate is set to zero unless the user chooses custom metrics.

Pearl and Keryx-style AI-compute mining are modeled differently from traditional hash algorithms. Pearl uses a matrix/tensor throughput index calibrated around public RTX 5090 revenue estimates from the early Pearl mining rush. Keryx is represented as a VRAM-tiered Proof-of-Model demo target where 24 GB to 32 GB cards receive higher effective throughput because model weights can remain resident during inference bursts. These AI-compute targets also surface telemetry signals such as VRAM tier, CUDA utilization, tensor load, hotspot risk, and wattage spikes.

## Run the Demo

```powershell
cd work
python -m mining_orchestrator.cli --ticks 8 --dry-run
```

If `python` is not on PATH, use the included launcher:

```powershell
cd work
.\run_demo.ps1
```

That launcher runs a working end-to-end demo with mock hardware scripts. It writes:

- `logs/actions.log` for executed mock hardware actions
- `logs/decisions.jsonl` for every agent decision

The mock scripts do not touch real hardware. They only append to log files.

## Run the FastAPI Backend

```powershell
cd work
pip install -e .
uvicorn mining_orchestrator.api:app --host 0.0.0.0 --port 8000
```

Example telemetry request:

```powershell
Invoke-RestMethod -Method Post http://localhost:8000/telemetry -ContentType "application/json" -Body '{"current_hashrate":132,"gpu_temp":84,"token_price":0.72,"network_difficulty":1.15}'
```

The backend uses a LangGraph workflow. Operations Agent runs first. If `gpu_temp > 80C`, it immediately routes to a power-limit execution node. Otherwise it routes to the Financial Agent for profitability evaluation.

Docker deployment:

```powershell
cd work
docker build -t l1-mining-orchestrator .
docker run -p 8000:8000 l1-mining-orchestrator
```

## Website Demo

The `docs/` folder contains the GitHub Pages website. GitHub Pages offers `/root` and `/docs`, so choose `/docs` when deploying.

Open locally:

```powershell
cd work\docs
start index.html
```

## Run Tests

```powershell
cd work
python -m unittest discover -s tests
```

## LangGraph Integration

`src/mining_orchestrator/langgraph_app.py` exposes `build_langgraph_app()`. Install the optional dependency when you want the production graph runtime:

```powershell
pip install -e .[langgraph]
```

The default CLI uses the dependency-free `MiningDecisionGraph` so the demo can run in restricted environments.

## Safety Defaults

Actions are dry-run by default. Real hardware changes require both:

- `--live-actions`
- Script paths in config

This keeps the orchestration logic testable without accidentally changing a local rig.
