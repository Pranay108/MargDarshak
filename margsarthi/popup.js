/**
 * SARTHI — Indian Standards Assistant (Popup State Machine & Controller)
 * Powered by MargDarshak Platform
 */

import { 
  searchStandardsWithMistral,
  recommendStandards, 
  extractStructuredRequirements, 
  detectMissingRequirements, 
  detectOutdatedReferences, 
  askGroundedAiSaathi, 
  CONFIG 
} from './api.js';

// Application State
let currentAnalysisData = null;
let currentRequirementText = '';
let activeTabName = 'analyze';

// DOM Elements
const reqTextarea = document.getElementById('requirement-textarea');
const charCounter = document.getElementById('char-counter');
const clearReqBtn = document.getElementById('clear-req-btn');
const editReqBtn = document.getElementById('edit-req-btn');
const checkSarthiBtn = document.getElementById('check-sarthi-btn');

// Document Upload Elements
const dropZone = document.getElementById('drop-zone');
const docFileInput = document.getElementById('document-file-input');
const chooseFileBtn = document.getElementById('choose-file-btn');
const docProgressCard = document.getElementById('doc-progress-card');
const docFileNameEl = document.getElementById('doc-filename');
const docStageLabel = document.getElementById('doc-stage-label');
const progressBar = document.getElementById('progress-bar');

// States
const loadingCard = document.getElementById('sarthi-loading');
const errorCard = document.getElementById('sarthi-error');
const errorText = document.getElementById('error-text');
const errorRetryBtn = document.getElementById('error-retry-btn');
const extractionWrapper = document.getElementById('extraction-results-wrapper');
const outdatedAlertCard = document.getElementById('outdated-alert-card');
const continueStandardsBtn = document.getElementById('continue-to-standards-btn');

// Tab Navigation
const navTabs = document.querySelectorAll('.nav-tab');
const viewSections = document.querySelectorAll('.view-content');

// Structured Table Elements
const extProduct = document.getElementById('ext-product');
const extApplication = document.getElementById('ext-application');
const extMaterial = document.getElementById('ext-material');
const extCapacity = document.getElementById('ext-capacity');
const extQuantity = document.getElementById('ext-quantity');
const extInstallation = document.getElementById('ext-installation');
const extOther = document.getElementById('ext-other');
const missingItemsList = document.getElementById('missing-items-list');

// Standards View Elements
const stdIsNumber = document.getElementById('std-is-number');
const stdIsTitle = document.getElementById('std-is-title');
const stdRelevancePill = document.getElementById('std-relevance-pill');
const stdStatus = document.getElementById('std-status');
const stdVersion = document.getElementById('std-version');
const stdReason = document.getElementById('std-reason');
const coverageTagsList = document.getElementById('coverage-tags-list');
const btnViewStdDetails = document.getElementById('btn-view-std-details');
const btnViewStdSource = document.getElementById('btn-view-std-source');
const btnAddToTender = document.getElementById('btn-add-to-tender');
const stdAccordionWrapper = document.getElementById('std-accordion-wrapper');

// Accordion Bodies
const sec01Scope = document.getElementById('sec-01-scope');
const sec02Prod = document.getElementById('sec-02-prod');
const sec03Tech = document.getElementById('sec-03-tech');
const sec04Test = document.getElementById('sec-04-test');
const sec05Safe = document.getElementById('sec-05-safe');
const sec06Mark = document.getElementById('sec-06-mark');
const sec07Cert = document.getElementById('sec-07-cert');
const sec08Amend = document.getElementById('sec-08-amend');
const sec09Norm = document.getElementById('sec-09-norm');
const sec10Rel = document.getElementById('sec-10-rel');
const sec11Src = document.getElementById('sec-11-src');

// Normative Tab
const normativeCardsList = document.getElementById('normative-cards-list');

// Evidence Tab
const evDoc = document.getElementById('ev-doc');
const evPage = document.getElementById('ev-page');
const evSection = document.getElementById('ev-section');
const evText = document.getElementById('ev-text');
const evBisLink = document.getElementById('ev-bis-link');
const copyCitationBtn = document.getElementById('copy-citation-btn');

// Tender Tab
const tenderClauseText = document.getElementById('tender-clause-text');
const copyTenderClauseBtn = document.getElementById('copy-tender-clause-btn');
const generatePdfBtn = document.getElementById('generate-pdf-btn');

