---
id: sp-fire-pump-impairment
title: Fire pumps and fire-pump controllers
category: fire-protection
applies_to: [fire-pump]
rules: [R-EMERG-01, R-ESC-01, R-NOTIFY-01, R-LOTO-01, R-VERIFY-01, R-PPE-01, R-DOC-01, R-CUST-01]
osha: [1910.147, 1910.159, 1910.333, 1910.335]
nfpa70e: [Art. 120, Art. 130, Art. 205, Art. 220]
---
## When this applies

- Work on, testing of, or alarm response at an electric fire pump, its controller and transfer switch, the fire-pump disconnect and feeders, or the jockey-pump circuit.
- Generator tests that transfer the fire pump (also follow sp-generator-ats).
- Diesel fire pumps: engine work belongs to the fire-protection contractor.
- Background: NFPA 20 (installation), NFPA 25 (inspection, testing, maintenance and impairments), NEC Art. 695.

## Hazards

- Impairment: if the pump cannot start automatically, sprinklers and standpipes may lack pressure in a fire. Opening the disconnect, setting the controller to OFF, or opening the alternate isolating switch or generator breaker all impair the system.
- The supply is often tapped ahead of the building main, so opening the main switchboard does not de-energize it. Fault current and incident energy at the tap can be very high.
- By design there is no running-overload protection: overcurrent devices are sized to carry locked-rotor current so the pump keeps running.
- Automatic start on pressure drop at any moment; large motor and exposed coupling.
- Two sources: normal and alternate (usually the generator through the fire-pump transfer switch).
- Wet floors, packing drips and high-pressure piping.

## PPE & tools

- Arc-flash label PPE plus the Kestrel minimum (R-PPE-01). Missing or expired label: stop (R-ESC-01).
- CAT III/IV meter and proving unit, voltage-rated gloves, phase-rotation meter, clamp meter, personal locks and tags.
- Rubber boots or a dry mat for wet rooms.
- The facility's impairment tags and the site file's fire-protection contacts.

## Procedure

1. Read the site file: controller, disconnect, both sources, alternate isolating switch, jockey pump, the fire marshal or authority having jurisdiction, monitoring company, fire-protection contractor and controller vendor.
2. Before anything that could impair the pump, tell the facility manager, who runs the NFPA 25 impairment procedure: impairment coordinator, fire department or fire marshal, monitoring company, insurer, impairment tags, and the fire watch decision (R-EMERG-01). Planned work needs 72-hour written notice plus the site's permit lead time (R-NOTIFY-01).
3. Call your supervisor before touching the controller or any fire-pump circuit (R-ESC-01).
4. Never open the locked fire-pump disconnect without the fire marshal's permit in hand and any required fire watch in place. The facility removes its building lock per site procedure; then apply your personal lock.
5. Lockout for internal work, with the permit and impairment in place: set the controller to OFF per the site procedure; open and lock the fire-pump disconnect, the alternate-source isolating switch, the generator breaker feeding the pump, and any separate control or heater circuits, using the site file's lockout section for site-specific isolation points (R-LOTO-01). Try-out by attempting a start.
6. Verify absence of voltage live-dead-live at the controller's normal and alternate line terminals, the transfer-switch load side and the motor terminals (R-VERIFY-01).
7. Controller alarms (power failure, phase failure, phase reversal, transfer-switch fault, failure to start, on alternate source): photograph the display and record times before any reset. Never reset or silence an alarm without recording it, and never silence supervisory signals at the fire alarm panel.
8. Diagnose without impairing: measure voltage and phase rotation on both sources at test points in label PPE. A phase reversal often follows utility or generator work. Never swap motor leads to clear an alarm unless the fire-protection contractor and controller vendor confirm pump rotation.
9. Never add overload protection, change breaker settings, adjust pressure switches, timers or controller logic, or bypass transfer controls. Internal faults, boards, pressure transducers and transfer-switch mechanics go to the controller vendor; field changes can void the listing.
10. If the pump fails to transfer to the generator during a test or outage, treat it as impaired: tell the facility manager immediately, report the failed test within one hour (R-EMERG-01), and call your supervisor and the vendor.
11. Restore: remove your lock, close the alternate isolating switch and generator breaker, and have the facility re-lock the disconnect closed. Set the controller to AUTO; confirm power-available and alternate-source indications, rotation, and cleared supervisory signals. Record starting voltage and running current during the fire-protection contractor's test run. The facility then closes the impairment.

## Verification

- Absence of voltage proven on both sources before contact.
- Disconnect locked closed with the building lock; controller in AUTO.
- Pump starts automatically on a test pressure drop, with correct rotation.
- Fire alarm panel and monitoring company show no fire-pump supervisory or trouble signals.

## Stop-work triggers

- No fire marshal's permit, impairment not started, or a required fire watch not in place.
- A request to open the disconnect, bypass the transfer switch or reset alarms "just to get it running".
- Internal controller fault or burned components: stop and call the vendor.
- Water in electrical equipment, overheating, or a missing or expired arc-flash label (R-ESC-01).

## Records

- Impairment start and end times, permit number, people notified and the fire watch decision (R-DOC-01).
- Alarm history before reset, voltages, rotation and running current.
- Vendor and contractor involvement and findings.
- Photos, including the disconnect locked closed, and what the customer was told (R-CUST-01).
