/**
 * ISIDION reference dataset.
 * Values on each analog dimension are normalised to 0–1 on a shared scale where
 * the Moon and Mars are also placed, so Earth sites can be compared directly.
 */

export type BodyId = "mars" | "moon";
export type Confidence = "high" | "medium" | "low";

export type DimKey =
  | "aridity"
  | "cold"
  | "thermal"
  | "radiation"
  | "pressure"
  | "oxidants"
  | "aqueous"
  | "basalt"
  | "impact"
  | "ice"
  | "sterility"
  | "isolation";

export type DimGroup = "climate" | "chemistry" | "geology" | "operations";

export interface Dimension {
  key: DimKey;
  label: string;
  short: string;
  group: DimGroup;
  description: string;
  scale: string;
}

export const DIMENSIONS: Dimension[] = [
  { key: "aridity", label: "Hyperaridity", short: "ARD", group: "climate", description: "Absence of liquid water and precipitation at the surface.", scale: "0 = humid / wet · 1 = no liquid precipitation" },
  { key: "cold", label: "Cold regime", short: "CLD", group: "climate", description: "Mean annual surface temperature, mapped from +30 °C (0) to −70 °C (1).", scale: "linear in °C" },
  { key: "thermal", label: "Thermal cycling", short: "THM", group: "climate", description: "Amplitude of day/night temperature swings.", scale: "0 = <5 °C swing · 1 = ~300 °C swing (lunar)" },
  { key: "radiation", label: "UV & radiation", short: "RAD", group: "climate", description: "Surface ultraviolet and ionising radiation exposure.", scale: "0 = shielded · 1 = unshielded cosmic & solar" },
  { key: "pressure", label: "Low pressure", short: "PRS", group: "climate", description: "Atmospheric thinness relative to sea-level Earth (1013 hPa).", scale: "1 − P/1013 hPa" },
  { key: "oxidants", label: "Oxidant chemistry", short: "OXD", group: "chemistry", description: "Presence of perchlorates, nitrates and reactive oxidising soils.", scale: "0 = reducing / absent · 1 = Mars-like oxidant load" },
  { key: "aqueous", label: "Aqueous mineralogy", short: "AQU", group: "chemistry", description: "Sulfates, clays, iron oxides and other water-formed minerals.", scale: "0 = none · 1 = Meridiani-style sulfate/hematite" },
  { key: "basalt", label: "Basaltic regolith", short: "BAS", group: "geology", description: "Volcanic, basaltic or palagonitic surface materials.", scale: "0 = non-volcanic · 1 = basalt-dominated" },
  { key: "impact", label: "Impact geology", short: "IMP", group: "geology", description: "Craters, shocked rock, breccias and impact-generated terrain.", scale: "0 = none · 1 = impact-dominated landscape" },
  { key: "ice", label: "Ground ice", short: "ICE", group: "geology", description: "Permafrost, ice-cemented ground and periglacial landforms.", scale: "0 = none · 1 = ice-rich subsurface" },
  { key: "sterility", label: "Low biomass", short: "BIO", group: "chemistry", description: "How close the surface is to lifeless (inverse of biomass).", scale: "0 = abundant life · 1 = sterile" },
  { key: "isolation", label: "Operational isolation", short: "ISO", group: "operations", description: "Remoteness, logistics constraints and communication isolation.", scale: "0 = urban access · 1 = deep-space isolation" },
];

export const DIM_GROUP_LABEL: Record<DimGroup, string> = {
  climate: "Climate & exposure",
  chemistry: "Chemistry & life",
  geology: "Geology & terrain",
  operations: "Operations",
};

export interface PhysicalParams {
  pressureHPa: number;
  meanTempC: number;
  diurnalRangeC: number;
  precipMm: number;
  gravityG: number;
  radiationMSvDay: number;
}

export interface Body {
  id: BodyId;
  name: string;
  profile: Record<DimKey, number>;
  physical: PhysicalParams;
  notes: string;
}

