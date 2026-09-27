/**
 * MargSarthi — Chrome Extension Side Panel Controller
 * Handles UI events, communication with Content Script/Background Service Worker,
 * calls the MargDarshak API service layer, and renders government-grade Indian Standards recommendations.
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
  // Load saved API URL
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

  // Listen for runtime messages from Content Script or Background
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
  // Analyze Button
  if (analyzeBtn) {
    analyzeBtn.addEventListener('click', () => {
      if (currentRequirement && currentRequirement.trim().length > 0) {
        runAnalysis();
      }
    });
  }

  // Clear Selection
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

  // Retry Button
  if (retryBtn) {
    retryBtn.addEventListener('click', () => {
      runAnalysis();
    });
  }

  // Sample Chips
  sampleChips.forEach((chip) => {
    chip.addEventListener('click', () => {
      const sample = chip.getAttribute('data-sample');
      if (sample) {
        setRequirementText(sample);
        runAnalysis();
      }
    });
  });

  // Settings Panel Toggle
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

  // Follow-up Ask Form
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

  // Display truncated preview if very long
  if (text.length > 320) {
    reqTextEl.innerHTML = `“${escapeHtml(text.substring(0, 310))}…” <span class="char-badge">(${text.length} chars)</span>`;
  } else {
    reqTextEl.textContent = `“${text}”`;
  }

  // Save to storage
  if (chrome?.storage?.local) {
    chrome.storage.local.set({ selectedRequirement: text });
  }
}

async function runAnalysis() {
  if (!currentRequirement || currentRequirement.trim().length === 0) return;

  // UI state transitions
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

  // 1. QCO Banner
  if (data.qco_alert || data.qco_applicable) {
    qcoAlertBannerEl.classList.remove('hidden');
    qcoTextEl.textContent = data.qco_text || 'Mandatory Quality Control Order (QCO) verified. Must comply with BIS Scheme-I / Scheme-II.';
  } else {
    qcoAlertBannerEl.classList.add('hidden');
  }

  // 2. Count badge
  if (matchCountBadgeEl) {
    matchCountBadgeEl.textContent = `${recommendations.length} Standard${recommendations.length !== 1 ? 's' : ''} Found`;
  }

  // 3. Standards List
  standardsListEl.innerHTML = '';
  if (recommendations.length === 0) {
    standardsListEl.innerHTML = '<div class="no-standards">No exact matching Indian Standard found for this specification.</div>';
  } else {
    recommendations.forEach((item, index) => {
      const card = createStandardCard(item, index === 0);
      standardsListEl.appendChild(card);
    });
  }

  // 4. Why these standards?
  if (data.why_explanation) {
    whyTextEl.textContent = data.why_explanation;
  } else {
    whyTextEl.textContent = `These standards represent the official Bureau of Indian Standards (BIS) specifications, performance thresholds, and mandatory safety guidelines corresponding directly to the technical parameters highlighted in your procurement requirement.`;
  }

  // 5. Related Standards
  const related = data.related_standards || [];
  if (related.length > 0) {
    relatedSectionEl.classList.remove('hidden');
    relatedListEl.innerHTML = '';
    related.forEach((rel) => {
      const relItem = document.createElement('div');
      relItem.className = 'related-item';
      relItem.innerHTML = `
        <span class="rel-code">${escapeHtml(rel.standard_number || rel.code || '')}</span>
        <span class="rel-title">${escapeHtml(rel.title || '')}</span>
      `;
      relatedListEl.appendChild(relItem);
    });
  } else {
    relatedSectionEl.classList.add('hidden');
  }
}

function createStandardCard(std, isTopMatch) {
  const card = document.createElement('div');
  card.className = `standard-card ${isTopMatch ? 'top-match' : ''}`;

  const relevance = typeof std.relevance === 'number' ? std.relevance : parseInt(std.relevance, 10) || 85;
  const relColorClass = relevance >= 90 ? 'rel-high' : relevance >= 80 ? 'rel-med' : 'rel-fair';

  const clausesHtml = (std.clauses && std.clauses.length > 0)
    ? `<div class="clauses-chips">
        ${std.clauses.slice(0, 3).map(c => `<span class="clause-chip">Cl. ${escapeHtml(c)}</span>`).join('')}
       </div>`
    : '';

  card.innerHTML = `
    <div class="std-card-top">
      <div>
        <div class="std-code-row">
          <span class="std-code">${escapeHtml(std.standard_number || '')}</span>
          ${isTopMatch ? '<span class="primary-badge">PRIMARY MATCH</span>' : ''}
        </div>
        <div class="std-title">${escapeHtml(std.title || '')}</div>
      </div>
      <div class="relevance-box ${relColorClass}">
        <span class="rel-number">${relevance}%</span>
        <span class="rel-lbl">Relevance</span>
      </div>
    </div>

    <div class="std-reason">
      ${escapeHtml(std.reason || 'Conforms directly to the specifications provided in the tender requirement.')}
    </div>

    ${clausesHtml}

    <div class="std-actions">
      <button class="action-btn view-btn" data-std="${escapeHtml(std.standard_number || '')}">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="action-svg">
          <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
          <circle cx="12" cy="12" r="3"></circle>
        </svg>
        <span>View Standard</span>
      </button>
      <button class="action-btn compare-btn" data-std="${escapeHtml(std.standard_number || '')}">
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
  `;

  // Attach button actions
  const viewBtn = card.querySelector('.view-btn');
  if (viewBtn) {
    viewBtn.addEventListener('click', () => {
      const isCode = std.standard_number;
      window.open(`https://www.services.bis.gov.in/php/BIS_2.0/bisconnect/knowyourstandards/indian_standards/isdetails/${encodeURIComponent(isCode)}`, '_blank');
    });
  }

  const compareBtn = card.querySelector('.compare-btn');
  if (compareBtn) {
    compareBtn.addEventListener('click', () => {
      alert(`Standard ${std.standard_number} (${std.title})\n\nBenchmark Alignment: ${relevance}% conformity with specified parameters.\nMandatory Clauses: ${std.clauses?.join(', ') || 'General Specifications'}\nStatutory Rule: General Financial Rules 2017 - Rule 144(i).`);
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
