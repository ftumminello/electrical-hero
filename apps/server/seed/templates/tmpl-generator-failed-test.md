---
id: tmpl-generator-failed-test
title: Generator or transfer switch fails its monthly test
difficulty: advanced
requires: [generator, ats]
skills: [emergency-systems, escalation, customer-communication]
rules: [R-EMERG-01, R-ESC-01, R-NOTIFY-01]
protocols: [sp-generator-ats, sp-switching]
---
Create a call where the site's monthly generator test did not go to plan. The failure is one of:
- the generator failed to start;
- a transfer switch did not transfer within its required time;
- a transfer switch failed to retransfer to normal;
- the generator shut down on an alarm under load.

Use the actual generator, transfer-switch IDs, connected loads and service history from the site file.

Vary which transfer switch is affected, the alarm or symptom facility staff report, whether the building is on normal or emergency power right now, the time of day and occupancy (procedures, tenants), and whether life-safety loads are currently unprotected.

A good approach:
1. Establish the system's current state and which life-safety loads are exposed.
2. Notify the facility manager and confirm whether a fire watch is required (R-EMERG-01).
3. Call the supervisor before any manual transfer-switch operation or any work on the controls (R-ESC-01).
4. Gather data: the controller alarm log, transfer times, voltage and frequency.
5. Coordinate any retest or outage with proper notice (R-NOTIFY-01).
6. Never bypass alarms or shutdowns.

On healthcare sites, the clinical lead must also be involved before anything affects the critical branch.

Red flags: manually forcing a transfer switch without approval; leaving life-safety loads on an unproven source without telling anyone; resetting alarms without recording them; de-energizing critical loads while rooms are occupied.
