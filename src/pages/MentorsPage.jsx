import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Filter, Search, MapPin, BookOpen, Medal, Star,
  CheckCircle2, ChevronRight, Users, ExternalLink
} from 'lucide-react';
import { useLocation } from 'react-router-dom';
import { PaymentModal } from '../components/PricingCard';
import { getMentors } from '../utils/api';
import { ALL_INDIAN_STATES,COLLEGES_BY_TYPE } from '../data/siteContent';
// ─── Constants & Dictionaries ──────────────────────────────────────────────


// ─── Bundle definitions ────────────────────────────────────────────────────
const BUNDLES = [
  {
    id: 'quick-clarity',
    name: 'Quick Clarity',
    sub: '20–30 min focused session',
    price: '₹399',
    originalPrice: '₹799',
    discount: '50% OFF',
    color: '#1D9E75',
    bg: '#E1F5EE',
    wa: 'Hi+Atyant%2C+I+am+interested+in+Quick+Clarity.%0A%0AMy+exam%3A%0AMy+rank%2Fpercentile%3A%0AMy+main+confusion%3A%0A',
  },
  {
    id: 'complete-guidance',
    name: 'Complete Guidance',
    sub: '2 in-depth guidance sessions',
    price: '₹999',
    originalPrice: '₹2,499',
    discount: '60% OFF',
    popular: true,
    color: '#FF6B2B',
    bg: '#FFF3EE',
    wa: 'Hi+Atyant%2C+I+am+interested+in+Complete+Guidance.%0A%0AMy+exam%3A%0AMy+rank%2Fpercentile%3A%0AMy+preferred+branch%3A%0AMy+main+confusion%3A%0A',
  },
  {
    id: 'dream-seat',
    name: 'Dream Seat Protection™',
    sub: 'Round-wise JoSAA + CSAB support',
    price: '₹1,799',
    originalPrice: '₹5,999',
    discount: '70% OFF', 
    color: '#534AB7',
    bg: '#EEEDFE',
    wa: 'Hi+Atyant%2C+I+am+interested+in+Dream+Seat+Protection.%0A%0AMy+exam%3A%0AMy+rank%2Fpercentile%3A%0AMy+main+confusion%3A%0A',
  },
];

const BUNDLE_MAP = Object.fromEntries(BUNDLES.map(b => [b.id, b]));

import API_BASE, { getMentors } from '../utils/api';

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
  return name ? name.split(' ').map(w => w[0]).join('') : 'M';
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
      <div className="flex flex-col items-end gap-0.5">
        {b.originalPrice && <span className="text-[9px] text-slate-400 line-through leading-none">{b.originalPrice}</span>}
        <div className="flex items-center gap-1">
          <span className="text-xs font-bold text-slate-800">{b.price}</span>
          {b.discount && (
            <span className="text-[8px] font-bold px-1 py-0.5 rounded" style={{ backgroundColor: b.color + '22', color: b.color }}>
              {b.discount}
            </span>
          )}
        </div>
      </div>
    </button>
  );
}

