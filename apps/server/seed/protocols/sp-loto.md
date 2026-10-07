---
id: sp-loto
title: Lockout/tagout and verifying absence of voltage
category: isolation
applies_to: []
rules: [R-LOTO-01, R-VERIFY-01, R-PPE-01, R-NOTIFY-01, R-ESC-01, R-EMERG-01, R-HEALTH-01, R-DOC-01]
osha: [1910.147, 1910.333, 1926.417]
nfpa70e: [Art. 110, Art. 120]
---
## When this applies

- Any work on or near exposed conductors or circuit parts: replacing breakers, devices or fixtures, landing or removing conductors, retorquing, cleaning or inspecting inside enclosures.
- Any work on equipment that could start unexpectedly: motors, drive-fed loads, HVAC units, kitchen equipment.
- Equipment is de-energized only once it is in an electrically safe work condition: isolated, locked, tagged, tried and tested. Until then treat it as energized (R-VERIFY-01).
- Testing before your lock is on is energized diagnostics: follow sp-energized-diagnostics and sp-arc-flash-ppe.

## Hazards

- Missed sources: generators, the emergency side of transfer switches, UPS outputs, solar and battery storage, separately derived control power, multiwire branch circuits sharing a neutral (R-LOTO-01).
- Stored energy: capacitors, drive DC buses, power-factor correction banks, charged breaker springs.
- Induced or backfed voltage on long parallel runs or conductors fed from another panel.
- Someone re-energizing your circuit: the wrong breaker locked, tag-only isolation, a co-worker or customer resetting a device.
- Shock and arc flash during the absence-of-voltage test itself, because the parts are still assumed live.

## PPE & tools

- Kestrel minimum on every site (R-PPE-01): safety glasses, hard hat, arc-rated long-sleeve shirt of at least 8 cal/cm².
- For opening covers and testing: PPE from the equipment's arc-flash label plus voltage-rated gloves with leather protectors (sp-arc-flash-ppe).
- Your own personal lock (one key, kept by you), a danger tag with your name, date and phone number, breaker lockout devices, hasps, and a group lockbox where several workers share an isolation.
- CAT III or CAT IV meter rated for the system voltage, with inspected leads. A non-contact tester is for screening only and never declares a circuit dead (R-VERIFY-01).
- Current one-line diagram, panel schedule and the site file's lockout section.

## Procedure

1. Plan: identify every source that can feed the work using the site file's lockout section for site-specific isolation points, the one-line diagram and the panel schedule. Field-check them; do not rely on directory labels alone.
2. Notify the site contact: 72-hour written notice with acknowledgement for planned shutdowns, immediate notice for emergencies (R-NOTIFY-01). Life-safety, standby and healthcare loads also follow R-EMERG-01 and R-HEALTH-01.
3. Shut the load down with its normal controls first, so the disconnect does not break load current.
4. In label PPE, standing to the side (sp-switching), open every disconnecting means. Where blades or a racked-out position are visible, confirm they are fully open or withdrawn.
5. Apply your own lock and danger tag to each disconnect. Every worker applies their own lock, directly or on the group lockbox; never work under someone else's lock (R-LOTO-01). If a lock cannot be applied, stop: tag-only isolation is not acceptable at Kestrel (R-ESC-01).
6. Never use a push button, selector switch, control circuit or interlock as the isolation point.
7. Release or block stored energy: wait the discharge time marked on drives and capacitor banks, then measure; discharge spring mechanisms per the manufacturer.
8. Try-out: attempt to start the load or operate the device, confirm nothing happens, then return the controls to off (R-LOTO-01).
9. Prove your meter on a known live source.
10. At the point of work, test every phase-to-phase and phase-to-ground combination, and phase-to-neutral where a neutral is present. Include backfeed and control-power terminals.
11. Re-prove the meter on the known live source (live-dead-live, R-VERIFY-01). If the meter fails the second check, the test is void; repeat it with a good meter.
12. Where the supervisor or site file requires temporary protective grounds (medium voltage, induced voltage), apply them only after the absence-of-voltage test.
13. Only now treat the parts as de-energized and start work.
14. To restore: remove tools, jumpers and grounds; refit covers; warn everyone to stay clear and confirm visually that they are; each worker removes only their own lock (R-LOTO-01); re-energize per sp-switching.

## Verification

- Every source on the plan carries a Kestrel lock and tag.
- Try-out done and controls returned to off.
- Live-dead-live completed at the actual point of work, not only at the upstream panel.
- Re-verify after any break in which you lost sight of the isolation point, and at shift change; incoming workers apply their locks before outgoing locks come off.

## Stop-work triggers

- A source you cannot identify, lock or isolate, or a lockout you cannot complete (R-ESC-01).
- Any voltage present after isolation, including readings you cannot explain.
- A disconnect that will not lock, has a damaged handle, or shows overheating or water (R-ESC-01).
- A missing, illegible or expired arc-flash label on gear you must open or test (R-PPE-01).
- Pressure to work under someone else's lock or to skip the test.
- A lock whose owner has left site: only the supervisor arranges removal, after confirming the worker is gone and ensuring they are told before they return (R-LOTO-01, R-ESC-01).

## Records

- Work order: isolation points, lock numbers, test results with meter ID, notification times and acknowledgement (R-NOTIFY-01, R-DOC-01).
- Photos of opened gear before and after the work, with labels visible (R-DOC-01).
- Site-file errors found in the field (wrong directory, extra sources) reported to the supervisor.
