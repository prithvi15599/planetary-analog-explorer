/**
 * ISIDION reference dataset — transcribed from the team research report
 * "NASA Space Apps Challenge – Isidion" (Prady, Henry, Shreyas, Prithvi · 14 Nov 2026).
 * Fingerprint scores are 0–100 (higher = closer analog). Measurements are the
 * report's "close estimates".
 */

export type BodyId = "mars" | "moon";
export type DimKey = "thermal" | "geology" | "dust" | "terrain" | "water" | "operations";

export interface Dimension {
  key: DimKey;
  label: string;
  short: string;
  variables: string;
  interpretation: string;
}

export const DIMENSIONS: Dimension[] = [
  { key: "thermal", label: "Thermal Stress", short: "THM", variables: "Temperature minimum, maximum, diurnal range, seasonal range, solar irradiance.", interpretation: "Higher score means closer thermal conditions." },
  { key: "geology", label: "Geological Similarity", short: "GEO", variables: "Lithology, evaporite presence, mineralogy, alteration, sedimentary exposure.", interpretation: "Higher score means closer surface-material relevance." },
  { key: "dust", label: "Dust Exposure", short: "DST", variables: "Aerosol optical depth, wind speed, dust-storm frequency, surface erodibility.", interpretation: "Higher score means stronger dust-process analogy." },
  { key: "terrain", label: "Terrain Mobility", short: "TER", variables: "Slope, roughness, obstacle density, drainage, landform complexity.", interpretation: "Higher score means more relevant mobility conditions." },
  { key: "water", label: "Water and Ice", short: "H₂O", variables: "Aridity, soil moisture, snow/ice, permafrost, groundwater depth.", interpretation: "Higher score means stronger water-resource or preservation analogy." },
  { key: "operations", label: "Operational Feasibility", short: "OPS", variables: "Remoteness, access, elevation, communications, permits, safety.", interpretation: "Higher score means more practical for field testing." },
];

export const VARIABLE_GROUPS = [
  { group: "Thermal Environment", earth: "Land-surface temperature, air temperature, diurnal range, seasonal range, solar irradiance.", planet: "Diviner lunar temperature; MEDA Martian temperature.", question: "Does the site reproduce comparable thermal stress or cycling?" },
  { group: "Aridity and Water", earth: "Precipitation, relative humidity, soil moisture, snow cover, permafrost, surface water.", planet: "Martian water-ice indicators; lunar volatile indicators.", question: "Can the site test water scarcity, ice prospecting, or preservation?" },
  { group: "Dust and Aerosols", earth: "Aerosol optical depth, dust-storm frequency, wind speed, wind direction, surface erodibility.", planet: "MEDA dust and wind measurements; Mars dust-storm records.", question: "Can the site test dust exposure, solar-panel soiling, and contamination control?" },
  { group: "Terrain", earth: "Elevation, slope, aspect, roughness.", planet: "Lunar and Martian DEM-derived slope.", question: "Can the site support rover mobility?" },
];

export interface Target {
  id: string;
  name: string;
  body: BodyId;
  coords?: string;
  relevance: string;
  purpose: string;
}

export const TARGETS: Target[] = [
  { id: "jezero", name: "Jezero Crater", body: "mars", coords: "18.44° N, 77.45° E", relevance: "Ancient lake-and-river-delta environment, sedimentary rocks, crater rims, dust, and rover-mobility constraints.", purpose: "Rover operations, terrain navigation, sedimentary geology, and dust exposure." },
  { id: "evaporite", name: "Martian Evaporite-Bearing Terrain", body: "mars", relevance: "Sulfate and chloride deposits associated with past aqueous activity and potential biosignature preservation.", purpose: "Evaporite mineralogy, salt weathering, biosignature preservation." },
  { id: "yardang", name: "Martian Yardang-Bearing Terrain", body: "mars", relevance: "Wind-eroded landforms shaped by arid conditions and aeolian processes.", purpose: "Aeolian erosion, dust generation, terrain interpretation." },
  { id: "lunar-south-pole", name: "Lunar South Pole", body: "moon", coords: "Shackleton Crater rim · 89.9° S", relevance: "Low-angle sunlight, extreme shadows, rugged terrain, permanently shadowed regions, and potential volatiles.", purpose: "Thermal stress, mobility, communications, resource-prospecting workflows." },
];

