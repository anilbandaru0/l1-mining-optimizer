@echo off
if not exist logs mkdir logs
echo %date% %time% POWER_LIMIT watts=%1>> logs\actions.log
echo mock power limit set to %1W
