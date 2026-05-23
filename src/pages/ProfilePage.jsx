import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getUserMe, updateUser } from '../utils/api';

const AVAILABLE_BUNDLES = [
  { id: 'Better College', price: 749, icon: '🎓', desc: '1 counseling session (college focus)' },
  { id: 'Better Branch', price: 749, icon: '⚡', desc: '1 counseling session (branch focus)' },
  { id: 'Complete Guidance', price: 1099, icon: '🚀', desc: '2 sessions + full clarity (Most Popular)' },
  { id: 'Secured Seat', price: 1299, icon: '🛡️', desc: 'JoSAA/CSAB choice filling list creation' }
];

const INDIAN_STATES = [
  "Andaman and Nicobar Islands", "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar",
  "Chandigarh", "Chhattisgarh", "Dadra and Nagar Haveli and Daman and Diu", "Delhi", "Goa",
  "Gujarat", "Haryana", "Himachal Pradesh", "Jammu and Kashmir", "Jharkhand", "Karnataka",
  "Kerala", "Ladakh", "Lakshadweep", "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya",
  "Mizoram", "Nagaland", "Odisha", "Puducherry", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu",
  "Telangana", "Tripura", "Uttar Pradesh", "Uttarakhand", "West Bengal"
];

export default function ProfilePage({ user, setUser }) {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const [name, setName] = useState('');
  const [college, setCollege] = useState('');
  const [state, setState] = useState('');
  const [rank, setRank] = useState('');
  const [bundles, setBundles] = useState([]);
  const [bio, setBio] = useState('');

  useEffect(() => {
    if (user) {
      setName(user.name || '');
      if (user.role === 'mentor') {
        setCollege(user.college || '');
        setState(user.state || '');
        setRank(user.rank || '');
        setBundles(user.bundles || []);
        setBio(user.bio || '');
      }
    } else {
      // Not logged in, redirect
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
        payload.state = state;
        payload.rank = rank;
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
            onClick={handleLogout}
            className="px-4 py-2 text-sm font-bold text-red-500 bg-red-50 hover:bg-red-100 rounded-xl transition"
          >
            Logout
          </button>
        </div>

        {error && <div className="mb-6 p-4 bg-red-50 text-red-600 rounded-xl text-sm font-medium border border-red-100">{error}</div>}
        {success && <div className="mb-6 p-4 bg-green-50 text-green-600 rounded-xl text-sm font-medium border border-green-100">{success}</div>}

        <form onSubmit={handleSave} className="space-y-6">
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-1">Full Name</label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#FF6B2B]/40 transition"
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-slate-700 mb-1">Email Address</label>
            <input
              type="email"
              disabled
              value={user.email}
              className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-slate-500 cursor-not-allowed"
            />
          </div>

          {user.role === 'mentor' && (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-1">College</label>
                  <input
                    type="text"
                    value={college}
                    onChange={(e) => setCollege(e.target.value)}
                    placeholder="e.g. IIT Bombay"
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#FF6B2B]/40 transition"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-1">State / HomeTown</label>
                  <select
                    value={state}
                    onChange={(e) => setState(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#FF6B2B]/40 transition bg-white"
                  >
                    <option value="">Select your state...</option>
                    {INDIAN_STATES.map(s => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-slate-700 mb-1">JEE Rank (General/CRL)</label>
                <input
                  type="number"
                  value={rank}
                  onChange={(e) => setRank(e.target.value)}
                  placeholder="e.g. 1500"
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#FF6B2B]/40 transition"
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-slate-700 mb-1">Your Pitch / Bio / One Liner</label>
                <p className="text-xs text-slate-500 mb-2 leading-relaxed">Students come to you for one big decision — which college and branch to pick with their JEE rank. Write a short pitch telling them why you're the right mentor to guide that choice.</p>
                <textarea
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  placeholder="NIT Trichy CSE, AIR 1,800. I'll help you pick the right college-branch combo for your rank — no generic advice, just what actually worked."
                  rows={4}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#FF6B2B]/40 transition resize-none"
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">Bundles You Offer</label>
                <p className="text-xs text-slate-500 mb-3">Select the packages you are comfortable delivering to students.</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {AVAILABLE_BUNDLES.map(b => {
                    const isSelected = bundles.includes(b.id);
                    return (
                      <div
                        key={b.id}
                        onClick={() => handleBundleToggle(b.id)}
                        className={`relative flex items-start gap-4 p-4 rounded-2xl border-2 cursor-pointer transition-all duration-300 ${isSelected
                          ? 'border-[#FF6B2B] bg-[#FF6B2B]/5 shadow-md shadow-[#FF6B2B]/10 scale-[1.02]'
                          : 'border-slate-100 hover:border-slate-300 hover:bg-slate-50'
                          }`}
                      >
                        <div className="flex items-center h-5 mt-1">
                          <input
                            type="checkbox"
                            className="w-5 h-5 text-[#FF6B2B] border-gray-300 rounded focus:ring-[#FF6B2B]"
                            checked={isSelected}
                            readOnly
                          />
                        </div>
                        <div className="flex-1">
                          <div className="flex justify-between items-center mb-1">
                            <span className="font-bold text-[#0B0F2E] flex items-center gap-2">
                              {b.icon} {b.id}
                            </span>
                            <span className="text-xs font-black bg-[#0B0F2E] text-white px-2 py-0.5 rounded-md">
                              ₹{b.price}
                            </span>
                          </div>
                          <p className="text-xs text-slate-500 leading-relaxed">{b.desc}</p>
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
              type="submit"
              disabled={loading}
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