export const HYPOTHESIS = {
  lead: "A strong, less obvious candidate is the Qaidam Basin, China & Tibetan Plateau, especially its playa, yardang, and very cold high-altitude desert zones.",
  marsPoints: [
    "High elevation × low oxygen partial pressure.",
    "Very cold winters and large diurnal temperature swings.",
    "Hyperarid conditions.",
    "Salt flats, evaporites, wind-eroded yardangs, and dust-producing surfaces.",
    "Limited vegetation in certain subregions.",
    "Remote, logistically demanding terrain.",
  ],
  why: "This makes it potentially more useful for testing dust exposure, rover mobility, solar-panel soiling, thermal cycling, and field-operations logistics than a visually Mars-like but ecologically different desert. The key is to define a small test area instead of the whole basin and compare its measured conditions against Jezero and Martian dust storm conditions.",
  approach: "Process-based analog assessment over visual similarity alone.",
  question: "Which small, well-defined areas within the Qaidam Basin most closely reproduce selected environmental, geological, and operational conditions relevant to Mars exploration, and what exploration activities could realistically be tested?",
  formal:
    "The Qaidam Basin contains distinct subregions that provide stronger process-based analogs for selected Martian environments than broad regional comparisons alone. Dalangtan Playa is expected to provide a strong analog for Martian evaporite mineralogy, biosignature preservation, and saline-environment exploration; Qaidam yardang fields for Martian aeolian erosion and terrain interpretation; and Qaidam dune or playa-margin zones for dust exposure, solar-panel soiling, and rover-mobility testing. These analogies are expected to be strongest for geological, environmental, and operational processes, while remaining limited by Earth's atmosphere, gravity, radiation environment, and biological activity.",
};

export const MOON_ANALOG_TYPES = [
  { name: "Thermal-Cycling Analog", text: "High-altitude deserts or polar sites with large day-night temperature swings can test thermal expansion, seals, batteries, electronics, and habitat materials." },
  { name: "Dust-Mobility Analog", text: "Volcanic ash fields, dry playas, and desert sand sheets can test wheel traction, dust mitigation, airlock contamination, and solar panel soiling." },
  { name: "Ice-Resource Analog", text: "Antarctic dry valleys, Arctic permafrost, and high-altitude cold deserts can test prospecting, drilling, excavation, and water extraction workflows." },
  { name: "Communications-and-Isolation Analog", text: "Remote polar or desert sites can test delayed decision-making, crew support, maintenance, and contingency planning." },
  { name: "Terrain-Navigation Analog", text: "Cratered volcanic fields, impact craters, and rugged polar terrain can test rover autonomy, hazard avoidance, line-of-sight communications, and site layout." },
];

export interface Site {
  id: string;
  code: string;
  name: string;
  region: string;
  country: string;
  lat: number;
  lon: number;
  /** true when coordinates are given in the research report */
  coordsFromReport: boolean;
  elevation?: string;
  role: "candidate" | "validation";
  body: BodyId | "both";
  analogy: string;
  values: string;
  limits: string;
  summary: string;
  scores: Record<DimKey, number>;
  overall: number;
  mission: { activity: string; relevance: string };
  finding: { expected: string; interpretation: string };
  validation: { test: string; expected: string; result: string; interpretation: string };
}

