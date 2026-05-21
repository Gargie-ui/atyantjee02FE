import React from 'react';
import { createPortal } from 'react-dom';

const canned = [
  { id: 1, from: 'bot', text: 'Hey there! How can I help with your career decision today?' },
  { id: 2, from: 'bot', text: 'To give you the best advice, what stream are you in, and do you have a recent exam rank you\'re working with?' },
];

export default function ChatWidget() {
  const [open, setOpen] = React.useState(false);
  const [messages, setMessages] = React.useState(canned);
  const [input, setInput] = React.useState('');

  function send(msg) {
    if (!msg.trim()) return;
    setMessages((m) => [...m, { id: Date.now(), from: 'user', text: msg }]);
    setInput('');
    setTimeout(() => {
      setMessages((m) => [
        ...m,
        { id: Date.now() + 1, from: 'bot', text: `Thanks — we got: "${msg}". We'll email a tailored plan.` },
      ]);
    }, 600);
  }

  return createPortal(
    <>
      {open ? (
        /* 1. FULL-HEIGHT RIGHT SIDEBAR PANEL 
          Takes up full width on mobile devices, and a clean 384px width (w-96) on desktop.
        */
        <div className="fixed top-0 right-0 z-[99999] h-screen w-full md:w-96 bg-white shadow-2xl border-l border-gray-100 flex flex-col transition-all duration-300 ease-in-out">
          
          {/* Header */}
          <div className="p-4 bg-[#09102b] text-white flex items-center justify-between shadow-sm">
            <div>
              <div className="text-base font-bold tracking-wide">Atyant Assistant</div>
              <div className="text-xs text-white/70">AI Decision Support</div>
            </div>
            
            {/* The Close Cross Icon - Makes the sidebar disappear and button return */}
            <button 
              onClick={() => setOpen(false)} 
              className="text-white/60 hover:text-white text-3xl font-light p-2 leading-none transition-all hover:scale-110 active:scale-95"
              aria-label="Close chat"
            >
              &times;
            </button>
          </div>
          
          {/* Scrollable Messages Area */}
          <div className="flex-1 p-4 space-y-3 overflow-y-auto bg-slate-50">
            {messages.map((m) => (
              <div key={m.id} className={`flex ${m.from === 'bot' ? 'justify-start' : 'justify-end'}`}>
                <div
                  className={`rounded-2xl px-4 py-2.5 text-sm max-w-[85%] break-words shadow-sm ${
                    m.from === 'bot' ? 'bg-white text-gray-900 border border-gray-100' : 'bg-[#FF6B2B] text-white'
                  }`}
                >
                  {m.text}
                </div>
              </div>
            ))}
          </div>
          
          {/* Message Input Footer Form */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              send(input);
            }}
            className="p-4 bg-white border-t border-gray-100 flex gap-2"
          >
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your message..."
              className="flex-1 rounded-xl border border-gray-200 px-4 py-2.5 text-sm focus:outline-none focus:border-[#FF6B2B] transition-colors"
            />
            <button 
              type="submit" 
              className="rounded-xl bg-[#FF6B2B] px-4 py-2.5 text-sm font-semibold text-white hover:bg-[#e05a1f] transition-colors shadow-md shadow-[#FF6B2B]/20"
            >
              Send
            </button>
          </form>
        </div>
      ) : (
        /* 2. NEW INDEPENDENT FLOATING BUTTON
          Positioned slightly above or next to your WhatsApp element so they don't block each other.
          Adjust bottom-24 if needed to stack perfectly above the WhatsApp button.
        */
        <button
          onClick={() => setOpen(true)}
          className="fixed bottom-8 right-8 z-[99999] flex h-12 items-center gap-2 rounded-full bg-[#FF6B2B] px-4 text-sm font-semibold text-white shadow-2xl hover:bg-[#ff7a42] hover:scale-[1.03] active:scale-95 transition-all"
        >
          {/* Sparkles / AI Bot Icon Layout */}
          <svg 
            className="h-4 w-4 text-white fill-current" 
            viewBox="0 0 16 16"
          >
            <path d="M5.5 0a.5.5 0 0 1 .5.5v2A.5.5 0 0 1 5.5 3h-2a.5.5 0 0 1-.5-.5v-2A.5.5 0 0 1 3.5 0h2zm5 12a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2a.5.5 0 0 1 .5-.5h2zm-5 1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5h1zm9-9a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5h1zm-4-1a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5v-2a.5.5 0 0 1 .5-.5h3z"/>
            <path d="M9.646 5.354a.5.5 0 0 0-.708 0L5.146 9.146a.5.5 0 1 0 .708.708L9.646 6.062a.5.5 0 0 0 0-.708z"/>
          </svg>
          <span>Ask AI Assistant</span>
        </button>
      )}
    </>,
    document.body
  );
}
