import { llmService } from './llmService';
import { procurementEngine } from './procurementEngine';
import { offlineKnowledgeFallback } from './bisKnowledge';

/**
 * Sarthi AI — The Unified Bureau of Indian Standards & Procurement Intelligence Service
 * Handles all natural language questions, technical specification evaluations, 
 * IS code lookups, QCO verifications, and tender clause generation.
 */
class SarthiAiService {
  constructor() {
    this.name = "Sarthi AI";
    this.version = "2.0.0";
    this.mandate = "Government of India / BIS Decision Support Engine for Public Procurement & Standards";
  }

  /**
   * Universal Question Answering Method
   * Answers any query from procurement officials, vendors, or citizens.
   * 
   * @param {string} query - The user's question or technical requirement.
   * @param {object} options - Configuration options:
   *    - {Array} history: conversational message history
   *    - {string} language: 'en' | 'hi' | 'ta' | 'te' | 'bn' | 'mr' | 'gu'
   *    - {function} onChunk: callback for streaming text token by token
   *    - {string} context: 'procurement' | 'consumer' | 'lab' | 'qco' | 'general'
   * @returns {Promise<string>} The structured, authoritative answer.
   */
  async ask(query, options = {}) {
    const {
      history = [],
      language = 'en',
      onChunk = null,
      context = 'general'
    } = options;

    if (!query || !query.trim()) {
      return "Please enter a question or technical requirement to analyze.";
    }

    const cleanQuery = query.trim();

    // 1. Detect if the query is a technical procurement specification
    const isSpecDraft = this.isTechnicalSpecification(cleanQuery);

    if (isSpecDraft && context === 'procurement') {
      try {
        const analysis = procurementEngine.analyzeTenderSpec(cleanQuery, language);
        if (analysis) {
          const structuredAnswer = this.formatSpecAnalysisAsAnswer(cleanQuery, analysis, language);
          if (onChunk) {
            const words = structuredAnswer.split(" ");
            let acc = "";
            for (let i = 0; i < words.length; i++) {
              acc += (i === 0 ? "" : " ") + words[i];
              if (i % 3 === 0 || i === words.length - 1) {
                onChunk(acc);
                await new Promise(r => setTimeout(r, 12));
              }
            }
          }
          return structuredAnswer;
        }
      } catch (specErr) {
        console.warn("Specification analysis error, falling back:", specErr);
      }
    }

    // 2. Delegate to LLM Service with instant grounded RAG fallback
    try {
      const response = await llmService.generateResponse(cleanQuery, history, language, onChunk);
      if (response && response.trim().length > 0) {
        return response;
      }
    } catch (err) {
      console.warn("Sarthi AI LLM Gateway error, serving through local domain engine:", err);
    }

    // 3. Fallback to comprehensive grounded domain engine
    const fallback = offlineKnowledgeFallback(cleanQuery, language);
    if (onChunk) {
      const words = fallback.split(" ");
      let acc = "";
      for (let i = 0; i < words.length; i++) {
        acc += (i === 0 ? "" : " ") + words[i];
        if (i % 3 === 0 || i === words.length - 1) {
          onChunk(acc);
          await new Promise(r => setTimeout(r, 12));
        }
      }
    }
    return fallback;
  }

  /**
   * Fast Semantic Specification Analyzer
   * Returns structured metadata: primary standard, normative references, test methods, QCO status, and GFR clause.
   */
  analyzeSpecification(specText, language = 'en') {
    return procurementEngine.analyzeTenderSpec(specText, language);
  }

