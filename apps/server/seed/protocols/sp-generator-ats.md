---
id: sp-generator-ats
title: Generators and automatic transfer switches
category: emergency-systems
applies_to: [generator]
rules: [R-EMERG-01, R-ESC-01, R-LOTO-01, R-VERIFY-01, R-PPE-01, R-NOTIFY-01, R-HEALTH-01, R-DOC-01]
osha: [1910.147, 1910.333, 1910.334, 1910.335]
nfpa70e: [Art. 110, Art. 120, Art. 130, Art. 205, Art. 230]
---
## When this applies

- Work on, or test attendance at, an emergency or standby generator and its controller, batteries, charger, heater and output breakers.
- Work on any automatic transfer switch (ATS), including bypass-isolation types. Fire-pump transfer switches also follow sp-fire-pump-impairment; healthcare sites also follow sp-healthcare-power.
- Background: NEC Art. 517, 700, 701 and 702; NFPA 110 and NFPA 99 for testing and maintenance.

## Hazards

- Backfeed: ATS load and emergency terminals, and everything downstream, can be live from the generator while the utility is off, and the reverse. Opening one source never makes an ATS dead.
- Unexpected start: loss of normal power at any ATS, the exerciser clock, a fire-pump controller or a remote start signal can start the generator at any moment. AUTO means armed.
- Extra sources: starting battery, charger, block heater, alternator space heater, ATS control power from either source.
- Stored energy in ATS operators; rotating parts, hot exhaust, pressurized coolant, carbon monoxide, battery hydrogen.
- Lost protection: while a generator or ATS is out, egress lighting, fire alarm, the fire pump or patient-care loads may have no backup.

## PPE & tools

- Arc-flash label PPE inside the boundary, plus the Kestrel minimum (R-PPE-01). Label missing, illegible or older than 5 years: stop (R-ESC-01).
- Voltage-rated gloves with protectors, CAT III/IV meter and proving unit, personal locks and tags, selector lock attachment.
- Hearing protection, splash goggles at batteries, CO monitor indoors, flashlight.
- The site's test procedure and log sheet.

## Procedure

1. Read the site file: generator rating, every ATS and fire-pump controller it serves, transfer delays and required times, alarm list, service vendor, and the site file's lockout section for site-specific isolation points.
2. Decide what will lose backup. If any life-safety or legally required load will, notify the facility manager and confirm whether a fire watch is required before starting; record the answer (R-EMERG-01). Planned outages need 72-hour written notice (R-NOTIFY-01); healthcare also R-HEALTH-01.
3. Call your supervisor before any life-safety work, manual transfer-switch operation or generator-control work (R-ESC-01).
4. Generator work: lock the control switch in OFF; open and lock each output breaker; lock off charger and block-heater circuits; disconnect and tag the starting-battery negative. OFF removes backup from every ATS and the fire pump, so step 2 applies.
5. ATS work: lock open the normal-source breaker and the generator breaker feeding that ATS, plus any separate control power. If the generator still backs up other loads, leave it in AUTO as the site file directs; it may run unloaded.
6. Try-out: attempt a start or transfer test and confirm nothing operates (R-LOTO-01). Verify absence of voltage live-dead-live on normal, emergency and load terminals, every phase-to-phase and phase-to-ground combination (R-VERIFY-01).
7. Never operate an ATS manual handle or bypass-isolation switch, or defeat a shutdown (low oil pressure, high coolant temperature, overspeed, overcrank) or alarm, without supervisor approval (R-EMERG-01). Use only the test controls the site file allows; settings belong to the vendor.
8. Monthly test attendance: before, confirm notices went out, selector in AUTO and no active alarms. During, record start time, each ATS transfer time against its required time (10 seconds for emergency, life-safety and critical-branch loads unless the site file says otherwise), voltage, frequency, kW, oil pressure, temperatures and alarms. NFPA 110 expects at least 30 minutes at 30 percent or more of nameplate kW, or the manufacturer's minimum exhaust temperature. After, confirm retransfer, cooldown, selector in AUTO and downstream equipment restarted.
9. Failed transfer (no start, slow transfer, failed retransfer, shutdown under load): do not force the ATS or reset alarms; photograph the alarm screens. Establish which source carries which loads and which life-safety loads are unprotected. Tell the facility manager immediately and confirm the fire watch decision. Call your supervisor. Report the failure to the facility within one hour (R-EMERG-01). Retest only after repair, with notice.
10. Restore: remove only your own locks, reconnect the battery (negative last), restore charger and heater, close output breakers, return the selector to AUTO and confirm the "not in auto" alarm clears.

## Verification

- Absence of voltage proven on every source before contact.
- Selector in AUTO, output breakers closed as required, charger floating, annunciator clear.
- Transfer and retransfer times within site limits; facility manager confirms systems are back in service.

## Stop-work triggers

- A source you cannot lock, or a lockout you cannot complete.
- The generator starts or an ATS operates unexpectedly.
- Any request to bypass an ATS or defeat a shutdown or alarm without supervisor approval.
- Life-safety loads would lose backup and the facility manager has not been told.
- Fuel or coolant leak, overheating, water in equipment, missing arc-flash label (R-ESC-01).

## Records

- Test log: transfer times per ATS, voltage, frequency, load, engine readings, alarms and resets (R-DOC-01).
- Who was notified, when, and the fire watch decision.
- Time-stamped failed-test report sent within one hour.
- Before and after photos of controller, alarm screens and ATS.
