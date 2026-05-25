import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { getUserMe, updateUser } from '../utils/api';
import { ALL_INDIAN_STATES,POPULAR_LANGUAGES,COLLEGES_BY_TYPE } from '../data/siteContent';



const AVAILABLE_BUNDLES = [
  {
    id: 'quick-clarity',
    name: 'Quick Clarity',
    price: 399,
    originalPrice: 799,
    discount: '50% OFF – Limited Time Offer',
    icon: '⚡',
    desc: 'For students who want quick clarity on options and next steps.',
    includes: [
      '20–30 min focused session',
      'One major confusion solved',
      'Rank & options quick review',
      'Post-call action summary',
      '24-hour WhatsApp support',
    ],
    mentorNote: 'You commit to 1 focused session + post-call action summary + 24hr WhatsApp availability.',
  },
  {
    id: 'complete-guidance',
    name: 'Complete Guidance',
    price: 999,
    originalPrice: 2499,
    discount: '60% OFF – JoSAA Launch Pricing',
    badge: '⭐ Most Popular',
    icon: '🚀',
    desc: 'For students who want complete strategy, clarity & guided decision-making.',
    includes: [
      '2 in-depth guidance sessions',
      'Personalized strategy & roadmap',
      'Branch vs college analysis',
      'Freeze / Float guidance',
      'WhatsApp support (3–5 days)',
      'Call summary PDF',
      'Resource packs & strategy sheets',
    ],
    mentorNote: 'You commit to 2 guidance sessions + call summary PDF + 3–5 day WhatsApp support.',
  },
  {
    id: 'dream-seat',
    name: 'Dream Seat Protection™',
    price: 1799,
    originalPrice: 5999,
    discount: '70% OFF – Priority Round Support',
    icon: '🛡️',
    desc: 'For parents & students seeking peace of mind and end-to-end handholding.',
    includes: [
      'Everything in Complete Guidance, plus:',
      'Round-wise JoSAA + CSAB support',
      'Freeze / Float / Slide strategy guidance',
      'Dedicated parent discussion session',
      'Preference order optimization',
      'Priority WhatsApp support',
      'Backup strategy if allotment changes',
      'Dedicated mentor till final rounds',
    ],
    mentorNote: 'You commit to dedicated, emotional reassurance and complete cross-round JoSAA/CSAB support for the family till the final admission lists.',
  },
];

