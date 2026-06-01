import { useState } from 'react';
import { Key, Plus, X, Share2, Copy, CheckCircle, Clock, AlertTriangle, Ban, QrCode, Phone, MapPin, Calendar, MessageCircle } from 'lucide-react';
import { DEMO_PASSES, type VisitorPass, type PassStatus } from '@/data/demo';
import { timeAgo, formatDateTime } from '@/lib/utils';

const FLATS = [
  { flat: 'A-101', block: 'A', name: 'Mrs. Sunita Verma', phone: '9810001002' },
  { flat: 'A-203', block: 'A', name: 'Mrs. Kavitha Rajan', phone: '9810001006' },
  { flat: 'B-102', block: 'B', name: 'Lt. Col. Vinod Nair', phone: '9810001005' },
  { flat: 'B-204', block: 'B', name: 'Col. Rajiv Sharma', phone: '9810001001' },
  { flat: 'C-305', block: 'C', name: 'Brig. Anil Kumar', phone: '9810001003' },
  { flat: 'D-410', block: 'D', name: 'Maj. Deepak Singh', phone: '9810001004' },
];

const PURPOSES = ['Personal Visit', 'Courier / Delivery', 'Domestic Help', 'Maintenance', 'Medical / Doctor Visit', 'Business', 'Service / Repair', 'Other'];

const statusConfig: Record<PassStatus, { label: string; bg: string; color: string; border: string; icon: React.ElementType }> = {
  active:    { label: 'Active',    bg: '#F0FDF4', color: '#15803D', border: '#BBF7D0', icon: CheckCircle },
  used:      { label: 'Used',      bg: '#EFF6FF', color: '#1D4ED8', border: '#BFDBFE', icon: CheckCircle },
  expired:   { label: 'Expired',   bg: '#FFF7ED', color: '#C2410C', border: '#FED7AA', icon: Clock },
  cancelled: { label: 'Cancelled', bg: '#F1F5F9', color: '#64748B', border: '#E2E8F0', icon: Ban },
};

