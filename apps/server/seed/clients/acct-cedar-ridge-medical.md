# Cedar Ridge Medical Pavilion — Site File

Account `acct-cedar-ridge-medical` · Kestrel customer since 2021 · Service agreement: monthly generator and transfer-switch test attendance (quarterly on site), annual load-bank test, 24/7 on-call.

## Overview & access

- 3-storey medical office building, about 96,000 sq ft, built 2015.
- Tenants:
  - Floor 1 west: Cedar Ridge Ambulatory Surgery Center (ASC), with procedure rooms `PR-1` to `PR-3`, pre-op and recovery.
  - Floor 1 east: Pinewood Imaging (X-ray, CT).
  - Floors 2–3: physician clinics (family medicine 2-110, orthopedics 2-200, dermatology 3-110, dental 3-210).
- Site contact: Marcus Bell, Facilities Manager, 555-0167.
- ASC clinical lead: Renee Ortiz RN, charge nurse, 555-0168. Her approval is required before anyone enters the ASC.
- Check in at the facilities office 1-020. Main Electrical Room 1-010 is on the ground floor, off the service corridor.
- ASC procedures run 07:00–15:00 on weekdays. Shutdowns that affect clinical areas happen only on weekends, after written approval from both the facilities manager and the ASC clinical lead.
- Any ceiling access inside the ASC needs an infection-control (ICRA) permit from facilities, plus shoe covers and dust containment.

## Service entrance

- Utility: 1500 kVA pad-mount transformer UT-1 (utility-owned), east yard. Secondary is 480Y/277V, 3-phase, 4-wire.
- Main switchboard `MSB-1`: 2000 A, 480Y/277V, 50 kA interrupting rating, in room 1-010. Main breaker `MSB-1-M` is a 2000 A electronic-trip (LSIG) breaker with ground-fault protection set at 1000 A / 0.2 s.

## Distribution

### MSB-1 feeders

| Breaker | Rating | Feeds |
|---|---|---|
| MSB-1-1 | 800 A | Normal distribution panel `DP-N` (480 V): lighting panels `HL-1` to `HL-3` and tenant transformers |
| MSB-1-2 | 400 A | `MCC-1`: rooftop units `RTU-1` to `RTU-4` and supply fans on VFDs |
| MSB-1-3 | 400 A | Normal side of `ATS-EQ` |
| MSB-1-4 | 150 A | Normal side of `ATS-CR` |
| MSB-1-5 | 100 A | Normal side of `ATS-LS` |
| MSB-1-6 | 225 A | Imaging distribution panel `DP-IMG` (feeds CT scanner `CT-1` through disconnect `CTD-1`) |
| MSB-1-7 | 225 A | Spare |

### Tenant (normal) panels, all 208Y/120V

- `T-1W` (75 kVA) feeds `LP-1W`: ASC non-essential loads (offices, break room, sterilizer room general receptacles).
- `T-1E` (112.5 kVA) feeds `LP-1E`: Pinewood Imaging general loads (not the CT).
- `T-2A` (112.5 kVA) feeds `LP-2A` (family medicine, 42 spaces, 31 used) and `LP-2B` (orthopedics, 42 spaces, 36 used).
- `T-3A` (112.5 kVA) feeds `LP-3A` (dental, 42 spaces, 34 used) and `LP-3B` (dermatology, 42 spaces, 41 used, 1 spare space).
- Dental compressor and suction pump `DC-1` (208 V, 3-phase, 30 A) is on `LP-3A`, circuits 37/39/41.

## Essential electrical system (EES)

- `GEN-1`: 500 kW diesel in an outdoor enclosure in the east yard, with a 48-hour sub-base tank. It has a block heater, and a low-coolant-temperature alarm in cold weather.
- `ATS-LS` (100 A, life safety branch, transfers in 10 s or less): egress lighting panel `ELP-1`, exit signs, fire alarm control panel `FACP-1`, and the generator-room lighting.
- `ATS-CR` (150 A, critical branch, transfers in 10 s or less): via `T-CR` (45 kVA) to critical panel `CR-1W`. It serves:
  - the red receptacles in `PR-1` to `PR-3`, pre-op and recovery;
  - nurse call;
  - the medication and vaccine refrigerators, with temperature alarms;
  - the medical-gas alarm panel `MGA-1`.
- `ATS-EQ` (400 A, equipment branch, delayed transfer of about 20 s): medical air and vacuum pumps `MV-1`, `AHU-2` (serves the ASC), and elevator `ELV-1`.
- Procedure room `PR-2` is a designated wet procedure location. It has isolated power panel `IPP-2` (fed from `CR-1W`) with a line isolation monitor `LIM-2`. A LIM alarm means a device in the room is leaking current to ground. Biomed must be informed.
- Monthly test: second Wednesday at 06:00, run by the facilities manager. It is coordinated with the ASC so no procedures are scheduled. Kestrel attends quarterly and runs the annual 4-hour load-bank test.
- All three transfer switches are from the same manufacturer and serviced by Allied Power Systems under the facility's own contract. Kestrel may operate the test switches but must not adjust controller settings.

## Special equipment

- CT scanner `CT-1` (480 V, 3-phase, 150 A disconnect `CTD-1`): never de-energize it without the imaging technologist completing the scanner shutdown procedure. The gantry cooling must run down first.
- Sterilizers in the ASC are on `LP-1W`, so they drop during an outage. The ASC accepts this.
- The vaccine refrigerators alarm to the clinic managers' phones if the temperature rises above 8 °C.

## Known issues & service history

- 2026-01-22: After the monthly test, `ATS-CR` failed to retransfer to normal and stayed on generator for about 2 hours until the controller was reset. Allied Power Systems replaced the retransfer timer on 2026-02-03.
- 2026-04-09: `LIM-2` in `PR-2` alarmed at a hazard current of 2.1 mA. It was traced to a portable warming cabinet, which biomed removed.
- 2026-06-17: `GEN-1` showed a "low coolant temperature" alarm. The block heater had failed and was replaced. Watch for this alarm again in winter.
- 2026-08-05: Family medicine (2-110) reported flickering lights. Found a loose neutral on `HL-2` circuit 14 (277 V lighting) and repaired it.
- Dermatology plans to add a second laser unit (dedicated 30 A, 208 V circuit) in Q4. `LP-3B` has only one spare space.

## Safety notes

- The arc-flash study was updated in 2024 for `MSB-1`, `DP-N`, `MCC-1`, `DP-IMG` and all three transfer switches (labels dated 2024-03):
  - `MSB-1`: 21.6 cal/cm², category 3, boundary 9 ft.
  - Transfer switches: 6.3 cal/cm², category 2.
- Tenant panels `LP-1W` to `LP-3B` and `CR-1W` still carry labels from the 2021 study, dated 2021-09. These are more than 5 years old, so treat them as expired (R-PPE-01).
- Lockout points:
  - tenant panels: at the panel main and the upstream `DP-N` breaker for the transformer;
  - `CR-1W`: at `ATS-CR`. Both sources must be isolated (normal through `MSB-1-4`, emergency through the `GEN-1` output breaker), and only under R-HEALTH-01 coordination.
- `GEN-1` remote start: before working on any transfer switch, set the generator control switch to OFF and lock it, so a utility blip cannot start the generator and backfeed.
