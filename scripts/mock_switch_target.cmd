@echo off
if not exist logs mkdir logs
echo %date% %time% SWITCH_TARGET target=%1>> logs\actions.log
echo mock mining target switched to %1