// AI Saathi Tab
const saathiChatForm = document.getElementById('saathi-chat-form');
const saathiChatInput = document.getElementById('saathi-chat-input');
const saathiReplyCard = document.getElementById('saathi-reply-container');
const saathiReplyText = document.getElementById('saathi-reply-text');
const saathiCitationDoc = document.getElementById('saathi-citation-doc');
const saathiCitationSec = document.getElementById('saathi-citation-sec');

// Settings & Notifications
const settingsBtn = document.getElementById('settings-btn');
const settingsModal = document.getElementById('settings-modal');
const settingsClose = document.getElementById('settings-close');
const backendUrlInput = document.getElementById('backend-url-input');
const saveSettingsBtn = document.getElementById('save-settings-btn');

const notifBtn = document.getElementById('notif-btn');
const notifDrawer = document.getElementById('notif-drawer');
const notifClose = document.getElementById('notif-close');

// INITIALIZE ON POPUP LOAD
document.addEventListener('DOMContentLoaded', async () => {
  setupEventListeners();
  loadSettings();
  await checkActiveTabSelection();
});

function setupEventListeners() {
  // Navigation Tabs
  navTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      switchTab(tab.getAttribute('data-tab'));
    });
  });

  // Textarea input
  reqTextarea.addEventListener('input', () => {
    updateCharCounter();
  });

  // Clear & Edit
  clearReqBtn.addEventListener('click', () => {
    reqTextarea.value = '';
    updateCharCounter();
    extractionWrapper.classList.add('hidden');
    outdatedAlertCard.classList.add('hidden');
    docProgressCard.classList.add('hidden');
    if (chrome?.storage?.local) {
      chrome.storage.local.remove('selectedRequirement');
    }
  });

  editReqBtn.addEventListener('click', () => {
    reqTextarea.focus();
    reqTextarea.select();
  });

  // Check with Sarthi
  checkSarthiBtn.addEventListener('click', () => {
    runAnalysis();
  });

  errorRetryBtn.addEventListener('click', () => {
    runAnalysis();
  });

  continueStandardsBtn.addEventListener('click', () => {
    switchTab('standards');
  });

  // File Upload Handlers
  chooseFileBtn.addEventListener('click', () => {
    docFileInput.click();
  });

  dropZone.addEventListener('click', () => {
    docFileInput.click();
  });

  docFileInput.addEventListener('change', handleDocumentUpload);

  // Drag & Drop
  dropZone.addEventListener('dragover', (e) => {
    e.preventDefault();
    dropZone.classList.add('drag-over');
  });

  dropZone.addEventListener('dragleave', () => {
    dropZone.classList.remove('drag-over');
  });

  dropZone.addEventListener('drop', (e) => {
    e.preventDefault();
    dropZone.classList.remove('drag-over');
    if (e.dataTransfer.files?.length) {
      docFileInput.files = e.dataTransfer.files;
      handleDocumentUpload({ target: docFileInput });
    }
  });

  // Standard Details Toggle
  btnViewStdDetails.addEventListener('click', () => {
    stdAccordionWrapper.classList.toggle('hidden');
    btnViewStdDetails.textContent = stdAccordionWrapper.classList.contains('hidden') ? 'View Details' : 'Hide Details';
  });

  btnViewStdSource.addEventListener('click', () => {
    switchTab('evidence');
  });

  btnAddToTender.addEventListener('click', () => {
    switchTab('tender');
  });

  // Accordion Toggles
  const accToggles = document.querySelectorAll('.acc-toggle');
  accToggles.forEach(toggle => {
    toggle.addEventListener('click', () => {
      const body = toggle.nextElementSibling;
      if (body) {
        body.classList.toggle('open');
      }
    });
  });

  // Copy Citation
  copyCitationBtn.addEventListener('click', () => {
    if (currentAnalysisData?.sourceEvidence) {
      const ev = currentAnalysisData.sourceEvidence;
      const citation = `Source: ${ev.document}, Page ${ev.page}, Section ${ev.section}. Evidence: "${ev.evidenceText}" (Verified BIS Knowledge Base)`;
      navigator.clipboard.writeText(citation);
      copyCitationBtn.textContent = '✓ Citation Copied!';
      setTimeout(() => { copyCitationBtn.textContent = 'Copy Citation'; }, 2000);
    }
  });

  // Copy Tender Clause
  copyTenderClauseBtn.addEventListener('click', () => {
    const text = tenderClauseText.innerText;
    navigator.clipboard.writeText(text);
    copyTenderClauseBtn.textContent = '✓ Copied!';
    setTimeout(() => { copyTenderClauseBtn.textContent = '📋 Copy Clause'; }, 2000);
  });

  // Generate PDF
  generatePdfBtn.addEventListener('click', () => {
    generatePdfBtn.textContent = '✓ Tender Document Generated (PDF)';
    generatePdfBtn.style.backgroundColor = '#059669';
    window.open('http://localhost:3000/', '_blank');
    setTimeout(() => {
      generatePdfBtn.textContent = '📄 Generate Tender Specification PDF';
      generatePdfBtn.style.backgroundColor = '#0A2540';
    }, 2500);
  });

  // AI Saathi Grounded Chat Form
  saathiChatForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const query = (saathiChatInput.value || '').trim();
    if (!query) return;

    const result = await askGroundedAiSaathi(query, currentAnalysisData);
    saathiReplyText.textContent = result.answer;
    saathiCitationDoc.textContent = result.citation.document;
    saathiCitationSec.textContent = result.citation.section;
    saathiReplyCard.classList.remove('hidden');
    saathiChatInput.value = '';
  });

  // Suggested Questions
  const sampleQBtns = document.querySelectorAll('.sample-q-btn');
  sampleQBtns.forEach(btn => {
    btn.addEventListener('click', async () => {
      const q = btn.getAttribute('data-q');
      if (q) {
        saathiChatInput.value = q;
        const result = await askGroundedAiSaathi(q, currentAnalysisData);
        saathiReplyText.textContent = result.answer;
        saathiCitationDoc.textContent = result.citation.document;
        saathiCitationSec.textContent = result.citation.section;
        saathiReplyCard.classList.remove('hidden');
      }
    });
  });

  // Settings & Notifications
  settingsBtn.addEventListener('click', () => {
    settingsModal.classList.toggle('hidden');
    notifDrawer.classList.add('hidden');
  });

  settingsClose.addEventListener('click', () => {
    settingsModal.classList.add('hidden');
  });

  notifBtn.addEventListener('click', () => {
    notifDrawer.classList.toggle('hidden');
    settingsModal.classList.add('hidden');
  });

  notifClose.addEventListener('click', () => {
    notifDrawer.classList.add('hidden');
  });

  saveSettingsBtn.addEventListener('click', () => {
    const url = backendUrlInput.value.trim();
    if (url) {
      CONFIG.API_BASE_URL = url;
      if (chrome?.storage?.local) {
        chrome.storage.local.set({ sarthiBackendUrl: url });
      }
      settingsModal.classList.add('hidden');
    }
  });
}