export const SITES: Site[] = [
  {
    id: "dalangtan",
    code: "ISD-DLT-01",
    name: "Dalangtan Playa",
    region: "Qaidam Basin, Tibetan Plateau",
    country: "China",
    lat: 38.596,
    lon: 90.985,
    coordsFromReport: true,
    elevation: "3,245 m",
    role: "candidate",
    body: "mars",
    analogy: "Martian evaporites and biosignature preservation.",
    values: "Hypersaline sediments, extreme aridity, high UV, microbial survival, layered deposits.",
    limits: "Earth atmosphere, gravity, and biological activity differ from Mars.",
    summary:
      "Treated as the primary Mars-evaporite analog because of its hypersaline deposits, extreme aridity and high UV radiation. Its layered deposits have been identified as analogues to Martian layered deposits, including those in Juventae Chasma.",
    scores: { thermal: 70, geology: 90, dust: 75, terrain: 60, water: 55, operations: 45 },
    overall: 66,
    mission: { activity: "Evaporite sampling, spectroscopy, drilling, biosignature detection, contamination control.", relevance: "Mars evaporite science and life-detection preparation." },
    finding: { expected: "Dalangtan Playa ranks highly for evaporite and biosignature analogies.", interpretation: "Its saline mineralogy, aridity, UV exposure, and microbial survival conditions make it relevant to Martian evaporite environments." },
    validation: { test: "Dalangtan should rank highly for evaporite analogy", expected: "High geological score", result: "Geological score: 90", interpretation: "Supports Dalangtan as the strongest evaporite/biosignature analog." },
  },
  {
    id: "qaidam-yardang",
    code: "ISD-QYF-02",
    name: "Qaidam Yardang Field",
    region: "Qaidam Basin, Tibetan Plateau",
    country: "China",
    lat: 38.3,
    lon: 91.5,
    coordsFromReport: true,
    elevation: "≈3,000 m",
    role: "candidate",
    body: "mars",
    analogy: "Martian yardangs and aeolian erosion.",
    values: "Wind-eroded terrain, mudstone/siltstone lithology, dust-producing surface.",
    limits: "Formation rates, wind regime, and atmospheric conditions differ.",
    summary:
      "Treated as a separate aeolian-terrain analog because its morphology and geometry have been compared with yardangs in Mars' Medusae Fossae Formation and Gale Crater.",
    scores: { thermal: 70, geology: 75, dust: 90, terrain: 85, water: 50, operations: 40 },
    overall: 68,
    mission: { activity: "Rover navigation, terrain classification, hazard avoidance, wind-erosion observation.", relevance: "Mars surface mobility and geomorphology." },
    finding: { expected: "Qaidam yardang fields rank highly for aeolian analogies.", interpretation: "Their wind-eroded morphology, sedimentary lithology, and arid setting make them relevant to Martian yardang studies." },
    validation: { test: "Yardang field should rank highly for aeolian analogy", expected: "High dust and terrain score", result: "Dust: 90; Terrain: 85", interpretation: "Supports the yardang field as the strongest aeolian-terrain analog." },
  },
  {
    id: "qaidam-dune",
    code: "ISD-QDP-03",
    name: "Qaidam Dune / Playa Margin",
    region: "Qaidam Basin, Tibetan Plateau",
    country: "China",
    lat: 38.0,
    lon: 92.0,
    coordsFromReport: true,
    elevation: "≈2,800 m",
    role: "candidate",
    body: "both",
    analogy: "Martian dust transport and surface mobility.",
    values: "Mobile sediment, dust sources, wind exposure, rover-traction conditions.",
    limits: "Vegetation, moisture, and atmospheric density differ.",
    summary:
      "Mobile sediment, playa deposits and salt crust make this margin zone a test bed for dust emission, sediment transport and wheel traction — the processes behind Martian dust lifting and lunar dust mobility.",
    scores: { thermal: 70, geology: 65, dust: 85, terrain: 75, water: 50, operations: 45 },
    overall: 68,
    mission: { activity: "Solar-panel soiling, dust exposure and rover-mobility testing.", relevance: "Mars dust exposure and lunar dust mobility." },
    finding: { expected: "Dune and playa-margin zones rank highly for dust and mobility analogies.", interpretation: "Their mobile sediment, wind exposure, and dust-producing surfaces make them useful for testing dust exposure and mobility." },
    validation: { test: "Dune/playa margin should rank highly for dust and mobility", expected: "High dust and terrain score", result: "Dust: 85; Terrain: 75", interpretation: "Supports its use for dust exposure and rover-mobility testing." },
  },
  {
    id: "atacama",
    code: "ISD-ATA-04",
    name: "Atacama Desert",
    region: "Validation site",
    country: "Chile",
    lat: -24.1,
    lon: -70.02,
    coordsFromReport: false,
    role: "validation",
    body: "mars",
    analogy: "Mars aridity and surface chemistry.",
    values: "Hyperaridity, UV exposure, barren soils, Mars-relevant mineralogy.",
    limits: "Generally warmer than many Mars sites; limited permafrost.",
    summary:
      "An established analog used to benchmark ISIDION's rankings. Its extreme dryness and mineralogy remain valuable for Mars surface chemistry, dust, aridity and rover operations.",
    scores: { thermal: 55, geology: 80, dust: 80, terrain: 70, water: 45, operations: 70 },
    overall: 67,
    mission: { activity: "Mars surface chemistry, dust, aridity, and rover operations.", relevance: "Mars surface-process testing." },
    finding: { expected: "Atacama ranks highly for aridity and surface-chemistry analogies.", interpretation: "Its extreme dryness and mineralogy remain valuable for Mars surface-process testing, despite its warmer climate." },
    validation: { test: "Atacama should rank highly for aridity", expected: "High thermal/aridity score", result: "Thermal: 55; Dust: 80", interpretation: "Supports Atacama as an aridity and surface-chemistry validation site." },
  },
  {
    id: "dry-valleys",
    code: "ISD-ADV-05",
    name: "Antarctic Dry Valleys",
    region: "Validation site",
    country: "Antarctica",
    lat: -77.52,
    lon: 161.67,
    coordsFromReport: false,
    role: "validation",
    body: "both",
    analogy: "Mars cold-desert and subsurface habitability.",
    values: "Cold, dry, mineral-rich soils, permafrost, limited biology.",
    limits: "Earth atmosphere, precipitation patterns and accessibility differ.",
    summary:
      "An established analog used to benchmark ISIDION's rankings. Its cold, dry, permafrost-rich environment is relevant to lunar cold traps and Mars polar and subsurface ice.",
    scores: { thermal: 85, geology: 60, dust: 35, terrain: 55, water: 90, operations: 30 },
    overall: 59,
    mission: { activity: "Ice prospecting, drilling, excavation, and water extraction workflows.", relevance: "Lunar cold traps and Mars polar/subsurface ice." },
    finding: { expected: "Antarctic Dry Valleys rank highly for cold and ice-related analogies.", interpretation: "Their cold, dry, permafrost-rich environment is more relevant to lunar polar and Martian subsurface-ice conditions than Qaidam." },
    validation: { test: "Antarctic Dry Valleys should rank highly for cold and ice", expected: "High water/ice score", result: "Water/ice: 90", interpretation: "Supports its use for cold, permafrost, and subsurface-ice relevance." },
  },
];

