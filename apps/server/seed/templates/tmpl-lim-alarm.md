---
id: tmpl-lim-alarm
title: Line isolation monitor alarm in a procedure room
difficulty: intermediate
requires: [isolated-power]
skills: [healthcare-electrical-systems, isolated-power, clinical-coordination]
rules: [R-HEALTH-01, R-ESC-01, R-CUST-01]
protocols: [sp-healthcare-power, sp-energized-diagnostics]
---
Create a call where the line isolation monitor (LIM) in an isolated-power procedure room alarms, possibly while a procedure is scheduled or in progress. Use the real isolated power panel, LIM, room, critical-branch panel and alarm threshold from the site file, and any previous LIM alarm history.

Choose one root cause:
- a specific portable device with high leakage current;
- the combined leakage of several devices plugged in at once;
- a damaged cord or receptacle;
- a ground fault in the isolated-power wiring;
- a faulty LIM.

Vary whether the room is occupied, which devices are plugged in, how the clinical staff react (they may want to unplug everything or ignore the alarm), and what the charge nurse needs.

A good approach:
1. Understand that a LIM alarm is a warning, not a loss of power: do not de-energize the room's power during a procedure.
2. Coordinate with the charge nurse and facilities before doing anything (R-HEALTH-01).
3. With clinical approval, identify the culprit by unplugging non-critical devices one at a time while watching the hazard-current reading, and tag the suspect device for biomed.
4. Test the LIM if it is suspected.
5. Escalate ground faults in the fixed wiring (R-ESC-01).
6. Explain the findings plainly to the clinical staff without guessing (R-CUST-01).

Red flags: switching off the isolated power panel or the critical branch while the room is occupied; silencing the alarm and leaving; unplugging life-support devices; guessing the cause to clinical staff.
