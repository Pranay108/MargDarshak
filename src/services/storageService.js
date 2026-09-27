const CHAT_SESSIONS_KEY = 'bis_sathi_chat_sessions_v1';
const ACTIVE_SESSION_KEY = 'bis_sathi_active_session_id_v1';
const API_KEY_STORAGE = 'bis_sathi_llm_api_key_v1';
const PROVIDER_STORAGE = 'bis_sathi_llm_provider_v1';
const MODEL_STORAGE = 'bis_sathi_llm_model_v1';
const BASE_URL_STORAGE = 'bis_sathi_llm_base_url_v1';
const APP_LANG_STORAGE = 'bis_sathi_selected_language_v1';
const CONSUMER_USER_STORAGE = 'bis_sathi_consumer_user_v1';
const CONSUMER_BOOKMARKS_STORAGE = 'bis_sathi_consumer_bookmarks_v1';

// Default values from environment or fallback (Configured for Mistral AI)
const ENV_MISTRAL_KEY = import.meta.env?.VITE_MISTRAL_API_KEY || 'mstrl_JrYhBG4ZdTrJrNGICinZMjm7I7mCxb8g_4gPBlb';
const ENV_KEY = import.meta.env?.VITE_LLM_API_KEY || ENV_MISTRAL_KEY;
const ENV_PROVIDER = import.meta.env?.VITE_LLM_PROVIDER || 'mistral';
const ENV_MODEL = import.meta.env?.VITE_LLM_MODEL || 'mistral-small-latest';
const ENV_BASE_URL = import.meta.env?.VITE_LLM_BASE_URL || '';

