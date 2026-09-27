import React, { useState, useRef, useEffect } from 'react';
import { 
  Send, 
  Mic, 
  MicOff, 
  RotateCcw, 
  Plus, 
  History, 
  Trash2, 
  Download 
} from 'lucide-react';
import { ChatMessage } from './ChatMessage';
import { PromptSuggestions } from './PromptSuggestions';
import { storageService } from '../services/storageService';
import { SaathiMascot } from './OfficialLogos';

export const ChatInterface = ({
  session,
  sessions,
  activeSessionId,
  onSelectSession,
  onNewSession,
  onDeleteSession,
  onSendMessage,
  isStreaming,
  currentLang,
  t,
  onResetChat
}) => {
  const [input, setInput] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [historyOpen, setHistoryOpen] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [session?.messages, isStreaming]);

  // Voice Input via Speech Recognition
  const handleVoiceInput = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert('Speech recognition is not supported in your browser.');
      return;
    }

    if (isListening) {
      setIsListening(false);
      return;
    }

    try {
      const recognition = new SpeechRecognition();
      recognition.lang = currentLang === 'hi' ? 'hi-IN' : 'en-IN';
      recognition.continuous = false;
      recognition.interimResults = false;

      recognition.onstart = () => setIsListening(true);
      recognition.onend = () => setIsListening(false);
      recognition.onerror = (e) => {
        console.error('Speech recognition error', e);
        setIsListening(false);
      };

      recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        if (transcript) {
          setInput((prev) => (prev ? prev + ' ' + transcript : transcript));
        }
      };

      recognition.start();
    } catch (err) {
      console.error(err);
      setIsListening(false);
    }
  };

  const handleSubmit = (e) => {
    e?.preventDefault();
    if (!input.trim() || isStreaming) return;
    const query = input.trim();
    setInput('');
    onSendMessage(query);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  const messages = session?.messages || [];
  const showSuggestions = messages.length <= 1;

  return (
    <div className="flex h-[calc(100vh-4rem)] w-full flex-col bg-white">
      
      {/* Sub-Header for Assistant */}
      <div className="flex items-center justify-between border-b border-slate-200 bg-white px-4 py-2.5 sm:px-6 shadow-xs">
        <div className="flex items-center space-x-2.5">
          {/* Chatbot Mascot Avatar */}
          <SaathiMascot className="h-7 w-7 ring-1 ring-blue-100" />
          <div>
            <span className="text-xs font-bold text-[#003366] font-sans">
              AI SATHI — BIS Knowledge Assistant
            </span>
            <span className="text-[10px] text-slate-500 block leading-tight">
              Official Indian Standards, Hallmarking & Verification Inquiries
            </span>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center space-x-2">
          <button
            onClick={onNewSession}
            className="flex items-center space-x-1 rounded border border-slate-200 bg-white px-2.5 py-1 text-xs font-medium text-slate-700 hover:bg-slate-50 transition-colors"
          >
            <Plus className="h-3.5 w-3.5" />
            <span>New Inquiry</span>
          </button>

          <button
            onClick={() => setHistoryOpen(!historyOpen)}
            className={`flex items-center space-x-1 rounded border px-2.5 py-1 text-xs font-medium transition-colors ${
              historyOpen 
                ? 'border-blue-300 bg-blue-50 text-[#00529B] font-bold' 
                : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
            }`}
          >
            <History className="h-3.5 w-3.5" />
            <span>History ({sessions?.length || 1})</span>
          </button>
        </div>
      </div>

      <div className="relative flex flex-1 overflow-hidden bg-white">
        
        {/* Messages Container */}
        <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6 md:px-10 bg-white">
          <div className="mx-auto max-w-3xl space-y-4">
            
            {/* Header info when chat is fresh */}
            {messages.length <= 1 && (
              <div className="rounded border border-slate-200 bg-white p-6 text-center shadow-xs my-3">
                <div className="mx-auto flex justify-center mb-3">
                  <SaathiMascot className="h-16 w-16 shadow-xs ring-2 ring-blue-100" />
                </div>
                <h2 className="text-lg font-bold text-[#003366] font-sans">
                  AI SATHI — Official BIS Knowledge Assistant
                </h2>
                <p className="mt-1 text-xs text-slate-600 max-w-md mx-auto">
                  Inquire regarding published Indian Standards (IS Codes), product certification (ISI Mark / CRS), mandatory gold hallmarking (6-digit HUID), and Option-2 fast-track licensing.
                </p>
              </div>
            )}

            {/* Chat message bubbles */}
            {messages.map((msg, index) => (
              <ChatMessage
                key={msg.id || index}
                message={msg}
                isLatest={index === messages.length - 1}
                isStreaming={isStreaming}
              />
            ))}

            {/* Suggestions cards */}
            {showSuggestions && (
              <div className="pt-2">
                <PromptSuggestions
                  onSelectPrompt={(text) => onSendMessage(text)}
                  language={currentLang}
                />
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>
        </div>

        {/* History Drawer Sidebar */}
        {historyOpen && (
          <div className="absolute inset-y-0 right-0 z-20 w-80 border-l border-slate-200 bg-white shadow-lg flex flex-col animate-fade-in">
            <div className="flex items-center justify-between border-b border-slate-200 px-4 py-3 bg-slate-50">
              <span className="text-xs font-bold text-slate-800">Inquiry History</span>
              <div className="flex items-center space-x-1">
                <button
                  onClick={() => storageService.exportHistory()}
                  className="rounded p-1 text-slate-500 hover:bg-slate-200"
                  title="Export JSON"
                >
                  <Download className="h-3.5 w-3.5" />
                </button>
                <button
                  onClick={() => setHistoryOpen(false)}
                  className="rounded p-1 text-slate-500 hover:bg-slate-200"
                >
                  ×
                </button>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-2 space-y-1">
              {sessions.map((s) => (
                <div
                  key={s.id}
                  onClick={() => {
                    onSelectSession(s.id);
                    setHistoryOpen(false);
                  }}
                  className={`group flex items-center justify-between rounded p-2 text-xs cursor-pointer transition-colors ${
                    s.id === activeSessionId
                      ? 'bg-blue-50 text-[#00529B] font-bold border border-blue-200'
                      : 'hover:bg-slate-50 text-slate-700'
                  }`}
                >
                  <span className="truncate flex-1 pr-2">
                    {s.title || 'General BIS Inquiry'}
                  </span>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onDeleteSession(s.id);
                    }}
                    className="opacity-0 group-hover:opacity-100 p-1 text-slate-400 hover:text-red-600"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Input Form Bar */}
      <div className="border-t border-slate-200 bg-white p-3 sm:p-4">
        <div className="mx-auto max-w-3xl">
          <form onSubmit={handleSubmit} className="flex items-center space-x-2">
            <button
              type="button"
              onClick={onResetChat}
              className="rounded border border-slate-200 p-2 text-slate-500 hover:bg-slate-50 hover:text-slate-800"
              title="Reset Conversation"
            >
              <RotateCcw className="h-4 w-4" />
            </button>

            <button
              type="button"
              onClick={handleVoiceInput}
              className={`rounded border p-2 transition-colors ${
                isListening 
                  ? 'border-red-400 bg-red-50 text-red-600 animate-pulse' 
                  : 'border-slate-200 text-slate-500 hover:bg-slate-50 hover:text-slate-800'
              }`}
              title={isListening ? "Listening... click to stop" : "Speak your query"}
            >
              {isListening ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
            </button>

            <div className="relative flex-1">
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Ask about IS Codes (e.g. IS 10500, IS 694), HUID gold purity, cement licensing..."
                className="w-full rounded border border-slate-300 bg-white px-3.5 py-2 text-xs sm:text-sm text-slate-900 placeholder-slate-400 focus:border-[#00529B] focus:outline-none focus:ring-1 focus:ring-[#00529B]"
                disabled={isStreaming}
              />
            </div>

            <button
              type="submit"
              disabled={!input.trim() || isStreaming}
              className="rounded bg-[#00529B] p-2 text-white hover:bg-[#003d75] disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
              title="Send Inquiry"
            >
              <Send className="h-4 w-4" />
            </button>
          </form>

          <div className="mt-1.5 flex items-center justify-between text-[10px] text-slate-400 px-1">
            <span>Powered by BIS Standards Repository & LLM Gateway</span>
            <span>Supports 7 Indian Languages</span>
          </div>
        </div>
      </div>

    </div>
  );
};
