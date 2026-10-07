# Maple Commons Plaza — Site File

Account `acct-maple-commons` · Kestrel customer since 2022 · Service agreement: on-call plus an annual infrared scan. The property manager approves all work over $500 in advance.

## 1. Site overview & access

- **Site:** 3180 Maple Commons Road, Lindale Heights, WA 98204, owned and managed by Lindale Property Group. A single-storey strip center of about 38,000 sq ft, with six tenant spaces in a row (A west to F east) and a rear service corridor. Built 1998, renovated 2017. One 208Y/120 V 3-phase 4-wire system: no 480 V, generator, building UPS or solar.
- **Tenants:**
  - Suite A: Juniper Grill, a full-service restaurant with a commercial kitchen (4,200 sq ft). Open 11:00–23:00 daily, with kitchen prep from 08:00.
  - Suite B: Paper & Pine, stationery retail, 10:00–19:00.
  - Suite C: FitLab 24, a 24-hour gym (treadmills and other cardio equipment). Staffed 06:00–21:00.
  - Suite D: Lindale Dry Cleaners, drop-off only (no cleaning plant).
  - Suite E: vacant shell since 2025-02. Its tenant breaker is off and padlocked.
  - Suite F: Harbor Nails, salon.
- **Electrical room `R-1`** is in the rear service corridor behind Suite C. It holds `MDP-1`/`MS-1`, `HP-1`, `TC-1`, `LC-1` and `LC-2`.
  - The key is in the lockbox at the corridor door; get the code from the property manager. Tenant managers also hold the code, for their own `MS-1` breaker.
  - The door swings out with panic hardware, and there is 7 ft of working space in front of the gear.
  - The roof is reached by a fixed ladder and hatch inside `R-1`. The parapet is 30 in, so stay 15 ft from the edge unless tied off.
- **Pad-mount:** in the rear drive, 30 ft from `R-1`. Keep 10 ft clear in front of it.
- **Suite A kitchen:** the floor is hosed nightly and often wet, so treat floor-level receptacles and equipment connections as wet locations.
- **FitLab 24:** open 24 hours a day. Members are present at night, so any outage at Suite C needs the gym manager on site to clear the floor.
- **Outage windows:**
  - Suite A (`M-A`, `DP-A`, `LP-A1`, `LP-A2`): avoid 10:30–14:30 and 16:30–22:00; prefer 23:30–07:30 or 14:30–16:30. The walk-in cooler and freezer must not be without power for more than 2 hours. Coordinate with Tony Alvarez.
  - Suite C: prefer 01:00–05:00.
  - Suites B, D and F: after hours.
  - Whole site (`MDP-1-M`): Tuesday or Wednesday 01:00–03:00, 2 h maximum.

## 2. Contacts & escalation

**Property:** Priya Nandakumar, Property Manager, Lindale Property Group, 555-0189 (after hours 555-0188). She is the site contact, approves work over $500, receives shutdown notices and holds the lockbox code.

**Tenants:**
- Juniper Grill: Tony Alvarez, general manager, 555-0190; Marisol Reyes, kitchen manager (walk-in temperature log), 555-0191.
- Paper & Pine: Grace Holloway, 555-0192.
- FitLab 24: Devon Okafor, gym manager, 555-0193.
- Lindale Dry Cleaners: Sung-min Park, 555-0194.
- Harbor Nails: Linh Tran, 555-0195.

**Utility, vendors and Kestrel:**
- Lindale Heights Municipal Light (LHML): dispatch 555-0182; meter shop 555-0183.
- Sentinel Alarm Monitoring (account ML-2208): 555-0171.
- Brightline Fire & Security (`FACP-A`, hood suppression `HSS-1`): 555-0172.
- Copperline Foodservice Repair: 555-0181.
- Cascade Comfort Mechanical (RTUs, refrigeration): 555-0184.
- Ridgeline Roofing: 555-0185.
- Northline Power Engineering (arc-flash study): 555-0186.
- Lindale Heights Fire Department, non-emergency: 555-0187.
- Kestrel dispatch: 555-0177.

**Escalation:**
- Call the supervisor first (R-ESC-01) for any of these: the `M-A` hot lug, or anything more than 15 °C above similar parts; water in equipment; any opening or testing at `HP-1`; work touching `FACP-A`, `HSS-1` or the shunt-trip circuit; or a lockout you cannot complete.
- EEWP co-signer for this site: Priya (R-EWP-01).
- Shutdown notices go to Priya (R-NOTIFY-01); also phone Tony or Devon.
- Work over $500 needs Priya's written approval first (R-CUST-01). Making a hazard safe never waits for approval; repairs do.

## 3. Utility service

- **Transformer:** LHML-owned 750 kVA pad-mount `T-48812` behind Suite C, secondary 208Y/120 V 3-phase 4-wire. The service point is the transformer secondary spades; the lateral is customer-owned.
- **Service lateral:** 4 sets of 4 × 350 kcmil Cu XHHW-2 with full-size neutral, in four 4 in PVC conduits, 45 ft to the `MDP-1` pull section. Rated 1,240 A at 75 °C.
- **Available fault current:**
  - 41.6 kA at the transformer (LHML letter 2024-03; 2,082 A full load, 5.0 % Z, infinite primary).
  - 35.5 kA calculated at `MDP-1` (36.4 kA with motor contribution), within its 42 kA rating.
  - Downstream: `HP-1` 26.4 kA, `DP-A` 15.0, `LP-C` 14.9, `LP-A1` 12.4, `LP-E` 8.4, `LP-D` 6.7, `LP-A2` 6.0, `LP-B` 5.4, `LP-F` 3.9.
