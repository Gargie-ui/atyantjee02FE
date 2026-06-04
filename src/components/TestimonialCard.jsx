import React from 'react';
import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';

export default function TestimonialCard({ quote, name, city, stars = 5 }) {
  return (
    <motion.div
      whileHover={{ y: -6, scale: 1.02 }}
      transition={{ duration: 0.3 }}
      className="relative overflow-hidden rounded-[1.8rem] border border-orange-100 bg-white p-7 shadow-[0_20px_60px_rgba(255,107,43,0.08)] flex flex-col h-full"
    >
      {/* Subtle gradient accent top-right */}
      <div className="absolute -top-6 -right-6 h-24 w-24 rounded-full bg-gradient-to-br from-[#FF6B2B]/20 to-orange-100/30 blur-2xl" />

      {/* Quote icon */}
      <div className="relative z-10 flex items-start justify-between">
        <div className="flex items-center gap-1">
          {Array.from({ length: stars }).map((_, i) => (
            <Star key={i} className="h-4 w-4 fill-[#FF6B2B] text-[#FF6B2B]" />
          ))}
        </div>
        <Quote className="h-8 w-8 text-orange-200" />
      </div>

      {/* Quote text */}
      <p className="relative z-10 mt-5 flex-1 text-sm leading-7 text-slate-600 font-medium">
        "{quote}"
      </p>

      {/* Divider */}
      <div className="relative z-10 mt-6 h-px w-12 bg-gradient-to-r from-[#FF6B2B] to-orange-200 rounded-full" />

      {/* Name + City */}
      <div className="relative z-10 mt-4 flex items-center gap-3">
        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-[#FF6B2B] to-[#ff955f] text-sm font-black text-white shadow-md shadow-[#FF6B2B]/20">
          {name.charAt(0)}
        </div>
        <div>
          <p className="text-sm font-black text-[#0B0F2E]">{name}</p>
          <p className="text-xs text-slate-400 font-medium">{city}</p>
        </div>
      </div>
    </motion.div>
  );
}
