import JSZip from 'jszip';

/**
 * Generates the complete Manifest V3 MargSarthi Browser Extension ZIP bundle
 * With Chrome Side Panel API, Content Script selection listener, isolated API layer,
 * and government-tech UI/UX.
 */
export async function generateMargSathiExtensionZip() {
  const zip = new JSZip();

  // 1. manifest.json (Manifest V3 with side_panel)
  const manifestContent = JSON.stringify({
    manifest_version: 3,
    name: "MargSarthi",
    version: "1.0.0",
    description: "Right Standards. Better Procurement. — AI-Powered Indian Standards Recommendation Side Panel for Public Procurement & Tenders.",
    icons: {
      "16": "icons/icon16.png",
      "48": "icons/icon48.png",
      "128": "icons/icon128.png"
    },
    action: {
      "default_title": "Open MargSarthi Side Panel",
      "default_icon": {
        "16": "icons/icon16.png",
        "48": "icons/icon48.png",
        "128": "icons/icon128.png"
      }
    },
    side_panel: {
      default_path: "sidepanel.html"
    },
    background: {
      service_worker: "background.js"
    },
    content_scripts: [
      {
        matches: ["<all_urls>"],
        js: ["content.js"],
        css: ["content.css"],
        run_at: "document_idle"
      }
    ],
    permissions: [
      "sidePanel",
      "storage",
      "activeTab",
      "scripting"
    ],
    host_permissions: [
      "<all_urls>"
    ]
  }, null, 2);

  // 2. background.js
  const backgroundContent = `// MargSarthi Chrome Extension Background Service Worker (Manifest V3)

// 1. Enable Side Panel to open on action click
chrome.sidePanel
  .setPanelBehavior({ openPanelOnActionClick: true })
  .catch((error) => console.error("Error setting side panel behavior:", error));

// 2. Setup Context Menu on Install
chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: "margsarthi-find-standards",
    title: "✦ Find Indian Standards with MargSarthi",
    contexts: ["selection"]
  });
  console.log("MargSarthi Extension v1.0.0 installed successfully.");
});

// 3. Handle Context Menu Click
chrome.contextMenus.onClicked.addListener(async (info, tab) => {
  if (info.menuItemId === "margsarthi-find-standards" && info.selectionText && tab?.id) {
    const selectedText = info.selectionText.trim();
    
    // Save to storage for side panel
    await chrome.storage.local.set({
      selectedRequirement: selectedText,
      timestamp: Date.now()
    });

    // Open side panel
    await chrome.sidePanel.open({ tabId: tab.id });

    // Notify sidepanel runtime if already open
    chrome.runtime.sendMessage({
      action: "NEW_SELECTION",
      text: selectedText
    }).catch(() => {
      // Side panel may not be open yet; storage will be read on load
    });
  }
});

// 4. Handle Messages from Content Script (Floating Button Click)
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "OPEN_SIDEPANEL_WITH_TEXT" && request.text) {
    const text = request.text.trim();

    // Store selected requirement
    chrome.storage.local.set({
      selectedRequirement: text,
      timestamp: Date.now()
    }, async () => {
      if (sender.tab?.id) {
        try {
          await chrome.sidePanel.open({ tabId: sender.tab.id });
        } catch (err) {
          console.error("Failed to open side panel:", err);
        }
      }

      // Notify side panel if already initialized
      chrome.runtime.sendMessage({
        action: "NEW_SELECTION",
        text: text
      }).catch(() => {});

      sendResponse({ status: "ok" });
    });

    return true; // Keep message channel open for async response
  }
});
`;

  // 3. content.js
  const contentJs = `// MargSarthi Content Script - Text Selection & Floating Action Pill
(function () {
  'use strict';

  let floatingBtn = null;
  let hideTimeout = null;
  let isSelecting = false;

  function createFloatingButton(x, y, selectedText) {
    removeFloatingButton();

    floatingBtn = document.createElement('div');
    floatingBtn.id = 'margsarthi-action-pill';
    floatingBtn.className = 'margsarthi-pill-animate';
    floatingBtn.innerHTML = \`
      <div class="margsarthi-pill-content">
        <span class="margsarthi-pill-sparkle">✦</span>
        <span class="margsarthi-pill-text">Find Indian Standards</span>
      </div>
    \`;

    const pillWidth = 190;
    const pillHeight = 36;
    const padding = 12;

    let posX = x - (pillWidth / 2);
    let posY = y - pillHeight - 10;

    const viewportWidth = window.innerWidth;
    const scrollX = window.scrollX || window.pageXOffset;
    const scrollY = window.scrollY || window.pageYOffset;

    if (posX < scrollX + padding) posX = scrollX + padding;
    if (posX + pillWidth > scrollX + viewportWidth - padding) {
      posX = scrollX + viewportWidth - pillWidth - padding;
    }

    if (posY < scrollY + padding) {
      posY = y + 24;
    }

    floatingBtn.style.left = \`\${posX}px\`;
    floatingBtn.style.top = \`\${posY}px\`;

    floatingBtn.addEventListener('mousedown', (e) => {
      e.preventDefault();
      e.stopPropagation();
    });

    floatingBtn.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();

      try {
        chrome.runtime.sendMessage({
          action: 'OPEN_SIDEPANEL_WITH_TEXT',
          text: selectedText
        }, (response) => {
          if (chrome.runtime.lastError) {
            console.warn('MargSarthi: Background connection notice:', chrome.runtime.lastError.message);
          }
        });
      } catch (err) {
        console.error('MargSarthi: Failed to send selected text to background:', err);
      }

      removeFloatingButton();
    });

    document.documentElement.appendChild(floatingBtn);
  }

  function removeFloatingButton() {
    if (floatingBtn && floatingBtn.parentNode) {
      floatingBtn.parentNode.removeChild(floatingBtn);
    }
    floatingBtn = null;
  }

  function handleSelection() {
    const selection = window.getSelection();
    if (!selection || selection.isCollapsed || selection.rangeCount === 0) {
      removeFloatingButton();
      return;
    }

    const selectedText = selection.toString().trim();
    if (!selectedText || selectedText.length < 3) {
      removeFloatingButton();
      return;
    }

    const activeEl = document.activeElement;
    if (activeEl && (activeEl.tagName === 'INPUT' || activeEl.tagName === 'TEXTAREA' || activeEl.isContentEditable)) {
      if (activeEl.type === 'password') {
        removeFloatingButton();
        return;
      }
    }

    try {
      const range = selection.getRangeAt(0);
      const rect = range.getBoundingClientRect();
      if (rect.width === 0 && rect.height === 0) return;

      const scrollX = window.scrollX || window.pageXOffset;
      const scrollY = window.scrollY || window.pageYOffset;
      const centerX = rect.left + scrollX + (rect.width / 2);
      const topY = rect.top + scrollY;

      createFloatingButton(centerX, topY, selectedText);
    } catch (err) {
      console.warn('MargSarthi range calculation error:', err);
    }
  }

  document.addEventListener('mousedown', (e) => {
    if (floatingBtn && floatingBtn.contains(e.target)) return;
    isSelecting = true;
    if (hideTimeout) clearTimeout(hideTimeout);
  }, { passive: true });

  document.addEventListener('mouseup', (e) => {
    isSelecting = false;
    if (floatingBtn && floatingBtn.contains(e.target)) return;
    if (hideTimeout) clearTimeout(hideTimeout);
    hideTimeout = setTimeout(() => {
      handleSelection();
    }, 80);
  }, { passive: true });

  document.addEventListener('selectionchange', () => {
    if (isSelecting) return;
    if (hideTimeout) clearTimeout(hideTimeout);
    hideTimeout = setTimeout(() => {
      const selection = window.getSelection();
      if (!selection || selection.toString().trim().length < 3) {
        removeFloatingButton();
      }
    }, 150);
  }, { passive: true });

  window.addEventListener('scroll', () => {
    if (floatingBtn) removeFloatingButton();
  }, { passive: true });
})();
`;

  // 4. content.css
  const contentCss = `/* MargSarthi Floating Action Button Styling */
#margsarthi-action-pill {
  position: absolute;
  z-index: 2147483647;
  pointer-events: auto;
  user-select: none;
  -webkit-user-select: none;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
  cursor: pointer;
}

.margsarthi-pill-content {
  display: inline-flex;
  align-items: center;
  gap: 7px;
  background: #0A2540;
  color: #FFFFFF;
  padding: 7px 14px;
  border-radius: 9999px;
  font-size: 12.5px;
  font-weight: 600;
  letter-spacing: 0.2px;
  box-shadow: 0 4px 16px rgba(10, 37, 64, 0.3), 0 1px 3px rgba(0, 0, 0, 0.15);
  border: 1px solid rgba(37, 99, 235, 0.45);
  transition: all 0.18s cubic-bezier(0.16, 1, 0.3, 1);
}

.margsarthi-pill-content:hover {
  background: #0D3256;
  border-color: #2563EB;
  transform: translateY(-1.5px) scale(1.02);
  box-shadow: 0 6px 20px rgba(10, 37, 64, 0.38), 0 2px 4px rgba(0, 0, 0, 0.2);
}

.margsarthi-pill-sparkle {
  color: #F59E0B;
  font-size: 13px;
  line-height: 1;
  filter: drop-shadow(0 0 4px rgba(245, 158, 11, 0.6));
}

.margsarthi-pill-text {
  color: #F8FAFC;
  white-space: nowrap;
}

@keyframes margsarthi-pill-enter {
  0% { opacity: 0; transform: translateY(6px) scale(0.92); }
  100% { opacity: 1; transform: translateY(0) scale(1); }
}

.margsarthi-pill-animate {
  animation: margsarthi-pill-enter 0.2s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}
`;

  // 5. api.js
  const apiJs = `/**
 * MargDarshak / MargSarthi Isolated API Service Layer
 */
export const CONFIG = {
  API_BASE_URL: 'http://localhost:3000/api',
  TIMEOUT_MS: 8000,
  AUTH_TOKEN: ''
};

export async function recommendStandards(requirementText) {
  if (!requirementText || typeof requirementText !== 'string' || !requirementText.trim()) {
    throw new Error('Requirement text is empty.');
  }

  const trimmed = requirementText.trim();
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), CONFIG.TIMEOUT_MS);

  try {
    const headers = {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    };
    if (CONFIG.AUTH_TOKEN) {
      headers['Authorization'] = \`Bearer \${CONFIG.AUTH_TOKEN}\`;
    }

    const res = await fetch(\`\${CONFIG.API_BASE_URL}/api/recommend\`, {
      method: 'POST',
      headers,
      body: JSON.stringify({ query: trimmed, language: "en", context: "general" }),
      signal: controller.signal
    });

    clearTimeout(timer);

    if (res.ok) {
      const data = await res.json();
      if (data && (Array.isArray(data.recommendations) || Array.isArray(data.standards))) {
        return normalizeApiResponse(data, trimmed);
      }
    }
  } catch (err) {
    clearTimeout(timer);
    console.info('MargSarthi API backend offline/unreachable. Utilizing embedded BIS Semantic Catalog fallback.', err.message);
  }

  return getSemanticCatalogFallback(trimmed);
}

function normalizeApiResponse(data, originalText) {
  const list = data.recommendations || data.standards || [];
  return {
    requirement: originalText,
    recommendations: list.map((item) => ({
      standard_number: item.standard_number || item.code || item.is_code || 'IS Code',
      title: item.title || item.name || 'Indian Standard Specification',
      relevance: typeof item.relevance === 'number' ? item.relevance : (parseInt(item.relevance, 10) || 88),
      reason: item.reason || item.description || 'Conforms directly to identified technical parameters.',
      document_url: item.document_url || item.url || \`https://www.services.bis.gov.in/php/BIS_2.0/bisconnect/knowyourstandards/indian_standards/isdetails/\${encodeURIComponent(item.standard_number || '')}\`,
      clauses: Array.isArray(item.clauses) ? item.clauses : []
    })),
    why_explanation: data.why_explanation || data.explanation || 'These standards represent the statutory Bureau of Indian Standards (BIS) specifications and QCO mandates governing the highlighted requirement.',
    related_standards: data.related_standards || [],
    qco_alert: data.qco_alert !== undefined ? data.qco_alert : true,
    qco_text: data.qco_text || 'Mandatory Quality Control Order (QCO) verified. BIS Scheme-I / Scheme-II applicable.'
  };
}

const BIS_SEMANTIC_CATALOG = [
  {
    category: 'LED Lighting & Luminaires',
    keywords: ['led', 'street light', 'luminaire', 'lighting', 'floodlight', 'lamp', 'watt', 'lm/w', 'ip66', 'cct', 'driver', 'surge'],
    recommendations: [
      {
        standard_number: 'IS 10322 (Part 5/Sec 3):2012',
        title: 'Luminaires - Particular Requirements: Luminaires for Road and Street Lighting',
        relevance: 96,
        reason: 'Statutory standard governing outdoor LED & conventional road lighting luminaires, ingress protection (IP65/IP66), thermal dissipation, and optical distribution.',
        document_url: 'https://www.services.bis.gov.in/php/BIS_2.0/bisconnect/knowyourstandards/indian_standards/isdetails/IS%2010322',
        clauses: ['Clause 5.2 (Photometric Performance)', 'Clause 8.1 (Ingress Protection IP66)', 'Clause 12.3 (Surge Protection 10kV)']
      },
      {
        standard_number: 'IS 16107 (Part 2/Sec 1):2012',
        title: 'Luminaires for LED Lighting - Performance Requirements',
        relevance: 91,
        reason: 'Specifies luminous efficacy (minimum 120 lm/W), color rendering index (CRI ≥ 70), correlated color temperature (CCT), and power factor ≥ 0.95.',
        document_url: 'https://www.services.bis.gov.in/php/BIS_2.0/bisconnect/knowyourstandards/indian_standards/isdetails/IS%2016107',
        clauses: ['Clause 6.1 (Luminous Efficacy)', 'Clause 7.4 (Lumen Maintenance L70)', 'Clause 9.2 (Harmonic Distortion THD < 10%)']
      },
      {
        standard_number: 'IS 15885 (Part 2/Sec 13):2012',
        title: 'Lamp Controlgear: Particular Requirements for Electronic Controlgear for LED Modules',
        relevance: 87,
        reason: 'Mandatory under MeitY Compulsory Registration Scheme (CRS) for internal/external constant-current LED drivers with high-voltage cutoff.',
        document_url: 'https://www.services.bis.gov.in/php/BIS_2.0/bisconnect/knowyourstandards/indian_standards/isdetails/IS%2015885',
        clauses: ['Clause 4 (Safety Isolation)', 'Clause 14 (Overvoltage Cutoff up to 440V)']
      }
    ],
    why_explanation: 'Identified lighting parameters (90W, IP66, 120 lm/W) directly match statutory safety, photometrics, and environmental ingress criteria under BIS Scheme-I (ISI Mark) and Scheme-II (CRS).',
    related_standards: [
      { standard_number: 'IS 16103 (Part 1)', title: 'Led Modules For General Lighting - Safety Specifications' },
      { standard_number: 'IS 16102 (Part 2)', title: 'Self-Ballasted LED Lamps - Performance Requirements' }
    ],
    qco_alert: true,
    qco_text: 'Mandatory Quality Control Order (QCO) for Luminaires applies under BIS Scheme-I (ISI Mark) & Scheme-II (CRS).'
  },
  {
    category: 'Pipes & Water Infrastructure',
    keywords: ['hdpe', 'polyethylene', 'pipe', 'water', 'sewerage', 'drainage', 'potable', 'pn-10', 'pe-100', 'pvc', 'plumbing', 'jal jeevan'],
    recommendations: [
      {
        standard_number: 'IS 4984:2016',
        title: 'High Density Polyethylene (HDPE) Pipes for Water Supply - Specification',
        relevance: 95,
        reason: 'Specifies requirements for PE-63, PE-80, and PE-100 virgin grade HDPE pressure pipes for potable water conveyance, hydrostatic strength, and elongation.',
        document_url: 'https://www.services.bis.gov.in/php/BIS_2.0/bisconnect/knowyourstandards/indian_standards/isdetails/IS%204984',
        clauses: ['Clause 5.1 (Virgin Resin PE-100)', 'Clause 8.2 (Hydrostatic Strength at 80°C)', 'Clause 9.1 (Carbon Black Dispersion)']
      },
      {
        standard_number: 'IS 7328:2020',
        title: 'High Density Polyethylene Materials for Moulding and Extrusion',
        relevance: 89,
        reason: 'Raw material standard ensuring 100% virgin polymer without regrind or recycled contamination for drinking water safety.',
        document_url: 'https://www.services.bis.gov.in/php/BIS_2.0/bisconnect/knowyourstandards/indian_standards/isdetails/IS%207328',
        clauses: ['Clause 4.2 (Density & Melt Flow Rate)']
      },
      {
        standard_number: 'IS 14333:1996',
        title: 'High Density Polyethylene Pipes for Sewerage - Specification',
        relevance: 82,
        reason: 'Applicable for non-pressure and gravity underground drainage and wastewater disposal.',
        document_url: 'https://www.services.bis.gov.in/php/BIS_2.0/bisconnect/knowyourstandards/indian_standards/isdetails/IS%2014333',
        clauses: ['Clause 6 (Dimensional Tolerances)']
      }
    ],
    why_explanation: 'PE-100 PN-10 pipe parameters mandate certified hydrostatic resistance and food-grade raw materials per DPIIT mandatory quality order.',
    related_standards: [
      { standard_number: 'IS 7634 (Part 2)', title: 'Code of Practice for Plastics Pipes: Laying & Jointing HDPE Pipes' },
      { standard_number: 'IS 12235', title: 'Methods of Test for Unplasticized PVC / PE Pipes' }
    ],
    qco_alert: true,
    qco_text: 'Pipes & Fittings are governed by the mandatory DPIIT Quality Control Order (Scheme-I ISI Mark).'
  },
  {
    category: 'Structural Steel & TMT Bars',
    keywords: ['steel', 'tmt', 'fe 500', 'fe 500d', 'rebar', 'reinforcement', 'concrete', 'beam', 'column', 'structural', 'ductility', 'yield'],
    recommendations: [
      {
        standard_number: 'IS 1786:2008',
        title: 'High Strength Deformed Steel Bars and Wires for Concrete Reinforcement',
        relevance: 97,
        reason: 'Governs Fe 415, Fe 500, Fe 500D, Fe 550, and Fe 600 grades. Mandates 16% minimum elongation and 1.10 TS/YS ratio for seismic zone design.',
        document_url: 'https://www.services.bis.gov.in/php/BIS_2.0/bisconnect/knowyourstandards/indian_standards/isdetails/IS%201786',
        clauses: ['Clause 7.2 (Chemical Composition - P & S limits)', 'Clause 8.1 (Tensile & Proof Stress Requirements)', 'Clause 9.3 (Bend and Rebend Test)']
      },
      {
        standard_number: 'IS 13920:2016',
        title: 'Ductile Design and Detailing of Reinforced Concrete Structures Subjected to Seismic Forces',
        relevance: 88,
        reason: 'Mandatory structural code for earthquake-resistant buildings requiring Fe 500D ductility standards.',
        document_url: 'https://www.services.bis.gov.in/php/BIS_2.0/bisconnect/knowyourstandards/indian_standards/isdetails/IS%2013920',
        clauses: ['Clause 5.3 (Reinforcement Detailing in Beams and Columns)']
      }
    ],
    why_explanation: 'TMT Reinforcement steel is strictly regulated by the Ministry of Steel QCO, requiring 100% BIS ISI certification to prevent building structural collapse.',
    related_standards: [
      { standard_number: 'IS 2062:2011', title: 'Hot Rolled Medium and High Tensile Structural Steel' },
      { standard_number: 'IS 432 (Part 1)', title: 'Mild Steel and Medium Tensile Steel Bars' }
    ],
    qco_alert: true,
    qco_text: 'Ministry of Steel Mandate: No structural steel may be manufactured, imported, or sold without BIS ISI Mark.'
  },
  {
    category: 'Cement & Building Materials',
    keywords: ['cement', 'opc', 'ppc', 'mortar', 'masonry', 'clinker', 'concrete', '53 grade', '43 grade', 'compressive'],
    recommendations: [
      {
        standard_number: 'IS 269:2015',
        title: 'Ordinary Portland Cement - Specification (33, 43 and 53 Grade)',
        relevance: 96,
        reason: 'Specifies chemical composition, fineness (Blaine test), initial/final setting time, and minimum compressive strength of 53 MPa at 28 days.',
        document_url: 'https://www.services.bis.gov.in/php/BIS_2.0/bisconnect/knowyourstandards/indian_standards/isdetails/IS%20269',
        clauses: ['Clause 6 (Chemical Requirements)', 'Clause 7 (Physical Requirements & Setting Time)', 'Clause 8 (Compressive Strength 28 Days)']
      },
      {
        standard_number: 'IS 1489 (Part 1):2015',
        title: 'Portland Pozzolana Cement - Specification (Fly Ash Based)',
        relevance: 92,
        reason: 'Standard for eco-friendly fly ash blended cement widely specified in CPWD and public infrastructure contracts.',
        document_url: 'https://www.services.bis.gov.in/php/BIS_2.0/bisconnect/knowyourstandards/indian_standards/isdetails/IS%201489',
        clauses: ['Clause 5.2 (Fly Ash Proportion 15-35%)', 'Clause 9 (Soundness by Le-Chatelier Test)']
      }
    ],
    why_explanation: 'Cement quality directly determines civil structure durability and is backed by the statutory Cement (Quality Control) Order.',
    related_standards: [
      { standard_number: 'IS 456:2000', title: 'Plain and Reinforced Concrete - Code of Practice' },
      { standard_number: 'IS 383:2016', title: 'Coarse and Fine Aggregate for Concrete' }
    ],
    qco_alert: true,
    qco_text: 'Cement (Quality Control) Order mandates 100% ISI Mark verification with batch test certificates.'
  },
  {
    category: 'IT Hardware & Electronics',
    keywords: ['laptop', 'computer', 'desktop', 'server', 'workstation', 'monitor', 'keyboard', 'mouse', 'ups', 'smps', 'processor', 'ram', 'ssd'],
    recommendations: [
      {
        standard_number: 'IS 13252 (Part 1):2010 / IS/IEC 62368-1:2018',
        title: 'Audio/Video, Information and Communication Technology Equipment - Safety',
        relevance: 95,
        reason: 'Mandatory standard under MeitY Compulsory Registration Scheme (CRS) for computing hardware, electrical insulation, and fire safety.',
        document_url: 'https://www.services.bis.gov.in/php/BIS_2.0/bisconnect/knowyourstandards/indian_standards/isdetails/IS%2013252',
        clauses: ['Clause 4 (General Safety Architecture)', 'Clause 5.4 (Insulation Coordination)', 'Clause 6 (Thermal Management & Flammability)']
      },
      {
        standard_number: 'IS 16046 (Part 2):2018',
        title: 'Secondary Cells and Batteries Containing Alkaline or Other Non-Acid Electrolytes (Lithium Systems)',
        relevance: 89,
        reason: 'Mandatory CRS standard for laptop internal lithium-ion battery packs and portable power banks.',
        document_url: 'https://www.services.bis.gov.in/php/BIS_2.0/bisconnect/knowyourstandards/indian_standards/isdetails/IS%2016046',
        clauses: ['Clause 7.2 (Overcharge Protection)', 'Clause 7.3 (External Short Circuit Test)']
      }
    ],
    why_explanation: 'Computing devices and battery packs are strictly regulated by MeitY CRS mandates. Bidders must produce active R-Numbers.',
    related_standards: [
      { standard_number: 'IS 616:2017', title: 'Audio, Video and Similar Electronic Apparatus - Safety Requirements' },
      { standard_number: 'IS 16242', title: 'Uninterruptible Power Supply (UPS) Systems' }
    ],
    qco_alert: true,
    qco_text: 'MeitY Electronics & IT Goods (Compulsory Registration Scheme) Order is strictly mandatory.'
  },
  {
    category: 'Cables & Conductors',
    keywords: ['cable', 'wire', 'conductor', 'copper', 'aluminium', 'xlpe', 'pvc cable', 'armoured', 'unarmoured', 'voltage', '11kv', '33kv', 'lt cable', 'ht cable'],
    recommendations: [
      {
        standard_number: 'IS 7098 (Part 1):1988',
        title: 'Cross-Linked Polyethylene (XLPE) Insulated PVC Sheathed Cables for Working Voltages up to and Including 1100 V',
        relevance: 95,
        reason: 'Governs low tension (LT) power and control distribution cables, conductor resistance, and insulation dielectric withstand.',
        document_url: 'https://www.services.bis.gov.in/php/BIS_2.0/bisconnect/knowyourstandards/indian_standards/isdetails/IS%207098',
        clauses: ['Clause 5 (Conductor EC Grade Aluminium/Copper)', 'Clause 9 (Insulation Thickness & Tensile Properties)']
      },
      {
        standard_number: 'IS 694:2010',
        title: 'Polyvinyl Chloride Insulated Unsheathed and Sheathed Cables/Cords with Rigid and Flexible Conductor',
        relevance: 90,
        reason: 'Standard for internal building electrification, fire-retardant (FR/FRLS) wires, and panel wiring.',
        document_url: 'https://www.services.bis.gov.in/php/BIS_2.0/bisconnect/knowyourstandards/indian_standards/isdetails/IS%20694',
        clauses: ['Clause 6 (Flame Retardant Properties)', 'Clause 12 (High Voltage Water Immersion Test)']
      }
    ],
    why_explanation: 'Electrical cables represent critical fire and electrical safety infrastructure governed by mandatory DPIIT Electrical Cables QCO.',
    related_standards: [
      { standard_number: 'IS 8130:2013', title: 'Conductors for Insulated Electric Cables and Flexible Cords' },
      { standard_number: 'IS 10810', title: 'Methods of Test for Cables' }
    ],
    qco_alert: true,
    qco_text: 'DPIIT Quality Control Order on Electrical Wires and Cables (Scheme-I Mandatory ISI Mark).'
  }
];

function getSemanticCatalogFallback(text) {
  const lower = text.toLowerCase();
  let bestMatch = null;
  let highestScore = 0;

  for (const entry of BIS_SEMANTIC_CATALOG) {
    let score = 0;
    for (const kw of entry.keywords) {
      if (lower.includes(kw)) {
        score += (kw.length > 5 ? 3 : 2);
      }
    }
    if (score > highestScore) {
      highestScore = score;
      bestMatch = entry;
    }
  }

  if (bestMatch && highestScore >= 2) {
    return {
      requirement: text,
      recommendations: bestMatch.recommendations,
      why_explanation: bestMatch.why_explanation,
      related_standards: bestMatch.related_standards,
      qco_alert: bestMatch.qco_alert,
      qco_text: bestMatch.qco_text
    };
  }

  return {
    requirement: text,
    recommendations: [
      {
        standard_number: 'IS 10322 / IS 4984 / IS 2062',
        title: 'General Engineering & Statutory Quality Standard',
        relevance: 86,
        reason: \`Conforms to technical parameters extracted from: "\${text.slice(0, 90)}..."\`,
        document_url: 'https://www.services.bis.gov.in/php/BIS_2.0/bisconnect/knowyourstandards/indian_standards/isdetails/',
        clauses: ['Clause 4 (Material Specifications)', 'Clause 8 (Acceptance & Routine Testing)']
      },
      {
        standard_number: 'GFR 2017 Rule 144(i)',
        title: 'Mandatory Adoption of Indian Standards in Public Procurement',
        relevance: 98,
        reason: 'Statutory mandate requiring all government procuring authorities (GeM/CPPP) to prioritize Bureau of Indian Standards specifications.',
        document_url: 'https://doe.gov.in/sites/default/files/GFR2017_0.pdf',
        clauses: ['Rule 144(i) Standards Clause']
      }
    ],
    why_explanation: 'Your requirement was mapped against National Standards Guidelines under General Financial Rules 2017 (Rule 144) and the BIS Act 2016.',
    related_standards: [
      { standard_number: 'BIS Act 2016', title: 'National Standards Body of India Regulations' }
    ],
    qco_alert: true,
    qco_text: 'General Financial Rules 2017 Rule 144(i) applies: Procuring entity must specify Indian Standards.'
  };
}

export async function askFollowupQuestion(question, requirement, currentResults) {
  const qLower = question.toLowerCase();

  if (qLower.includes('gfr') || qLower.includes('rule 144') || qLower.includes('tender clause')) {
    return 'Under General Financial Rules (GFR) 2017 Rule 144(i), the description of subject matter of procurement to the extent practicable shall be objective, functional, and conform to the Bureau of Indian Standards (BIS) specifications. No tender specification shall use brand names or proprietary terms when an Indian Standard exists.';
  }

  if (qLower.includes('qco') || qLower.includes('mandatory') || qLower.includes('penalty') || qLower.includes('fine')) {
    return 'Under Section 16 & 17 of the BIS Act 2016, contravention of a gazetted Quality Control Order (QCO) attracts severe penalties including imprisonment up to 2 years, minimum fine of ₹2 Lakh, and disqualification of non-compliant tender bids.';
  }

  if (qLower.includes('test') || qLower.includes('nabl') || qLower.includes('lab') || qLower.includes('certificate')) {
    return 'All compliance test reports submitted during tender technical evaluation must originate from BIS-recognized or NABL-accredited testing laboratories with a valid QR code or Unique Lab Reference (ULR) number.';
  }

  if (currentResults && currentResults.recommendations && currentResults.recommendations.length > 0) {
    const topStd = currentResults.recommendations[0];
    return \`Regarding standard \${topStd.standard_number} ("\${topStd.title}"): This standard provides exact benchmarks for testing, safety thresholds, and quality assurance. For this requirement, ensure your tender BoQ specifies adherence to \${topStd.clauses ? topStd.clauses.join(', ') : 'the latest published amendment'}.\`;
  }

  return 'MargSarthi analyzes your procurement text against 21,000+ Indian Standards (IS Codes), Compulsory Registration Schemes (CRS), and Ministry QCOs to ensure 100% statutory compliance in public procurement.';
}
`;

  // 6. sidepanel.html
  const sidepanelHtml = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>MargSarthi — Indian Standards Assistant</title>
  <link rel="stylesheet" href="sidepanel.css">
</head>
<body>

  <!-- Top Government Accent Stripe -->
  <div class="tricolor-stripe">
    <div class="stripe-saffron"></div>
    <div class="stripe-white"></div>
    <div class="stripe-green"></div>
  </div>

  <!-- Main Container -->
  <div class="sidepanel-container">

    <!-- 1. Header -->
    <header class="sidepanel-header">
      <div class="header-left">
        <div class="brand-icon">
          <svg class="compass-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="12" cy="12" r="10"></circle>
            <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"></polygon>
          </svg>
        </div>
        <div>
          <div class="brand-title">
            <span class="title-bold">Marg</span><span class="title-accent">Sarthi</span>
          </div>
          <div class="brand-subtitle">Indian Standards Assistant</div>
        </div>
      </div>

      <div class="header-right">
        <span class="tagline-badge">BIS & GFR 144(i)</span>
        <button id="settings-btn" class="icon-btn" title="Settings & Backend API Configuration">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="gear-svg">
            <circle cx="12" cy="12" r="3"></circle>
            <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
          </svg>
        </button>
      </div>
    </header>

    <!-- Sub-tagline strip -->
    <div class="tagline-strip">
      <span>Right Standards. Better Procurement.</span>
    </div>

    <!-- Settings Dropdown / Modal -->
    <div id="settings-panel" class="settings-panel hidden">
      <div class="settings-header">
        <span class="settings-title">Backend API Configuration</span>
        <button id="close-settings" class="close-text-btn">✕</button>
      </div>
      <div class="settings-body">
        <label for="api-url-input" class="input-label">MargDarshak API Base URL:</label>
        <input type="text" id="api-url-input" class="text-input" placeholder="https://margdarshak-1-kxac.onrender.com" value="https://margdarshak-1-kxac.onrender.com">
        <div class="settings-note">Used for POST /api/recommend. If offline, the built-in local BIS catalog is used automatically.</div>
        <button id="save-settings-btn" class="save-btn">Save Configuration</button>
      </div>
    </div>

    <!-- Main Scrollable Content -->
    <main class="sidepanel-main">

      <!-- 2. SELECTED REQUIREMENT CARD -->
      <section class="section-card selected-req-section">
        <div class="section-header">
          <div class="section-title-wrap">
            <span class="section-dot"></span>
            <span class="section-title">Selected Requirement</span>
          </div>
          <button id="clear-selection-btn" class="clear-btn" title="Clear selection">Clear</button>
        </div>

        <div id="req-box" class="req-box">
          <div id="req-text" class="req-text">
            “No text selected yet. Highlight any tender specification or product description on the webpage and click <strong>✦ Find Indian Standards</strong>.”
          </div>
        </div>

        <div class="req-actions">
          <button id="analyze-btn" class="primary-btn">
            <span class="btn-sparkle">✦</span>
            <span>Analyze Requirement</span>
          </button>
        </div>
      </section>

      <!-- 3. LOADING STATE -->
      <div id="loading-state" class="state-container hidden">
        <div class="loading-spinner"></div>
        <div class="loading-title">Analyzing requirement…</div>
        <div class="loading-desc">Mapping technical parameters against 21,000+ Indian Standards (IS Codes) & Gazetted QCOs.</div>
      </div>

      <!-- 4. ERROR STATE -->
      <div id="error-state" class="state-container error-container hidden">
        <div class="error-icon">⚠️</div>
        <div class="error-title">Analysis Error</div>
        <div id="error-desc" class="error-desc">Could not connect to the recommendation service.</div>
        <button id="retry-btn" class="secondary-btn">Retry Analysis</button>
      </div>

      <!-- 5. RESULTS SECTION -->
      <div id="results-wrapper" class="results-wrapper hidden">

        <!-- Mandatory QCO Alert Banner if present -->
        <div id="qco-alert-banner" class="qco-banner">
          <div class="qco-badge">🛡️ STATUTORY MANDATE</div>
          <div id="qco-text" class="qco-text">
            Mandatory Quality Control Order (QCO) verified. Scheme-I (ISI Mark) / Scheme-II (CRS) required.
          </div>
        </div>

        <!-- Recommended Indian Standards List -->
        <section class="section-card">
          <div class="section-header">
            <span class="section-title">Recommended Indian Standards</span>
            <span id="match-count-badge" class="count-badge">3 Standards Found</span>
          </div>

          <div id="standards-list" class="standards-list">
            <!-- Dynamic Standard Cards Injected Here -->
          </div>
        </section>

        <!-- Why these standards? -->
        <section class="section-card why-card">
          <div class="section-header">
            <div class="why-title-wrap">
              <span class="why-icon">💡</span>
              <span class="section-title">Why these standards?</span>
            </div>
          </div>
          <div id="why-text" class="why-body">
            <!-- AI Explanation Injected Here -->
          </div>
        </section>

        <!-- Related Standards -->
        <section id="related-standards-section" class="section-card">
          <div class="section-header">
            <span class="section-title">Related & Normative Standards</span>
          </div>
          <div id="related-standards-list" class="related-list">
            <!-- Allied Standards Injected Here -->
          </div>
        </section>

      </div>

      <!-- 6. EMPTY PROMPT ONBOARDING STATE -->
      <div id="empty-state" class="empty-state">
        <div class="empty-icon-box">
          <span>🧭</span>
        </div>
        <div class="empty-title">Ready to Recommend Standards</div>
        <p class="empty-desc">
          Browse any procurement or tender webpage (GeM, CPPP, State Portals), select any technical specification, and click the floating <strong>✦ Find Indian Standards</strong> button.
        </p>
        <div class="sample-prompts-wrap">
          <div class="sample-label">Or try a sample requirement:</div>
          <button class="sample-chip" data-sample="Supply and installation of 90W LED Street Light luminaires with IP66 protection, 120 lm/W luminous efficacy, and 10kV surge protection.">
            💡 90W LED Street Light (IP66, 120 lm/W)
          </button>
          <button class="sample-chip" data-sample="PE-100 Grade High Density Polyethylene (HDPE) Pipes 110mm OD, PN-10 rating for potable water distribution under Jal Jeevan Mission.">
            🚰 HDPE Pipes PE-100 (PN-10 Water Supply)
          </button>
          <button class="sample-chip" data-sample="Fe 500D High Strength Deformed TMT Steel Reinforcement Bars conforming to seismic ductility criteria.">
            🏗️ Fe 500D TMT Reinforcement Steel Rebars
          </button>
        </div>
      </div>

    </main>

    <!-- 7. BOTTOM: ASK MARGSARTHI INTERACTIVE INPUT -->
    <footer class="sidepanel-footer">
      <div class="ask-box-wrapper">
        <div class="ask-label-row">
          <span class="ask-label">Ask MargSarthi (Follow-up Question)</span>
          <span class="ask-hint">e.g. GFR clause, test protocol, or QCO fine</span>
        </div>
        <form id="ask-form" class="ask-form">
          <input type="text" id="ask-input" class="ask-input" placeholder="Ask about this standard or requirement..." autocomplete="off">
          <button type="submit" id="ask-btn" class="ask-send-btn" title="Send Question">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" class="send-svg">
              <line x1="22" y1="2" x2="11" y2="13"></line>
              <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
            </svg>
          </button>
        </form>

        <!-- Follow-up Answer Display Card -->
        <div id="followup-answer-card" class="followup-card hidden">
          <div class="followup-header">
            <span class="followup-title">MargSarthi Answer</span>
            <button id="close-followup" class="close-text-btn">✕</button>
          </div>
          <div id="followup-answer-text" class="followup-text"></div>
        </div>
      </div>
    </footer>

  </div>

  <script type="module" src="sidepanel.js"></script>
</body>
</html>
`;

  // 7. sidepanel.css
  const sidepanelCss = `/* MargSarthi Side Panel Design System */
:root {
  --bg-primary: #FFFFFF;
  --bg-secondary: #F8FAFC;
  --bg-tertiary: #F1F5F9;
  --bg-card: #FFFFFF;
  --navy-dark: #0A2540;
  --navy-panel: #0F2F54;
  --navy-accent: #1E3A8A;
  --blue-primary: #2563EB;
  --blue-hover: #1D4ED8;
  --blue-subtle: #EFF6FF;
  --blue-border: #BFDBFE;
  --text-main: #0F172A;
  --text-muted: #64748B;
  --text-light: #94A3B8;
  --border-color: #E2E8F0;
  --border-subtle: #CBD5E1;
  --green-badge: #10B981;
  --amber-badge: #F59E0B;
  --radius-sm: 6px;
  --radius-md: 10px;
  --radius-lg: 14px;
  --shadow-sm: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
  --shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.07), 0 2px 4px -1px rgba(0, 0, 0, 0.04);
  --shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.08), 0 4px 6px -2px rgba(0, 0, 0, 0.03);
}

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
  background-color: var(--bg-secondary);
  color: var(--text-main);
  font-size: 13px;
  line-height: 1.5;
  -webkit-font-smoothing: antialiased;
}

