import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Hero from '../components/Hero';
import ParticleClusterBackground from '../components/ParticleClusterBackground';
import DecisionEngine from '../components/DecisionEngine';
import RegretSection from '../components/RegretSection';
import DecisionTool from '../components/DecisionTool';
import WhatNobody from '../components/WhatNobody';
import QuickConfusionSelector from '../components/QuickConfusionSelector';
import ClarityForm from '../components/ClarityForm';
import ClarityResult from '../components/ClarityResult';
import ComparisonTool from '../components/ComparisonTool';
import AtyantFramework from '../components/AtyantFramework';
import TrustMetrics from '../components/TrustMetrics';
import PricingCard from '../components/PricingCard';
import TestimonialCard from '../components/TestimonialCard';
import FAQItem from '../components/FAQItem';
import {
  faqItems,
  freeGroupBullets,
  howItWorksSteps,
  painPoints,
  pillars,
  pricingPlans,
  testimonials,
} from '../data/siteContent';

const sectionVariants = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: 'easeOut' } },
};

function PainSection() {
  return (
    <motion.section id="pain" className="bg-[#f6f7fb] px-4 py-20 sm:px-6 lg:px-8" variants={sectionVariants} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }}>
      <div className="mx-auto max-w-7xl">
        <div className="max-w-2xl">
          <div className="text-sm font-semibold uppercase tracking-[0.22em] text-[#FF6B2B]">Why Students Regret Their Choice</div>
          <h2 className="mt-3 text-3xl font-black tracking-tight text-[#0B0F2E] sm:text-4xl">The wrong choice doesn't feel wrong on day one.</h2>
          <p className="mt-4 text-base leading-8 text-slate-600">It usually feels confusing, rushed, and "good enough" until the reality of placements, branch, crowd, or location hits later.</p>
        </div>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {painPoints.map((item) => {
            const Icon = item.icon;
            return (
              <motion.div key={item.title} whileHover={{ y: -8, scale: 1.01 }} className="group rounded-[1.7rem] border border-slate-200 bg-white p-7 shadow-[0_20px_60px_rgba(15,23,42,0.06)] transition">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#FF6B2B]/10 text-[#FF6B2B] transition group-hover:bg-[#FF6B2B] group-hover:text-white">
                  <Icon className="h-7 w-7" />
                </div>
                <h3 className="mt-6 text-xl font-bold text-[#0B0F2E]">{item.title}</h3>
                <p className="mt-3 text-sm leading-7 text-slate-600">{item.description}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </motion.section>
  );
}

function SolutionSection() {
  return (
    <motion.section id="how-it-works" className="bg-[#0B0F2E] px-4 py-20 text-white sm:px-6 lg:px-8" variants={sectionVariants} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }}>
      <div className="mx-auto max-w-7xl">
        <div className="max-w-2xl">
          <div className="text-sm font-semibold uppercase tracking-[0.22em] text-[#FFB38E]">Why Atyant Launchpad Wins</div>
          <h2 className="mt-3 text-3xl font-black tracking-tight sm:text-4xl">Real insights for better decisions.</h2>
        </div>
        <div className="mt-10 grid gap-6 md:grid-cols-4">
          {pillars.map((pillar) => {
            const Icon = pillar.icon;
            return (
              <motion.div key={pillar.title} whileHover={{ y: -8 }} className="rounded-[1.7rem] border border-white/10 bg-white/6 p-7 shadow-2xl shadow-black/20 backdrop-blur-xl">
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
    </motion.section>
  );
}

function PricingSection() {
  return (
    <motion.section id="pricing" className="bg-[#f6f7fb] px-4 py-20 sm:px-6 lg:px-8" variants={sectionVariants} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }}>
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

function StoriesSection() {
  return (
    <motion.section id="stories" className="bg-white px-4 py-20 sm:px-6 lg:px-8" variants={sectionVariants} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }}>
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

function HowItWorksSection() {
  return (
    <motion.section className="bg-[#0B0F2E] px-4 py-20 text-white sm:px-6 lg:px-8" variants={sectionVariants} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }}>
      <div className="mx-auto max-w-7xl">
        <div className="max-w-2xl">
          <div className="text-sm font-semibold uppercase tracking-[0.22em] text-[#FFB38E]">How Launchpad Works</div>
          <h2 className="mt-3 text-3xl font-black tracking-tight sm:text-4xl">Three steps to a better decision.</h2>
        </div>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {howItWorksSteps.map((item) => (
            <motion.div key={item.step} whileHover={{ y: -8 }} className="rounded-[1.7rem] border border-white/10 bg-white/6 p-7 backdrop-blur-xl">
              <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-[#FF6B2B] text-lg font-black text-white shadow-lg shadow-[#FF6B2B]/25">
                {item.step}
              </div>
              <h3 className="mt-5 text-2xl font-bold">{item.title}</h3>
              <p className="mt-3 text-sm leading-7 text-white/72">{item.text}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
}

function FreeGroupSection() {
  return (
    <>
      <motion.section className="px-4 py-6 sm:px-6 lg:px-8" variants={sectionVariants} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }}>
        <motion.div initial={{ y: -8, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.6 }} className="mx-auto max-w-7xl">
          <div className="mx-auto max-w-3xl">
            <motion.div whileHover={{ scale: 1.02 }} className="mx-auto rounded-full bg-gradient-to-r from-[#FFDBCB] via-[#FFE6D6] to-[#FFF4EF] px-5 py-3 shadow-lg flex items-center justify-center gap-3 border border-white/20">
              <div className="animate-pulse text-xl">🔥</div>
              <p className="text-center text-sm font-semibold text-[#FF6B2B] sm:text-base">Early bird advantage: Join now for personalized college matching</p>
            </motion.div>
          </div>
        </motion.div>
      </motion.section>

      <motion.section className="bg-[#f6f7fb] px-4 py-12 sm:px-6 lg:px-8" variants={sectionVariants} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }}>
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-6 lg:grid-cols-2">
            <motion.div initial={{ opacity: 0, x: -10 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }} className="overflow-hidden rounded-[1.6rem] bg-gradient-to-br from-[#0B122B] to-[#12183a] px-6 py-8 shadow-[0_40px_120px_rgba(11,15,46,0.16)] sm:px-10 sm:py-10">
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
                <a href="https://chat.whatsapp.com/F3qcw7JZRIK5vbPgvUfaOA?mode=gi_t" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-3 rounded-full bg-gradient-to-br from-[#FF6B2B] to-[#ff8a57] px-6 py-3 text-sm font-semibold text-white shadow-2xl transition hover:scale-[1.03]">
                  Join Free Group
                </a>
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, x: 10 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }} className="rounded-[1.6rem] border p-8 bg-white shadow-[0_20px_60px_rgba(15,23,42,0.06)] flex flex-col h-full">
              <div>
                <h3 className="text-4xl font-black text-[#0B0F2E]">🛡️ Why Parents Trust Atyant</h3>
                <p className="mt-3 text-base text-slate-600 font-medium">Practical, evidence-backed guidance that parents can rely on.</p>
              </div>
              
              <div className="mt-8 space-y-6 flex-1">
                <motion.div whileHover={{ x: 6 }} className="flex items-start gap-4">
                  <div className="mt-1 h-3 w-3 rounded-full bg-[#FF6B2B] flex-shrink-0"></div>
                  <div>
                    <p className="text-lg font-bold text-slate-800">100% Honest Feedback</p>
                    <p className="text-sm text-slate-600 mt-2">No sugar-coating. Real insights from real seniors.</p>
                  </div>
                </motion.div>
                
                <motion.div whileHover={{ x: 6 }} className="flex items-start gap-4">
                  <div className="mt-1 h-3 w-3 rounded-full bg-[#FF6B2B] flex-shrink-0"></div>
                  <div>
                    <p className="text-lg font-bold text-slate-800">Data-Backed Placement Truth</p>
                    <p className="text-sm text-slate-600 mt-2">College outcomes verified from 100+ colleges.</p>
                  </div>
                </motion.div>
                
                <motion.div whileHover={{ x: 6 }} className="flex items-start gap-4">
                  <div className="mt-1 h-3 w-3 rounded-full bg-[#FF6B2B] flex-shrink-0"></div>
                  <div>
                    <p className="text-lg font-bold text-slate-800">Personalized For Your Kid</p>
                    <p className="text-sm text-slate-600 mt-2">Not generic advice. Your situation matters.</p>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.section>
    </>
  );
}

function FAQSection() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <motion.section id="faq" className="bg-white px-4 py-20 sm:px-6 lg:px-8" variants={sectionVariants} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }}>
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

