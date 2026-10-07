---
id: sp-ev-chargers
title: Level 2 EV supply equipment
category: ev
applies_to: [ev-chargers]
rules: [R-LOTO-01, R-VERIFY-01, R-PPE-01, R-ESC-01, R-DOC-01, R-LABEL-01, R-LOAD-01, R-CUST-01]
osha: [1910.147, 1910.303, 1910.304, 1910.333, 1910.334, 1910.335]
nfpa70e: [Art. 110, Art. 120, Art. 130]
---
## When this applies

- Fault-finding, repair, replacement or installation of Level 2 electric vehicle supply equipment (EVSE) at 208 or 240 V: wall units, pedestals, their branch circuits, underground conduit, and network or load-management settings.
- DC fast chargers are out of scope: escalate (R-ESC-01) and involve the manufacturer.
- Background: NEC Art. 625 (equipment must include a listed personnel-protection system; EV receptacles need GFCI protection; EVSE is a continuous load).

## Hazards

- Disabling a port in the network portal does not remove power. Some chargers hold charge briefly after the breaker opens; check the label.
- Dual-port pedestals, shared or power-sharing circuits, and separately fed network gateways.
- Water: pedestals in garages and lots, conduit that drains into the base, flooded hand holes, corroded terminals.
- Damaged cables and connectors that vehicles have driven over or that have lain in water.
- The charger's charging-circuit interrupting device (CCID, typically a 20 mA trip) protects drivers from shock; defeating it exposes the public.
- Moving vehicles in parking areas.

## PPE & tools

- Arc-flash label PPE at the panel, plus the Kestrel minimum (R-PPE-01). Missing or expired label: stop (R-ESC-01).
- CAT III/IV meter and proving unit, voltage-rated gloves, insulated tools, personal locks and breaker lockout devices.
- EVSE test adapter (vehicle simulator), insulation-resistance tester, clamp meter, infrared camera, torque screwdriver.
- Cones or barricades for the bay; dry mat if the ground is wet.

## Procedure

1. Before opening anything, gather charger IDs, fault codes and session history from the network portal, which ports are affected, recent rain or washing, and the load-management settings.
2. Separate vehicle-side from site-side: a fault that follows one vehicle across chargers is vehicle-side; one that follows a charger across vehicles is site-side. Confirm with an EVSE test adapter or a known-good vehicle the site provides. For a vehicle-side fault, tell the property staff what you verified and refer the driver to their dealer; do not work on the vehicle or guess (R-CUST-01).
3. Check load management: a charger capped low by power sharing or an offline fallback looks like slow or failed charging. Changes go through the network operator and are recorded.
4. Cone off the bay.
5. Lock out at the panel: open the charger's 2-pole breaker and apply your personal lock and tag, plus every other circuit feeding that pedestal, using the site file's lockout section for site-specific isolation points (R-LOTO-01). Try-out by attempting a session.
6. Wait any discharge time on the charger label, then verify absence of voltage live-dead-live at the charger input terminals, line-to-line and each line to ground (R-VERIFY-01).
7. Inspect for water at the pedestal base, gasket, conduit entries and nearby hand holes. Water inside the pedestal or conduit means water-intruded equipment: call your supervisor (R-ESC-01) and do not re-energize until the cause is fixed, the equipment is dried or replaced per the manufacturer, and the circuit passes insulation testing.
8. Insulation-test the branch-circuit conductors with them disconnected from the charger. Never apply insulation-test voltage through charger electronics.
9. Inspect the cable and connector for cut or crushed jacket, bent or burned pins, a broken latch and strain-relief damage. Replace only with the manufacturer's listed cable assembly.
10. Check terminations at the breaker and the charger for heat damage and torque them to the manufacturer's values.
11. Never bypass, jumper, disable or desensitize the CCID or the charger's ground monitoring, never swap a required GFCI device for a non-GFCI one, and never lift an equipment grounding conductor. Repeated ground-fault trips mean leakage exists: find it.
12. Restore: close the pedestal, remove your lock, let the charger self-test, and run a full charge session with a vehicle or the test adapter. Measure voltage and current at the panel under load and confirm the portal shows no faults.
13. Adding or changing chargers or circuits: confirm panel and feeder capacity first, treating each charger as a continuous load (R-LOAD-01), and update the typed panel schedule and labels (R-LABEL-01).

## Verification

- Absence of voltage proven at the charger input before opening terminals.
- Insulation readings recorded and acceptable; no water inside the enclosure.
- A complete session delivered with no ground-fault or pilot errors.

## Stop-work triggers

- Water in the pedestal, conduit or panel (R-ESC-01).
- A feed you cannot identify or lock, or voltage present after lockout.
- Any request to bypass or defeat ground-fault protection.
- Burned terminals, melted connectors, or overheating more than 15 °C above similar parts.
- Missing or expired arc-flash label at the panel.

## Records

- Charger ID and serial, fault codes, firmware, portal screenshots (R-DOC-01).
- Voltages, load current, insulation readings, torque values.
- Vehicle-side or site-side finding and how it was proven.
- Before and after photos; updated panel schedule if anything changed.