export const BODIES: Record<BodyId, Body> = {
  mars: {
    id: "mars",
    name: "Mars",
    profile: { aridity: 1, cold: 0.93, thermal: 0.7, radiation: 0.85, pressure: 0.99, oxidants: 0.9, aqueous: 0.7, basalt: 0.85, impact: 0.7, ice: 0.8, sterility: 1, isolation: 1 },
    physical: { pressureHPa: 6.1, meanTempC: -63, diurnalRangeC: 80, precipMm: 0, gravityG: 0.38, radiationMSvDay: 0.64 },
    notes: "Thin CO₂ atmosphere, perchlorate-bearing basaltic regolith (Phoenix, 2008), sulfates and hematite (Opportunity, 2004), mid-latitude ground ice.",
  },
  moon: {
    id: "moon",
    name: "Moon",
    profile: { aridity: 1, cold: 0.53, thermal: 1, radiation: 1, pressure: 1, oxidants: 0.05, aqueous: 0.05, basalt: 0.75, impact: 1, ice: 0.3, sterility: 1, isolation: 1 },
    physical: { pressureHPa: 3e-12, meanTempC: -23, diurnalRangeC: 300, precipMm: 0, gravityG: 0.165, radiationMSvDay: 1.37 },
    notes: "Hard vacuum, anorthositic highlands and basaltic maria, impact-gardened regolith, water ice confined to permanently shadowed polar craters.",
  },
};

export type MissionId = "astrobiology" | "isru" | "human-ops" | "rover" | "impact" | "balanced";

export interface MissionProfile {
  id: MissionId;
  name: string;
  tagline: string;
  weights: Record<DimKey, number>;
}

const w = (p: Partial<Record<DimKey, number>>, base = 0.5): Record<DimKey, number> =>
  Object.fromEntries(DIMENSIONS.map((d) => [d.key, p[d.key] ?? base])) as Record<DimKey, number>;

export const MISSIONS: MissionProfile[] = [
  { id: "balanced", name: "Balanced survey", tagline: "Every dimension counts equally.", weights: w({}, 1) },
  { id: "astrobiology", name: "Astrobiology", tagline: "Biosignature detection & habitability limits.", weights: w({ aridity: 3, oxidants: 3, sterility: 3, aqueous: 3, radiation: 2, ice: 2, cold: 1 }) },
  { id: "isru", name: "ISRU & regolith", tagline: "Extracting water, oxygen and building material.", weights: w({ basalt: 3, ice: 3, impact: 1.5, thermal: 1, pressure: 1, aqueous: 1 }) },
  { id: "human-ops", name: "Human operations", tagline: "Crewed habitats, EVA and mission control.", weights: w({ isolation: 3, cold: 2, thermal: 1.5, impact: 1.5, basalt: 1, ice: 1, pressure: 1 }) },
  { id: "rover", name: "Rover & instruments", tagline: "Mobility, drilling and payload field tests.", weights: w({ aridity: 2, basalt: 2, impact: 2, thermal: 2, radiation: 1.5, oxidants: 1.5, ice: 1 }) },
  { id: "impact", name: "Impact geology", tagline: "Crater processes and shocked materials.", weights: w({ impact: 3, basalt: 2, aqueous: 1.5, ice: 1 }) },
];

export interface DimValue {
  v: number;
  c: Confidence;
  note: string;
}

export interface Limitation {
  severity: "major" | "moderate" | "minor";
  text: string;
}

export interface Site {
  id: string;
  code: string;
  name: string;
  region: string;
  country: string;
  lat: number;
  lon: number;
  elevationM: number;
  primaryAnalog: BodyId | "both";
  headline: string;
  summary: string;
  physical: PhysicalParams;
  physicalConfidence: Confidence;
  dims: Record<DimKey, DimValue>;
  history: { year: string; event: string }[];
  missions: Record<Exclude<MissionId, "balanced">, string>;
  limitations: Limitation[];
  references: string[];
}

