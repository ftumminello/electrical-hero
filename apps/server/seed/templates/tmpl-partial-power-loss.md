---
id: tmpl-partial-power-loss
title: Tenant reports partial power loss
difficulty: intermediate
requires: [tenant-panels]
skills: [troubleshooting, single-phasing, customer-communication]
rules: [R-LOTO-01, R-VERIFY-01, R-CUST-01]
protocols: [sp-loto, sp-energized-diagnostics, sp-arc-flash-ppe]
---
Create a service call where one tenant has lost part of their power: some lights, receptacles or equipment are dead while others still work. Choose a real tenant and tenant panel from the site file, and one root cause that fits that equipment:
- a tripped pole of a multi-wire branch circuit with a shared neutral;
- a lost phase upstream of the tenant panel (an open fuse in a bus plug, or a failed transformer primary connection);
- a loose or open neutral that makes some circuits read high and others low;
- a failed device or connection on one branch circuit.

Vary the time of day, exactly which loads are affected, what the tenant has already tried (for example, "we reset a breaker and it tripped again"), and include one plausible distraction drawn from the site's service history.

A good approach:
1. Confirm with the tenant exactly what is dead.
2. Check the panel schedule.
3. Measure phase-to-phase and phase-to-neutral voltages at the tenant panel, in PPE that matches the label.
4. Work upstream methodically.
5. Lock out (R-LOTO-01) and verify absence of voltage (R-VERIFY-01) before touching any conductor.
6. Repair, restore and confirm the loads with the tenant.
7. Explain only what was verified (R-CUST-01).

Red flags: resetting breakers repeatedly without investigating; working inside the panel energized; declaring a circuit dead with a non-contact tester; telling the customer a cause before verifying it.
