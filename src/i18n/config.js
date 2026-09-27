import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import en from './locales/en.json';
import hi from './locales/hi.json';
import bn from './locales/bn.json';
import mr from './locales/mr.json';
import te from './locales/te.json';
import ta from './locales/ta.json';
import gu from './locales/gu.json';
import kn from './locales/kn.json';
import ml from './locales/ml.json';
import pa from './locales/pa.json';
import or from './locales/or.json';
import as from './locales/as.json';
import ur from './locales/ur.json';

export const supportedLanguages = [
  { code: 'en', label: 'English', native: 'English', dir: 'ltr', fontClass: 'font-sans' },
  { code: 'hi', label: 'Hindi', native: 'हिन्दी', dir: 'ltr', fontClass: 'font-devanagari' },
  { code: 'bn', label: 'Bengali', native: 'বাংলা', dir: 'ltr', fontClass: 'font-bengali' },
  { code: 'mr', label: 'Marathi', native: 'मराठी', dir: 'ltr', fontClass: 'font-devanagari' },
  { code: 'te', label: 'Telugu', native: 'తెలుగు', dir: 'ltr', fontClass: 'font-telugu' },
  { code: 'ta', label: 'Tamil', native: 'தமிழ்', dir: 'ltr', fontClass: 'font-tamil' },
  { code: 'gu', label: 'Gujarati', native: 'ગુજરાતી', dir: 'ltr', fontClass: 'font-gujarati' },
  { code: 'kn', label: 'Kannada', native: 'ಕನ್ನಡ', dir: 'ltr', fontClass: 'font-kannada' },
  { code: 'ml', label: 'Malayalam', native: 'മലയാളം', dir: 'ltr', fontClass: 'font-malayalam' },
  { code: 'pa', label: 'Punjabi', native: 'ਪੰਜਾਬੀ', dir: 'ltr', fontClass: 'font-gurmukhi' },
  { code: 'or', label: 'Odia', native: 'ଓଡ଼ିଆ', dir: 'ltr', fontClass: 'font-odia' },
  { code: 'as', label: 'Assamese', native: 'অসমীয়া', dir: 'ltr', fontClass: 'font-bengali' },
  { code: 'ur', label: 'Urdu', native: 'اردو', dir: 'rtl', fontClass: 'font-urdu' }
];

const savedLang = localStorage.getItem('language') || 'en';

const resources = {
  en: { translation: en },
  hi: { translation: hi },
  bn: { translation: bn },
  mr: { translation: mr },
  te: { translation: te },
  ta: { translation: ta },
  gu: { translation: gu },
  kn: { translation: kn },
  ml: { translation: ml },
  pa: { translation: pa },
  or: { translation: or },
  as: { translation: as },
  ur: { translation: ur }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: savedLang,
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false // React handles XSS safely
    },
    react: {
      useSuspense: false
    }
  });

// Apply document direction and font based on language
export const applyLanguageSettings = (langCode) => {
  const langObj = supportedLanguages.find(l => l.code === langCode) || supportedLanguages[0];
  const isRtl = langObj.dir === 'rtl';
  
  document.documentElement.lang = langCode;
  document.documentElement.dir = isRtl ? 'rtl' : 'ltr';
  
  if (isRtl) {
    document.documentElement.classList.add('rtl-layout');
  } else {
    document.documentElement.classList.remove('rtl-layout');
  }
};

// Initial application
applyLanguageSettings(savedLang);

// Listener for language change
i18n.on('languageChanged', (lng) => {
  localStorage.setItem('language', lng);
  applyLanguageSettings(lng);
});

/**
 * Utility to safely translate dynamic text while preserving Indian Standard numbers,
 * units (MPa, kW, kV), and technical codes.
 */
export const translatePreservingTerms = (text, targetLang = 'en') => {
  if (!text || typeof text !== 'string') return text;
  // If translation key exists, return translated key
  if (i18n.exists(text)) {
    return i18n.t(text);
  }
  return text;
};

export default i18n;
