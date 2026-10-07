# Harbor Point Tower — Site File

Account `acct-harbor-point-tower` · Kestrel customer since 2019 · Service agreement: quarterly preventive maintenance plus 24/7 on-call.

## 1. Site overview & access

- **Building:** 1200 Waterline Avenue, Port Calder, WA 98101. 18-storey Class A multi-tenant office tower, ~412,000 sq ft, built 2006. B1 is building services and P1 is parking/EV. No healthcare occupancy (R-HEALTH-01 does not apply).
- **Access:** check in at loading-dock security (B1 north). Kestrel key ring K-14 opens all electrical rooms. After 18:00 a security escort is required above floor 2.
- **Hours and shutdowns:** tenant hours are 07:00–19:00 weekdays. Tenant-affecting shutdowns only on Saturday 06:00–14:00 or weekdays after 22:00, with 72 h written notice (R-NOTIFY-01). Larkspur Legal wants 5 days' notice; `DS-4` and its server racks are its top-priority loads.
- **Rooms:** B1-104 Main Electrical Room (next to the freight elevator, below core shaft east); B1-106 MCC-1 and chiller plant; B1-110 engineering office (staffed 06:00–22:00 weekdays); B1-112 fire pump room; G-101 generator room (ground level west, doors to the service drive); north yard UT-1; EC-02 … EC-18 stacked core closets; 1406 Northline data room; P1-020 EV panel room; 1-005 fire command center; roof MR-1 elevator machine room, CT-1/CT-2, SPF-1/SPF-2; AHU-1 in M-201, AHU-2 in penthouse PH-1.
- **Tenants:** Suite 400 Larkspur Legal LLP; Suite 450 Meridian Analytics; Suite 1400 Northline Data (24/7 NOC); Suite 1800 Ashgrove Capital Partners. Floors 3, 7 and 11 are multi-tenant.

## 2. Contacts & escalation

- **Building:** Dana Whitfield, Chief Engineer (site contact) 555-0142; security desk (after hours, escorts, fire watch) 555-0143; Luis Ferreira, Assistant Chief Engineer (after-hours on call) 555-0144; Priya Raman, General Manager (approves proposals) 555-0145.
- **Kestrel:** Tom Okafor, field supervisor 555-0150; Rachel Lindqvist, operations manager (EEWPs) 555-0151; dispatch 555-0152.
- **Tenants:** Helen Marsh, Larkspur Legal 555-0153; Sam Kowalczyk, Meridian IT 555-0154; Northline NOC (approves UPS-14/LP-14U work) 555-0155.
- **Outside:** Port Calder Fire Marshal 555-0160; Calder Bay Power & Light (CBPL) switching desk 555-0161; Tidewater Fire Protection (FACP-1, fire pump) 555-0162; Bluewater Alarm Monitoring 555-0163; Ridgeway Power Systems (GEN-1) 555-0164; Summit Vertical (elevators) 555-0165; Arclight Critical Power (UPS-14) 555-0166; Corvane Networks (EV chargers) 555-0169.
- **Escalation:** overheating, water, life-safety work, a bad label or an incomplete lockout go to Tom Okafor, then Dana (R-ESC-01). A failed generator or ATS test goes to Dana within 1 h (R-EMERG-01). A fire-protection impairment goes to Dana, the Fire Marshal, Bluewater and Tidewater; Dana arranges the fire watch. Only CBPL operates UT-1. EEWPs are signed by Lindqvist and Whitfield (R-EWP-01).

## 3. Utility service

- **Utility:** CBPL. Account 40-118-2207-6, meter CB-M 7743119. 13.2 kV loop from feeder WATERLINE-12, 500 MVA available.
- **`UT-1`:** utility-owned 2500 kVA pad-mount, 13.2 kV to 480Y/277 V 3Ø4W, Z 5.75%, secondary FLA 3,007 A. The service point is the secondary spades.
- **Service conductors:** 11 sets of 4 × 600 kcmil Cu XHHW-2 in a concrete-encased PVC duct bank, 45 ft. Rated 4,620 A, which covers the 4000 A main (240.4(C)).
- **Metering** (MSB-1 Sec 1, sealed): CTs 4000:5 (multiplier 800); no PTs.
- **Fault current** (CBPL letter 2023-02-14): 48.1 kA at UT-1 (52.3 kA infinite-bus); 47.7 kA at the MSB-1 bus, including 0.8 kA motor contribution. The 110.24 label reads "52.3 kA, 2023-04-10".
- **Peak demand:** 1,690 kW, ~2,160 A (2025-08-14).
- **Fire-pump tap:** `FP-1` has its own service tap ahead of `MSB-1-M` (230.82(5)): 3 × 300 kcmil + 2 AWG neutral, concrete-encased, to `FPD-1`. With MSB-1-M open, Sec 1, the tap and FPD-1 stay live; only CBPL opening UT-1 de-energizes them.

## 4. One-line diagram