export const storageService = {
  // Consumer User Authentication
  getConsumerUser: () => {
    try {
      const data = localStorage.getItem(CONSUMER_USER_STORAGE);
      if (data) {
        return JSON.parse(data);
      }
    } catch (e) {
      console.error('Failed to parse consumer user', e);
    }
    return null;
  },

  saveConsumerUser: (user) => {
    try {
      if (user) {
        localStorage.setItem(CONSUMER_USER_STORAGE, JSON.stringify(user));
      } else {
        localStorage.removeItem(CONSUMER_USER_STORAGE);
      }
    } catch (e) {
      console.error('Failed to save consumer user', e);
    }
  },

  removeConsumerUser: () => {
    localStorage.removeItem(CONSUMER_USER_STORAGE);
  },

  // Consumer Bookmarks
  getConsumerBookmarks: () => {
    try {
      const data = localStorage.getItem(CONSUMER_BOOKMARKS_STORAGE);
      if (data) {
        return JSON.parse(data);
      }
    } catch (e) {
      console.error('Failed to parse consumer bookmarks', e);
    }
    return [];
  },

  saveConsumerBookmarks: (bookmarks) => {
    try {
      localStorage.setItem(CONSUMER_BOOKMARKS_STORAGE, JSON.stringify(bookmarks));
    } catch (e) {
      console.error('Failed to save consumer bookmarks', e);
    }
  },

  // API Key
  getApiKey: () => {
    const saved = localStorage.getItem(API_KEY_STORAGE);
    if (saved && saved.trim() && saved.trim() !== 'AQ.Ab8RN6JEV50Xy9NoYFNdZ_385D_-s2SChBylj9b-xFgjcmCwWA') {
      return saved.trim();
    }
    const prov = storageService.getProvider();
    if (prov === 'mistral' || !saved) return ENV_MISTRAL_KEY;
    return ENV_KEY || ENV_MISTRAL_KEY;
  },

  getMistralApiKey: () => {
    return ENV_MISTRAL_KEY;
  },

  setApiKey: (key) => {
    if (key) {
      localStorage.setItem(API_KEY_STORAGE, key.trim());
    } else {
      localStorage.removeItem(API_KEY_STORAGE);
    }
  },

  // Provider ('gemini' | 'mistral' | 'openai')
  getProvider: () => {
    const saved = localStorage.getItem(PROVIDER_STORAGE);
    if (saved && (saved === 'mistral' || saved === 'openai' || saved === 'gemini')) {
      return saved;
    }
    return ENV_PROVIDER || 'mistral';
  },

  setProvider: (provider) => {
    localStorage.setItem(PROVIDER_STORAGE, provider);
  },

  // Model Name
  getModel: () => {
    return localStorage.getItem(MODEL_STORAGE) || ENV_MODEL || 'mistral-small-latest';
  },

  setModel: (model) => {
    localStorage.setItem(MODEL_STORAGE, model);
  },

  // Base URL
  getBaseUrl: () => {
    return localStorage.getItem(BASE_URL_STORAGE) || ENV_BASE_URL || '';
  },

  setBaseUrl: (url) => {
    if (url) {
      localStorage.setItem(BASE_URL_STORAGE, url.trim());
    } else {
      localStorage.removeItem(BASE_URL_STORAGE);
    }
  },

  // Language
  getLanguage: () => {
    return localStorage.getItem('language') || localStorage.getItem(APP_LANG_STORAGE) || 'en';
  },

  setLanguage: (lang) => {
    localStorage.setItem('language', lang);
    localStorage.setItem(APP_LANG_STORAGE, lang);
  },

  // Chat sessions
  getSessions: () => {
    try {
      const data = localStorage.getItem(CHAT_SESSIONS_KEY);
      if (data) {
        return JSON.parse(data);
      }
    } catch (e) {
      console.error('Failed to parse chat sessions', e);
    }
    return [];
  },

  saveSessions: (sessions) => {
    try {
      localStorage.setItem(CHAT_SESSIONS_KEY, JSON.stringify(sessions));
    } catch (e) {
      console.error('Failed to save chat sessions', e);
    }
  },

  getActiveSessionId: () => {
    return localStorage.getItem(ACTIVE_SESSION_KEY) || null;
  },

  setActiveSessionId: (id) => {
    if (id) {
      localStorage.setItem(ACTIVE_SESSION_KEY, id);
    } else {
      localStorage.removeItem(ACTIVE_SESSION_KEY);
    }
  },

  createNewSession: (language = 'en') => {
    const welcomeMessages = {
      en: "🙏 **Namaste! Welcome to AI SATHI — Official Assistant for Bureau of Indian Standards (BIS).**\n\nI can assist you with:\n- **Indian Standards (IS Codes):** Specifications, test parameters, and mandatory QCOs\n- **Product Certification:** ISI Mark (Scheme-I), Compulsory Registration (CRS), FMCS\n- **Hallmarking & Purity:** 6-digit HUID code, 22K (916) / 18K (750) purity validation\n- **Laboratories & Testing:** BIS Central Lab (Sahibabad) and Regional Testing Centers\n- **Consumer Rights & Verification:** License verification and reporting substandard quality.\n\nHow may I assist you with standards and certification today?",
      hi: "🙏 **नमस्ते! AI SATHI (बीआईएस सहायक) में आपका स्वागत है — भारतीय मानक ब्यूरो का आधिकारिक पोर्टल।**\n\nमैं आपकी निम्नलिखित विषयों में सहायता कर सकता हूँ:\n- **भारतीय मानक (IS कोड):** विनिर्देश, परीक्षण पैरामीटर और अनिवार्य गुणवत्ता नियंत्रण आदेश (QCOs)\n- **प्रमाणन योजनाएं:** आईएसआई मार्क (योजना-I), अनिवार्य पंजीकरण योजना (CRS), विदेशी निर्माता योजना (FMCS)\n- **हॉलमार्किंग एवं शुद्धता:** 6-अंकीय HUID कोड, 22K (916) / 18K (750) शुद्धता सत्यापन\n- **प्रयोगशालाएं एवं परीक्षण:** बीआईएस केंद्रीय प्रयोगशाला (साहिबाबाद) और क्षेत्रीय परीक्षण केंद्र\n- **उपभोक्ता अधिकार:** लाइसेंस जांच और नकली आईएसआई की पहचान।\n\nआज मैं आपकी क्या सहायता कर सकता हूँ?",
      mr: "🙏 **नमस्ते! AI SATHI मध्ये आपले स्वागत आहे — भारतीय मानक ब्युरो (BIS) चे अधिकृत सहाय्यक.**\n\nमी तुम्हाला मानके, आयएसआय मार्क, हॉलमार्किंग आणि प्रयोगशाळा चाचण्यांबाबत संपूर्ण माहिती देऊ शकतो. आज मी तुम्हाला कशी मदत करू शकेन?",
      ta: "🙏 **வணக்கம்! AI SATHI க்கு வரவேற்கிறோம் — இந்திய தர நிர்ணய பணியகத்தின் (BIS) அதிகாரப்பூர்வ உதவியாளர்.**\n\nஇந்திய தரநிலைகள் (IS), ISI முத்திரை, தங்க ஹால்மார்க்கிங் மற்றும் ஆய்வகங்கள் குறித்து நான் உங்களுக்கு உதவ முடியும். நான் உங்களுக்கு எவ்வாறு உதவ வேண்டும்?",
      te: "🙏 **నమస్తే! AI SATHI కి స్వాగతం — బ్యూరో ఆఫ్ ఇండియన్ స్టాండర్డ్స్ (BIS) అధికారిక అసిస్టెంట్.**\n\nభారతీయ ప్రమాణాలు, ISI మార్క్, గోల్డ్ హాల్‌మార్కింగ్ మరియు ప్రయోగశాలల గురించి నేను మీకు మార్గనిర్దేశం చేయగలను. నేను మీకు ఎలా సహాయపడగలను?",
      bn: "🙏 **নমস্কার! AI SATHI তে আপনাকে স্বাগতম — ব্যুরো অফ ইন্ডিয়ান স্ট্যান্ডার্ডস অফিসিয়াল সহায়ক।**\n\nভারতীয় মান (IS Codes), আইএসআই মার্ক এবং স্বর্ণ হলমার্কিং সম্পর্কিত তথ্যের জন্য জিজ্ঞাসা করুন। আজ আপনাকে কীভাবে সাহায্য করতে পারি?",
      gu: "🙏 **નમસ્તે! AI SATHI માં આપનું સ્વાગત છે — બ્યુરો ઓફ ઇન્ડિયન સ્ટાન્ડર્ડ્સ સહાયક.**\n\nભારતીય ધોરણો, ISI માર્ક, ગોલ્ડ હોલમાર્કિંગ અને લેબોરેટરીઓ વિશે પૂછો. હું તમારી કેવી રીતે મદદ કરી શકું?"
    };

    const newSession = {
      id: 'session_' + Date.now() + '_' + Math.random().toString(36).substring(2, 7),
      title: 'New Inquiry',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      messages: [
        {
          id: 'msg_welcome_' + Date.now(),
          role: 'assistant',
          content: welcomeMessages[language] || welcomeMessages.en,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          verified: true
        }
      ]
    };
    return newSession;
  },

  exportHistory: () => {
    const sessions = storageService.getSessions();
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(sessions, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `bis_saathi_inquiries_${new Date().toISOString().slice(0, 10)}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  }
};
