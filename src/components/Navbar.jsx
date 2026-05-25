import React from 'react';
import { Link } from 'react-router-dom';
// 1. Import HashLink here
import { HashLink } from 'react-router-hash-link'; 
import { navLinks } from '../data/siteContent';

import { GraduationCap } from 'lucide-react';

export default function Navbar({ onLeadClick, activeTab, onTabChange, user }) {
  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-dark/90 backdrop-blur-xl">
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
        {/* Logo - Left */}
        <div className="flex-1">
          <button 
            onClick={() => onTabChange && onTabChange('after12th')} 
            className="inline-flex items-center gap-2.5 text-white outline-none group"
          >
            <div className="flex h-10 w-12 items-center justify-center rounded-2xl bg-[#FF6B2B] shadow-lg shadow-[#FF6B2B]/20 transition-transform group-hover:scale-105">
              <span className="text-sm font-bold text-white tracking-tighter" style={{ fontFamily: 'system-ui, sans-serif' }}>अत्यanT</span>
            </div>
            <div className="text-2xl font-black tracking-tight text-white">Atyant</div>
          </button>
        </div>

        {/* Nav Links - Center/Left */}
        <nav className="hidden lg:flex items-center gap-8">
          <button 
            onClick={() => onTabChange && onTabChange('after12th')}
            className={`text-sm font-medium transition ${activeTab === 'after12th' ? 'text-[#FF6B2B]' : 'text-white hover:text-[#FF6B2B]'}`}
          >
            Home
          </button>
          
          <button 
            onClick={() => onTabChange && onTabChange('mentors')}
            className={`text-sm font-medium transition flex items-center gap-1 ${activeTab === 'mentors' ? 'text-blue-400' : 'text-white hover:text-blue-400'}`}
          >
            Find Mentors <span className="flex h-4 w-4 items-center justify-center rounded-full bg-blue-500/20 text-[9px] font-bold text-blue-400 ring-1 ring-blue-500/50">NEW</span>
          </button>

          {navLinks.map((link) => (
            <HashLink 
              smooth 
              key={link.label} 
              to={link.href} 
              className="text-sm font-medium text-white hover:text-[#FF6B2B] transition"
            >
              {link.label}
            </HashLink>
          ))}
        </nav>

        {/* Buttons - Right */}
        <div className="flex flex-1 items-center justify-end gap-3">
          {user ? (
            <Link to="/profile" className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-800 border-2 border-slate-700 text-sm font-bold text-white transition hover:border-[#FF6B2B]">
              {user.name.charAt(0).toUpperCase()}
            </Link>
          ) : (
            <Link to="/login" className="inline-flex items-center rounded-full bg-blue-500 px-4 py-2 text-sm font-medium text-white transition hover:bg-[#FF6B2B]">
              Login
            </Link>
          )}
          <button
            type="button"
            onClick={onLeadClick}
            className="inline-flex items-center rounded-full bg-[#FF6B2B] px-4 py-2 text-sm font-semibold text-white hover:bg-[#ff7b48] transition"
          >
            Get Clarity
          </button>
        </div>
      </div>
    </header>
  );
}