export const getSite = (id: string) => SITES.find((s) => s.id === id);

/** Measurement table (close estimates) — Qaidam sites vs the Jezero target. */
export const MEASUREMENTS: { variable: string; dalangtan: string; yardang: string; dune: string; jezero: string; source: string }[] = [
  { variable: "Elevation", dalangtan: "3,245 m", yardang: "≈3,000 m", dune: "≈2,800 m", jezero: "≈ −2.7 km (Mars datum)", source: "Published site data / DEM" },
  { variable: "Mean annual temperature", dalangtan: "3.5 °C", yardang: "≈3.5 °C", dune: "≈3.5 °C", jezero: "MEDA-derived value", source: "Dalangtan climate record" },
  { variable: "Annual precipitation", dalangtan: "≈50 mm", yardang: "<25 mm", dune: "<25 mm", jezero: "Not directly comparable", source: "Dalangtan & western Qaidam climate data" },
  { variable: "Mean wind speed", dalangtan: "≈3 m/s", yardang: "≈3 m/s", dune: "≈3.96 m/s", jezero: "≈5 m/s day · 1.5 m/s night", source: "Dalangtan record; Qaidam wind studies; Jezero MEDA" },
  { variable: "Relative humidity", dalangtan: "≈30%", yardang: "≈30%", dune: "≈30%", jezero: "MEDA-derived value", source: "Dalangtan climate record" },
  { variable: "NDVI", dalangtan: "0.13–0.17 (basin avg.)", yardang: "0.13–0.17 (basin avg.)", dune: "0.13–0.17 (basin avg.)", jezero: "Not directly comparable", source: "MODIS MOD13Q1" },
  { variable: "Main geology", dalangtan: "Evaporites, salt crusts, layered deposits", yardang: "Mudstone, siltstone, sandstone, gypsum-bearing layers", dune: "Mobile sediment, playa deposits, salt crust", jezero: "Sedimentary rocks, deltaic deposits, crater materials", source: "Dalangtan & Qaidam studies" },
  { variable: "Main process", dalangtan: "Salt weathering, desiccation, biosignature preservation", yardang: "Wind erosion, yardang formation, dust generation", dune: "Dust emission, sediment transport, wheel traction", jezero: "Dust lifting, rover mobility, sedimentary geology", source: "Dalangtan & yardang studies" },
];