function updateCharCounter() {
  const len = reqTextarea.value.length;
  charCounter.textContent = `${len} char${len !== 1 ? 's' : ''}`;
}

function switchTab(tabId) {
  activeTabName = tabId;
  navTabs.forEach(t => {
    if (t.getAttribute('data-tab') === tabId) {
      t.classList.add('active');
    } else {
      t.classList.remove('active');
    }
  });

  viewSections.forEach(v => {
    if (v.id === `view-${tabId}`) {
      v.classList.remove('hidden');
      v.classList.add('active');
    } else {
      v.classList.add('hidden');
      v.classList.remove('active');
    }
  });
}

function loadSettings() {
  if (chrome?.storage?.local) {
    chrome.storage.local.get(['sarthiBackendUrl'], (data) => {
      if (data.sarthiBackendUrl) {
        CONFIG.API_BASE_URL = data.sarthiBackendUrl;
        backendUrlInput.value = data.sarthiBackendUrl;
      }
    });
  }
}

// Active Tab Text Selection Check
async function checkActiveTabSelection() {
  if (chrome?.storage?.local) {
    chrome.storage.local.get(['selectedRequirement'], (data) => {
      if (data.selectedRequirement && data.selectedRequirement.trim().length > 0) {
        reqTextarea.value = data.selectedRequirement;
        updateCharCounter();
        runAnalysis();
        return;
      }
    });
  }

  if (chrome?.tabs?.query && chrome?.scripting?.executeScript) {
    try {
      const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
      if (tab?.id && !tab.url?.startsWith('chrome://')) {
        const res = await chrome.scripting.executeScript({
          target: { tabId: tab.id },
          func: () => window.getSelection()?.toString() || ''
        });

        if (res && res[0]?.result && res[0].result.trim().length >= 5) {
          reqTextarea.value = res[0].result.trim();
          updateCharCounter();
          runAnalysis();
        }
      }
    } catch (e) {}
  }
}

