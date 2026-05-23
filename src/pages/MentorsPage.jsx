import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Filter, Search, MapPin, BookOpen, Medal, Star,
  CheckCircle2, ChevronRight, Users, ExternalLink
} from 'lucide-react';
import { PaymentModal } from '../components/PricingCard';

// ─── Bundle definitions ────────────────────────────────────────────────────
const BUNDLES = [
  {
    id: 'insider',
    name: 'Insider Connect',
    sub: 'Up to 1hr voice call',
    price: '₹299',
    color: '#1D9E75',
    bg: '#E1F5EE',
    wa: 'Hi+Atyant%2C+I+am+interested+in+Insider+Connect.%0A%0AMy+exam%3A%0AMy+rank%2Fpercentile%3A%0AMy+main+confusion%3A%0A',
  },
  {
    id: 'backup',
    name: 'Backup Plan',
    sub: 'CSAB + private college',
    price: '₹499',
    color: '#BA7517',
    bg: '#FAEEDA',
    wa: 'Hi+Atyant%2C+I+am+interested+in+Backup+Plan.%0A%0AMy+exam%3A%0AMy+rank%2Fpercentile%3A%0AMy+main+confusion%3A%0A',
  },
  {
    id: 'college',
    name: 'Better College',
    sub: '1 session · college focus',
    price: '₹749',
    color: '#378ADD',
    bg: '#E6F1FB',
    wa: 'Hi+Atyant%2C+I+am+interested+in+Better+College.%0A%0AMy+exam%3A%0AMy+rank%2Fpercentile%3A%0AMy+preferred+branch%3A%0AMy+main+confusion%3A%0A',
  },
  {
    id: 'branch',
    name: 'Better Branch',
    sub: '1 session · branch focus',
    price: '₹749',
    color: '#378ADD',
    bg: '#E6F1FB',
    wa: 'Hi+Atyant%2C+I+am+interested+in+Better+Branch.%0A%0AMy+exam%3A%0AMy+rank%2Fpercentile%3A%0AMy+preferred+branch%3A%0AMy+main+confusion%3A%0A',
  },
  {
    id: 'complete',
    name: 'Complete Guidance',
    sub: '2 sessions · college + branch',
    price: '₹1,099',
    popular: true,
    color: '#185FA5',
    bg: '#E6F1FB',
    wa: 'Hi+Atyant%2C+I+am+interested+in+Complete+Guidance.%0A%0AMy+exam%3A%0AMy+rank%2Fpercentile%3A%0AMy+preferred+branch%3A%0AMy+main+confusion%3A%0A',
  },
  {
    id: 'seat',
    name: 'Secured Seat',
    sub: 'JoSAA/CSAB choice filling',
    price: '₹1,299',
    color: '#534AB7',
    bg: '#EEEDFE',
    wa: 'Hi+Atyant%2C+I+am+interested+in+Secured+Seat.%0A%0AMy+exam%3A%0AMy+rank%2Fpercentile%3A%0AMy+main+confusion%3A%0A',
  },
];

const BUNDLE_MAP = Object.fromEntries(BUNDLES.map(b => [b.id, b]));

import { getMentors } from '../utils/api';

// ─── Mentor data ───────────────────────────────────────────────────────────
// We will fetch these from the backend instead of hardcoding.


const AVATAR_COLORS = [
  { bg: '#E6F1FB', text: '#0C447C' },
  { bg: '#E1F5EE', text: '#085041' },
  { bg: '#FAEEDA', text: '#633806' },
  { bg: '#EEEDFE', text: '#3C3489' },
  { bg: '#FBEAF0', text: '#72243E' },
  { bg: '#EAF3DE', text: '#27500A' },
];

function getInitials(name) {
  return name.split(' ').map(w => w[0]).join('');
}