// ─── Mentor card ──────────────────────────────────────────────────────────
function MentorCard({ mentor, index, defaultBundle }) {
  const color = AVATAR_COLORS[index % AVATAR_COLORS.length];
  const mentorBundles = Array.isArray(mentor.bundles) ? mentor.bundles.map(b => {
    const found = BUNDLES.find(bx => bx.name === b || bx.id === b);
    return found ? found.id : null;
  }).filter(Boolean) : [];
  
  const initialBundle = (defaultBundle && mentorBundles.includes(defaultBundle)) 
    ? defaultBundle 
    : (mentorBundles.includes('complete-guidance') ? 'complete-guidance' : mentorBundles[0]);
    
  const [selectedBundle, setSelectedBundle] = useState(initialBundle);
  const [showPayment, setShowPayment] = useState(false);

  useEffect(() => {
    if (defaultBundle && mentorBundles.includes(defaultBundle)) {
      setSelectedBundle(defaultBundle);
    }
  }, [defaultBundle, mentorBundles]);
  
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
      <div className="flex items-center gap-3 mb-4">
        {mentor.profilePhotoFilename ? (
          <img 
            src={`${API_BASE}/api/upload/profile-photo/${mentor.profilePhotoFilename}`} 
            alt={mentor.name} 
            className="w-14 h-14 rounded-full object-cover border-2 border-slate-100 flex-shrink-0 shadow-sm"
          />
        ) : (
          <div
            className="w-14 h-14 rounded-full flex items-center justify-center text-base font-extrabold flex-shrink-0"
            style={{ backgroundColor: color.bg, color: color.text }}
          >
            {getInitials(mentor.name)}
          </div>
        )}
        <div className="flex-1 min-w-0">
          <h4 className="text-sm font-black text-slate-900 truncate">{mentor.name}</h4>
          <p className="text-xs font-semibold text-blue-600 truncate">{mentor.college}</p>
        </div>
        <div className="flex items-center gap-1 text-[10px] font-semibold text-emerald-700 bg-emerald-50 rounded-full px-2 py-1 flex-shrink-0">
          <CheckCircle2 className="w-3 h-3" /> Verified
        </div>
      </div>

      <div className="space-y-1.5 pb-4 border-b border-slate-100 mb-4">
        <div className="flex items-center gap-2 text-[11px] text-slate-500">
          <MapPin className="w-3.5 h-3.5 flex-shrink-0" />
          {mentor.state || 'N/A'} {mentor.year ? `· ${mentor.year}` : ''}
        </div>
        <div className="flex items-center gap-2 text-[11px] text-slate-500">
          <BookOpen className="w-3.5 h-3.5 flex-shrink-0" />
          {mentor.branch || 'B.Tech'}
        </div>
        <div className="flex items-center gap-2 text-[11px] text-slate-500">
          <Star className="w-3.5 h-3.5 flex-shrink-0 fill-amber-400 text-amber-400" />
          {mentor.rating || 5.0} · {mentor.sessions || 0} sessions done
        </div>
      </div>

      {mentor.bio && (
        <div className="mb-4 pb-4 border-b border-slate-100">
          <p className="text-[11px] text-slate-600 italic leading-relaxed bg-blue-50/50 p-3 rounded-xl border border-blue-100/50 relative">
            <span className="absolute -top-2 left-2 text-xl text-blue-200">"</span>
            {mentor.bio}
          </p>
        </div>
      )}

      <div className="flex-1">
        <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-2">Available bundles</p>
        <div className="space-y-1.5">
          {mentorBundles.map(bid => (
            <BundleRow key={bid} bundleId={bid} isSelected={selectedBundle === bid} onSelect={() => setSelectedBundle(bid)} />
          ))}
          {mentorBundles.length === 0 && <p className="text-xs text-slate-400 italic">No bundles offered yet.</p>}
        </div>
      </div>

      <button onClick={() => setShowPayment(true)} className="mt-4 w-full py-2.5 rounded-xl bg-slate-900 text-white text-sm font-bold hover:bg-blue-600 hover:shadow-lg hover:shadow-blue-500/20 transition-all duration-200">
        Book {bundle?.name} →
      </button>

      {bundle && (
        <PaymentModal
          open={showPayment}
          onClose={() => setShowPayment(false)}
          planTitle={bundle.name}
          planPrice={bundle.price.replace(/[^\d]/g, '')}
          mentorId={mentor.id || mentor._id}
          onSuccessRedirectUrl={waUrl}
        />
      )}
    </motion.div>
  );
}

