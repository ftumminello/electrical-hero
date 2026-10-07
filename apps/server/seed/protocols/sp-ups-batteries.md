---
id: sp-ups-batteries
title: UPS systems and battery cabinets
category: stored-energy
applies_to: [ups]
rules: [R-LOTO-01, R-VERIFY-01, R-PPE-01, R-EWP-01, R-NOTIFY-01, R-ESC-01, R-DOC-01, R-CUST-01]
osha: [1910.133, 1910.137, 1910.147, 1910.151, 1910.333, 1910.335, 1926.441]
nfpa70e: [Art. 120, Art. 130, Art. 240, Art. 320, Art. 340]
---
## When this applies

- Work on or inside a UPS module, its maintenance bypass cabinet, battery cabinet or rack, or any panel fed from a UPS output.
- Battery inspection, testing, torque checks and replacement: VRLA, flooded lead-acid, nickel-cadmium and lithium-ion. Lithium-ion module internals are vendor work only.

## Hazards

- Output backfeed: the inverter, static bypass, maintenance bypass and paralleled modules can each energize the output and downstream panels, even with their normal feeder off.
- DC stored energy: a battery cannot be switched off. Its breaker isolates only downstream; terminals, cables and the breaker line side stay live. Strings commonly run 400 to 550 V DC.
- DC-bus and filter capacitors hold charge after shutdown.
- DC arc flash: battery short-circuit current is high and DC arcs sustain. Use the battery's own label.
- Hydrogen from lead-acid and nickel-cadmium cells, worst during equalize or overcharge; a spark at a terminal can ignite it.
- Electrolyte: sulfuric acid (lead-acid) or potassium hydroxide (nickel-cadmium) causes severe skin and eye burns.
- Thermal runaway: hot or swollen jars, a rotten-egg smell, lithium-ion venting.
- An emergency power off (EPO) button is not a lockout device.

## PPE & tools

- Arc-flash PPE from the UPS and battery labels, plus the Kestrel minimum (R-PPE-01). No label, or older than 5 years: stop (R-ESC-01).
- Voltage-rated gloves with a DC rating above the string voltage, with leather protectors.
- For electrolyte: chemical splash goggles under a face shield, acid-resistant gloves and apron.
- Insulated tools only; no rings or watches; insulating covers for adjacent terminals.
- CAT III/IV meter rated for the DC voltage, DC clamp meter, infrared camera, insulated torque wrench, battery lift.
- A working eyewash within quick reach of the battery before you start (OSHA construction rules set 25 feet as the maximum), and a spill kit with the right neutralizer.

## Procedure

1. Read the site file: bypass arrangement and interlocks, battery type and voltage, breaker names, discharge time, who approves, and the site file's lockout section for site-specific isolation points.
2. Get the load owner's approval; planned work needs 72-hour written notice (R-NOTIFY-01). In maintenance bypass the load has no ride-through.
3. Check the room: ventilation running, no hydrogen alarm, no ignition sources, eyewash flowing, floor dry.
4. Transfer to maintenance bypass strictly in the manufacturer's sequence: UPS to static bypass and confirm "load on bypass"; release the key interlock; close the maintenance bypass breaker; open the output isolation breaker. Never force or defeat an interlock: out of sequence you drop the load or tie unsynchronized sources.
5. Shut down the UPS. Open and lock its input, separate bypass input, output isolation and battery DC breaker with your personal locks (R-LOTO-01).
6. Wait the discharge time on the UPS label. Verify absence of voltage live-dead-live at the input, output and DC terminals, including DC positive and negative each to ground (R-VERIFY-01). The battery side of the DC breaker is still live.
7. Measuring block voltages, internal resistance and temperatures is diagnostic work done in label PPE. Torque checks, cleaning or replacing blocks on a battery are work on energized conductors: do them only under an EEWP (R-EWP-01), justified by infeasibility because a battery cannot be de-energized, with the string opened at the manufacturer's sectionalizing points, insulated tools and one connection at a time. Never rest tools on a battery.
8. If a jar is hot, swollen, cracked or leaking, you smell rotten eggs, or a lithium-ion management system alarms: stop, do not break connections, ventilate, clear the room, and call your supervisor (R-ESC-01) and the UPS vendor.
9. Electrolyte splash: flush eyes or skin at the eyewash for at least 15 minutes, remove contaminated clothing and get medical help. Neutralize spills with the agent for that chemistry.
10. Restore: reinstall sectionalizing links, remove your locks, close the battery breaker, start the UPS and confirm it is synchronized on static bypass. Reverse the bypass sequence: close output isolation, open maintenance bypass, return to inverter. Confirm "load on inverter" and battery charging, then tell the load owner factually what was done (R-CUST-01).

## Verification

- Absence of voltage proven at input, output and DC terminals after the wait time.
- Load on inverter, no active alarms, float voltage and charge current normal.
- Every block voltage within the manufacturer's limits; no connection more than 15 °C above similar ones (escalate if so).

## Stop-work triggers

- An interlock will not release, or the sequence differs from the procedure.
- The DC bus does not decay after the labeled wait time.
- No working eyewash, no ventilation, or a hydrogen alarm.
- Thermal runaway signs, leaking jars, or lithium-ion alarms.
- Missing or expired arc-flash label, a lockout you cannot complete, or pressure to work energized without an EEWP.

## Records

- Before and after photos with labels visible; breaker positions and lock list (R-DOC-01).
- Float voltage, block voltages, internal resistance, temperatures and torque values.
- Bypass start and end times, who approved, and alarms seen.