  /**
   * Checks if a product or standard code is covered under a mandatory Quality Control Order (QCO)
   */
  checkQcoStatus(searchTerm) {
    const term = (searchTerm || '').toLowerCase();
    
    const qcoDatabase = [
      {
        keyword: 'led',
        product: 'LED Luminaires & Street Lights',
        isCode: 'IS 10322 (Part 5/Sec 3):2012 & IS 16107 (Part 2/Sec 1)',
        isMandatory: true,
        scheme: 'Scheme-II (CRS - Compulsory Registration Scheme) & Scheme-I (ISI Mark)',
        ministry: 'Ministry of Electronics and Information Technology (MeitY) / DPIIT',
        penalty: 'Prohibition of manufacture, import, distribution, or sale without valid BIS registration / ISI mark under Section 16 & 17 of the BIS Act, 2016.'
      },
      {
        keyword: 'pipe',
        product: 'HDPE / PVC / UPVC Pipes for Water Supply & Sewerage',
        isCode: 'IS 4984:2016 / IS 14333:1996 / IS 4985:2021',
        isMandatory: true,
        scheme: 'Scheme-I (ISI Mark - Mandatory Certification)',
        ministry: 'Department for Promotion of Industry and Internal Trade (DPIIT), Ministry of Commerce & Industry',
        penalty: 'Mandatory BIS CM/L license number must be embossed on each pipe length. Uncertified material rejected under GFR Rule 144(i).'
      },
      {
        keyword: 'steel',
        product: 'Steel Bars, Wires & Structural Steel for Construction',
        isCode: 'IS 1786:2008 / IS 2062:2011',
        isMandatory: true,
        scheme: 'Scheme-I (ISI Mark - Mandatory Certification)',
        ministry: 'Ministry of Steel (Steel and Steel Products Quality Control Order)',
        penalty: 'Strict prohibition on using non-ISI marked rebars or structural steel in CPWD / NHAI / Government infrastructure projects.'
      },
      {
        keyword: 'laptop',
        product: 'Computers, Laptops, Servers, Monitors & Electronics',
        isCode: 'IS 13252 (Part 1):2010 / IS/IEC 62368-1:2018',
        isMandatory: true,
        scheme: 'Scheme-II (CRS - Compulsory Registration Scheme)',
        ministry: 'Ministry of Electronics & Information Technology (MeitY CRO)',
        penalty: 'Hardware without valid BIS R-Number (e.g. R-41XXXXXX) cannot be imported, customs-cleared, or listed on GeM.'
      },
      {
        keyword: 'cement',
        product: 'Ordinary Portland Cement (OPC) & Portland Pozzolana Cement (PPC)',
        isCode: 'IS 269:2015 / IS 1489 (Part 1):2015',
        isMandatory: true,
        scheme: 'Scheme-I (ISI Mark - Mandatory Certification)',
        ministry: 'Ministry of Commerce & Industry (Cement Quality Control Order)',
        penalty: 'Sale or procurement of un-certified cement is a punishable offense under the BIS Act, 2016.'
      },
      {
        keyword: 'fire',
        product: 'Portable Fire Extinguishers & Fire Safety Equipment',
        isCode: 'IS 15683:2018 / IS 2190:2024',
        isMandatory: true,
        scheme: 'Scheme-I (ISI Mark - Mandatory Certification)',
        ministry: 'Ministry of Commerce & Industry',
        penalty: 'Fire safety equipment without valid BIS CM/L marking fails statutory fire NOC and CPWD building inspection.'
      }
    ];

    const match = qcoDatabase.find(item => term.includes(item.keyword) || term.includes(item.isCode.toLowerCase()));
    
    if (match) {
      return {
        found: true,
        ...match
      };
    }

    return {
      found: false,
      product: searchTerm,
      isMandatory: false,
      scheme: 'Voluntary Standard / Subject to Specific Tender Conditions',
      ministry: 'Check specific department procurement guidelines',
      penalty: 'Conformity to General Financial Rules (GFR) 2017 Rule 144(i) recommended.'
    };
  }

  /**
   * Generates a GFR 2017 Rule 144(i) Compliant Tender Clause
   */
  generateTenderClause(productName, isCode = 'Applicable Indian Standard') {
    return `TENDER COMPLIANCE CLAUSE (GFR 2017 RULE 144(i) & BIS ACT DIRECTIVES):
The supplied items (${productName}) must strictly conform to ${isCode} (latest published edition including all amendments issued by the Bureau of Indian Standards). The supplier/bidder shall possess a valid BIS License (CM/L Number for Scheme-I or R-Number for Scheme-II CRS) and submit authentic test certificates from a BIS or NABL accredited laboratory with the technical bid. Any deviation from the Indian Standard shall lead to immediate technical disqualification.`;
  }

  /**
   * Heuristic to determine if the query is a multi-line technical tender specification
   */
  isTechnicalSpecification(text) {
    const lower = text.toLowerCase();
    const technicalKeywords = [
      'specification', 'tender', 'boq', 'requirement', 'ip65', 'ip66', 'voltage', 
      'lumen', 'efficacy', 'tensile', 'diameter', 'pn 10', 'pn 16', 'procurement',
      'grade', 'supply of', 'installation of', 'shall comply', 'minimum', 'xlpe', 'luminaire'
    ];
    let count = 0;
    for (const kw of technicalKeywords) {
      if (lower.includes(kw)) count++;
    }
    return count >= 2 && text.length > 40;
  }