function CodeBadge({ code, size = 'md' }: { code: string; size?: 'sm' | 'md' | 'lg' }) {
  const [copied, setCopied] = useState(false);
  const copy = () => {
    navigator.clipboard.writeText(code).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  const fs = size === 'lg' ? 28 : size === 'md' ? 20 : 14;
  return (
    <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
      <span style={{
        fontFamily: 'monospace', fontSize: fs, fontWeight: 800, letterSpacing: 6,
        background: '#0F172A', color: '#60A5FA', padding: '6px 14px', borderRadius: 10,
      }}>{code}</span>
      <button onClick={copy} style={{ background: 'none', border: 'none', cursor: 'pointer', color: copied ? '#16A34A' : '#94A3B8', display: 'flex', padding: 4 }}>
        {copied ? <CheckCircle size={16} /> : <Copy size={16} />}
      </button>
    </div>
  );
}

function PassCard({ pass, onCancel }: { pass: VisitorPass; onCancel: (id: string) => void }) {
  const cfg = statusConfig[pass.status];
  const StatusIcon = cfg.icon;
  const isActive = pass.status === 'active';
  const notYetValid = isActive && new Date(pass.valid_from) > new Date();

  const shareWhatsApp = () => {
    const msg = encodeURIComponent(
      `🛡️ *SYOS Secure Society — Visitor Pass*\n\n` +
      `Your pass code for *${pass.resident_name}* at Flat *${pass.flat_number}*:\n\n` +
      `🔑 *Code: ${pass.code}*\n\n` +
      `📋 Purpose: ${pass.purpose}\n` +
      `⏰ Valid: ${formatDateTime(pass.valid_from)} – ${formatDateTime(pass.valid_until)}\n\n` +
      `Show this code to the security guard at the main gate.\n` +
      `_Powered by SYOS Enterprises_`
    );
    window.open(`https://wa.me/?text=${msg}`, '_blank');
  };

  return (
    <div style={{
      background: 'white', borderRadius: 16, overflow: 'hidden',
      border: `1px solid ${isActive ? cfg.border : '#F1F5F9'}`,
      boxShadow: isActive ? '0 4px 16px rgba(0,0,0,0.07)' : '0 1px 3px rgba(0,0,0,0.05)',
      opacity: pass.status === 'cancelled' ? 0.7 : 1,
    }}>
      {/* Status bar */}
      <div style={{ background: cfg.bg, borderBottom: `1px solid ${cfg.border}`, padding: '8px 16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <StatusIcon size={13} style={{ color: cfg.color }} />
          <span style={{ fontSize: 11, fontWeight: 700, color: cfg.color, textTransform: 'uppercase', letterSpacing: '0.05em' }}>{cfg.label}</span>
          {notYetValid && <span style={{ fontSize: 10, background: '#FFFBEB', color: '#B45309', padding: '1px 6px', borderRadius: 999, fontWeight: 600 }}>Not yet valid</span>}
        </div>
        <span style={{ fontSize: 11, color: '#94A3B8' }}>{timeAgo(pass.created_at)}</span>
      </div>

      <div style={{ padding: 16 }}>
        {/* Code + Flat */}
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 12, marginBottom: 14 }}>
          <div>
            <p style={{ fontSize: 10, fontWeight: 600, color: '#94A3B8', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 4 }}>One-Time Code</p>
            <CodeBadge code={pass.code} size="md" />
          </div>
          <div style={{ textAlign: 'right' }}>
            <p style={{ fontSize: 10, fontWeight: 600, color: '#94A3B8', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 4 }}>Host Flat</p>
            <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
              <span style={{ fontSize: 16, fontWeight: 800, color: '#0F172A' }}>{pass.flat_number}</span>
              <span style={{ fontSize: 11, color: '#94A3B8' }}>Block {pass.block}</span>
            </div>
            <p style={{ fontSize: 12, color: '#64748B', marginTop: 2 }}>{pass.resident_name}</p>
          </div>
        </div>

        {/* Visitor info */}
        <div style={{ background: '#F8FAFC', borderRadius: 10, padding: '10px 12px', marginBottom: 12 }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
            {[
              ['Visitor', pass.visitor_name],
              ['Mobile',  pass.visitor_mobile],
              ['Purpose', pass.purpose],
              ['Vehicle', pass.vehicle_number || '—'],
            ].map(([k, v]) => (
              <div key={k}>
                <p style={{ fontSize: 10, color: '#94A3B8', fontWeight: 600, marginBottom: 1 }}>{k}</p>
                <p style={{ fontSize: 12, fontWeight: 600, color: '#1E293B' }}>{v}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Time window */}
        <div style={{ display: 'flex', gap: 6, alignItems: 'center', marginBottom: 12, fontSize: 11, color: '#64748B' }}>
          <Clock size={12} style={{ flexShrink: 0, color: isActive ? '#16A34A' : '#94A3B8' }} />
          <span>Valid: <strong>{formatDateTime(pass.valid_from)}</strong> → <strong>{formatDateTime(pass.valid_until)}</strong></span>
        </div>

        {/* Used info */}
        {pass.status === 'used' && pass.used_at && (
          <div style={{ background: '#EFF6FF', border: '1px solid #BFDBFE', borderRadius: 8, padding: '7px 10px', marginBottom: 12, fontSize: 11, color: '#1D4ED8', display: 'flex', alignItems: 'center', gap: 6 }}>
            <CheckCircle size={12} /> Entry granted at {formatDateTime(pass.used_at)}
          </div>
        )}

        {/* Actions */}
        {isActive && (
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            <button onClick={shareWhatsApp} style={{
              flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6,
              background: '#25D366', color: 'white', border: 'none', borderRadius: 9,
              padding: '9px 12px', fontSize: 12, fontWeight: 700, cursor: 'pointer', minWidth: 130,
            }}>
              <MessageCircle size={14} /> Share via WhatsApp
            </button>
            <button onClick={() => onCancel(pass.id)} style={{
              display: 'flex', alignItems: 'center', gap: 5, padding: '9px 12px', borderRadius: 9,
              background: '#FFF1F2', color: '#BE123C', border: '1px solid #FECDD3',
              fontSize: 12, fontWeight: 600, cursor: 'pointer',
            }}>
              <X size={13} /> Cancel
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default function VisitorPasses() {
  const [passes, setPasses] = useState<VisitorPass[]>(DEMO_PASSES);
  const [showForm, setShowForm] = useState(false);
  const [statusFilter, setStatusFilter] = useState<PassStatus | 'all'>('all');
  const [newPass, setNewPass] = useState<VisitorPass | null>(null);
  const [form, setForm] = useState({
    flat_number: '', visitor_name: '', visitor_mobile: '', purpose: '',
    valid_from: '', valid_until: '',
  });

  const filtered = passes.filter(p => statusFilter === 'all' || p.status === statusFilter);

  const handleGenerate = (e: React.FormEvent) => {
    e.preventDefault();
    const flat = FLATS.find(f => f.flat === form.flat_number);
    const code = Array.from({ length: 6 }, () => 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'[Math.floor(Math.random() * 33)]).join('');
    const pass: VisitorPass = {
      id: `p${Date.now()}`,
      code,
      flat_number: form.flat_number,
      block: flat?.flat[0] || 'A',
      resident_name: flat?.name || 'Resident',
      resident_phone: flat?.phone || '',
      visitor_name: form.visitor_name,
      visitor_mobile: form.visitor_mobile,
      purpose: form.purpose,
      valid_from: form.valid_from || new Date().toISOString(),
      valid_until: form.valid_until || new Date(Date.now() + 4 * 3600000).toISOString(),
      status: 'active',
      used_at: null,
      vehicle_number: null,
      created_at: new Date().toISOString(),
    };
    setPasses([pass, ...passes]);
    setNewPass(pass);
    setShowForm(false);
    setForm({ flat_number: '', visitor_name: '', visitor_mobile: '', purpose: '', valid_from: '', valid_until: '' });
  };

  const cancelPass = (id: string) => {
    setPasses(passes.map(p => p.id === id ? { ...p, status: 'cancelled' } : p));
    if (newPass?.id === id) setNewPass(null);
  };

  // Counts
  const counts = { active: 0, used: 0, expired: 0, cancelled: 0 };
  passes.forEach(p => counts[p.status]++);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>

      {/* Header */}
      <div className="page-header">
        <div>
          <h2 style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <Key size={20} style={{ color: '#2563EB' }} /> Pre-Approved Visitor Codes
          </h2>
          <p>Generate one-time codes for expected visitors</p>
        </div>
        <button onClick={() => { setShowForm(true); setNewPass(null); }} className="btn btn-primary">
          <Plus size={15} /> Generate Code
        </button>
      </div>

      {/* Newly generated pass — celebration */}
      {newPass && (
        <div style={{
          background: 'linear-gradient(135deg, #0F172A, #1E3A5F)', borderRadius: 16, padding: 20, color: 'white',
          border: '2px solid #2563EB', boxShadow: '0 8px 32px rgba(37,99,235,0.25)',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
            <CheckCircle size={18} style={{ color: '#4ADE80' }} />
            <span style={{ fontWeight: 700, fontSize: 15 }}>Pass Generated Successfully!</span>
            <button onClick={() => setNewPass(null)} style={{ marginLeft: 'auto', background: 'none', border: 'none', cursor: 'pointer', color: '#64748B' }}><X size={16} /></button>
          </div>
          <p style={{ fontSize: 13, color: '#94A3B8', marginBottom: 16 }}>
            Share this code with <strong style={{ color: 'white' }}>{newPass.visitor_name}</strong> for entry at <strong style={{ color: 'white' }}>Flat {newPass.flat_number}</strong>
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12 }}>
            <CodeBadge code={newPass.code} size="lg" />
            <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', justifyContent: 'center' }}>
              <button onClick={() => {
                const msg = encodeURIComponent(`🛡️ SYOS Visitor Pass\n\nCode: ${newPass.code}\nFor: ${newPass.flat_number}\nValid until: ${formatDateTime(newPass.valid_until)}`);
                window.open(`https://wa.me/?text=${msg}`, '_blank');
              }} style={{ display: 'flex', alignItems: 'center', gap: 6, background: '#25D366', color: 'white', border: 'none', borderRadius: 10, padding: '10px 18px', fontWeight: 700, fontSize: 13, cursor: 'pointer' }}>
                <MessageCircle size={15} /> Share via WhatsApp
              </button>
              <button onClick={() => navigator.clipboard.writeText(newPass.code).catch(() => {})} style={{ display: 'flex', alignItems: 'center', gap: 6, background: 'rgba(255,255,255,0.1)', color: 'white', border: '1px solid rgba(255,255,255,0.2)', borderRadius: 10, padding: '10px 18px', fontWeight: 600, fontSize: 13, cursor: 'pointer' }}>
                <Copy size={15} /> Copy Code
              </button>
            </div>
          </div>
          <div style={{ marginTop: 14, display: 'flex', gap: 16, flexWrap: 'wrap', fontSize: 12, color: '#64748B', borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: 12 }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}><Clock size={11} /> Valid from: {formatDateTime(newPass.valid_from)}</span>
            <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}><Clock size={11} /> Until: {formatDateTime(newPass.valid_until)}</span>
          </div>
        </div>
      )}

      {/* Generate Form */}
      {showForm && (
        <div className="card" style={{ borderColor: '#BFDBFE' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
            <h3 style={{ fontSize: 15, fontWeight: 700, color: '#1E293B', display: 'flex', alignItems: 'center', gap: 8 }}>
              <Key size={15} style={{ color: '#2563EB' }} /> Generate Visitor Pass
            </h3>
            <button onClick={() => setShowForm(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#94A3B8' }}><X size={18} /></button>
          </div>

          <form onSubmit={handleGenerate}>
            <div className="form-grid">
              <div>
                <label className="field-label">Host Flat / Your Flat *</label>
                <select className="input" required value={form.flat_number} onChange={e => setForm({ ...form, flat_number: e.target.value })}>
                  <option value="">Select your flat</option>
                  {FLATS.map(f => <option key={f.flat} value={f.flat}>{f.flat} — {f.name}</option>)}
                </select>
              </div>
              <div>
                <label className="field-label">Visitor Name *</label>
                <input className="input" required placeholder="Full name of visitor" value={form.visitor_name} onChange={e => setForm({ ...form, visitor_name: e.target.value })} />
              </div>
              <div>
                <label className="field-label">Visitor Mobile *</label>
                <input className="input" required placeholder="10-digit mobile number" value={form.visitor_mobile} onChange={e => setForm({ ...form, visitor_mobile: e.target.value })} />
              </div>
              <div>
                <label className="field-label">Purpose *</label>
                <select className="input" required value={form.purpose} onChange={e => setForm({ ...form, purpose: e.target.value })}>
                  <option value="">Select purpose</option>
                  {PURPOSES.map(p => <option key={p}>{p}</option>)}
                </select>
              </div>
              <div>
                <label className="field-label">Valid From *</label>
                <input className="input" type="datetime-local" required value={form.valid_from} onChange={e => setForm({ ...form, valid_from: e.target.value })} />
              </div>
              <div>
                <label className="field-label">Valid Until *</label>
                <input className="input" type="datetime-local" required value={form.valid_until} onChange={e => setForm({ ...form, valid_until: e.target.value })} />
              </div>
            </div>
            <div style={{ marginTop: 14, background: '#FFFBEB', border: '1px solid #FDE68A', borderRadius: 9, padding: '9px 12px', fontSize: 12, color: '#92400E', marginBottom: 14 }}>
              ⚠️ This code can be used <strong>only once</strong>. It expires automatically after the selected time window.
            </div>
            <div style={{ display: 'flex', gap: 10 }}>
              <button type="submit" className="btn btn-primary"><Key size={14} /> Generate 6-Digit Code</button>
              <button type="button" className="btn btn-ghost" onClick={() => setShowForm(false)}>Cancel</button>
            </div>
          </form>
        </div>
      )}

      {/* Stats strip */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 10 }}>
        {[
          { label: 'Active',    value: counts.active,    bg: '#F0FDF4', c: '#15803D' },
          { label: 'Used',      value: counts.used,      bg: '#EFF6FF', c: '#1D4ED8' },
          { label: 'Expired',   value: counts.expired,   bg: '#FFF7ED', c: '#C2410C' },
          { label: 'Cancelled', value: counts.cancelled, bg: '#F1F5F9', c: '#64748B' },
        ].map(s => (
          <div key={s.label} style={{ background: s.bg, borderRadius: 12, padding: '12px 10px', textAlign: 'center' }}>
            <div style={{ fontSize: 22, fontWeight: 800, color: s.c }}>{s.value}</div>
            <div style={{ fontSize: 11, fontWeight: 600, color: s.c, opacity: 0.75 }}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
        {(['all', 'active', 'used', 'expired', 'cancelled'] as const).map(s => (
          <button key={s} onClick={() => setStatusFilter(s)}
            className={`btn btn-sm ${statusFilter === s ? 'btn-primary' : 'btn-ghost'}`}
            style={{ textTransform: 'capitalize' }}>
            {s} {s !== 'all' && <span style={{ opacity: 0.7 }}>({counts[s as PassStatus] ?? 0})</span>}
          </button>
        ))}
      </div>

      {/* Pass cards */}
      {filtered.length === 0 ? (
        <div className="card" style={{ textAlign: 'center', padding: 40 }}>
          <QrCode size={36} style={{ color: '#CBD5E1', margin: '0 auto 10px' }} />
          <p style={{ fontWeight: 600, color: '#64748B' }}>No passes found</p>
          <p style={{ fontSize: 12, color: '#94A3B8' }}>Generate a code to let your visitor in</p>
        </div>
      ) : (
        <div className="two-col">
          {filtered.map(p => <PassCard key={p.id} pass={p} onCancel={cancelPass} />)}
        </div>
      )}
    </div>
  );
}
