@echo off
if not exist logs mkdir logs
echo %date% %time% SHUTDOWN reason=%*>> logs\actions.log
echo mock miner shutdown requested
