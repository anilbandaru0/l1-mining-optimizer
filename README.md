# Layer-1 Mining Profitability & Telemetry Orchestrator

Autonomous Python backend for evaluating live Layer-1 mining profitability and hardware telemetry, then issuing guarded operational actions such as throttling power limits or switching mining targets.

The prototype runs without external services by using deterministic simulated streams. Production integrations can replace the stream adapters and action scripts without changing the agent graph.

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

## Website Demo

The `site/` folder contains a static browser demo. You can push this repo to GitHub and deploy `site/` with GitHub Pages, Netlify, or Vercel.

Open locally:

```powershell
cd work\site
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
