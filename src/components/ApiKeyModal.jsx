import React, { useState, useEffect } from 'react';
import { Settings, ShieldCheck, X, Check, ExternalLink, Key, RefreshCw, AlertCircle, Sparkles } from 'lucide-react';
import { storageService } from '../services/storageService';
import { llmService } from '../services/llmService';

export const ApiKeyModal = ({ isOpen, onClose, onKeyUpdated, currentKey }) => {
  const [provider, setProvider] = useState(storageService.getProvider());
  const [inputKey, setInputKey] = useState(storageService.getApiKey());
  const [model, setModel] = useState(storageService.getModel());
  const [baseUrl, setBaseUrl] = useState(storageService.getBaseUrl());
  
  const [testStatus, setTestStatus] = useState(null); // { loading, success, message }
  const [savedSuccess, setSavedSuccess] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setProvider(storageService.getProvider());
      setInputKey(storageService.getApiKey());
      setModel(storageService.getModel());
      setBaseUrl(storageService.getBaseUrl());
      setTestStatus(null);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleTestConnection = async () => {
    setTestStatus({ loading: true });
    const res = await llmService.testConnection(inputKey.trim(), provider, model.trim(), baseUrl.trim());
    setTestStatus({ loading: false, success: res.success, message: res.message });
  };

  const handleSave = (e) => {
    e.preventDefault();
    storageService.setProvider(provider);
    storageService.setApiKey(inputKey.trim());
    storageService.setModel(model.trim());
    storageService.setBaseUrl(baseUrl.trim());
    onKeyUpdated(inputKey.trim());
    setSavedSuccess(true);
    setTimeout(() => {
      setSavedSuccess(false);
      onClose();
    }, 600);
  };

  const handleClear = () => {
    storageService.setApiKey('');
    setInputKey('');
    onKeyUpdated('');
    setTestStatus(null);
    setSavedSuccess(true);
    setTimeout(() => {
      setSavedSuccess(false);
      onClose();
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 p-4 backdrop-blur-xs animate-fade-in">
      <div className="w-full max-w-lg rounded-2xl border border-slate-200 bg-white p-6 shadow-dropdown max-h-[90vh] overflow-y-auto">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <div className="flex items-center space-x-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-50 text-[#00529B] ring-1 ring-blue-100">
              <Key className="h-5 w-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900 font-sans">LLM API Configuration</h3>
              <p className="text-xs text-slate-500">Configure single LLM provider for AI SATHI</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="rounded-lg p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-700"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <form onSubmit={handleSave} className="mt-4 space-y-4">
          
          {/* Provider Selection */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              LLM API Provider
            </label>
            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => {
                  setProvider('gemini');
                  setModel('gemini-flash-latest');
                  setInputKey(storageService.getGeminiApiKey());
                  setTestStatus(null);
                }}
                className={`rounded-xl border p-2.5 text-left text-xs font-semibold transition-all ${
                  provider === 'gemini'
                    ? 'border-[#00529B] bg-blue-50/80 text-[#00529B] shadow-xs'
                    : 'border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100'
                }`}
              >
                <div className="font-bold">Google Gemini</div>
                <div className="text-[10px] font-normal text-slate-500 mt-0.5">Gemini Flash (Active)</div>
              </button>

              <button
                type="button"
                onClick={() => {
                  setProvider('mistral');
                  setModel('mistral-small-latest');
                  setInputKey(storageService.getMistralApiKey());
                  setTestStatus(null);
                }}
                className={`rounded-xl border p-2.5 text-left text-xs font-semibold transition-all ${
                  provider === 'mistral'
                    ? 'border-[#00529B] bg-blue-50/80 text-[#00529B] shadow-xs'
                    : 'border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100'
                }`}
              >
                <div className="font-bold">Mistral AI</div>
                <div className="text-[10px] font-normal text-slate-500 mt-0.5">High Volume API</div>
              </button>

              <button
                type="button"
                onClick={() => {
                  setProvider('openai');
                  setModel('gpt-4o-mini');
                  setTestStatus(null);
                }}
                className={`rounded-xl border p-2.5 text-left text-xs font-semibold transition-all ${
                  provider === 'openai'
                    ? 'border-[#00529B] bg-blue-50/80 text-[#00529B] shadow-xs'
                    : 'border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100'
                }`}
              >
                <div className="font-bold">OpenAI / Groq</div>
                <div className="text-[10px] font-normal text-slate-500 mt-0.5">Custom Endpoint</div>
              </button>
            </div>
          </div>

          {/* API Key */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              API Key
            </label>
            <input
              type="text"
              placeholder={provider === 'gemini' ? 'AIzaSy...' : provider === 'mistral' ? 'mstrl_...' : 'sk-... or gsk_...'}
              value={inputKey}
              onChange={(e) => {
                setInputKey(e.target.value);
                setTestStatus(null);
              }}
              className="w-full rounded-xl border border-slate-300 bg-white px-3.5 py-2 text-xs text-slate-900 placeholder-slate-400 focus:border-[#00529B] focus:outline-none focus:ring-1 focus:ring-[#00529B] font-mono"
            />
          </div>

          {/* Model Name */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Model Name
              </label>
              <input
                type="text"
                placeholder={provider === 'gemini' ? 'gemini-1.5-flash' : 'gpt-4o-mini'}
                value={model}
                onChange={(e) => setModel(e.target.value)}
                className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-xs text-slate-900 focus:border-[#00529B] focus:outline-none font-mono"
              />
            </div>

            {provider === 'openai' && (
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Base URL (Optional)
                </label>
                <input
                  type="text"
                  placeholder="https://api.groq.com/openai/v1"
                  value={baseUrl}
                  onChange={(e) => setBaseUrl(e.target.value)}
                  className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-xs text-slate-900 focus:border-[#00529B] focus:outline-none font-mono"
                />
              </div>
            )}
          </div>

          {/* Test Connection Button & Status */}
          <div className="rounded-xl border border-slate-200 bg-slate-50 p-3 flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-700">Validate API Connection:</span>
              <button
                type="button"
                onClick={handleTestConnection}
                disabled={!inputKey.trim() || testStatus?.loading}
                className="inline-flex items-center space-x-1.5 rounded-lg border border-slate-300 bg-white px-3 py-1.5 text-xs font-semibold text-slate-800 shadow-xs hover:bg-slate-50 disabled:opacity-40 transition-colors"
              >
                <RefreshCw className={`h-3.5 w-3.5 text-[#00529B] ${testStatus?.loading ? 'animate-spin' : ''}`} />
                <span>{testStatus?.loading ? 'Testing...' : 'Test Connection'}</span>
              </button>
            </div>

            {testStatus && (
              <div className={`rounded-lg p-2.5 text-xs flex items-start space-x-2 ${
                testStatus.success 
                  ? 'bg-emerald-50 text-emerald-800 border border-emerald-200' 
                  : 'bg-red-50 text-red-800 border border-red-200'
              }`}>
                {testStatus.success ? (
                  <Check className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
                ) : (
                  <AlertCircle className="h-4 w-4 text-red-600 shrink-0 mt-0.5" />
                )}
                <div className="min-w-0 flex-1 leading-snug">
                  {testStatus.message}
                </div>
              </div>
            )}
          </div>

          {/* Actions */}
          <div className="flex items-center justify-between pt-2 border-t border-slate-100">
            <a
              href={provider === 'gemini' ? "https://aistudio.google.com/app/apikey" : "https://platform.openai.com/api-keys"}
              target="_blank"
              rel="noreferrer"
              className="flex items-center space-x-1 text-xs text-[#00529B] hover:underline"
            >
              <span>Get Free {provider === 'gemini' ? 'Gemini' : 'OpenAI'} Key</span>
              <ExternalLink className="h-3 w-3" />
            </a>

            <div className="flex items-center space-x-2">
              {inputKey && (
                <button
                  type="button"
                  onClick={handleClear}
                  className="rounded-xl border border-red-200 px-3 py-2 text-xs font-semibold text-red-600 hover:bg-red-50"
                >
                  Clear
                </button>
              )}
              <button
                type="submit"
                className="flex items-center space-x-1.5 rounded-xl bg-[#00529B] px-4 py-2 text-xs font-semibold text-white hover:bg-[#044983]"
              >
                {savedSuccess ? (
                  <>
                    <Check className="h-4 w-4 text-white" />
                    <span>Saved!</span>
                  </>
                ) : (
                  <span>Save Settings</span>
                )}
              </button>
            </div>
          </div>

        </form>
      </div>
    </div>
  );
};