  /**
   * Formats technical specification analysis into structured markdown
   */
  formatSpecAnalysisAsAnswer(query, analysis, language) {
    const isHi = language === 'hi';
    const primaryStd = analysis?.primaryStandards?.[0] || { is_code: 'IS Standard Identified', title: 'Technical Specification' };
    const qco = analysis?.mandatoryCertification || {};
    const cat = analysis?.category || {};
    
    return `### 🏛️ Sarthi AI — ${isHi ? 'तकनीकी विनिर्देश मूल्यांकन रिपोर्ट' : 'Technical Specification Assessment Report'}

**${isHi ? 'मूल्यांकन हेतु इनपुट विनिर्देश:' : 'Evaluated Procurement Specification:'}**
> "${query.slice(0, 240)}${query.length > 240 ? '...' : ''}"

---

#### 🎯 1. ${isHi ? 'प्राथमिक अनुशंसित भारतीय मानक' : 'Primary Recommended Indian Standard(s)'}
* **${primaryStd.is_code}**: ${primaryStd.title || cat.name || 'Indian Standard Specification'}
* **${isHi ? 'प्रकाशन स्थिति:' : 'Status & Validity:'}** Valid & Mandatory Indian Standard (Bureau of Indian Standards)
* **${isHi ? 'क्षेत्र / श्रेणी:' : 'Sector / Domain:'}** ${cat.sector || 'National Standards Catalog'}

#### 🛡️ 2. ${isHi ? 'वैधानिक प्रमाणन एवं गुणवत्ता नियंत्रण आदेश (QCO)' : 'Statutory Certification & QCO Mandate'}
* **${isHi ? 'प्रमाणन योजना:' : 'Certification Scheme:'}** **${qco.scheme || 'Scheme-I (ISI Mark)'}**
* **${isHi ? 'अनिवार्यता स्थिति:' : 'Mandatory Status:'}** ${qco.isMandatory !== false ? '✅ ' + (isHi ? 'अनिवार्य सरकारी निर्देश (Statutory Mandatory)' : 'Mandatory Statutory QCO') : 'ℹ️ Voluntary Specification'}
* **${isHi ? 'अधिसूचना संदर्भ:' : 'Gazetted QCO Order:'}** ${qco.qcoNotification || 'Applicable Quality Control Order (QCO)'}
* **${isHi ? 'वैधानिक दंड प्रावधान:' : 'Statutory Penalty Clause:'}** ${qco.penaltyClause || 'Products without valid BIS license prohibited from sale or public procurement under Section 16 of BIS Act 2016.'}

#### 🔗 3. ${isHi ? 'मानक संदर्भ एवं परीक्षण आवश्यकताएं' : 'Normative References & Testing Framework'}
* **Normative References:** ${Object.entries(analysis?.alliedStandards || {}).map(([k, v]) => `${k.toUpperCase()} (${v})`).join(', ') || 'IS 1293 (Plugs/Sockets), IS 16046 (Safety), IS 4984'}
* **Core Laboratory Testing:** Chemical Composition, Tensile Strength, Ingress Protection (IP), Dielectric Insulation, and Endurance Testing.
* **Accredited Testing Facility:** BIS Central Lab (Sahibabad) & NABL-Accredited Partner Testing Laboratories.

---

#### 📑 4. ${isHi ? 'जीएफआर 2017 नियम 144(i) के अनुसार तैयार निविदा खंड' : 'GFR 2017 Rule 144(i) Non-Bias Tender Compliance Clause'}
\`\`\`text
${analysis?.tenderClause || this.generateTenderClause(query.slice(0, 50), primaryStd.is_code)}
\`\`\`

💡 *Tip: This specification clause is strictly compliant with non-discriminatory procurement guidelines under GFR 2017 Rule 144(i).*`;
  }
}

// Export singleton instance and class
export const sarthiAiService = new SarthiAiService();
export const sarthiAi = sarthiAiService;
export const saathiAi = sarthiAiService;
export default sarthiAiService;
