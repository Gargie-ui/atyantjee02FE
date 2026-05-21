import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles } from 'lucide-react';

const steps = [
  { label: 'Basic details', key: 'basic' },
  { label: 'Academic details', key: 'academic' },
  { label: 'Interest area', key: 'interest' },
  { label: 'Your main confusion', key: 'confusion' },
  { label: 'Your top priority', key: 'priority' },
];

const examSuggestions = {
  JEE: {
    top: 'Your JEE score is strong. Focus on top NITs/IITs and a branch that aligns with your long-term goals.',
    mid: 'You have good JEE potential. Target strong state and national colleges, then choose the branch that excites you most.',
    low: 'Consider good state-level colleges with stable placements, and keep branch fit + growth skills as your priority.',
  },
  NEET: {
    top: 'Your NEET rank opens doors to top medical colleges. Stay focused and explore the best clinical or allied health routes.',
    mid: 'A solid NEET showing. Look at trusted private colleges and continue building your medical career clarity.',
    low: 'Choose colleges with strong support systems and consider allied health or life sciences if needed.',
  },
  'MHT-CET': {
    top: 'A strong MHT-CET score gives you access to premium state engineering colleges. Prioritize branch fit and campus ecosystem.',
    mid: 'You are in a good position for ranked state colleges. Pick a branch that gives you both interest and placement confidence.',
    low: 'Focus on colleges with consistent placements and branch options that match your strengths.',
  },
  default: {
    top: 'Your profile is promising. Focus on colleges that combine career growth with branch strength.',
    mid: 'Good options are available. Balance branch interest with college reputation and future outcomes.',
    low: 'Look for colleges with strong student support and practical career pathways.',
  },
};

