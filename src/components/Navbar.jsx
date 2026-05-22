import React from 'react';
import { navLinks } from '../data/siteContent';

export default function Navbar({ onLeadClick, activeTab, onTabChange }) {
  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-dark/90 backdrop-blur-xl">
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
        {/* Logo - Left */}
        <div className="flex-1">
          <button 
            onClick={() => onTabChange && onTabChange('after12th')} 
            className="inline-flex items-center gap-2 text-white outline-none"
          >
            <div className="text-2xl font-black tracking-tight text-[#FF6B2B]">ATYANT</div>
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
            <a key={link.label} href={link.href} className="text-sm font-medium text-white hover:text-[#FF6B2B] transition">
              {link.label}
            </a>
          ))}
        </nav>

        {/* Buttons - Right */}
        <div className="flex flex-1 items-center justify-end gap-3">
          <a href="https://www.atyant.in/login" className="inline-flex items-center rounded-full bg-blue-500 px-4 py-2 text-sm font-medium text-white transition hover:bg-[#FF6B2B]">
            Login
          </a>
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
