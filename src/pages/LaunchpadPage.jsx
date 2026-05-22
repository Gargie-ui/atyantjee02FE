import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Hero from '../components/Hero';
import ParticleClusterBackground from '../components/ParticleClusterBackground';
import RegretSection from '../components/RegretSection';
import WhatNobody from '../components/WhatNobody';
import DecisionEngine from '../components/DecisionEngine';
import ComparisonSection from '../components/ComparisonSection';
import AtyantFramework from '../components/AtyantFramework';
import TrustMetrics from '../components/TrustMetrics';
import PricingCard from '../components/PricingCard';
import TestimonialCard from '../components/TestimonialCard';
import FAQItem from '../components/FAQItem';
import {
  faqItems,
  freeGroupBullets,
  howItWorksSteps,
  pillars,
  pricingPlans,
  testimonials,
} from '../data/siteContent';

const sectionVariants = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: 'easeOut' } },
};

// ─── SECTION 3: How Atyant Solves It — simple 3-step process ─────────────────
function HowItWorksSection() {
  return (
    <motion.section
      id="how-it-works"
      className="bg-[#0B0F2E] px-4 py-20 text-white sm:px-6 lg:px-8"
      variants={sectionVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
    >
      <div className="mx-auto max-w-7xl">
        <div className="max-w-2xl">
          <div className="text-sm font-semibold uppercase tracking-[0.22em] text-[#FFB38E]">How Launchpad Works</div>
          <h2 className="mt-3 text-3xl font-black tracking-tight sm:text-4xl">Three steps to a better decision.</h2>
        </div>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {howItWorksSteps.map((item) => (
            <motion.div
              key={item.step}
              whileHover={{ y: -8 }}
              className="rounded-[1.7rem] border border-white/10 bg-white/6 p-7 backdrop-blur-xl"
            >
              <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-[#FF6B2B] text-lg font-black text-white shadow-lg shadow-[#FF6B2B]/25">
                {item.step}
              </div>
              <h3 className="mt-5 text-2xl font-bold">{item.title}</h3>
              <p className="mt-3 text-sm leading-7 text-white/72">{item.text}</p>
            </motion.div>
          ))}
        </div>

        {/* Why Atyant Wins pillars */}
        <div className="mt-16">
          <div className="text-sm font-semibold uppercase tracking-[0.22em] text-[#FFB38E] mb-8">Why Atyant Launchpad Wins</div>
          <div className="grid gap-6 md:grid-cols-4">
            {pillars.map((pillar) => {
              const Icon = pillar.icon;
              return (
                <motion.div
                  key={pillar.title}
                  whileHover={{ y: -8 }}
                  className="rounded-[1.7rem] border border-white/10 bg-white/6 p-7 shadow-2xl shadow-black/20 backdrop-blur-xl"
                >
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#FF6B2B]/15 text-[#FFB38E]">
                    <Icon className="h-7 w-7" />
                  </div>
                  <h3 className="mt-6 text-2xl font-bold">{pillar.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-white/72">{pillar.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Free community + Parents trust */}
        <div className="mt-16 grid gap-6 lg:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="overflow-hidden rounded-[1.6rem] bg-gradient-to-br from-[#0B122B] to-[#12183a] px-6 py-8 shadow-[0_40px_120px_rgba(11,15,46,0.16)] sm:px-10 sm:py-10"
          >
            <div className="text-sm font-semibold uppercase tracking-[0.22em] text-[#FFC900]">Free Community</div>
            <h2 className="mt-3 text-3xl font-black tracking-tight text-white sm:text-4xl">Join 12,000+ Students in Our Community</h2>
            <p className="mt-4 text-base leading-7 text-white/80">Get college updates, cutoff alerts, mistakes to avoid, and real senior Q&A — all in our exclusive group.</p>
            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              {freeGroupBullets.map((bullet) => (
                <motion.div key={bullet} whileHover={{ x: 6 }} className="flex items-center gap-3 rounded-xl bg-white/6 px-4 py-3">
                  <div className="h-7 w-7 flex items-center justify-center rounded-full bg-[#FF6B2B] text-white font-bold">✓</div>
                  <div className="text-sm text-white">{bullet}</div>
                </motion.div>
              ))}
            </div>
            <div className="mt-6 flex justify-center">
              <a
                href="https://chat.whatsapp.com/F3qcw7JZRIK5vbPgvUfaOA?mode=gi_t"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 rounded-full bg-gradient-to-br from-[#FF6B2B] to-[#ff8a57] px-6 py-3 text-sm font-semibold text-white shadow-2xl transition hover:scale-[1.03]"
              >
                Join Free Group
              </a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 10 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="rounded-[1.6rem] border border-white/10 bg-white/5 p-8 flex flex-col h-full"
          >
            <div>
              <h3 className="text-4xl font-black text-white">🛡️ Why Parents Trust Atyant</h3>
              <p className="mt-3 text-base text-white/80 font-medium">Practical, evidence-backed guidance that parents can rely on.</p>
            </div>
            <div className="mt-8 space-y-6 flex-1">
              <motion.div whileHover={{ x: 6 }} className="flex items-start gap-4">
                <div className="mt-1 h-3 w-3 rounded-full bg-[#FF6B2B] flex-shrink-0"></div>
                <div>
                  <p className="text-lg font-bold text-white">100% Honest Feedback</p>
                  <p className="text-sm text-white/70 mt-2">No sugar-coating. Real insights from real seniors.</p>
                </div>
              </motion.div>
              <motion.div whileHover={{ x: 6 }} className="flex items-start gap-4">
                <div className="mt-1 h-3 w-3 rounded-full bg-[#FF6B2B] flex-shrink-0"></div>
                <div>
                  <p className="text-lg font-bold text-white">Data-Backed Placement Truth</p>
                  <p className="text-sm text-white/70 mt-2">College outcomes verified from 100+ colleges.</p>
                </div>
              </motion.div>
              <motion.div whileHover={{ x: 6 }} className="flex items-start gap-4">
                <div className="mt-1 h-3 w-3 rounded-full bg-[#FF6B2B] flex-shrink-0"></div>
                <div>
                  <p className="text-lg font-bold text-white">Personalized For Your Kid</p>
                  <p className="text-sm text-white/70 mt-2">Not generic advice. Your situation matters.</p>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
}

// ─── SECTION 4: Social Proof — real stories, real numbers ────────────────────
function StoriesSection() {
  return (
    <motion.section
      id="stories"
      className="bg-white px-4 py-20 sm:px-6 lg:px-8"
      variants={sectionVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
    >
      <div className="mx-auto max-w-7xl">
        <div className="max-w-2xl">
          <div className="text-sm font-semibold uppercase tracking-[0.22em] text-[#FF6B2B]">Success Stories</div>
          <h2 className="mt-3 text-3xl font-black tracking-tight text-[#0B0F2E] sm:text-4xl">Students who found clarity.</h2>
        </div>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {testimonials.map((testimonial) => (
            <TestimonialCard key={testimonial.name} {...testimonial} />
          ))}
        </div>
      </div>
    </motion.section>
  );
}

// ─── SECTION 6: Pricing — simple, clear, lowest barrier first ────────────────
function PricingSection() {
  return (
    <motion.section
      id="pricing"
      className="bg-[#f6f7fb] px-4 py-20 sm:px-6 lg:px-8"
      variants={sectionVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
    >
      <div className="mx-auto max-w-7xl">
        <div className="max-w-2xl">
          <div className="text-sm font-semibold uppercase tracking-[0.22em] text-[#FF6B2B]">Pricing</div>
          <h2 className="mt-3 text-3xl font-black tracking-tight text-[#0B0F2E] sm:text-4xl">Pick the clarity you actually need.</h2>
          <p className="mt-4 text-base leading-8 text-slate-600">Simple plans. Easy to understand. Built to help students and parents make the right decision faster.</p>
        </div>
        <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {pricingPlans.map((plan) => (
            <PricingCard key={plan.title} {...plan} />
          ))}
        </div>
      </div>
    </motion.section>
  );
}

// ─── Early bird nudge (sits just above pricing) ───────────────────────────────
function EarlyBirdBanner() {
  return (
    <motion.section
      className="bg-[#f6f7fb] px-4 pt-10 sm:px-6 lg:px-8"
      variants={sectionVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
    >
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto max-w-3xl">
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="mx-auto rounded-full bg-gradient-to-r from-[#FFDBCB] via-[#FFE6D6] to-[#FFF4EF] px-5 py-3 shadow-lg flex items-center justify-center gap-3 border border-white/20"
          >
            <div className="animate-pulse text-xl">🔥</div>
            <p className="text-center text-sm font-semibold text-[#FF6B2B] sm:text-base">
              Early bird advantage: Join now for personalized college matching
            </p>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
}

// ─── FAQ ──────────────────────────────────────────────────────────────────────
function FAQSection() {
  const [openIndex, setOpenIndex] = useState(0);
  return (
    <motion.section
      id="faq"
      className="bg-white px-4 py-20 sm:px-6 lg:px-8"
      variants={sectionVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
    >
      <div className="mx-auto max-w-7xl">
        <div className="w-full text-center">
          <div className="text-sm font-semibold uppercase tracking-[0.22em] text-[#FF6B2B]">Questions?</div>
          <h2 className="mt-3 text-3xl font-black tracking-tight text-[#0B0F2E] sm:text-4xl">Common questions from students and parents.</h2>
        </div>
        <div className="mt-10 mx-auto grid gap-4 max-w-2xl">
          {faqItems.map((item, index) => (
            <FAQItem
              key={item.question}
              question={item.question}
              answer={item.answer}
              open={openIndex === index}
              onToggle={() => setOpenIndex(openIndex === index ? -1 : index)}
            />
          ))}
        </div>
      </div>
    </motion.section>
  );
}

// ─── SECTION 7: Final CTA — ONE action only ───────────────────────────────────
function FinalCTA() {
  return (
    <div className="relative w-full">
      <ParticleClusterBackground particleCount={18} variant="dark" intensity="medium" />
      <section id="contact" className="relative bg-[#0B0F2E] px-4 py-20 text-white sm:px-6 lg:px-8 z-10">
        <div className="mx-auto max-w-5xl rounded-[2rem] border border-white/10 bg-[linear-gradient(135deg,rgba(255,107,43,0.16),rgba(255,255,255,0.04))] p-8 text-center shadow-[0_30px_100px_rgba(0,0,0,0.35)] sm:p-12">
          <h2 className="text-3xl font-black tracking-tight sm:text-5xl">One Wrong Decision Costs 4 Years.</h2>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-8 text-white/74 sm:text-lg">
            One right decision changes everything. Get clarity on college, branch, and your future before you commit.
          </p>
          <div className="mt-8 flex items-center justify-center">
            <a
              href="https://chat.whatsapp.com/F3qcw7JZRIK5vbPgvUfaOA?mode=gi_t"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-full bg-[#FF6B2B] px-8 py-4 text-sm font-semibold text-white shadow-2xl shadow-[#FF6B2B]/25 transition hover:scale-[1.03] hover:bg-[#ff7a42]"
            >
              Get Clarity Now
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}

// ─── PAGE ──────────────────────────────────────────────────────────────────────
export default function LaunchpadPage({ activeTab, onTabChange }) {
  return (
    <main>
      {/* 1. Hero — speak their exact situation */}
      <Hero activeTab={activeTab} onTabChange={onTabChange} />

      {/* 2. The 3 biggest mistakes — emotional hook (fears they already have) */}
      {/* RegretSection = real student regret stories (4 cards) */}
      {/* WhatNobody = hidden truths about college decisions */}
      <RegretSection />
      <WhatNobody />

      {/* Bridge: seen the mistakes, now name your specific confusion */}
      <DecisionEngine />

      {/* 3. How Atyant solves it — 3-step process, pillars, community */}
      <HowItWorksSection />

      {/* 4. Social proof — real numbers then real stories */}
      <TrustMetrics />
      <StoriesSection />

      {/* 5. Comparison table — branch vs college, real data */}
      {/* ComparisonSection = side-by-side card comparison */}
      {/* AtyantFramework = 4-step decision system reinforces methodology */}
      <ComparisonSection />
      <AtyantFramework />

      {/* 6. Pricing — lowest barrier first, early bird nudge above */}
      <EarlyBirdBanner />
      <PricingSection />

      {/* 7. Final CTA — one action only, FAQ clears last objections first */}
      <FAQSection />
      <FinalCTA />
    </main>
  );
}