```
CBPL 13.2 kV ─ UT-1 2500 kVA (north yard) ─ 11 × 4 × 600 kcmil
└─ MSB-1 4000 A 65 kA (B1-104)
   ├─ Sec 1 tap (LIVE unless UT-1 open) ─ FPD-1 1200 A fused, LOCKED CLOSED
   │  └─ FPC-1 normal ─ FP-1 150 HP (B1-112)
   └─ MSB-1-M 4000 A LSIG, GFP 1200 A/0.3 s
      ├─ MSB-1-1 1200 A ─ BD-1 busway, floors 2–9
      │  └─ per floor: BP-xx 200 A fusible (175 A RK1)
      │     ├─ T-xxA 112.5 kVA ─ LP-xxA 225 A (e.g. LP-7A, LP-9A)
      │     ├─ T-xxB 75 kVA ─ LP-xxB 100 A (T-3B/LP-3B, T-7B/LP-7B)
      │     └─ BPL-xx 100 A breaker plug ─ HL-xx 277 V
      │     floor 4: BP-4 ─ T-4A ─ LP-4A ─ DS-4; BP-4 ─ T-4B ─ LP-4B; BPL-4 ─ HL-4
      ├─ MSB-1-2 1200 A ─ BD-2 busway, floors 10–18 (same; T-11B/LP-11B)
      │     BP-14 ─ T-14A ─ LP-14A; BPL-14 ─ HL-14
      │     BP-17 ─ T-17A ─ LP-17A; BP-18 ─ T-18A ─ LP-18A; BPL-18 ─ HL-18
      ├─ MSB-1-3 800 A ─ MCC-1: VFDs CHWP-1/2, CWP-1/2, SF-1 (AHU-1),
      │     SF-2 (AHU-2), CT-1 ─ CT-1-DS, CT-2 ─ CT-2-DS (roof); CH-1, CH-2
      ├─ MSB-1-4 400 A ─ EL-1A ─ ED-1 … ED-5 (MR-1) ─ cars 1–5
      ├─ MSB-1-5 600 A ─ ATS-OS normal
      ├─ MSB-1-6 225 A ─ ATS-LS normal
      ├─ MSB-1-7 225 A ─ HP-B1: lighting, SP-1/SP-2 sumps, GEN-1 heater, JPC-1 ─ JP-1
      │  ├─ 125 A ─ T-P1 75 kVA ─ LP-P1 225 A ─ EVSE-1 … EVSE-8
      │  └─ 70 A ─ T-B1 45 kVA ─ LP-B1 (B1 receptacles, GEN-1 charger)
      └─ MSB-1-8 400 A spare, racked out, padlocked

GEN-1 750 kW (G-101), separately derived
├─ GEN-1-LS 225 A ─ ATS-LS ─ EDP-1 225 A ─ ELP-1 (P1–9), ELP-2 (EC-10, 10–18),
│                             SPF-1, SPF-2, TE-1 15 kVA ─ EP-1 ─ FACP-1
├─ GEN-1-OS 600 A ─ ATS-OS (TDR-OS) ─ DP-OS 600 A
│  ├─ EL-1B ─ ED-6 ─ car 6;  DWBP-1/DWBP-2 booster pumps
│  ├─ T-14U 45 kVA ─ MBC-14 ─ UIB-14 ─ UPS-14 (BC-14/BCB-14) ─ MIB-14 ─ LP-14U
│  │                        └─ MBB-14 maintenance bypass ──────────┘
│  └─ T-OS ─ LP-OS (BAS, security);  T-MR ─ LP-MR (car lights)
└─ GEN-1-FP 400 A ─ FPC-1 alternate
```

## 5. Switchboard & feeders

- **`MSB-1`:** Square D QED-6 (2006), 4000 A Cu bus, 480Y/277 V, 100% neutral, 65 kA. All breakers are draw-out Masterpact. IR windows on the rear covers (2023) allow scans without opening.
- **Sections:** 1 utility CTs/FP tap; 2 MSB-1-M; 3 MSB-1-1/-2; 4 MSB-1-3/-4/-5; 5 MSB-1-6/-7/-8.
- **MSB-1-M** (NW40H1, Micrologic 6.0A LSIG): long time 4000 A, 12 s; short time 3× (12,000 A), 0.3 s; instantaneous off; ground fault 1200 A / 0.3 s (230.95).
- **Feeders:** MSB-1-1/-2 short time 4×/0.2 s, ground fault 600 A/0.1 s. MSB-1-3 0.2 s, instantaneous off. MSB-1-4/-7 0.1 s, instantaneous 10×. MSB-1-5/-6 0.1 s, instantaneous off (selectivity, 700.32).
- **No feeder GFP below MSB-1-2:** MSB-1-3 through -7 have no ground-fault trip, so a low-level ground fault on any of them trips MSB-1-M and takes out the whole building.

