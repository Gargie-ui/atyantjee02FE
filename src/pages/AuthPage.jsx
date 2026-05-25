import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { userLogin, userSignup } from '../utils/api';

export default function AuthPage({ setUser }) {
  const [isLogin, setIsLogin] = useState(true);
  const [role, setRole] = useState('student');

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [phone, setPhone] = useState('');

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if(!isLogin && phone.length!=10){setError("Invalid Phone Number");return;}
    setLoading(true);
    
    try {
      let res;
      if (isLogin) {
        res = await userLogin({ phone, password });
      } else {
<<<<<<< HEAD
        res = await userSignup({ name, email,phone, password, role });
=======
        res = await userSignup({ name, phone, password, role });
>>>>>>> 7eeb3a39ce4fc0c00fb2b56dfaad9232e5af4fca
      }
      if (setUser) setUser(res.user);

      // On success, redirect them to a dashboard or home
      // For now, redirect to home. You can change this to a specific dashboard later.
      navigate('/');

    } catch (err) {
      setError(err.message || 'Authentication failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-xl p-8 border border-slate-100">

        <div className="text-center mb-8">
          <h2 className="text-3xl font-black text-[#0B0F2E]">
            {isLogin ? 'Welcome Back' : 'Create an Account'}
          </h2>
          <p className="text-slate-500 mt-2 text-sm">
            {isLogin ? 'Log in to access your dashboard.' : 'Join Atyant as a student or mentor.'}
          </p>
        </div>

        {/* Role Toggle for Signup */}
        {!isLogin && (
          <div className="flex p-1 bg-slate-100 rounded-xl mb-6">
            <button
              type="button"
              onClick={() => setRole('student')}
              className={`flex-1 py-2 text-sm font-bold rounded-lg transition-all ${role === 'student' ? 'bg-white shadow text-[#0B0F2E]' : 'text-slate-500 hover:text-slate-700'
                }`}
            >
              Student
            </button>
            <button
              type="button"
              onClick={() => setRole('mentor')}
              className={`flex-1 py-2 text-sm font-bold rounded-lg transition-all ${role === 'mentor' ? 'bg-white shadow text-[#FF6B2B]' : 'text-slate-500 hover:text-slate-700'
                }`}
            >
              Mentor
            </button>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <div className="p-3 bg-red-50 text-red-600 text-sm rounded-xl border border-red-100 text-center font-medium">
              {error}
            </div>
          )}

          {!isLogin && (
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-1">Full Name</label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="John Doe"
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#FF6B2B]/40 transition"
              />
            </div>
          )}

          <div>
            <label className="block text-sm font-bold text-slate-700 mb-1">Phone Number</label>
            <input
              type="tel"
              required
              pattern="[0-9]{10}"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="9876543210"
              title="Please enter exactly 10 digits"
              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#FF6B2B]/40 transition"
            />
          </div>

          {!isLogin && (
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-1">Phone Number</label>
              <input
                type="tel"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="9436782165"
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#FF6B2B]/40 transition"
              />
            </div>
          )}
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-1">Password</label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#FF6B2B]/40 transition"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 mt-2 rounded-xl bg-[#FF6B2B] text-white font-black hover:bg-[#e05a1f] transition-all disabled:opacity-70 shadow-lg shadow-[#FF6B2B]/20"
          >
            {loading ? 'Processing...' : isLogin ? 'Log In' : 'Sign Up'}
          </button>
        </form>

        <div className="mt-6 text-center">
          <button
            onClick={() => {
              setIsLogin(!isLogin);
              setError('');
            }}
            className="text-sm font-semibold text-slate-500 hover:text-[#0B0F2E] transition"
          >
            {isLogin ? "Don't have an account? Sign Up" : 'Already have an account? Log In'}
          </button>
        </div>

        <div className="mt-8 text-center">
          <button
            onClick={() => navigate('/')}
            className="text-xs font-bold text-slate-400 hover:text-slate-600 transition"
          >
            ← Back to Home
          </button>
        </div>

      </div>
    </div>
  );
}
