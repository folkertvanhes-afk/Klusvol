import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Loader2, Sparkles, Hammer, HardHat, ThumbsUp } from 'lucide-react';
import { GoogleGenAI } from "@google/genai";

// Aangepaste instructie: Directer, "vakmannentaal", focus op winst en rust.
const SYSTEM_INSTRUCTION = `Je bent de digitale 'maat' en assistent van KlusVol. Je spreekt de taal van de vakman (schilder, stucadoor, loodgieter).
Jouw doel: De gebruiker overtuigen om de 'Gratis Setup' te doen. Niet door te slijmen, maar door feiten te noemen.

Jouw karakter:
- No-nonsense, recht voor z'n raap.
- Je tutoyeert (zeg 'je', geen 'u').
- Je bent enthousiast maar professioneel.
- Je snapt dat ze druk zijn. Tijd is geld.

Belangrijkste punten om te benoemen:
1. "Je laat geld liggen": Als je niet opneemt, belt de klant de volgende. KlusVol vangt dit op.
2. "Geen gezeur in de avond": Administratie en facturen doe je tussendoor in de app, niet 's avonds op de bank.
3. "Simpel": Wij richten het in. Jij hoeft alleen in te loggen.

Prijzen:
- Start (€97): Voor als je gewoon bereikbaar wilt zijn.
- Basis (€147, de slimste keuze): Met agenda en reviews. Verdien je met 1 klusje terug.
- Pro (€217): Voor als je echt wilt gasgeven met marketing.

Antwoord altijd kort. Maximaal 2-3 zinnen. Gebruik af en toe een emoji (🔨, 💪, 👍).`;

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{role: 'user' | 'model', text: string}[]>([
      { role: 'model', text: 'Moi! 👋 Druk bezig? Ik ben de digitale maat van KlusVol. Vraag maar raak.' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatSessionRef = useRef<any>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userText = input;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userText }]);
    setIsLoading(true);

    try {
        if (!chatSessionRef.current) {
            const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
            chatSessionRef.current = ai.chats.create({
                model: 'gemini-3-pro-preview',
                config: {
                    systemInstruction: SYSTEM_INSTRUCTION,
                }
            });
        }

        const result = await chatSessionRef.current.sendMessage({ message: userText });
        const responseText = result.text;

        setMessages(prev => [...prev, { role: 'model', text: responseText }]);
    } catch (error) {
        console.error("Chat error:", error);
        setMessages(prev => [...prev, { role: 'model', text: 'Krijg nou wat, de verbinding hapert. Probeer het zo nog eens.' }]);
    } finally {
        setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <>
      {/* Toggle Button with Ripple Effect */}
      <div className={`fixed bottom-24 md:bottom-6 right-6 z-[90] group`}>
        {/* Pulse Effect */}
        <div className={`absolute inset-0 rounded-full bg-brand-orange/40 animate-ping opacity-75 ${isOpen ? 'hidden' : 'block'}`}></div>
        
        <button
            onClick={() => setIsOpen(!isOpen)}
            className={`relative p-4 rounded-full shadow-2xl transition-all duration-300 transform hover:scale-105 flex items-center justify-center border border-white/10
            ${isOpen 
                ? 'bg-[#1a1f2e] text-white rotate-90 border-white/20' 
                : 'bg-brand-orange text-white shadow-[0_0_20px_rgba(255,87,34,0.5)]'
            }`}
            aria-label="Open Chat"
        >
            {isOpen ? <X size={24} /> : <MessageCircle size={28} fill="currentColor" className="animate-pulse-slow" />}
        </button>
      </div>

      {/* Modern Glass Chat Window */}
      {isOpen && (
        <div className="fixed bottom-40 md:bottom-24 right-4 md:right-6 w-[calc(100vw-2rem)] md:w-[380px] h-[550px] max-h-[65vh] md:max-h-[75vh] bg-[#0B0F19]/90 backdrop-blur-xl border border-white/10 rounded-[2rem] shadow-[0_20px_60px_-10px_rgba(0,0,0,0.8)] flex flex-col overflow-hidden z-[90] animate-slide-up-fade origin-bottom-right ring-1 ring-white/5">
          
          {/* Interactive Background */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
               <div className="absolute top-[-50%] left-[-50%] w-[200%] h-[200%] bg-[radial-gradient(circle_at_center,rgba(255,87,34,0.08)_0%,transparent_50%)] animate-[spin_10s_linear_infinite]"></div>
               <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.07] mix-blend-overlay"></div>
          </div>

          {/* Header */}
          <div className="relative p-5 border-b border-white/5 bg-gradient-to-r from-white/5 to-transparent flex items-center justify-between z-10">
            <div className="flex items-center gap-3">
                <div className="relative">
                    <div className="w-11 h-11 rounded-full bg-gradient-to-br from-brand-orange to-orange-700 flex items-center justify-center shadow-lg shadow-brand-orange/20 border border-white/10">
                        <HardHat size={20} className="text-white" />
                    </div>
                    <div className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-green-500 border-2 border-[#0B0F19] rounded-full animate-pulse"></div>
                </div>
                <div>
                    <h3 className="font-bold text-white text-base leading-tight">KlusVol Maatje</h3>
                    <p className="text-[11px] text-gray-400 font-medium">Altijd bereikbaar</p>
                </div>
            </div>
            <div className="bg-white/5 p-2 rounded-full cursor-pointer hover:bg-white/10 transition-colors" onClick={() => setIsOpen(false)}>
                <X size={16} className="text-gray-400" />
            </div>
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-5 space-y-5 no-scrollbar relative z-10">
            {messages.map((msg, idx) => (
                <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} animate-slide-up-fade`}>
                    <div className={`
                        max-w-[85%] p-4 text-sm leading-relaxed shadow-md backdrop-blur-sm
                        ${msg.role === 'user' 
                        ? 'bg-brand-orange text-white rounded-2xl rounded-tr-sm font-medium' 
                        : 'bg-[#1a1f2e]/80 border border-white/5 text-gray-200 rounded-2xl rounded-tl-sm'
                        }
                    `}>
                        {msg.text}
                    </div>
                </div>
            ))}
            
            {isLoading && (
                 <div className="flex justify-start animate-pulse">
                    <div className="bg-[#1a1f2e]/80 border border-white/5 px-4 py-3 rounded-2xl rounded-tl-sm flex items-center gap-2">
                        <span className="text-xs text-gray-400 font-medium">Even checken...</span>
                        <div className="flex gap-1">
                            <span className="w-1.5 h-1.5 bg-brand-orange rounded-full animate-bounce"></span>
                            <span className="w-1.5 h-1.5 bg-brand-orange rounded-full animate-bounce delay-100"></span>
                        </div>
                    </div>
                </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="p-4 bg-[#12141c]/80 border-t border-white/5 relative z-10 backdrop-blur-md">
            <div className="relative flex items-center group">
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleKeyPress}
                    placeholder="Zeg het eens..."
                    disabled={isLoading}
                    className="w-full bg-[#050810] border border-white/10 rounded-2xl py-4 pl-5 pr-14 text-white placeholder-gray-500 focus:outline-none focus:border-brand-orange/50 focus:bg-[#050810] transition-all text-sm shadow-inner group-hover:border-white/20"
                />
                <button 
                    onClick={handleSend}
                    disabled={!input.trim() || isLoading}
                    className="absolute right-2 p-2.5 bg-brand-orange text-white rounded-xl disabled:opacity-50 disabled:grayscale hover:bg-orange-600 transition-all active:scale-95 shadow-lg shadow-brand-orange/20"
                >
                    {isLoading ? <Loader2 size={18} className="animate-spin" /> : <Send size={18} />}
                </button>
            </div>
             <div className="flex justify-center items-center gap-1.5 mt-3 opacity-40">
                <Sparkles size={10} />
                <span className="text-[10px] uppercase tracking-widest font-bold">Powered by Gemini</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Chatbot;