| Breaker | Frame | Conductors per phase + EGC (Cu) | Raceway | Length | Load | Peak 2025-08 |
|---|---|---|---|---|---|---|
| MSB-1-1 | NW12 1200 A | BD-1 1200 A Cu busway | Flanged | 190 ft | Floors 2–9 | 612 A |
| MSB-1-2 | NW12 1200 A | BD-2, same | Flanged | 310 ft | Floors 10–18 | 694 A |
| MSB-1-3 | NT08 800 A | 3 sets 3 × 300 kcmil + 1/0 | 2½ in. EMT | 60 ft | MCC-1 | 486 A |
| MSB-1-4 | NT08 400 A | 2 sets 3 × 3/0 + 3 AWG | 2 in. EMT | 35 ft | EL-1A | 188 A |
| MSB-1-5 | NT08 600 A | 2 sets 4 × 400 kcmil + 1 AWG | 3 in. EMT | 25 ft | ATS-OS | 212 A |
| MSB-1-6 | NT08 225 A | 4 × 250 kcmil + 4 AWG | 2½ in. EMT | 20 ft | ATS-LS | 96 A |
| MSB-1-7 | NT08 225 A | 4 × 250 kcmil + 4 AWG | 2½ in. EMT | 60 ft | HP-B1 | 141 A |
| MSB-1-8 | NT08 400 A | None | | | Spare | |