// ─── Bundle row inside mentor card ────────────────────────────────────────
function BundleRow({ bundleId, isSelected, onSelect }) {
  const b = BUNDLE_MAP[bundleId];
  if (!b) return null;
  return (
    <button
      onClick={onSelect}
      className="flex w-full items-center justify-between rounded-xl px-3 py-2 border transition-all group/bundle text-left"
      style={{
        borderColor: isSelected ? b.color : '#e2e8f0',
        backgroundColor: isSelected ? b.bg : 'transparent',
      }}
      onMouseEnter={e => {
        if (!isSelected) {
          e.currentTarget.style.backgroundColor = '#f8fafc';
        }
      }}
      onMouseLeave={e => {
        if (!isSelected) {
          e.currentTarget.style.backgroundColor = 'transparent';
        }
      }}
    >
      <div className="flex items-center gap-2">
        <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: b.color }} />
        <div>
          <div className="flex items-center gap-1.5">
            <span className="text-xs font-semibold text-slate-800">{b.name}</span>
            {b.popular && (
              <span className="text-[9px] font-bold px-1.5 py-0.5 rounded-full text-white" style={{ backgroundColor: b.color }}>
                Popular
              </span>
            )}
          </div>
          <p className="text-[10px] text-slate-500 leading-tight">{b.sub}</p>
        </div>
      </div>
      <div className="flex items-center gap-1">
        <span className="text-xs font-bold text-slate-800">{b.price}</span>
      </div>
    </button>
  );
}

// ─── Mentor card ──────────────────────────────────────────────────────────
function MentorCard({ mentor, index }) {
  const color = AVATAR_COLORS[index % AVATAR_COLORS.length];
  // Convert DB bundles into bundle IDs (if DB stores names, map them back)
  const mentorBundles = Array.isArray(mentor.bundles) ? mentor.bundles.map(b => {
    const found = BUNDLES.find(bx => bx.name === b || bx.id === b);
    return found ? found.id : null;
  }).filter(Boolean) : [];
  
  const initialBundle = mentorBundles.includes('complete') ? 'complete' : mentorBundles[0];
  const [selectedBundle, setSelectedBundle] = useState(initialBundle);
  const [showPayment, setShowPayment] = useState(false);
  
  const bundle = BUNDLE_MAP[selectedBundle];
  const waUrl = `https://wa.me/919579040183?text=${bundle?.wa ?? ''}`;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 8 }}
      transition={{ duration: 0.18, delay: index * 0.04 }}
      className="bg-white border border-slate-200 rounded-[1.5rem] p-5 flex flex-col hover:border-slate-300 hover:shadow-md transition-all duration-200"
    >
      {/* Top: avatar + name */}
      <div className="flex items-center gap-3 mb-4">
        <div
          className="w-11 h-11 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0"
          style={{ backgroundColor: color.bg, color: color.text }}
        >
          {getInitials(mentor.name)}
        </div>
        <div className="flex-1 min-w-0">
          <h4 className="text-sm font-black text-slate-900 truncate">{mentor.name}</h4>
          <p className="text-xs font-semibold text-blue-600 truncate">{mentor.college}</p>
        </div>
        <div className="flex items-center gap-1 text-[10px] font-semibold text-emerald-700 bg-emerald-50 rounded-full px-2 py-1 flex-shrink-0">
          <CheckCircle2 className="w-3 h-3" />
          Verified
        </div>
      </div>

      {/* Meta */}
      <div className="space-y-1.5 pb-4 border-b border-slate-100 mb-4">
        <div className="flex items-center gap-2 text-[11px] text-slate-500">
          <MapPin className="w-3.5 h-3.5 flex-shrink-0" />
          {mentor.state || 'N/A'} {mentor.year ? `· ${mentor.year}` : ''}
        </div>
        <div className="flex items-center gap-2 text-[11px] text-slate-500">
          <BookOpen className="w-3.5 h-3.5 flex-shrink-0" />
          {mentor.branch || 'B.Tech'}
        </div>
        <div className="flex items-center gap-2 text-[11px] font-semibold text-amber-700">
          <Medal className="w-3.5 h-3.5 flex-shrink-0" />
          {mentor.rank ? `AIR ${mentor.rank}` : 'Rank N/A'}
        </div>
        <div className="flex items-center gap-2 text-[11px] text-slate-500">
          <Star className="w-3.5 h-3.5 flex-shrink-0 fill-amber-400 text-amber-400" />
          {mentor.rating || 5.0} · {mentor.sessions || 0} sessions done
        </div>
      </div>

      {/* Bio / Pitch */}
      {mentor.bio && (
        <div className="mb-4 pb-4 border-b border-slate-100">
          <p className="text-[11px] text-slate-600 italic leading-relaxed bg-blue-50/50 p-3 rounded-xl border border-blue-100/50 relative">
            <span className="absolute -top-2 left-2 text-xl text-blue-200">"</span>
            {mentor.bio}
          </p>
        </div>
      )}

      {/* Bundles */}
      <div className="flex-1">
        <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-2">
          Available bundles
        </p>
        <div className="space-y-1.5">
          {mentorBundles.map(bid => (
            <BundleRow 
              key={bid} 
              bundleId={bid} 
              isSelected={selectedBundle === bid}
              onSelect={() => setSelectedBundle(bid)}
            />
          ))}
          {mentorBundles.length === 0 && (
            <p className="text-xs text-slate-400 italic">No bundles offered yet.</p>
          )}
        </div>
      </div>

      {/* CTA */}
      <button 
        onClick={() => setShowPayment(true)}
        className="mt-4 w-full py-2.5 rounded-xl bg-slate-900 text-white text-sm font-bold hover:bg-blue-600 hover:shadow-lg hover:shadow-blue-500/20 transition-all duration-200"
      >
        Book {bundle?.name} →
      </button>

      {/* Payment Modal */}
      {bundle && (
        <PaymentModal
          open={showPayment}
          onClose={() => setShowPayment(false)}
          planTitle={bundle.name}
          planPrice={bundle.price.replace(/[^\d]/g, '')}
          onSuccessRedirectUrl={waUrl}
        />
      )}
    </motion.div>
  );
}