- **Meters:** there is no master meter.
  - `M-A`: Form 9S CT meter LH-4471201, 400:5 CTs (multiplier 80), with its test switch in the sealed CT compartment.
  - All other positions: Form 16S CL200 self-contained meters. `M-B` LH-4471202, `M-C` LH-4471203, `M-D` LH-4471204, `M-E` LH-4471205 (account inactive), `M-F` LH-4471206, `M-H` (house) LH-4471207.
- **Seals:** LHML seals the pull section, the CT compartment and the meter rings. Only the LHML meter shop may break a seal or authorize it.
  - Never operate the `M-A` test switch or open a CT secondary.
  - Work on the lateral, the pull section or the line side of `MDP-1-M` needs an LHML disconnect; give 10 business days' notice.
- **Reliability:** three utility outages since 2022. The longest was 1 h 50 min (2024-11-19).

## 4. One-line diagram

```
LHML 12.47 kV loop
└─ T-48812 750 kVA pad-mount (utility), 208Y/120 V
   └─ lateral 4 × (4 × 350 kcmil Cu), 45 ft
      └─ MDP-1 (R-1) 1200 A, 42 kA; pull section (LHML seal); MBJ, GEC
         └─ MDP-1-M 1200 A/3P main
            └─ MS-1 meter sections, 7 positions (no M-G)
               ├─ M-A 400 A (CT meter) → DP-A 400 A
               │  ├─ 1: 225 A → LP-A1 kitchen (42/42 + tandem 41)
               │  │  ├─ DS-CU2 → CU-2 (WIF-1); DS-CU1 → CU-1 (WIC-1)
               │  │  ├─ WIF-1/WIC-1 evaporators, IM-1, DM-1, GD-1
               │  │  ├─ FB-1, FB-2, GFCI kitchen receptacles
               │  │  ├─ 39: HCP-1 control + ST-1/ST-2 shunt-trip power
               │  │  └─ 41 tandem: 41A office/POS, 41B IM-2
               │  ├─ 2: 100 A → LP-A2 dining/bar → DS-A2 → RTU-A2
               │  ├─ 3: 60 A → BH-1
               │  ├─ 4: ST-1 50 A shunt-trip → FRY-1 ┐ tripped by
               │  ├─ 5: ST-2 50 A shunt-trip → FRY-2 ┘ HSS-1 via HCP-1
               │  ├─ 6: 60 A → GF-1 3Ø GFCI → 15-60R → COMBI-1
               │  ├─ 7: 15 A → VFD-EF1 → DS-EF1 → EF-1
               │  ├─ 8: 20 A → VFD-MUA1 → DS-MUA1 → MUA-1
               │  └─ 9: 60 A → DS-A1 → RTU-A1
               ├─ M-B 100 A → LP-B → DS-B → RTU-B; MWBC 13/15
               ├─ M-C 200 A → LP-C → TM-01…TM-24; DS-C → RTU-C
               ├─ M-D 100 A → LP-D → DS-D → RTU-D
               ├─ M-E 200 A OFF, padlocked → LP-E (dead) → DS-E → RTU-E
               ├─ M-F 100 A → LP-F → DS-F → RTU-F
               └─ M-H 200 A → HP-1 house panel (R-1)
                  ├─ TC-1 + PC-1 → LC-1 → pole lights P1–P12
                  ├─ TC-1 → LC-2 → PS-1 pylon, facade sign band
                  ├─ 25: FACP-A (Suite A, HSS-1, sprinkler riser)
                  └─ EM-H1–H4, X-H1–H3, EM-R1, IRR-1, roof receptacles
```

## 5. Switchboard & feeders

**`MDP-1`** is a Square D QED-2 multi-metering switchboard (1998): 1200 A copper bus, 208Y/120 V, 42 kA fully rated. Its sections, left to right:

1. **Pull section** (LHML-sealed). It sits on the line side of `MDP-1-M` and stays live with the main open.
2. **`MDP-1-M`:** 1200 A 3-pole thermal-magnetic main, 80 % rated, 42 kA, padlockable. The main bonding jumper and GEC are here.
   - It has no ground-fault protection, and none is required: NEC 230.95 applies only above 150 V to ground.
   - It predates NEC 240.87, so it has no arc-energy reduction.
3. **`M-A`:** LHML CT compartment and the 400 A breaker. Converted in 2017 from a 200 A self-contained position. Field-installed 2 × 4/0 Cu jumpers per phase land on the breaker's line-side lugs.
4. **Meter stack 1:** `M-B`, `M-C`, `M-D`.
5. **Meter stack 2:** `M-E`, `M-F`, `M-H`, directly under the 2026-05-27 roof leak.

**`MS-1`** is the metering part of the lineup: seven positions, each meter feeding a 42 kA tenant main breaker with padlock-off. There is no M-G position.

