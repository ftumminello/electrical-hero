# Cedar Ridge Medical Pavilion — Site File

Account `acct-cedar-ridge-medical` · Kestrel customer since 2021 · Service agreement: monthly generator and transfer-switch test attendance (quarterly on site), annual load-bank test, 24/7 on-call.

## 1. Site overview & access

- 455 Cedar Ridge Parkway, Brookhaven Falls, WA. 3-storey medical office building, about 96,000 sq ft, built 2015.
- Tenants:
  - Floor 1 west: Cedar Ridge Ambulatory Surgery Center (ASC). Procedure rooms `PR-1` to `PR-3` (general anesthesia, Category 1), pre-op (4 bays), recovery (6 bays).
  - Floor 1 east: Pinewood Imaging (X-ray, CT).
  - Floors 2–3: physician clinics (family medicine 2-110, orthopedics 2-200, dermatology 3-110, dental 3-210).
- Hours: ASC procedures 07:00–15:00 weekdays. Imaging Mon–Sat 07:00–19:00. Clinics weekdays 08:00–17:00.
- Electrical spaces:
  - 1-010 Main Electrical Room (ground floor, off the service corridor): `MSB-1`, `DP-N`, `DP-IMG`, `HL-1`, `T-H`, `LP-H`.
  - 1-012 EES room (adjacent): ATSs, `ELP-1`, `T-LS`, `LS-1`, `DP-EQ`, `T-EQ`, `EQ-1`. It shares a wall with mechanical room 1-014 (`AHU-2`, `VFD-AHU2`).
  - 1-016: `MV-1`. 1-018: `FACP-1`. 1-030: elevator machine room.
  - 1-W08 (ASC closet): `T-1W`, `LP-1W`, `CRD-1`, `T-CR`, `CR-1W`. `IPP-2` is recessed in the `PR-2` wall.
  - 1-E05: `T-1E`, `LP-1E`. 2-015 and 3-015: floor transformers, `SM-2A` / `SM-3A`, tenant panels, `HL-2` / `HL-3`.
  - Roof penthouse PH-1: `MCC-1`, `VFD-1` to `VFD-4`. East yard: `UT-1`, `GEN-1`, `CU-2`.
- Access:
  - Check in at the facilities office 1-020 for keys. The group lockbox is in 1-010.
  - Renee Ortiz's approval is required before anyone enters the ASC.
  - Any ceiling access inside the ASC needs an infection-control (ICRA) permit from facilities, plus shoe covers and dust containment.
  - CT and X-ray rooms: only with the technologist's permission.
- Shutdowns that affect clinical areas happen only on weekends, after written approval from both the facilities manager and the ASC clinical lead. Imaging: Sundays only.
- Notice: 72 h in writing (R-NOTIFY-01). Facilities wants 7 days for ASC or EES work.

## 2. Contacts & escalation

- Marcus Bell, Facilities Manager, 555-0167: site contact. Approves shutdowns, runs the generator tests and issues ICRA permits. After hours: facilities on-call, 555-0160.
- Renee Ortiz RN, ASC clinical lead and charge nurse, 555-0168: approves ASC entry and any ASC or critical-branch outage.
- Alan Pryor, Pinewood lead CT technologist, 555-0161. Northgate Clinical Engineering (biomed), 555-0162.
- Clinic managers:
  - Janelle Morrow, family medicine, 555-0163
  - Victor Haines, orthopedics, 555-0164
  - Lena Park, dermatology, 555-0165
  - Owen Castillo, dental, 555-0166
- Allied Power Systems, 555-0169 (24/7): ATS and `GEN-1` service.
- Sentinel Alarm Monitoring, 555-0171 (account CR-4471). Brightline Fire & Security, 555-0172 (`FACP-1`).
- Summit Elevator, 555-0173. Bridgewater Mechanical, 555-0174 (HVAC and VFD parameters). Keystone Medical Gas, 555-0175.
- Brookhaven Falls PUD (BFPUD), 555-0176. Kestrel dispatch, 555-0177.

Escalation:
- Call the Kestrel supervisor (R-ESC-01) before any work on the EES, `GEN-1`, an ATS, `FACP-1` or `ELP-1`. Also call for overheating, water, expired labels, or a lockout you cannot complete.
- Anything affecting the ASC: Marcus Bell and Renee Ortiz, in writing (R-HEALTH-01).
- Failed generator or transfer test: Marcus Bell within 1 h (R-EMERG-01). He calls Allied and decides on a fire watch.
- `LIM-2` alarm: the charge nurse at once, then biomed the same day.

## 3. Utility service

- BFPUD 12.47 kV underground loop, circuit BF-14. Account 40-118-2296-03, rate GS-3. Meter 7P-55102841 (form 9S; 2000:5 CTs in the sealed utility compartment of `MSB-1`).
- `UT-1`: utility-owned 1500 kVA pad-mount, 12,470GrdY/7,200 – 480Y/277 V, 5.75 %Z, east yard. Secondary FLA 1,804 A. Only BFPUD operates it; planned outages need 10 business days' notice.
- Available fault current:
  - 31.4 kA at the `UT-1` secondary (BFPUD letter 2023-11-14; infinite primary, X/R 6.8). This value is marked on `MSB-1` (NEC 110.24).
  - 26.8 kA at the `MSB-1` bus (2024 study).
