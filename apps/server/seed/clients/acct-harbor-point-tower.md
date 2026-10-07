# Harbor Point Tower — Site File

Account `acct-harbor-point-tower` · Kestrel customer since 2019 · Service agreement: quarterly preventive maintenance plus 24/7 on-call.

## Overview & access

- 18-storey Class A multi-tenant office tower, about 412,000 sq ft, built 2006. Two below-grade levels: B1 (building services) and P1 (parking).
- Site contact: Dana Whitfield, Chief Engineer, 555-0142. Building engineering office B1-110 is staffed 6:00–22:00 on weekdays. After hours, call the security desk at 555-0143.
- Check in at loading-dock security (B1, north side). Electrical rooms and closets are on Kestrel key ring K-14. After 18:00 a security escort is required above floor 2.
- Tenant hours are 7:00–19:00 on weekdays. Shutdowns that affect tenants happen only on Saturdays 06:00–14:00 or on weekdays after 22:00, with 72-hour notice.
- Main Electrical Room B1-104 is next to the freight elevator. The generator room G-101 is at ground level, west side, with exterior doors to the service drive.

## Service entrance

- Utility: 13.2 kV primary to a utility-owned 2500 kVA pad-mount transformer UT-1 in the north yard. Secondary is 480Y/277V, 3-phase, 4-wire.
- Main switchboard `MSB-1`: 4000 A, 480Y/277V, 65 kA interrupting rating, in B1-104. Main breaker `MSB-1-M` is a 4000 A electronic-trip (LSIG) breaker with ground-fault protection set at 1200 A / 0.3 s.
- Grounding electrode conductor bonded to building steel, the water main entry, and a ground ring. Last ground-resistance test was 2024: 3.1 Ω.
- Fire pump `FP-1` has its own service tap ahead of `MSB-1-M` through fire-pump disconnect `FPD-1`, which is red-labeled and locked in the closed position. It feeds fire-pump controller `FPC-1`, whose integral transfer switch takes `GEN-1` as the alternate source. `FPD-1` is never opened without the fire marshal's permit and a fire watch.

## Distribution

### MSB-1 feeders

| Breaker | Rating | Feeds | Location |
|---|---|---|---|
| MSB-1-1 | 1200 A | Bus duct riser `BD-1` (floors 2–9) | Core shaft east |
| MSB-1-2 | 1200 A | Bus duct riser `BD-2` (floors 10–18) | Core shaft east |
| MSB-1-3 | 800 A | Mechanical `MCC-1` (chilled-water pumps, cooling tower fans `CT-1`/`CT-2` on VFDs, AHUs) | B1-106 |
| MSB-1-4 | 400 A | Elevator panel `EL-1` (six traction elevators) | B1-104 |
| MSB-1-5 | 600 A | Normal side of `ATS-OS` | B1-104 |
| MSB-1-6 | 225 A | Normal side of `ATS-LS` | B1-104 |
| MSB-1-7 | 225 A | House panel `HP-B1` (480/277 V: garage and exterior lighting, sump pumps) | B1-104 |
| MSB-1-8 | 400 A | Spare (racked out, padlocked) | B1-104 |

### Floor electrical closets

Every floor has a stacked electrical closet at the core: `EC-02` through `EC-18`. A typical closet holds:

- a fusible bus plug `BP-xx` (225 A) on the riser;
- 277 V lighting panel `HL-xx` (100 A, 30 spaces) for that floor's lighting, with occupancy sensors;
- a step-down transformer `T-xxA` (112.5 kVA, 480Δ–208Y/120) feeding tenant panel `LP-xxA` (225 A main breaker, 42 spaces);
- on multi-tenant floors, a second transformer `T-xxB` (75 kVA) feeding `LP-xxB`.

### Floor 4 (multi-tenant), closet EC-04

- `BP-4` (225 A fusible, fuses 175 A class RK1) feeds `T-4A` and `T-4B`.
- Suite 400, Larkspur Legal LLP: tenant panel `LP-4A` (225 A main, 208Y/120V, 42 spaces, 40 in use).
  - Circuits 1–18: open-office receptacles (20 A)
  - 19: copier room, dedicated (20 A)
  - 21: break-room microwave (20 A)
  - 23: break-room refrigerator (20 A, GFCI)
  - 25: server closet rack A (20 A, L5-20)
  - 27: server closet rack B (20 A, L5-20)
  - 29–33: conference rooms 401–403, receptacles and AV
  - 35/37 (2-pole 30 A): server-closet ductless split AC `DS-4`
  - 39: reception and signage
  - 40, 42: spare spaces
