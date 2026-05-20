import React from 'react';
import { navLinks } from '../data/siteContent';

export default function Navbar({ onLeadClick }) {
  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-[#0B0F2E]/88 backdrop-blur-xl">
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
        <div className="flex items-center gap-6">
          <a href="https://www.atyant.in/" className="inline-flex items-center gap-2 text-white">
            <div className="text-2xl font-black tracking-tight text-[#FF6B2B]">ATYANT</div>
          </a>

          <nav className="hidden lg:flex items-center gap-4">
            {navLinks.map((link) => (
              <a key={link.label} href={link.href} className="text-sm text-white/80 hover:text-white transition">
                {link.label}
              </a>
            ))}
          </nav>
        </div>

        <div className="flex items-center gap-3">
          <a href="https://www.atyant.in/login" className="inline-flex items-center rounded-full bg-blue-500 px-4 py-2 text-sm font-medium text-black transition hover:bg-[#FF6B2B] hover:text-white">
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
