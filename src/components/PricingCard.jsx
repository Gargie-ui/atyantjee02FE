import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, X, Sparkles, Star } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { getWhatsAppLink } from '../utils/whatsapp';
import { createPaymentOrder, verifyPayment, getUserMe } from '../utils/api';

// Map frontend plan titles → backend planId
const PLAN_ID_MAP = {
  'Quick Clarity': 'quick-clarity',
  'Complete Guidance': 'complete-guidance',
  'Dream Seat Protection™': 'dream-seat',
};

function loadCashfree() {
  return new Promise((resolve) => {
    if (window.Cashfree) return resolve(true);
    const script = document.createElement('script');
    script.src = 'https://sdk.cashfree.com/js/v3/cashfree.js';
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
}

// ─── Payment Modal ─────────────────────────────────────────────────────────────

export function PaymentModal({ open, onClose, planTitle, planPrice, mentorId, onSuccessRedirectUrl }) {
  const [name, setName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [phone, setPhone] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState('');
  const [success, setSuccess] = React.useState(false);

  React.useEffect(() => {
    if (!open) {
      setLoading(false); setError(''); setSuccess(false);
    } else {
      const token = localStorage.getItem('user_token');
      if (token) {
        getUserMe()
          .then((res) => {
            if (res?.user) {
              if (!name) setName(res.user.name || '');
              if (!email) setEmail(res.user.email || '');
              if (!phone) setPhone(res.user.phone || '');
            }
          })
          .catch(() => {});
      }
    }
  }, [open]);

  async function handlePay(e) {
    e.preventDefault();
    setError('');

    // Extra validation for phone number
    if (!/^[0-9]{10}$/.test(phone)) {
      setError('Please enter a valid 10-digit mobile number.');
      return;
    }

    setLoading(true);

    const planId = PLAN_ID_MAP[planTitle];
    if (!planId) {
      window.open(getWhatsAppLink(planTitle), '_blank');
      onClose?.();
      setLoading(false);
      return;
    }

    try {
      const orderData = await createPaymentOrder({ planId, name, email, phone, mentorId });
      const loaded = await loadCashfree();
      if (!loaded) throw new Error('Could not load Cashfree SDK. Check your internet connection.');

      const cashfree = window.Cashfree({
        mode: orderData.cashfreeEnvironment === 'production' ? 'production' : 'sandbox'
      });

      // Save pending WhatsApp redirection URL for verification hook
      if (onSuccessRedirectUrl) {
        localStorage.setItem('atyant_pending_redirect', onSuccessRedirectUrl);
      }

      await cashfree.checkout({
        paymentSessionId: orderData.paymentSessionId,
        returnUrl: `${window.location.origin}/profile?order_id=${orderData.orderId}`
      });

    } catch (err) {
      setError(err.message || 'Something went wrong. Please try again.');
      setLoading(false);
    }
  }

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[200000] flex items-center justify-center bg-black/50 px-4">
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="relative w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl"
        >
          <button
            onClick={onClose}
            className="absolute top-4 right-4 rounded-full p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-700 transition"
            aria-label="Close"
          >
            <X className="h-5 w-5" />
          </button>

          {success ? (
            <div className="py-8 text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
                <CheckCircle2 className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900">Payment Successful!</h3>
              <p className="mt-2 text-sm text-gray-500">
                We'll reach out within 24 hours to schedule your session.
              </p>
              <button
                onClick={onClose}
                className="mt-6 rounded-full bg-[#FF6B2B] px-6 py-2.5 text-sm font-semibold text-white hover:bg-[#ff7a42] transition"
              >
                Done
              </button>
              {onSuccessRedirectUrl && (
                <p className="mt-2 text-xs text-gray-400">Redirecting to WhatsApp...</p>
              )}
            </div>
          ) : (
            <form onSubmit={handlePay} className="space-y-4">
              <div>
                <h3 className="text-lg font-bold text-gray-900">Pay for {planTitle}</h3>
                <p className="text-sm text-gray-500">₹{planPrice} — secure payment via Cashfree</p>
              </div>

              {error && (
                <p className="rounded-md bg-red-50 px-3 py-2 text-xs text-red-600">{error}</p>
              )}

              {/* Form Inputs ... */}
              <div>
                <label className="mb-1 block text-xs font-medium text-gray-700">Full Name *</label>
                <input
                  required value={name} onChange={(e) => setName(e.target.value)}
                  placeholder="Your name"
                  className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#FF6B2B]/40"
                />
              </div>
              <div>
                <label className="mb-1 block text-xs font-medium text-gray-700">Email *</label>
                <input
                  required type="email" value={email} onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#FF6B2B]/40"
                />
              </div>
              <div>
                <label className="mb-1 block text-xs font-medium text-gray-700">Phone *</label>
                <input
                  required
                  type="tel"
                  pattern="[0-9]{10}"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="9876543210"
                  title="Please enter a valid 10-digit mobile number"
                  className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#FF6B2B]/40"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full rounded-full bg-[#FF6B2B] py-3 text-sm font-bold text-white hover:bg-[#e05a1f] transition disabled:opacity-60 shadow-lg shadow-[#FF6B2B]/20"
              >
                {loading ? 'Processing…' : `Pay ₹${planPrice} Securely`}
              </button>

              <p className="text-center text-[11px] text-gray-400">
                🔒 Secured by Cashfree · 100% safe checkout
              </p>
            </form>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

// ─── PricingCard ───────────────────────────────────────────────────────────────

export default function PricingCard({
  title,
  price,
  originalPrice,
  discount,
  discountLabel,
  bestFor,
  features,
  bonus,
  bonusLabel,
  cta,
  highlighted = false,
  badge,
}) {
  const navigate = useNavigate();
  const [showAllBonus, setShowAllBonus] = React.useState(false);

  const hasPlanId = Boolean(PLAN_ID_MAP[title]);

  function handleCTA(e) {
    e.preventDefault();
    const planId = PLAN_ID_MAP[title];
    if (planId) {
      navigate(`/mentors?bundle=${planId}`);
    } else {
      window.open(getWhatsAppLink(title), '_blank');
    }
  }

  const visibleBonus = showAllBonus ? bonus : bonus?.slice(0, 3);

  return (
    <>
      <motion.div
        whileHover={{ y: -6, scale: 1.01 }}
        transition={{ duration: 0.22 }}
        className={`relative flex flex-col rounded-[1.8rem] border shadow-[0_24px_70px_rgba(11,15,46,0.09)] transition ${
          highlighted
            ? 'border-[#FF6B2B] bg-[#0B0F2E] text-white ring-4 ring-[#FF6B2B]/20'
            : 'border-slate-200 bg-white text-[#0B0F2E]'
        }`}
      >
        {/* Badge */}
        {badge && (
          <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-[#FF6B2B] px-5 py-1.5 text-xs font-black uppercase tracking-[0.15em] text-white shadow-lg shadow-[#FF6B2B]/30">
            {badge}
          </div>
        )}

        <div className="p-7 flex flex-col flex-1">

          {/* Discount pill */}
          {discount && (
            <div className="flex items-center gap-2 mb-4">
              <span className={`text-xs font-black px-3 py-1 rounded-full ${
                highlighted ? 'bg-[#FF6B2B] text-white' : 'bg-[#FF6B2B]/10 text-[#FF6B2B]'
              }`}>
                {discount}
              </span>
              {discountLabel && (
                <span className={`text-[11px] font-semibold ${highlighted ? 'text-white/60' : 'text-slate-500'}`}>
                  • {discountLabel}
                </span>
              )}
            </div>
          )}

          {/* Title */}
          <h3 className={`text-xl font-black leading-tight ${highlighted ? 'text-white' : 'text-[#0B0F2E]'}`}>
            {title}
          </h3>

          {/* Pricing */}
          <div className="mt-3 flex items-baseline gap-2">
            <span className={`text-4xl font-black ${highlighted ? 'text-white' : 'text-[#0B0F2E]'}`}>
              ₹{price}
            </span>
            {originalPrice && (
              <span className={`text-lg font-semibold line-through ${highlighted ? 'text-white/40' : 'text-slate-400'}`}>
                ₹{originalPrice}
              </span>
            )}
          </div>

          {/* Best for */}
          {bestFor && (
            <div className={`mt-4 rounded-xl px-4 py-3 text-xs leading-relaxed font-medium border ${
              highlighted
                ? 'bg-white/10 border-white/15 text-white/80'
                : 'bg-blue-50 border-blue-100 text-slate-700'
            }`}>
              <span className={`block text-[10px] font-black uppercase tracking-wider mb-1 ${highlighted ? 'text-[#FFB38E]' : 'text-[#FF6B2B]'}`}>
                Best for
              </span>
              {bestFor}
            </div>
          )}

          {/* Divider */}
          <div className={`mt-5 mb-4 h-px ${highlighted ? 'bg-white/10' : 'bg-slate-100'}`} />

          {/* Features */}
          <div className="space-y-2.5 flex-1">
            <p className={`text-[10px] font-black uppercase tracking-wider mb-3 ${highlighted ? 'text-white/50' : 'text-slate-400'}`}>
              What's included
            </p>
            {features.map((feature) => (
              <div key={feature} className={`flex items-start gap-2.5 text-sm ${highlighted ? 'text-white/85' : 'text-slate-700'}`}>
                <CheckCircle2 className="h-4 w-4 shrink-0 text-[#FF6B2B] mt-0.5" />
                <span className="leading-snug">{feature}</span>
              </div>
            ))}
          </div>

          {/* Bonus guides */}
          {bonus && bonus.length > 0 && (
            <div className={`mt-5 rounded-xl p-4 border ${
              highlighted ? 'bg-white/8 border-white/12' : 'bg-gradient-to-br from-amber-50 to-orange-50 border-amber-100'
            }`}>
              <div className="flex items-center gap-2 mb-3">
                <Sparkles className={`h-3.5 w-3.5 ${highlighted ? 'text-[#FFB38E]' : 'text-amber-500'}`} />
                <p className={`text-[10px] font-black uppercase tracking-wider ${highlighted ? 'text-[#FFB38E]' : 'text-amber-700'}`}>
                  {bonusLabel || 'Bonus Guides'}
                </p>
              </div>
              <div className="space-y-1.5">
                {visibleBonus.map((item) => (
                  <div key={item} className={`flex items-center gap-2 text-xs ${highlighted ? 'text-white/75' : 'text-slate-600'}`}>
                    <Star className={`h-3 w-3 shrink-0 ${highlighted ? 'text-[#FFB38E]' : 'text-amber-400'} fill-current`} />
                    {item}
                  </div>
                ))}
                {bonus.length > 3 && (
                  <button
                    onClick={() => setShowAllBonus(v => !v)}
                    className={`mt-1 text-[11px] font-bold underline underline-offset-2 ${highlighted ? 'text-[#FFB38E]' : 'text-amber-600'}`}
                  >
                    {showAllBonus ? 'Show less ↑' : `+${bonus.length - 3} more guides ↓`}
                  </button>
                )}
              </div>
            </div>
          )}

          {/* CTA */}
          <button
            onClick={handleCTA}
            className={`mt-6 inline-flex w-full items-center justify-center rounded-full px-5 py-4 text-sm font-bold transition hover:scale-[1.02] active:scale-[0.99] ${
              highlighted
                ? 'bg-[#FF6B2B] text-white hover:bg-[#ff7a42] shadow-xl shadow-[#FF6B2B]/30'
                : 'bg-[#0B0F2E] text-white hover:bg-[#12183f] shadow-lg'
            }`}
          >
            {cta}
          </button>

          <p className={`mt-3 text-center text-[10px] ${highlighted ? 'text-white/40' : 'text-slate-400'}`}>
            🔒 Secure payment · Cancel anytime
          </p>
        </div>
      </motion.div>
    </>
  );
}