**Bus plugs:**
- **`BP-xx`:** 200 A fusible plug with 175 A Class RK1 time-delay fuses (125% of T-xxA's 135 A primary, next size up, per 450.3(B)). Lockable OFF. Feeds T-xxA, plus T-xxB on floors 3, 4, 7 and 11, with 2/0 Cu.
- **`BPL-xx`:** 100 A breaker plug feeding HL-xx.
- **Fault current at plugs:** floor 4 33 kA, floor 14 24 kA, floor 18 21.5 kA.
- **BP-4:** peaks at 88 A. Its fuses cap T-4A + T-4B at ~145 kVA.

## 6. Panel schedules

Tenant panels are Square D NQ: 208Y/120 V 3Ø4W, QOB breakers, 10 kA. Labels allow no tandem breakers (R-LOAD-01). In the tables, breaker is amps/poles and wire is AWG Cu.

### LP-4A — Larkspur Legal, Suite 400 (EC-04)

225 A main breaker, 42 spaces, 40 in use (40 and 42 free), 5.9 kA available. Fed from T-4A by 250 kcmil, 12 ft. Peaks (2025-10): A 148 A, B 131 A, C 139 A.

| Ckt | Brkr | Wire | Load / notes |
|---|---|---|---|
| 1–17 odd | 20/1 | 12 | Open-office receptacles, pods 1–3 |
| 2–12 even | 20/1 | 12 | Open-office receptacles, pods 4–5 |
| 14, 16, 18 | 20/1 | 12 | Perimeter offices 405–418 |
| 19 | 20/1 | 12 | Copier room, dedicated |
| 20, 28 | 20/1 | 12 | File room; workroom printers |
| 21 | 20/1 | 12 | Break-room microwave |
| 22, 23, 24, 26 | 20/1 GFCI | 12 | Break-room counter, refrigerator, coffee, dishwasher |
| 25, 27 | 20/1 | 12 | Server racks A, B (L5-20R); 25's neutral repaired 2026-02-11 |
| 29–33 | 20/1 | 12 | Conference rooms 401–403, receptacles and AV |
| 34 | 20/1 | 12 | Server closet receptacle |
| 35/37 | 30/2 | 10 | DS-4 ductless split AC (server closet) |
| 36, 38, 39, 41 | 20/1 | 12 | Reception; water heater 1.5 kW; reception signage; access control |
| 40, 42 | | | Spare spaces |

### LP-4B — Meridian Analytics, Suite 450 (EC-04)

100 A main breaker, 30 spaces, 30 of 30 in use, 4.2 kA available. Fed from T-4B by 1/0, 15 ft. Peaks (30 days to 2026-03-15): A 58 A, B 71 A, C 64 A.

| Ckt | Brkr | Wire | Load / notes |
|---|---|---|---|
| 1–11 odd | 20/1 | 12 | Workstation rows A–B |
| 2–12 even | 20/1 | 12 | Workstation rows C–D |
| 13, 15, 17 | 3 × 20/1, handle tie | 3 × 12 + shared 12 N | Rows E–G; MWBC, one per phase; tie covers 13–15 only (D-1) |
| 14, 16 | 20/1 | 12 | Server cabinet, L5-20R |
| 18, 20 | 20/1 GFCI | 12 | Kitchenette refrigerator; counter |
| 19, 21 | 20/1 | 12 | Microwave; copier |
| 22–26 | 20/1 | 12 | Conference 451–452; reception; offices 455–462 |
| 27–30 | 20/1 | 12 | PoE switch; access control; phone rooms; lounge |

### HL-4 — floor 4 lighting (EC-04)

480Y/277 V, 100 A main lugs (protected by BPL-4), 30 spaces, 35 kA. LED fixtures, relay-switched.

| Ckt | Brkr | Wire | Load / notes |
|---|---|---|---|
| 1–11 odd | 20/1 | 12 | Suite 400 zones |
| 13, 15, 17 | 20/1 | 12 | Suite 450 zones |
| 2–10 even | 20/1 | 12 | Corridor, restrooms, freight lobby, relay panel (egress is on ELP-1) |
| 12, 14, 16, 19, 21, 23 | 20/1 | | Spares, OFF |
| 18, 20, 22, 24–30 | | | Spaces |

### LP-P1 — EV charging (P1-020)

208Y/120 V, 225 A main breaker, 30 spaces. Chargers are capped at 32 A, so their 40 A circuits are 125% of continuous load (625.42). Peaks (2026-09): A 138 A, B 131 A, C 92 A.

| Ckt | Brkr | Wire | Load / notes |
|---|---|---|---|
| 1/3, 13/15, 2/4, 14/16 | 40/2 | 8 | EVSE-1, EVSE-4, EVSE-5, EVSE-8 (A–B) |
| 5/7, 6/8 | 40/2 | 8 | EVSE-2; EVSE-6 by the ramp drain, ground faults (D-4) (C–A) |
| 9/11, 10/12 | 40/2 | 8 | EVSE-3, EVSE-7 (B–C) |
| 17–19 | 20/1 | 12 | Corvane gateway; GFCI receptacles; room light |
| 20, 21 / 22–30 | | | Spares / spaces |

### LP-14U — Northline UPS output (room 1406)

208Y/120 V, 125 A main breaker, 30 spaces, fed from MBC-14. LP-14U stays energized when LP-14A is off. Load 11.2 kW.

| Ckt | Brkr | Wire | Load / notes |
|---|---|---|---|
| 1/3 … 14/16 | 30/2 | 10 | Racks R1–R8 A-feeds, L6-30R (B-feeds on LP-14A) |
| 17–22 | 20/1 | 12 | NOC consoles, video wall, MDF switch, firewall, clean-agent panel, access control |
| 23, 25, 27 / 24, 26, 28–30 | | | Spares / spaces |

### ELP-1 — life-safety egress lighting (B1-104), summary

480Y/277 V, 100 A main lugs, fed from EDP-1 (60 A). All circuits are 20/1: 1–2 P1; 3–5 B1, G-101, lobby; 6–7 stairs; 8–15 floors 2–9 (floor 4 on ckt 10); 16 exit discharge; 17–19 spare; 20–30 spaces.

ELP-2 (EC-10) mirrors this for floors 10–18 and is fed by 2-hour MI cable (700.10(D)).

### EL-1 — elevators (B1-104)

Two-section 480 V panel, 65 kA, labeled "TWO SOURCES".
- **EL-1A:** 400 A main lugs, fed from MSB-1-4. Breakers EL-1A-1 … -5, 100/3 each, run to ED-1 … ED-5 (cars 1–5) in 1 AWG.
- **EL-1B:** 125 A main lugs, fed from DP-OS (standby). Breaker EL-1B-1, 100/3, to ED-6 (car 6).

## 7. Transformers

All are dry-type, 480Δ to 208Y/120 V, with ±2.5% taps. The system bonding jumper is at X0 in each enclosure.

| ID | kVA / Z | FLA pri / sec | Primary OCPD | Tap | Secondary OCPD | GEC | Peak |
|---|---|---|---|---|---|---|---|
| T-xxA (floors 2–18) | 112.5 / 4.6% | 135 / 312 A | BP-xx 175 A | 480 V | LP-xxA 225 A | 2 AWG | T-4A 47%, T-14A 63% |
| T-17A, T-18A | same | | BP-17, BP-18 | 468 V (primary reads 466–470 V) | LP-17A, LP-18A | 2 AWG | ~40% |
| T-xxB (floors 3, 4, 7, 11) | 75 / 4.3% | 90 / 208 A | BP-xx (shared) | 480 V | LP-xxB 100 A | 6 AWG | T-4B 34% |
| T-P1 | 75 / 4.3% | 90 / 208 A | HP-B1 125 A | 480 V | LP-P1 225 A | 2 AWG | 66% |
| T-B1, T-14U | 45 / 3.5% | 54 / 125 A | 70 A | 480 V | LP-B1 / MBC-14 150 A | 6 AWG | 42% / 33% |
| T-OS | 30 / 3.4% | 36 / 83 A | DP-OS 50 A | 480 V | LP-OS 100 A | 8 AWG | 41% |
| T-MR, TE-1 | 15 / 3.0% | 18 / 42 A | 25 A | 480 V | LP-MR / EP-1 50 A | 8 AWG | ~40% |

OCPDs meet 450.3(B). Secondary conductors are ≤10 ft and end in one OCPD (240.21(C)(2)).

## 8. Grounding & bonding

- **Service bonding:** main bonding jumper in MSB-1 Sec 2; 3/0 Cu GEC to the B1-104 ground bar, bonded to building steel, the water main (within 5 ft of entry), footing rebar and the ground ring.
- **Ground ring:** 2/0 bare Cu, 30 in. deep. Last ground-resistance test 2024 (2024-06-11): 3.1 Ω.
- **Transformers:** each closet transformer taps a 3/0 common GEC riser with irreversible compression (250.30(A)(6)). Downstream neutrals are isolated.
- **GEN-1:** separately derived, with its neutral-to-ground bond in its terminal box. ATS-LS and ATS-OS are therefore 4-pole, so neutral current cannot defeat MSB-1-M's GFP.
- **GFP settings:** MSB-1-M 1200 A / 0.3 s; MSB-1-1/-2 600 A / 0.1 s; none on FPD-1/FPC-1 (695.6(G)); GEN-1 alarm only (700.6(D)).
- **Last GFP test** (2025-11-15, next due 2026-11): MSB-1-M tripped at 1,190 A in 0.31 s; MSB-1-1 at 605 A, 0.11 s; MSB-1-2 at 598 A, 0.10 s.

## 9. Emergency, standby & life safety

### GEN-1

- **Unit:** Caterpillar 3412C diesel, 750 kW / 938 kVA, 480Y/277 V, 1,128 A, in G-101. NFPA 110 Level 1, Type 10. 1,486 hours.
- **Fuel:** 1,500-gallon belly tank, about 24 hours at full load (~53 gal/h). Kept at 90% or more. Low-fuel alarms at 50% and 25%.
- **Controller:** Cat EMCP 4.2B, switch AUTO/RUN/STOP. Normal position is AUTO. E-stops on the controller and outside G-101.
- **Starting:** GEN-1 starts on loss of normal power at any transfer switch: ATS-LS, ATS-OS or FPC-1 sends the signal.
- **Shutdowns:** overcrank, overspeed, low oil pressure, high coolant temperature, low coolant level, E-stop.
- **Alarms** (annunciated in B1-110 and at security): pre-shutdown warnings, low coolant temperature, low fuel, charger failure, low battery, Not in Auto, ground fault.
- **Block heater:** 9 kW, from HP-B1.
- **Batteries:** 24 VDC, installed 2024-09. The charger is fed from LP-B1 and floats at 27.0 V.
- **Output breakers:** GEN-1-LS 225 A, GEN-1-OS 600 A, GEN-1-FP 400 A (red tag "FIRE PUMP — KEEP CLOSED").
- **Load shedding:** ATS-OS is shed below 57 Hz (700.4(B)).

### ATS-LS and ATS-OS

| | ATS-LS (life safety, NEC 700) | ATS-OS (optional standby) |
|---|---|---|
| Type | Eaton ATC-900, 4-pole, open transition, 225 A | Same, 600 A |
| Sources | MSB-1-6 / GEN-1-LS | MSB-1-5 / GEN-1-OS |
| Loads | Egress lighting ELP-1/ELP-2; FACP-1; stair fans SPF-1/2 | Car 6; booster pumps; UPS-14 input; BAS and security; LP-MR |
| Delays (start / transfer / retransfer / cool-down) | 1 s / 0 / 15 min / 5 min | 1 s / TDR-OS 1.5 s / 20 min / 5 min |
| Transfer limit | 10 s (700.12) | 10 s (owner standard: car 6 is the standby elevator) |
| Exerciser | Off; monthly loaded test instead | Off |
| Peak load | 96 A | 212 A |

The emergency path is selectively coordinated (2023 study). Do not change its settings.

### Fire pump

- **`FP-1`:** 1,000 gpm at 165 psi, 150 HP, 460 V, FLA 172 A, locked-rotor current ~1,085 A.
- **`FPC-1`:** Eaton Firetrol wye-delta closed-transition controller (B1-112) with an integral transfer switch. It transfers the fire pump to GEN-1 independently and starts GEN-1 itself. The alternate isolating switch is supervised. Start at 215 psi; manual stop.
- **`FPD-1`:** 1200 A, Class L fuses, sized to carry locked-rotor current (695.4(B)(2)). Red-labeled, locked closed and supervised. Never opened without the fire marshal's permit and a fire watch.
- **Feeders and jockey pump:** feeders are 3 × 300 kcmil, at least 125% of FLA (695.6(C)). Jockey pump `JP-1` (5 HP) has controller JPC-1 on HP-B1.
- **Tests (Tidewater):** monthly churn; annual flow test with transfer to GEN-1.

### FACP-1 and emergency lighting

- **`FACP-1`:** Notifier NFS2-3030 voice-evacuation panel in 1-005, fed from EP-1, 24 h batteries.
  - **Elevator recall:** to floor 1, or floor 2 if the floor-1 detector is in alarm.
  - **Shunt trip:** each elevator's main breaker has a shunt trip tied to FACP-1 through heat detectors in the machine room (620.51(B)).
  - **Smoke control:** an alarm starts SPF-1/SPF-2; duct detectors stop AHU-1/AHU-2.
  - **Supervision:** FACP-1 supervises FPD-1, FPC-1 and GEN-1. Put it on test with Bluewater before any work.
- **Emergency lighting:** ELP-1/ELP-2 egress fixtures, always on. Battery units in B1-104, B1-112 and G-101. Tested monthly and annually.

### Monthly generator test (first Tuesday, 07:00)

Building engineering runs it monthly; Kestrel attends quarterly (February, May, August, November). It is a 30-minute loaded test started from the ATS-LS and ATS-OS test switches. To pass, each ATS must transfer within 10 s at 456–504 V and 60 ± 0.5 Hz, with no alarms.

1. 06:45: notify security, Bluewater and the Northline NOC (UPS-14 rides through on battery). Park car 6 at the lobby.
2. Check GEN-1: switch in AUTO, no alarms, fluids OK, fuel at 90% or more, charger about 27 V, all three output breakers closed.
3. 07:00: turn both test switches to TEST together and start the stopwatches.
4. Record the time to GEN-1 ready and to each ATS transfer.
5. Confirm FPC-1's "Alternate source available" lamp is lit, which proves GEN-1-FP is closed.
6. At 0, 15 and 30 min, record voltage, frequency, kW and amps.
7. Return both switches to NORMAL. The ATSs retransfer and GEN-1 cools down to AUTO.
8. Confirm no alarms and car 6 back in service. Transfer times, voltage, frequency and alarms are logged on the clipboard in G-101.
9. On a failure, notify Dana within 1 h (R-EMERG-01) and record alarms before resetting. Do not operate an ATS manually without supervisor approval.

## 10. Motors, drives & special systems

### MCC-1 (B1-106)

Square D Model 6, 800 A, 480 V, 65 kA bracing (39 kA available), fed from MSB-1-3.

| Unit | Load | HP / FLA | Drive |
|---|---|---|---|
| 2A, 2D | CHWP-1, CHWP-2 chilled-water pumps | 50 / 65 A | Danfoss FC 102 with bypass |
| 3A, 3D | CWP-1, CWP-2 condenser-water pumps | 40 / 52 A | Danfoss FC 102 with bypass |
| 4A, 4D | CT-1, CT-2 cooling-tower fans (330 ft leads, dV/dt filters, roof disconnects CT-1-DS/CT-2-DS) | 40 / 52 A | ABB ACH580 E-Clipse bypass |
| 5A, 5D | SF-1 (AHU-1), SF-2 (AHU-2) | 75 / 96 A | ABB ACH580 E-Clipse bypass |
| 6A–6E | CH-1, CH-2 gas absorption chillers (38 A each); basin heaters; spare | | Breakers |

- **Stored energy:** the DC bus is ~650 VDC, and the capacitors stay charged after the drive is shut down. Wait the time on the drive label before opening (ABB 5 min, Danfoss 15 min), then verify under 50 VDC at UDC+/UDC− (ABB) or terminals 88/89 (Danfoss). The unit disconnect kills both the drive and its bypass; BAS 24 V control wiring stays live.
- **Faults seen:** ABB 2310 overcurrent, 2330 earth leakage, 3220 DC undervoltage; Danfoss A13 overcurrent, A14 earth fault, A8 DC undervoltage.

### UPS-14

- **Unit:** Vertiv Liebert APM, 30 kVA, 208 V, room 1406. Owned by Northline, serviced by Arclight. Load 11.2 kW.
- **Battery:** cabinet BC-14, 40 × 12 V VRLA (480 VDC), DC breaker BCB-14, installed 2023-03. Runtime 23 min.
- **MBC-14:** 150 A input breaker feeding UIB-14 (UPS input), MIB-14 (UPS output) and MBB-14 (maintenance bypass), each 125 A. MIB-14 and MBB-14 are key-interlocked.
- **EPO** at the door trips UPS-14, BCB-14, MIB-14 and MBB-14. It is not a lockout.
- **Maintenance bypass** (LP-14U stays live): get Northline approval; put the UPS on static bypass; close MBB-14 and open MIB-14; shut down the UPS and open UIB-14 and BCB-14; lock all three and wait 5 min.

### EV chargers, elevators, lighting

- **EVSE-1 … EVSE-8:** Corvane L2-32 Level 2 pedestals, 208 V, 32 A, each on a 40 A 2P LP-P1 breaker. Built-in CCID20 (20 mA, self-test each session, retry after 15 min); no upstream GFCI. The LP-P1 breaker is the disconnect (625.43). Network: Corvane Networks over OCPP 1.6J; site cap 45 kW, 16 A each if offline. Faults: GF-01 ground fault, CP-03 pilot, OT-02 over-temperature, NET-01 offline.
- **Elevators:** six gearless traction cars (40 HP regenerative drives). ED-1 … ED-6 are 100 A shunt-trip breakers. Car 6 is on standby power. Only Summit Vertical works inside the controllers.
- **Lighting:** floor relay panels with occupancy sensors and a 19:00 sweep; HP-B1 contactors for garage and exterior lighting. Egress lighting is never switched.

## 11. Lockout/tagout procedures

Every procedure below includes personal lock, tag and try-out (R-LOTO-01); live-dead-live, phase-to-phase and phase-to-ground (R-VERIFY-01); PPE per the label (R-PPE-01); notice (R-NOTIFY-01) and photos (R-DOC-01). Draw-out breakers are racked to DISCONNECTED and padlocked.

| Equipment | Energy sources and backfeeds | Isolate and lock | Verify | Notes |
|---|---|---|---|---|
| MSB-1 (whole building) | CBPL; Sec 1, tap and FPD-1 live with the main open; GEN-1 picks up the ATS loads and FPC-1 | Open MSB-1-1 … -7, rack out MSB-1-M. Sec 1–2 work: CBPL opens, locks and grounds UT-1 (group lockbox) | Sec 1 absence-of-voltage tester, then lugs and bus; apply grounds | Never open energized. Saturday only. Staff G-101. Fire pump stays on GEN-1: notify fire marshal |
| Tenant panel LP-xxA (LP-4A) | T-4A; tenant plug-in UPS outlets | Branch breaker; LP-4A main (line side stays live); BP-4 for line-side work | Main terminals, bus, each phase to N/G | BP-4 also kills LP-4B: notify both suites |
| Floor transformer T-xxA (T-4A) | BP-4; backfeed via LP-4A | Lock BP-4 and the LP-4A main | H1–H3, X0–X3 | Floor 18: check EC-18 for water (R-ESC-01) |
| MCC-1 / VFD (CT-2) | MSB-1-3; DC capacitors; BAS control; windmilling fan | MSB-1-3 or the unit disconnect, plus CT-2-DS | Wait the label time, DC bus <50 V, U/V/W | Block the fan |
| ATS-LS / ATS-OS | MSB-1-6/-5; GEN-1-LS/-OS; controller power; GEN-1 start contact | Rack out the normal breaker; lock the GEN-1 breaker | Normal, emergency and load terminals plus neutral | GEN-1 starts unloaded; leave it in AUTO. ATS-LS: fire marshal and fire watch (R-EMERG-01). ATS-OS: Northline approval |
| GEN-1 | Start signals; 24 VDC battery; charger; block heater | STOP + E-stop; lock the three output breakers, charger and heater; lift battery negative | Output terminals; try RUN | All alternate sources lost: fire marshal. On restore, confirm GEN-1-FP closed |
| UPS-14 / LP-14U | T-14U via UIB-14/MBB-14; inverter via MIB-14; BC-14 480 VDC | Branch: LP-14U breaker. Panel: lock MIB-14, MBB-14, BCB-14. UPS only: bypass procedure | LP-14U bus; UPS input, output, DC | LP-14U stays live when LP-14A is off. For Suite 1400, also lock UPS-14's output |
| LP-P1 / EVSE | LP-P1; HP-B1 125 A | Charger: its 2P breaker. Panel: LP-P1 main and the HP-B1 breaker | L1–L2, L–G after 1 min | Corvane disable is not a lockout |
| Fire pump FP-1/FPC-1 | FPD-1 (utility tap); GEN-1-FP; JP-1 | FPC-1 OFF; lock the alternate switch and GEN-1-FP; Dana unlocks FPD-1, you open and lock it | Both FPC-1 inputs, motor | Fire marshal permit, fire watch, Bluewater, Tidewater. Restore: check rotation on both sources, test, re-lock FPD-1 closed |

## 12. Arc-flash & PPE

The 2023 study (IEEE 1584-2018) issued labels dated 2023-04, valid to 2028-04 (R-PPE-01). NFPA 70E 2024 categories: 1 up to 4 cal/cm², 2 up to 8, 3 up to 25, 4 up to 40. Above 40 there is no category, and energized work is prohibited.

| Equipment | cal/cm² | Working distance | Boundary | Category |
|---|---|---|---|---|
| MSB-1 Sec 1–2 (line side) | 58.6 | 24 in. | 20 ft | None (>40) |
| MSB-1 bus | 32 | 24 in. | 14 ft | 4 (never open energized) |
| FPD-1 | 55.2 | 18 in. | 14.5 ft | None (>40) |
| GEN-1 output terminals | 21.7 | 18 in. | 8.3 ft | 3 |
| BD-1 plugs (BP-2 … BP-9, BPL-2 … BPL-9) | 12.6 | 18 in. | 6.1 ft | 3 |
| BD-2 plugs (BP-10 … BP-18, BPL-10 … BPL-18) | 10.9 | 18 in. | 5.6 ft | 3 |
| MCC-1 | 11.4 | 18 in. | 5.7 ft | 3 |
| ATS-LS, ATS-OS | 8.1 | 18 in. | 4.7 ft | 3 (corrected from 2) |
| DP-OS, FPC-1, EDP-1 | 7.4 / 6.9 / 6.3 | 18 in. | 4.0–4.4 ft | 2 |
| EL-1; BC-14 (DC) | 4.6; 4.1 | 18 in. | 3.3; 2.8 ft | 2 |
| HP-B1, HL-xx, ELP-1/2, T-xx primaries | 2.1–3.1 | 18 in. | 2.1–2.7 ft | 1 |
| Tenant panels LP-xx, LP-P1, LP-B1, LP-OS, LP-MR, EP-1 | 1.2 | 18 in. | 18 in. | 1 |
| UPS-14, MBC-14, LP-14U | 0.9 | 18 in. | 15 in. | 1 |
| HL-18 | | | | Label water-damaged and illegible: treat as missing |

- **ATS labels:** they state 8.1 cal/cm². The old "category 2" was wrong, because 8.1 is above 8. Use category 3, or PPE rated at least 8.1 cal/cm².
- **HL-18:** do not open or test it energized; escalate (R-PPE-01, R-ESC-01).
- **Kestrel minimum PPE:** 8 cal/cm² shirt, glasses, hard hat, rated gloves.
- **480 V shock boundaries:** limited approach 3 ft 6 in., restricted approach 1 ft.
- **Energized work:** needs an EEWP (R-EWP-01). IR-window scans do not.

## 13. Maintenance & test records

| Monthly test | Kestrel | ATS-LS | ATS-OS | Load | V / Hz | Result |
|---|---|---|---|---|---|---|
| 2026-05-06 (moved from 05-05) | Yes | 7 s | 14 s | 231 kW | 481 / 60.0 | FAIL |
| 2026-06-02 | No | 7 s | 8 s | 238 kW | 480 / 60.0 | Pass |
| 2026-07-07 | No | 7 s | 8 s | 244 kW | 479 / 60.0 | Pass |
| 2026-08-04 | Yes | 7 s | 8 s | 205 kW | 481 / 60.0 | Pass; GEN-1-FP found open |
| 2026-09-01 | No | 7 s | 8 s | 198 kW | 480 / 60.0 | Pass |
| 2026-10-06 | No | 7 s | 8 s | 192 kW | 481 / 60.0 | Pass |

Loads under 30% (225 kW) make the annual load bank necessary (NFPA 110).

| Date | Work | Result |
|---|---|---|
| 2023-04-10 | Arc-flash study; IR windows fitted | Labels issued |
| 2024-06-11 | Ground-ring test | 3.1 Ω |
| 2025-11-04 | Infrared scan | MSB-1-3 B-phase lug +22 °C |
| 2025-11-15 | Whole-building outage 06:00–12:30 (CBPL order SO-25-3318); GEN-1 carried 214 kW peak | MSB-1-3 lugs retorqued; MSB-1-7 A-phase lug found 15% low and retorqued; bus insulation >5 GΩ; trip tests and GFP pass |
| 2025-11-18 | Infrared re-scan | Normal |
| 2026-03-12 | Fire pump flow test | Pass; restarted on GEN-1 in 9 s |
| 2026-04-08 | GEN-1 load bank, 375 / 563 kW | Pass; ATS timers verified; batteries 98% / 96% |
| 2026-04-18 | UPS-14 battery test | 23 min; block 27 impedance +22% |
| 2026-05-08 | TDR-OS replaced | Set to 1.5 s |
| 2026-08-04 | Infrared scan | BP-14 C-phase fuse clip +17 °C |
| 2026-08-12 | CT-2 insulation test | Motor 1.8 GΩ, leads 950 MΩ |

## 14. Known issues, deficiencies & history

**Open as of 2026-10-07:**

- **D-1 — LP-4B MWBC handle tie (2026-03-18).** The tie on 13/15/17 skips 17, a 210.4(B) violation. A 3-pole breaker is on order.
- **D-2 — LP-4B full (2026-08-20).** All 30 spaces are used and tandems are not allowed. Meridian wants circuits for a printer (12 A) and a mini-fridge.
  - Capacity: phase B would go from 71 A to ~83 A, above 80% of the 100 A main. T-4B and BP-4 have spare capacity.
  - Proposal P-2026-118: a 42-space, 125 A main panel (the 1/0 conductors are rated 150 A) plus the D-1 fix, in one Saturday shutdown (R-LOAD-01, R-CUST-01). Not approved.
- **D-3 — Stale panel schedules (2026-06-09), R-LABEL-01.** LP-7A and LP-7B are handwritten; LP-11B does not match the field; LP-9A's schedule is dated 2014.
- **D-4 — EVSE-6 ground faults (since 2026-07-01).** EVSE-6 has logged GF-01 14 times, 11 in rain. Water staining was found in the pedestal base and the conduit seal is missing. It remains in service.
- **D-5 — CT-2 overcurrent trips (since 2026-06-01).** The CT-2 VFD has tripped on ABB 2310 overcurrent 7 times, mostly while accelerating. A longer ramp (30 s to 60 s) did not cure it, and the CT-2-DS interlock is not wired.
- **D-6 — Water in EC-18 (recurring; latest 2026-09-29).** During heavy rain, water gets into closet EC-18 from a roof drain above; on 2026-09-29 it reached T-18A and HL-18. The drain repair is booked for 2026-10-20. Check for moisture before opening any panel on floor 18.
- **D-7 — BP-14 hot fuse clip (2026-08-04).** Replacement is booked for Saturday 2026-10-17, 06:00–10:00. LP-14A will be off; LP-14U stays on.
- **D-8 — UPS-14 battery block 27 (2026-04-18).** Impedance is 22% high; Arclight will retest.
- **D-9 — No energy-reducing switch on MSB-1-M (2023).** The study recommended one, which would take the bus to ~7 cal/cm². Not approved.
- **D-10 — Car 6 classification (2023).** The engineer of record says car 6 is legally required standby (NEC 701), but the labels say "Optional Standby".

**History:**

- 2025-11-04: an infrared scan found the B-phase lug on MSB-1-3 running 22 °C above phases A and C. It was retorqued under a planned outage on 2025-11-15, and a re-scan was normal.
- 2026-02-11: nuisance tripping on LP-4A circuit 25 (server rack A). A loose neutral at the receptacle was repaired and torqued to spec.
- 2026-05-06: at the monthly test, ATS-OS transferred in 14 s against a 10 s requirement. The time-delay relay was replaced, and the June test transferred in 8 s.
- 2026-07-21 to 2026-08-04: GEN-1-FP was left open after GEN-1 service, so the fire pump had no generator backup for 14 days.
- 2026-08-20: Meridian Analytics asked for two more dedicated circuits, for a new printer and a mini-fridge. LP-4B is full. A proposal was sent and is not yet approved.