/** Initial survey of well-known Earth analogs (report, "ISIDION – Website"). */
export const SURVEY: { name: string; analogy: string; strong: string; mismatch: string }[] = [
  { name: "Canadian High Arctic / Devon Island", analogy: "Lunar polar base operations: permafrost, cold, isolation and rough terrain.", strong: "Cold, dry conditions, permafrost, remote logistics, and terrain mobility.", mismatch: "Much more vegetation and biology than lunar polar terrain." },
  { name: "Antarctic Dry Valleys", analogy: "Lunar cold traps and Mars polar/subsurface ice.", strong: "Extreme cold, aridity, permafrost and low biological activity.", mismatch: "Earth's atmosphere, gravity, and accessible logistics differ." },
  { name: "Atacama Desert, Chile", analogy: "Mars surface chemistry, dust, aridity, and rover operations.", strong: "Hyperaridity, UV exposure, barren soils, Mars-relevant mineralogy.", mismatch: "Much warmer than many Mars sites; no permafrost in core zones." },
  { name: "Icelandic Volcanic Field & Lava Tubes", analogy: "Lunar mare regolith, basalt geology, lava-tube operations.", strong: "Basalt, lava tubes, volcanic terrain, rover and EVA testing.", mismatch: "Wet, vegetated, atmospheric, and geologically active." },
  { name: "Hawaiian Volcanic Fields", analogy: "Lunar mare and Mars volcanic terrains.", strong: "Basalt flows, crater/volcanic morphology, and a dust-like regolith.", mismatch: "Warm, humid, and biologically active." },
  { name: "Namib Desert / Skeleton Coast", analogy: "Mars aeolian processes and dust transport.", strong: "Dunes, wind erosion, aridity, and dust mobilization.", mismatch: "Not cold enough and biologically richer than Mars." },
  { name: "Qaidam Basin & Tibetan Plateau, China", analogy: "Mars arid basin and saline/evaporitic terrain.", strong: "Cold high-altitude desert, salt flats, aeolian features, low vegetation.", mismatch: "Different tectonic and atmospheric setting." },
  { name: "McMurdo Dry Valleys, Antarctica", analogy: "Mars cold-desert and subsurface habitability.", strong: "Cold, dry, mineral soils, permafrost and limited biology.", mismatch: "Earth's atmosphere and precipitation patterns still differ." },
  { name: "Ries Crater, Germany", analogy: "Mars crater geology and impact processes.", strong: "Impact-melt rocks, crater morphology, ejecta, mineral alteration.", mismatch: "Temperate, vegetated and wet." },
  { name: "Volcanic ash plains (Kamchatka / Andes)", analogy: "Lunar regolith mobility and Mars volcanic terrain.", strong: "Ash, pumice, rough volcanic surfaces and remote terrain.", mismatch: "Weathering, vegetation, and atmospheric conditions differ." },
];