function FinalCTA() {
  return (
    <div className="relative w-full">
      <ParticleClusterBackground particleCount={18} variant="dark" intensity="medium" />
      <section id="contact" className="relative bg-[#0B0F2E] px-4 py-20 text-white sm:px-6 lg:px-8 z-10">
        <div className="mx-auto max-w-5xl rounded-[2rem] border border-white/10 bg-[linear-gradient(135deg,rgba(255,107,43,0.16),rgba(255,255,255,0.04))] p-8 text-center shadow-[0_30px_100px_rgba(0,0,0,0.35)] sm:p-12">
          <h2 className="text-3xl font-black tracking-tight sm:text-5xl">One Wrong Decision Costs 4 Years.</h2>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-8 text-white/74 sm:text-lg">One right decision changes everything. Get clarity on college, branch, and your future before you commit.</p>
          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <a href="https://chat.whatsapp.com/F3qcw7JZRIK5vbPgvUfaOA?mode=gi_t" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center rounded-full bg-[#FF6B2B] px-8 py-4 text-sm font-semibold text-white shadow-2xl shadow-[#FF6B2B]/25 transition hover:scale-[1.03] hover:bg-[#ff7a42]">
              Get Clarity Now
            </a>
            <a href="#faq" className="inline-flex items-center justify-center rounded-full border border-white/15 bg-white/5 px-8 py-4 text-sm font-semibold text-white backdrop-blur transition hover:scale-[1.03] hover:bg-[#FF6B2B]/12 hover:text-white">
              Read FAQ
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}

export default function LaunchpadPage({ activeTab, onTabChange }) {
  const [clarityData, setClarityData] = useState(null);

  React.useEffect(() => {
    const data = localStorage.getItem('studentClarityData');
    if (data) {
      try { setClarityData(JSON.parse(data)); } catch (e) {}
    }
  }, []);

  return (
    <main>
      <Hero activeTab={activeTab} onTabChange={onTabChange} />
      
      <QuickConfusionSelector />

      <section className="py-20 bg-slate-50 px-4 sm:px-6 lg:px-8" id="clarity-form">
        <div className="max-w-7xl mx-auto">
          {!clarityData ? (
             <ClarityForm onComplete={(data) => setClarityData(data)} />
          ) : (
             <div className="space-y-6">
                <ClarityResult data={clarityData} />
                <div className="text-center mt-8">
                  <button onClick={() => { localStorage.removeItem('studentClarityData'); setClarityData(null); }} className="text-sm font-semibold text-slate-500 hover:text-[#0B0F2E] underline transition">
                    Retake Clarity Form
                  </button>
                </div>
             </div>
          )}
        </div>
      </section>

      <DecisionTool />
      <TrustMetrics />
      <DecisionEngine />
      <WhatNobody />
      <ComparisonTool />
      <AtyantFramework />
      <RegretSection />
      <PainSection />
      <SolutionSection />
      <PricingSection />
      <StoriesSection />
      <HowItWorksSection />
      <FreeGroupSection />
      <FAQSection />
      <FinalCTA />
    </main>
  );
}
