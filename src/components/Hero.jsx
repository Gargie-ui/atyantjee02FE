import React from 'react';
import { motion } from 'framer-motion';
import {
  Sparkles,
  ArrowRight,
} from 'lucide-react';

const journeyTabs = [
  { id: 'after12th', label: 'After 12th 🔥' },
  { id: 'college', label: 'College Student 🚀' },
  { id: 'finalyear', label: 'Final Year 💼' },
  { id: 'workingpro', label: 'Working Pro 📈' },
];

export default function Hero({ activeTab, onTabChange }) {
  return (
    <div className="relative overflow-hidden bg-[#0B0F2E] text-white">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(255,107,43,0.22),_transparent_35%),radial-gradient(circle_at_bottom_right,_rgba(63,94,251,0.15),_transparent_30%)]" />

      <div className="absolute left-1/2 top-0 h-72 w-72 -translate-x-1/2 rounded-full bg-[#FF6B2B]/20 blur-3xl" />

      <section className="relative z-10 mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8 lg:py-24">
        <div className="grid items-center gap-16 lg:grid-cols-2">
          
          {/* LEFT SECTION */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            {/* Tabs */}
            <div className="mb-6 flex flex-wrap gap-3">
              {journeyTabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => onTabChange(tab.id)}
                  className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                    activeTab === tab.id
                      ? 'bg-[#FF6B2B] text-white'
                      : 'border border-white/20 bg-white/5 text-white/80 hover:bg-white/10'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Badge */}
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/70 backdrop-blur">
              <Sparkles className="h-4 w-4 text-[#FF6B2B]" />
              Decision Clarity Platform
            </div>

            {/* Heading */}
            <h1 className="max-w-2xl text-4xl font-black leading-tight sm:text-5xl lg:text-6xl">
              Make the perfect <br />

              <span className="italic text-[#FF6B2B]">
                Career Decision
              </span>
            </h1>

            {/* Description */}
            <p className="mt-6 max-w-xl text-base leading-8 text-white/70 lg:text-lg">
              Get expert branch guidance, JoSAA/CSAB help,
              and insights from relatable college seniors.
              Navigate the engineering transition with the
              community that's been there.
            </p>

            {/* Buttons */}
            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <button
                onClick={() =>
                  window.dispatchEvent(
                    new CustomEvent('openLeadModal')
                  )
                }
                className="inline-flex items-center justify-center gap-2 rounded-full bg-[#FF6B2B] px-7 py-4 text-sm font-semibold text-white shadow-2xl shadow-[#FF6B2B]/30 transition duration-300 hover:bg-[#ff7a42] hover:text-white hover:shadow-[0_0_24px_rgba(255,107,43,0.45)] hover:scale-105"
              >
                Get Started
                <ArrowRight className="h-4 w-4" />
              </button>

              <a
                href="#pricing"
                className="inline-flex items-center justify-center rounded-full border border-white/15 bg-white px-7 py-4 text-sm font-semibold text-[#0B0F2E] shadow-xl shadow-[#FF6B2B]/10 transition duration-300 hover:bg-[#FF6B2B] hover:text-white hover:shadow-[0_0_24px_rgba(255,107,43,0.45)] hover:scale-105"
              >
                Explore Plans
              </a>
            </div>
          </motion.div>

          {/* RIGHT SIDE ANIMATED CARDS */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            className="relative hidden lg:flex items-center justify-center"
          >
            <div className="relative h-[520px] w-full max-w-[520px]">
              
              {/* Main Dashboard Card */}
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
                className="absolute left-10 top-16 w-[340px] rounded-[28px] border border-white/10 bg-white/10 p-6 shadow-2xl backdrop-blur-xl"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-white/60">
                      Career Match
                    </p>

                    <h3 className="mt-1 text-3xl font-black text-white">
                      92%
                    </h3>
                  </div>

                  <div className="rounded-2xl bg-[#FF6B2B]/20 px-4 py-2 text-sm font-semibold text-[#FF6B2B]">
                    AI Powered
                  </div>
                </div>

                <div className="mt-6 space-y-4">
                  <div className="rounded-2xl bg-white/5 p-4">
                    <p className="text-xs text-white/50">
                      Recommended Branch
                    </p>

                    <div className="mt-2 flex items-center justify-between">
                      <h4 className="text-lg font-bold">
                        Computer Science
                      </h4>

                      <span className="rounded-full bg-green-500/20 px-3 py-1 text-xs font-semibold text-green-400">
                        Best Fit
                      </span>
                    </div>
                  </div>

                  <div className="rounded-2xl bg-white/5 p-4">
                    <p className="text-xs text-white/50">
                      Skill Readiness
                    </p>

                    <div className="mt-3 h-3 overflow-hidden rounded-full bg-white/10">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: '78%' }}
                        transition={{ duration: 1.5 }}
                        className="h-full rounded-full bg-gradient-to-r from-[#FF6B2B] to-orange-300"
                      />
                    </div>

                    <p className="mt-2 text-sm text-white/70">
                      78% ready for placements
                    </p>
                  </div>
                </div>
              </motion.div>

              {/* AI Card */}
              <motion.div
                animate={{ y: [0, 12, 0] }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
                className="absolute right-0 top-0 w-[240px] rounded-[24px] border border-white/10 bg-[#111633]/90 p-5 shadow-2xl backdrop-blur-xl"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#FF6B2B]/20 text-[#FF6B2B]">
                    ✨
                  </div>

                  <div>
                    <h4 className="font-semibold">
                      AI Mentor
                    </h4>

                    <p className="text-xs text-white/50">
                      Online now
                    </p>
                  </div>
                </div>

                <div className="mt-5 rounded-2xl bg-white/5 p-4 text-sm leading-6 text-white/75">
                  “Based on your interests, CSE with AI
                  specialization matches your profile best.”
                </div>
              </motion.div>

              {/* Stats Card */}
              <motion.div
                animate={{ y: [0, -12, 0] }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
                className="absolute bottom-8 right-6 w-[220px] rounded-[24px] border border-white/10 bg-white/10 p-5 shadow-2xl backdrop-blur-xl"
              >
                <p className="text-sm text-white/50">
                  Students Guided
                </p>

                <h3 className="mt-2 text-4xl font-black text-white">
                  5K+
                </h3>

                <div className="mt-4 flex items-center gap-2">
                  <div className="h-2 flex-1 rounded-full bg-white/10">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: '85%' }}
                      transition={{ duration: 2 }}
                      className="h-2 rounded-full bg-[#FF6B2B]"
                    />
                  </div>

                  <span className="text-xs text-white/60">
                    85%
                  </span>
                </div>

                <p className="mt-3 text-xs leading-5 text-white/60">
                  Students reported better clarity after
                  mentorship.
                </p>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
