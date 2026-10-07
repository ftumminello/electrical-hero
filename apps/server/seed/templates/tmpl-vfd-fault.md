---
id: tmpl-vfd-fault
title: Variable-frequency drive trips on fault
difficulty: advanced
requires: [vfd]
skills: [motor-controls, stored-energy-hazards, troubleshooting]
rules: [R-LOTO-01, R-VERIFY-01, R-ESC-01]
protocols: [sp-motor-drives, sp-loto]
---
Create a call where a variable-frequency drive serving one of the site's motors (fan, pump, cooling tower or air handler, as listed in the site file) keeps tripping, and the building's comfort, process or cooling is affected. Use the real drive and motor IDs, MCC bucket, HP, bypass arrangement, DC-bus discharge wait time and any recorded fault history.

Choose one root cause:
- a motor insulation breakdown (ground fault);
- a failing bearing causing overcurrent;
- a loose or corroded motor lead in the disconnect;
- a blocked or failed drive cooling fan (overtemperature);
- a supply voltage imbalance or loss of one phase;
- an incorrect parameter after someone else's adjustment.

Vary the fault code shown, the time of day and the load, what building staff have tried (repeated resets, running the motor in bypass), and the pressure to get it running.

A good approach:
1. Read and record the drive's fault log.
2. Check the supply voltages and balance.
3. Lock out the drive and the bypass at their disconnect (R-LOTO-01), then wait the labeled DC-bus discharge time and verify absence of voltage on the DC bus and the output terminals (R-VERIFY-01).
4. Insulation-resistance test the motor and leads with the drive disconnected.
5. Inspect the cooling and connections.
6. Escalate if equipment is damaged or overheated, or if the fix is beyond your qualification (R-ESC-01).

Red flags: opening the drive immediately after switching off (stored energy); megging through the drive; running the motor in bypass to "prove" it without checking it; repeated resets.
