import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  adminLogin,
  adminLogout,
  getMe,
  listLeads,
  updateLead,
  deleteLead,
  exportLeadsCSV,
  listPayments,
  listChatSessions,
} from '../utils/api';

// ─── helpers ──────────────────────────────────────────────────────────────────

function StatusBadge({ status }) {
  const map = {
    new: 'bg-blue-100 text-blue-700',
    contacted: 'bg-yellow-100 text-yellow-700',
    qualified: 'bg-purple-100 text-purple-700',
    converted: 'bg-green-100 text-green-700',
    lost: 'bg-red-100 text-red-700',
    paid: 'bg-green-100 text-green-700',
    created: 'bg-slate-100 text-slate-600',
    failed: 'bg-red-100 text-red-700',
  };
  return (
    <span className={`rounded-full px-2 py-0.5 text-[10px] font-bold uppercase ${map[status] || 'bg-slate-100 text-slate-600'}`}>
      {status}
    </span>
  );
}

// ─── Leads Tab ─────────────────────────────────────────────────────────────────

function LeadsTab() {
  const [leads, setLeads] = React.useState([]);
  const [total, setTotal] = React.useState(0);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState('');
  const [page, setPage] = React.useState(1);
  const [search, setSearch] = React.useState('');
  const [exporting, setExporting] = React.useState(false);
  const limit = 25;

  const fetchLeads = React.useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const data = await listLeads({ page, limit, q: search || undefined });
      setLeads(data.items || []);
      setTotal(data.total || 0);
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }, [page, search]);

  React.useEffect(() => { fetchLeads(); }, [fetchLeads]);

  async function handleStatusChange(id, status) {
    try { await updateLead(id, { status }); fetchLeads(); }
    catch (e) { alert(e.message); }
  }

  async function handleDelete(id) {
    if (!window.confirm('Delete this lead?')) return;
    try { await deleteLead(id); fetchLeads(); }
    catch (e) { alert(e.message); }
  }

  async function handleExport() {
    setExporting(true);
    try {
      const blob = await exportLeadsCSV();
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `leads-${Date.now()}.csv`;
      a.click();
      URL.revokeObjectURL(url);
    } catch (e) { alert(e.message); }
    finally { setExporting(false); }
  }

  const totalPages = Math.max(Math.ceil(total / limit), 1);

  return (
    <div className="mt-4">
      <div className="mb-3 flex flex-wrap items-center gap-2">
        <input
          value={search}
          onChange={(e) => { setSearch(e.target.value); setPage(1); }}
          placeholder="Search name / email…"
          className="rounded-md border px-3 py-1.5 text-sm flex-1 min-w-[140px]"
        />
        <button onClick={fetchLeads} className="rounded-md bg-slate-100 px-3 py-1.5 text-sm hover:bg-slate-200">Refresh</button>
        <button onClick={handleExport} disabled={exporting} className="rounded-md bg-[#0B72FF] px-3 py-1.5 text-sm text-white disabled:opacity-60 hover:bg-blue-600">
          {exporting ? 'Exporting…' : 'Export CSV'}
        </button>
      </div>

      <div className="text-xs text-gray-500 mb-2">{total} total leads</div>

      {error && <p className="text-sm text-red-600 mb-2">{error}</p>}
      {loading ? (
        <p className="text-sm text-gray-400">Loading…</p>
      ) : leads.length === 0 ? (
        <p className="text-sm text-gray-400">No leads found.</p>
      ) : (
        <div className="overflow-x-auto rounded-md border shadow-sm">
          <table className="w-full table-auto text-sm">
            <thead className="bg-slate-50 text-xs text-gray-500">
              <tr>
                <th className="px-3 py-2 text-left">Name</th>
                <th className="px-3 py-2 text-left">Email</th>
                <th className="px-3 py-2 text-left">Phone</th>
                <th className="px-3 py-2 text-left">Source</th>
                <th className="px-3 py-2 text-left">Status</th>
                <th className="px-3 py-2 text-left">Date</th>
                <th className="px-3 py-2 text-left">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {leads.map((l) => (
                <tr key={l._id} className="hover:bg-slate-50">
                  <td className="px-3 py-2 font-medium">{l.name}</td>
                  <td className="px-3 py-2 text-gray-600">{l.email}</td>
                  <td className="px-3 py-2 text-gray-500">{l.phone || '—'}</td>
                  <td className="px-3 py-2 text-gray-500">{l.source || '—'}</td>
                  <td className="px-3 py-2">
                    <select
                      value={l.status}
                      onChange={(e) => handleStatusChange(l._id, e.target.value)}
                      className="rounded border px-1.5 py-0.5 text-xs bg-white"
                    >
                      {['new', 'contacted', 'qualified', 'converted', 'lost'].map(s => (
                        <option key={s} value={s}>{s}</option>
                      ))}
                    </select>
                  </td>
                  <td className="px-3 py-2 text-gray-400 whitespace-nowrap">
                    {new Date(l.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-3 py-2">
                    <button onClick={() => handleDelete(l._id)} className="text-xs text-red-500 hover:underline">Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Pagination */}
      <div className="mt-3 flex items-center gap-2 text-sm">
        <button disabled={page <= 1} onClick={() => setPage(p => p - 1)} className="rounded border px-2 py-1 disabled:opacity-40 hover:bg-slate-50">← Prev</button>
        <span className="text-gray-500">Page {page} / {totalPages}</span>
        <button disabled={page >= totalPages} onClick={() => setPage(p => p + 1)} className="rounded border px-2 py-1 disabled:opacity-40 hover:bg-slate-50">Next →</button>
      </div>
    </div>
  );
}

// ─── Payments Tab ──────────────────────────────────────────────────────────────

function PaymentsTab() {
  const [payments, setPayments] = React.useState([]);
  const [total, setTotal] = React.useState(0);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState('');
  const [page, setPage] = React.useState(1);
  const limit = 25;

  const fetchPayments = React.useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const data = await listPayments({ page, limit });
      setPayments(data.items || []);
      setTotal(data.total || 0);
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }, [page]);

  React.useEffect(() => { fetchPayments(); }, [fetchPayments]);

  const totalPages = Math.max(Math.ceil(total / limit), 1);

  return (
    <div className="mt-4">
      <div className="text-xs text-gray-500 mb-2">{total} total payments</div>
      {error && <p className="text-sm text-red-600 mb-2">{error}</p>}
      {loading ? (
        <p className="text-sm text-gray-400">Loading…</p>
      ) : payments.length === 0 ? (
        <p className="text-sm text-gray-400">No payments yet.</p>
      ) : (
        <div className="overflow-x-auto rounded-md border shadow-sm">
          <table className="w-full table-auto text-sm">
            <thead className="bg-slate-50 text-xs text-gray-500">
              <tr>
                <th className="px-3 py-2 text-left">Name</th>
                <th className="px-3 py-2 text-left">Email</th>
                <th className="px-3 py-2 text-left">Plan</th>
                <th className="px-3 py-2 text-left">Amount</th>
                <th className="px-3 py-2 text-left">Status</th>
                <th className="px-3 py-2 text-left">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {payments.map((p) => (
                <tr key={p._id} className="hover:bg-slate-50">
                  <td className="px-3 py-2 font-medium">{p.name}</td>
                  <td className="px-3 py-2 text-gray-600">{p.email}</td>
                  <td className="px-3 py-2">{p.planTitle || p.planId}</td>
                  <td className="px-3 py-2">₹{(p.amount / 100).toLocaleString('en-IN')}</td>
                  <td className="px-3 py-2"><StatusBadge status={p.status} /></td>
                  <td className="px-3 py-2 text-gray-400 whitespace-nowrap">
                    {new Date(p.createdAt).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      <div className="mt-3 flex items-center gap-2 text-sm">
        <button disabled={page <= 1} onClick={() => setPage(p => p - 1)} className="rounded border px-2 py-1 disabled:opacity-40 hover:bg-slate-50">← Prev</button>
        <span className="text-gray-500">Page {page} / {totalPages}</span>
        <button disabled={page >= totalPages} onClick={() => setPage(p => p + 1)} className="rounded border px-2 py-1 disabled:opacity-40 hover:bg-slate-50">Next →</button>
      </div>
    </div>
  );
}

// ─── Chat Sessions Tab ─────────────────────────────────────────────────────────

function ChatSessionsTab() {
  const [sessions, setSessions] = React.useState([]);
  const [total, setTotal] = React.useState(0);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState('');
  const [page, setPage] = React.useState(1);
  const limit = 20;

  const fetchSessions = React.useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const data = await listChatSessions({ page, limit });
      setSessions(data.items || []);
      setTotal(data.total || 0);
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }, [page]);

  React.useEffect(() => { fetchSessions(); }, [fetchSessions]);

  const totalPages = Math.max(Math.ceil(total / limit), 1);

  return (
    <div className="mt-4">
      <div className="text-xs text-gray-500 mb-2">{total} total chat sessions</div>
      {error && <p className="text-sm text-red-600 mb-2">{error}</p>}
      {loading ? (
        <p className="text-sm text-gray-400">Loading…</p>
      ) : sessions.length === 0 ? (
        <p className="text-sm text-gray-400">No chat sessions yet.</p>
      ) : (
        <div className="overflow-x-auto rounded-md border shadow-sm">
          <table className="w-full table-auto text-sm">
            <thead className="bg-slate-50 text-xs text-gray-500">
              <tr>
                <th className="px-3 py-2 text-left">Session ID</th>
                <th className="px-3 py-2 text-left">Messages</th>
                <th className="px-3 py-2 text-left">Last Message</th>
                <th className="px-3 py-2 text-left">Updated</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {sessions.map((s) => (
                <tr key={s.sessionId} className="hover:bg-slate-50">
                  <td className="px-3 py-2 font-mono text-xs text-gray-500">{s.sessionId.slice(0, 12)}…</td>
                  <td className="px-3 py-2">{s.messageCount}</td>
                  <td className="px-3 py-2 text-gray-600 max-w-xs truncate">{s.lastMessage || '—'}</td>
                  <td className="px-3 py-2 text-gray-400 whitespace-nowrap">
                    {new Date(s.updatedAt).toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      <div className="mt-3 flex items-center gap-2 text-sm">
        <button disabled={page <= 1} onClick={() => setPage(p => p - 1)} className="rounded border px-2 py-1 disabled:opacity-40 hover:bg-slate-50">← Prev</button>
        <span className="text-gray-500">Page {page} / {totalPages}</span>
        <button disabled={page >= totalPages} onClick={() => setPage(p => p + 1)} className="rounded border px-2 py-1 disabled:opacity-40 hover:bg-slate-50">Next →</button>
      </div>
    </div>
  );
}

// ─── Main AdminPanel Page ─────────────────────────────────────────────────────────

const TABS = ['leads', 'payments', 'chat'];

export default function AtyantLoginPage() {
  const [authed, setAuthed] = React.useState(false);
  const [adminInfo, setAdminInfo] = React.useState(null);
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [loginError, setLoginError] = React.useState('');
  const [logging, setLogging] = React.useState(false);
  const [tab, setTab] = React.useState('leads');
  const navigate = useNavigate();

  // Try to restore session from stored token
  React.useEffect(() => {
    const token = localStorage.getItem('admin_token');
    if (token) {
      getMe()
        .then((d) => { setAdminInfo(d.admin); setAuthed(true); })
        .catch(() => { localStorage.removeItem('admin_token'); });
    }
  }, []);

  async function handleLogin(e) {
    e.preventDefault();
    setLogging(true);
    setLoginError('');
    try {
      const data = await adminLogin({ email, password });
      setAdminInfo(data.admin);
      setAuthed(true);
    } catch (err) {
      setLoginError(err.message || 'Login failed');
    } finally {
      setLogging(false);
    }
  }

  function handleLogout() {
    adminLogout();
    setAuthed(false);
    setAdminInfo(null);
  }

  return (
    <div className="min-h-screen bg-slate-50 px-4 py-8 sm:px-6 lg:px-8">
      <div className="w-full max-w-5xl mx-auto rounded-2xl bg-white p-6 shadow-xl border border-slate-100">
        {/* Header */}
        <div className="flex items-center justify-between mb-4 border-b border-slate-100 pb-4">
          <div>
            <h3 className="text-xl font-bold text-[#0B0F2E]">Atyant Admin Dashboard</h3>
            {adminInfo && (
              <p className="text-sm text-gray-500 mt-1">{adminInfo.email}</p>
            )}
          </div>
          <div className="flex items-center gap-4">
            {authed && (
              <button onClick={handleLogout} className="text-sm font-semibold text-red-500 hover:text-red-600 transition">Log out</button>
            )}
            <button onClick={() => navigate('/')} className="text-sm font-semibold text-gray-600 hover:text-gray-900 transition">← Back to Home</button>
          </div>
        </div>

        {/* Login Form */}
        {!authed ? (
          <div className="flex flex-col items-center justify-center py-20">
            <form onSubmit={handleLogin} className="w-full max-w-sm space-y-4">
              <div className="text-center mb-6">
                <h2 className="text-2xl font-black text-[#0B0F2E]">Admin Login</h2>
                <p className="text-sm text-gray-500 mt-1">Log in with your admin credentials.</p>
              </div>
              
              {loginError && (
                <p className="rounded-md bg-red-50 px-3 py-2 text-sm text-red-600 border border-red-100">{loginError}</p>
              )}
              
              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">Email Address</label>
                <input
                  required
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@atyant.in"
                  className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#FF6B2B]/40"
                />
              </div>
              
              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">Password</label>
                <input
                  required
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#FF6B2B]/40"
                />
              </div>
              
              <button
                type="submit"
                disabled={logging}
                className="w-full rounded-xl bg-[#FF6B2B] py-3 text-sm font-bold text-white hover:bg-[#e05a1f] transition disabled:opacity-60 shadow-lg shadow-[#FF6B2B]/20 mt-4"
              >
                {logging ? 'Authenticating…' : 'Log In Securely'}
              </button>
            </form>
          </div>
        ) : (
          <>
            {/* Tabs */}
            <div className="flex gap-2 mt-2 border-b border-slate-200">
              {TABS.map((t) => (
                <button
                  key={t}
                  onClick={() => setTab(t)}
                  className={`px-6 py-3 text-sm font-bold capitalize transition-colors border-b-2 ${
                    tab === t
                      ? 'border-[#FF6B2B] text-[#FF6B2B]'
                      : 'border-transparent text-gray-500 hover:text-gray-800 hover:border-gray-300'
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>

            <div className="mt-6">
              {tab === 'leads' && <LeadsTab />}
              {tab === 'payments' && <PaymentsTab />}
              {tab === 'chat' && <ChatSessionsTab />}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