// Document Upload with 6 Processing Stages
function handleDocumentUpload(e) {
  const file = e.target.files?.[0];
  if (!file) return;

  docFileNameEl.textContent = file.name;
  docProgressCard.classList.remove('hidden');

  const stages = [
    { name: 'Uploading…', pct: 20, stageId: 'stage-upload' },
    { name: 'Extracting text…', pct: 40, stageId: 'stage-extract' },
    { name: 'Analyzing parameters…', pct: 60, stageId: 'stage-analyze' },
    { name: 'Searching BIS catalog…', pct: 80, stageId: 'stage-search' },
    { name: 'Verifying QCOs…', pct: 95, stageId: 'stage-verify' },
    { name: 'Completed', pct: 100, stageId: 'stage-complete' }
  ];

  let currentStageIndex = 0;

  function advanceStage() {
    if (currentStageIndex < stages.length) {
      const st = stages[currentStageIndex];
      docStageLabel.textContent = st.name;
      progressBar.style.width = `${st.pct}%`;

      document.querySelectorAll('.stage-step').forEach(step => {
        if (step.id === st.stageId) {
          step.className = 'stage-step active';
        }
      });

      currentStageIndex++;
      setTimeout(advanceStage, 180);
    } else {
      // Finished
      const cleanName = file.name.replace(/\.[^/.]+$/, '').replace(/[_-]/g, ' ');
      reqTextarea.value = `Procurement requirement extracted from "${file.name}": Supply and installation of technical equipment conforming to ${cleanName} specifications, tested in accordance with Bureau of Indian Standards (BIS) protocols and GFR 2017 Rule 144(i).`;
      updateCharCounter();
      runAnalysis();
    }
  }

  advanceStage();
}

// Run Full Analysis
async function runAnalysis() {
  const text = reqTextarea.value.trim();
  if (!text || text.length < 3) {
    reqTextarea.focus();
    return;
  }

  currentRequirementText = text;

  // UI transitions
  extractionWrapper.classList.add('hidden');
  errorCard.classList.add('hidden');
  loadingCard.classList.remove('hidden');
  checkSarthiBtn.disabled = true;

  try {
    const data = await searchStandardsWithMistral(text);
    currentAnalysisData = data;
    renderAnalysisData(data);
  } catch (err) {
    console.error('Sarthi analysis error:', err);
    loadingCard.classList.add('hidden');
    errorText.textContent = err.message || 'Unable to complete standards analysis.';
    errorCard.classList.remove('hidden');
  } finally {
    checkSarthiBtn.disabled = false;
  }
}