export default function ProfilePage({ user, setUser }) {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const [name, setName] = useState('');
  
  // Mentor-specific Profile Fields State
  const [collegeType, setCollegeType] = useState('');
  const [college, setCollege] = useState('');
  const [branch, setBranch] = useState('');
  const [cgpa, setCgpa] = useState('');
  const [state, setState] = useState('');
  const [rank, setRank] = useState('');
  const [category, setCategory] = useState('');
  const [categoryRank, setCategoryRank] = useState('');
  const [preferredLang, setPreferredLang] = useState('');
  const [gender, setGender] = useState('');
  const [bundles, setBundles] = useState([]);
  const [bio, setBio] = useState('');

  // Dynamically reset college selection if type parameter alterations manifest
  const activeCollegeList = useMemo(() => {
    if (!collegeType) return [];
    return COLLEGES_BY_TYPE[collegeType] || [];
  }, [collegeType]);

  useEffect(() => {
    if (user) {
      setName(user.name || '');
      if (user.role === 'mentor') {
        // Attempt to determine category type index configuration from value string
        if (user.college) {
          const matchedType = Object.keys(COLLEGES_BY_TYPE).find(type => 
            COLLEGES_BY_TYPE[type].includes(user.college)
          );
          setCollegeType(matchedType || 'OTHERS');
          setCollege(user.college);
        }
        
        setBranch(user.branch || '');
        setCgpa(user.cgpa || '');
        setState(user.state || '');
        setRank(user.rank || '');
        setCategory(user.category || 'General');
        setCategoryRank(user.categoryRank || '');
        setPreferredLang(user.preferredLang || '');
        setGender(user.gender || '');
        
        const mappedBundles = (user.bundles || []).map(b => {
          if (b === 'Quick Clarity') return 'quick-clarity';
          if (b === 'Complete Guidance') return 'complete-guidance';
          if (b === 'Dream Seat Protection™') return 'dream-seat';
          return b;
        });
        setBundles(mappedBundles);
        setBio(user.bio || '');
      }
    } else if (!localStorage.getItem('user_token')) {
      navigate('/login');
    }
  }, [user, navigate]);

  const handleLogout = () => {
    localStorage.removeItem('user_token');
    setUser(null);
    navigate('/');
  };

  const handleBundleToggle = (b) => {
    setBundles((prev) =>
      prev.includes(b) ? prev.filter((item) => item !== b) : [...prev, b]
    );
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    try {
      const payload = { name };
      if (user.role === 'mentor') {
        payload.college = college;
        payload.branch = branch;
        payload.cgpa = cgpa || undefined;
        payload.state = state;
        payload.rank = rank;
        payload.category = category;
        payload.categoryRank = categoryRank || undefined;
        payload.preferredLang = preferredLang;
        payload.gender = gender;
        payload.bundles = bundles;
        payload.bio = bio;
      }

      const res = await updateUser(payload);
      setUser(res.user);
      setSuccess('Profile updated successfully!');
    } catch (err) {
      setError(err.message || 'Failed to update profile');
    } finally {
      setLoading(false);
    }
  };

  if (!user) return null;
  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto bg-white rounded-3xl shadow-xl p-8 border border-slate-100">

        <div className="flex items-center justify-between mb-8 pb-6 border-b border-slate-100">
          <div>
            <h1 className="text-3xl font-black text-[#0B0F2E]">Your Profile</h1>
            <p className="text-slate-500 mt-1 capitalize font-medium">{user.role} Account</p>
          </div>
          <button
            type="button" onClick={handleLogout}
            className="px-4 py-2 text-sm font-bold text-red-500 bg-red-50 hover:bg-red-100 rounded-xl transition"
          >
            Logout
          </button>
        </div>

        {error && <div className="mb-6 p-4 bg-red-50 text-red-600 rounded-xl text-sm font-medium border border-red-100">{error}</div>}
        {success && <div className="mb-6 p-4 bg-green-50 text-green-600 rounded-xl text-sm font-medium border border-green-100">{success}</div>}

        <form onSubmit={handleSave} className="space-y-6">
          {/* Identity Parameters Group */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-1">Full Name</label>
              <input
                type="text" required value={name} onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#FF6B2B]/40 transition"
              />
            </div>

            {user.role === 'mentor' && (
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-1">Gender</label>
                <select
                  required value={gender} onChange={(e) => setGender(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#FF6B2B]/40 transition bg-white h-[50px]"
                >
                  <option value="" disabled>Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-1">Phone Number</label>
              <input
                type="text" disabled value={user.phone || ''} placeholder='N/A'
                className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-slate-500 cursor-not-allowed"
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-1">Email Address</label>
              <input
                type="email" disabled value={user.email || ''}
                className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-slate-500 cursor-not-allowed"
              />
            </div>
          </div>

          {/* ── MENTOR SPECIFIC EXTENSIONS ── */}
          {user.role === 'mentor' && (
            <>
              {/* College Mapping Grid Section */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-4 bg-slate-50 rounded-2xl border border-slate-100">
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-1">College Type</label>
                  <select
                    required value={collegeType} onChange={(e) => { setCollegeType(e.target.value); setCollege(''); }}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#FF6B2B]/40 transition bg-white"
                  >
                    <option value="" disabled>Select Type</option>
                    <option value="IIT">IIT</option>
                    <option value="NIT">NIT</option>
                    <option value="IIIT">IIIT</option>
                    <option value="STATE GOV.">STATE GOV.</option>
                    <option value="PRIVATE">PRIVATE</option>
                    <option value="OTHERS">OTHERS</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-1">College Name</label>
                  <select
                    required disabled={!collegeType} value={college} onChange={(e) => setCollege(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#FF6B2B]/40 transition bg-white disabled:opacity-60"
                  >
                    <option value="">{collegeType ? 'Select College Name' : 'Choose College Type First'}</option>
                    {activeCollegeList.map(name => (
                      <option key={name} value={name}>{name}</option>
                    ))}
                    {collegeType === 'OTHERS' && <option value="Other Unlisted Institute">Other Unlisted Institute</option>}
                  </select>
                </div>
              </div>

              {/* Academics Track Fields */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="md:col-span-2">
                  <label className="block text-sm font-bold text-slate-700 mb-1">Branch Domain</label>
                  <select
                    required value={branch} onChange={(e) => setBranch(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#FF6B2B]/40 transition bg-white"
                  >
                    <option value="" disabled>Select Branch</option>
                    <option value="Computer Science">Computer Science / IT / AI</option>
                    <option value="Electronics">Electronics & Communication (ECE)</option>
                    <option value="Electrical">Electrical Engineering</option>
                    <option value="Mechanical">Mechanical Engineering</option>
                    <option value="Civil">Civil Engineering</option>
                    <option value="Chemical">Chemical Engineering</option>
                    <option value="Commerce / Finance">Commerce / Finance / Economics</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-1">CGPA (Optional)</label>
                  <input
                    type="number" step="0.01" min="0" max="10" value={cgpa} onChange={(e) => setCgpa(e.target.value)} placeholder="e.g. 8.45"
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#FF6B2B]/40 transition"
                  />
                </div>
              </div>

              {/* Counselling Parameters Section Group */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-1">Home State / Hometown</label>
                  <select
                    required value={state} onChange={(e) => setState(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#FF6B2B]/40 transition bg-white"
                  >
                    <option value="">Select your state...</option>
                    {ALL_INDIAN_STATES.map(s => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-1">Preferred Language</label>
                  <select
                    required value={preferredLang} onChange={(e) => setPreferredLang(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#FF6B2B]/40 transition bg-white"
                  >
                    <option value="" disabled>Select Language</option>
                    {POPULAR_LANGUAGES.map(lang => (
                      <option key={lang} value={lang}>{lang}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Ranks & Categories */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-1">JEE Rank (CRL)</label>
                  <input
                    type="number" required value={rank} onChange={(e) => setRank(e.target.value)} placeholder="e.g. 1500"
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#FF6B2B]/40 transition"
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-1">Admission Category</label>
                  <select
                    required value={category} onChange={(e) => setCategory(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#FF6B2B]/40 transition bg-white"
                  >
                    <option value="General">General / OPEN</option>
                    <option value="OBC-NCL">OBC-NCL</option>
                    <option value="EWS">EWS</option>
                    <option value="SC">SC</option>
                    <option value="ST">ST</option>
                    <option value="PwD">PwD</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-1">Category Rank (Optional)</label>
                  <input
                    type="number" value={categoryRank} onChange={(e) => setCategoryRank(e.target.value)} placeholder="e.g. 420"
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#FF6B2B]/40 transition"
                  />
                </div>
              </div>

              {/* Bio Pitch text */}
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-1">Your Pitch / Bio / One Liner</label>
                <p className="text-xs text-slate-500 mb-2 leading-relaxed">Students come to you for one big decision — which college and branch to pick with their rank. Write a short pitch telling them why you're the right mentor to guide that choice.</p>
                <textarea
                  value={bio} onChange={(e) => setBio(e.target.value)}
                  placeholder="NIT Trichy CSE, AIR 1,800. I'll help you pick the right college-branch combo for your rank — no generic advice, just what actually worked."
                  rows={4}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#FF6B2B]/40 transition resize-none"
                />
              </div>

              {/* Product Bundles Configuration Node Loop */}
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-1">Bundles You Offer</label>
                <p className="text-xs text-slate-500 mb-4">Select the packages you are comfortable delivering. Students will book you based on what you offer.</p>
                <div className="space-y-4">
                  {AVAILABLE_BUNDLES.map(b => {
                    const isSelected = bundles.includes(b.id);
                    return (
                      <div
                        key={b.id} onClick={() => handleBundleToggle(b.id)}
                        className={`relative flex gap-4 p-5 rounded-2xl border-2 cursor-pointer transition-all duration-200 ${
                          isSelected
                            ? 'border-[#FF6B2B] bg-[#FF6B2B]/5 shadow-md shadow-[#FF6B2B]/10'
                            : 'border-slate-100 hover:border-slate-300 hover:bg-slate-50'
                        }`}
                      >
                        <div className="flex-shrink-0 pt-0.5">
                          <div className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-all ${
                            isSelected ? 'bg-[#FF6B2B] border-[#FF6B2B]' : 'border-slate-300'
                          }`}>
                            {isSelected && (
                              <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                              </svg>
                            )}
                          </div>
                        </div>

                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-3 mb-2">
                            <div className="flex items-center gap-2 flex-wrap">
                              <span className="text-base font-black text-[#0B0F2E]">
                                {b.icon} {b.name}
                              </span>
                              {b.badge && (
                                <span className="text-[10px] font-bold bg-[#FF6B2B] text-white px-2 py-0.5 rounded-full">
                                  {b.badge}
                                </span>
                              )}
                            </div>
                            <div className="text-right flex-shrink-0">
                              <div className="flex items-baseline gap-1.5">
                                <span className="text-lg font-black text-[#0B0F2E]">₹{b.price}</span>
                                {b.originalPrice && <span className="text-sm text-slate-400 line-through">₹{b.originalPrice}</span>}
                              </div>
                              {b.discount && <span className="text-[10px] font-bold text-[#FF6B2B]">{b.discount}</span>}
                            </div>
                          </div>

                          <p className="text-xs text-slate-500 mb-3 leading-relaxed italic">{b.desc}</p>

                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-1">
                            {b.includes.map(item => (
                              <div key={item} className="flex items-start gap-1.5 text-[11px] text-slate-600">
                                <span className="text-[#FF6B2B] mt-0.5 font-bold leading-none">✓</span>
                                <span className="leading-snug">{item}</span>
                              </div>
                            ))}
                          </div>

                          <div className={`mt-3 text-[11px] px-3 py-2 rounded-lg font-medium ${
                            isSelected ? 'bg-[#FF6B2B]/10 text-[#FF6B2B]' : 'bg-slate-100 text-slate-500'
                          }`}>
                            📋 {b.mentorNote}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </>
          )}

          <div className="pt-4 border-t border-slate-100">
            <button
              type="submit" disabled={loading}
              className="w-full md:w-auto px-8 py-3.5 rounded-xl bg-[#0B0F2E] text-white font-black hover:bg-[#12183f] transition-all disabled:opacity-70 shadow-lg shadow-[#0B0F2E]/20"
            >
              {loading ? 'Saving...' : 'Save Profile Changes'}
            </button>
          </div>
        </form>

      </div>
    </div>
  );
}