// ─── Main page ─────────────────────────────────────────────────────────────
export default function MentorsPage() {
  const location = useLocation();
  const bundleParam = new URLSearchParams(location.search).get('bundle');
  
  const [mentors, setMentors] = useState([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    getMentors()
      .then(res => setMentors(res.mentors || []))
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  const [search, setSearch] = useState('');
  const [filterCollegeType, setFilterCollegeType] = useState('');
  const [filterCollegeName, setFilterCollegeName] = useState('');
  const [filterState, setFilterState] = useState('');
  const [filterBranch, setFilterBranch] = useState('');
  const [sortBy, setSortBy] = useState('default');

  // Clear sub-dropdown selection if parent Category type structure is reset
  const handleCollegeTypeChange = (e) => {
    setFilterCollegeType(e.target.value);
    setFilterCollegeName(''); 
  };

  // Memoized college list generation matching selected parent component category
  const activeCollegeList = useMemo(() => {
    if (!filterCollegeType) return [];
    return COLLEGES_BY_TYPE[filterCollegeType] || [];
  }, [filterCollegeType]);

  const filtered = useMemo(() => {
    let list = mentors.filter(m => {
      const matchSearch = !search || m.name.toLowerCase().includes(search.toLowerCase());
      
      // Strict matching for college type
      let matchType = true;
      if (filterCollegeType) {
        if (filterCollegeType === 'STATE GOV.') {
          matchType = m.college.toLowerCase().includes('state') || ['dtu', 'nsut', 'vjti', 'coep', 'jadavpur'].some(x => m.college.toLowerCase().includes(x));
        } else if (filterCollegeType === 'PRIVATE') {
          matchType = ['bits', 'vit', 'manipal', 'thapar', 'srm', 'rvce'].some(x => m.college.toLowerCase().includes(x));
        } else {
          matchType = m.college.toUpperCase().includes(filterCollegeType);
        }
      }

      const matchCollegeName = !filterCollegeName || m.college.toLowerCase().includes(filterCollegeName.toLowerCase());
      const matchState = !filterState || m.state === filterState;
      const matchBranch = !filterBranch || m.branch === filterBranch;

      return matchSearch && matchType && matchCollegeName && matchState && matchBranch;
    });

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
  }, [mentors, search, filterCollegeType, filterCollegeName, filterState, filterBranch, sortBy]);

  const hasFilter = search || filterCollegeType || filterCollegeName || filterState || filterBranch;

  function clearFilters() {
    setSearch(''); setFilterCollegeType(''); setFilterCollegeName(''); setFilterState(''); setFilterBranch('');
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      {/* Hero Banner Grid Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#F3F8FF] to-[#F8FAFC] border-b border-slate-200 px-4 py-14 sm:px-6 lg:px-8">
        <div className="relative z-10 mx-auto max-w-7xl text-center">
          <motion.h1 initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="text-4xl font-black tracking-tight text-slate-900 sm:text-5xl lg:text-6xl">
            Find Your <span className="bg-gradient-to-r from-[#FF6B2B] to-[#ff955f] bg-clip-text text-transparent drop-shadow-sm">Mentor</span>
          </motion.h1>
          <p className="mt-4 text-base font-medium text-slate-500 max-w-xl mx-auto">
            Talk to current students from the exact colleges you're targeting. Real seats, real ranks, real counselling.
          </p>
        </div>
      </section>

      {/* Main Layout Workspace Content */}
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* Sidebar Filtration UI Component block */}
          <motion.aside initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }} className="w-full lg:w-72 shrink-0">
            <div className="rounded-2xl bg-white border border-slate-200 p-5 sticky top-24 space-y-4">
              <div className="flex items-center gap-2 font-black text-slate-800">
                <Filter className="w-4 h-4 text-blue-500" /> Filters
              </div>

              {/* Text Query Input Selector */}
              <div className="relative">
                <Search className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
                <input
                  type="text" placeholder="Search by name..." value={search} onChange={e => setSearch(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2.5 pl-9 pr-3 text-sm text-slate-700 outline-none focus:border-blue-500 focus:bg-white transition"
                />
              </div>

              {/* 1. College Category Select Menu Group Element */}
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1.5">College Type</label>
                <select
                  value={filterCollegeType} onChange={handleCollegeTypeChange}
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2.5 px-3 text-sm text-slate-700 outline-none focus:border-blue-500 focus:bg-white transition"
                >
                  <option value="">All Categories</option>
                  <option value="IIT">IIT</option>
                  <option value="NIT">NIT</option>
                  <option value="IIIT">IIIT</option>
                  <option value="STATE GOV.">STATE GOV.</option>
                  <option value="PRIVATE">PRIVATE</option>
                  <option value="OTHERS">OTHERS</option>
                </select>
              </div>

              {/* 2. Dependent Cascading Specific College Dialog Picker Option */}
              {filterCollegeType && (
                <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }}>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1.5">Select College</label>
                  <select
                    value={filterCollegeName} onChange={e => setFilterCollegeName(e.target.value)}
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2.5 px-3 text-sm text-slate-700 outline-none focus:border-blue-500 focus:bg-white transition"
                  >
                    <option value="">All {filterCollegeType} Colleges</option>
                    {activeCollegeList.map(name => (
                      <option key={name} value={name}>{name}</option>
                    ))}
                  </select>
                </motion.div>
              )}

              {/* 3. Global Indian States Selector Block Group */}
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1.5">State Location</label>
                <select
                  value={filterState} onChange={e => setFilterState(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2.5 px-3 text-sm text-slate-700 outline-none focus:border-blue-500 focus:bg-white transition"
                >
                  <option value="">All States</option>
                  {ALL_INDIAN_STATES.map(st => (
                    <option key={st} value={st}>{st}</option>
                  ))}
                </select>
              </div>

              {/* 4. Branch Domain Selection Array Input Map */}
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1.5">Branch Domain</label>
                <select
                  value={filterBranch} onChange={e => setFilterBranch(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2.5 px-3 text-sm text-slate-700 outline-none focus:border-blue-500 focus:bg-white transition"
                >
                  <option value="">All Branches</option>
                  {['Computer Science', 'Electronics', 'Mechanical', 'Electrical', 'IT', 'Aerospace', 'Civil', 'Software'].map(b => (
                    <option key={b} value={b}>{b}</option>
                  ))}
                </select>
              </div>

              {hasFilter && (
                <button onClick={clearFilters} className="mt-2 w-full py-2 rounded-xl text-xs font-bold text-red-500 bg-red-50 hover:bg-red-100 transition">
                  Clear all filters
                </button>
              )}
            </div>
          </motion.aside>

          {/* Grid Render Window Panel Wrapper Context */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between mb-5">
              <p className="text-sm text-slate-500">
                {loading ? 'Loading mentors...' : (
                  <>Showing <span className="font-bold text-slate-800">{filtered.length}</span> of {mentors.length} mentors</>
                )}
              </p>
              <select
                value={sortBy} onChange={e => setSortBy(e.target.value)}
                className="rounded-xl border border-slate-200 bg-white py-2 px-3 text-xs text-slate-600 outline-none focus:border-blue-400 transition"
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
                  <MentorCard key={mentor._id || mentor.id || i} mentor={mentor} index={i} defaultBundle={bundleParam} />
                ))}
              </AnimatePresence>

              {filtered.length === 0 && !loading && (
                <div className="col-span-full py-24 text-center">
                  <h3 className="text-lg font-bold text-slate-800">No mentors found matching criteria</h3>
                  <p className="mt-1 text-sm text-slate-500">Try loosening your category parameters.</p>
                </div>
              )}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}