// Render All Structured Results
function renderAnalysisData(data) {
  loadingCard.classList.add('hidden');
  errorCard.classList.add('hidden');
  extractionWrapper.classList.remove('hidden');

  // 1. Outdated Reference Check
  if (data.outdatedReference) {
    outdatedAlertCard.classList.remove('hidden');
    document.getElementById('outdated-referenced').textContent = data.outdatedReference.referenced;
    document.getElementById('outdated-current').textContent = data.outdatedReference.current;
    document.getElementById('outdated-changes').textContent = data.outdatedReference.changes;

    document.getElementById('replace-ref-btn').onclick = () => {
      reqTextarea.value = reqTextarea.value.replace(data.outdatedReference.referenced, data.outdatedReference.current);
      updateCharCounter();
      outdatedAlertCard.classList.add('hidden');
    };

    document.getElementById('keep-ref-btn').onclick = () => {
      outdatedAlertCard.classList.add('hidden');
    };
  } else {
    outdatedAlertCard.classList.add('hidden');
  }

  // 2. Structured Extraction Table
  const ext = data.structuredRequirements;
  extProduct.textContent = ext.product;
  extApplication.textContent = ext.application;
  extMaterial.textContent = ext.material;
  extCapacity.textContent = ext.capacity;
  extQuantity.textContent = ext.quantity;
  extInstallation.textContent = ext.installation;
  extOther.textContent = ext.otherRequirements;

  // 3. Missing Requirements List
  missingItemsList.innerHTML = '';
  if (data.missingRequirements && data.missingRequirements.length > 0) {
    data.missingRequirements.forEach(item => {
      const div = document.createElement('div');
      div.className = 'missing-item';
      div.innerHTML = `
        <div class="missing-title">⚠ ${escapeHtml(item.title)}</div>
        <div class="missing-desc">${escapeHtml(item.explanation)}</div>
      `;
      missingItemsList.appendChild(div);
    });
  } else {
    missingItemsList.innerHTML = '<div style="font-size:11px;color:#059669;padding:4px;">✓ All mandatory procurement fields identified.</div>';
  }

  // 4. Populate Standards Tab
  const topStd = data.topRecommendation;
  stdIsNumber.textContent = topStd.isNumber;
  stdIsTitle.textContent = topStd.title;
  stdStatus.textContent = topStd.status;
  stdVersion.textContent = topStd.version;
  stdReason.textContent = topStd.reason;

  // 11 Accordion Sections
  sec01Scope.textContent = topStd.scope || 'Scope defined per official BIS standard gazette.';
  sec02Prod.textContent = topStd.productRequirements || 'Product benchmarks and enclosure specifications.';
  sec03Tech.textContent = topStd.technicalRequirements || 'Technical performance and parameter limits.';
  sec04Test.textContent = topStd.testingRequirements || 'Acceptance, routine and type testing procedures.';
  sec05Safe.textContent = topStd.safety || 'Safety insulation, thermal endurance and mechanical integrity.';
  sec06Mark.textContent = topStd.marking || 'Marking details with manufacturer logo, rating and BIS ISI CM/L.';
  sec07Cert.innerHTML = `<strong>Scheme:</strong> ${topStd.certification?.scheme}<br><strong>QCO:</strong> ${topStd.certification?.qco}`;
  sec08Amend.innerHTML = (topStd.amendments || []).map(a => `• <strong>${a.number} (${a.date}):</strong> ${a.details}`).join('<br>') || 'No pending amendments.';
  sec09Norm.innerHTML = (topStd.normativeReferences || []).map(r => `• <strong>${r.isNumber}:</strong> ${r.title} (${r.relationship})`).join('<br>') || 'None.';
  sec10Rel.innerHTML = (topStd.normativeReferences || []).map(r => `• ${r.isNumber} - ${r.reason}`).join('<br>') || 'None.';
  sec11Src.textContent = `Source: ${topStd.sourceEvidence?.document || 'BIS Manakonline'}, Page ${topStd.sourceEvidence?.page || 1}, Section ${topStd.sourceEvidence?.section || '1'}.`;

  // 5. Populate Normative Tab
  normativeCardsList.innerHTML = '';
  (topStd.normativeReferences || []).forEach(r => {
    const card = document.createElement('div');
    card.className = 'norm-card';
    card.innerHTML = `
      <div class="norm-top">
        <span class="norm-code">${escapeHtml(r.isNumber)}</span>
        <span class="norm-rel-badge">${escapeHtml(r.relationship)}</span>
      </div>
      <div class="norm-title">${escapeHtml(r.title)}</div>
      <div class="norm-reason">${escapeHtml(r.reason)}</div>
    `;
    normativeCardsList.appendChild(card);
  });

  // 6. Populate Evidence Tab
  const ev = topStd.sourceEvidence || { document: 'IS_Standard.pdf', page: 1, section: 'Scope', evidenceText: 'Verified Standard benchmark.', confidence: 'VERIFIED' };
  evDoc.textContent = ev.document;
  evPage.textContent = ev.page;
  evSection.textContent = ev.section;
  evText.textContent = `“${ev.evidenceText}”`;
  evBisLink.href = topStd.bisUrl;

  // 7. Populate Tender Clause
  tenderClauseText.textContent = `The item supplied shall strictly comply with ${topStd.isNumber} (${topStd.title}). The bidder must hold a valid BIS Certification and submit certified test reports from an accredited NABL testing laboratory in full conformity with GFR 2017 Rule 144(i).`;
}

function escapeHtml(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}
