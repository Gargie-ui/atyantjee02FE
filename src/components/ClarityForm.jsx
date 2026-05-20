import React, { useState } from 'react';
import { motion } from 'framer-motion';

const mainConfusionOptions = [
  'College vs branch',
  'Fees vs placement',
  'Private vs government',
  'CSE vs ECE',
  'Near home vs better college',
  'Parents are confused',
  'Final choice filling'
];

const priorityOptions = [
  'Placements',
  'Fees',
  'Branch interest',
  'College brand',
  'Location',
  'Senior guidance'
];

export default function ClarityForm({ onComplete }) {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    whatsapp: '',
    email: '',
    exam: '',
    rank: '',
    category: '',
    state: '',
    preferredBranch: '',
    preferredDomain: '',
    budget: '',
    preferredLocation: '',
    mainConfusion: '',
    priority: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleNext = () => setStep(step + 1);
  const handleBack = () => setStep(step - 1);

  const handleSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem('studentClarityData', JSON.stringify(formData));
    if (onComplete) onComplete(formData);
  };

  return (
    <div className="bg-white rounded-2xl shadow-[0_20px_60px_rgba(15,23,42,0.06)] border border-slate-200 p-6 sm:p-8 max-w-2xl mx-auto">
      <div className="mb-8">
        <h3 className="text-2xl font-bold text-[#0B0F2E]">Student Clarity Form</h3>
        <p className="text-slate-600 mt-2 text-sm">Tell us about your situation so we can give you the best path forward.</p>
        <div className="flex gap-2 mt-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className={`h-2 flex-1 rounded-full ${step >= i ? 'bg-[#FF6B2B]' : 'bg-slate-200'}`} />
          ))}
        </div>
      </div>

      <form onSubmit={step === 3 ? handleSubmit : (e) => { e.preventDefault(); handleNext(); }}>
        {step === 1 && (
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1">Student Name</label>
                <input required type="text" name="name" value={formData.name} onChange={handleChange} className="w-full rounded-lg border border-slate-300 p-3 outline-none focus:border-[#FF6B2B] focus:ring-1 focus:ring-[#FF6B2B]" placeholder="John Doe" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1">WhatsApp Number</label>
                <input required type="tel" name="whatsapp" value={formData.whatsapp} onChange={handleChange} className="w-full rounded-lg border border-slate-300 p-3 outline-none focus:border-[#FF6B2B] focus:ring-1 focus:ring-[#FF6B2B]" placeholder="9876543210" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1">Email</label>
              <input required type="email" name="email" value={formData.email} onChange={handleChange} className="w-full rounded-lg border border-slate-300 p-3 outline-none focus:border-[#FF6B2B] focus:ring-1 focus:ring-[#FF6B2B]" placeholder="you@example.com" />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1">Exam Type</label>
                <input required type="text" name="exam" value={formData.exam} onChange={handleChange} className="w-full rounded-lg border border-slate-300 p-3 outline-none focus:border-[#FF6B2B] focus:ring-1 focus:ring-[#FF6B2B]" placeholder="JEE Main, MHT-CET, etc." />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1">Rank or Percentile</label>
                <input required type="text" name="rank" value={formData.rank} onChange={handleChange} className="w-full rounded-lg border border-slate-300 p-3 outline-none focus:border-[#FF6B2B] focus:ring-1 focus:ring-[#FF6B2B]" placeholder="e.g. 1.2 Lakh or 92%" />
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1">Category</label>
                <select name="category" value={formData.category} onChange={handleChange} className="w-full rounded-lg border border-slate-300 p-3 outline-none focus:border-[#FF6B2B] focus:ring-1 focus:ring-[#FF6B2B]">
                  <option value="">Select</option>
                  <option value="General">General</option>
                  <option value="OBC">OBC</option>
                  <option value="SC/ST">SC/ST</option>
                  <option value="EWS">EWS</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1">Home State</label>
                <input type="text" name="state" value={formData.state} onChange={handleChange} className="w-full rounded-lg border border-slate-300 p-3 outline-none focus:border-[#FF6B2B] focus:ring-1 focus:ring-[#FF6B2B]" placeholder="e.g. Maharashtra" />
              </div>
            </div>
          </motion.div>
        )}

        {step === 2 && (
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1">Preferred Branch</label>
                <input required type="text" name="preferredBranch" value={formData.preferredBranch} onChange={handleChange} className="w-full rounded-lg border border-slate-300 p-3 outline-none focus:border-[#FF6B2B] focus:ring-1 focus:ring-[#FF6B2B]" placeholder="CSE, ECE, Mech..." />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1">Preferred Domain (Optional)</label>
                <input type="text" name="preferredDomain" value={formData.preferredDomain} onChange={handleChange} className="w-full rounded-lg border border-slate-300 p-3 outline-none focus:border-[#FF6B2B] focus:ring-1 focus:ring-[#FF6B2B]" placeholder="AI, Data Science..." />
              </div>
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1">Budget Range (4 Years)</label>
              <select required name="budget" value={formData.budget} onChange={handleChange} className="w-full rounded-lg border border-slate-300 p-3 outline-none focus:border-[#FF6B2B] focus:ring-1 focus:ring-[#FF6B2B]">
                <option value="">Select</option>
                <option value="Under 5 Lakhs">Under 5 Lakhs</option>
                <option value="5 - 10 Lakhs">5 - 10 Lakhs</option>
                <option value="10 - 15 Lakhs">10 - 15 Lakhs</option>
                <option value="Above 15 Lakhs">Above 15 Lakhs</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1">Preferred Location</label>
              <input type="text" name="preferredLocation" value={formData.preferredLocation} onChange={handleChange} className="w-full rounded-lg border border-slate-300 p-3 outline-none focus:border-[#FF6B2B] focus:ring-1 focus:ring-[#FF6B2B]" placeholder="e.g. Pune, Mumbai, Bangalore" />
            </div>
          </motion.div>
        )}

        {step === 3 && (
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1">What is your main confusion?</label>
              <select required name="mainConfusion" value={formData.mainConfusion} onChange={handleChange} className="w-full rounded-lg border border-slate-300 p-3 outline-none focus:border-[#FF6B2B] focus:ring-1 focus:ring-[#FF6B2B]">
                <option value="">Select</option>
                {mainConfusionOptions.map((opt) => (
                  <option key={opt} value={opt}>{opt}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1">What is your top priority?</label>
              <select required name="priority" value={formData.priority} onChange={handleChange} className="w-full rounded-lg border border-slate-300 p-3 outline-none focus:border-[#FF6B2B] focus:ring-1 focus:ring-[#FF6B2B]">
                <option value="">Select</option>
                {priorityOptions.map((opt) => (
                  <option key={opt} value={opt}>{opt}</option>
                ))}
              </select>
            </div>
          </motion.div>
        )}

        <div className="mt-8 flex items-center justify-between">
          {step > 1 ? (
            <button type="button" onClick={handleBack} className="text-sm font-semibold text-slate-600 hover:text-[#0B0F2E]">
              Back
            </button>
          ) : <div></div>}
          <button type="submit" className="rounded-full bg-[#FF6B2B] px-8 py-3 text-sm font-semibold text-white shadow-lg transition hover:bg-[#ff7a42] hover:scale-105">
            {step === 3 ? 'Show My Results' : 'Next Step'}
          </button>
        </div>
      </form>
    </div>
  );
}
