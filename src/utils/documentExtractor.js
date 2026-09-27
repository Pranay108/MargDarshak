import JSZip from 'jszip';
import * as pdfjsLib from 'pdfjs-dist';

// Set up pdf.js worker
if (typeof window !== 'undefined') {
  pdfjsLib.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version || '4.10.38'}/pdf.worker.min.mjs`;
}

/**
 * Universal Client-Side Document Text Extractor
 * Extracts text from PDF, DOCX, TXT, JSON, CSV, and Markdown files in the browser.
 */
export const documentExtractor = {
  /**
   * Extracts text from a File object.
   * @param {File} file
   * @returns {Promise<{ text: string, fileName: string, pageCount: number, size: number }>}
   */
  extractText: async (file) => {
    if (!file) {
      throw new Error('No file provided');
    }

    const fileName = file.name || 'document';
    const ext = fileName.split('.').pop()?.toLowerCase() || '';

    if (ext === 'pdf' || file.type === 'application/pdf') {
      return await documentExtractor.extractFromPdf(file);
    } else if (ext === 'docx' || file.type.includes('wordprocessingml')) {
      return await documentExtractor.extractFromDocx(file);
    } else {
      return await documentExtractor.extractFromPlainText(file);
    }
  },

  /**
   * Extracts text from a PDF file page by page.
   */
  extractFromPdf: async (file) => {
    try {
      const arrayBuffer = await file.arrayBuffer();
      const loadingTask = pdfjsLib.getDocument({
        data: new Uint8Array(arrayBuffer),
        useWorkerFetch: false,
        isEvalSupported: false,
        useSystemFonts: true
      });

      const pdf = await loadingTask.promise;
      const numPages = pdf.numPages;
      let fullText = '';

      for (let pageNum = 1; pageNum <= numPages; pageNum++) {
        const page = await pdf.getPage(pageNum);
        const textContent = await page.getTextContent();
        const pageStrings = textContent.items.map(item => item.str || '');
        const pageText = pageStrings.join(' ');
        fullText += `--- Page ${pageNum} ---\n${pageText}\n\n`;
      }

      return {
        text: fullText.trim(),
        fileName: file.name,
        pageCount: numPages,
        size: file.size
      };
    } catch (error) {
      console.warn('PDF extraction with pdfjs-dist worker failed, trying CDN fallback...', error);
      return await documentExtractor.extractPdfFallback(file);
    }
  },

  /**
   * CDN Fallback for PDF Extraction if bundler worker issues arise
   */
  extractPdfFallback: async (file) => {
    try {
      if (!window.pdfjsLib) {
        await new Promise((resolve, reject) => {
          const script = document.createElement('script');
          script.src = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js';
          script.onload = resolve;
          script.onerror = reject;
          document.head.appendChild(script);
        });
        window.pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';
      }

      const arrayBuffer = await file.arrayBuffer();
      const pdf = await window.pdfjsLib.getDocument({ data: arrayBuffer }).promise;
      let fullText = '';

      for (let i = 1; i <= pdf.numPages; i++) {
        const page = await pdf.getPage(i);
        const textContent = await page.getTextContent();
        const pageText = textContent.items.map(item => item.str).join(' ');
        fullText += `--- Page ${i} ---\n${pageText}\n\n`;
      }

      return {
        text: fullText.trim(),
        fileName: file.name,
        pageCount: pdf.numPages,
        size: file.size
      };
    } catch (e) {
      console.error('All PDF parsing methods failed:', e);
      throw new Error(`Failed to extract text from PDF: ${e.message}`);
    }
  },

  /**
   * Extracts text from a DOCX file using JSZip to parse word/document.xml.
   */
  extractFromDocx: async (file) => {
    try {
      const zip = await JSZip.loadAsync(file);
      const documentXml = await zip.file('word/document.xml')?.async('text');

      if (!documentXml) {
        throw new Error('word/document.xml not found in DOCX file');
      }

      const parser = new DOMParser();
      const xmlDoc = parser.parseFromString(documentXml, 'application/xml');
      const paragraphs = xmlDoc.getElementsByTagName('w:p');
      let extractedText = '';

      for (let i = 0; i < paragraphs.length; i++) {
        const textNodes = paragraphs[i].getElementsByTagName('w:t');
        let pText = '';
        for (let j = 0; j < textNodes.length; j++) {
          pText += textNodes[j].textContent || '';
        }
        if (pText.trim()) {
          extractedText += pText + '\n';
        }
      }

      return {
        text: extractedText.trim(),
        fileName: file.name,
        pageCount: 1,
        size: file.size
      };
    } catch (e) {
      console.error('Failed to parse DOCX:', e);
      throw new Error(`Failed to extract text from DOCX: ${e.message}`);
    }
  },

  /**
   * Extracts plain text from TXT, CSV, JSON, Markdown files.
   */
  extractFromPlainText: (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        resolve({
          text: e.target?.result || '',
          fileName: file.name,
          pageCount: 1,
          size: file.size
        });
      };
      reader.onerror = (e) => reject(new Error('Failed to read text file'));
      reader.readAsText(file);
    });
  }
};