- Service conductors: 6 sets of 4 × 600 kcmil Cu (2,520 A) in PVC duct bank, about 60 ft.
- Load: 12-month peak 648 kW. `MSB-1-M` peak 842 A on 2026-07-28 (PowerLogic PM5560).
- Voltage: 482–489 V.

## 4. One-line diagram

```
BFPUD 12.47 kV → UT-1 1500 kVA → MSB-1 2000 A 480Y/277 V
└ MSB-1-M 2000 A LSIG, GF 1000 A/0.2 s
  ├ MSB-1-1 800 A → DP-N 800 A
  │ ├ DP-N-1/2/3 100 A → HL-1, HL-2, HL-3
  │ ├ DP-N-4 125 A → T-1W 75 kVA → LP-1W
  │ ├ DP-N-5 175 A → T-1E 112.5 kVA → LP-1E
  │ ├ DP-N-6 175 A → T-2A 112.5 kVA → SM-2A 400 A → LP-2A, LP-2B
  │ ├ DP-N-7 175 A → T-3A 112.5 kVA → SM-3A 400 A → LP-3A (DC-1), LP-3B
  │ ├ DP-N-8 70 A → T-H 45 kVA → LP-H
  │ └ DP-N-9 100 A spare
  ├ MSB-1-2 400 A → MCC-1 (main MCC-1-M)
  │ └ RTU-1…RTU-4 unit power; VFD-1…VFD-4 → RTU supply fans
  ├ MSB-1-3 400 A → ATS-EQ normal
  ├ MSB-1-4 150 A → ATS-CR normal
  ├ MSB-1-5 100 A → ATS-LS normal
  ├ MSB-1-6 225 A → DP-IMG
  │ ├ DP-IMG-1 150 A → CTD-1 → CT-1
  │ ├ DP-IMG-2 100 A → XRD-1 → XR-1
  │ └ DP-IMG-3 60 A spare
  └ MSB-1-7 225 A spare (OFF, padlocked)

GEN-1 500 kW 480Y/277 V (separately derived)
├ GEN-1-CB1 100 A → ATS-LS emergency
├ GEN-1-CB2 150 A → ATS-CR emergency
└ GEN-1-CB3 400 A → ATS-EQ emergency

ATS-LS 100 A 4P → ELP-1 (egress lighting, exit signs)
  └ ELP-1 26/28/30 → T-LS 15 kVA → LS-1 (FACP-1, ELV-1 cab, GEN-1 lights)
ATS-CR 150 A 3P → CRD-1 70 A → T-CR 45 kVA → CR-1W
  ├ PR-1/PR-3, pre-op, recovery, nurse call, refrigerators, MGA-1
  └ CR-1W 2/4 → IPP-2 10 kVA (PR-2), LIM-2
ATS-EQ 400 A 3P (≈20 s delay) → DP-EQ 400 A
  ├ DP-EQ-1 60 A → MV-1
  ├ DP-EQ-2 60 A → VFD-AHU2 → AHU-2 supply fan
  ├ DP-EQ-3 60 A → CU-2
  ├ DP-EQ-4 100 A → ELV-1-DS → ELV-1
  ├ DP-EQ-5 45 A → T-EQ 30 kVA → EQ-1 (GEN-1 heater, charger)
  └ DP-EQ-6 60 A spare
```

## 5. Switchboard & feeders

- `MSB-1`: Square D QED-2, three sections, 2000 A copper bus, 480Y/277 V 3-phase 4-wire, 50 kA interrupting rating (fully rated).
  - Section 1: utility CTs and `MSB-1-M`. Sections 2–3: PowerPacT feeders. No IR windows.
- `MSB-1-M`: 2000 A electronic-trip (LSIG) breaker, Masterpact NW20H1 with MicroLogic 6.0A.
  - Settings: Ir 2000 A; Isd 8,000 A, 0.3 s; Ii OFF. Ground-fault protection set at 1000 A / 0.2 s.
  - No energy-reducing maintenance switch.
- Every feeder has a second level of GFP, 0.1 s band (NEC 517.17(B)), selective with the main.
- EES devices are selectively coordinated above 0.1 s (NEC 517.31(G)).

