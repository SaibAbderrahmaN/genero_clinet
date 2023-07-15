// @mui
import { enUS, frFR,  arSD } from '@mui/material/locale';

// routes
import { PATH_DASHBOARD } from "./routes/paths";

export const BASE_URL = "https://filthy-tiara-deer.cyclic.app";
export const defaultSettings = {
  themeMode: "dark",
  themeDirection: "ltr",
  themeContrast: "default",
  themeLayout: "horizontal",
  themeColorPresets: "default",
  themeStretch: false,
};



export const NAVBAR = {
  BASE_WIDTH: 260,
  DASHBOARD_WIDTH: 280,
  DASHBOARD_COLLAPSE_WIDTH: 88,
  //
  DASHBOARD_ITEM_ROOT_HEIGHT: 48,
  DASHBOARD_ITEM_SUB_HEIGHT: 40,
  DASHBOARD_ITEM_HORIZONTAL_HEIGHT: 32,
};

export const allLangs = [
  {
    label: 'English',
    value: 'en',
    systemValue: enUS,
    icon: '/Assests/icons/flags/ic_flag_en.svg',
  },
  {
    label: 'French',
    value: 'fr',
    systemValue: frFR,
    icon: '/Assests/icons/flags/ic_flag_fr.svg',
  },
  {
    label: 'Arabic (algeria)',
    value: 'ar',
    systemValue: arSD,
    icon: '/Assests/icons/flags/ic_flag_sa.svg',
  },
];

export const defaultLang = allLangs[0]; // English



// DEFAULT ROOT PATH
export const DEFAULT_PATH = PATH_DASHBOARD.general.app; // as '/app'
