# Maple Commons Plaza — Site File

Account `acct-maple-commons` · Kestrel customer since 2022 · Service agreement: on-call plus an annual infrared scan. The property manager approves all work over $500 in advance.

## Overview & access

- Single-storey strip center, about 38,000 sq ft, six tenant spaces. Built 1998, renovated 2017.
- Tenants:
  - Suite A: Juniper Grill, a full-service restaurant with a commercial kitchen (4,200 sq ft). Open 11:00–23:00 daily, with kitchen prep from 08:00.
  - Suite B: Paper & Pine (stationery retail).
  - Suite C: FitLab 24 (24-hour gym, treadmills and other cardio equipment).
  - Suite D: Lindale Dry Cleaners (drop-off only, no cleaning plant).
  - Suite E: vacant shell. Its tenant breaker is off and padlocked.
  - Suite F: Harbor Nails (salon).
- Site contact: Priya Nandakumar, Property Manager, Lindale Property Group, 555-0189.
- Juniper Grill general manager: Tony Alvarez, 555-0190. Any outage affecting Suite A must avoid 10:30–14:30 and 16:30–22:00. The walk-in cooler and freezer must not be without power for more than 2 hours.
- Electrical room `R-1` is in the rear service corridor behind Suite C. The key is in the lockbox at the corridor door; get the code from the property manager. The roof is reached by a fixed ladder and hatch inside `R-1`.

## Service entrance

- Utility: 750 kVA pad-mount transformer (utility-owned) behind Suite C. Secondary is 208Y/120V, 3-phase, 4-wire.
- Main switchboard `MDP-1`: 1200 A, 208Y/120V, 42 kA interrupting rating, in `R-1`. 1200 A main breaker `MDP-1-M` (thermal-magnetic).
- Meter center `MS-1` (part of the `MDP-1` lineup) has seven meter positions, each with a tenant main breaker:

| Position | Tenant | Main breaker |
|---|---|---|
| M-A | Suite A Juniper Grill | 400 A |
| M-B | Suite B Paper & Pine | 100 A |
| M-C | Suite C FitLab 24 | 200 A |
| M-D | Suite D Lindale Dry Cleaners | 100 A |
| M-E | Suite E (vacant) | 200 A, off and padlocked |
| M-F | Suite F Harbor Nails | 100 A |
| M-H | House | 200 A to house panel `HP-1` |

## Distribution

### Suite A — Juniper Grill

- `M-A` feeds distribution panel `DP-A` (400 A, 208Y/120V) in the kitchen back corridor. `DP-A` feeds:
  - kitchen panel `LP-A1` (225 A, 42 spaces, 42 of 42 used);
  - dining and bar panel `LP-A2` (100 A, 30 spaces, 24 used);
  - hood exhaust fan `EF-1` (3-phase, 15 A) and make-up air unit `MUA-1` fan (3-phase, 20 A);
  - dish-machine booster heater `BH-1` (208 V, 3-phase, 18 kW, 60 A);
  - the electric fryers `FRY-1` and `FRY-2` (208 V, 3-phase, 50 A each) through shunt-trip breakers `ST-1` and `ST-2`.
- The hood fire-suppression system (wet chemical) shunt-trips `ST-1`/`ST-2` and closes the gas valve when it discharges. The shunt trip must be tested whenever the suppression system is serviced.
- Walk-in cooler `WIC-1` (rooftop condensing unit `CU-1`, 208 V, 1-phase, 30 A) and walk-in freezer `WIF-1` (`CU-2`, 208 V, 3-phase, 40 A) are on `LP-A1`.
- `LP-A1` kitchen receptacles are GFCI-protected.
- In 2025, others added a second ice machine, `IM-2`, using a tandem breaker in space 41. `LP-A1`'s panel label does **not** list tandem breakers for that position. This was flagged to the property manager in 2025-10 and is unresolved.

### Other tenants

- Suites B, D and F each have one tenant panel (`LP-B`, `LP-D`, `LP-F`; 100 A, 30 spaces).
- Suite C has `LP-C` (200 A, 42 spaces, 38 used). The treadmills are on 20 A dedicated circuits, 1 through 24.
- Each suite has its own rooftop unit (`RTU-A1`, `RTU-A2`, `RTU-B` … `RTU-F`), fed from that tenant's panel, with a fused disconnect at the unit on the roof.

### House panel HP-1 (200 A, 42 spaces)

- Parking-lot pole lighting (LED, photocell plus time clock `TC-1`), pylon sign, building-facade sign band, irrigation controller, corridor lighting and receptacles, `R-1` lighting, and fire alarm panel `FACP-A` (serves Suite A, with a battery backup).

## Emergency & standby

- None. The site has no generator. Emergency lighting and exit signs use battery units, which tenants test monthly.

## Special equipment

- Commercial kitchen (see Suite A). The kitchen floor is often wet, so treat floor-level receptacles and equipment connections as wet locations.
- FitLab 24 is open 24 hours a day. Members are present at night, so any outage at Suite C needs the gym manager on site to clear the floor.

## Known issues & service history

- 2025-12-12: Annual infrared scan found the line-side lug of the Suite A tenant breaker in `MS-1` (position M-A) 38 °C above the B and C phases, on phase A, during lunch service. A retorque under shutdown was recommended. The **customer declined** the night-shutdown cost. Not yet done.
- 2026-05-27: After a storm, the roof leaked above `R-1` near `MS-1`. The roof was patched. Corrosion was noted on the meter base at position M-E (vacant suite).
- 2026-07-19: Juniper Grill's `BH-1` booster heater kept tripping its 60 A breaker on `DP-A` during dinner service. The kitchen-equipment vendor replaced a failed heating element, and Kestrel verified the current draw was balanced at 49 A per phase.
- 2026-09-03: Paper & Pine reported half its sales-floor lights out. A 2-pole breaker for a multi-wire lighting circuit on `LP-B` had one handle tie missing, and one pole had tripped. A handle tie was installed.

## Safety notes

- Arc-flash study 2024, labels dated 2024-06:
  - `MDP-1`: 6.8 cal/cm², category 2, boundary 4 ft 2 in.
  - `MS-1`: 6.1 cal/cm², category 2.
  - `DP-A`: 4.3 cal/cm², category 2.
  - Tenant panels: 1.5 cal/cm², category 1.
- `HP-1`'s arc-flash label has fallen off and is missing, so treat it as missing (R-PPE-01).
- Lockout points: each tenant at its `MS-1` position main breaker; Suite A kitchen loads at `DP-A`; whole-site work at `MDP-1-M`. Coordinate any Suite A outage with Tony Alvarez for food safety.
