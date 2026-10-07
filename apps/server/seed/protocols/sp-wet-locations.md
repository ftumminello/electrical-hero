---
id: sp-wet-locations
title: Wet locations and GFCI protection
category: wet-locations
applies_to: []
rules: [R-ESC-01, R-PPE-01, R-LOTO-01, R-VERIFY-01, R-NOTIFY-01, R-LOAD-01, R-CUST-01, R-DOC-01]
osha: [1910.303, 1910.304, 1910.334, 1926.404]
nfpa70e: [Art. 110, Art. 130]
---
## When this applies

- Water has reached, or may reach, electrical equipment: roof or pipe leaks, sprinkler discharge, condensate overflow, flooding, hose-down cleaning.
- Work where floors are wet or conductive: commercial kitchens, wash-down areas, mechanical rooms, rooftops, outdoors.
- Troubleshooting GFCI trips, or replacing GFCI-protected receptacles and breakers.

## Hazards

- Wet skin and wet floors lower body resistance and give current a path to ground; a few tens of milliamps through the chest can stop the heart.
- Water in an enclosure tracks across insulation and can start an arcing fault when the equipment is operated or re-energized. Wet gear is not in a normal operating condition.
- Contaminated water (sewage, grease, cleaning chemicals) and hidden damage that shows up later as corrosion.
- Slips near energized equipment.
- A GFCI bypassed "to stop the tripping" leaves people unprotected from exactly the fault that caused the trip.

## PPE & tools

- Kestrel minimum plus label PPE for any switching or testing (R-PPE-01).
- Dry, slip-resistant footwear. Rubber insulating mats or dielectric overshoes are extra protection only, never a reason to work wet.
- GFCI protection for your own tools and cords: use a portable GFCI at the receptacle nearest the source on temporary power (1910.304, 1926.404).
- Insulation-resistance tester, leakage clamp meter with a milliamp range, GFCI tester.
- Cords and equipment approved for wet locations; keep connections off the floor. Never handle plugs with wet hands (1910.334).

## Procedure

1. Stop at a safe distance and assess. Do not touch, open or operate wet energized equipment, and never stand in water to operate a device.
2. Keep people away; barricade and post someone if needed.
3. Escalate now: water-intruded equipment is a mandatory supervisor call (R-ESC-01). Notify the site contact immediately (R-NOTIFY-01).
4. Have facility staff stop the water source and clear standing water from the approach where safe.
5. De-energize from an upstream device that is dry, reachable from a dry surface and has a valid label, in label PPE (R-PPE-01, sp-switching). If the only disconnect is wet or in water, do not approach: arrange isolation further upstream or through the utility.
6. Lock out and verify absence of voltage at the wet equipment (R-LOTO-01, R-VERIFY-01).
7. Inspect and photograph water marks, corrosion, damaged insulation, wet breakers, trip units, terminals and labels (R-DOC-01).
8. Replace, do not dry, components that were submerged or soaked, such as breakers, fuses, GFCI and AFCI devices, trip units and electronic controls, following the manufacturer's guidance. Clean and dry the remaining parts.
9. Insulation-resistance test conductors and remaining equipment with electronics, GFCIs and surge devices disconnected. Record the values; low or falling readings mean no re-energizing.
10. Re-energize only with supervisor agreement, using sp-switching, then test every GFCI with its test button.
11. Kitchens and wet floors: have cleaning and hose-down stopped and the floor dried in your work area before you start.
12. GFCI trips:
    - Never replace a GFCI with a standard breaker or receptacle, jumper it, or run an extension cord to an unprotected outlet. GFCI protection required by the NEC (210.8, which covers commercial kitchens, and 422.5 for certain appliances) stays in place.
    - A personnel GFCI trips at roughly 4 to 6 mA of leakage; repeated trips usually mean real leakage.
    - Do not keep resetting it (sp-switching). Find the cause: isolate the load under lockout, insulation-test the appliance and the wiring separately, and look for moisture in floor boxes, cord caps and connectors, damaged cords, a neutral shared with another circuit, or several appliances whose normal leakage adds up.
    - Fix the cause or split the loads. If that needs new circuits, confirm capacity (R-LOAD-01) and send the customer a written proposal (R-CUST-01).
    - Equipment ground-fault protection is not a substitute where personnel GFCI protection is required.

## Verification

- Water source stopped and the work area dry before work starts.
- Absence of voltage verified; insulation-resistance results recorded and acceptable.
- Each GFCI trips on test and resets; equipment runs without tripping.

## Stop-work triggers

- Standing water at the equipment or the disconnect, or water still entering.
- Wet energized equipment you would have to open, touch or operate (R-ESC-01).
- A missing or water-damaged arc-flash label (R-PPE-01).
- Low insulation resistance or unexplained leakage.
- Any request to bypass, remove or downgrade a GFCI.

## Records

- Photos of water damage, labels and gear before and after (R-DOC-01).
- Insulation-resistance and leakage readings, replaced parts and GFCI test results in the work order (R-DOC-01).
- Notification times and what the customer was told (R-NOTIFY-01, R-CUST-01).
