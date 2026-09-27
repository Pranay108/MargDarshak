import React, { useState } from 'react';
import { Sidebar } from '../components/Sidebar';
import { ChatInterface } from '../components/ChatInterface';
import { Menu, ChevronLeft, ChevronRight } from 'lucide-react';

export const ChatbotPage = ({
  sessions,
  activeSessionId,
  onSelectSession,
  onNewSession,
  onDeleteSession,
  onClearAllSessions,
  onSendMessage,
  isStreaming,
  currentLang,
  t,
  onResetChat
}) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const activeSession = sessions.find(s => s.id === activeSessionId) || sessions[0];

  return (
    <div className="relative flex h-[calc(100vh-4.25rem)] w-full overflow-hidden">
      {/* Sidebar for History */}
      <Sidebar
        sessions={sessions}
        activeSessionId={activeSessionId}
        onSelectSession={onSelectSession}
        onNewSession={onNewSession}
        onDeleteSession={onDeleteSession}
        onClearAllSessions={onClearAllSessions}
        isOpen={sidebarOpen}
        onToggleOpen={() => setSidebarOpen(!sidebarOpen)}
        t={t}
      />

      {/* Floating Sidebar Toggle Button for Desktop */}
      <button
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className="hidden md:flex absolute top-3 left-2 z-20 h-7 w-7 items-center justify-center rounded-lg border border-slate-700 bg-slate-900/80 text-slate-300 shadow-md backdrop-blur hover:bg-slate-800 hover:text-white transition-all"
        title={sidebarOpen ? "Collapse sidebar" : "Expand sidebar"}
      >
        {sidebarOpen ? <ChevronLeft className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
      </button>

      {/* Chat Area */}
      <ChatInterface
        session={activeSession}
        onSendMessage={onSendMessage}
        isStreaming={isStreaming}
        currentLang={currentLang}
        t={t}
        onResetChat={onResetChat}
      />
    </div>
  );
};
