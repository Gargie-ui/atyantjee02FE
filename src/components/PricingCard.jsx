import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, X } from 'lucide-react';
import { getWhatsAppLink } from '../utils/whatsapp';
import { createPaymentOrder, verifyPayment, getUserMe } from '../utils/api';

// Map frontend plan titles → backend planId
const PLAN_ID_MAP = {
  'Insider Connect': 'insider',
  'Backup Plan': 'backup',
  'Better College': 'better-college',
  'Better Branch': 'better-branch',
  'Complete Guidance': 'combo',
  'Secured Seat': '1to1',
};

function loadRazorpay() {
  return new Promise((resolve) => {
    if (window.Razorpay) return resolve(true);
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
}

// ─── Payment Modal ─────────────────────────────────────────────────────────────

export function PaymentModal({ open, onClose, planTitle, planPrice, onSuccessRedirectUrl }) {
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
      // If modal opens, try to pre-fill user details if logged in
      const token = localStorage.getItem('user_token');
      if (token && !name && !email) {
        getUserMe()
          .then((res) => {
            if (res?.user) {
              if (!name) setName(res.user.name || '');
              if (!email) setEmail(res.user.email || '');
            }
          })
          .catch(() => {});
      }
    }
  }, [open]);

  async function handlePay(e) {
    e.preventDefault();
    setError('');
    setLoading(true);

    const planId = PLAN_ID_MAP[planTitle];
    if (!planId) {
      // Unmapped plan → redirect to WhatsApp
      window.open(getWhatsAppLink(planTitle), '_blank');
      onClose?.();
      setLoading(false);
      return;
    }

    try {
      // 1. Create order on backend
      const orderData = await createPaymentOrder({ planId, name, email, phone: phone || undefined });

      // 2. Load Razorpay SDK
      const loaded = await loadRazorpay();
      if (!loaded) throw new Error('Could not load Razorpay. Check your internet connection.');

      // 3. Open Razorpay checkout
      await new Promise((resolve, reject) => {
        const rzp = new window.Razorpay({
          key: orderData.razorpayKeyId,
          amount: orderData.order.amount,
          currency: orderData.order.currency,
          name: 'Atyant',
          description: planTitle,
          order_id: orderData.order.id,
          prefill: { name, email, contact: phone },
          theme: { color: '#FF6B2B' },
          handler: async (response) => {
            try {
              await verifyPayment({
                razorpayOrderId: response.razorpay_order_id,
                razorpayPaymentId: response.razorpay_payment_id,
                razorpaySignature: response.razorpay_signature,
              });
              setSuccess(true);
              if (onSuccessRedirectUrl) {
                setTimeout(() => {
                  window.open(onSuccessRedirectUrl, '_blank');
                  onClose();
                }, 1500);
              }
              resolve();
            } catch (verifyErr) {
              reject(verifyErr);
            }
          },
          modal: {
            ondismiss: () => reject(new Error('Payment cancelled')),
          },
        });
        rzp.open();
      });
    } catch (err) {
      if (err.message !== 'Payment cancelled') {
        setError(err.message || 'Something went wrong. Please try again.');
      }
    } finally {
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
                <p className="text-sm text-gray-500">₹{planPrice} — secure payment via Razorpay</p>
              </div>

              {error && (
                <p className="rounded-md bg-red-50 px-3 py-2 text-xs text-red-600">{error}</p>
              )}

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
                <label className="mb-1 block text-xs font-medium text-gray-700">Phone (optional)</label>
                <input
                  type="tel" value={phone} onChange={(e) => setPhone(e.target.value)}
                  placeholder="+91 XXXXX XXXXX"
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
                🔒 Secured by Razorpay · 100% safe checkout
              </p>
            </form>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

// ─── PricingCard ───────────────────────────────────────────────────────────────

export default function PricingCard({ title, price, features, cta, highlighted = false, badge }) {
  const [showModal, setShowModal] = React.useState(false);

  const hasPlanId = Boolean(PLAN_ID_MAP[title]);

  function handleCTA(e) {
    e.preventDefault();
    if (hasPlanId) {
      setShowModal(true);
    } else {
      window.open(getWhatsAppLink(title), '_blank');
    }
  }

  return (
    <>
      <motion.div
        whileHover={{ y: -8, scale: 1.01 }}
        className={`relative rounded-[1.8rem] border p-7 shadow-[0_24px_70px_rgba(11,15,46,0.08)] transition ${
          highlighted
            ? 'border-[#FF6B2B] bg-[#0B0F2E] text-white ring-4 ring-[#FF6B2B]/15'
            : 'border-slate-200 bg-white text-[#0B0F2E]'
        }`}
      >
        {badge ? (
          <div className="absolute -top-3 left-6 rounded-full bg-[#FF6B2B] px-4 py-1 text-xs font-bold uppercase tracking-[0.18em] text-white shadow-lg shadow-[#FF6B2B]/25">
            {badge}
          </div>
        ) : null}
        <div className="flex items-start justify-between gap-3">
          <div>
            <h3 className={`text-2xl font-black ${highlighted ? 'text-white' : 'text-[#0B0F2E]'}`}>{title}</h3>
            <p className={`mt-2 text-sm ${highlighted ? 'text-white/70' : 'text-slate-500'}`}>Best fit for students who want faster clarity.</p>
          </div>
          <div className={`rounded-2xl px-4 py-2 text-right ${highlighted ? 'bg-white/10' : 'bg-[#FF6B2B]/10'}`}>
            <div className={`text-xs font-semibold uppercase tracking-[0.18em] ${highlighted ? 'text-white/60' : 'text-[#FF6B2B]'}`}>Starting at</div>
            <div className={`text-3xl font-black ${highlighted ? 'text-white' : 'text-[#0B0F2E]'}`}>
              ₹{price}
            </div>
          </div>
        </div>
        <div className="mt-6 space-y-3">
          {features.map((feature) => (
            <div key={feature} className={`flex items-start gap-3 text-sm ${highlighted ? 'text-white/80' : 'text-slate-700'}`}>
              <CheckCircle2 className="h-4 w-4 shrink-0 text-[#FF6B2B] mt-0.5" />
              <span className="leading-snug">{feature}</span>
            </div>
          ))}
        </div>
        <button
          onClick={handleCTA}
          className={`mt-7 inline-flex w-full items-center justify-center rounded-full px-5 py-4 text-sm font-semibold transition hover:scale-[1.02] ${
            highlighted ? 'bg-[#FF6B2B] text-white hover:bg-[#ff7a42]' : 'bg-[#0B0F2E] text-white hover:bg-[#12183f]'
          }`}
        >
          {cta}
        </button>
      </motion.div>

      <PaymentModal
        open={showModal}
        onClose={() => setShowModal(false)}
        planTitle={title}
        planPrice={price}
      />
    </>
  );
}