**Feeders** (Cu THHN in EMT; peaks are from 30-day recordings, 2024-04):
- `M-A` 400 A → `DP-A`: 2 × (4 × 4/0 + #3 EGC), 140 ft. Peak 318 A (phase A); spot 298/281/276 A on 2025-12-12.
- `M-B` 100 A → `LP-B`: 4 #3 + #8, 90 ft. Spot 41/38/22 A.
- `M-C` 200 A → `LP-C`: 4 × 3/0 + #6, 60 ft. Peak 151 A.
- `M-D` 100 A → `LP-D`: 4 #3 + #8, 70 ft. Spot 34 A.
- `M-E` 200 A → `LP-E`: 4 × 3/0 + #6, 140 ft. Off.
- `M-F` 100 A → `LP-F`: 4 #1 + #4, 200 ft. Upsized for voltage drop, EGC increased in proportion. Spot 47 A.
- `M-H` 200 A → `HP-1`: 4 × 3/0 + #6, 15 ft. Spot 46 A.
- `MDP-1-M` peak: 588 A.

**Capacity** (NEC 220.87, 125 % of the 30-day peak):
- `MDP-1`: 735 A of 1,200 A.
- `M-C`: 189 A of 200 A.
- `M-A`: 397.5 A of 400 A. Suite A has effectively no spare capacity, and the April data misses the summer cooling peak. Any added Suite A load needs a summer recording and likely a feeder upgrade (R-LOAD-01).

## 6. Panel schedules

**Conventions:**
- Odd circuits are on the left, even on the right.
- Rows run phases A, B, C repeating: circuits 1–2 are A, 3–4 B, 5–6 C, and so on.
- Breakers are Square D QO single-pole 20 A unless sized (A/poles).
- G = Class A GFCI breaker.
- Kestrel typed all directories in 2022-04 except `LP-F`.

### DP-A: Suite A distribution (kitchen back corridor)

Square D I-Line, 400 A main lugs, 25 kA fully rated, with room for two more 3-pole breakers. Circuits 3, 4, 5 and 9 have permanent padlock-off attachments; they are the disconnects for loads not within sight (NEC 422.31(B)).

| Ckt | Breaker | Load | Conductors and notes |
|---|---|---|---|
| 1 | 225/3 | `LP-A1` | 4 × 4/0 + #4, 25 ft. Spot 148/139/131 A (2025-10). |
| 2 | 100/3 | `LP-A2` | 4 #3 + #8, 70 ft. Peak 58 A. |
| 3 | 60/3 | `BH-1` | #6 |
| 4 | `ST-1` 50/3 with 120 V shunt trip | `FRY-1` | #6 |
| 5 | `ST-2` 50/3 with 120 V shunt trip | `FRY-2` | #6. Replaced 2025-09-18. |
| 6 | 60/3 | `GF-1` → 15-60R → `COMBI-1` | #6 |
| 7 | 15/3 | `VFD-EF1` → `EF-1` | |
| 8 | 20/3 | `VFD-MUA1` → `MUA-1` | |
| 9 | 60/3 | `DS-A1` → `RTU-A1` | #6 |

### LP-A1: Suite A kitchen (north wall by dry storage)

Square D NQ, 225 A main lugs, 42 spaces, 22 kA series-rated with `DP-A` circuit 1.
- **42 of 42 spaces are occupied**, plus the tandem in space 41, for 43 circuits.
- The panel label lists **no** tandem breakers.
- On the directory, "41B ICE 2" was handwritten by others, and circuit 42 still reads "SPARE".

**Odd circuits:**
- 1-3-5: `CU-2`, 40/3
- 7-9: `CU-1`, 30/2
- 11-13: `WIF-1` evaporator and defrost, 20/2
- 15: `WIC-1` evaporator
- 17: `WIF-1` box light and door heater
- 19-21: `IM-1`, 20/2
- 23-25-27: `DM-1`, 30/3
- 29: dish receptacles, G
- 31 and 33: prep receptacles, G
- 35: mixer, G
- 37: lighting 1, battery units and exit sign
- 39: `HCP-1` and shunt-trip power (red, lock-on clip)
- 41 (phase C): **QOT 20/20 tandem, unlisted, 10 kA.** 41A feeds the office and POS; 41B feeds `IM-2`.

**Even circuits:**
- 2-4: hot-food well, 30/2
- 6: holding cabinet, G
- 8: food warmers, G
- 10: `FB-1` chef-base refrigerator, G
- 12: `FB-2` chef-base refrigerator, G
- 14: reach-in refrigerator, G
- 16: reach-in freezer, G
- 18: prep-table refrigerator, G
- 20: microwave, G
- 22: expo printers, G
- 24: heat strips
- 26-28-30: `GD-1`, 15/3
- 32: lighting 2
- 34: dry storage, G
- 36: water-heater controls, G
- 38: prep sink, G
- 40: corridor lighting
- 42: the abandoned soft-serve circuit (machine removed 2023). The breaker is OFF and the conductors are capped above the pass.

### LP-A2: Suite A dining and bar (bar storage room)

Square D NQ, 100 A main lugs, 30 spaces, 10 kA. 24 spaces are used; 25–30 are empty.
- **Odd:** 1-3-5 `RTU-A2` 50/3; 7 pendants; 9 downlights, battery units and exit signs; 11 patio lights; 13 and 15 dining receptacles; 17 restrooms; 19 restroom receptacles G; 21 patio receptacles (GFCI devices); 23 sconces.
- **Even:** 2 back-bar coolers G; 4 glass washer G; 6 keg cooler and glycol chiller G; 8 carbonator G; 10 bar POS G; 12-14 hardwired espresso machine 30/2; 16 AV; 18 menu boards; 20 and 22 hand dryers; 24 TVs.

### HP-1: house panel (R-1)

Eaton Pow-R-Line 1a, 200 A main lugs, 42 spaces (23 used), 65 kA fully rated. **Its arc-flash label is missing.** It is house-metered, so never add tenant loads. Receptacles are GFCI-protected by device.
- **Odd:**
  - 1-3: pole lights `P1`–`P6`, 208 V, 20/2, via `LC-1`
  - 5-7: pole lights `P7`–`P12`, 208 V, 20/2, via `LC-1`
  - 9: `PS-1`, via `LC-2`
  - 11 and 13: sign band, via `LC-2`
  - 15: canopy lights, via `LC-1`
  - 17: corridor lighting with `EM-H1`–`EM-H4` and `X-H1`–`X-H3`
  - 19: corridor receptacles
  - 21: `R-1` lighting and `EM-R1`
  - 23: `R-1` receptacles
  - 25: `FACP-A` (dedicated, red, lock-on)
  - 27: `IRR-1`
  - 29: wall-packs, via `LC-1`
- **Even:**
  - 2 and 4: roof receptacles and RTU convenience outlets
  - 6: storefront receptacles
  - 8: `TC-1`, `PC-1` and contactor coils
  - 10: telecom
  - 12 and 16: spares
  - 14: backflow-preventer heater (added 2025-01)

### LP-B: Paper & Pine (stockroom)

Square D NQ, 100 A main breaker, 30 spaces, 20 used, 10 kA. The directory was checked and matched on 2026-09-03.
- **Odd:** 1-3-5 `RTU-B` 40/3; 7 and 9 sales-floor receptacles; 11 window lighting; 13 and 15 sales-floor lighting (MWBC); 17 and 19 stockroom; 21 restroom G; 23 break area G; 25 water heater, 6 gal 1.5 kW.
- **Even:** 2 POS; 4 network and alarm; 6 print center; 8 gift wrap; 10 office; 12 and 14 spares, off.

**The MWBC on circuits 13 and 15:**
- Circuit 13 (phase A, front half) and circuit 15 (phase B, rear half) are two single-pole 20 A breakers sharing one #12 neutral.
- The listed handle tie installed 2026-09-03 gives the simultaneous disconnect that NEC 210.4(B) requires. It does not give a common trip: one pole can still trip alone.
- On 208Y/120 V the hots are 120° apart, so with equal loads the neutral carries roughly the same current as each hot. It does not cancel as it would on 120/240 V.
- If the neutral opens, the two halves are in series across 208 V.
- Readings after the 2026-09-03 reset: 11.4 A, 12.1 A, neutral 11.8 A.

### LP-C: FitLab 24 (rear storage room)

Square D NQ, 200 A main breaker, 42 spaces, 38 used (36–42 even are empty), 22 kA series rating.
- **Circuits 1–24:** circuit n feeds treadmill `TM-n` on a dedicated 20 A circuit (own #12 neutral and EGC, NEMA 5-20R). No shared neutrals and no GFCI (not required on the gym floor; the manufacturer advises against it).
- **Others:** 25-27-29 `RTU-C` 70/3; 31, 33 cardio receptacles; 35 strength area; 37 main lighting; 39 night lighting and battery units; 41 locker rooms; 26 locker-room receptacles G; 28 keycard access; 30 network; 32 bottle filler G; 34 office.

### Other tenant panels (main breakers, 10 kA)

- `LP-D`: 100 A, 30 spaces, 16 used. Feeds `RTU-D` 40/3, a garment conveyor (1/2 HP, 120 V), lighting, POS and a water heater.
- `LP-E`: 200 A, 42 spaces. Dead: all 22 breakers are OFF, including `RTU-E` 50/3.
- `LP-F`: 100 A, 30 spaces, 26 used. Feeds `RTU-F` 45/3 and pedicure chairs on GFCI breakers. The directory is out of date (D-06).

## 7. Transformers

- **`T-48812`** (LHML) is the only power transformer. It is a 750 kVA 3-phase pad-mount filled with natural-ester fluid.
  - Primary: 12.47 kV grounded-wye loop feed, with utility bay-o-net fuses.
  - Secondary: 208Y/120 V, 2,082 A, 5.0 % Z.
  - The site's 588 A peak is 28 % of its rating.
  - It is closed with a penta-head bolt and an LHML padlock. Kestrel never opens or operates it.
- **There are no customer-owned transformers** and no separately derived systems. The only other transformers are control transformers inside equipment and the Class 2 sign supplies.
- If every suite loses the same phase, suspect an LHML primary fuse or the lateral. Call LHML and stay away from the pad-mount.

## 8. Grounding & bonding

- **Main bond:** the factory main bonding jumper in `MDP-1` (verified 2024-04-21) is the only neutral-to-ground bond on site.
- **Electrode system at `R-1`:**
  - concrete-encased electrode (#4 Cu);
  - building steel (3/0 Cu);
  - two 8 ft rods 10 ft apart (#6 Cu);
  - interior metal water piping (3/0 Cu).

  It measured 4.1 Ω on a three-point test (2024-04-21). The intersystem bonding termination is at the telecom backboard.
- **Downstream:** neutrals are isolated from ground at `DP-A`, every LP panel and `HP-1`, and every circuit has a wire-type EGC. In 2022-04 a bonding screw was found in `LP-D` and removed.
- **Kitchen:** the fryer whips carry an EGC, the hood is bonded to the `HSS-1` piping, and the gas piping is bonded at entry (#6 Cu).
- **Not installed:** lightning protection, and ground-fault protection of equipment (not required; see Section 5).

## 9. Emergency, standby & life safety

**No standby power:** no generator, transfer switch, generator inlet, building UPS or solar. A utility outage or an opened `MDP-1-M` blacks out everything except battery equipment; tenant plug-in UPSs (Juniper Grill POS, FitLab access control) feed only their own loads.

- **Walk-ins:** cooler `WIC-1` (36 °F) and freezer `WIF-1` (−5 °F) have no backup and must not be without power for more than 2 hours. Tell Tony the expected duration at once; doors stay shut and Marisol logs temperatures. Beyond 2 hours, Juniper Grill moves product to a rented refrigerated trailer.
- **Portable generators:** never connect one to a panel or backfeed through a receptacle (R-LOTO-01). Q-2026-0207 ($7,900, manual transfer switch and inlet for `CU-1`, `CU-2` and the evaporators) has been unapproved since 2026-02-09.
- **FitLab:** treadmills stop; battery units light the floor for 90 minutes. Members may be there overnight without staff, so call Devon.
- **Restoration:** `CU-1` and `CU-2` have 5-minute anti-short-cycle timers. Confirm both restart and box temperatures fall within 30 minutes.

**Emergency lighting:** 90-minute battery units and exit signs in every suite and the corridor, wired unswitched to their area's lighting circuit so they light when it fails (the units on `LP-B` circuit 15 did on 2026-09-03). Tenants test their own monthly; Kestrel tests the house units (`EM-H1`–`EM-H4`, `X-H1`–`X-H3`, `EM-R1`) for 90 minutes yearly.

**`FACP-A`** (sprinkler-riser closet behind Suite A; `HP-1` circuit 25; two 12 V 18 Ah batteries, 24 h standby plus 5 min alarm) covers Suite A pull stations and smoke detectors, the duct detectors that shut down `RTU-A1`/`RTU-A2`, the `HSS-1` discharge contact, horn/strobes, and the sprinkler riser's flow and tamper switches. Sentinel monitors it and Brightline services it; Kestrel does not work inside it. **Before de-energizing `HP-1`, `M-H` or `MDP-1`:** put Sentinel on test, tell Priya, and settle whether a fire watch is needed (R-EMERG-01); the fire department requires one if the system is out of service for more than 4 hours.

**`HSS-1`:** wet-chemical (UL 300) hood system over `FRY-1`, `FRY-2`, the gas range and the charbroiler; mechanical, needs no power. On discharge the gas valve closes, `HCP-1` energizes the 120 V shunt-trip coils of `ST-1` and `ST-2`, `MUA-1` stops while `EF-1` keeps running, and `FACP-A` alarms. Shunt-trip power comes from `LP-A1` circuit 39: if circuit 39, `LP-A1` or `DP-A` circuit 1 is off, the system cannot kill the fryers, so open `ST-1` and `ST-2` first and tell Tony. Test the shunt trip whenever the suppression system is serviced (semiannually, Brightline with Kestrel).

## 10. Motors, drives & special systems

**Rooftop units:** 208 V 3-phase, gas heat, serviced by Cascade Comfort. Each has a fused disconnect at the unit (RK5 fuses at the unit's MOCP).

| Unit | Serves | Size | MCA/MOCP (A) | Disconnect |
|---|---|---|---|---|
| `RTU-A1` | Kitchen (`DP-A` 9) | 10 ton | 51.2/60 | `DS-A1` |
| `RTU-A2` | Dining | 7.5 ton | 38.0/50 | `DS-A2` |
| `RTU-B` | Suite B | 5 ton | 28.0/40 | `DS-B` |
| `RTU-C` | Suite C | 12.5 ton | 55.4/70 | `DS-C` |
| `RTU-D` | Suite D | 5 ton | 27.0/40 | `DS-D` |
| `RTU-E` | Suite E | 7.5 ton | 38.0/50 | `DS-E` (open) |
| `RTU-F` | Suite F | 6 ton | 32.0/45 | `DS-F` |

- RTU convenience outlets are fed from `HP-1` circuit 2 or 4 and stay live with the RTU disconnect open.
- `RTU-C` has a supply-fan VFD: after opening `DS-C`, wait 5 minutes and confirm the DC bus is below 50 V.

**Kitchen ventilation:** `EF-1` (2 HP, 7.5 A upblast exhaust fan) on `VFD-EF1`, disconnect `DS-EF1` with an auxiliary contact that disables the drive. `MUA-1` (gas-fired make-up air, 3 HP, 10.6 A) on `VFD-MUA1`, disconnect `DS-MUA1`. Hood control panel `HCP-1` holds the VFDs, fan controls, the `HSS-1` interface and the shunt-trip relay; it is fed from `LP-A1` circuit 39, which must never be GFCI-protected.

**Kitchen equipment (nameplates):**
- **`FRY-1`, `FRY-2`:** 14 kW, 208 V 3-phase, 38.9 A each, hardwired whips.
- **`BH-1`:** tankless booster heater for `DM-1`, 18 kW, 208 V 3-phase: 18,000 ÷ (1.732 × 208) = 50.0 A, maximum OCPD 60 A. Not a storage heater, so 422.13's 125 % rule does not apply.
- **`DM-1`:** high-temperature dish machine, 208 V 3-phase, 22 A, MOCP 30 A, hardwired. A replacement needs Class A GFCI (NEC 2023 422.5(A)).
- **`COMBI-1`:** 10-pan electric combi oven (2024-03), 17.5 kW, 208 V 3-phase, 48.6 A. Cord-and-plug to a 15-60R at 18 in, under its drain line. Protected by `GF-1`, a 3-phase Class A ground-fault unit (trips at 4–6 mA) beside `DP-A`.
- **`IM-1`:** 208 V 1-phase, MCA 16.2 A, MOCP 20 A, hardwired. **`IM-2`:** undercounter ice machine (2025, by others), 120 V, 11.5 A, on a GFCI receptacle.
- **Condensing units (roof):** `CU-1` (`WIC-1`) 208 V 1-phase, MCA 21.4 A, MOCP 30 A, disconnect `DS-CU1`; `CU-2` (`WIF-1`) 208 V 3-phase, MCA 28.6 A, MOCP 40 A, disconnect `DS-CU2`.
- **`GD-1`:** disposer, 2 HP, 208 V 3-phase, manual starter.

**GFCI:** NEC 2023 210.8(B) requires GFCI on kitchen receptacles (single-phase to 50 A, 3-phase to 100 A, 150 V or less to ground). Washington amends this: in non-dwellings, 3-phase receptacles are exempt unless another rule requires it (WAC 296-46B-210(3)). The tenant's contractor installed `GF-1` for `COMBI-1` anyway, and Kestrel never removes or bypasses installed ground-fault protection. Single-phase kitchen receptacles are GFCI-protected by breaker (the G circuits) or by device (`IM-2`, the patio). Hardwired equipment has none.

**Wet locations:** `FB-1`, `FB-2`, floor-level receptacles, fryer whips, and any connection below 24 in. Use weather-resistant devices with gasketed covers, and stand on a dry mat at `DP-A` and `LP-A1`.

**Other systems:** treadmills `TM-01`–`TM-24` (120 V, 15 A max each). Astronomic time clock `TC-1` with roof photocell `PC-1`: `LC-1` (6-pole) switches pole lights `P1`–`P12` (12 × 150 W LED), the canopy and wall-packs dusk to dawn; `LC-2` (3-pole) switches pylon sign `PS-1` and the sign band dusk to 23:30. `PS-1` has a disconnect in its base (NEC 600.6); each tenant's channel letters have their own. Irrigation controller `IRR-1` (24 V valves).

## 11. Lockout/tagout procedures

**Applies to every procedure below:**
- Personal lock, tag and try-out (R-LOTO-01).
- Verify live-dead-live with a CAT III/IV meter, on every phase-to-phase and phase-to-ground combination (R-VERIFY-01).
- Wear PPE per the label (Section 12). While D-01 is open, switching any `MDP-1` or `MS-1` device is an abnormal condition: wear full label PPE.
- There are no backfeed sources on site.
- `M-E` carries the property's padlock. Add your own if you rely on it.

**`MDP-1` (whole site)**
- Lock `MDP-1-M` and verify at the `MS-1` bus.
- Still live: the pull section, the lateral and the `MDP-1-M` line terminals. Work on those needs an LHML disconnect under LHML's lock.
- Before switching: whole-site window, Devon on site, Tony told (2 h limit), Sentinel on test, and the LHML meter shop if any seal will be broken.
- `R-1` goes dark: bring lights.

**`MS-1` position (example `M-C`)**
- Lock `M-C` and verify at the `LP-C` main line terminals.
- Still live: the meter socket, the `M-C` line side and the bus. Work on those needs `MDP-1-M`.
- Devon clears the floor first.

**`DP-A`**
- Open the large loads, then lock `M-A`. Verify at the `DP-A` main lugs.
- Still live: the `M-A` line side, including the D-01 lug.
- Agree the window with Tony: 2 h maximum, never during 10:30–14:30 or 16:30–22:00.
- `EF-1` stops, so cooking stops; staff shut off the gas appliances. Marisol logs walk-in temperatures.

**`FRY-1`/`FRY-2`**
- Lock `ST-1` or `ST-2` OFF with its padlock attachment. Verify at the fryer j-box whip terminals.
- Let the 350 °F oil cool below 100 °F.
- If the breaker is found TRIPPED, check `HSS-1` first. After a discharge, do not reset: call Brightline, Tony and Sentinel.
- The 120 V shunt-trip wiring stays live inside `DP-A`; work inside `DP-A` needs `M-A` locked.
- Do not disturb the `HSS-1` nozzles, links or gas-valve cable. If the shunt-trip wiring is disturbed, retest it with Brightline.

**`BH-1`**
- Lock `DP-A` circuit 3 (not within sight of the heater). Verify at the heater's terminal block.
- It holds 180 °F water: valve it off and let it cool.
- Without `BH-1`, `DM-1` cannot sanitize: tell Tony.

**Rooftop unit (example `RTU-A1`)**
- Sources: `DP-A` circuit 9 through `DS-A1`; the convenience outlet (`HP-1` circuit 2); the `FACP-A` relay (24 V DC); capacitors; gas.
- Lock `DS-A1`, plus `DP-A` circuit 9 for work on the disconnect itself. Verify at the unit terminal block.
- Treat the outlet as live unless `HP-1` circuit 2 is locked.
- Close the gas cock before burner work. Call Sentinel before lifting detector wiring.

**`HP-1`**
- Lock `M-H`.
- Then **stop.** The label is missing, so under R-PPE-01 do not remove the dead-front or test inside while the panel may be live; absence-of-voltage testing counts. Escalate (R-ESC-01) and proceed only on the supervisor's documented direction.
- Loads lost:
  - `FACP-A` goes to battery. Put Sentinel on test first and settle the fire-watch question (R-EMERG-01).
  - `R-1` and corridor lights go out (`EM-R1` lasts 90 minutes).
  - Pole lights, signs, `IRR-1` and the roof receptacles go out.

**`LP-B`**
- For panel work, lock `M-B`: the `LP-B` main leaves its own line lugs live. For branch work, lock the branch breaker.
- MWBC 13/15: lock both tied poles. Clamp the neutral and confirm 0 A before opening it; never open it with either pole on.
- Work after hours and tell Grace.

**`LP-A1`**
- Lock `DP-A` circuit 1, and open `ST-1`/`ST-2` because shunt-trip power will be lost.
- The walk-ins lose power, so the 2 h limit applies.
- `COMBI-1` and `IM-2` may be unplugged instead, as long as the plug stays under your exclusive control.
- For work on the 15-60R or `GF-1`, lock `DP-A` circuit 6.

## 12. Arc-flash & PPE

The study is Northline NPE-24-117 (IEEE 1584-2018). Labels were installed 2024-06 and are due for review by 2029-06; after that they count as expired (R-PPE-01). Each label shows incident energy at 18 in and the arc-flash boundary (NFPA 70E 130.5(H)). The category column is Kestrel's mapping of that energy: Category 1 ≤ 4, Category 2 ≤ 8, Category 3 ≤ 25 and Category 4 ≤ 40 cal/cm².

| Equipment | cal/cm² | Boundary | Category | Label |
|---|---|---|---|---|
| `MDP-1` pull section (line side, cleared only by the LHML fuse) | 48.2 | 13 ft 2 in | None: over 40, DANGER, no energized work | 2024-06 |
| `MDP-1` main section | 6.8 | 4 ft 2 in | 2 | 2024-06 |
| `MS-1` | 6.1 | 3 ft 11 in | 2 | 2024-06 |
| `DP-A` | 4.3 | 3 ft 2 in | 2 | 2024-06 |
| Tenant panels `LP-A1`, `LP-A2`, `LP-B`, `LP-C`, `LP-D`, `LP-E`, `LP-F` | 1.5 | 1 ft 9 in | 1 | 2024-06 |
| `HP-1` | — | — | — | **Missing:** do not open or test energized (R-PPE-01) |
| `DS-*`, `GF-1`, `HCP-1` | ≤ 1.1 | Under 18 in | 1 | 2024-06 |

- **Shock boundaries at 208 V** (NFPA 70E Table 130.4(E)(a)): limited approach 3 ft 6 in, restricted approach 1 ft 0 in. Use Class 00 or Class 0 gloves.
- **Kestrel minimum (R-PPE-01):** safety glasses, hard hat, an 8 cal/cm² arc-rated shirt, and rated gloves for testing.
- **At `MDP-1`, `MS-1` and `DP-A`:** the Category 2 kit. That means an 8 cal/cm² arc-rated shirt and pants, an arc-rated face shield with balaclava, hearing protection and leather footwear.
- **Thermography with covers off** is diagnostic work: no EEWP is needed, but full PPE is (R-EWP-01).

## 13. Maintenance & test records

- **2022-04-12, onboarding survey:**
  - Directories typed for all panels except `LP-F`, because the tenant was closed.
  - Bonding screw removed from `LP-D`.
- **2023-12-08, IR scan:** no exceptions. `M-A` phase A line lug was +3 °C.
- **2024-04-03 to 05-03, 30-day recordings:** peaks of 588 A, 318 A and 151 A (Section 5).
- **2024-04-21, 01:00–02:10, whole-site outage:**
  - Breakers exercised but not trip-tested. Main bonding jumper verified.
  - Lugs torqued to label values; only `M-C` phase B was low, and it was retorqued.
  - The `M-A` line lugs were not checked: they are behind the sealed CT compartment, and LHML was not scheduled.
  - Electrode resistance 4.1 Ω.
- **2024-12-10, IR scan:** `M-A` phase A line lug +9 °C. NETA classes 4–15 °C as a probable deficiency. Recommended a retorque at the next shutdown.
- **2025-09-16, `HSS-1` service:**
  - `ST-2` failed to trip (open coil), so `FRY-2` was locked out.
  - `ST-2` was replaced like-for-like on 2025-09-18 ($1,140, approved). Retest passed.
- **2025-12-12, IR scan during lunch service:**
  - `M-A` phase A line lug 71 °C, against 33 °C on phases B and C: a 38 °C rise. NETA classes anything over 15 °C as major: repair immediately.
  - Phase loads were 298/281/276 A. That 6 % imbalance does not explain the rise.
  - `LP-A1` terminal 41B ran 9 °C above 41A.
  - `HP-1` was not scanned because its label is missing.
- **2026-02-10, house battery units, 90-minute test:** `EM-H3` failed at 61 minutes. Its battery was replaced 2026-02-24 and the retest passed. All other units passed.
- **2026-03-04 and 2026-09-09, `HSS-1` service:** both shunt trips passed. `MUA-1` stopped, `EF-1` ran and Sentinel received the alarm.
- **2026-09-15, Suite A GFCI tests:** every GFCI tripped. `GF-1` tripped at 5.3 mA.
- **Not covered by the service agreement:** breaker trip testing.
- **Next IR scan:** due 2026-12.

## 14. Known issues, deficiencies & history

### Open deficiencies (as of 2026-10-07)

**D-01: `MS-1` M-A hot lug.** The phase A line-side lug of the Suite A tenant breaker rose from +3 °C (2023) to +9 °C (2024) to +38 °C above phases B and C (2025-12-12, during lunch service).
- **Fix:** a retorque, which needs a whole-site shutdown at `MDP-1-M` and LHML to break the CT seal (about 90 minutes dead).
- **Customer declined** the night-shutdown cost (Q-2025-1215, $3,850; Priya, 2025-12-19). Kestrel's operations manager sent a written risk notice on 2025-12-22. It was re-quoted with D-02 as Q-2026-0602 ($5,200); no decision yet.
- Never retorque energized (R-EWP-01).

**D-02: Water at meter stack 2.** The roof leaked above `R-1` after a storm on 2026-05-27 and was patched; the hatch-curb gasket leaked again on 2026-09-25 and was replaced on 2026-09-30. Check after heavy rain.
- The `M-E` (vacant suite) meter base jaws and ring are corroded; no water was found inside `MS-1` or `HP-1`.
- At the next shutdown, replace the `M-E` socket and insulation-test the stack (in Q-2026-0602). Keep `M-E` off until then. Ridgeline proposes re-roofing the `R-1` bay in 2027.

**D-03: Unlisted tandem in `LP-A1` space 41.** Others added a second ice machine, `IM-2`, in 2025 with no permit on record. The panel label does **not** list tandems for that position; flagged to the property manager on 2025-10-21, unresolved.
- The tandem is rated 10 kA, outside the panel's 22 kA series rating where 12.4 kA is available. Terminal 41B runs warm.
- Proposal Q-2025-1031 ($2,450): a kitchen sub-panel fed from spare `DP-A` space, taking 41A and 41B. Circuit 42 could be reused once traced. Added load is still capped by `M-A` capacity.

**D-04: `HP-1` label missing** since 2025-12-12. Northline must re-verify the panel first, because circuit 14 (added by Kestrel in 2025-01) postdates the study. Their $780 quote awaits Priya's approval (since 2026-01-08).

**D-05: `COMBI-1` trips `GF-1`.**
- **Trip log:** 11 trips in the 30 days from 2026-08-12. Eight came at 07:45–08:30 during preheat (steam generator filling and heating), two after the nightly floor wash-down, one during service. Staff reset `GF-1` themselves.
- **Kestrel measurements (2026-09-15):** cord leakage 1.9 mA idle, 3.4–4.1 mA in steam mode, 5.6 mA peaks when the steam-generator elements switch on. `GF-1` trips within spec.
- **Receptacle:** the 15-60R sits 18 in up, under the drain line; its face is scaled and the plug blades are discolored. The box was dry.
- **Possible causes (none confirmed):** failing steam-generator element insulation (Copperline tests the elements on 2026-10-14); moisture at the receptacle or plug; EMI-filter and fan-drive leakage.
- Q-2026-0918 ($640) moves the receptacle to 48 in with an in-use cover and replaces the plug; awaiting approval. Tony asked for `GF-1` to be bypassed; Kestrel refused, because installed ground-fault protection is never bypassed (`sp-wet-locations`).

**D-06: `LP-F` directory** is handwritten (2019). Circuits 17 and 19 say "SPARE" but feed pedicure chairs 5 and 6 (added by others, 2024). Circuit 9, "SIGN", is energized but abandoned, capped above the storefront. A typed schedule is needed (R-LABEL-01).

**D-07: `DP-A` working space blocked** by speed racks (2025-12-12, 2026-09-15). NEC 110.26(A) requires 3 ft clear. Tony has been told.

**D-08: `FB-1` cover gasket cracked.** Replacement approved (under $500) and scheduled.

**D-09: `MDP-1-M` has never been trip-tested** and has no arc-energy reduction. Trip-test it at the next shutdown; add an energy-reducing maintenance switch when the breaker is replaced.

### History

- **2017:** renovation by others: `M-A` converted to CT metering; `DP-A`, `LP-A1`, `LP-A2`, `HSS-1`, `LP-C` and `HP-1` installed.
- **2024-03:** `COMBI-1` installed by the tenant's contractor.
- **2024-11-19:** utility outage; the walk-in cooler peaked at 41 °F.
- **2026-02-11:** `LP-A1` circuit 12 (`FB-2`) tripped overnight and the chef-base refrigerator's product was discarded. Water had entered `FB-2`, which was missing its gasket when the floor was hosed. Kestrel dried the box and fitted a weather-resistant receptacle and a gasketed cover.
- **2026-07-19:** Juniper Grill's `BH-1` booster heater kept tripping its 60 A breaker on `DP-A` during dinner service. The kitchen-equipment vendor replaced a failed element; Kestrel verified a balanced 49 A per phase.
- **2026-09-03:** Paper & Pine reported half its sales-floor lights out. On `LP-B`, multi-wire lighting circuit 13/15 (two single-pole breakers) was missing its handle tie and pole 15 had tripped. Kestrel installed a listed tie and reset it; no fault was found. The tenant had added two track heads the week before.
