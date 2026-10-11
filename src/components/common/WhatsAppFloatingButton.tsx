import React, { useState } from 'react';
import { MessageCircle, X, Sparkles, Send } from 'lucide-react';
import { useData } from '../../context/DataContext';

export const WhatsAppFloatingButton: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [customMsg, setCustomMsg] = useState('');
  const { settings } = useData();

  const cleanPhone = settings.whatsappNumber.replace(/[^0-9]/g, '');

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    const text = customMsg.trim() || 'Hi InstaHoliday! I would like to enquire about your holiday packages.';
    const url = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank');
    setIsOpen(false);
    setCustomMsg('');
  };

  const quickPrompts = [
    'I want to enquire about domestic packages (Kerala / Andaman)',
    'Looking for international packages (Dubai / Europe / Vietnam)',
    'Can you help customize a trip for our family?',
  ];

  const handleQuickSend = (prompt: string) => {
    const url = `https://wa.me/${cleanPhone}?text=${encodeURIComponent('Hi InstaHoliday! ' + prompt)}`;
    window.open(url, '_blank');
    setIsOpen(false);
  };

  return (
    <div className="fixed bottom-6 left-6 z-40">
      {/* Popover popup */}
      {isOpen && (
        <div className="mb-3 w-80 sm:w-96 bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden animate-slide-up">
          <div className="bg-emerald-600 text-white p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                <MessageCircle className="w-6 h-6 text-white" />
              </div>
              <div>
                <h4 className="font-bold text-sm">InstaHoliday Travel Desk</h4>
                <p className="text-xs text-emerald-100 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-300 animate-pulse"></span>
                  Typically replies within minutes
                </p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-white/80 hover:text-white p-1 rounded-lg"
              aria-label="Close WhatsApp chat"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="p-4 bg-slate-50 flex flex-col gap-3">
            <div className="bg-white p-3 rounded-xl border border-slate-200 text-xs text-slate-700 leading-relaxed shadow-sm">
              <p className="font-semibold text-slate-900 mb-1">Namaste! 🙏</p>
              How can we assist your vacation planning today? Pick a quick option or write to our Pune travel desk below:
            </div>

            <div className="flex flex-col gap-1.5">
              {quickPrompts.map((prompt, idx) => (
                <button
                  key={idx}
                  onClick={() => handleQuickSend(prompt)}
                  className="text-left text-xs bg-white hover:bg-emerald-50 border border-slate-200 hover:border-emerald-300 text-slate-700 hover:text-emerald-800 p-2.5 rounded-lg transition-colors flex items-center justify-between group"
                >
                  <span className="line-clamp-1">{prompt}</span>
                  <Send className="w-3.5 h-3.5 text-slate-400 group-hover:text-emerald-600 shrink-0 ml-1" />
                </button>
              ))}
            </div>

            <form onSubmit={handleSend} className="mt-2 flex gap-2">
              <input
                type="text"
                placeholder="Type your question..."
                value={customMsg}
                onChange={(e) => setCustomMsg(e.target.value)}
                className="flex-1 text-xs px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white"
              />
              <button
                type="submit"
                className="px-3 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-semibold flex items-center justify-center shrink-0 transition-colors"
                aria-label="Send WhatsApp"
              >
                <Send className="w-3.5 h-3.5" />
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Main floating pill/button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="group flex items-center gap-2.5 px-4 py-3 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white shadow-xl shadow-emerald-600/30 transition-all duration-300 hover:scale-105 active:scale-95"
        aria-label="Chat on WhatsApp"
      >
        <MessageCircle className="w-6 h-6 animate-bounce" />
        <span className="text-xs font-bold tracking-wide hidden sm:inline-block">
          {isOpen ? 'Close Desk' : 'Chat on WhatsApp'}
        </span>
      </button>
    </div>
  );
};
