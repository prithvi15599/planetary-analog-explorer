/** Data sources and links, from the ISIDION research report and GitHub repository. */
export type Agency = "NASA" | "ESA" | "CSA" | "JAXA" | "USGS" | "Literature";

export interface DataSource {
  agency: Agency;
  name: string;
  data: string;
  role: string;
}

export const DATA_SOURCES: DataSource[] = [
  { agency: "NASA", name: "NASA Earthdata", data: "Land-surface temperature, vegetation indices, aerosol optical depth, elevation, snow/ice.", role: "Earth environmental characterization." },
  { agency: "NASA", name: "NASA Planetary Data System", data: "LRO Diviner, LRO Mini-RF, Mars 2020 MEDA, Mars 2020 imaging.", role: "Moon and Mars target characterization." },
  { agency: "NASA", name: "NASA Moon Trek", data: "Lunar elevation, illumination, temperature, and terrain layers.", role: "Lunar south-pole comparison." },
  { agency: "CSA", name: "Canadian Space Agency", data: "RADARSAT-1 and RADARSAT Constellation Mission.", role: "Surface roughness, ice, soil moisture, and terrain analysis." },
  { agency: "ESA", name: "Copernicus Data Space / ESA", data: "Sentinel imagery and auxiliary Earth-observation products.", role: "Land cover, surface change, and terrain context." },
  { agency: "JAXA", name: "JAXA G-Portal", data: "Global satellite and land-surface products.", role: "Supplementary environmental data." },
  { agency: "USGS", name: "USGS", data: "Geologic maps, mineral resources, and elevation data.", role: "Geological context and validation." },
  { agency: "Literature", name: "Peer-reviewed literature", data: "Qaidam, Atacama, Antarctic, lunar, and Mars studies.", role: "Scientific validation and interpretation." },
];

export const NASA_DATASETS = [
  { name: "MODIS/Terra Vegetation Indices 16-Day L3 Global 250 m SIN Grid V061 (MOD13Q1)", provider: "NASA Earthdata / LP DAAC", url: "https://www.earthdata.nasa.gov/data/catalog/lpcloud-mod13q1-061", note: "NDVI every 16 days at 250 m resolution." },
  { name: "Mars 2020 Perseverance MEDA EDR/RDR", provider: "NASA Planetary Data System", url: "https://pds-atmospheres.nmsu.edu/data_and_services/atmospheres_data/PERSEVERANCE/retrieving_mars2020.html", note: "Dust, wind, temperature, humidity, pressure, and radiation at Jezero." },
  { name: "Copernicus Global Digital Elevation Model", provider: "European Space Agency (2024), via OpenTopography", url: "https://doi.org/10.5069/G9028PQB", note: "Earth elevation input for the terrain matcher." },
];

export const RESOURCES = [
  { label: "Space Apps 2026 challenge", url: "https://www.spaceappschallenge.org/2026/challenges/permanent-moon-base-locations-and-mars/" },
  { label: "NASA Earthdata Search", url: "https://search.earthdata.nasa.gov" },
  { label: "NASA Worldview", url: "https://worldview.earthdata.nasa.gov/index.html" },
  { label: "NASA Planetary Data System", url: "https://pds.nasa.gov" },
  { label: "PDS Geosciences · LRO", url: "https://pds-geosciences.wustl.edu/missions/lro" },
  { label: "LRO Diviner", url: "https://pds-geosciences.wustl.edu/missions/lro/diviner.html" },
  { label: "CSA RADARSAT Constellation", url: "https://donnees-data.asc-csa.gc.ca/en/dataset/rcm" },
  { label: "CSA RADARSAT-1", url: "https://donnees-data.asc-csa.gc.ca/en/dataset/radarsat1" },
  { label: "Copernicus Data Space", url: "https://dataspace.copernicus.eu/" },
  { label: "ESA Open Science Data", url: "https://opensciencedata.esa.int" },
  { label: "JAXA G-Portal", url: "https://gportal.jaxa.jp/gpr/index/index" },
];

export const LINKS = {
  app: "https://github.com/shreyas-pradeep/Isidion-Quantitative-Planetary-Analog-Discovery-Engine",
  appName: "Isidion: Quantitative Planetary Analog Discovery Engine",
  prototype: "https://github.com/prithvi15599/planetary-analog-explorer",
  challenge: "https://www.spaceappschallenge.org/2026/challenges/permanent-moon-base-locations-and-mars/",
};