export default function DecisionEngine() {
  const [activeStep, setActiveStep] = useState(1);
  const [fullName, setFullName] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [examType, setExamType] = useState('');
  const [rankInput, setRankInput] = useState('');
  const [preferredState, setPreferredState] = useState('');
  const [interestedBranch, setInterestedBranch] = useState('');
  const [confusion, setConfusion] = useState('');
  const [careerPriority, setCareerPriority] = useState('');
  const [result, setResult] = useState(null);

  const stepProgress = Math.round((activeStep / steps.length) * 100);

  const validateStep = () => {
    if (activeStep === 1) {
      if (!fullName.trim() || !whatsapp.trim()) {
        alert('Please enter your full name and WhatsApp number to continue.');
        return false;
      }
    }
    if (activeStep === 2) {
      if (!examType || !rankInput.trim() || !preferredState.trim()) {
        alert('Please complete your academic details to continue.');
        return false;
      }
    }
    if (activeStep === 3) {
      if (!interestedBranch) {
        alert('Please select an interested domain or branch.');
        return false;
      }
    }
    if (activeStep === 4) {
      if (!confusion) {
        alert('Please tell us what you are confused about.');
        return false;
      }
    }
    return true;
  };

  const handleNext = () => {
    if (!validateStep()) return;
    setActiveStep((step) => Math.min(step + 1, steps.length));
  };

  const handleBack = () => {
    setActiveStep((step) => Math.max(step - 1, 1));
  };

  const buildSuggestion = () => {
    const rank = parseInt(rankInput, 10);
    const examData = examSuggestions[examType] || examSuggestions.default;
    const tier = rank && rank > 0 ? (rank < 5000 ? 'top' : rank < 50000 ? 'mid' : 'low') : 'mid';
    return `${examData[tier]} Based on your interest in ${interestedBranch}, your main confusion about ${confusion.toLowerCase()} and your priority of ${careerPriority.toLowerCase()}, we recommend a balanced college and branch path that keeps both fit and future growth in view.`;
  };

  const handleGetDirection = () => {
    if (!careerPriority) {
      alert('Please select your career priority before getting your recommendation.');
      return;
    }
    setResult(buildSuggestion());
  };

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.6 }}
      className="bg-[#f6f7fb] px-4 py-20 sm:px-6 lg:px-8"
    >
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto max-w-2xl">
          <motion.div className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-[0_20px_60px_rgba(15,23,42,0.08)] sm:p-12">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#FF6B2B]/15 text-[#FF6B2B]">
                <Sparkles className="h-6 w-6" />
              </div>
              <h2 className="text-2xl font-bold text-[#0B0F2E]">Decision Engine</h2>
            </div>

            <p className="mt-4 text-slate-600">
              Complete the 5-step flow and get a recommendation built around your exam, branch interest, confusion, and career priority.
            </p>

            <div className="mt-8 space-y-6">
              <div className="space-y-3">
                <div className="flex items-center justify-between text-sm font-semibold text-slate-700">
                  <span>{`Step ${activeStep} of ${steps.length}`}</span>
                  <span>{steps[activeStep - 1].label}</span>
                </div>
                <div className="h-2 overflow-hidden rounded-full bg-slate-200">
                  <div className="h-full rounded-full bg-gradient-to-r from-[#FF6B2B] to-[#ff8a57]" style={{ width: `${stepProgress}%` }} />
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-5">
                {steps.map((step, index) => {
                  const isCompleted = index + 1 < activeStep;
                  const isActive = index + 1 === activeStep;
                  return (
                    <div
                      key={step.key}
                      className={`rounded-3xl border p-4 text-center text-xs font-semibold transition ${
                        isActive
                          ? 'border-[#FF6B2B] bg-[#FF6B2B]/10 text-[#0B0F2E]'
                          : isCompleted
                          ? 'border-slate-200 bg-white text-slate-400 opacity-80'
                          : 'border-slate-200 bg-white text-slate-500'
                      }`}
                    >
                      <div className="mb-2 text-[10px] uppercase tracking-[0.2em]">Step {index + 1}</div>
                      <div>{step.label}</div>
                    </div>
                  );
                })}
              </div>

              <div className="rounded-[1.75rem] border border-slate-200 bg-slate-50 p-6 shadow-sm">
                {activeStep === 1 && (
                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-semibold text-[#0B0F2E]">Full Name</label>
                      <input
                        type="text"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        placeholder="Enter your full name"
                        className="mt-2 w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-700 focus:border-[#FF6B2B] focus:outline-none focus:ring-2 focus:ring-[#FF6B2B]/20"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-[#0B0F2E]">WhatsApp Number</label>
                      <input
                        type="tel"
                        value={whatsapp}
                        onChange={(e) => setWhatsapp(e.target.value)}
                        placeholder="Enter your WhatsApp number"
                        className="mt-2 w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-700 focus:border-[#FF6B2B] focus:outline-none focus:ring-2 focus:ring-[#FF6B2B]/20"
                      />
                    </div>
                  </div>
                )}

                {activeStep === 2 && (
                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-semibold text-[#0B0F2E]">Exam Type</label>
                      <select
                        value={examType}
                        onChange={(e) => setExamType(e.target.value)}
                        className="mt-2 w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-700 focus:border-[#FF6B2B] focus:outline-none focus:ring-2 focus:ring-[#FF6B2B]/20"
                      >
                        <option value="">Select exam type</option>
                        <option value="JEE">JEE</option>
                        <option value="NEET">NEET</option>
                        <option value="MHT-CET">MHT-CET</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-[#0B0F2E]">Rank / Percentile</label>
                      <input
                        type="text"
                        value={rankInput}
                        onChange={(e) => setRankInput(e.target.value)}
                        placeholder="e.g., 3200 or 98.5 percentile"
                        className="mt-2 w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-700 focus:border-[#FF6B2B] focus:outline-none focus:ring-2 focus:ring-[#FF6B2B]/20"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-[#0B0F2E]">Preferred State / Location</label>
                      <input
                        type="text"
                        value={preferredState}
                        onChange={(e) => setPreferredState(e.target.value)}
                        placeholder="e.g., Maharashtra, Delhi, Bangalore"
                        className="mt-2 w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-700 focus:border-[#FF6B2B] focus:outline-none focus:ring-2 focus:ring-[#FF6B2B]/20"
                      />
                    </div>
                  </div>
                )}

                {activeStep === 3 && (
                  <div>
                    <label className="block text-sm font-semibold text-[#0B0F2E]">Interested Domain / Branch</label>
                    <select
                      value={interestedBranch}
                      onChange={(e) => setInterestedBranch(e.target.value)}
                      className="mt-2 w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-700 focus:border-[#FF6B2B] focus:outline-none focus:ring-2 focus:ring-[#FF6B2B]/20"
                    >
                      <option value="">Select an option</option>
                      <option value="CSE / AI & Data Science">CSE / AI & Data Science</option>
                      <option value="ECE / Electronics">ECE / Electronics</option>
                      <option value="Mechanical / Civil">Mechanical / Civil</option>
                      <option value="Medical / Healthcare">Medical / Healthcare</option>
                      <option value="Commerce / Finance">Commerce / Finance</option>
                    </select>
                  </div>
                )}

                {activeStep === 4 && (
                  <div>
                    <label className="block text-sm font-semibold text-[#0B0F2E]">What are you confused about?</label>
                    <select
                      value={confusion}
                      onChange={(e) => setConfusion(e.target.value)}
                      className="mt-2 w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-700 focus:border-[#FF6B2B] focus:outline-none focus:ring-2 focus:ring-[#FF6B2B]/20"
                    >
                      <option value="">Select your confusion</option>
                      <option value="College vs Branch">College vs Branch</option>
                      <option value="Branch vs Career">Branch vs Career</option>
                      <option value="Entrance exam choice">Entrance exam choice</option>
                      <option value="Location vs Profile">Location vs Profile</option>
                      <option value="Future career fit">Future career fit</option>
                    </select>
                  </div>
                )}

                {activeStep === 5 && (
                  <div>
                    <label className="block text-sm font-semibold text-[#0B0F2E]">Career Priority</label>
                    <select
                      value={careerPriority}
                      onChange={(e) => setCareerPriority(e.target.value)}
                      className="mt-2 w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-700 focus:border-[#FF6B2B] focus:outline-none focus:ring-2 focus:ring-[#FF6B2B]/20"
                    >
                      <option value="">Select</option>
                      <option value="Best college">Best college</option>
                      <option value="Best branch">Best branch</option>
                      <option value="High placement">High placement</option>
                      <option value="Interest and growth">Interest and growth</option>
                    </select>
                  </div>
                )}

                <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-between">
                  <button
                    type="button"
                    onClick={handleBack}
                    disabled={activeStep === 1}
                    className="inline-flex min-w-[120px] items-center justify-center rounded-xl border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    Back
                  </button>
                  {activeStep < steps.length ? (
                    <button
                      type="button"
                      onClick={handleNext}
                      className="inline-flex min-w-[180px] items-center justify-center rounded-xl bg-gradient-to-r from-[#FF6B2B] to-[#ff8a57] px-5 py-3 text-sm font-bold text-white shadow-lg shadow-[#FF6B2B]/30 transition hover:shadow-xl hover:shadow-[#FF6B2B]/40"
                    >
                      Next
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={handleGetDirection}
                      className="inline-flex min-w-[180px] items-center justify-center rounded-xl bg-gradient-to-r from-[#FF6B2B] to-[#ff8a57] px-5 py-3 text-sm font-bold text-white shadow-lg shadow-[#FF6B2B]/30 transition hover:shadow-xl hover:shadow-[#FF6B2B]/40"
                    >
                      Get My Recommendation
                    </button>
                  )}
                </div>
              </div>
            </div>

            <AnimatePresence>
              {result && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                  className="mt-8 rounded-xl border border-[#FF6B2B]/20 bg-[#FF6B2B]/5 p-6"
                >
                  <h3 className="text-lg font-bold text-[#0B0F2E]">Here&apos;s your direction:</h3>
                  <p className="mt-3 text-base leading-7 text-slate-700">{result}</p>
                  <div className="mt-6 grid gap-3 sm:grid-cols-2">
                    <a
                      href="https://chat.whatsapp.com/F3qcw7JZRIK5vbPgvUfaOA?mode=gi_t"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center rounded-full bg-white px-4 py-3 text-sm font-semibold text-[#0B0F2E] border border-[#FF6B2B] shadow-sm transition hover:bg-[#FF6B2B] hover:text-white hover:shadow-[0_0_24px_rgba(255,107,43,0.2)]"
                    >
                      Talk with us on WhatsApp
                    </a>
                    <button
                      type="button"
                      onClick={() => {
                        const pricing = document.getElementById('pricing');
                        if (pricing) {
                          pricing.scrollIntoView({ behavior: 'smooth', block: 'start' });
                        } else {
                          window.location.hash = '#pricing';
                        }
                      }}
                      className="inline-flex items-center justify-center rounded-full bg-white px-4 py-3 text-sm font-semibold text-[#0B0F2E] border border-[#FF6B2B] shadow-sm transition hover:bg-[#FF6B2B] hover:text-white hover:shadow-[0_0_24px_rgba(255,107,43,0.2)]"
                    >
                      Choose a mentor
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
}
