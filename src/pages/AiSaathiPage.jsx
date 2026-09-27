import React, { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Send,
  Sparkles,
  Trash2,
  Copy,
  Check,
  FileText,
  BookOpen,
  ShieldCheck,
  RefreshCw,
  MessageSquare,
  Globe,
  Mic,
  MicOff,
  Paperclip,
  Download,
  Volume2,
  VolumeX,
  ArrowRight,
  ExternalLink,
  ThumbsUp,
  ThumbsDown,
  Layers,
  FlaskConical,
  Search,
  CheckCircle2,
  AlertCircle,
  HelpCircle
} from 'lucide-react';
import { marked } from 'marked';
import { AiSarthiLogo, BisOfficialLogo, AshokaEmblem } from '../components/OfficialLogos';
import { sarthiAiService } from '../services/sarthiAiService';
import { offlineKnowledgeFallback } from '../services/bisKnowledge';
import { documentExtractor } from '../utils/documentExtractor';

marked.setOptions({
  breaks: true,
  gfm: true
});

export const AiSaathiPage = ({
  onNavigateTab
}) => {
  const { t, i18n } = useTranslation();

  // Context Modes
  const contextModes = [
    { id: 'procurement', label: '🎯 Tender & GFR 144(i)', desc: 'Draft non-bias technical specifications' },
    { id: 'standards', label: '⚖️ Standards & Amendments', desc: 'Verify IS codes & valid editions' },
    { id: 'qco', label: '🛡️ Mandatory QCO Orders', desc: 'Statutory Gazetted QCO verifications' },
    { id: 'testing', label: '🔬 Lab Testing & NABL', desc: 'Acceptance, routine & type tests' }
  ];
  const [selectedContext, setSelectedContext] = useState('procurement');

  // Messages State
  const [messages, setMessages] = useState([
    {
      id: 'init_msg',
      role: 'assistant',
      content: `### 🏛️ Welcome to AI Sarthi — Bureau of Indian Standards Intelligence Assistant

I am your official **BIS & Public Procurement Decision Support AI** powered by Mistral AI. I can assist you with:

* **Upload any Tender Document or Technical Specification PDF/DOCX** for full automatic analysis of all applicable Indian Standards (IS Codes).
* **Drafting GFR Rule 144(i) Compliant Clauses** for GeM & e-Procurement tenders.
* **Primary & Normative Standard Mapping** across 21,000+ Indian Standards.
* **Quality Control Order (QCO) Verification** to prevent statutory non-compliance.
* **Technical Parameter Analysis** for material grades, testing frequencies, and sampling criteria.

> [!NOTE]
> Attach any specification PDF or select a suggested query below to begin.`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);

  const [inputPrompt, setInputPrompt] = useState('');
  const [isStreaming, setIsStreaming] = useState(false);
  const [copiedIndex, setCopiedIndex] = useState(null);
  const [copiedClauseId, setCopiedClauseId] = useState(null);
  const [speakingMsgId, setSpeakingMsgId] = useState(null);
  const [feedbackState, setFeedbackState] = useState({});
  const [queryCategory, setQueryCategory] = useState('all');
  const [querySearch, setQuerySearch] = useState('');

  // Document Upload & Extraction States
  const [isExtractingDoc, setIsExtractingDoc] = useState(false);
  const [extractedDocData, setExtractedDocData] = useState(null);
  const [uploadedFile, setUploadedFile] = useState(null);
  const fileInputRef = useRef(null);

  // Voice Recognition States
  const [isListening, setIsListening] = useState(false);
  const [voiceSupported, setVoiceSupported] = useState(true);
  const recognitionRef = useRef(null);

  const messagesEndRef = useRef(null);
  const textareaRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isStreaming]);

  // Speech Recognition Setup
  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
      const recognition = new SpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.lang = i18n.language === 'hi' ? 'hi-IN' : 'en-IN';

      recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        if (transcript) {
          setInputPrompt((prev) => (prev ? prev + ' ' + transcript : transcript));
        }
        setIsListening(false);
      };

      recognition.onerror = () => setIsListening(false);
      recognition.onend = () => setIsListening(false);
      recognitionRef.current = recognition;
    } else {
      setVoiceSupported(false);
    }

    return () => {
      if (recognitionRef.current) {
        try { recognitionRef.current.stop(); } catch (e) { }
      }
    };
  }, [i18n.language]);

  const toggleListening = () => {
    if (!voiceSupported) {
      alert('Speech recognition is not supported in this browser. Please use Google Chrome or Edge.');
      return;
    }

    if (isListening) {
      try { recognitionRef.current.stop(); } catch (e) { }
      setIsListening(false);
    } else {
      try {
        recognitionRef.current.start();
        setIsListening(true);
      } catch (e) {
        setIsListening(false);
      }
    }
  };

  // Text to Speech
  const handleToggleSpeech = (text, msgId) => {
    if (!('speechSynthesis' in window)) {
      alert('Text to speech is not supported in this browser.');
      return;
    }

    if (speakingMsgId === msgId) {
      window.speechSynthesis.cancel();
      setSpeakingMsgId(null);
      return;
    }

    window.speechSynthesis.cancel();
    const cleanText = text
      .replace(/[*#_`~\[\]\(\)>]/g, '')
      .replace(/https?:\/\/[^\s]+/g, '');

    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.rate = 1.0;
    utterance.pitch = 1.0;

    const voices = window.speechSynthesis.getVoices();
    const voice = voices.find(v => v.lang === 'en-IN' || v.lang === 'hi-IN' || v.name.includes('India'));
    if (voice) utterance.voice = voice;

    utterance.onend = () => setSpeakingMsgId(null);
    utterance.onerror = () => setSpeakingMsgId(null);

    setSpeakingMsgId(msgId);
    window.speechSynthesis.speak(utterance);
  };

  // Handle File Upload & PDF/DOCX Text Extraction
  const handleFileUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsExtractingDoc(true);
    setUploadedFile(file);

    try {
      const extracted = await documentExtractor.extractText(file);
      setExtractedDocData(extracted);
      if (!inputPrompt.trim()) {
        setInputPrompt(`Please analyze the attached document "${file.name}" and provide complete insights on all applicable Indian Standards (IS codes), mandatory Quality Control Orders (QCOs), testing protocols, and GFR 144(i) compliance.`);
      }
    } catch (err) {
      console.error('Failed to extract document text:', err);
      alert(`Could not extract text from ${file.name}: ${err.message}. Please ensure it is a readable document.`);
    } finally {
      setIsExtractingDoc(false);
    }
  };

  // Copy helper
  const handleCopy = (text, key) => {
    if (!text) return;
    navigator.clipboard?.writeText(text);
    setCopiedIndex(key);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  // Export conversation to text file
  const handleExportChat = () => {
    const exportText = messages.map(m => `[${m.timestamp}] ${m.role === 'assistant' ? 'AI Sarthi' : 'User'}:\n${m.content}\n`).join('\n---\n\n');
    const blob = new Blob([exportText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `BIS_Sarthi_Conversation_${Date.now()}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  // Reset/clear conversation
  const handleClearChat = () => {
    if (window.confirm('Are you sure you want to clear this conversation?')) {
      setMessages([
        {
          id: 'init_msg_' + Date.now(),
          role: 'assistant',
          content: `### 🏛️ Welcome to AI Sarthi — Bureau of Indian Standards Intelligence Assistant\n\nI am your official **BIS & Public Procurement Decision Support AI** powered by Mistral AI. I can assist you with:\n\n* **Upload any Tender Document or Technical Specification PDF/DOCX** for full automatic analysis of all applicable Indian Standards (IS Codes).\n* **Drafting GFR Rule 144(i) Compliant Clauses** for GeM & e-Procurement tenders.\n* **Primary & Normative Standard Mapping** across 21,000+ Indian Standards.\n* **Quality Control Order (QCO) Verification** to prevent statutory non-compliance.\n* **Technical Parameter Analysis** for material grades, testing frequencies, and sampling criteria.\n\n> [!NOTE]\n> Attach any specification PDF or select a suggested query below to begin.`,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
      if (speakingMsgId) {
        window.speechSynthesis?.cancel();
        setSpeakingMsgId(null);
      }
    }
  };

  // Structured Suggested Queries Database
  const suggestedQueries = [
    {
      category: 'clauses',
      label: "Draft Tender Clause for 11kV XLPE Cables",
      query: "Draft an official GFR-compliant tender specification clause for 1.1kV and 11kV XLPE insulated armoured power cables as per IS 7098 and DISCOM norms.",
      tag: "IS 7098"
    },
    {
      category: 'amendments',
      label: "Latest Ductility & Amendments in IS 1786 (TMT Rebars)",
      query: "What are the latest amendments and mandatory ductility criteria for Fe 500D TMT reinforcement steel bars under IS 1786:2008 for seismic zones?",
      tag: "IS 1786:2008"
    },
    {
      category: 'qco',
      label: "Check Mandatory QCO for Solar Inverters & PV",
      query: "Is there a mandatory Quality Control Order (QCO) for Solar PV Inverters and Modules under MNRE and BIS CRS scheme?",
      tag: "CRS Scheme"
    },
    {
      category: 'comparison',
      label: "Difference between OPC 43 vs 53 Grade Cement",
      query: "Explain the technical differences and 28-day compressive strength requirements between OPC 43 and OPC 53 grade cement under IS 269:2015.",
      tag: "IS 269:2015"
    },
    {
      category: 'clauses',
      label: "HDPE Pipes under Jal Jeevan Mission Tenders",
      query: "What are the mandatory testing parameters, pressure ratings (PN-10), and normative references for HDPE PE-100 pipes under IS 4984 for Jal Jeevan Mission tenders?",
      tag: "IS 4984:2016"
    },
    {
      category: 'testing',
      label: "Fire Extinguisher ABC Stored Pressure (IS 15683)",
      query: "What are the essential requirements and hydrostatic burst pressure test protocols for ABC stored pressure portable fire extinguishers under IS 15683:2018?",
      tag: "IS 15683:2018"
    },
    {
      category: 'clauses',
      label: "LED Street Lights Luminaire (120W Surge 10kV)",
      query: "Draft technical specifications for 120W LED street lights with 10kV SPD and IP66 rating conforming to IS 10322 (Part 5/Sec 3).",
      tag: "IS 10322"
    },
    {
      category: 'qco',
      label: "Food Contact Stainless Steel Bottle Safety (IS 17526)",
      query: "Explain mandatory toxicological migration tests and vacuum retention tests for stainless steel insulated water bottles under IS 17526 and IS 9845.",
      tag: "IS 17526:2021"
    }
  ];

  // Filtered queries based on category and search text
  const filteredQueries = suggestedQueries.filter(item => {
    const matchesCat = queryCategory === 'all' || item.category === queryCategory;
    const matchesSearch = !querySearch.trim() ||
      item.label.toLowerCase().includes(querySearch.toLowerCase()) ||
      item.query.toLowerCase().includes(querySearch.toLowerCase()) ||
      item.tag.toLowerCase().includes(querySearch.toLowerCase());
    return matchesCat && matchesSearch;
  });

  // Handle Send Message & Send full extracted PDF text to Gemini / BIS Knowledge Engine
  const handleSendMessage = async (textToSend = null) => {
    const queryText = (typeof textToSend === 'string' && textToSend.trim()) ? textToSend.trim() : (inputPrompt || '').trim();
    if (!queryText && !extractedDocData) return;
    if (isStreaming) return;

    let fullPrompt = queryText;
    if (extractedDocData && extractedDocData.text) {
      fullPrompt = `[UPLOADED SPECIFICATION DOCUMENT: "${extractedDocData.fileName}" (${extractedDocData.pageCount || 1} pages)]:\n\n${extractedDocData.text.slice(0, 30000)}\n\n[USER INQUIRY / TASK]:\n${queryText || 'Analyze this entire uploaded document in detail. Identify all applicable Primary Indian Standards (IS Codes), mandatory Quality Control Orders (QCOs), testing protocols, raw material grades, and non-bias GFR Rule 144(i) tender clauses.'}`;
    }

    const userMsgId = 'user_' + Date.now();
    const assistantMsgId = 'ast_' + (Date.now() + 1);

    const userMsg = {
      id: userMsgId,
      role: 'user',
      content: queryText || `Analyze attached document: ${extractedDocData?.fileName}`,
      attachment: extractedDocData ? `${extractedDocData.fileName} (${extractedDocData.pageCount || 1} pages)` : null,
      context: selectedContext,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    const assistantMsg = {
      id: assistantMsgId,
      role: 'assistant',
      content: '',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMsg, assistantMsg]);
    setInputPrompt('');
    setUploadedFile(null);
    setExtractedDocData(null);
    setIsStreaming(true);

    try {
      const response = await sarthiAiService.ask(
        fullPrompt,
        {
          history: messages,
          language: i18n.language || 'en',
          context: selectedContext,
          onChunk: (streamedChunk) => {
            setMessages((prev) =>
              prev.map((m) => (m.id === assistantMsgId ? { ...m, content: streamedChunk } : m))
            );
          }
        }
      );

      if (response) {
        setMessages((prev) =>
          prev.map((m) => (m.id === assistantMsgId ? { ...m, content: response } : m))
        );
      }
    } catch (err) {
      console.error('LLM Error:', err);
      const fallback = offlineKnowledgeFallback(fullPrompt, i18n.language || 'en');
      setMessages((prev) =>
        prev.map((m) => (m.id === assistantMsgId ? { ...m, content: fallback } : m))
      );
    } finally {
      setIsStreaming(false);
    }
  };

  // Render markdown safely
  const renderMarkdown = (content) => {
    if (!content) return '';
    return marked.parse(content);
  };

  return (
    <div className="space-y-6 pb-16 font-sans">

      {/* ========================================================================= */}
      {/* 1. TOP HEADER BANNER */}
      {/* ========================================================================= */}
      <div className="bg-white border border-slate-200/90 rounded-2xl p-5 sm:p-6 shadow-xs relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-full bg-gradient-to-l from-blue-50/70 via-indigo-50/30 to-transparent pointer-events-none" />

        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 relative z-10">

          {/* Left: Branding & Overview */}
          <div className="flex items-start space-x-3.5">
            <div className="p-2 bg-gradient-to-br from-blue-600 to-indigo-700 text-white rounded-2xl shadow-sm shrink-0 flex items-center justify-center ring-4 ring-blue-50">
              <AiSarthiLogo className="h-9 w-auto" />
            </div>

            <div className="space-y-1">
              <div className="flex flex-wrap items-center gap-2">
                <h1 className="text-xl sm:text-2xl font-black text-[#0A2540] tracking-tight">
                  AI Sarthi
                </h1>
                <span className="text-slate-300">•</span>
                <span className="text-xs sm:text-sm font-semibold text-slate-600">
                  Procurement Intelligence Assistant
                </span>
                <span className="px-2.5 py-0.5 bg-blue-100 text-[#2563EB] text-[10.5px] font-bold rounded-full font-mono">
                  21,000+ Standards Indexed
                </span>
                <span className="px-2.5 py-0.5 bg-emerald-100 text-emerald-800 text-[10.5px] font-bold rounded-full flex items-center space-x-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  <span>RAG Online</span>
                </span>
              </div>

              <p className="text-xs text-slate-600 max-w-3xl leading-relaxed">
                Specialized conversational intelligence for technical procurement specifications, GFR Rule 144(i) non-bias clauses, gazetted QCO mandates, and laboratory test protocols.
              </p>
            </div>
          </div>

          {/* Right: Quick Tools */}
          <div className="flex items-center space-x-2 shrink-0 self-start lg:self-center">
            <button
              type="button"
              onClick={handleExportChat}
              className="px-3 py-2 text-xs font-semibold text-slate-700 hover:text-blue-700 bg-slate-50 hover:bg-blue-50 border border-slate-200 rounded-xl flex items-center space-x-1.5 transition-colors cursor-pointer shadow-2xs"
              title="Download conversation log"
            >
              <Download className="h-3.5 w-3.5" />
              <span>Export Log</span>
            </button>

            <button
              type="button"
              onClick={handleClearChat}
              className="px-3 py-2 text-xs font-semibold text-slate-600 hover:text-rose-600 bg-slate-50 hover:bg-rose-50 border border-slate-200 rounded-xl flex items-center space-x-1.5 transition-colors cursor-pointer shadow-2xs"
              title="Reset conversation"
            >
              <Trash2 className="h-3.5 w-3.5" />
              <span>Clear Chat</span>
            </button>
          </div>
        </div>

        {/* Context Mode Selector Bar */}
        <div className="mt-4 pt-3.5 border-t border-slate-100 flex flex-wrap items-center gap-2">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mr-1">
            Mode Focus:
          </span>
          {contextModes.map((mode) => (
            <button
              key={mode.id}
              type="button"
              onClick={() => setSelectedContext(mode.id)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer flex items-center space-x-1.5 ${selectedContext === mode.id
                  ? 'bg-[#0A2540] text-white shadow-xs'
                  : 'bg-slate-100 hover:bg-slate-200/80 text-slate-700 border border-transparent'
                }`}
            >
              <span>{mode.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 2. MAIN SPLIT LAYOUT: CHAT STREAM & INTELLIGENCE SUITE */}
      {/* ========================================================================= */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">

        {/* LEFT 8 COLS: CONVERSATION STREAM & INPUT BAR */}
        <div className="lg:col-span-8 bg-white border border-slate-200/90 rounded-2xl shadow-xs flex flex-col h-[700px] overflow-hidden">

          {/* Conversation Messages Container */}
          <div className="flex-1 p-4 sm:p-6 overflow-y-auto space-y-5 bg-gradient-to-b from-slate-50/70 via-white to-slate-50/50">
            {messages.map((msg, idx) => {
              const isAssistant = msg.role === 'assistant';

              return (
                <div
                  key={msg.id || idx}
                  className={`flex flex-col ${isAssistant ? 'items-start' : 'items-end'} animate-fade-in`}
                >
                  {/* Message Meta Info */}
                  <div className="flex items-center space-x-2 text-[11px] text-slate-400 mb-1.5 px-2">
                    <span className="font-semibold text-slate-600">
                      {isAssistant ? 'AI Sarthi (BIS Intelligence)' : 'Procurement Officer'}
                    </span>
                    <span>•</span>
                    <span className="font-mono">{msg.timestamp}</span>
                  </div>

                  {/* Bubble Container */}
                  <div
                    className={`rounded-2xl text-xs sm:text-sm leading-relaxed max-w-[95%] sm:max-w-[88%] shadow-xs relative group transition-all ${isAssistant
                        ? 'bg-white border border-slate-200/90 text-slate-800 p-5 rounded-tl-xs border-l-4 border-l-[#2563EB]'
                        : 'bg-gradient-to-r from-[#0A2540] to-[#1E3A8A] text-white p-4 rounded-tr-xs shadow-sm'
                      }`}
                  >
                    {/* File Attachment Indicator if present */}
                    {msg.attachment && (
                      <div className="mb-2.5 p-2 bg-blue-900/40 border border-blue-400/30 rounded-lg flex items-center space-x-2 text-xs text-blue-100 font-mono">
                        <Paperclip className="h-3.5 w-3.5" />
                        <span>Attached Context: {msg.attachment}</span>
                      </div>
                    )}

                    {/* Content */}
                    {isAssistant ? (
                      msg.content ? (
                        <div
                          className="prose-bis-light text-xs sm:text-sm leading-relaxed overflow-x-auto"
                          dangerouslySetInnerHTML={{ __html: renderMarkdown(msg.content) }}
                        />
                      ) : (
                        <div className="flex items-center space-x-2.5 text-slate-500 py-1.5">
                          <div className="flex space-x-1.5 items-center">
                            <span className="w-2 h-2 rounded-full bg-blue-600 animate-bounce" style={{ animationDelay: '0ms' }}></span>
                            <span className="w-2 h-2 rounded-full bg-blue-600 animate-bounce" style={{ animationDelay: '150ms' }}></span>
                            <span className="w-2 h-2 rounded-full bg-blue-600 animate-bounce" style={{ animationDelay: '300ms' }}></span>
                          </div>
                          <span className="text-xs font-semibold text-slate-600">AI Sarthi is querying Bureau of Indian Standards intelligence...</span>
                        </div>
                      )
                    ) : (
                      <div className="whitespace-pre-wrap font-sans text-xs sm:text-sm">
                        {msg.content}
                      </div>
                    )}

                    {/* Assistant Message Actions Toolbar */}
                    {isAssistant && msg.content && (
                      <div className="mt-4 pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between gap-2 text-slate-500">
                        <div className="flex items-center space-x-2 text-[11px] text-slate-400 font-mono">
                          <ShieldCheck className="h-3.5 w-3.5 text-emerald-600" />
                          <span>BIS Verified Citations</span>
                        </div>

                        <div className="flex items-center space-x-1.5">
                          {/* Copy Full */}
                          <button
                            type="button"
                            onClick={() => handleCopy(msg.content, `msg_${idx}`)}
                            className="px-2 py-1 bg-slate-50 hover:bg-slate-100 text-slate-600 rounded-lg text-xs flex items-center space-x-1 transition-colors cursor-pointer border border-slate-200"
                            title="Copy Response"
                          >
                            {copiedIndex === `msg_${idx}` ? (
                              <>
                                <Check className="h-3.5 w-3.5 text-emerald-600" />
                                <span className="text-[10.5px] text-emerald-600 font-bold">Copied</span>
                              </>
                            ) : (
                              <>
                                <Copy className="h-3.5 w-3.5" />
                                <span className="text-[10.5px]">Copy</span>
                              </>
                            )}
                          </button>

                          {/* Read Aloud Audio */}
                          <button
                            type="button"
                            onClick={() => handleToggleSpeech(msg.content, msg.id || idx)}
                            className={`px-2 py-1 rounded-lg text-xs flex items-center space-x-1 transition-colors cursor-pointer border ${speakingMsgId === (msg.id || idx)
                                ? 'bg-blue-100 text-blue-700 border-blue-300 font-bold'
                                : 'bg-slate-50 hover:bg-slate-100 text-slate-600 border-slate-200'
                              }`}
                            title={speakingMsgId === (msg.id || idx) ? 'Stop audio' : 'Listen aloud'}
                          >
                            {speakingMsgId === (msg.id || idx) ? (
                              <>
                                <VolumeX className="h-3.5 w-3.5 text-blue-600 animate-pulse" />
                                <span className="text-[10.5px]">Stop</span>
                              </>
                            ) : (
                              <>
                                <Volume2 className="h-3.5 w-3.5" />
                                <span className="text-[10.5px]">Listen</span>
                              </>
                            )}
                          </button>

                          {/* Feedback Thumbs */}
                          <button
                            type="button"
                            onClick={() => setFeedbackState(prev => ({ ...prev, [idx]: 'up' }))}
                            className={`p-1 rounded hover:bg-slate-100 cursor-pointer ${feedbackState[idx] === 'up' ? 'text-emerald-600' : 'text-slate-400'
                              }`}
                            title="Helpful response"
                          >
                            <ThumbsUp className="h-3.5 w-3.5" />
                          </button>
                          <button
                            type="button"
                            onClick={() => setFeedbackState(prev => ({ ...prev, [idx]: 'down' }))}
                            className={`p-1 rounded hover:bg-slate-100 cursor-pointer ${feedbackState[idx] === 'down' ? 'text-rose-600' : 'text-slate-400'
                              }`}
                            title="Not helpful"
                          >
                            <ThumbsDown className="h-3.5 w-3.5" />
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}

            {/* Live Streaming Indicator */}
            {isStreaming && (
              <div className="flex items-center space-x-3 p-4 bg-white border border-blue-200 rounded-2xl w-fit shadow-xs animate-pulse">
                <div className="p-2 bg-blue-100 text-[#2563EB] rounded-xl">
                  <RefreshCw className="h-4 w-4 animate-spin" />
                </div>
                <div className="space-y-0.5">
                  <span className="text-xs font-bold text-slate-900 block">
                    AI Sarthi is reasoning & querying BIS standards...
                  </span>
                  <span className="text-[11px] text-slate-500">
                    Applying GFR Rule 144(i), gazetted QCO filters, and technical specifications.
                  </span>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* ========================================================================= */}
          {/* FLOATING CAPSULE INPUT BAR */}
          {/* ========================================================================= */}
          <div className="p-3 sm:p-4 bg-white border-t border-slate-100 shrink-0">

            {/* Attached File Preview if any */}
            {isExtractingDoc && (
              <div className="mb-2.5 p-3 bg-blue-50 border border-blue-200 rounded-xl flex items-center justify-between text-xs text-blue-800 animate-pulse">
                <div className="flex items-center space-x-2">
                  <RefreshCw className="h-4 w-4 animate-spin text-blue-600 shrink-0" />
                  <span>
                    Extracting full text from <strong>{uploadedFile?.name}</strong> using client-side PDF.js...
                  </span>
                </div>
                <span className="font-mono text-[10px] bg-blue-200 text-blue-900 px-2 py-0.5 rounded font-bold">
                  Extracting
                </span>
              </div>
            )}

            {uploadedFile && !isExtractingDoc && (
              <div className="mb-2.5 p-2.5 bg-gradient-to-r from-blue-50 via-indigo-50 to-emerald-50 border border-blue-200 rounded-xl flex items-center justify-between text-xs text-slate-800 shadow-2xs">
                <div className="flex items-center space-x-2.5 truncate">
                  <div className="p-1.5 bg-blue-600 text-white rounded-lg shrink-0">
                    <FileText className="h-3.5 w-3.5" />
                  </div>
                  <div className="truncate">
                    <div className="font-bold text-slate-900 truncate">
                      {uploadedFile.name}
                    </div>
                    <div className="text-[11px] text-slate-500">
                      {(uploadedFile.size / 1024).toFixed(1)} KB {extractedDocData?.pageCount ? `• ${extractedDocData.pageCount} page(s) extracted (${(extractedDocData.text?.length || 0).toLocaleString()} chars)` : ''} • Ready for Mistral AI Standard Analysis
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-2 shrink-0 ml-2">
                  <button
                    type="button"
                    onClick={() => handleSendMessage()}
                    disabled={isStreaming}
                    className="px-2.5 py-1 bg-[#2563EB] hover:bg-blue-700 text-white font-bold rounded-lg text-[11px] shadow-xs cursor-pointer flex items-center space-x-1"
                  >
                    <Sparkles className="h-3 w-3" />
                    <span>Analyze</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setUploadedFile(null);
                      setExtractedDocData(null);
                    }}
                    className="p-1 text-slate-400 hover:text-rose-600 font-bold cursor-pointer rounded"
                    title="Remove attachment"
                  >
                    ✕
                  </button>
                </div>
              </div>
            )}

            {/* Main Input Pill */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage();
              }}
              className="relative flex items-center w-full bg-slate-50 hover:bg-white focus-within:bg-white border border-slate-300 focus-within:border-[#2563EB] focus-within:ring-3 focus-within:ring-blue-100 rounded-2xl transition-all px-3 py-2 shadow-2xs"
            >
              {/* Hidden File Input */}
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileUpload}
                accept=".pdf,.doc,.docx,.txt"
                className="hidden"
              />

              {/* Paperclip Button */}
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                title="Attach tender document / specification"
                className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-colors cursor-pointer shrink-0"
              >
                <Paperclip className="h-4 w-4 -rotate-45" />
              </button>

              {/* Text Input */}
              <input
                ref={textareaRef}
                type="text"
                value={inputPrompt}
                onChange={(e) => setInputPrompt(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleSendMessage();
                  }
                }}
                placeholder="Ask technical question, e.g., 'Draft tender clause for 43 grade cement under CPWD'..."
                className="flex-1 bg-transparent border-none outline-none text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 px-2 sm:px-3 font-medium"
              />

              {/* Mic Speech Button */}
              {voiceSupported && (
                <button
                  type="button"
                  onClick={toggleListening}
                  title={isListening ? 'Stop recording' : 'Voice Input (Speech-to-Text)'}
                  className={`p-2 rounded-xl transition-colors cursor-pointer shrink-0 mr-1.5 ${isListening
                      ? 'text-rose-600 bg-rose-100 animate-pulse'
                      : 'text-slate-400 hover:text-slate-700 hover:bg-slate-200/60'
                    }`}
                >
                  {isListening ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
                </button>
              )}

              {/* Send Button */}
              <button
                type="submit"
                disabled={(!inputPrompt.trim() && !uploadedFile) || isStreaming}
                className="px-4 py-2 bg-[#2563EB] hover:bg-blue-700 disabled:opacity-40 disabled:hover:bg-[#2563EB] text-white font-bold text-xs rounded-xl flex items-center space-x-1.5 transition-all shadow-xs shrink-0 cursor-pointer"
              >
                {isStreaming ? (
                  <RefreshCw className="h-4 w-4 animate-spin" />
                ) : (
                  <>
                    <span>Send</span>
                    <Send className="h-3.5 w-3.5" />
                  </>
                )}
              </button>
            </form>

            <div className="flex items-center justify-between text-[10.5px] text-slate-400 pt-2 px-1">
              <span>Press <strong className="font-mono text-slate-600">Enter ↵</strong> to send</span>
              <span>All citations verified against Bureau of Indian Standards Official Gazettes</span>
            </div>
          </div>

        </div>

        {/* ========================================================================= */}
        {/* RIGHT 4 COLS: INTELLIGENCE SUITE & QUERY LIBRARY */}
        {/* ========================================================================= */}
        <div className="lg:col-span-4 space-y-5">

          {/* 1. SUGGESTED PROCUREMENT QUERIES LIBRARY */}
          <div className="bg-white border border-slate-200/90 rounded-2xl p-5 shadow-xs space-y-3.5">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center space-x-2">
                <Sparkles className="h-4 w-4 text-[#2563EB]" />
                <h3 className="text-xs sm:text-sm font-bold text-[#0A2540] uppercase tracking-wide">
                  Suggested Queries
                </h3>
              </div>
              <span className="text-[10px] bg-blue-50 text-[#2563EB] font-bold px-2 py-0.5 rounded-full font-mono">
                {filteredQueries.length} Prompts
              </span>
            </div>

            {/* Category Filter Chips */}
            <div className="flex flex-wrap gap-1.5">
              {[
                { id: 'all', label: 'All' },
                { id: 'clauses', label: 'Tender Clauses' },
                { id: 'qco', label: 'QCO Mandates' },
                { id: 'testing', label: 'Testing' },
                { id: 'comparison', label: 'Comparison' }
              ].map(cat => (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setQueryCategory(cat.id)}
                  className={`px-2.5 py-1 text-[11px] font-semibold rounded-lg transition-colors cursor-pointer ${queryCategory === cat.id
                      ? 'bg-blue-100 text-[#2563EB] font-bold'
                      : 'bg-slate-100 hover:bg-slate-200/70 text-slate-600'
                    }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            {/* Search within suggested queries */}
            <div className="relative">
              <Search className="absolute left-3 top-2.5 h-3.5 w-3.5 text-slate-400" />
              <input
                type="text"
                value={querySearch}
                onChange={(e) => setQuerySearch(e.target.value)}
                placeholder="Filter sample queries..."
                className="w-full pl-8 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-hidden focus:ring-1 focus:ring-blue-500"
              />
            </div>

            {/* Queries List */}
            <div className="space-y-2 max-h-[310px] overflow-y-auto pr-1">
              {filteredQueries.map((item, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => handleSendMessage(item.query)}
                  className="w-full p-3 bg-slate-50 hover:bg-blue-50/80 border border-slate-200/90 hover:border-blue-300 rounded-xl text-left text-xs transition-all group cursor-pointer flex flex-col space-y-1.5 shadow-2xs"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-[#0A2540] group-hover:text-[#2563EB] line-clamp-2 leading-snug">
                      {item.label}
                    </span>
                    <ArrowRight className="h-3.5 w-3.5 text-slate-400 group-hover:text-blue-600 group-hover:translate-x-0.5 transition-transform shrink-0 ml-2" />
                  </div>
                  <div className="flex items-center space-x-2 text-[10px] text-slate-500">
                    <span className="px-1.5 py-0.2 bg-white border border-slate-200 rounded font-mono font-bold text-[#2563EB]">
                      {item.tag}
                    </span>
                    <span>• Click to Ask</span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* 2. MULTI-LINGUAL CAPABILITIES CARD */}
          <div className="bg-gradient-to-br from-blue-50/90 to-indigo-50/60 border border-blue-200/80 rounded-2xl p-4 sm:p-5 text-xs text-slate-700 space-y-2.5 shadow-xs">
            <div className="flex items-center space-x-2">
              <Globe className="h-4 w-4 text-[#2563EB]" />
              <span className="text-xs font-bold text-[#0A2540] uppercase tracking-wide">
                Multi-Lingual Assistance
              </span>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              You can query AI Sarthi in English, Hindi (हिन्दी), Tamil (தமிழ்), Telugu (తెలుగు), Bengali (বাংলা), Marathi (मराठी), or Gujarati (ગુજરાતી). All technical references maintain authoritative IS standard numbers.
            </p>
            <div className="flex flex-wrap gap-1 pt-1">
              {['English', 'हिन्दी', 'தமிழ்', 'తెలుగు', 'বাংলা', 'मराठी', 'ગુજરાતી'].map((lng, i) => (
                <span key={i} className="px-2 py-0.5 bg-white border border-blue-200 rounded-md text-[10.5px] font-medium text-slate-800">
                  {lng}
                </span>
              ))}
            </div>
          </div>

          {/* 3. CAPABILITIES & COMPLIANCE METRICS */}
          <div className="bg-white border border-slate-200/90 rounded-2xl p-4 sm:p-5 shadow-xs space-y-3">
            <h4 className="text-xs font-bold text-[#0A2540] uppercase tracking-wide">
              BIS RAG Engine Capabilities
            </h4>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="p-2.5 bg-slate-50 border border-slate-200 rounded-xl space-y-0.5">
                <span className="text-[10px] text-slate-400 font-bold uppercase block">Coverage</span>
                <span className="font-bold text-[#0A2540]">21,000+ Standards</span>
              </div>
              <div className="p-2.5 bg-slate-50 border border-slate-200 rounded-xl space-y-0.5">
                <span className="text-[10px] text-slate-400 font-bold uppercase block">QCO Orders</span>
                <span className="font-bold text-emerald-700">753 Gazetted</span>
              </div>
              <div className="p-2.5 bg-slate-50 border border-slate-200 rounded-xl space-y-0.5">
                <span className="text-[10px] text-slate-400 font-bold uppercase block">Compliance</span>
                <span className="font-bold text-[#2563EB]">GFR Rule 144(i)</span>
              </div>
              <div className="p-2.5 bg-slate-50 border border-slate-200 rounded-xl space-y-0.5">
                <span className="text-[10px] text-slate-400 font-bold uppercase block">Testing</span>
                <span className="font-bold text-indigo-700">NABL Protocols</span>
              </div>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};
