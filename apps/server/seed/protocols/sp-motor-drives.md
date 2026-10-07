---
id: sp-motor-drives
title: Variable-frequency drives and motor circuits
category: stored-energy
applies_to: [vfd]
rules: [R-LOTO-01, R-VERIFY-01, R-PPE-01, R-ESC-01, R-NOTIFY-01, R-DOC-01, R-CUST-01]
osha: [1910.147, 1910.333, 1910.334, 1910.335]
nfpa70e: [Art. 120, Art. 130, Art. 230, Art. 340, Art. 360]
---
## When this applies

- Work on a variable-frequency drive (VFD), its bypass, reactors or filters, the motor disconnect, leads or motor.
- Troubleshooting trips, insulation-testing motors, replacing drive parts or drives.

## Hazards

- DC-bus capacitors hold lethal voltage (roughly 650 to 800 V DC on a 480 V drive) for minutes after input power is removed. A dark keypad or an unlit charge lamp does not prove discharge.
- Bypass contactors run the motor across the line, sometimes from a source the drive's own disconnect does not isolate.
- Back-feed from the motor: a fan windmilling in airflow, or a pump spun by backflow, generates voltage at the motor leads and drive output. Permanent-magnet motors do this strongly.
- Separate sources: external control power, automation wiring, shared DC bus, braking units.
- Automatic restart: remote start commands, auto-reset, smoke-control overrides.
- Insulation-tester voltage destroys drive electronics; windings hold charge after the test.
- Rotating shafts, belts and fans; arc flash at the drive input and MCC.

## PPE & tools

- Arc-flash label PPE for opening buckets or covers and for testing, plus the Kestrel minimum (R-PPE-01). Missing or expired label: stop (R-ESC-01).
- CAT III/IV meter rated at least 1000 V DC, with proving unit; voltage-rated gloves; insulated tools.
- Insulation-resistance tester and a grounding lead to discharge windings.
- Personal locks for every disconnect; the drive manual and the site file's drive data.

## Procedure

1. Before powering down, photograph the fault log and active fault. Measure supply voltage phase-to-phase for imbalance or a lost phase. Do not keep resetting: a repeat trip is evidence.
2. Agree the outage with the site contact and say what stops (ventilation, cooling, pumping). Planned work needs 72-hour written notice (R-NOTIFY-01).
3. Stop the motor normally. Open and lock the disconnect feeding the drive and the bypass (some packages have one common disconnect, others two), the motor local disconnect for motor work, and any external control power, using the site file's lockout section for site-specific isolation points (R-LOTO-01). Never open a motor disconnect while the drive is running the motor.
4. Confirm the fan or pump has stopped turning; restrain windmilling fans or close dampers or valves as the site allows.
5. Try-out: give a start from the keypad, the hand-off-auto switch and in bypass; nothing may run.
6. Wait the full DC-bus discharge time on the drive label, timed from removal of input power, or longer if the site file says so.
7. Verify absence of voltage live-dead-live (R-VERIFY-01): input terminals phase-to-phase and to ground; DC bus positive to negative and each to ground; output terminals phase-to-phase and to ground; bypass contactor terminals; externally powered control terminals. Proceed only when the DC bus reads below 50 V DC and falling, or the lower value the manufacturer gives.
8. If the DC bus has not discharged after the labeled time, close the cover, wait and re-measure. Never short it with a tool. If it stays charged, the bleed circuit has failed: call your supervisor (R-ESC-01).
9. Insulation testing: disconnect the motor leads from the drive output terminals, or test from the motor side of an open disconnect, so the drive and any output filter are out of the circuit. Never apply test voltage to a drive. Test each phase to ground at the voltage set by the site procedure or motor maker (often 500 or 1000 V DC for 480 V motors). Record readings and test time, then ground the winding for at least as long as you tested. Escalate low or falling readings.
10. Bypass: running the motor in bypass needs the site's approval, a motor and leads that passed insulation testing, and confirmation that full-speed operation will not over-pressurize ducts or piping. Never use bypass to prove an untested motor.
11. Inspect cooling fans, filters, heat sinks and terminations; torque to the manufacturer's values. Escalate any connection more than 15 °C above similar ones.
12. Change drive parameters only if the site file names Kestrel as authorized; record before and after values.
13. Restore: reconnect and torque leads, remove your locks, start in drive mode, check rotation and per-phase current against nameplate, and confirm no faults. Report verified findings only (R-CUST-01).

## Verification

- Wait time observed; DC bus, input and output proven dead before contact.
- Winding discharged after insulation testing.
- Motor runs in drive mode with balanced current and no faults.

## Stop-work triggers

- DC bus will not discharge, or voltage appears on output terminals with the drive locked out.
- A bypass path or control source you cannot lock.
- Burned components, bulging capacitors, water in the drive, or overheating (R-ESC-01).
- Pressure to run in bypass or keep resetting without finding the cause.

## Records

- Fault log and code, supply voltages, DC bus readings with time after shutdown (R-DOC-01).
- Insulation results per phase, test voltage and duration, compared with history.
- Torque values, parameter changes, photos before and after, and what the customer was told.