- Suite 450, Meridian Analytics: tenant panel `LP-4B` (100 A main, 30 spaces, 30 of 30 in use). The last load survey (2026-03) showed a peak of 71 A on phase B. Circuits 13, 15 and 17 share one neutral as a multi-wire branch circuit serving workstation rows E–G.

### Floor 14, closet EC-14

- Suite 1400, Northline Data: `LP-14A` (225 A) and `LP-14U`, a UPS output panel fed from UPS `UPS-14` (30 kVA, in data room 1406). `LP-14U` stays energized when `LP-14A` is off. To de-energize it, put `UPS-14` into maintenance bypass, then open and lock its output breaker.

### Garage level P1

- `T-P1` (75 kVA) feeds `LP-P1`, which serves eight Level 2 EV chargers `EVSE-1` to `EVSE-8` (208 V, 40 A each).

## Transformers

| ID | Rating | Primary from | Secondary to |
|---|---|---|---|
| T-xxA (each floor) | 112.5 kVA 480Δ–208Y/120 | BP-xx | LP-xxA |
| T-xxB (multi-tenant floors 3, 4, 7, 11) | 75 kVA | BP-xx | LP-xxB |
| T-P1 | 75 kVA | HP-B1 | LP-P1 |

## Emergency & standby

- `GEN-1`: 750 kW / 938 kVA diesel, 480Y/277V, in G-101, with a 1,500-gallon belly tank (about 24 hours at full load). It starts on loss of normal power at any transfer switch.
- `ATS-LS` (225 A, life safety): egress lighting panels `ELP-1` (B1–9) and `ELP-2` (10–18), fire alarm control panel `FACP-1`, and the stair-pressurization fans. Required transfer time is 10 seconds or less.
- `ATS-OS` (600 A, optional standby): building automation, domestic water booster pumps, elevator car 6, the security system, and the Suite 1400 critical circuits upstream of `UPS-14`.
- `FPC-1` transfers the fire pump to `GEN-1` independently.
- Monthly test: first Tuesday at 07:00, a 30-minute loaded test started from the `ATS-LS` and `ATS-OS` test switches. Building engineering runs it monthly, and Kestrel attends quarterly. Transfer times, voltage, frequency and alarms are logged on the clipboard in G-101.

## Special equipment

- Six traction elevators on `EL-1`. Each elevator's main breaker has a shunt trip tied to `FACP-1` through heat detectors in the machine room.
- `MCC-1` drives `CT-1`/`CT-2` and the pumps through VFDs. Expect harmonics and capacitors that stay charged after the drive is shut down: wait the time on the drive label before opening a VFD.
- `DS-4` and the server racks in Suite 400 are the tenant's highest-priority loads. Larkspur Legal asks for 5 days' notice before any outage.

## Known issues & service history

- 2025-11-04: Infrared scan found the B-phase lug on `MSB-1-3` running 22 °C above phases A and C. It was retorqued under a planned outage on 2025-11-15, and a re-scan was normal.
- 2026-02-11: Nuisance tripping on `LP-4A` circuit 25 (server rack A). Found and repaired a loose neutral at the receptacle and torqued it to spec.
- 2026-05-06: Monthly generator test: `ATS-OS` transferred in 14 s against a 10 s requirement. The time-delay relay was replaced, and the June test transferred in 8 s.
- 2026-08-20: Meridian Analytics (Suite 450) asked for two more dedicated circuits for a new printer and a mini-fridge. `LP-4B` is full. A proposal was sent and is not yet approved.
- Recurring: water gets into closet `EC-18` during heavy rain from a roof drain above. Check for moisture before opening any panel on floor 18.

## Safety notes

- Arc-flash study 2023, labels dated 2023-04:
  - `MSB-1` bus: 32 cal/cm², PPE category 4, arc-flash boundary 14 ft. Never open `MSB-1` sections energized.
  - `MCC-1`: 11.4 cal/cm², category 3.
  - `ATS-LS` / `ATS-OS`: 8.1 cal/cm², category 2.
  - Tenant panels `LP-xx`: 1.2 cal/cm², category 1.
- `HL-18`'s label is water-damaged and illegible, so treat it as missing (R-PPE-01).
- Lockout points: lock each tenant panel at its main breaker. For transformer work, also lock the upstream bus plug `BP-xx` with its handle lock. For Suite 1400, also lock `UPS-14`'s output (backfeed).