export const LIMITATIONS: { limitation: string; implication: string; handling: string }[] = [
  { limitation: "Earth has stronger gravity.", implication: "Dust behaviour, excavation, mobility and human physiology differ.", handling: "Gravity is excluded from similarity scoring and listed as a non-analog condition." },
  { limitation: "Earth has an atmosphere.", implication: "Lunar vacuum and Mars' thin CO₂ atmosphere cannot be reproduced.", handling: "Atmosphere is treated as a major limitation, not a matching variable." },
  { limitation: "Earth has radiation shielding.", implication: "Earth's magnetic field and atmosphere reduce radiation exposure.", handling: "Radiation is not claimed as an analog condition." },
  { limitation: "Earth sites contain life.", implication: "Even extreme environments host microorganisms.", handling: "Biology is used for habitability and biosignature research, not as proof of planetary equivalence." },
  { limitation: "Data resolutions differ.", implication: "Earth, Moon, and Mars products have different spatial and temporal resolution.", handling: "Each score includes resolution, date range, and confidence information." },
  { limitation: "Regional averages hide local variation.", implication: "A basin-wide average may conceal highly relevant small areas.", handling: "ISIDION analyzes small, explicitly defined subregions." },
  { limitation: "Access and ethics matter.", implication: "A scientifically strong site may be impractical or protected.", handling: "Operational feasibility and permit/access constraints are included." },
];

export const VALIDATION_STEPS: { step: string; method: string; outcome: string }[] = [
  { step: "Benchmark against known analogs", method: "Compare ISIDION ranking with Atacama Desert and Antarctic Dry Valleys.", outcome: "Established analogs should rank highly for their relevant dimensions." },
  { step: "Cross-check geology", method: "Compare remote-sensing mineralogy with published field and laboratory studies.", outcome: "Qaidam evaporite sites should show strong mineralogical relevance." },
  { step: "Test temporal stability", method: "Calculate scores using multiple years or seasons.", outcome: "Strong analogs should remain consistent across representative time periods." },
  { step: "Assess scale sensitivity", method: "Repeat the analysis at regional and local scales.", outcome: "A strong analog should remain meaningful at the intended test scale." },
  { step: "Identify false positives", method: "Review sites with high visual similarity but weak process similarity.", outcome: "The method should prevent visually similar but scientifically weak matches." },
  { step: "Document uncertainty", method: "Report dataset resolution, temporal coverage, missing values, and confidence.", outcome: "Results should be interpretable rather than falsely precise." },
];

export const NO_PERFECT_SITE = {
  test: "No site should score perfectly",
  expected: "No perfect score",
  interpretation: "Confirms that no Earth site fully reproduces Mars conditions. Earth cannot reproduce lunar vacuum, reduced gravity, radiation, or Mars's thin atmosphere.",
};

/** Mission ranking categories from the project plan. */
export const MISSION_CATEGORIES = [
  "Lunar rover testing",
  "Mars rover testing",
  "Landing-site research",
  "Habitat construction research",
  "Ice and resource exploration",
  "Geological research",
];

export const topSite = () => [...SITES].sort((a, b) => b.overall - a.overall)[0]!;