| Breaker | Settings | Cu conductors + EGC, length | Load | 2026 peak |
|---|---|---|---|---|
| `MSB-1-1` | 800 A, tsd 0.2 s, Ii OFF, Ig 400 A | 2 × (4-600 kcmil + 1/0), 25 ft | `DP-N` | 352 A |
| `MSB-1-2` | 400 A, tsd 0.2 s, Ii OFF, Ig 200 A | 2 × (3-3/0 + #3), 140 ft | `MCC-1` | 276 A |
| `MSB-1-3` | 400 A, Ii 4,000 A, Ig 200 A | 2 × (3-3/0 + #3), 30 ft | `ATS-EQ` | 118 A |
| `MSB-1-4` | 150 A, Ii 1,500 A, Ig 90 A | 3-1/0 + #6, 30 ft | `ATS-CR` | 31 A |
| `MSB-1-5` | 100 A, Ii 1,000 A, Ig 60 A | 4-#3 + #8, 30 ft | `ATS-LS` | 22 A |
| `MSB-1-6` | 225 A, Ig 135 A | 3-4/0 + #4, 45 ft | `DP-IMG` | 64 A (≈165 A momentary during CT scans) |
| `MSB-1-7` | 225 A | — | Spare | — |

- `DP-N`: Square D I-Line, 800 A MLO, 35 kA.
  - `DP-N-1` to `DP-N-3`: 100 A, 4-#3 + #8.
  - `DP-N-4`: 125 A, 3-#1 + #6.
  - `DP-N-5` to `DP-N-7`: 175 A, 3-2/0 + #6.
  - `DP-N-8`: 70 A, 3-#4 + #8.
- `DP-IMG`: I-Line, 400 A bus, MLO, 35 kA.

## 6. Panel schedules

`HL-1` to `HL-3` and `ELP-1` are 480Y/277 V; `DP-EQ` is 480 V 3-wire; all others are 208Y/120 V.

| Panel | Main | AIC | Fed from | Used |
|---|---|---|---|---|
| `HL-1`, `HL-2`, `HL-3` | 100 A MLO | 35 kA | `DP-N-1` to `DP-N-3` | 22, 19, 18 of 30 |
| `LP-1W` (ASC normal) | 225 A | 10 kA | `T-1W` | 33 of 42 |
| `LP-1E` (imaging) | 400 A | 10 kA | `T-1E` | 29 of 42 |
| `LP-2A` (family medicine), `LP-2B` (orthopedics) | 225 A | 10 kA | `SM-2A` | 31, 36 of 42 |
| `LP-3A` (dental), `LP-3B` (dermatology) | 225 A | 10 kA | `SM-3A` | 34, 41 of 42 |
| `LP-H` (house) | 150 A | 10 kA | `T-H` | 27 of 42 |
| `CR-1W` (critical) | 150 A, 225 A bus | 10 kA | `T-CR` | 28 of 42 |
| `ELP-1` | 100 A MLO | 35 kA | `ATS-LS` | 21 of 30 |
| `LS-1`, `EQ-1` | 60 A, 100 A | 10 kA | `T-LS`, `T-EQ` | 7 of 18, 5 of 24 |
| `DP-EQ` | 400 A MLO | 35 kA | `ATS-EQ` | 6 breakers |

- `SM-2A` and `SM-3A` are enclosed 400 A breakers. Each feeds a wireway with 10-ft 4/0 taps (NEC 240.21(B)(1)) to two 225 A panel mains.
- Breakers below are 20 A 1P unless noted.

### CR-1W — critical branch (1-W08)

Red hospital-grade receptacles; insulated #12 EGC (NEC 517.13(B)).

- `PR-1`: 1 head wall, 3 ceiling boom, 5 side walls. `PR-3`: 7, 9, 11, same layout.
- 13, 15: pre-op. 17, 19, 21: recovery. 23: nurse station. 25: nurse call.
- 27: ASC medication refrigerator. 29, 31: vaccine refrigerators (family medicine 2-110).
- 33: `MGA-1`. 35: procedure lights. 37: critical task lighting.
- 2/4: `IPP-2` (60 A 2P). 6, 8, 10, 12: defibrillator charging, monitoring network switch, warmer, medication dispensing cabinet.
- Spares: 14, 39, 41. Spaces: 16–42 even. Peak load 71 A.
- The procedure rooms also have normal-power receptacles on `LP-1W` (NEC 517.19(A)).

### IPP-2 — PR-2 wet procedure location

- 10 kVA, 208 V primary (internal 60 A 2P breaker), 120 V ungrounded secondary.
- `LIM-2` is a Bender LIM2010. Conductors are orange and brown, striped (NEC 517.160(A)(5)).
- Circuits (20 A 2P): 1, 2 head wall; 3, 4 boom; 5, 6 side walls; 7 procedure light; 8 spare.

### LP-1W — ASC normal (1-W08)

- 1/3/5: steam sterilizer, 18 kW (70 A 3P). 7/9/11: washer-disinfector (30 A 3P). 13: tabletop sterilizer.
- 17, 19, 21: normal receptacles for `PR-1`, `PR-2` (GFCI) and `PR-3`. 23, 25, 27: pre-op, recovery, nurse station.
- 2/4/6: `AHU-2` humidifier (40 A 3P).
- The rest of odd 15–39 and even 8–18 are offices and support rooms. 41: spare. Spaces: 20–42 even. Peak load 124 A.

### LP-3B — dermatology (3-015)

Eaton Pow-R-Line. The panel label does not permit tandem breakers.

- 1, 3: reception. 5–11: exam rooms 3-112 to 3-128. 13, 15: procedure room 3-130, electrosurgical unit.
- 17–21: Mohs lab. 23: lab refrigerator. 25: autoclave. 27, 29: utility rooms, nurse workroom.
- 31: offices 3-150 and 3-152, double-lugged (OD-8). 33–41: break room, IT rack, copier, corridor.
- 2/4: laser no. 1, room 3-126 (dedicated 30 A 2P, 208 V). 6/8: UVB phototherapy booth (30 A 2P).
- 10–34 even: lights, laser-room receptacles and smoke evacuator, second exam-room circuits, Mohs exhaust, office loads.
- 36/38: water heater (20 A 2P).
- 40: labeled "Darkroom 3-136"; the room has been storage since 2022 and the load is not verified.
- 42: the only empty space.
- September 2026 recording (30 days): `LP-3B` peaks of 118, 131 and 104 A (phases A, B, C). `T-3A` secondary peak 228 A on phase B.

### LP-3A — dental (3-015)

- 1–15 odd: operatories 1–8. 21: panoramic/CBCT. 23, 25: autoclaves.
- 37/39/41: `DC-1` dental compressor and suction pump (30 A 3P), closet 3-245.
- 20/22: water heater (20 A 2P).
- The rest of odd 17–33, and even 2–16, 24 and 26, are receptacles, X-ray heads, IT, lab and break room.
- Spares: 18, 35. Spaces: 28–42 even.

### ELP-1, LS-1, EQ-1, HL-2

- `ELP-1` (277 V): 1–9 egress lighting; 11, 13 exit signs; 15 exterior egress lighting; 17 ASC egress lighting; 19 lighting for 1-010 and 1-012; 26/28/30 `T-LS` (25 A 3P).
- `LS-1`: 1 `FACP-1` (red, lock-on); 3 NAC power supplies; 5 `ELV-1` cab; 7 `GEN-1` enclosure lighting; 9 `ELV-1-DS` shunt trip; 11 door hardware; 13 spare.
- `EQ-1`: 1/3 `GEN-1` block heater, 5 kW (30 A 2P); 5 battery charger; 7 `AHU-2` controls; 9 spare.
- `HL-2` (277 V): 1, 3 corridors; 5–11 odd orthopedics; 2–12 even family medicine; 14 family medicine exam rooms 2-136 to 2-142 (dedicated neutral); 18 spare.

## 7. Transformers

Dry-type, 480 V delta – 208Y/120 V, 150 °C rise. Taps: two 2.5 % above and four below nominal; all on nominal. Secondary conductors are 10 ft or shorter (NEC 240.21(C)(2)); protection per NEC 450.3(B).

| ID | kVA, %Z | Primary FLA / OCPD | Secondary FLA / OCPD | 2026 peak |
|---|---|---|---|---|
| `T-1W` | 75, 4.6 | 90 A / `DP-N-4` 125 A | 208 A / `LP-1W` 225 A | 124 A |
| `T-1E` | 112.5, 5.1 | 135 A / `DP-N-5` 175 A | 312 A / `LP-1E` 400 A | 141 A |
| `T-2A` | 112.5, 5.1 | 135 A / `DP-N-6` 175 A | 312 A / `SM-2A` 400 A | 196 A |
| `T-3A` | 112.5, 5.1 | 135 A / `DP-N-7` 175 A | 312 A / `SM-3A` 400 A | 228 A (73 %) |
| `T-CR` | 45 (K-13), 3.9 | 54 A / `CRD-1` 70 A | 125 A / `CR-1W` 150 A | 71 A |
| `T-H` | 45, 3.9 | 54 A / `DP-N-8` 70 A | 125 A / `LP-H` 150 A | 58 A |
| `T-LS` | 15, 3.0 | 18 A / `ELP-1` 25 A | 42 A / `LS-1` 60 A | 17 A |
| `T-EQ` | 30, 3.4 | 36 A / `DP-EQ-5` 45 A | 83 A / `EQ-1` 100 A | 38 A |

- Secondary conductors and system bonding jumper / GEC:

  | Size | Secondary conductors | SBJ / GEC |
  |---|---|---|
  | 75 kVA | 4/0 | #2 |
  | 112.5 kVA | 2 × 3/0 | #2 |
  | 45 kVA | 1/0 | #6 |
  | 15 and 30 kVA | #6 and #3 | #8 |

- `CRD-1` is needed because the 150 A upstream devices would exceed 250 % of the `T-CR` primary FLA.
- Maximum secondary fault current: 6.1 kA.

## 8. Grounding & bonding

- Service:
  - Main bonding jumper is a bus in `MSB-1` section 1.
  - 3/0 Cu GEC to the water pipe within 5 ft of entry and to structural steel; #4 to the concrete-encased electrode.
  - Intersystem bonding termination at `MSB-1`.
  - Fall-of-potential test 2024-03-16: 2.4 Ω.
- Each transformer is a separately derived system: bonding jumper at the transformer, GEC exothermic-welded to structural steel.
- Ground-fault protection:
  - `MSB-1-M` 1000 A / 0.2 s (NEC 230.95), plus a second level on every feeder (NEC 517.17(B)).
  - None downstream of a transfer switch. `GEN-1` has GF alarm only.
  - Last tested 2024-03-17: passed.
- `GEN-1` is separately derived: neutral bonded in its output box, #2 GEC to two rods.
  - `ATS-LS` is 4-pole so the ground-fault sensors are not desensitized.
  - `ATS-CR` and `ATS-EQ` are 3-wire: their loads are delta-primary transformers and motors.
- Patient-care spaces:
  - EMT plus an insulated copper EGC to every receptacle, box and fixed equipment in the patient-care vicinity (NEC 517.13(A), 517.13(B)).
  - No isolated-ground receptacles (NEC 517.16).
  - `LP-1W` and `CR-1W` ground buses bonded with insulated #8 Cu (NEC 517.14).
  - Acceptance: receptacle ground ≤ 0.1 Ω to the panel bus.

## 9. Emergency, standby & life safety

Type 1 EES (NFPA 99, NEC 517). The life safety and critical branches run in dedicated EMT, independent of all other wiring (NEC 517.31(C)), and transfer within 10 s. The equipment branch is delayed.

### GEN-1

- Caterpillar C15, 500 kW / 625 kVA standby, 480Y/277 V, 752 A, in an outdoor enclosure in the east yard. NFPA 110 Level 1, Type 10.
- EMCP 4.2B controller with a lockable OFF/AUTO/RUN selector. Remote annunciator in 1-020; external emergency stop.
- Fuel: 48-hour sub-base tank, 1,800 gal ULSD (about 35 gal/h at full load), 92 % on 2026-09-09. Hour meter 487.3.
- Starting batteries 24 V (2024-10); charger on `EQ-1` circuit 5.
- Block heater: 5 kW, `EQ-1` 1/3, thermostat 38–49 °C. The low-coolant-temperature alarm (21 °C) is a cold-weather risk.
- Output breakers `GEN-1-CB1` 100 A, `GEN-1-CB2` 150 A, `GEN-1-CB3` 400 A: electronic, instantaneous OFF, 0.3 s short-time. Running and common alarm go to `FACP-1`.
- Monthly-test load is about 26 %, under the NFPA 110 30 % target; hence the annual load bank.

### Transfer switches

All three transfer switches are from the same manufacturer (ASCO 7000, open transition, non-bypass, 42 kA) and are serviced by Allied Power Systems under the facility's own contract. Kestrel may operate the test switches but must not adjust controller settings. Engine-start delay 1 s; cooldown 5 min.

| ATS | Normal / emergency | Transfer delay | Retransfer delay | Measured 2026-09-09 |
|---|---|---|---|---|
| `ATS-LS` 100 A 4P | `MSB-1-5` / `GEN-1-CB1` | 0 s | 15 min | 7.8 s |
| `ATS-CR` 150 A 3P | `MSB-1-4` / `GEN-1-CB2` | 0 s | 15 min | 8.1 s |
| `ATS-EQ` 400 A 3P | `MSB-1-3` / `GEN-1-CB3` | 12 s (about 20 s total) | 17 min | 19.8 s |

### Branches and FACP-1

- Life safety: egress lighting, exit signs, `FACP-1`, generator and ATS-room lighting, `ELV-1` cab, door hardware.
- Critical: `CR-1W`. The vaccine refrigerators alarm to the clinic managers' phones if the temperature rises above 8 °C.
- Equipment: `MV-1`, `AHU-2` (ASC ventilation), `CU-2`, `ELV-1`, generator accessories.
- `FACP-1`: Notifier NFS2-640 in 1-018, 24 h batteries.
  - Monitors sprinklers, duct smoke detectors and `GEN-1`.
  - Shuts down `AHU-2` and the RTUs, recalls `ELV-1`, shunt-trips `ELV-1-DS`.
  - Before de-energizing `LS-1`, `ELP-1` or `ATS-LS`: facilities puts the system on test with Sentinel, and Marcus Bell decides on a fire watch (R-EMERG-01).

### Monthly test

Second Wednesday at 06:00, run by the facilities manager and coordinated with the ASC so no procedures are scheduled. Kestrel attends quarterly (March, June, September, December) and runs the annual 4-hour load-bank test.

1. 72 h notice to the ASC, clinics, imaging and Sentinel.
2. 05:45: record fuel, coolant (≥ 38 °C), battery and alarms. Selector in AUTO.
3. Renee Ortiz confirms there are no patients. Each critical-branch transfer is an open-transition break of about 8 s.
4. "Transfer Test" `ATS-LS`, `ATS-CR`, then `ATS-EQ`. `ATS-LS` and `ATS-CR` must transfer within 10 s; `ATS-EQ` within 18–24 s.
5. Run at least 30 min. Log kW, voltage (470–490 V), frequency (59.8–60.2 Hz), oil pressure and temperatures.
6. Check `LIM-2`, the refrigerators, nurse call, `MGA-1`, `ELV-1`, `VFD-AHU2` and the `FACP-1` signal.
7. End the test. Confirm retransfer, cooldown, AUTO, and that `VFD-AHU2` is running.
8. Log in 1-012. Report failures within 1 h; call Allied for ATS faults (R-EMERG-01).

### Isolated power — IPP-2 / LIM-2

- `PR-2` is a designated wet procedure location (NEC 517.20).
- `LIM-2` alarm threshold: configured at 2.0 mA total hazard current, set by biomed as site policy (NFPA 99 allows 5.0 mA). Green SAFE; red HAZARD with an audible alarm, repeated at the nurse station. Non-latching.
- A LIM alarm means a device in the room is leaking current to ground, or one isolated conductor has faulted. Power stays on, but isolation is lost: a second fault could trip a breaker or shock someone.
- Response:
  - Silence the alarm and tell the charge nurse. Biomed must be informed.
  - Staff unplug devices one at a time, newest first; anesthesia handles life support. The device that clears the alarm is tagged out for biomed.
  - Kestrel is involved only if the alarm persists with everything unplugged, and only with `PR-2` empty (R-HEALTH-01).
- Never bypass `LIM-2` or ground an isolated conductor.
- Test: TEST must produce HAZARD and then return to SAFE. Biomed tests monthly.

## 10. Motors, drives & special systems

### MCC-1

Square D Model 6, 400 A, 480 V 3-wire, 42 kA, PH-1. Main `MCC-1-M` 400 A.

- Buckets 1A–4A: unit power for `RTU-1` (floor 1 east), `RTU-2` (floor 2), `RTU-3` (floor 3), `RTU-4` (corridors): 80, 100, 100 and 60 A. Gas heat.
- Buckets 1B–4B: supply-fan drives `VFD-1` 15 hp (21 A), `VFD-2` and `VFD-3` 20 hp (27 A), `VFD-4` 10 hp (14 A): 40, 50, 50 and 30 A.
- Bucket 5A: 60 A spare.

### VFDs

- `VFD-1` to `VFD-4` are beside `MCC-1`; `VFD-AHU2` (25 hp, 34 A) is in 1-014.
- ABB ACH580 drives with E-Clipse bypass and a lockable bypass disconnect. Bridgewater owns the parameters.
- Stored energy: the DC bus stays charged after the input opens. Wait 5 min (label), then measure UDC+ to UDC− and each to ground. Work only below 50 V DC.
- Bypass runs the fan across the line at full speed (duct over-pressure risk). Only with Bridgewater approval.
- Typical faults:
  - 3220 DC link undervoltage (sags, transfers);
  - 3130 input phase loss;
  - 2310 overcurrent;
  - 2330 earth leakage;
  - 3210 DC link overvoltage (fast deceleration);
  - 4210 IGBT overtemperature.

### MV-1 (1-016)

- Duplex medical-air compressors and duplex vacuum pumps (4 × 7.5 hp), one control panel with a main disconnect, fed from `DP-EQ-1`.
- The 240 gal air and 120 gal vacuum receivers bridge the 20 s `ATS-EQ` delay. Restart is automatic.
- `MGA-1` (ASC nurse station, remote module in 1-020) alarms on air pressure, vacuum, dew point, CO, lag pump and O2 reserve.
- Kestrel does electrical work only; Keystone handles the piping.

### CT-1 and other equipment

- `CT-1`: 480 V 3-phase, 135 kVA momentary.
  - Fed from `DP-IMG-1` through the 150 A disconnect `CTD-1` (Class J fuses). Scan- and control-room EPO buttons shunt-trip `CTD-1`.
  - Gantry cooling is downstream of `CTD-1`. Never de-energize `CT-1` without the imaging technologist completing the scanner shutdown procedure: console shutdown, then about 15 min of cooling run-down.
  - Only the OEM opens the cabinets.
- `XR-1`: fed through `XRD-1` (100 A).
- `ELV-1`: hydraulic, 40 hp (52 A), soft starter. `ELV-1-DS` is a 100 A fused shunt-trip switch.
- `AHU-2`: supply fan on `VFD-AHU2`; DX from `CU-2` (MCA 48 A, MOCP 60 A). The condensate drains to the 1-014 floor drain.
- Sterilizers: on `LP-1W`, so they drop during an outage. The ASC accepts this.
- `DC-1`: 208 V 3-phase, 30 A, `LP-3A` 37/39/41, local disconnect. Bleed the tank before mechanical work.

## 11. Lockout/tagout procedures

Every item:
- Personal lock and try-out (R-LOTO-01).
- Live-dead-live at the point of work, all phase-phase and phase-ground combinations (R-VERIFY-01).
- Photos (R-DOC-01).
- EES items: R-HEALTH-01 coordination and R-EMERG-01 notice.

**MSB-1**
- The `MSB-1-M` line side stays live when `MSB-1-M` is open.
- Full isolation: BFPUD opens and tags the `UT-1` primary (written clearance); padlock `MSB-1-M`; verify at the line lugs and bus.
- With only `MSB-1-M` locked, work is limited to the load side of the feeders, never section 1.
- The EES runs on `GEN-1` throughout (the ATSs block backfeed). Check fuel and have Allied on standby.
- `CT-1` is shut down first, and the ASC is closed.

**DP-N**
- Lock `MSB-1-1` (no backfeed). Verify at the `DP-N` lugs.
- Drops `HL-1` to `HL-3`, `LP-H` and all tenant normal panels. Egress lighting stays on.

**Tenant panels (for example `LP-3B`)**
- Lock at the panel main and the upstream `DP-N` breaker for the transformer (`DP-N-7`). Open `SM-3A`.
- Verify at the main's line lugs.
- `DP-N-7` also drops dental `LP-3A`.
- Other pairs: `LP-1W` / `DP-N-4`; `LP-1E` / `DP-N-5`; `LP-2A`, `LP-2B` / `DP-N-6`.

**CR-1W**
- Only under R-HEALTH-01 coordination: weekend, with written approval from Marcus Bell and Renee Ortiz. Never with `PR-1` to `PR-3`, pre-op or recovery occupied.
- Isolate both sources at `ATS-CR`: normal through `MSB-1-4` and emergency through the `GEN-1` output breaker `GEN-1-CB2`. Also lock `CRD-1` and the `CR-1W` main.
- Opening `MSB-1-4` starts `GEN-1` unloaded. Facilities and the Kestrel supervisor decide whether it keeps running or the selector goes to OFF with a fire watch.
- Verify at the `CR-1W` bus and the `CRD-1` load side.
- Also lost: `IPP-2`, nurse call, `MGA-1` (tell Keystone), and the refrigerators (tell the clinic managers).

**IPP-2**
- The charge nurse releases `PR-2`, and the room is empty.
- Lock `CR-1W` 2/4 and open the internal primary breaker.
- Verify the primary, then the secondary line-line and each line to ground (about 60 V to ground when live).
- Biomed retests `LIM-2` afterward.

**ATS-LS / ATS-CR / ATS-EQ**
- Before working on any transfer switch, set the generator control switch to OFF and lock it, so a utility blip cannot start the generator and backfeed.
- Then lock the normal feeder (`MSB-1-5`, `-4`, `-3`) and the emergency breaker (`GEN-1-CB1`, `-CB2`, `-CB3`).
- Verify the normal, emergency and load terminals.
- With the selector OFF, no branch has backup: R-EMERG-01 and a fire-watch decision.
- `ATS-LS` work removes egress lighting: temporary lights, `FACP-1` on test.
- Controller work belongs to Allied.

**GEN-1**
- Selector OFF and locked.
- Lock `GEN-1-CB1` to `-CB3`, the battery disconnect, and the building feeds `EQ-1` 1/3 and 5 and `LS-1` 7.
- Verify at the output terminals.

**MCC-1 / VFDs**
- Whole MCC: lock `MSB-1-2` and `MCC-1-M`.
- One drive (for example `VFD-3`): lock bucket 3B and the bypass disconnect, plus 3A to work inside `RTU-3`. Wait 5 min, then verify the DC bus is below 50 V DC.
- `VFD-AHU2`: lock `DP-EQ-2` and its bypass disconnect. With `AHU-2` off the ASC has no ventilation (R-HEALTH-01).

**CT-1**
- After the technologist's shutdown and cooling run-down, lock `CTD-1`. Add `DP-IMG-1` for work inside `CTD-1`.
- Sundays only.

**MV-1**
- ASC closed. Tell the charge nurse and Keystone; `MGA-1` will alarm.
- Lock `DP-EQ-1` and the panel disconnect. Keystone isolates the pneumatics.

## 12. Arc-flash & PPE

The arc-flash study was updated in 2024 (IEEE 1584-2018) for `MSB-1`, `DP-N`, `MCC-1`, `DP-IMG` and all three transfer switches (labels dated 2024-03). Working distance is 18 in. NFPA 70E-2024 categories: Cat 1 ≤ 4, Cat 2 ≤ 8, Cat 3 ≤ 25, Cat 4 ≤ 40 cal/cm².

| Equipment | cal/cm² | Boundary | Category | Label |
|---|---|---|---|---|
| `MSB-1` (distribution sections, `MSB-1-M` load side) | 21.6 | 9 ft | 3 | 2024-03 |
| `MSB-1` section 1 line side (cleared only by `UT-1` primary fuses) | 48.2 | 14 ft | DANGER: work de-energized only | 2024-03 |
| `DP-N` | 14.6 | 7 ft | 3 | 2024-03 |
| `MCC-1` | 11.4 | 6 ft | 3 | 2024-03 |
| `DP-IMG` | 5.4 | 3.8 ft | 2 | 2024-03 |
| `ATS-LS`, `ATS-CR`, `ATS-EQ` (governing case: `GEN-1` source) | 6.3 | 4.1 ft | 2 | 2024-03 |
| `LP-1W`, `LP-1E`, `LP-2A`, `LP-2B`, `LP-3A`, `LP-3B` | 1.4–3.1 | ≤ 2.7 ft | 1 | 2021-09, expired |
| `CR-1W` | 1.3 | 1.6 ft | 1 | 2021-09, expired |
| All other gear (HL panels, `LP-H`, `SM-2A`, `SM-3A`, EES panels, `IPP-2`, disconnects, `MV-1`, VFDs, `GEN-1` breakers) | — | — | — | 2021-09, expired |

- Tenant panels `LP-1W` to `LP-3B` and `CR-1W` still carry labels from the 2021 study, dated 2021-09. These are more than 5 years old, so treat them, like every 2021-09 label, as expired (R-PPE-01).
  - Do not open or test that equipment while energized.
  - Escalate (R-ESC-01).
- Shock: limited approach boundary 3.5 ft; restricted approach boundary 1 ft at 480 V.
- Thermography counts as diagnostic work: PPE per the label, no EEWP (R-EWP-01).
- Never open `MSB-1` section 1 energized.

## 13. Maintenance & test records

- **2024-03-16/17 outage (Kestrel):**
  - All `MSB-1` breakers within their curves on secondary injection.
  - Insulation resistance > 2 GΩ, except `MSB-1-2` phase B at 480 MΩ (acceptable).
  - Ground resistance 2.4 Ω.
  - GFP performance test (NEC 230.95(C) and 517.17(D)): `MSB-1-M` tripped at 1,010 A / 0.19 s; feeders selective.
- **2025-10-08 infrared scan** (section 1 not opened):
  - `MSB-1-6` load lug, phase B: +9 °C over A and C at 41 A (deferred).
  - `LP-3B` main lug, phase B: +6 °C.
- **2025-11-12:** Allied ATS preventive maintenance passed.
- **Quarterly tests** (transfer times `ATS-LS` / `ATS-CR` / `ATS-EQ`, then load):
  - 2026-03-11: 7.6 / 7.9 / 19.5 s; 129 kW.
  - 2026-06-10: 7.6 / 8.0 / 19.6 s; 131 kW.
  - 2026-09-09: 7.8 / 8.1 / 19.8 s; 133 kW. Battery 25.6 V at rest, 19.8 V while cranking.
- **2026-03:**
  - 236 ASC receptacles: polarity and ground ≤ 0.1 Ω all pass; 4 tension failures replaced.
  - `LIM-2` calibration: alarmed at 2.02 mA (pass).
  - `FACP-1` battery test passed.
- **2026-05-16 load bank:** 125 kW for 30 min, 250 kW for 30 min, 375 kW for 3 h. Voltage within ±1 %, 60.0 Hz, coolant maximum 88 °C: passed.
- **`VFD-3` motor insulation resistance:** 2.1 GΩ dry (2026-04-14); 1.8 MΩ after rain (2026-09-28): fail.
- **`LIM-2` monthly test:** passed 2026-09-30.
- **Next due:** IR scan 2026-10; attended test 2026-12-09; GFP and breaker tests 2027-03.

## 14. Known issues, deficiencies & history

### Open deficiencies

- **OD-1 (2026-09):** All 2021-09 arc-flash labels have expired. Kestrel's study-update proposal Q-2026-118 (sent 2026-08-20) has not been approved.
- **OD-2 (2026-09-21):** Water in EES room 1-012.
  - The `AHU-2` condensate trap clogged and the pan overflowed in 1-014. Water ran under the shared wall into 1-012, around the `ATS-EQ` and `DP-EQ` housekeeping pads (the pad tops stayed dry).
  - Bridgewater cleared the trap.
  - Still open: the conduit penetrations are unsealed, there is no secondary-pan float switch, and the `ATS-EQ` and `DP-EQ` interiors have not been inspected. Inspection needs a weekend with `GEN-1` locked OFF.
- **OD-3 (2026-03-02):** A roof leak at the `RTU-3` curb stained the top of `SM-3A` and its conduit entry (3-015).
  - The roof was resealed.
  - The interior has not been inspected; that needs a `DP-N-7` outage.
- **OD-4 (2026-02):** `VFD-3` trips on 2330 earth leakage after rain: five trips so far, and insulation reads 1.8 MΩ when wet. Suspect water at the `RTU-3` motor junction box.
  - On 2026-09-28 facilities ran it in bypass for 3 h without approval. Bypass is now prohibited.
  - The repair is not scheduled.
- **OD-5 (2025-11):** `VFD-AHU2` trips on 3220 at most `ATS-EQ` retransfers and is reset by hand. Enabling auto-restart needs Bridgewater.
- **OD-6 (2026-09-09):** `ATS-CR` retransferred 48 s late. Allied ticket A-77812; to be checked at the November preventive maintenance.
- **OD-7 (2026-03-14):** `MGA-1` is on the critical branch (`CR-1W` 33). NEC 517.32(C)(2) puts medical gas alarms on the life safety branch. Proposal Q-2026-061 (move it to `LS-1` 13) is pending.
- **OD-8 (2026-08-26):** `LP-3B` circuit 31 has two conductors on a breaker that is not listed for two conductors. The fix needs a space.
- **OD-9 (2026-08-26):** The load on `LP-3B` circuit 40 is unidentified.
- **OD-10 (2025-10-08):** The `MSB-1-6` lug hot spot has not been corrected.
- **OD-11 (2024-03):** `MSB-1-M` has no arc energy reduction. The owner deferred recommendation AF-24-03.

### Planned work

Dermatology plans to add a second laser unit (dedicated 30 A, 208 V circuit; 24 A nameplate) in Q4.
- `LP-3B` has only one spare space (42), and a 2-pole breaker needs two adjacent spaces.
- Capacity is adequate per the September recording: phase B goes from 131 A to 155 A of 225 A, and `T-3A` from 228 A to 252 A of 312 A.
- A written proposal is required (R-LOAD-01, R-CUST-01).

### History

- 2026-01-22: After the monthly test (moved from 01-14 by the ASC), `ATS-CR` failed to retransfer to normal and stayed on generator for about 2 hours until the controller was reset. Allied Power Systems replaced the retransfer timer on 2026-02-03.
- 2026-04-09: `LIM-2` in `PR-2` alarmed at a hazard current of 2.1 mA (threshold 2.0 mA). It was traced to a portable warming cabinet, which biomed removed.
- 2026-06-17: `GEN-1` showed a "low coolant temperature" alarm. The block heater had failed and was replaced. Watch for this alarm again in winter.
- 2026-08-05: Family medicine (2-110) reported flickering lights. Found a loose neutral on `HL-2` circuit 14 (277 V lighting) at the neutral bar and repaired it.
