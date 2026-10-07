import type { Problem } from "@electrical-hero/shared";

// Scripted stand-in for the LLM tutor. Each topic has one question and one
// follow-up that digs deeper when the first answer is wrong. Answers are
// checked against keyword patterns; the real tutor will grade free text.

export interface ScriptedQuestion {
  text: string;
  accept: RegExp[];
  explanation: string;
}

export interface ScriptedTopic extends ScriptedQuestion {
  topic: string;
  followUp: ScriptedQuestion;
}

export interface ScriptedProblem extends Problem {
  topics: ScriptedTopic[];
}

export const PROBLEMS: ScriptedProblem[] = [
  {
    id: "p-austin-kitchen-gfci",
    title: "GFCI protection for a remodeled kitchen",
    jobSiteId: "js-austin",
    location: "Mueller Lofts · Building C, Unit 4B kitchen",
    description:
      "The kitchen in Unit 4B is being remodeled. The owner added a refrigerator receptacle, two countertop receptacles and a disposal receptacle under the sink, all on existing 20 A circuits. The inspector comes Thursday. Decide what needs GFCI protection and how you'll provide it.",
    difficulty: "apprentice",
    ppe: ["Safety glasses", "Class 00 insulating gloves", "Hard hat", "Safety-toe boots"],
    tools: ["Non-contact voltage tester", "Multimeter", "GFCI receptacle tester", "Insulated screwdrivers"],
    references: [
      { article: "NEC 210.8(A)(6)", title: "GFCI protection — dwelling kitchens" },
      { article: "NEC 210.8", title: "GFCI devices must be readily accessible" },
    ],
    hazard: { tone: "warning", text: "Circuits stay energized until you open the breaker and verify with a tester." },
    points: 100,
    topics: [
      {
        topic: "Which receptacles need GFCI",
        text: "Under the 2023 NEC, which of the receptacles in this kitchen need GFCI protection?",
        accept: [/\ball\b/i, /\bevery\b/i, /\beach\b/i],
        explanation:
          "All of them. Since the 2020 NEC, 210.8(A)(6) covers every 125–250 V receptacle in a dwelling kitchen, not only the ones serving the countertop. The refrigerator and disposal receptacles are included.",
        followUp: {
          text: "The owner says the refrigerator receptacle is on its own dedicated circuit. Does it still need GFCI protection?",
          accept: [/\byes\b/i, /\bstill\b/i, /\bmust\b/i, /\brequire/i],
          explanation:
            "Yes. 210.8(A)(6) applies to receptacles in the kitchen regardless of what they serve or whether the circuit is dedicated. There is no exception for refrigerators in the 2023 NEC.",
        },
      },
      {
        topic: "Where to put the protection",
        text: "You don't want a GFCI receptacle behind the refrigerator. Where else can the protection come from?",
        accept: [/breaker/i, /upstream/i, /feed[- ]?through/i, /\bpanel\b/i],
        explanation:
          "Use a GFCI circuit breaker in the panel, or a feed-through GFCI receptacle upstream on the same circuit. 210.8 requires the GFCI device to be readily accessible, and a receptacle behind a refrigerator isn't.",
        followUp: {
          text: "If you use a feed-through GFCI receptacle, which terminals feed the downstream receptacles?",
          accept: [/\bload\b/i],
          explanation:
            "The LOAD terminals. LINE connects to the supply; anything wired to LOAD is protected. Swap them and the downstream receptacles lose protection.",
        },
      },
    ],
  },
  {
    id: "p-austin-working-space",
    title: "Working space in front of a new panel",
    jobSiteId: "js-austin",
    location: "Mueller Lofts · Building A, ground-floor mechanical room",
    description:
      "A new 120/240 V, 225 A panelboard is going on the block wall of the mechanical room. The plumber wants to put a water heater 30 inches in front of it, and the room's ceiling is 7 ft. Walk through the working clearances before anything gets set.",
    difficulty: "journeyman",
    ppe: ["Safety glasses", "Hard hat", "Safety-toe boots", "Arc-rated clothing (if panel is energized)"],
    tools: ["Tape measure", "Laser level", "Marking chalk"],
    references: [
      { article: "NEC 110.26(A)(1)", title: "Depth of working space" },
      { article: "NEC 110.26(A)(2)", title: "Width of working space" },
      { article: "NEC 110.26(A)(3)", title: "Height of working space" },
    ],
    points: 150,
    topics: [
      {
        topic: "Depth of the working space",
        text: "This panel is 120/240 V with grounded block wall across from it (Condition 2). What's the minimum depth of the working space?",
        accept: [/\b3\s*(ft|feet|foot|')/i, /\b36\b/, /three feet/i, /900\s*mm/i],
        explanation:
          "For 0–150 V to ground, Table 110.26(A)(1) requires 3 ft (900 mm) for Condition 1, 2 and 3 alike. A 120/240 V system is 120 V to ground, so 3 ft it is.",
        followUp: {
          text: "The plumber's water heater would sit 30 inches in front of the panel. Is that compliant?",
          accept: [/\bno\b/i, /\bnot\b/i, /violat/i, /too close/i],
          explanation:
            "No. 30 inches is short of the 36-inch minimum depth. The water heater has to move, and the space must stay clear — 110.26(B) prohibits using it for storage.",
        },
      },
      {
        topic: "Width and height",
        text: "What's the minimum width of the working space in front of the panel?",
        accept: [/\b30\b/, /thirty/i, /2\.5\s*(ft|feet)/i],
        explanation:
          "30 inches wide or the width of the equipment, whichever is greater (110.26(A)(2)). The space doesn't have to be centered on the panel, and the door must open at least 90°.",
        followUp: {
          text: "What's the minimum headroom of the working space?",
          accept: [/6\.5/, /6½/, /6 1\/2/, /6\s*(ft|feet|')\s*6/i, /\b78\b/, /six and a half/i, /2\.0\s*m/i],
          explanation:
            "6½ ft (2.0 m) or the height of the equipment, whichever is greater (110.26(A)(3)). The 7 ft ceiling works.",
        },
      },
    ],
  },
  {
    id: "p-denver-box-fill",
    title: "Box fill for a crowded device box",
    jobSiteId: "js-denver",
    location: "RiNo Commons · Level 2, corridor 2B",
    description:
      "A 4 in. square × 1½ in. deep box (21.0 in³) with a single-gang mud ring holds a duplex receptacle. Two 12 AWG cables come in (each with a hot, a neutral and a ground) plus one 14 AWG switch loop. The apprentice says it fits. Check the math before the drywall goes up.",
    difficulty: "journeyman",
    ppe: ["Safety glasses", "Hard hat", "Safety-toe boots", "Cut-resistant gloves"],
    tools: ["Wire strippers", "Lineman's pliers", "Calculator"],
    references: [
      { article: "NEC 314.16(B)", title: "Box fill calculations" },
      { article: "NEC Table 314.16(B)", title: "Volume allowance per conductor" },
    ],
    points: 150,
    topics: [
      {
        topic: "Volume per conductor",
        text: "How many cubic inches does each 12 AWG conductor count for?",
        accept: [/2\.25/, /2 1\/4/, /2¼/],
        explanation: "Table 314.16(B) gives 2.25 in³ for each 12 AWG conductor.",
        followUp: {
          text: "And how much for each 14 AWG conductor?",
          accept: [/\b2(\.0+)?\b/, /\btwo\b/i],
          explanation: "2.00 in³ for each 14 AWG conductor (Table 314.16(B)). Every size step adds a quarter cubic inch.",
        },
      },
      {
        topic: "Devices and grounds",
        text: "How many conductor allowances does the duplex receptacle count for?",
        accept: [/\b2\b/, /\btwo\b/i, /double/i],
        explanation:
          "Two, based on the largest conductor connected to it (314.16(B)(4)). Here that's 2 × 2.25 = 4.5 in³.",
        followUp: {
          text: "All the equipment grounding conductors together count as how many allowances?",
          accept: [/\b1\b/, /\bone\b/i, /single/i],
          explanation:
            "One, based on the largest grounding conductor (314.16(B)(5)). A fourth or more EGCs add a quarter allowance each, but that doesn't apply here.",
        },
      },
    ],
  },
  {
    id: "p-denver-continuous-load",
    title: "Sizing a continuous lighting circuit",
    jobSiteId: "js-denver",
    location: "RiNo Commons · Ground-floor retail shell, suite 104",
    description:
      "The tenant's lighting runs 16 A, 7 a.m. to 9 p.m. every day. The circuit is copper THHN in EMT, and the breaker and panel terminations are rated 60 °C. Size the conductor and the breaker.",
    difficulty: "journeyman",
    ppe: ["Safety glasses", "Hard hat", "Safety-toe boots", "Arc-rated face shield (when terminating in a live panel)"],
    tools: ["Clamp meter", "Torque screwdriver", "Fish tape"],
    references: [
      { article: "NEC 210.19(A)(1)", title: "Branch-circuit conductor ampacity — continuous loads" },
      { article: "NEC 210.20(A)", title: "Overcurrent protection — continuous loads" },
      { article: "NEC 240.4(D)", title: "Small-conductor overcurrent limits" },
    ],
    hazard: {
      tone: "danger",
      text: "Never land conductors in a live panel without PPE rated for the arc-flash boundary.",
    },
    points: 150,
    topics: [
      {
        topic: "Continuous load factor",
        text: "This load runs for more than 3 hours. What percentage of it do you size the conductor and breaker for?",
        accept: [/125/],
        explanation:
          "125%. A load that runs 3 hours or more is continuous (Article 100), so 210.19(A)(1) and 210.20(A) size the conductor and the breaker at 125% of it.",
        followUp: {
          text: "So what's the minimum ampacity for this 16 A load?",
          accept: [/\b20\b/],
          explanation: "16 A × 1.25 = 20 A. The conductor and the breaker both need to be rated at least 20 A.",
        },
      },
      {
        topic: "Choosing the conductor",
        text: "With 60 °C terminations, what's the smallest copper conductor you can use?",
        accept: [/\b12\b/],
        explanation:
          "12 AWG copper. Its 60 °C ampacity in Table 310.16 is 20 A, and 240.4(D) limits 12 AWG copper to a 20 A breaker anyway.",
        followUp: {
          text: "14 AWG THHN is rated 25 A in the 90 °C column. Why can't you use it here?",
          accept: [/240\.4/, /\b15\b/, /terminat/i, /small conductor/i, /60/],
          explanation:
            "240.4(D)(3) limits 14 AWG copper to a 15 A breaker, and the 60 °C terminations cap it at 15 A too. The 90 °C rating is only for ampacity adjustment, not for the final rating.",
        },
      },
    ],
  },
  {
    id: "p-tampa-pool-bonding",
    title: "Equipotential bonding for a new pool",
    jobSiteId: "js-tampa",
    location: "Harbour Isles · Clubhouse pool deck",
    description:
      "The shotcrete crew pours the pool shell Monday. Before they do, you need to sign off on the equipotential bonding: the rebar, the perimeter surface, the ladder anchors and the pump motor. Florida is still on the 2020 NEC.",
    difficulty: "master",
    ppe: ["Safety glasses", "Hard hat", "Safety-toe boots", "Work gloves", "Sun protection"],
    tools: ["Tape measure", "Bonding lugs and listed clamps", "Torque wrench", "Low-resistance ohmmeter"],
    references: [
      { article: "NEC 680.26(B)", title: "Bonded parts" },
      { article: "NEC 680.26(B)(2)", title: "Perimeter surfaces" },
    ],
    hazard: {
      tone: "danger",
      text: "Water and electricity: any energized pool equipment must be locked out before you touch bonding connections.",
    },
    points: 200,
    topics: [
      {
        topic: "Bonding conductor size",
        text: "What's the minimum size of the bonding conductor for the equipotential bonding grid?",
        accept: [/\b8\b/, /\beight\b/i],
        explanation:
          "8 AWG solid copper, insulated, covered or bare (680.26(B)). It connects the parts of the grid; it isn't sized from the circuit.",
        followUp: {
          text: "Does that bonding conductor have to run back to the panel or the grounding electrode?",
          accept: [/\bno\b/i, /not required/i, /doesn'?t/i, /does not/i],
          explanation:
            "No. 680.26(B) says the bonding conductor isn't required to extend to the panelboard, service equipment or grounding electrode. Its job is to keep everything at the same potential, not to clear faults.",
        },
      },
      {
        topic: "Perimeter surfaces",
        text: "How far out from the inside walls of the pool must the perimeter surface be bonded?",
        accept: [/\b3\s*(ft|feet|foot|')/i, /\b36\b/, /three/i, /1\s*m/i],
        explanation:
          "3 ft (1 m) horizontally from the inside walls of the pool (680.26(B)(2)), including unpaved surfaces and other walking surfaces.",
        followUp: {
          text: "Name one metal part, besides the rebar and the perimeter, that must be bonded.",
          accept: [/ladder/i, /rail/i, /pump/i, /motor/i, /fence/i, /light/i, /diving/i, /fitting/i, /heater/i],
          explanation:
            "Metal ladders and handrails, pump motors, metal fittings over 4 in., underwater light forming shells, heaters and metal fences within 5 ft all get bonded (680.26(B)(3)–(7)).",
        },
      },
    ],
  },
  {
    id: "p-tampa-patio-receptacle",
    title: "Outdoor receptacle on a condo patio",
    jobSiteId: "js-tampa",
    location: "Harbour Isles · Tower 2, unit 1203 patio",
    description:
      "The owner of unit 1203 wants a receptacle on the open patio for a grill and string lights. The patio has no roof and gets hit by rain. Choose the receptacle, the cover and the protection.",
    difficulty: "apprentice",
    ppe: ["Safety glasses", "Class 00 insulating gloves", "Fall protection harness (balcony work)"],
    tools: ["Non-contact voltage tester", "GFCI receptacle tester", "Drill with masonry bit", "Silicone sealant"],
    references: [
      { article: "NEC 406.9(B)(1)", title: "Receptacles in wet locations" },
      { article: "NEC 210.8(A)(3)", title: "GFCI protection — outdoors" },
      { article: "NEC 210.52(E)", title: "Outdoor receptacle outlets" },
    ],
    hazard: { tone: "warning", text: "Working on an open balcony: tie off before you lean over the railing." },
    points: 100,
    topics: [
      {
        topic: "Wet-location cover",
        text: "The patio is a wet location. What kind of cover does a 15 or 20 A receptacle need there?",
        accept: [/in[- ]?use/i, /bubble/i, /extra[- ]?duty/i, /while in use/i],
        explanation:
          "An in-use (\"bubble\") cover, listed extra-duty. 406.9(B)(1) requires the enclosure to be weatherproof whether or not a plug is inserted.",
        followUp: {
          text: "What must the receptacle itself be listed as?",
          accept: [/weather/i, /\bwr\b/i, /tamper/i, /\btr\b/i],
          explanation:
            "Weather-resistant (marked WR) per 406.9(B)(1), and tamper-resistant (TR) because it's in a dwelling unit (406.12).",
        },
      },
      {
        topic: "Protection and height",
        text: "Does this receptacle need GFCI protection?",
        accept: [/\byes\b/i, /requir/i, /\bmust\b/i, /\bneeds?\b/i],
        explanation: "Yes. 210.8(A)(3) requires GFCI protection for dwelling-unit receptacles outdoors.",
        followUp: {
          text: "For the required balcony receptacle, how high above the balcony floor can it be at most?",
          accept: [/6\.5/, /6½/, /6 1\/2/, /\b78\b/, /six and a half/i, /2\.0\s*m/i],
          explanation:
            "Not more than 6½ ft (2.0 m) above the balcony walking surface (210.52(E)(3)), so it's reachable without a ladder.",
        },
      },
    ],
  },
];
