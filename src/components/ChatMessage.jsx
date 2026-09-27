import React, { useState } from 'react';
import { 
  User, 
  Copy, 
  Check, 
  Volume2, 
  VolumeX
} from 'lucide-react';
import { marked } from 'marked';
import { SaathiMascot } from './OfficialLogos';

marked.setOptions({
  breaks: true,
  gfm: true
});

export const ChatMessage = ({ message, isLatest, isStreaming }) => {
  const [copied, setCopied] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const isAssistant = message.role === 'assistant';

  const handleCopy = () => {
    navigator.clipboard.writeText(message.content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSpeech = () => {
    if (!('speechSynthesis' in window)) {
      alert('Speech synthesis is not supported in your browser.');
      return;
    }

    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      return;
    }

    const cleanText = message.content
      .replace(/[*#_`~\[\]\(\)]/g, '')
      .replace(/https?:\/\/[^\s]+/g, '');

    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.rate = 1.0;
    utterance.pitch = 1.0;

    const voices = window.speechSynthesis.getVoices();
    const indianVoice = voices.find(v => v.lang === 'en-IN' || v.lang === 'hi-IN' || v.name.includes('India'));
    if (indianVoice) {
      utterance.voice = indianVoice;
    }

    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);

    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(utterance);
    setIsSpeaking(true);
  };

  const htmlContent = marked.parse(message.content || '');

  return (
    <div
      className={`flex w-full gap-3 p-4 rounded border transition-colors ${
        isAssistant 
          ? 'bg-white border-slate-200' 
          : 'bg-slate-50 border-slate-200'
      }`}
    >
      {/* Avatar */}
      <div className="shrink-0">
        {isAssistant ? (
          <SaathiMascot className="h-8 w-8 ring-1 ring-blue-200" />
        ) : (
          <div className="flex h-8 w-8 items-center justify-center rounded bg-slate-200 text-slate-700">
            <User className="h-4 w-4" />
          </div>
        )}
      </div>

      {/* Content Body */}
      <div className="min-w-0 flex-1 space-y-1">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="text-xs font-bold text-slate-900 font-sans">
              {isAssistant ? 'AI SATHI' : 'You'}
            </span>
          </div>
          {message.timestamp && (
            <span className="text-[10px] text-slate-400 font-mono">
              {message.timestamp}
            </span>
          )}
        </div>

        {/* Rendered Markdown */}
        <div 
          className="prose-bis-light text-xs sm:text-sm overflow-x-auto leading-relaxed pt-1"
          dangerouslySetInnerHTML={{ __html: htmlContent }}
        />

        {/* Streaming Indicator */}
        {isAssistant && isStreaming && isLatest && (
          <div className="flex items-center space-x-1.5 pt-2 text-[#00529B]">
            <span className="h-2 w-2 rounded-full bg-[#00529B] animate-bounce" style={{ animationDelay: '0ms' }} />
            <span className="h-2 w-2 rounded-full bg-[#00529B] animate-bounce" style={{ animationDelay: '150ms' }} />
            <span className="h-2 w-2 rounded-full bg-[#00529B] animate-bounce" style={{ animationDelay: '300ms' }} />
            <span className="text-[10px] font-semibold text-slate-500 ml-1">Streaming response...</span>
          </div>
        )}

        {/* Action Controls for Assistant */}
        {isAssistant && !isStreaming && message.content && (
          <div className="mt-3 flex items-center justify-between border-t border-slate-100 pt-2 text-slate-500">
            <div className="flex items-center space-x-1 text-[10px] text-slate-400 font-mono">
              <span>Bureau of Indian Standards Repository</span>
            </div>

            <div className="flex items-center space-x-2">
              <button
                onClick={handleCopy}
                className="flex items-center space-x-1 rounded px-2 py-1 text-xs text-slate-600 hover:bg-slate-100 hover:text-slate-900 transition-colors"
                title="Copy Response"
              >
                {copied ? (
                  <>
                    <Check className="h-3.5 w-3.5 text-emerald-600" />
                    <span className="text-[10px] text-emerald-600 font-medium">Copied</span>
                  </>
                ) : (
                  <>
                    <Copy className="h-3.5 w-3.5" />
                    <span className="text-[10px]">Copy</span>
                  </>
                )}
              </button>

              <button
                onClick={handleSpeech}
                className={`flex items-center space-x-1 rounded px-2 py-1 text-xs transition-colors ${
                  isSpeaking
                    ? 'bg-blue-100 text-[#00529B] font-semibold'
                    : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                }`}
                title={isSpeaking ? "Stop Reading" : "Read Response Out Loud"}
              >
                {isSpeaking ? (
                  <>
                    <VolumeX className="h-3.5 w-3.5 text-[#00529B] animate-pulse" />
                    <span className="text-[10px]">Stop</span>
                  </>
                ) : (
                  <>
                    <Volume2 className="h-3.5 w-3.5" />
                    <span className="text-[10px]">Listen</span>
                  </>
                )}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
