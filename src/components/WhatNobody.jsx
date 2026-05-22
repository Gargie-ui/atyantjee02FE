import React from 'react';
import { motion } from 'framer-motion';

const items = [
  { title: 'Tier 3 CSE ≠ guaranteed placement', color: 'from-[#FFD8C4] to-[#FFB6A2]', icon: '⚠️' },
  { title: 'Branch matters more than you think', color: 'from-[#E7F6FF] to-[#CFEFFF]', icon: '🔍' },
  { title: 'Private colleges hide real placement data', color: 'from-[#FFE7E0] to-[#FFD1C1]', icon: '🕵️‍♂️' },
  { title: 'Following friends leads to regret', color: 'from-[#FFF6DF] to-[#FFE6B8]', icon: '🤝' },
];

const container = {
  hidden: {},

  show: {
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const card = {
  hidden: {
    opacity: 0,
    y: 8,
  },

  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.45,
    },
  },
};

export default function WhatNobody() {
  return (
    <section className="relative overflow-hidden bg-[#0B0F2E] px-4 py-14 sm:px-6 lg:px-8">
      

      {/* FLOATING ORBS */}
      <div className="absolute -top-24 left-[-80px] h-72 w-72 rounded-full bg-blue-500/20 blur-3xl" />

      <div className="absolute top-40 right-[-100px] h-80 w-80 rounded-full bg-cyan-400/20 blur-3xl" />

      <div className="absolute bottom-[-120px] left-1/3 h-96 w-96 rounded-full bg-indigo-500/10 blur-3xl" />

      {/* LIGHT GRID */}
      <div className="absolute inset-0 opacity-[0.03]">
        <div className="h-full w-full bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] bg-[size:40px_40px]" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl">

        {/* HEADER */}
        <div className="mx-auto max-w-3xl text-center">

          <p className="text-sm font-semibold uppercase tracking-[0.22em] text-cyan-300">
            Hidden Truths
          </p>

          <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-white sm:text-4xl lg:text-5xl">
            What Nobody Tells You
            <br />
            About College Decisions
          </h2>

          <p className="mt-4 text-sm leading-7 text-white/70 sm:text-base">
            Little truths that quietly shape your future,
            but most students realise them too late.
          </p>

        </div>

        {/* CARDS */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4"
        >

          {items.map((it) => (
            <motion.div
              key={it.title}
              variants={card}
              whileHover={{
                y: -8,
                scale: 1.02,
              }}
              className={`
                relative
                overflow-hidden
                rounded-2xl
                border
                border-white/10
                bg-gradient-to-br
                ${it.color}
                p-5
                text-[#0B0F2E]
                shadow-[0_10px_35px_rgba(0,0,0,0.18)]
                backdrop-blur-sm
                transition-all
                duration-300
              `}
            >

              {/* CARD GLOW */}
              <div className="absolute right-0 top-0 h-20 w-20 rounded-full bg-white/20 blur-2xl" />

              <div className="relative z-10 flex items-start gap-3">

                {/* ICON */}
                <div className="mt-1 flex-shrink-0 text-2xl">
                  {it.icon}
                </div>

                {/* CONTENT */}
                <div className="min-w-0">

                  <div className="text-sm font-bold leading-6">
                    {it.title}
                  </div>

                  <div className="mt-2 text-xs leading-5 text-slate-700">
                    Short, actionable insight to help you think differently about choices.
                  </div>

                </div>

              </div>

            </motion.div>
          ))}

        </motion.div>

      </div>
    </section>
  );
}
