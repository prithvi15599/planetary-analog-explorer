/** Reference datasets relevant to ISIDION (agency + product). */
export interface DataSource {
  agency: "NASA" | "ESA" | "USGS";
  name: string;
  use: string;
  body: "Earth" | "Moon" | "Mars";
}

export const DATA_SOURCES: DataSource[] = [
  { agency: "NASA", name: "Landsat 8/9 (with USGS)", use: "Earth surface imagery & mineral mapping", body: "Earth" },
  { agency: "NASA", name: "SRTM elevation", use: "Site elevation & terrain", body: "Earth" },
  { agency: "ESA", name: "Copernicus Sentinel-2", use: "Multispectral Earth imagery", body: "Earth" },
  { agency: "USGS", name: "EarthExplorer / Mineral Resources", use: "Geology & mineral occurrence data", body: "Earth" },
  { agency: "NASA", name: "LRO Diviner & LOLA", use: "Lunar temperature & topography", body: "Moon" },
  { agency: "NASA", name: "Apollo sample data (Lunar Sample Compendium)", use: "Lunar regolith composition", body: "Moon" },
  { agency: "NASA", name: "MRO HiRISE & CRISM", use: "Mars imagery & mineralogy", body: "Mars" },
  { agency: "NASA", name: "Curiosity RAD / REMS", use: "Mars surface radiation & weather", body: "Mars" },
  { agency: "ESA", name: "Mars Express OMEGA", use: "Mars surface mineral maps", body: "Mars" },
  { agency: "USGS", name: "Astrogeology Science Center", use: "Geologic maps of the Moon & Mars", body: "Mars" },
];
