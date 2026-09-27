import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

const renderAutoTable = (doc, options) => {
  if (typeof doc.autoTable === 'function') {
    doc.autoTable(options);
  } else {
    autoTable(doc, options);
  }
};

/**
 * Builds the exact 2-Page Government of India Tender Specification Document matching the official MargDarshak template.
 */
export const buildTenderSpecificationDoc = (params = {}) => {
  const {
    fileNo = "DEMO/PROC/2026/LED-SL/0417",
    dateGenerated = "27.09.2026",
    docTitle = "TECHNICAL SPECIFICATION FOR TENDER",
    tenderSubject = "Procurement of LED Street Lighting Fixtures",
    issuingAuthority = "Municipal Corporation (Illustrative)",
    departmentName = "SAMPLE PROCUREMENT DEPARTMENT",
    officeName = "Office of the Procurement & Tendering Authority",
    tenderRef = "GEM/2026/B/XXXXXXX",
    bidMode = "Online (GeM Portal)",
    bidValidity = "120 Days",
    emdAmount = "Rs. 2,50,000/-",
    scopeOfSupply = "Supply, installation, testing and commissioning of 1,000 nos. LED Street Light fixtures (90W ± 5%) for outdoor road/highway lighting under the Smart City Street Lighting Programme, including 230V AC operation, IP65-rated enclosure, and 5-year comprehensive warranty.",
    technicalRequirements = [
      { parameter: "Luminaire Type", requirement: "LED Street Light, Cut-off / Semi cut-off type" },
      { parameter: "Wattage", requirement: "90W ± 5%" },
      { parameter: "Operating Voltage", requirement: "230V AC, 50Hz" },
      { parameter: "Ingress Protection", requirement: "IP65 (minimum)" },
      { parameter: "Luminous Efficacy", requirement: "≥ 130 lm/W" },
      { parameter: "Colour Temperature (CCT)", requirement: "5700K ± 300K" },
      { parameter: "Surge Protection", requirement: "10kV (minimum)" },
      { parameter: "Operating Life", requirement: "≥ 50,000 burning hours (L70)" }
    ],
    primaryStandardsSummary = "Primary Standard(s): IS 10322 (Part 5) – Luminaires: General Requirements and Tests; IS 16107 – LED Street Lighting Luminaires – Specification (Latest Edition with Amendment No. 2).",
    standardsTable = [
      { isNumber: "IS 16107 : 2021", title: "LED Street Lighting Luminaires — Specification", relevance: "Primary product standard" },
      { isNumber: "IS 10322 (Pt.5)", title: "Luminaires — General Requirements and Tests", relevance: "General safety & performance" },
      { isNumber: "IS 3646 (Pt.1)", title: "Code of Practice for Interior Illumination", relevance: "Referenced installation practice" },
      { isNumber: "IS 4718", title: "Terminology for Illuminating Engineering", relevance: "Terminology reference" }
    ],
    alliedStandards = [
      { category: "Test Methods", details: "IS/IEC 60598 – Luminaires safety and performance testing" },
      { category: "Terminology", details: "IS 4718 – Terminology for Illuminating Engineering" },
      { category: "Safety", details: "IS 302 (Part 1) – Safety of household and similar electrical appliances" },
      { category: "Installation Practice", details: "IS 1944 (Part 2) – Code of Practice for Lighting of Public Thoroughfares" }
    ],
    certifications = [
      { name: "BIS Product Certification (ISI Mark)", applicability: "Mandatory under QCO", status: "Required" },
      { name: "Compulsory Registration Scheme (CRS)", applicability: "Applicable for electronic components", status: "Required" },
      { name: "Bureau of Energy Efficiency (BEE) Star Rating", applicability: "Recommended for energy efficiency", status: "Optional" }
    ],
    warrantyText = "The bidder shall provide a comprehensive on-site warranty of 5 (five) years from the date of installation, covering all manufacturing defects, LED driver failure, and photometric performance degradation beyond specified limits. Annual Maintenance Contract (AMC) terms shall be as per GeM standard bidding document.",
    evaluationCriteriaText = "Bids shall be evaluated on the L1 (Lowest Cost) basis among technically qualified bidders who meet all mandatory technical specifications and certification requirements listed in Sections 3 and 5 above. Non-compliance with any applicable IS Standard shall result in technical disqualification.",
    signatoryAuthority = "Procurement & Tendering Officer",
    signatoryOrg = "Municipal Corporation"
  } = params;

  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4'
  });

  const navyDark = [15, 35, 65];
  const maroonDark = [128, 0, 0];
  const slateDark = [30, 41, 59];
  const slateMuted = [100, 116, 139];
  const tableHeaderBg = [11, 37, 69];
  const maroonHeaderBg = [120, 15, 25];

  // Helper to draw running headers, watermark and footers on any page
  const drawPageDecorations = (pageNum, totalPages) => {
    // 1. Top Red Sample Banner
    doc.setFillColor(153, 27, 27); // #991B1B
    doc.rect(14, 10, 182, 8.5, 'F');
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8);
    doc.setTextColor(255, 255, 255);
    doc.text('SAMPLE DOCUMENT — FOR DEMONSTRATION / ILLUSTRATIVE PURPOSES ONLY | NOT AN OFFICIAL GOVERNMENT DOCUMENT', 105, 15.5, { align: 'center' });

    // 2. Tricolor Line
    doc.setFillColor(255, 153, 51); // Saffron
    doc.rect(14, 19, 60.6, 1.2, 'F');
    doc.setFillColor(255, 255, 255); // White
    doc.rect(74.6, 19, 60.6, 1.2, 'F');
    doc.setFillColor(19, 136, 8); // Green
    doc.rect(135.2, 19, 60.8, 1.2, 'F');

    // 3. Diagonal Faint Watermark
    doc.saveGraphicsState();
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(72);
    doc.setTextColor(230, 235, 242);
    doc.text('SAMPLE', 70, 160, { angle: 45 });
    doc.restoreGraphicsState();

    // 4. Running Bottom Page Footers
    doc.setDrawColor(180, 195, 210);
    doc.setLineWidth(0.4);
    doc.line(14, 282, 196, 282);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7.5);
    doc.setTextColor(...slateMuted);
    doc.text(`F. No. ${fileNo}`, 14, 286.5);
    doc.text(`Page ${pageNum} | SAMPLE ONLY`, 105, 286.5, { align: 'center' });
    doc.text('— Illustrative / Not Official —', 196, 286.5, { align: 'right' });

    doc.setFontSize(6.5);
    doc.setTextColor(140, 150, 165);
    doc.text(`Generated on: ${dateGenerated} | MargDarshak v1.0 (Prototype / SIH Demo) | This is a system-generated draft for demonstration purposes.`, 105, 291, { align: 'center' });
  };

  // =========================================================================
  // PAGE 1 RENDERING
  // =========================================================================
  drawPageDecorations(1, 2);

  let y = 25;

  // Header Seals and Department Title
  // Left Seal Circle
  doc.setDrawColor(40, 50, 65);
  doc.setLineWidth(0.7);
  doc.circle(26, y + 10, 8.5);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(6.5);
  doc.setTextColor(40, 50, 65);
  doc.text('SAMPLE', 26, y + 9.5, { align: 'center' });
  doc.text('SEAL', 26, y + 12.5, { align: 'center' });

  // Right Seal Circle
  doc.circle(184, y + 10, 8.5);
  doc.text('DEMO', 184, y + 9.5, { align: 'center' });
  doc.text('SEAL', 184, y + 12.5, { align: 'center' });

  // Center Department Hierarchy
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9.5);
  doc.setTextColor(...navyDark);
  doc.text(departmentName.toUpperCase(), 105, y + 6, { align: 'center' });

  doc.setFontSize(10.5);
  doc.text(issuingAuthority.toUpperCase(), 105, y + 11.5, { align: 'center' });

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  doc.setTextColor(...slateDark);
  doc.text(officeName, 105, y + 16, { align: 'center' });

  y += 22;

  // Double Horizontal Divider
  doc.setDrawColor(20, 35, 60);
  doc.setLineWidth(0.8);
  doc.line(14, y, 196, y);
  doc.setLineWidth(0.3);
  doc.line(14, y + 1.2, 196, y + 1.2);

  y += 6.5;

  // Main Document Title
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(13);
  doc.setTextColor(...navyDark);
  doc.text(docTitle, 105, y, { align: 'center' });

  y += 5.5;
  doc.setFontSize(10.5);
  doc.setTextColor(30, 41, 59);
  doc.text(tenderSubject, 105, y, { align: 'center' });

  y += 4.5;
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  doc.setTextColor(...slateMuted);
  doc.text(`File No.: ${fileNo}   |   Dated: ${dateGenerated}`, 105, y, { align: 'center' });

  y += 4;
  doc.setFont('helvetica', 'italic');
  doc.setFontSize(7.5);
  doc.setTextColor(110, 125, 145);
  doc.text('Drafted with the assistance of MargDarshak — AI-Powered Indian Standards Recommendation Engine', 105, y, { align: 'center' });

  y += 2.5;

  // Metadata Table (2-Column Grid)
  renderAutoTable(doc, {
    startY: y,
    theme: 'grid',
    styles: { fontSize: 8, cellPadding: 2, textColor: slateDark, lineColor: [200, 210, 225], lineWidth: 0.3 },
    columnStyles: {
      0: { fontStyle: 'bold', width: 42, fillColor: [248, 250, 252] },
      1: { width: 50 },
      2: { fontStyle: 'bold', width: 42, fillColor: [248, 250, 252] },
      3: { width: 48 }
    },
    body: [
      ['Tender Reference No.', tenderRef, 'Issuing Authority', issuingAuthority],
      ['Date of Issue', dateGenerated, 'Bid Submission Mode', bidMode],
      ['Bid Validity', bidValidity, 'EMD Amount', emdAmount]
    ]
  });

  y = (doc.lastAutoTable ? doc.lastAutoTable.finalY : y + 25) + 5;

  // 1. Scope of Supply
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9.5);
  doc.setTextColor(...navyDark);
  doc.text('1. Scope of Supply', 14, y);

  y += 4.5;
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  doc.setTextColor(...slateDark);
  const splitScope = doc.splitTextToSize(scopeOfSupply, 182);
  doc.text(splitScope, 14, y);

  y += (splitScope.length * 3.8) + 4;

  // 2. Technical Requirements
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9.5);
  doc.setTextColor(...navyDark);
  doc.text('2. Technical Requirements', 14, y);

  y += 2.5;

  const techRows = technicalRequirements.map(t => [t.parameter, t.requirement]);

  renderAutoTable(doc, {
    startY: y,
    theme: 'grid',
    headStyles: { fillColor: tableHeaderBg, textColor: 255, fontSize: 8, fontStyle: 'bold', cellPadding: 2 },
    styles: { fontSize: 7.5, cellPadding: 1.8, textColor: slateDark, lineColor: [210, 220, 230], lineWidth: 0.3 },
    columnStyles: {
      0: { width: 70, fontStyle: 'bold' },
      1: { width: 112 }
    },
    head: [['Parameter', 'Requirement']],
    body: techRows
  });

  y = (doc.lastAutoTable ? doc.lastAutoTable.finalY : y + 40) + 5;

  // 3. Applicable Indian Standards (AI-Recommended)
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9.5);
  doc.setTextColor(...navyDark);
  doc.text('3. Applicable Indian Standards (AI-Recommended)', 14, y);

  y += 4.5;
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  doc.setTextColor(...slateDark);
  const splitStdSummary = doc.splitTextToSize(primaryStandardsSummary, 182);
  doc.text(splitStdSummary, 14, y);

  y += (splitStdSummary.length * 3.8) + 2.5;

  const stdRows = (standardsTable || []).map(s => [s.isNumber, s.title, s.relevance]);

  renderAutoTable(doc, {
    startY: y,
    theme: 'grid',
    headStyles: { fillColor: maroonHeaderBg, textColor: 255, fontSize: 8, fontStyle: 'bold', cellPadding: 2 },
    styles: { fontSize: 7.5, cellPadding: 2, textColor: slateDark, lineColor: [210, 220, 230], lineWidth: 0.3 },
    columnStyles: {
      0: { width: 40, fontStyle: 'bold' },
      1: { width: 88 },
      2: { width: 54 }
    },
    head: [['IS Number', 'Title', 'Relevance']],
    body: stdRows
  });

  // =========================================================================
  // PAGE 2 RENDERING
  // =========================================================================
  doc.addPage();
  drawPageDecorations(2, 2);

  y = 25;

  // 4. Allied & Normative Reference Standards
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9.5);
  doc.setTextColor(...navyDark);
  doc.text('4. Allied & Normative Reference Standards', 14, y);

  y += 5;
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  doc.setTextColor(...slateDark);

  alliedStandards.forEach(allied => {
    doc.text(`•  ${allied.category}: ${allied.details}`, 16, y);
    y += 4.5;
  });

  y += 3;

  // 5. Mandatory Certification Requirements
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9.5);
  doc.setTextColor(...navyDark);
  doc.text('5. Mandatory Certification Requirements', 14, y);

  y += 2.5;

  const certRows = certifications.map(c => [c.name, c.applicability, c.status]);

  renderAutoTable(doc, {
    startY: y,
    theme: 'grid',
    headStyles: { fillColor: tableHeaderBg, textColor: 255, fontSize: 8, fontStyle: 'bold', cellPadding: 2 },
    styles: { fontSize: 7.5, cellPadding: 2, textColor: slateDark, lineColor: [210, 220, 230], lineWidth: 0.3 },
    columnStyles: {
      0: { width: 70, fontStyle: 'bold' },
      1: { width: 72 },
      2: { width: 40, halign: 'center', fontStyle: 'bold' }
    },
    head: [['Certification', 'Applicability', 'Status']],
    body: certRows
  });

  y = (doc.lastAutoTable ? doc.lastAutoTable.finalY : y + 30) + 5;

  // 6. Warranty & After-Sales Support
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9.5);
  doc.setTextColor(...navyDark);
  doc.text('6. Warranty & After-Sales Support', 14, y);

  y += 4.5;
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  doc.setTextColor(...slateDark);
  const splitWarranty = doc.splitTextToSize(warrantyText, 182);
  doc.text(splitWarranty, 14, y);

  y += (splitWarranty.length * 3.8) + 4;

  // 7. Evaluation Criteria
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9.5);
  doc.setTextColor(...navyDark);
  doc.text('7. Evaluation Criteria', 14, y);

  y += 4.5;
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  doc.setTextColor(...slateDark);
  const splitEval = doc.splitTextToSize(evaluationCriteriaText, 182);
  doc.text(splitEval, 14, y);

  y += (splitEval.length * 3.8) + 5;

  // AI-Generated Draft Disclaimer Alert Box
  doc.setFillColor(254, 252, 232); // Light amber #FEFCE8
  doc.setDrawColor(217, 119, 6); // Amber #D97706
  doc.setLineWidth(0.4);

  const disclaimerText = "[!] AI-Generated Draft Disclaimer: This tender specification was auto-generated by the MargDarshak AI Recommendation Engine based on semantic analysis of the input product description. It is intended as a drafting aid only. The Procurement Officer must review, verify against the latest published IS Standards, and obtain necessary approvals before final publication of this tender.";
  const splitDisclaimer = doc.splitTextToSize(disclaimerText, 174);
  const disclaimerHeight = (splitDisclaimer.length * 3.4) + 5;

  doc.rect(14, y, 182, disclaimerHeight, 'FD');
  doc.setFont('helvetica', 'italic');
  doc.setFontSize(7.2);
  doc.setTextColor(146, 64, 14); // Dark Amber text
  doc.text(splitDisclaimer, 18, y + 4.2);

  y += disclaimerHeight + 10;

  // Signature Block
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  doc.setTextColor(...slateDark);
  doc.text('For and on behalf of', 196, y, { align: 'right' });
  doc.setFont('helvetica', 'bold');
  doc.text(signatoryOrg, 196, y + 4, { align: 'right' });

  y += 18;
  doc.setFont('helvetica', 'normal');
  doc.text('____________________________', 196, y, { align: 'right' });
  doc.setFont('helvetica', 'bold');
  doc.text(signatoryAuthority, 196, y + 4, { align: 'right' });
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7.5);
  doc.setTextColor(...slateMuted);
  doc.text('(Signature & Office Seal)', 196, y + 7.5, { align: 'right' });

  return doc;
};

/**
 * Generates and triggers browser download of the Tender Specification PDF.
 */
export const generateTenderSpecificationPDF = (params) => {
  const doc = buildTenderSpecificationDoc(params);
  const sanitizedFileName = `MargDarshak_Tender_Spec_${(params.fileNo || params.tenderRef || 'Spec').replace(/[^a-zA-Z0-9]/g, '_')}.pdf`;
  doc.save(sanitizedFileName);
  return sanitizedFileName;
};

/**
 * Generates a Blob Data URL of the Tender Specification PDF for live in-browser preview.
 */
export const generateTenderSpecificationPDFDataUrl = (params) => {
  const doc = buildTenderSpecificationDoc(params);
  return doc.output('datauristring');
};

