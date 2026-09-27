import { bisSystemPrompt, offlineKnowledgeFallback } from './bisKnowledge';
import { storageService } from './storageService';

export const llmService = {
  /**
   * Tests the configured API key with a minimal ping.
   * Returns { success: boolean, message: string }
   */
  testConnection: async (apiKey, provider = 'gemini', model = '', baseUrl = '') => {
    if (!apiKey) {
      return { success: false, message: 'Please enter an API key.' };
    }

    const isMistral = provider === 'mistral' || apiKey.startsWith('mstrl_');

    try {
      if (provider === 'gemini' && !isMistral) {
        const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/${model || 'gemini-1.5-flash'}:generateContent?key=${apiKey}`;
        const response = await fetch(endpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [{ role: 'user', parts: [{ text: 'ping' }] }],
            generationConfig: { maxOutputTokens: 5 }
          })
        });

        if (response.ok) {
          return { success: true, message: 'Gemini API Connected Successfully!' };
        } else {
          const err = await response.json().catch(() => ({}));
          const errMsg = err.error?.message || `HTTP ${response.status}: ${response.statusText}`;
          return { success: false, message: errMsg };
        }
      } else if (isMistral) {
        // Mistral AI API endpoint
        const targetUrl = 'https://api.mistral.ai/v1/chat/completions';
        const response = await fetch(targetUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${apiKey}`
          },
          body: JSON.stringify({
            model: model || 'mistral-small-latest',
            messages: [{ role: 'user', content: 'ping' }],
            max_tokens: 5
          })
        });

        if (response.ok) {
          return { success: true, message: 'Mistral AI API Connected Successfully!' };
        } else {
          const err = await response.json().catch(() => ({}));
          const errMsg = err.message || err.error?.message || `HTTP ${response.status}: ${response.statusText}`;
          return { success: false, message: errMsg };
        }
      } else {
        // OpenAI / Groq / OpenAI-compatible endpoint
        const targetUrl = (baseUrl ? baseUrl.replace(/\/$/, '') : 'https://api.openai.com/v1') + '/chat/completions';
        const response = await fetch(targetUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${apiKey}`
          },
          body: JSON.stringify({
            model: model || 'gpt-4o-mini',
            messages: [{ role: 'user', content: 'ping' }],
            max_tokens: 5
          })
        });

        if (response.ok) {
          return { success: true, message: 'OpenAI-Compatible API Connected Successfully!' };
        } else {
          const err = await response.json().catch(() => ({}));
          const errMsg = err.error?.message || `HTTP ${response.status}: ${response.statusText}`;
          return { success: false, message: errMsg };
        }
      }
    } catch (e) {
      return { success: false, message: e.message || 'Network connection failed.' };
    }
  },

  /**
   * Generates AI-powered Indian Standard recommendations for any product or tender requirement.
   * Returns a parsed JSON object matching the procurement recommendation schema.
   */
  generateStructuredStandardRecommendations: async (query, language = 'en') => {
    if (!query || !query.trim()) return null;

    let apiKey = storageService.getApiKey();
    let provider = storageService.getProvider();
    let model = storageService.getModel();
    const mistralKey = storageService.getMistralApiKey();

    const systemPrompt = `You are the official Bureau of Indian Standards (BIS) AI recommendation engine.
Analyze the user's product description or tender technical requirement and recommend the exact applicable Indian Standards (IS Codes), mandatory Quality Control Order (QCO) requirements, 10-dimensional semantic analysis breakdown, detected specification ambiguities, normative references, test methods, and a tender compliance clause.

Return ONLY a valid JSON object (no extra commentary) with the following structure:
{
  "productType": "Standardized product name",
  "confidence": 96,
  "category": {
    "name": "Standardized Product / Category Name",
    "sector": "BIS Department / Division (e.g. Civil CED, Mechanical MED, Electrotechnical ETD, Chemical CHED, Textile TXD, Food FAD)",
    "mandatoryCertification": {
      "isMandatory": true,
      "scheme": "Scheme-I (ISI Mark) / Scheme-II (CRS)",
      "qcoNotification": "Title or reference of the applicable Quality Control Order",
      "gazetteRef": "S.O. Gazette Notification Ref",
      "penaltyClause": "Conformity assessment clause under Section 16/17 of the BIS Act 2016 and GFR Rule 144(i)"
    }
  },
  "semanticDimensions": {
    "productType": "Specific product category",
    "intendedUse": "Intended technical application and operating domain",
    "material": "Material composition and grade (e.g. Grade 304, PE-100, Fe 500D)",
    "dimensionsSpecs": "Key dimensional tolerances, ratings, or capacities",
    "performanceReq": "Critical performance metrics, thresholds, or strength",
    "applicationEnv": "Environmental exposure, IP rating, or temperature rating",
    "safetyReq": "Mandatory safety, health, or non-toxicity requirements",
    "manufacturing": "Manufacturing process requirements",
    "testingRoadmap": "NABL / BIS laboratory testing protocol",
    "certificationQco": "Quality Control Order mandate summary"
  },
  "primaryStandards": [
    {
      "is_code": "IS XXXX:YEAR",
      "title": "Full Official Title of the Primary Indian Standard",
      "year": "Publication Year (e.g. 2016, 2021, 2023)",
      "reaffirmed": "Reaffirmation Year",
      "amendments": "Amendments details (e.g. Latest amendments incorporated)",
      "active_status": "Active & Valid",
      "summary": "Concise summary of standard scope, material grades, and specifications."
    }
  ],
  "alliedStandards": {
    "normativeReferences": [
      { "is_code": "IS YYYY:YEAR", "title": "Standard Title", "relevance": "Clause connection explanation" }
    ],
    "testMethods": [
      { "is_code": "IS ZZZZ:YEAR", "title": "Test Standard Title", "test_type": "Specific test parameter (e.g. Tensile, Migration, Hydrostatic)" }
    ],
    "terminologyAndClassification": [
      { "is_code": "IS AAAA:YEAR", "title": "Glossary / Terminology Title", "scope": "Definitions" }
    ],
    "safetyAndEnvironment": [
      { "is_code": "IS BBBB:YEAR", "title": "Safety / Environmental Standard", "rationale": "Safety compliance" }
    ],
    "installationAndCodeOfPractice": [
      { "is_code": "IS CCCC:YEAR", "title": "Installation / Code of Practice", "scope": "Site installation" }
    ]
  },
  "ambiguityAnalysis": [
    {
      "parameter": "Missing / Ambiguous technical parameter in user prompt",
      "severity": "high",
      "issue": "Explanation of the risk in tender",
      "recommendation": "Exact clause or parameter recommendation"
    }
  ],
  "tenderClause": "Complete, legally-sound procurement specification clause mandating the specified IS codes, ISI mark, and NABL test certificate under GFR Rule 144(i)."
}`;

    const userPrompt = `Product / Tender Requirement: "${query}"\nLanguage: ${language}\nGenerate full structured recommendation.`;

    // 1. Try Mistral AI API first (excellent JSON mode & speed)
    const activeMistralKey = mistralKey || (apiKey && apiKey.startsWith('mstrl_') ? apiKey : 'mstrl_JrYhBG4ZdTrJrNGICinZMjm7I7mCxb8g_4gPBlb');
    if (activeMistralKey) {
      try {
        const response = await fetch('https://api.mistral.ai/v1/chat/completions', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${activeMistralKey}`
          },
          body: JSON.stringify({
            model: 'mistral-small-latest',
            messages: [
              { role: 'system', content: systemPrompt },
              { role: 'user', content: userPrompt }
            ],
            temperature: 0.1,
            response_format: { type: 'json_object' }
          })
        });

        if (response.ok) {
          const data = await response.json();
          const content = data.choices?.[0]?.message?.content;
          if (content) {
            const parsed = JSON.parse(content);
            if (parsed && (parsed.primaryStandards?.length > 0 || parsed.productType)) {
              return parsed;
            }
          }
        }
      } catch (e) {
        console.warn('Mistral AI recommendation attempt failed, trying alternate provider...', e);
      }
    }

    // 2. Try Gemini API
    const geminiKey = (apiKey && !apiKey.startsWith('mstrl_')) ? apiKey : 'AQ.Ab8RN6JEV50Xy9NoYFNdZ_385D_-s2SChBylj9b-xFgjcmCwWA';
    if (geminiKey) {
      try {
        const geminiModel = model || import.meta.env?.VITE_GEMINI_MODEL || 'gemini-3.8-flash';
        const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/${geminiModel}:generateContent?key=${geminiKey}`;
        const response = await fetch(endpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [
              {
                role: 'user',
                parts: [{ text: `${systemPrompt}\n\n${userPrompt}` }]
              }
            ],
            generationConfig: {
              temperature: 0.1,
              responseMimeType: 'application/json'
            }
          })
        });

        if (response.ok) {
          const data = await response.json();
          const text = data.candidates?.[0]?.content?.parts?.[0]?.text;
          if (text) {
            const cleanJson = text.replace(/^```json\s*/, '').replace(/```\s*$/, '').trim();
            const parsed = JSON.parse(cleanJson);
            if (parsed && (parsed.primaryStandards?.length > 0 || parsed.productType)) {
              return parsed;
            }
          }
        }
      } catch (e) {
        console.warn('Gemini API recommendation attempt failed:', e);
      }
    }

    return null;
  },

  /**
   * Generates response from LLM API (Google Gemini, Mistral AI, or OpenAI compatible)
   * with automatic failover and fallback to the BIS offline knowledge engine.
   */
  generateResponse: async (prompt, history = [], language = 'en', onChunk = null) => {
    const envGeminiKey = import.meta.env?.VITE_GEMINI_API_KEY || import.meta.env?.VITE_LLM_API_KEY || '';
    const envMistralKey = import.meta.env?.VITE_MISTRAL_API_KEY || '';
    const envProvider = import.meta.env?.VITE_LLM_PROVIDER || 'gemini';
    const envGeminiModel = import.meta.env?.VITE_GEMINI_MODEL || 'gemini-3.8-flash';

    const savedProvider = storageService.getProvider();
    const provider = savedProvider || envProvider || 'gemini';

    // Build conversation history for both APIs
    const recentHistory = history.slice(-6).filter(m => m.content && m.content.trim());

    // ============================================================
    // 1. Try GEMINI API first (Primary Engine when provider=gemini)
    // ============================================================
    const geminiKey = envGeminiKey;
    if (geminiKey && geminiKey.length > 10 && !geminiKey.startsWith('mstrl_')) {
      try {
        // Use gemini-3.8-flash (latest available model)
        const geminiModel = envGeminiModel;
        const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/${geminiModel}:streamGenerateContent?alt=sse&key=${geminiKey}`;

        // Build Gemini conversation format
        const contents = [];

        // Add history
        for (const msg of recentHistory) {
          contents.push({
            role: msg.role === 'assistant' ? 'model' : 'user',
            parts: [{ text: msg.content }]
          });
        }

        // Add current user prompt
        contents.push({
          role: 'user',
          parts: [{ text: prompt }]
        });

        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 30000);

        const response = await fetch(endpoint, {
          method: 'POST',
          signal: controller.signal,
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            systemInstruction: {
              parts: [{ text: `${bisSystemPrompt}\n\nUser Preferred Language: ${language}. Always cite relevant Indian Standards (IS numbers) where applicable.` }]
            },
            contents,
            generationConfig: {
              temperature: 0.3,
              maxOutputTokens: 4096
            }
          })
        });

        clearTimeout(timeoutId);

        if (response.ok && response.body) {
          const reader = response.body.getReader();
          const decoder = new TextDecoder("utf-8");
          let fullText = "";
          let buffer = "";

          while (true) {
            const { done, value } = await reader.read();
            if (done) break;

            buffer += decoder.decode(value, { stream: true });
            const lines = buffer.split("\n");
            buffer = lines.pop() || "";

            for (const line of lines) {
              if (line.startsWith("data: ")) {
                try {
                  const json = JSON.parse(line.substring(6));
                  const textPart = json.candidates?.[0]?.content?.parts?.[0]?.text;
                  if (textPart) {
                    fullText += textPart;
                    if (onChunk) onChunk(fullText);
                  }
                } catch (e) { /* skip malformed chunks */ }
              }
            }
          }

          // Process any remaining buffer
          if (buffer.startsWith("data: ")) {
            try {
              const json = JSON.parse(buffer.substring(6));
              const textPart = json.candidates?.[0]?.content?.parts?.[0]?.text;
              if (textPart) {
                fullText += textPart;
                if (onChunk) onChunk(fullText);
              }
            } catch (e) { }
          }

          if (fullText.trim().length > 0) return fullText;
        } else {
          const errData = await response.json().catch(() => ({}));
          console.warn('Gemini API error:', response.status, errData.error?.message || response.statusText);
        }
      } catch (err) {
        console.warn('Gemini streaming error, falling back to Mistral:', err.message);
      }
    }

    // ============================================================
    // 2. Fallback to Mistral AI 
    // ============================================================
    const activeMistralKey = envMistralKey || storageService.getMistralApiKey();
    if (activeMistralKey && activeMistralKey.length > 15) {
      try {
        const targetUrl = 'https://api.mistral.ai/v1/chat/completions';
        const messages = [
          { role: "system", content: `${bisSystemPrompt}\n\nUser Preferred Language: ${language}. Always cite relevant Indian Standards (IS numbers) where applicable.` }
        ];

        for (const msg of recentHistory) {
          messages.push({
            role: msg.role === 'assistant' ? 'assistant' : 'user',
            content: msg.content
          });
        }

        messages.push({ role: "user", content: prompt });

        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 15000);

        const response = await fetch(targetUrl, {
          method: 'POST',
          signal: controller.signal,
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${activeMistralKey}`
          },
          body: JSON.stringify({
            model: 'mistral-small-latest',
            messages,
            temperature: 0.25,
            max_tokens: 2048,
            stream: true
          })
        });

        clearTimeout(timeoutId);

        if (response.ok && response.body) {
          const reader = response.body.getReader();
          const decoder = new TextDecoder("utf-8");
          let fullText = "";

          while (true) {
            const { done, value } = await reader.read();
            if (done) break;

            const chunk = decoder.decode(value, { stream: true });
            const lines = chunk.split("\n");

            for (const line of lines) {
              if (line.startsWith("data: ") && line !== "data: [DONE]") {
                try {
                  const json = JSON.parse(line.substring(6));
                  const textPart = json.choices?.[0]?.delta?.content;
                  if (textPart) {
                    fullText += textPart;
                    if (onChunk) onChunk(fullText);
                  }
                } catch (e) { }
              }
            }
          }

          if (fullText.trim().length > 0) return fullText;
        }
      } catch (err) {
        console.warn('Mistral live stream notice:', err.message);
      }
    }

    // ============================================================
    // 3. Offline domain fallback with smooth token streaming
    // ============================================================
    const fallbackContent = offlineKnowledgeFallback(prompt, language);
    let streamedText = "";

    const words = fallbackContent.split(" ");
    for (let i = 0; i < words.length; i++) {
      streamedText += (i === 0 ? "" : " ") + words[i];
      if (onChunk && (i % 3 === 0 || i === words.length - 1)) {
        onChunk(streamedText);
        await new Promise((r) => setTimeout(r, 12));
      }
    }

    if (onChunk) onChunk(fallbackContent);
    return fallbackContent;
  }
};
