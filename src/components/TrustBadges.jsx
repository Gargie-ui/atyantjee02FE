import React from 'react';
import { Users, Building2, Star } from 'lucide-react';

const badges = [
  { id: 1, title: '12k+', subtitle: 'Students Guided', icon: Users, color: 'text-blue-400', bg: 'bg-blue-500/10' },
  { id: 2, title: '100+', subtitle: 'Colleges Covered', icon: Building2, color: 'text-emerald-400', bg: 'bg-emerald-500/10' },
  { id: 3, title: '4.9/5', subtitle: 'Average Rating', icon: Star, color: 'text-[#FFC900]', bg: 'bg-[#FFC900]/10' },
];

export default function TrustBadges() {
  return (
    <div className="bg-[#0B0F2E] border-y border-white/5 py-8 sm:py-10">
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 divide-y sm:divide-y-0 sm:divide-x divide-white/10">
          {badges.map((b) => {
            const Icon = b.icon;
            return (
              <div key={b.id} className="flex items-center justify-center gap-5 py-4 sm:py-0 transition-transform hover:scale-105">
                <div className={`flex h-14 w-14 items-center justify-center rounded-2xl ${b.bg} ${b.color} shadow-lg ring-1 ring-white/10`}>
                  <Icon className="h-7 w-7" />
                </div>
                <div className="text-left">
                  <div className="text-2xl font-black text-white tracking-tight">{b.title}</div>
                  <div className="text-xs font-bold uppercase tracking-widest text-slate-400 mt-1">{b.subtitle}</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