export const SITES: Site[] = [
  {
    id: "atacama",
    code: "ISD-ATA-01",
    name: "Atacama Desert · Yungay",
    region: "Antofagasta Region",
    country: "Chile",
    lat: -24.1,
    lon: -70.02,
    elevationM: 1000,
    primaryAnalog: "mars",
    headline: "The driest non-polar place on Earth — Mars-like oxidising soils with almost no organics.",
    summary:
      "The Yungay core of the Atacama receives a few millimetres of rain per decade. Its soils contain perchlorates, nitrates and sulfates, carry extremely low microbial counts, and reproduced the puzzling Viking lander results in laboratory tests. It is the reference site for testing life-detection instruments and drills destined for Mars.",
    physical: { pressureHPa: 900, meanTempC: 16.5, diurnalRangeC: 25, precipMm: 1, gravityG: 1, radiationMSvDay: 0.008 },
    physicalConfidence: "high",
    dims: {
      aridity: { v: 0.99, c: "high", note: "≈1 mm/yr; multi-year rainless periods measured at Yungay station." },
      cold: { v: 0.14, c: "high", note: "Mean annual ≈16.5 °C — far warmer than Mars." },
      thermal: { v: 0.25, c: "high", note: "Daily swings of ~25 °C under clear skies." },
      radiation: { v: 0.6, c: "medium", note: "Among the highest surface UV on Earth, but ozone-shielded from UV-C." },
      pressure: { v: 0.11, c: "high", note: "≈900 hPa at ~1,000 m elevation." },
      oxidants: { v: 0.9, c: "high", note: "Perchlorate, nitrate and oxidising soils (Navarro-González 2003)." },
      aqueous: { v: 0.5, c: "medium", note: "Sulfate and nitrate evaporites; no Meridiani-style jarosite beds." },
      basalt: { v: 0.3, c: "medium", note: "Mixed alluvial and andesitic material, not basalt-dominated." },
      impact: { v: 0.1, c: "high", note: "Small strewn fields only; no major exposed impact structure." },
      ice: { v: 0, c: "high", note: "No ground ice." },
      sterility: { v: 0.9, c: "medium", note: "Very low but non-zero culturable microbes in the hyperarid core." },
      isolation: { v: 0.5, c: "medium", note: "Remote field camps, but road access from Antofagasta." },
    },
    history: [
      { year: "2003", event: "Navarro-González et al. publish ‘Mars-like soils in the Atacama Desert’ in Science." },
      { year: "2003–05", event: "Life in the Atacama (LITA) project tests the Zoë autonomous rover." },
      { year: "2016–19", event: "NASA ARADS campaigns trial rover-mounted drilling for biosignatures." },
    ],
    missions: {
      astrobiology: "Best-in-class for validating life-detection limits in oxidising, organic-poor soils.",
      isru: "Limited value — no ice and little basalt; useful only for dust and abrasion trials.",
      "human-ops": "Good for desert logistics drills; too accessible to simulate crew isolation.",
      rover: "Excellent for drill, sample-handling and autonomy tests on Mars-like terrain.",
      impact: "Weak — lacks well-preserved large impact structures.",
    },
    limitations: [
      { severity: "major", text: "Atmosphere is ~150× denser than Mars; no low-pressure effects on volatiles or instruments." },
      { severity: "moderate", text: "Coastal fog (camanchaca) and rare rain events support microbial life absent on Mars." },
      { severity: "minor", text: "Surface UV is high for Earth but still filtered of the UV-C reaching Mars." },
    ],
    references: [
      "Navarro-González R. et al. (2003) Science 302, 1018–1021.",
      "McKay C.P. et al. (2003) Astrobiology 3, 393–406.",
      "Glass B. et al. (2020) ARADS field campaign summary, NASA Ames.",
    ],
  },
  {
    id: "dry-valleys",
    code: "ISD-MDV-02",
    name: "McMurdo Dry Valleys",
    region: "Victoria Land",
    country: "Antarctica",
    lat: -77.52,
    lon: 161.67,
    elevationM: 100,
    primaryAnalog: "mars",
    headline: "Ice-cemented permafrost and polygon terrain under the coldest, driest winds on Earth.",
    summary:
      "The largest ice-free region of Antarctica combines sub-zero temperatures, extreme dryness, katabatic winds and natural perchlorate. Its upper valleys contain dry and ice-cemented permafrost with polygonal ground strikingly similar to the Phoenix landing site.",
    physical: { pressureHPa: 980, meanTempC: -20, diurnalRangeC: 10, precipMm: 30, gravityG: 1, radiationMSvDay: 0.007 },
    physicalConfidence: "high",
    dims: {
      aridity: { v: 0.93, c: "high", note: "<50 mm water-equivalent per year, mostly as snow that sublimates." },
      cold: { v: 0.5, c: "high", note: "Mean annual ≈ −20 °C (valley floors); colder at altitude." },
      thermal: { v: 0.2, c: "medium", note: "Small daily swings; strong seasonal cycle with polar day/night." },
      radiation: { v: 0.45, c: "medium", note: "Springtime ozone depletion raises UV; still atmosphere-shielded." },
      pressure: { v: 0.03, c: "high", note: "≈980 hPa on valley floors." },
      oxidants: { v: 0.6, c: "high", note: "Natural perchlorate detected (Kounaves et al. 2010)." },
      aqueous: { v: 0.4, c: "medium", note: "Salts and evaporites around saline lakes and ponds." },
      basalt: { v: 0.4, c: "medium", note: "Ferrar dolerite and Beacon sandstone; basaltic in places." },
      impact: { v: 0.05, c: "high", note: "No significant impact structures." },
      ice: { v: 0.95, c: "high", note: "Dry and ice-cemented permafrost; buried glacial ice in Beacon Valley." },
      sterility: { v: 0.8, c: "medium", note: "Cryptoendolithic life in rocks; near-sterile upper-valley soils." },
      isolation: { v: 0.95, c: "high", note: "Accessible only by helicopter from McMurdo; months-long isolation." },
    },
    history: [
      { year: "1970s", event: "Soil-biology studies inform the design of the Viking life-detection experiments." },
      { year: "1993–", event: "NSF McMurdo Dry Valleys Long-Term Ecological Research program begins." },
      { year: "2010", event: "Natural perchlorate discovered in Dry Valleys soils, echoing Phoenix findings." },
    ],
    missions: {
      astrobiology: "Strong for limits of life in cold, dry soils and ice; ideal for Phoenix-style science.",
      isru: "Excellent for ice-prospecting, drilling into ice-cemented ground and water extraction tests.",
      "human-ops": "Outstanding for crew isolation, polar logistics and cold-weather EVA procedures.",
      rover: "Strong for cold-temperature mobility and drilling, though terrain access is restricted.",
      impact: "Poor — no impact structures present.",
    },
    limitations: [
      { severity: "major", text: "Near sea-level pressure means ice behaves differently than in Mars' thin atmosphere." },
      { severity: "moderate", text: "Seasonal meltwater streams and lakes provide liquid water rarely stable on Mars." },
      { severity: "moderate", text: "Antarctic Treaty environmental protocols strictly limit disturbance and sampling." },
    ],
    references: [
      "Kounaves S.P. et al. (2010) Environ. Sci. Technol. 44, 2360–2364.",
      "Marchant D.R. & Head J.W. (2007) Icarus 192, 187–222.",
      "Doran P.T. et al. (2002) J. Geophys. Res. 107(D24), 4772.",
    ],
  },
  {
    id: "haughton",
    code: "ISD-HMP-03",
    name: "Haughton Impact Structure",
    region: "Devon Island, Nunavut",
    country: "Canada",
    lat: 75.38,
    lon: -89.68,
    elevationM: 250,
    primaryAnalog: "both",
    headline: "A 23 km crater in a polar desert — the long-running home of the Haughton-Mars Project.",
    summary:
      "Haughton is one of the best-preserved high-latitude impact structures on Earth, set in a cold polar desert with ground ice, gullies and polygons. Since 1997 it has hosted field science and operations research for crewed Moon and Mars exploration, including the FMARS habitat.",
    physical: { pressureHPa: 985, meanTempC: -16, diurnalRangeC: 8, precipMm: 150, gravityG: 1, radiationMSvDay: 0.007 },
    physicalConfidence: "medium",
    dims: {
      aridity: { v: 0.8, c: "medium", note: "Polar desert, roughly 100–200 mm precipitation per year." },
      cold: { v: 0.46, c: "high", note: "Mean annual ≈ −16 °C." },
      thermal: { v: 0.15, c: "medium", note: "Small daily swings; summer midnight sun." },
      radiation: { v: 0.3, c: "medium", note: "High-latitude, moderate UV exposure." },
      pressure: { v: 0.03, c: "high", note: "≈985 hPa." },
      oxidants: { v: 0.2, c: "low", note: "No significant perchlorate reported; limited data." },
      aqueous: { v: 0.4, c: "medium", note: "Impact-hydrothermal alteration minerals in the crater fill." },
      basalt: { v: 0.1, c: "high", note: "Carbonate target rocks over gneiss — not basaltic." },
      impact: { v: 1, c: "high", note: "~23 km diameter, ~31 Ma; breccias, shatter cones, melt rocks." },
      ice: { v: 0.85, c: "high", note: "Continuous permafrost, ice wedges and polygonal ground." },
      sterility: { v: 0.6, c: "medium", note: "Sparse vegetation and microbial mats in places." },
      isolation: { v: 0.85, c: "high", note: "Uninhabited island; air access only, limited communications." },
    },
    history: [
      { year: "1997", event: "Haughton-Mars Project (NASA / SETI Institute) begins field campaigns." },
      { year: "2000", event: "Mars Society builds the Flashline Mars Arctic Research Station (FMARS)." },
      { year: "2013", event: "Impact age revised to ~31 million years (Young et al.)." },
    ],
    missions: {
      astrobiology: "Moderate — impact-hydrothermal habitats and ice offer niche studies.",
      isru: "Good for ice-rich ground and excavation trials; poor for basaltic regolith processing.",
      "human-ops": "Excellent — two decades of crewed EVA, habitat and rover traverse simulations.",
      rover: "Strong for long traverses across crater terrain and pressurised-rover concepts.",
      impact: "Best-in-class — complete, well-exposed crater for both lunar and martian impact studies.",
    },
    limitations: [
      { severity: "major", text: "Carbonate-rich target rocks differ strongly from basaltic Mars and anorthositic lunar crust." },
      { severity: "moderate", text: "Vegetation and active hydrology are present in summer." },
      { severity: "minor", text: "Short field season (July–August) limits continuous operations." },
    ],
    references: [
      "Lee P. et al. (2007) Haughton-Mars Project overview, LPSC XXXVIII.",
      "Osinski G.R. et al. (2005) Meteoritics & Planet. Sci. 40, 1759–1776.",
      "Young K.E. et al. (2013) Geophys. Res. Lett. 40, 3836–3840.",
    ],
  },
  {
    id: "rio-tinto",
    code: "ISD-RTN-04",
    name: "Río Tinto",
    region: "Huelva, Andalusia",
    country: "Spain",
    lat: 37.72,
    lon: -6.56,
    elevationM: 400,
    primaryAnalog: "mars",
    headline: "An acidic, iron-rich river whose jarosite and hematite mirror Meridiani Planum.",
    summary:
      "Río Tinto flows at pH ≈2 through the Iberian Pyrite Belt, precipitating jarosite, goethite and hematite — the same mineral suite Opportunity found at Meridiani Planum. It is a key analog for ancient acidic aqueous environments on Mars and the life that could have inhabited them.",
    physical: { pressureHPa: 965, meanTempC: 17, diurnalRangeC: 15, precipMm: 600, gravityG: 1, radiationMSvDay: 0.007 },
    physicalConfidence: "high",
    dims: {
      aridity: { v: 0.45, c: "high", note: "Mediterranean climate, ~600 mm/yr; river flows year-round." },
      cold: { v: 0.13, c: "high", note: "Mean annual ≈17 °C." },
      thermal: { v: 0.15, c: "high", note: "Moderate daily swings." },
      radiation: { v: 0.25, c: "medium", note: "Normal mid-latitude UV." },
      pressure: { v: 0.05, c: "high", note: "≈965 hPa." },
      oxidants: { v: 0.5, c: "medium", note: "Strongly oxidising ferric-iron chemistry, no perchlorate." },
      aqueous: { v: 0.95, c: "high", note: "Jarosite, goethite, hematite and sulfates actively forming." },
      basalt: { v: 0.2, c: "medium", note: "Volcanogenic massive sulfides; not basaltic regolith." },
      impact: { v: 0, c: "high", note: "No impact features." },
      ice: { v: 0, c: "high", note: "No ground ice." },
      sterility: { v: 0.2, c: "high", note: "Rich acidophilic microbial communities." },
      isolation: { v: 0.15, c: "high", note: "Road access, nearby towns and mining infrastructure." },
    },
    history: [
      { year: "2003–06", event: "MARTE (NASA ASTEP) drills 160 m into the subsurface to test life-detection." },
      { year: "2004", event: "Opportunity finds jarosite at Meridiani, elevating Río Tinto as a Mars analog." },
      { year: "2010s", event: "Ongoing studies of iron- and sulfur-cycling acidophiles (Amils et al.)." },
    ],
    missions: {
      astrobiology: "Strong for habitability and biosignature preservation in acidic, iron-rich waters.",
      isru: "Low — wet, warm conditions offer little relevance to regolith or ice extraction.",
      "human-ops": "Weak — easily accessible, no isolation or extreme-environment stress.",
      rover: "Useful for mineral-identification and spectroscopy instrument calibration.",
      impact: "Not applicable.",
    },
    limitations: [
      { severity: "major", text: "Abundant liquid water and life: represents ancient Mars, not today's surface." },
      { severity: "moderate", text: "Centuries of mining have altered the hydrology and sediment record." },
      { severity: "minor", text: "Warm Mediterranean climate gives no cold or low-pressure analog value." },
    ],
    references: [
      "Fernández-Remolar D.C. et al. (2005) Earth Planet. Sci. Lett. 240, 149–167.",
      "Stoker C.R. et al. (2008) Astrobiology 8, 921–945 (MARTE).",
      "Amils R. et al. (2007) Planet. Space Sci. 55, 370–381.",
    ],
  },
  {
    id: "mauna-kea",
    code: "ISD-MKA-05",
    name: "Mauna Kea",
    region: "Hawaiʻi Island",
    country: "United States",
    lat: 19.82,
    lon: -155.47,
    elevationM: 4205,
    primaryAnalog: "moon",
    headline: "High-altitude basaltic tephra used to test lunar oxygen and water extraction.",
    summary:
      "The upper slopes of Mauna Kea expose basaltic cinder and palagonitic tephra at 60% of sea-level pressure. Its soils were the source of the JSC Mars-1 simulant, and the area hosted NASA and international ISRU field demonstrations of lunar resource prospecting and oxygen production.",
    physical: { pressureHPa: 615, meanTempC: 3, diurnalRangeC: 10, precipMm: 250, gravityG: 1, radiationMSvDay: 0.02 },
    physicalConfidence: "medium",
    dims: {
      aridity: { v: 0.65, c: "medium", note: "Above the trade-wind inversion; ~200–300 mm/yr at altitude." },
      cold: { v: 0.27, c: "medium", note: "Summit mean ≈ 0–4 °C." },
      thermal: { v: 0.2, c: "medium", note: "Moderate daily swings at altitude." },
      radiation: { v: 0.55, c: "medium", note: "Very high tropical, high-altitude UV and elevated cosmic dose." },
      pressure: { v: 0.4, c: "high", note: "≈615 hPa at the summit — the lowest of the five sites." },
      oxidants: { v: 0.2, c: "low", note: "Limited oxidant data." },
      aqueous: { v: 0.35, c: "medium", note: "Palagonite (altered volcanic glass) — a spectral Mars analog." },
      basalt: { v: 0.98, c: "high", note: "Basaltic to hawaiitic tephra, cinder cones and lava flows." },
      impact: { v: 0, c: "high", note: "No impact features." },
      ice: { v: 0.15, c: "medium", note: "Small relict permafrost bodies near Puʻu Wēkiu." },
      sterility: { v: 0.6, c: "medium", note: "Sparse life above ~3,500 m." },
      isolation: { v: 0.35, c: "medium", note: "Road access; HI-SEAS habitat on nearby Mauna Loa adds isolation studies." },
    },
    history: [
      { year: "1998", event: "JSC Mars-1 simulant described, derived from Puʻu Nēnē palagonitic tephra." },
      { year: "2008–12", event: "NASA / CSA / PISCES lunar ISRU field tests, including the RESOLVE prospector." },
      { year: "2013–", event: "HI-SEAS long-duration isolation missions run on neighbouring Mauna Loa." },
    ],
    missions: {
      astrobiology: "Limited — life is present and oxidant chemistry is weak.",
      isru: "Best-in-class for basaltic regolith handling, excavation and oxygen-extraction trials.",
      "human-ops": "Moderate; the nearby HI-SEAS habitat provides crew-isolation research.",
      rover: "Strong for mobility on loose basaltic cinder and regolith-sampling payloads.",
      impact: "Not applicable.",
    },
    limitations: [
      { severity: "major", text: "Mauna Kea is sacred to Native Hawaiians; field work requires cultural protocols and permits." },
      { severity: "moderate", text: "Tephra is coarser than lunar regolith and lacks agglutinates and nanophase iron." },
      { severity: "moderate", text: "No vacuum: thermal and electrostatic dust behaviour differ from the Moon." },
    ],
    references: [
      "Allen C.C. et al. (1998) LPSC XXIX, abstract 1690 (JSC Mars-1).",
      "Sanders G.B. & Larson W.E. (2011) J. Aerospace Eng. 26, 5–17.",
      "Binsted K. et al. (2015) HI-SEAS mission reports, Univ. of Hawaiʻi.",
    ],
  },
];

export const getSite = (id: string) => SITES.find((s) => s.id === id);
