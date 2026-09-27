# Sarthi — Indian Standards Assistant

> **Official Browser Companion to the MargDarshak Platform**  
> Built for Procurement Officers, PSUs, Government Departments, Procurement Agencies, and Professional Buyers.  
> Powered by **MargDarshak**.

---

## 🌟 Overview

**Sarthi** is a production-grade browser extension designed to help procurement officers and technical evaluators identify, verify, and cite relevant Indian Standards (IS) directly from webpages, e-procurement portals (GeM, CPPP, State e-Procurement), tender documents, and PDFs.

---

## 🏛️ Institutional Design Principles

- **Institutional Government Aesthetic**: Built with clean white surfaces, deep institutional blue (`#0A2540`, `#0B2F58`), subtle borders (`#D9E2EC`), and crisp Inter typography.
- **Evidence-Grounded**: Every recommendation is traceable to verified BIS catalogs, gazette notifications, clauses, and pages.
- **Strict Data Integrity**: Missing requirements are explicitly flagged (`⚠ Material grade not specified`, `⚠ Non-measurable requirement detected`). Sarthi never invents or guesses parameters.
- **Non-Intrusive Workflow**: Works via right-click context menus, floating action pills on text selection, or document drag-and-drop.

---

## 🚀 Key Features

1. **Selected Text Analysis**:
   - Highlight any specification on any webpage.
   - Context Menu: Right click → `Sarthi` → `Analyze with Sarthi`, `Find Indian Standards`, or `Add to Tender`.
   - Floating Action Pill: `✦ Check with Sarthi`.

2. **Structured Requirement Extraction**:
   - Automatically extracts Product/Category, Application, Material, Capacity, Quantity, Installation, and Other Requirements into high-density tables.

3. **Missing & Ambiguous Requirement Detection**:
   - Detects vague language (e.g., "high quality material") and flags `⚠ Non-measurable requirement detected`.
   - Identifies omitted parameters (e.g., material grades, testing protocol).

4. **11-Section Standard Details**:
   - Scope, Product Requirements, Technical Parameters, Testing Requirements, Safety, Marking/Labelling, Certification, Amendments, Normative References, Related Standards, Source Documents.

5. **Outdated Version & Amendment Detection**:
   - Detects superseded standards in uploaded tenders (e.g., `IS 10322:1982`) and recommends current verified standards (`IS 10322 (Part 5/Sec 3):2012`) with confirmation controls.

6. **Certification & Compliance Verification**:
   - Displays verified BIS ISI Scheme-I, CRS Scheme-II, and mandatory DPIIT/Ministry Quality Control Orders (QCOs).

7. **Multi-Format Document Upload**:
   - Supports PDF, DOC, DOCX, TXT, XLS, XLSX, PPT, PPTX, PNG, JPG, and JPEG.
   - 6-Stage Progress Indicator: `Uploading → Extracting → Analyzing → Searching → Verifying → Completed`.

8. **Grounded AI Saathi**:
   - Interactive research assistant citing specific standard numbers, clauses, and pages.

9. **Tender Spec Builder & PDF Export**:
   - Auto-compiles 16 standard tender sections with GFR Rule 144(i) statutory compliance clauses.
   - Generates and downloads official procurement PDFs.

10. **Full-Page Sarthi Workspace**:
    - Complete full-screen workspace (`workspace.html`) for deep document comparison and multi-standard evaluation.

---

## 📦 Extension Structure (Manifest V3)

```
margsarthi/
├── manifest.json            # Manifest V3 configuration (Action popup, Background service worker, Content scripts)
├── background.js            # Background service worker (3-level context menus & storage)
├── content.js               # Webpage selection listener & floating action pill
├── content.css              # Non-intrusive in-page styling & modal dialog
├── popup.html               # 460px Institutional Popup interface
├── popup.css                # Government procurement styling system
├── popup.js                 # Popup controller & state management
├── api.js                   # Extraction engine, BIS knowledge base & AI Saathi
├── workspace.html           # Full-page Sarthi Workspace
├── workspace.css            # Full-page workspace stylesheet
├── icons/                   # High-resolution extension icons (16x16, 48x48, 128x128)
│   ├── icon16.png
│   ├── icon48.png
│   └── icon128.png
└── README.md                # Documentation & User Guide
```

---

## 🛠️ Installation Guide

### Step 1: Download or Locate Extension Folder
- Unpacked Folder: `c:\Users\prana\OneDrive\Desktop\BIS RAG 3\margsarthi\`
- Or Download the ZIP: [`Sarthi-Chrome-Extension-v1.0.0.zip`](file:///c:/Users/prana/OneDrive/Desktop/BIS%20RAG%203/public/Sarthi-Chrome-Extension-v1.0.0.zip)

### Step 2: Load into Chrome / Edge / Brave
1. Open Google Chrome or Microsoft Edge.
2. Navigate to `chrome://extensions/` (or `edge://extensions/`).
3. Enable **Developer mode** (toggle switch in the top-right corner).
4. Click **Load unpacked**.
5. Select the `margsarthi` folder from this project directory.
6. **Sarthi — Indian Standards Assistant** will now appear in your browser extension toolbar!

---

## 🛡️ Security & Privacy
- **Minimal Permissions**: Uses only `activeTab`, `storage`, `contextMenus`, `scripting`, `downloads`.
- **Zero Silent Scraping**: Only processes text explicitly highlighted or documents explicitly uploaded by the officer.
- **Powered by MargDarshak**: Connects directly to the MargDarshak platform.
