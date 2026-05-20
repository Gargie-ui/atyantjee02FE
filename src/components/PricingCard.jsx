import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2 } from 'lucide-react';
import { getWhatsAppLink } from '../utils/whatsapp';

export default function PricingCard({ title, price, features, cta, highlighted = false, badge }) {
  return (
    <motion.div
      whileHover={{ y: -8, scale: 1.01 }}
      className={`relative rounded-[1.8rem] border p-7 shadow-[0_24px_70px_rgba(11,15,46,0.08)] transition ${
        highlighted
          ? 'border-[#FF6B2B] bg-[#0B0F2E] text-white ring-4 ring-[#FF6B2B]/15'
          : 'border-slate-200 bg-white text-[#0B0F2E]'
      }`}
    >
      {badge ? (
        <div className="absolute -top-3 left-6 rounded-full bg-[#FF6B2B] px-4 py-1 text-xs font-bold uppercase tracking-[0.18em] text-white shadow-lg shadow-[#FF6B2B]/25">
          {badge}
        </div>
      ) : null}
      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 className={`text-2xl font-black ${highlighted ? 'text-white' : 'text-[#0B0F2E]'}`}>{title}</h3>
          <p className={`mt-2 text-sm ${highlighted ? 'text-white/70' : 'text-slate-500'}`}>Best fit for students who want faster clarity.</p>
        </div>
        <div className={`rounded-2xl px-4 py-2 text-right ${highlighted ? 'bg-white/10' : 'bg-[#FF6B2B]/10'}`}>
          <div className={`text-xs font-semibold uppercase tracking-[0.18em] ${highlighted ? 'text-white/60' : 'text-[#FF6B2B]'}`}>Starting at</div>
          <div className={`text-3xl font-black ${highlighted ? 'text-white' : 'text-[#0B0F2E]'}`}>
            ₹{price}
          </div>
        </div>
      </div>
      <div className="mt-6 space-y-3">
        {features.map((feature) => (
          <div key={feature} className={`flex items-center gap-3 text-sm ${highlighted ? 'text-white/80' : 'text-slate-700'}`}>
            <CheckCircle2 className="h-4 w-4 shrink-0 text-[#FF6B2B]" />
            {feature}
          </div>
        ))}
      </div>
      <a
        href={getWhatsAppLink(title)}
        target="_blank"
        rel="noopener noreferrer"
        className={`mt-7 inline-flex w-full items-center justify-center rounded-full px-5 py-4 text-sm font-semibold transition hover:scale-[1.02] ${
          highlighted ? 'bg-[#FF6B2B] text-white hover:bg-[#ff7a42]' : 'bg-[#0B0F2E] text-white hover:bg-[#12183f]'
        }`}
      >
        {cta}
      </a>
    </motion.div>
  );
}
