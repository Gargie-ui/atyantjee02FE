import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search, MapPin, BookOpen, Star,
  CheckCircle2
} from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';
import { PaymentModal } from '../components/PricingCard';
import API_BASE, { getMentors } from '../utils/api';
import { ALL_INDIAN_STATES, COLLEGES_BY_TYPE, DEPARTMENTS } from '../data/siteContent';

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
      type="button"
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

  const navigate = useNavigate();

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

  // Handle auto-resume checkout after redirect login success
  useEffect(() => {
    const pending = localStorage.getItem('atyant_pending_booking');
    if (pending) {
      try {
        const { mentorId, bundleId } = JSON.parse(pending);
        if (mentorId === (mentor.id || mentor._id)) {
          if (bundleId && mentorBundles.includes(bundleId)) {
            setSelectedBundle(bundleId);
          }
          setShowPayment(true);
          localStorage.removeItem('atyant_pending_booking');
        }
      } catch (e) {
        console.error(e);
      }
    }
  }, [mentor, mentorBundles]);

  const bundle = BUNDLE_MAP[selectedBundle];
  const waUrl = `https://wa.me/919579040183?text=${bundle?.wa ?? ''}`;

  const handleBookClick = () => {
    const token = localStorage.getItem('user_token');
    if (!token) {
      localStorage.setItem('atyant_pending_booking', JSON.stringify({
        mentorId: mentor.id || mentor._id,
        bundleId: selectedBundle
      }));
      navigate('/login', { state: { message: 'Please sign up or log in as a Student to buy a mentorship plan.' } });
      return;
    }
    setShowPayment(true);
  };

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

      <button onClick={handleBookClick} className="mt-4 w-full py-2.5 rounded-xl bg-slate-900 text-white text-sm font-bold hover:bg-blue-600 hover:shadow-lg hover:shadow-blue-500/20 transition-all duration-200">
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
  const navigate = useNavigate();
  const bundleParam = useMemo(() => new URLSearchParams(location.search).get('bundle'), [location.search]);

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
  const [filterRank, setFilterRank] = useState(1000000);
  const [sortBy, setSortBy] = useState('default');

  const handleCollegeTypeChange = (e) => {
    setFilterCollegeType(e.target.value);
    setFilterCollegeName('');
  };

  const activeCollegeList = useMemo(() => {
    if (!filterCollegeType) return [];
    return COLLEGES_BY_TYPE[filterCollegeType] || [];
  }, [filterCollegeType]);

  const filtered = useMemo(() => {
    let list = mentors.filter(m => {
      // Search by college name or mentor name
      const matchSearch = !search || 
        m.college.toLowerCase().includes(search.toLowerCase()) || 
        m.name.toLowerCase().includes(search.toLowerCase());

      let matchType = true;
      if (filterCollegeType) {
        const mentorCollegeLower = (m.college || '').toLowerCase();
        if (filterCollegeType === 'STATE GOV.') {
          matchType = mentorCollegeLower.includes('state') || ['dtu', 'nsut', 'vjti', 'coep', 'jadavpur', 'iet', 'hbtu', 'sgsits'].some(x => mentorCollegeLower.includes(x));
        } else if (filterCollegeType === 'PRIVATE') {
          matchType = ['bits', 'vit', 'manipal', 'thapar', 'srm', 'rvce', 'bmsce', 'msrit', 'lnmiit', 'nirma'].some(x => mentorCollegeLower.includes(x));
        } else {
          matchType = mentorCollegeLower.includes(filterCollegeType.toLowerCase()) && 
                     !(filterCollegeType.toLowerCase() === 'iit' && mentorCollegeLower.includes('iiit'));
        }
      }

      const matchCollegeName = !filterCollegeName || (m.college || '').toLowerCase().includes(filterCollegeName.toLowerCase());
      const matchState = !filterState || (m.state || '').toLowerCase() === filterState.toLowerCase();
      const matchBranch = !filterBranch || (m.branch || '').toLowerCase().includes(filterBranch.toLowerCase());
      const matchRank = !m.rank || m.rank <= filterRank;

      let matchBundleParam = true;
      if (bundleParam) {
        matchBundleParam = Array.isArray(m.bundles) && m.bundles.some(b => {
          if (bundleParam === 'quick-clarity') return b === 'Quick Clarity' || b === 'quick-clarity';
          if (bundleParam === 'complete-guidance') return b === 'Complete Guidance' || b === 'complete-guidance';
          if (bundleParam === 'dream-seat') return b === 'Dream Seat Protection™' || b === 'dream-seat';
          return false;
        });
      }

      return matchSearch && matchType && matchCollegeName && matchState && matchBranch && matchRank && matchBundleParam;
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
  }, [mentors, search, filterCollegeType, filterCollegeName, filterState, filterBranch, filterRank, sortBy, bundleParam]);

  const hasFilter = search || filterCollegeType || filterCollegeName || filterState || filterBranch || filterRank < 1000000 || bundleParam;

  function clearFilters() {
    setSearch('');
    setFilterCollegeType('');
    setFilterCollegeName('');
    setFilterState('');
    setFilterBranch('');
    setFilterRank(1000000);
    if (bundleParam) navigate(location.pathname, { replace: true });
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC]">

      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#F3F8FF] to-[#F8FAFC] border-b border-slate-200 px-4 py-14 sm:px-6 lg:px-8">
        <div className="relative z-10 mx-auto max-w-7xl text-center">
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl font-black tracking-tight text-slate-900 sm:text-5xl lg:text-6xl"
          >
            Find Your <span className="bg-gradient-to-r from-[#FF6B2B] to-[#ff955f] bg-clip-text text-transparent drop-shadow-sm">Mentor</span>
          </motion.h1>
          <p className="mt-4 text-base font-medium text-slate-500 max-w-xl mx-auto">
            Talk to current students from the exact colleges you're targeting. Real seats, real ranks, real counselling.
          </p>

          {/* Rank Slider */}
          <div className="mt-6 mx-auto max-w-sm">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-semibold text-slate-500">JEE Rank</span>
              <span className="text-sm font-bold text-blue-600 bg-blue-50 px-3 py-0.5 rounded-full">
                Up to {filterRank.toLocaleString('en-IN')}
              </span>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-xs text-slate-400">1</span>
              <input
                type="range"
                min="1"
                max="1000000"
                step="1000"
                value={filterRank}
                onChange={e => setFilterRank(Number(e.target.value))}
                className="flex-1 accent-blue-500 h-2 rounded-full"
              />
              <span className="text-xs text-slate-400">10L</span>
            </div>
          </div>

        </div>
      </section>

      {/* ── Horizontal Filter Ribbon ── */}
      <div className="sticky top-0 z-20 bg-white border-b border-slate-200 shadow-sm">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-3 flex flex-wrap items-end gap-3">

          {/* Search by College */}
          <div className="relative flex-1 min-w-[130px]">
            <Search className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search by name or college..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2 pl-9 pr-3 text-sm text-slate-700 outline-none focus:border-blue-500 focus:bg-white transition"
            />
          </div>

          {/* College Type */}
          <div className="flex flex-col gap-1 flex-1 min-w-[110px]">
            <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400">College Type</label>
            <select
              value={filterCollegeType}
              onChange={handleCollegeTypeChange}
              className="rounded-xl border border-slate-200 bg-slate-50 py-2 px-3 text-sm text-slate-700 outline-none focus:border-blue-500 focus:bg-white transition"
            >
              <option value="">All Types</option>
              <option value="IIT">IIT</option>
              <option value="NIT">NIT</option>
              <option value="IIIT">IIIT</option>
              <option value="STATE GOV.">STATE GOV.</option>
              <option value="PRIVATE">PRIVATE</option>
              <option value="OTHERS">OTHERS</option>
            </select>
          </div>

          {/* Specific College (cascading) */}
          {filterCollegeType && (
            <div className="flex flex-col gap-1 flex-1 min-w-[110px]">
              <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400">College</label>
              <select
                value={filterCollegeName}
                onChange={e => setFilterCollegeName(e.target.value)}
                className="rounded-xl border border-slate-200 bg-slate-50 py-2 px-3 text-sm text-slate-700 outline-none focus:border-blue-500 focus:bg-white transition"
              >
                <option value="">All {filterCollegeType}</option>
                {activeCollegeList.map(name => (
                  <option key={name} value={name}>{name}</option>
                ))}
              </select>
            </div>
          )}

          {/* State */}
          <div className="flex flex-col gap-1 flex-1 min-w-[110px]">
            <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400">State</label>
            <select
              value={filterState}
              onChange={e => setFilterState(e.target.value)}
              className="rounded-xl border border-slate-200 bg-slate-50 py-2 px-3 text-sm text-slate-700 outline-none focus:border-blue-500 focus:bg-white transition"
            >
              <option value="">All States</option>
              {ALL_INDIAN_STATES.map(st => (
                <option key={st} value={st}>{st}</option>
              ))}
            </select>
          </div>

          {/* Branch / Department */}
          <div className="flex flex-col gap-1 flex-1 min-w-[110px]">
            <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Department</label>
            <select
              value={filterBranch}
              onChange={e => setFilterBranch(e.target.value)}
              className="rounded-xl border border-slate-200 bg-slate-50 py-2 px-3 text-sm text-slate-700 outline-none focus:border-blue-500 focus:bg-white transition"
            >
              <option value="">All Departments</option>
              {DEPARTMENTS.map(b => (
                <option key={b} value={b}>{b}</option>
              ))}
            </select>
          </div>

          {/* Clear all */}
          {hasFilter && (
            <button
              onClick={clearFilters}
              className="py-2 px-3 rounded-xl text-xs font-bold text-red-500 bg-red-50 hover:bg-red-100 transition self-end animate-fadeIn"
            >
              Clear all
            </button>
          )}

        </div>
      </div>

      {/* Results grid */}
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-5">
          <p className="text-sm text-slate-500">
            {loading ? 'Loading mentors...' : (
              <>Showing <span className="font-bold text-slate-800">{filtered.length}</span> of {mentors.length} mentors</>
            )}
          </p>
          <select
            value={sortBy}
            onChange={e => setSortBy(e.target.value)}
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
  );
}