---
id: tmpl-ev-charger-fault
title: EV charger faulting or not charging
difficulty: intermediate
requires: [ev-chargers]
skills: [troubleshooting, ground-fault-protection, documentation]
rules: [R-LOTO-01, R-VERIFY-01, R-DOC-01]
protocols: [sp-ev-chargers, sp-loto]
---
Create a call about one or more of the site's Level 2 EV chargers: a charger shows a ground-fault (CCID) or a fault light, cars stop charging partway through, or a charger is dead while others work. Use the real charger IDs, the panel and circuits feeding them, load-management settings, and any recorded fault history from the site file.

Choose one root cause:
- a damaged charging cable or connector;
- water in the pedestal or its conduit;
- a loose terminal at the breaker or the charger;
- a failed breaker;
- the load-management setting starving one charger;
- a vehicle-side issue that only looks like a charger fault.

Vary how many chargers are affected, the reported symptom from the property staff, weather (recent rain or washing), and whether the charger network portal shows error codes.

A good approach:
1. Gather the fault codes and history first.
2. Distinguish vehicle-side from site-side problems (try another vehicle or a test adapter).
3. Lock out the charger's circuit at its panel breaker (R-LOTO-01) and verify absence of voltage (R-VERIFY-01) before opening the pedestal.
4. Inspect and test the cable, terminations and insulation.
5. Restore and confirm a full charge session.
6. Record findings, readings and photos in the work order (R-DOC-01).

Red flags: bypassing or disabling the charger's ground-fault protection; opening the pedestal energized; replacing parts without finding the cause; no documentation.