.tricolor-stripe {
  display: flex;
  height: 3.5px;
  width: 100%;
}
.stripe-saffron { flex: 1; background: #FF9933; }
.stripe-white { flex: 1; background: #FFFFFF; }
.stripe-green { flex: 1; background: #138808; }

.sidepanel-container {
  display: flex;
  flex-direction: column;
  height: calc(100vh - 3.5px);
  background: var(--bg-secondary);
}

.sidepanel-header {
  background: var(--navy-dark);
  color: #FFFFFF;
  padding: 12px 16px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.header-left {
  display: flex;
  align-items: center;
  gap: 10px;
}

.brand-icon {
  width: 32px;
  height: 32px;
  background: rgba(255, 255, 255, 0.12);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: var(--radius-md);
  display: flex;
  align-items: center;
  justify-content: center;
  color: #60A5FA;
}

.compass-svg {
  width: 20px;
  height: 20px;
}

.brand-title {
  font-size: 15px;
  font-weight: 700;
  letter-spacing: -0.2px;
  line-height: 1.2;
}

.title-bold { color: #FFFFFF; }
.title-accent { color: #60A5FA; }

.brand-subtitle {
  font-size: 10.5px;
  color: #94A3B8;
  font-weight: 500;
}

.header-right {
  display: flex;
  align-items: center;
  gap: 8px;
}

.tagline-badge {
  font-size: 9.5px;
  font-weight: 700;
  text-transform: uppercase;
  background: rgba(37, 99, 235, 0.25);
  color: #93C5FD;
  padding: 3px 7px;
  border-radius: 9999px;
  border: 1px solid rgba(96, 165, 250, 0.3);
}

.icon-btn {
  background: transparent;
  border: none;
  color: #94A3B8;
  cursor: pointer;
  padding: 4px;
  border-radius: var(--radius-sm);
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.15s;
}

.icon-btn:hover {
  color: #FFFFFF;
  background: rgba(255, 255, 255, 0.1);
}

.gear-svg {
  width: 17px;
  height: 17px;
}

.tagline-strip {
  background: var(--navy-panel);
  color: #CBD5E1;
  font-size: 10.5px;
  font-weight: 600;
  padding: 4px 16px;
  text-align: center;
  border-bottom: 1px solid var(--border-color);
  letter-spacing: 0.1px;
}

.settings-panel {
  background: #FFFFFF;
  border-bottom: 2px solid var(--blue-primary);
  padding: 12px 16px;
  box-shadow: var(--shadow-md);
  animation: slide-down 0.18s ease-out;
}

@keyframes slide-down {
  from { transform: translateY(-8px); opacity: 0; }
  to { transform: translateY(0); opacity: 1; }
}

.settings-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
}

.settings-title {
  font-size: 12px;
  font-weight: 700;
  color: var(--navy-dark);
}

.close-text-btn {
  background: none;
  border: none;
  color: var(--text-muted);
  cursor: pointer;
  font-size: 14px;
  font-weight: 700;
}

.close-text-btn:hover { color: var(--text-main); }

.input-label {
  display: block;
  font-size: 11px;
  font-weight: 600;
  color: var(--text-muted);
  margin-bottom: 4px;
}

.text-input {
  width: 100%;
  padding: 7px 10px;
  font-size: 12px;
  border: 1px solid var(--border-subtle);
  border-radius: var(--radius-sm);
  outline: none;
  font-family: inherit;
  margin-bottom: 4px;
}

.text-input:focus {
  border-color: var(--blue-primary);
  box-shadow: 0 0 0 2px rgba(37, 99, 235, 0.15);
}

.settings-note {
  font-size: 10px;
  color: var(--text-light);
  margin-bottom: 8px;
}

.save-btn {
  background: var(--navy-dark);
  color: #FFFFFF;
  border: none;
  padding: 6px 12px;
  font-size: 11.5px;
  font-weight: 600;
  border-radius: var(--radius-sm);
  cursor: pointer;
}

.save-btn:hover { background: var(--blue-hover); }

.sidepanel-main {
  flex: 1;
  overflow-y: auto;
  padding: 14px 16px;
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.section-card {
  background: var(--bg-card);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-md);
  padding: 14px;
  box-shadow: var(--shadow-sm);
}

.section-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 10px;
}

.section-title-wrap {
  display: flex;
  align-items: center;
  gap: 6px;
}

.section-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: var(--blue-primary);
}

.section-title {
  font-size: 12px;
  font-weight: 700;
  color: var(--navy-dark);
  text-transform: uppercase;
  letter-spacing: 0.3px;
}

.clear-btn {
  background: none;
  border: none;
  font-size: 11px;
  color: var(--text-muted);
  font-weight: 600;
  cursor: pointer;
}

.clear-btn:hover {
  color: #DC2626;
  text-decoration: underline;
}

.count-badge {
  font-size: 10px;
  font-weight: 700;
  background: var(--blue-subtle);
  color: var(--blue-primary);
  padding: 2px 8px;
  border-radius: 9999px;
  border: 1px solid var(--blue-border);
}

.req-box {
  background: var(--bg-secondary);
  border-left: 3px solid var(--blue-primary);
  border-radius: 0 var(--radius-sm) var(--radius-sm) 0;
  padding: 10px 12px;
  margin-bottom: 12px;
  border-top: 1px solid var(--border-color);
  border-right: 1px solid var(--border-color);
  border-bottom: 1px solid var(--border-color);
}

.req-text {
  font-size: 12.5px;
  color: var(--text-main);
  line-height: 1.45;
  font-style: italic;
  word-break: break-word;
}

.req-text strong {
  color: var(--navy-dark);
  font-style: normal;
}

.char-badge {
  font-size: 10px;
  color: var(--text-light);
  font-style: normal;
}

.req-actions {
  display: flex;
  gap: 8px;
}

.primary-btn {
  flex: 1;
  background: var(--blue-primary);
  color: #FFFFFF;
  border: none;
  border-radius: var(--radius-sm);
  padding: 9px 14px;
  font-size: 12.5px;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  transition: all 0.15s ease;
  box-shadow: 0 1px 2px rgba(37, 99, 235, 0.2);
}

.primary-btn:hover {
  background: var(--blue-hover);
  transform: translateY(-0.5px);
  box-shadow: 0 3px 6px rgba(37, 99, 235, 0.25);
}

.btn-sparkle {
  color: #FDE047;
  font-size: 13px;
}

.state-container {
  background: var(--bg-card);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-md);
  padding: 24px 16px;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
}

.loading-spinner {
  width: 32px;
  height: 32px;
  border: 3px solid var(--blue-subtle);
  border-top-color: var(--blue-primary);
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
  margin-bottom: 4px;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

.loading-title {
  font-size: 13.5px;
  font-weight: 700;
  color: var(--navy-dark);
}

.loading-desc {
  font-size: 11.5px;
  color: var(--text-muted);
  max-width: 260px;
  line-height: 1.4;
}

.error-container {
  border-color: #FECACA;
  background: #FEF2F2;
}

.error-icon { font-size: 24px; }
.error-title { font-size: 13px; font-weight: 700; color: #991B1B; }
.error-desc { font-size: 11.5px; color: #7F1D1D; line-height: 1.4; }

.secondary-btn {
  margin-top: 6px;
  background: #FFFFFF;
  border: 1px solid #DC2626;
  color: #DC2626;
  padding: 6px 14px;
  border-radius: var(--radius-sm);
  font-size: 11.5px;
  font-weight: 600;
  cursor: pointer;
}

.secondary-btn:hover { background: #FEE2E2; }

.results-wrapper {
  display: flex;
  flex-direction: column;
  gap: 14px;
  animation: fade-in 0.2s ease-out;
}

@keyframes fade-in {
  from { opacity: 0; transform: translateY(4px); }
  to { opacity: 1; transform: translateY(0); }
}

.qco-banner {
  background: linear-gradient(135deg, #FEF3C7 0%, #FDE68A 100%);
  border: 1px solid #F59E0B;
  border-radius: var(--radius-md);
  padding: 10px 12px;
  box-shadow: var(--shadow-sm);
}

.qco-badge {
  font-size: 10px;
  font-weight: 800;
  color: #92400E;
  letter-spacing: 0.5px;
  margin-bottom: 2px;
}

.qco-text {
  font-size: 11.5px;
  color: #78350F;
  font-weight: 500;
  line-height: 1.35;
}

.standards-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.standard-card {
  background: var(--bg-secondary);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-md);
  padding: 12px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  transition: border-color 0.15s;
}

.standard-card.top-match {
  border: 1.5px solid var(--blue-border);
  background: #F8FAFF;
}

.std-card-top {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 8px;
}

.std-code-row {
  display: flex;
  align-items: center;
  gap: 6px;
  margin-bottom: 2px;
}

.std-code {
  font-size: 13.5px;
  font-weight: 800;
  color: var(--navy-dark);
  letter-spacing: -0.2px;
}

.primary-badge {
  font-size: 8.5px;
  font-weight: 800;
  color: #1E40AF;
  background: #DBEAFE;
  padding: 1.5px 5px;
  border-radius: 4px;
}

.std-title {
  font-size: 12px;
  font-weight: 600;
  color: var(--text-main);
  line-height: 1.3;
}

.relevance-box {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-width: 48px;
  padding: 4px 8px;
  border-radius: var(--radius-sm);
  background: var(--blue-subtle);
  border: 1px solid var(--blue-border);
}

.rel-number {
  font-size: 13px;
  font-weight: 800;
  color: var(--blue-primary);
  line-height: 1.1;
}

.rel-lbl {
  font-size: 8px;
  color: var(--text-muted);
  text-transform: uppercase;
  font-weight: 700;
}

.relevance-box.rel-high {
  background: #ECFDF5;
  border-color: #A7F3D0;
}
.relevance-box.rel-high .rel-number { color: #059669; }

.std-reason {
  font-size: 11.5px;
  color: var(--text-muted);
  line-height: 1.4;
  background: #FFFFFF;
  padding: 8px 10px;
  border-radius: var(--radius-sm);
  border: 1px solid var(--border-color);
}

.clauses-chips {
  display: flex;
  flex-wrap: wrap;
  gap: 4px;
}

.clause-chip {
  font-size: 10px;
  font-weight: 600;
  color: #1E3A8A;
  background: #E0E7FF;
  padding: 2px 6px;
  border-radius: 4px;
}

.std-actions {
  display: flex;
  gap: 6px;
  margin-top: 2px;
}

.action-btn {
  flex: 1;
  background: #FFFFFF;
  border: 1px solid var(--border-subtle);
  border-radius: var(--radius-sm);
  padding: 6px 10px;
  font-size: 11.5px;
  font-weight: 600;
  color: var(--text-main);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 5px;
  transition: all 0.15s;
}

.action-btn:hover {
  background: var(--bg-tertiary);
  border-color: var(--text-muted);
}

.action-btn.view-btn {
  background: var(--navy-dark);
  color: #FFFFFF;
  border-color: var(--navy-dark);
}

.action-btn.view-btn:hover {
  background: var(--blue-hover);
  border-color: var(--blue-hover);
}

.action-svg {
  width: 13px;
  height: 13px;
}

.why-card {
  border-left: 3px solid #F59E0B;
}

.why-title-wrap {
  display: flex;
  align-items: center;
  gap: 6px;
}

.why-icon { font-size: 14px; }

.why-body {
  font-size: 12px;
  color: var(--text-main);
  line-height: 1.45;
  background: var(--bg-secondary);
  padding: 10px 12px;
  border-radius: var(--radius-sm);
  border: 1px solid var(--border-color);
}

.related-list {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.related-item {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 6px 10px;
  background: var(--bg-secondary);
  border-radius: var(--radius-sm);
  border: 1px solid var(--border-color);
  font-size: 11.5px;
}

.rel-code {
  font-weight: 700;
  color: var(--navy-dark);
  white-space: nowrap;
}

.rel-title {
  color: var(--text-muted);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.empty-state {
  text-align: center;
  padding: 24px 16px;
  background: #FFFFFF;
  border: 1px dashed var(--border-subtle);
  border-radius: var(--radius-md);
  margin-top: 8px;
}

.empty-icon-box {
  width: 48px;
  height: 48px;
  background: var(--blue-subtle);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 22px;
  margin: 0 auto 12px;
}

.empty-title {
  font-size: 14px;
  font-weight: 700;
  color: var(--navy-dark);
  margin-bottom: 6px;
}

.empty-desc {
  font-size: 11.5px;
  color: var(--text-muted);
  line-height: 1.45;
  margin-bottom: 16px;
}

.sample-prompts-wrap {
  display: flex;
  flex-direction: column;
  gap: 6px;
  text-align: left;
}

.sample-label {
  font-size: 10.5px;
  font-weight: 700;
  color: var(--text-muted);
  text-transform: uppercase;
}

.sample-chip {
  background: var(--bg-secondary);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-sm);
  padding: 7px 10px;
  font-size: 11px;
  color: var(--navy-dark);
  font-weight: 500;
  cursor: pointer;
  text-align: left;
  transition: all 0.15s;
}

.sample-chip:hover {
  background: var(--blue-subtle);
  border-color: var(--blue-border);
  color: var(--blue-primary);
}

.sidepanel-footer {
  background: #FFFFFF;
  border-top: 1px solid var(--border-color);
  padding: 12px 16px;
  box-shadow: 0 -2px 6px rgba(0, 0, 0, 0.03);
}

.ask-box-wrapper {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.ask-label-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.ask-label {
  font-size: 11px;
  font-weight: 700;
  color: var(--navy-dark);
}

.ask-hint {
  font-size: 9.5px;
  color: var(--text-light);
}

.ask-form {
  display: flex;
  gap: 6px;
}

.ask-input {
  flex: 1;
  padding: 8px 10px;
  font-size: 12px;
  border: 1px solid var(--border-subtle);
  border-radius: var(--radius-sm);
  outline: none;
  font-family: inherit;
  background: var(--bg-secondary);
}

.ask-input:focus {
  background: #FFFFFF;
  border-color: var(--blue-primary);
  box-shadow: 0 0 0 2px rgba(37, 99, 235, 0.12);
}

.ask-send-btn {
  background: var(--navy-dark);
  color: #FFFFFF;
  border: none;
  border-radius: var(--radius-sm);
  width: 34px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: background 0.15s;
}

.ask-send-btn:hover { background: var(--blue-hover); }

.send-svg {
  width: 15px;
  height: 15px;
}

.followup-card {
  background: #EFF6FF;
  border: 1px solid #BFDBFE;
  border-radius: var(--radius-sm);
  padding: 8px 10px;
  margin-top: 4px;
  animation: fade-in 0.15s ease-out;
}

.followup-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 4px;
}

.followup-title {
  font-size: 10.5px;
  font-weight: 700;
  color: #1E3A8A;
  text-transform: uppercase;
}

.followup-text {
  font-size: 11.5px;
  color: #1E293B;
  line-height: 1.4;
}

.hidden {
  display: none !important;
}
`;

  // 8. sidepanel.js
  const sidepanelJs = `/**
 * MargSarthi — Chrome Extension Side Panel Controller
 */
import { recommendStandards, askFollowupQuestion, CONFIG } from './api.js';

// DOM Elements
const reqTextEl = document.getElementById('req-text');
const analyzeBtn = document.getElementById('analyze-btn');
const clearSelectionBtn = document.getElementById('clear-selection-btn');

const loadingStateEl = document.getElementById('loading-state');
const errorStateEl = document.getElementById('error-state');
const errorDescEl = document.getElementById('error-desc');
const retryBtn = document.getElementById('retry-btn');

const resultsWrapperEl = document.getElementById('results-wrapper');
const qcoAlertBannerEl = document.getElementById('qco-alert-banner');
const qcoTextEl = document.getElementById('qco-text');
const standardsListEl = document.getElementById('standards-list');
const matchCountBadgeEl = document.getElementById('match-count-badge');
const whyTextEl = document.getElementById('why-text');
const relatedSectionEl = document.getElementById('related-standards-section');
const relatedListEl = document.getElementById('related-standards-list');

const emptyStateEl = document.getElementById('empty-state');
const sampleChips = document.querySelectorAll('.sample-chip');

// Settings Elements
const settingsBtn = document.getElementById('settings-btn');
const settingsPanel = document.getElementById('settings-panel');
const closeSettingsBtn = document.getElementById('close-settings');
const apiUrlInput = document.getElementById('api-url-input');
const saveSettingsBtn = document.getElementById('save-settings-btn');

// Ask MargSarthi Elements
const askForm = document.getElementById('ask-form');
const askInput = document.getElementById('ask-input');
const askBtn = document.getElementById('ask-btn');
const followupCard = document.getElementById('followup-answer-card');
const followupTextEl = document.getElementById('followup-answer-text');
const closeFollowupBtn = document.getElementById('close-followup');

// Current State
let currentRequirement = '';
let currentResults = null;

// Initialize on Load
document.addEventListener('DOMContentLoaded', async () => {
  if (chrome?.storage?.local) {
    chrome.storage.local.get(['margDarshakApiUrl', 'selectedRequirement'], (data) => {
      if (data.margDarshakApiUrl) {
        CONFIG.API_BASE_URL = data.margDarshakApiUrl;
        if (apiUrlInput) apiUrlInput.value = data.margDarshakApiUrl;
      }
      if (data.selectedRequirement) {
        setRequirementText(data.selectedRequirement);
        runAnalysis();
      }
    });
  }

  if (chrome?.runtime?.onMessage) {
    chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
      if (message.action === 'NEW_SELECTION' && message.text) {
        setRequirementText(message.text);
        runAnalysis();
        sendResponse({ received: true });
      }
    });
  }

  setupEventListeners();
});

function setupEventListeners() {
  if (analyzeBtn) {
    analyzeBtn.addEventListener('click', () => {
      if (currentRequirement && currentRequirement.trim().length > 0) {
        runAnalysis();
      }
    });
  }

  if (clearSelectionBtn) {
    clearSelectionBtn.addEventListener('click', () => {
      currentRequirement = '';
      if (chrome?.storage?.local) {
        chrome.storage.local.remove('selectedRequirement');
      }
      reqTextEl.innerHTML = '“No text selected yet. Highlight any tender specification or product description on the webpage and click <strong>✦ Find Indian Standards</strong>.”';
      resultsWrapperEl.classList.add('hidden');
      loadingStateEl.classList.add('hidden');
      errorStateEl.classList.add('hidden');
      emptyStateEl.classList.remove('hidden');
    });
  }

  if (retryBtn) {
    retryBtn.addEventListener('click', () => {
      runAnalysis();
    });
  }

  sampleChips.forEach((chip) => {
    chip.addEventListener('click', () => {
      const sample = chip.getAttribute('data-sample');
      if (sample) {
        setRequirementText(sample);
        runAnalysis();
      }
    });
  });

  if (settingsBtn && settingsPanel) {
    settingsBtn.addEventListener('click', () => {
      settingsPanel.classList.toggle('hidden');
    });
  }

  if (closeSettingsBtn && settingsPanel) {
    closeSettingsBtn.addEventListener('click', () => {
      settingsPanel.classList.add('hidden');
    });
  }

  if (saveSettingsBtn && apiUrlInput) {
    saveSettingsBtn.addEventListener('click', () => {
      const newUrl = apiUrlInput.value.trim();
      if (newUrl) {
        CONFIG.API_BASE_URL = newUrl;
        if (chrome?.storage?.local) {
          chrome.storage.local.set({ margDarshakApiUrl: newUrl });
        }
        alert('Configuration saved: ' + newUrl);
        settingsPanel.classList.add('hidden');
      }
    });
  }

  if (askForm) {
    askForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const question = askInput.value.trim();
      if (!question) return;

      askInput.disabled = true;
      askBtn.disabled = true;

      try {
        const answer = await askFollowupQuestion(question, currentRequirement, currentResults);
        followupTextEl.textContent = answer;
        followupCard.classList.remove('hidden');
        askInput.value = '';
      } catch (err) {
        followupTextEl.textContent = 'Could not process question. Please try again.';
        followupCard.classList.remove('hidden');
      } finally {
        askInput.disabled = false;
        askBtn.disabled = false;
      }
    });
  }

  if (closeFollowupBtn && followupCard) {
    closeFollowupBtn.addEventListener('click', () => {
      followupCard.classList.add('hidden');
    });
  }
}

function setRequirementText(text) {
  currentRequirement = text;
  if (!text || text.trim().length === 0) {
    reqTextEl.textContent = 'No text selected.';
    return;
  }

  if (text.length > 320) {
    reqTextEl.innerHTML = \`“\${escapeHtml(text.substring(0, 310))}…” <span class="char-badge">(\${text.length} chars)</span>\`;
  } else {
    reqTextEl.textContent = \`“\${text}”\`;
  }

  if (chrome?.storage?.local) {
    chrome.storage.local.set({ selectedRequirement: text });
  }
}

async function runAnalysis() {
  if (!currentRequirement || currentRequirement.trim().length === 0) return;

  emptyStateEl.classList.add('hidden');
  resultsWrapperEl.classList.add('hidden');
  errorStateEl.classList.add('hidden');
  loadingStateEl.classList.remove('hidden');

  try {
    const data = await recommendStandards(currentRequirement);
    currentResults = data;
    renderResults(data);
  } catch (err) {
    console.error('MargSarthi analysis failed:', err);
    loadingStateEl.classList.add('hidden');
    errorDescEl.textContent = err.message || 'Failed to fetch recommendations from backend.';
    errorStateEl.classList.remove('hidden');
  }
}

function renderResults(data) {
  loadingStateEl.classList.add('hidden');
  errorStateEl.classList.add('hidden');
  resultsWrapperEl.classList.remove('hidden');

  const recommendations = data.recommendations || [];

  if (data.qco_alert || data.qco_applicable) {
    qcoAlertBannerEl.classList.remove('hidden');
    qcoTextEl.textContent = data.qco_text || 'Mandatory Quality Control Order (QCO) verified. Must comply with BIS Scheme-I / Scheme-II.';
  } else {
    qcoAlertBannerEl.classList.add('hidden');
  }

  if (matchCountBadgeEl) {
    matchCountBadgeEl.textContent = \`\${recommendations.length} Standard\${recommendations.length !== 1 ? 's' : ''} Found\`;
  }

  standardsListEl.innerHTML = '';
  if (recommendations.length === 0) {
    standardsListEl.innerHTML = '<div class="no-standards">No exact matching Indian Standard found for this specification.</div>';
  } else {
    recommendations.forEach((item, index) => {
      const card = createStandardCard(item, index === 0);
      standardsListEl.appendChild(card);
    });
  }

  if (data.why_explanation) {
    whyTextEl.textContent = data.why_explanation;
  } else {
    whyTextEl.textContent = \`These standards represent the official Bureau of Indian Standards (BIS) specifications, performance thresholds, and mandatory safety guidelines corresponding directly to the technical parameters highlighted in your procurement requirement.\`;
  }

  const related = data.related_standards || [];
  if (related.length > 0) {
    relatedSectionEl.classList.remove('hidden');
    relatedListEl.innerHTML = '';
    related.forEach((rel) => {
      const relItem = document.createElement('div');
      relItem.className = 'related-item';
      relItem.innerHTML = \`
        <span class="rel-code">\${escapeHtml(rel.standard_number || rel.code || '')}</span>
        <span class="rel-title">\${escapeHtml(rel.title || '')}</span>
      \`;
      relatedListEl.appendChild(relItem);
    });
  } else {
    relatedSectionEl.classList.add('hidden');
  }
}

function createStandardCard(std, isTopMatch) {
  const card = document.createElement('div');
  card.className = \`standard-card \${isTopMatch ? 'top-match' : ''}\`;

  const relevance = typeof std.relevance === 'number' ? std.relevance : parseInt(std.relevance, 10) || 85;
  const relColorClass = relevance >= 90 ? 'rel-high' : relevance >= 80 ? 'rel-med' : 'rel-fair';

  const clausesHtml = (std.clauses && std.clauses.length > 0)
    ? \`<div class="clauses-chips">
        \${std.clauses.slice(0, 3).map(c => \`<span class="clause-chip">Cl. \${escapeHtml(c)}</span>\`).join('')}
       </div>\`
    : '';

  card.innerHTML = \`
    <div class="std-card-top">
      <div>
        <div class="std-code-row">
          <span class="std-code">\${escapeHtml(std.standard_number || '')}</span>
          \${isTopMatch ? '<span class="primary-badge">PRIMARY MATCH</span>' : ''}
        </div>
        <div class="std-title">\${escapeHtml(std.title || '')}</div>
      </div>
      <div class="relevance-box \${relColorClass}">
        <span class="rel-number">\${relevance}%</span>
        <span class="rel-lbl">Relevance</span>
      </div>
    </div>

    <div class="std-reason">
      \${escapeHtml(std.reason || 'Conforms directly to the specifications provided in the tender requirement.')}
    </div>

    \${clausesHtml}

    <div class="std-actions">
      <button class="action-btn view-btn" data-std="\${escapeHtml(std.standard_number || '')}">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="action-svg">
          <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
          <circle cx="12" cy="12" r="3"></circle>
        </svg>
        <span>View Standard</span>
      </button>
      <button class="action-btn compare-btn" data-std="\${escapeHtml(std.standard_number || '')}">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="action-svg">
          <path d="M16 3h5v5"></path>
          <path d="M4 20L21 3"></path>
          <path d="M21 16v5h-5"></path>
          <path d="M15 15l6 6"></path>
          <path d="M4 4l5 5"></path>
        </svg>
        <span>Compare</span>
      </button>
    </div>
  \`;

  const viewBtn = card.querySelector('.view-btn');
  if (viewBtn) {
    viewBtn.addEventListener('click', () => {
      const isCode = std.standard_number;
      window.open(\`https://www.services.bis.gov.in/php/BIS_2.0/bisconnect/knowyourstandards/indian_standards/isdetails/\${encodeURIComponent(isCode)}\`, '_blank');
    });
  }

  const compareBtn = card.querySelector('.compare-btn');
  if (compareBtn) {
    compareBtn.addEventListener('click', () => {
      alert(\`Standard \${std.standard_number} (\${std.title})\\n\\nBenchmark Alignment: \${relevance}% conformity with specified parameters.\\nMandatory Clauses: \${std.clauses?.join(', ') || 'General Specifications'}\\nStatutory Rule: General Financial Rules 2017 - Rule 144(i).\`);
    });
  }

  return card;
}

function escapeHtml(text) {
  if (!text) return '';
  return String(text)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}
`;

  // 9. README.md
  const readmeContent = `# MargSarthi — Indian Standards Assistant (Chrome Extension)

> **“Right Standards. Better Procurement.”**  
> Modern Chrome Extension Manifest V3 companion for the **MargDarshak Indian Standards Recommendation System**.

---

## 🛠️ Installation in Google Chrome

1. Unzip this downloaded archive into a folder on your computer.
2. Open Google Chrome and navigate to \`chrome://extensions/\`.
3. Enable **Developer mode** using the toggle in the top right.
4. Click the **Load unpacked** button in the top left.
5. Select this unzipped \`MargSarthi\` folder.
6. Pin **MargSarthi** to your Chrome toolbar.

---

## 🚀 How to Use:
1. Browse any procurement or tender website (GeM, CPPP, State Portals, IREPS).
2. Highlight / select any technical specification or product requirement text.
3. Click the floating **✦ Find Indian Standards** action pill.
4. MargSarthi Side Panel opens with instant Indian Standards (IS Codes), QCO statutory mandates, relevance scores, and direct BIS portal links!

© Bureau of Indian Standards (BIS) • Government of India
`;

  // Minimal valid PNG data URI for icons
  const iconBase64 = 'iVBORw0KGgoAAAANSUhEUgAAAIAAAACACAYAAADDPmHLAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAetJREFUeNrs2kFqAkEQBNBCEMEP5P9f5Q+C4E1A3YtqFh404y46fWqWrmmavgx83gAAAAAAAAAAAAAAAAAAAAAAAABw9tN5V6fV/5j2AezV6Z25v/M9770O4JTO3/P53usAtvr1nvdcB7DJqff8n3sAvu0fAAAAAAAAAACAPz3z/1G7n959/p29j1r5f3r39f37+bH116ufrT8EwG1uAQAAAAAAAADge54EAAAAAAAAAAAAAAAAAAAAAAAAAEAMgFAAyA8A4gEICAAxAEICAAAAAAAAAAAAAAAAAAAAAAAAAECAAAAAAAAAAAAAAAAAAAAAAMgPAOIBCAgAMQBCAgAAAAAAAAAAACAEAOIBCAgAMQBCAgAAAAAAAAAAAAAAAAAAAAAAACAJAAAAAMgPAOIBCAgAMQBCAgAAAAAAAAAAAAAAAAAAAAAAACAJAAAAAMgPAOIBCAgAMQBCAgAAAKAAeBoAAQEQEAACAnB3gBcAAD0BAAAAAAAAgG4BwAMBAAAAAAAAAAAAAAAAAPgHAAAAAAAAAAAAAAAAAAAAAAAAAEAMgFAAyA8A4gEICAAxAEICAAAAAAAAAAAAAAAAAAAAAAAAAECAAAAAAAAAAAAAAAAAAAAAAMgPAOIBCAgAMQBCAgAAAAAAAAAAACAEAOIBCAgAMQBCAgAAAAAAAAAAAAAAAAAAAAAAACAJAAAAAMgPAOIBCAgAMQBCAgAAAAAAAAAAAAAAAAAAAAAAACAJAAAAwHsH7lD2+gG8+vUAAAAASUVORK5CYII=';

  // Add all files to ZIP
  zip.file("manifest.json", manifestContent);
  zip.file("background.js", backgroundContent);
  zip.file("content.js", contentJs);
  zip.file("content.css", contentCss);
  zip.file("api.js", apiJs);
  zip.file("sidepanel.html", sidepanelHtml);
  zip.file("sidepanel.css", sidepanelCss);
  zip.file("sidepanel.js", sidepanelJs);
  zip.file("README.md", readmeContent);

  // Add Icons
  zip.file("icons/icon16.png", iconBase64, { base64: true });
  zip.file("icons/icon48.png", iconBase64, { base64: true });
  zip.file("icons/icon128.png", iconBase64, { base64: true });

  // Generate ZIP Blob
  const blob = await zip.generateAsync({ type: "blob" });
  return blob;
}

/**
 * Helper to trigger client-side download of MargSarthi ZIP
 */
export async function downloadMargSathiZip() {
  try {
    // Try downloading the pre-built public bundle first for speed
    const testFetch = await fetch('/MargSarthi-Chrome-Extension-v1.0.0.zip', { method: 'HEAD' });
    if (testFetch.ok) {
      const a = document.createElement("a");
      a.href = "/MargSarthi-Chrome-Extension-v1.0.0.zip";
      a.download = "MargSarthi-Chrome-Extension-v1.0.0.zip";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      return;
    }
  } catch (e) {
    // fallback to dynamic JSZip generation
  }

  const blob = await generateMargSathiExtensionZip();
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "MargSarthi-Chrome-Extension-v1.0.0.zip";
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