// ─── Main page ─────────────────────────────────────────────────────────────
export default function MentorsPage() {
  const [mentors, setMentors] = useState([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    getMentors()
      .then(res => setMentors(res.mentors || []))
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  const [search, setSearch] = useState('');
  const [filterCollege, setFilterCollege] = useState('');
  const [filterState, setFilterState] = useState('');
  const [filterBranch, setFilterBranch] = useState('');
  const [sortBy, setSortBy] = useState('default');

  const filtered = useMemo(() => {
    let list = mentors.filter(m =>
      (!search || m.name.toLowerCase().includes(search.toLowerCase())) &&
      (!filterCollege || m.college.includes(filterCollege)) &&
      (!filterState || m.state === filterState) &&
      (!filterBranch || m.branch === filterBranch)
    );
    if (sortBy === 'rating') list = [...list].sort((a, b) => (b.rating || 5) - (a.rating || 5));
    if (sortBy === 'sessions') list = [...list].sort((a, b) => (b.sessions || 0) - (a.sessions || 0));
    if (sortBy === 'priceLow') list = [...list].sort((a, b) => {
      const price = id => parseInt((BUNDLE_MAP[id]?.price ?? '₹0').replace(/[^\d]/g, ''));
      const aBundles = a.bundles ? a.bundles.map(bx => BUNDLES.find(x => x.name === bx || x.id === bx)?.id).filter(Boolean) : [];
      const bBundles = b.bundles ? b.bundles.map(bx => BUNDLES.find(x => x.name === bx || x.id === bx)?.id).filter(Boolean) : [];
      const aMin = aBundles.length ? Math.min(...aBundles.map(price)) : 0;
      const bMin = bBundles.length ? Math.min(...bBundles.map(price)) : 0;
      return aMin - bMin;
    });
    return list;
  }, [mentors, search, filterCollege, filterState, filterBranch, sortBy]);

  const hasFilter = search || filterCollege || filterState || filterBranch;

  function clearFilters() {
    setSearch(''); setFilterCollege(''); setFilterState(''); setFilterBranch('');
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC]">

      {/* ── Hero ── */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#F3F8FF] to-[#F8FAFC] border-b border-slate-200 px-4 py-14 sm:px-6 lg:px-8">
        {/* Background glow effects */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-[1200px] pointer-events-none">
          <div className="absolute -top-[10%] left-[5%] h-[400px] w-[400px] rounded-full bg-blue-400/20 blur-[100px]" />
          <div className="absolute top-[10%] right-[5%] h-[350px] w-[350px] rounded-full bg-orange-400/20 blur-[100px]" />
          <div className="absolute top-[30%] left-[35%] h-[300px] w-[300px] rounded-full bg-purple-400/15 blur-[90px]" />
        </div>
        <div className="absolute inset-0 opacity-[0.03]">
          <div className="h-full w-full bg-[radial-gradient(#0B0F2E_1.5px,transparent_1.5px)] [background-size:24px_24px]" />
        </div>

        <div className="relative z-10 mx-auto max-w-7xl text-center">
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl font-black tracking-tight text-slate-900 sm:text-5xl lg:text-6xl"
          >
            Find Your <span className="bg-gradient-to-r from-[#FF6B2B] to-[#ff955f] bg-clip-text text-transparent drop-shadow-sm">Mentor</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.08 }}
            className="mt-4 text-base font-medium text-slate-500 max-w-xl mx-auto"
          >
            Talk to current students from the exact colleges you're targeting.
            Real seats, real ranks, real counselling.
          </motion.p>

          {/* Trust bar */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.16 }}
            className="mt-8 flex flex-wrap justify-center gap-3"
          >
            {[
              ['500+', 'verified mentors'],
              ['40+', 'colleges covered'],
              ['2,000+', 'sessions done'],
              ['4.8★', 'avg rating'],
            ].map(([val, label]) => (
              <div key={label} className="flex items-center gap-2 bg-white/70 backdrop-blur-xl border border-white shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] rounded-full px-4 py-2 text-xs font-medium text-slate-600 transition-transform hover:scale-105">
                <span className="font-black text-[#0B0F2E]">{val}</span> {label}
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Main layout ── */}
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-8">

          {/* Sidebar */}
          <motion.aside
            initial={{ opacity: 0, x: -16 }}
            animate={{ opacity: 1, x: 0 }}
            className="w-full lg:w-72 shrink-0"
          >
            <div className="rounded-2xl bg-white border border-slate-200 p-5 sticky top-24">
              <div className="flex items-center gap-2 mb-5 font-black text-slate-800">
                <Filter className="w-4 h-4 text-blue-500" /> Filters
              </div>

              {/* Search */}
              <div className="relative mb-5">
                <Search className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search by name..."
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2.5 pl-9 pr-3 text-sm text-slate-700 outline-none focus:border-blue-500 focus:bg-white transition"
                />
              </div>

              <div className="space-y-4">
                {[
                  {
                    label: 'College type', value: filterCollege, set: setFilterCollege,
                    options: [
                      { value: '', label: 'All colleges' },
                      { value: 'IIT', label: 'IITs' },
                      { value: 'NIT', label: 'NITs' },
                      { value: 'BITS', label: 'BITS' },
                      { value: 'DTU', label: 'DTU' },
                      { value: 'VJTI', label: 'VJTI' },
                    ]
                  },
                  {
                    label: 'Branch', value: filterBranch, set: setFilterBranch,
                    options: [
                      { value: '', label: 'All branches' },
                      ...['Computer Science', 'Electronics', 'Mechanical', 'Electrical', 'IT', 'Aerospace', 'Civil', 'Software']
                        .map(b => ({ value: b, label: b }))
                    ]
                  },
                  {
                    label: 'State', value: filterState, set: setFilterState,
                    options: [
                      { value: '', label: 'All states' },
                      ...['Maharashtra', 'Delhi', 'Tamil Nadu', 'Karnataka', 'Rajasthan', 'Uttar Pradesh', 'Telangana']
                        .map(s => ({ value: s, label: s }))
                    ]
                  },
                ].map(({ label, value, set, options }) => (
                  <div key={label}>
                    <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                      {label}
                    </label>
                    <select
                      value={value}
                      onChange={e => set(e.target.value)}
                      className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2.5 px-3 text-sm text-slate-700 outline-none focus:border-blue-500 focus:bg-white transition appearance-none"
                    >
                      {options.map(o => (
                        <option key={o.value} value={o.value}>{o.label}</option>
                      ))}
                    </select>
                  </div>
                ))}
              </div>

              {hasFilter && (
                <button
                  onClick={clearFilters}
                  className="mt-5 w-full py-2 rounded-xl text-xs font-bold text-red-500 bg-red-50 hover:bg-red-100 transition"
                >
                  Clear all filters
                </button>
              )}

              {/* Bundle legend */}
              <div className="mt-6 pt-5 border-t border-slate-100">
                <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-3">Bundle guide</p>
                <div className="space-y-2">
                  {BUNDLES.map(b => (
                    <div key={b.id} className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: b.color }} />
                        <span className="text-[11px] text-slate-600">{b.name}</span>
                      </div>
                      <span className="text-[11px] font-semibold text-slate-800">{b.price}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.aside>

          {/* Grid */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between mb-5">
              <p className="text-sm text-slate-500">
                {loading ? 'Loading mentors...' : (
                  <>Showing <span className="font-bold text-slate-800">{filtered.length}</span> of {mentors.length} mentors</>
                )}
              </p>
              <select
                value={sortBy}
                onChange={e => setSortBy(e.target.value)}
                className="rounded-xl border border-slate-200 bg-white py-2 px-3 text-xs text-slate-600 outline-none focus:border-blue-400 transition appearance-none"
              >
                <option value="default">Sort: Recommended</option>
                <option value="priceLow">Price: low to high</option>
                <option value="rating">Highest rated</option>
                <option value="sessions">Most sessions</option>
              </select>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
              <AnimatePresence>
                {filtered.map((mentor, i) => (
                  <MentorCard key={mentor.id} mentor={mentor} index={i} />
                ))}
              </AnimatePresence>

              {filtered.length === 0 && !loading && (
                <div className="col-span-full py-24 text-center">
                  <div className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-slate-100 text-slate-400 mb-4">
                    <Search className="w-7 h-7" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-800">No mentors found</h3>
                  <p className="mt-1 text-sm text-slate-500">Try adjusting your filters.</p>
                  <a
                    href="https://wa.me/919579040183?text=Hi+Atyant%2C+I+could+not+find+a+mentor+for+my+target+college.+Can+you+help%3F"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block mt-4 text-sm font-semibold text-blue-600 underline underline-offset-2"
                  >
                    Request a mentor for your college →
                  </a>
                </div>
              )}
            </div>

            {/* Bottom CTA */}
            <div className="mt-10 rounded-2xl bg-white border border-slate-200 p-8 text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-slate-100 mb-4">
                <Users className="w-6 h-6 text-slate-600" />
              </div>
              <h3 className="text-lg font-black text-slate-900">Can't decide which bundle or mentor?</h3>
              <p className="mt-1 text-sm text-slate-500 max-w-sm mx-auto">
                Tell us your rank, target colleges, and main confusion.
                We'll suggest the right mentor + bundle in under 12 hours.
              </p>
              <a
                href="https://wa.me/919579040183?text=Hi+Atyant%2C+I+need+help+picking+the+right+mentor+and+bundle.%0A%0AMy+exam%3A%0AMy+rank%2Fpercentile%3A%0AMy+target+colleges%3A%0AMy+main+confusion%3A%0A"
                target="_blank"
                rel="noopener noreferrer"
              >
                <button className="mt-4 px-6 py-2.5 rounded-xl bg-slate-900 text-white text-sm font-bold hover:bg-blue-600 hover:shadow-lg hover:shadow-blue-500/20 transition-all duration-200">
                  Get matched →
                </button>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}