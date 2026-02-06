import { Genres } from "../types/DataTypes";

export function getMovieGenres(genres: Genres[]): string {
  const newGenres: Genres[] | null =
    genres?.length > 0 ? genres.slice(0, 3) : null;

  const genreNames = newGenres
    ? newGenres?.map((item) => item.name).join(" / ")
    : "";

  return genreNames;
}

// Map of language codes to language names (add more on demand)

const languageMap: Record<string, string> = {
  // Major World Languages
  en: "English",
  zh: "Chinese",
  es: "Spanish",
  hi: "Hindi",
  ar: "Arabic",
  pt: "Portuguese",
  bn: "Bengali",
  ru: "Russian",
  ja: "Japanese",
  de: "German",
  fr: "French",
  it: "Italian",
  ko: "Korean",
  tr: "Turkish",
  vi: "Vietnamese",
  pl: "Polish",
  uk: "Ukrainian",
  nl: "Dutch",
  th: "Thai",
  id: "Indonesian",
  ms: "Malay",
  fa: "Persian",
  he: "Hebrew",
  ur: "Urdu",

  // European / Nordic
  sv: "Swedish",
  no: "Norwegian",
  da: "Danish",
  fi: "Finnish",
  hu: "Hungarian",
  cs: "Czech",
  el: "Greek",
  ro: "Romanian",
  bg: "Bulgarian",
  sr: "Serbian",
  hr: "Croatian",
  sk: "Slovak",
  sl: "Slovenian",
  et: "Estonian",
  lv: "Latvian",
  lt: "Lithuanian",
  is: "Icelandic",
  ga: "Irish",
  sq: "Albanian",
  mk: "Macedonian",
  bs: "Bosnian",

  // Asian / Pacific
  tl: "Tagalog",
  ta: "Tamil",
  te: "Telugu",
  ml: "Malayalam",
  kn: "Kannada",
  mr: "Marathi",
  gu: "Gujarati",
  pa: "Punjabi",
  my: "Burmese",
  km: "Khmer",
  lo: "Lao",
  ne: "Nepali",
  si: "Sinhalese",
  mn: "Mongolian",

  // Other Common Codes in Movies
  cn: "Cantonese", // Often used interchangeably with zh/yue
  yue: "Cantonese",
  xx: "Silent", // TMDB sometimes uses this for silent movies
  wo: "Wolof",
  zu: "Zulu",
  xh: "Xhosa",
  af: "Afrikaans",
  sw: "Swahili",
  am: "Amharic",
  yo: "Yoruba",
  ig: "Igbo",
  ka: "Georgian",
  hy: "Armenian",
  az: "Azerbaijani",
  kk: "Kazakh",
  uz: "Uzbek",
  ky: "Kyrgyz",
  ps: "Pashto",
  ku: "Kurdish",
  la: "Latin",
  sa: "Sanskrit",
  eo: "Esperanto",
};

export const getLanguageName = (code: string | undefined): string => {
  if (!code) return "";

  // Try the manual map first
  if (languageMap[code]) {
    return languageMap[code];
  }

  // Fallback: Attempt the native Intl API (it might work on some devices)
  try {
    const languageNames = new Intl.DisplayNames(["en"], { type: "language" });
    const name = languageNames.of(code);
    return name
      ? name.charAt(0).toUpperCase() + name.slice(1)
      : code.toUpperCase();
  } catch (error) {
    return code.toUpperCase();
  }
};
