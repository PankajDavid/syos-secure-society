import { useState, useRef } from 'react';
import { Shield, Search, CheckCircle, AlertTriangle, XCircle, Clock, MapPin, Phone, User, Car, Camera, ArrowRight, Ban, Key } from 'lucide-react';
import { DEMO_PASSES, type VisitorPass } from '@/data/demo';
import { formatDateTime, timeAgo } from '@/lib/utils';

type VerifyState = 'idle' | 'loading' | 'valid' | 'used' | 'expired' | 'cancelled' | 'invalid';

interface VerifyResult {
  state: VerifyState;
  pass?: VisitorPass;
  error?: string;
}

function TimeBar({ pass }: { pass: VisitorPass }) {
  const from = new Date(pass.valid_from).getTime();
  const until = new Date(pass.valid_until).getTime();
  const now = Date.now();
  const pct = Math.min(100, Math.max(0, ((now - from) / (until - from)) * 100));
  const remaining = until - now;
  const mins = Math.floor(remaining / 60000);
  const hrs = Math.floor(mins / 60);
  const label = hrs > 0 ? `${hrs}h ${mins % 60}m remaining` : `${mins}m remaining`;

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, color: '#64748B', marginBottom: 4 }}>
        <span>{formatDateTime(pass.valid_from)}</span>
        <span style={{ color: '#16A34A', fontWeight: 600 }}>{label}</span>
        <span>{formatDateTime(pass.valid_until)}</span>
      </div>
      <div style={{ height: 6, background: '#F1F5F9', borderRadius: 999, overflow: 'hidden' }}>
        <div style={{ height: '100%', width: `${pct}%`, background: 'linear-gradient(90deg, #16A34A, #4ADE80)', borderRadius: 999 }} />
      </div>
    </div>
  );
}

export default function GateVerify() {
  const [input, setInput] = useState('');
  const [result, setResult] = useState<VerifyResult>({ state: 'idle' });
  const [passes, setPasses] = useState(DEMO_PASSES);
  const [entryForm, setEntryForm] = useState({ vehicle_number: '', notes: '' });
  const [entryComplete, setEntryComplete] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const verify = () => {
    const code = input.trim().toUpperCase();
    if (!code) return;
    setResult({ state: 'loading' });
    setEntryComplete(false);
    setEntryForm({ vehicle_number: '', notes: '' });

    setTimeout(() => {
      const pass = passes.find(p => p.code === code);
      if (!pass) { setResult({ state: 'invalid', error: 'No valid pre-approved pass found for this code.' }); return; }
      if (pass.status === 'used')      { setResult({ state: 'used',      pass, error: 'This code has already been used.' }); return; }
      if (pass.status === 'cancelled') { setResult({ state: 'cancelled', pass, error: 'This pass has been cancelled by the resident.' }); return; }
      if (pass.status === 'expired' || new Date(pass.valid_until) < new Date()) {
        setResult({ state: 'expired', pass, error: 'This code has expired. The valid window has passed.' }); return;
      }
      if (new Date(pass.valid_from) > new Date()) {
        setResult({ state: 'expired', pass, error: `This pass is not yet active. Valid from ${formatDateTime(pass.valid_from)}.` }); return;
      }
      setResult({ state: 'valid', pass });
    }, 900);
  };

  const allowEntry = () => {
    if (!result.pass) return;
    setPasses(passes.map(p => p.id === result.pass!.id
      ? { ...p, status: 'used' as const, used_at: new Date().toISOString(), vehicle_number: entryForm.vehicle_number || null }
      : p
    ));
    setResult(prev => ({ ...prev, pass: { ...prev.pass!, status: 'used', used_at: new Date().toISOString() } }));
    setEntryComplete(true);
  };

  const reset = () => { setResult({ state: 'idle' }); setInput(''); setEntryComplete(false); inputRef.current?.focus(); };

  const stateConfig = {
    valid:     { bg: '#F0FDF4', border: '#BBF7D0', headerBg: '#16A34A', icon: CheckCircle, title: 'Valid Pass — Allow Entry', iconColor: 'white' },
    used:      { bg: '#FFF1F2', border: '#FECDD3', headerBg: '#DC2626', icon: XCircle,    title: 'Code Already Used',        iconColor: 'white' },
    expired:   { bg: '#FFF7ED', border: '#FED7AA', headerBg: '#EA580C', icon: Clock,      title: 'Pass Expired',             iconColor: 'white' },
    cancelled: { bg: '#F1F5F9', border: '#E2E8F0', headerBg: '#64748B', icon: Ban,        title: 'Pass Cancelled',           iconColor: 'white' },
    invalid:   { bg: '#FFF1F2', border: '#FECDD3', headerBg: '#DC2626', icon: AlertTriangle, title: 'Invalid Code',          iconColor: 'white' },
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>

      {/* Header */}
      <div className="page-header">
        <div>
          <h2 style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <Shield size={20} style={{ color: '#2563EB' }} /> Gate — Code Verification
          </h2>
          <p>Verify pre-approved visitor codes at the main gate</p>
        </div>
      </div>

      {/* Code input */}
      <div className="card" style={{ background: 'linear-gradient(135deg, #0F172A, #1E293B)', border: 'none' }}>
        <p style={{ color: '#94A3B8', fontSize: 12, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 12 }}>
          Enter Visitor Code
        </p>
        <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
          <input
            ref={inputRef}
            value={input}
            onChange={e => setInput(e.target.value.toUpperCase())}
            onKeyDown={e => e.key === 'Enter' && verify()}
            placeholder="Enter 6-digit code  e.g. APX471"
            maxLength={6}
            style={{
              flex: 1, minWidth: 180, padding: '12px 16px',
              fontFamily: 'monospace', fontSize: 22, fontWeight: 800, letterSpacing: 8,
              background: 'rgba(255,255,255,0.08)', border: '2px solid rgba(255,255,255,0.15)',
              borderRadius: 12, color: '#60A5FA', outline: 'none', textTransform: 'uppercase',
            }}
            onFocus={e => (e.target.style.borderColor = '#2563EB')}
            onBlur={e => (e.target.style.borderColor = 'rgba(255,255,255,0.15)')}
          />
          <button onClick={verify} disabled={result.state === 'loading'}
            style={{
              display: 'flex', alignItems: 'center', gap: 8, padding: '12px 24px',
              background: '#2563EB', color: 'white', border: 'none', borderRadius: 12,
              fontSize: 14, fontWeight: 700, cursor: 'pointer', whiteSpace: 'nowrap',
              opacity: result.state === 'loading' ? 0.7 : 1,
            }}>
            {result.state === 'loading'
              ? <><span className="animate-spin" style={{ display: 'inline-block', width: 16, height: 16, border: '2px solid white', borderTopColor: 'transparent', borderRadius: '50%' }} /> Checking…</>
              : <><Search size={16} /> Verify Code</>}
          </button>
        </div>

        {/* Quick demo codes */}
        <div style={{ marginTop: 12, display: 'flex', gap: 6, flexWrap: 'wrap' }}>
          <span style={{ fontSize: 11, color: '#475569', alignSelf: 'center' }}>Quick test:</span>
          {[
            { code: 'APX471', label: 'Active', color: '#16A34A' },
            { code: 'QRT892', label: 'Used', color: '#2563EB' },
            { code: 'MNB556', label: 'Expired', color: '#EA580C' },
            { code: 'LPQ781', label: 'Cancelled', color: '#64748B' },
            { code: 'XXXXXX', label: 'Invalid', color: '#DC2626' },
          ].map(({ code, label, color }) => (
            <button key={code} onClick={() => { setInput(code); setResult({ state: 'idle' }); setEntryComplete(false); }}
              style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 8, padding: '4px 10px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 5 }}>
              <span style={{ fontFamily: 'monospace', fontSize: 12, fontWeight: 700, color: '#E2E8F0' }}>{code}</span>
              <span style={{ fontSize: 10, color }}>{label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* ── Result panel ── */}
      {result.state !== 'idle' && result.state !== 'loading' && (
        <div style={{
          background: 'white', borderRadius: 16, overflow: 'hidden',
          border: `1px solid ${result.state in stateConfig ? stateConfig[result.state as keyof typeof stateConfig].border : '#F1F5F9'}`,
          boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
        }}>
          {/* Status header */}
          {result.state in stateConfig && (() => {
            const cfg = stateConfig[result.state as keyof typeof stateConfig];
            const Icon = cfg.icon;
            return (
              <div style={{ background: cfg.headerBg, padding: '14px 18px', display: 'flex', alignItems: 'center', gap: 10 }}>
                <Icon size={22} color={cfg.iconColor} />
                <span style={{ color: 'white', fontWeight: 800, fontSize: 16 }}>{cfg.title}</span>
                <button onClick={reset} style={{ marginLeft: 'auto', background: 'rgba(255,255,255,0.2)', border: 'none', color: 'white', borderRadius: 8, padding: '4px 10px', cursor: 'pointer', fontSize: 12, fontWeight: 600 }}>
                  New Search
                </button>
              </div>
            );
          })()}

          <div style={{ padding: 18 }}>
            {/* Error-only states */}
            {(result.state === 'invalid') && (
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12, padding: '20px 0', textAlign: 'center' }}>
                <AlertTriangle size={40} style={{ color: '#FCA5A5' }} />
                <p style={{ fontWeight: 700, fontSize: 16, color: '#1E293B' }}>{result.error}</p>
                <p style={{ fontSize: 13, color: '#64748B' }}>Please check the code and try again, or ask the visitor to contact the resident.</p>
                <button onClick={reset} className="btn btn-ghost">Try Another Code</button>
              </div>
            )}

            {/* Pass details for all states with a pass */}
            {result.pass && (
              <>
                {/* Error message for non-valid states */}
                {result.state !== 'valid' && (
                  <div style={{
                    display: 'flex', alignItems: 'center', gap: 8, padding: '10px 12px', borderRadius: 10, marginBottom: 16,
                    background: result.state === 'used' ? '#FFF1F2' : result.state === 'expired' ? '#FFF7ED' : '#F1F5F9',
                    border: `1px solid ${result.state === 'used' ? '#FECDD3' : result.state === 'expired' ? '#FED7AA' : '#E2E8F0'}`,
                  }}>
                    <AlertTriangle size={14} style={{ color: result.state === 'used' ? '#DC2626' : '#EA580C', flexShrink: 0 }} />
                    <span style={{ fontSize: 13, color: '#1E293B', fontWeight: 500 }}>{result.error}</span>
                  </div>
                )}

                {/* Host info */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 14 }}>
                  <div style={{ background: '#F8FAFC', borderRadius: 12, padding: '12px 14px' }}>
                    <p style={{ fontSize: 10, color: '#94A3B8', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 8 }}>Host / Resident</p>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
                      <span style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 13, fontWeight: 700, color: '#1E293B' }}><User size={12} style={{ color: '#2563EB' }} />{result.pass.resident_name}</span>
                      <span style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 12, color: '#64748B' }}><MapPin size={11} style={{ color: '#2563EB' }} />Flat {result.pass.flat_number}, Block {result.pass.block}</span>
                      <span style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 12, color: '#64748B' }}><Phone size={11} style={{ color: '#2563EB' }} />{result.pass.resident_phone}</span>
                    </div>
                  </div>

                  <div style={{ background: '#F8FAFC', borderRadius: 12, padding: '12px 14px' }}>
                    <p style={{ fontSize: 10, color: '#94A3B8', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 8 }}>Expected Visitor</p>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
                      <span style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 13, fontWeight: 700, color: '#1E293B' }}><User size={12} style={{ color: '#0D9488' }} />{result.pass.visitor_name}</span>
                      <span style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 12, color: '#64748B' }}><Phone size={11} style={{ color: '#0D9488' }} />{result.pass.visitor_mobile}</span>
                      <span style={{ fontSize: 11, background: '#EFF6FF', color: '#1D4ED8', padding: '2px 8px', borderRadius: 999, display: 'inline-block', fontWeight: 600, marginTop: 2 }}>{result.pass.purpose}</span>
                    </div>
                  </div>
                </div>

                {/* Time window bar (only for active) */}
                {result.state === 'valid' && !entryComplete && (
                  <div style={{ background: '#F0FDF4', border: '1px solid #BBF7D0', borderRadius: 12, padding: '12px 14px', marginBottom: 14 }}>
                    <p style={{ fontSize: 11, fontWeight: 700, color: '#15803D', marginBottom: 8 }}>Validity Window</p>
                    <TimeBar pass={result.pass} />
                  </div>
                )}

                {/* Used info */}
                {result.pass.status === 'used' && result.pass.used_at && (
                  <div style={{ background: '#EFF6FF', border: '1px solid #BFDBFE', borderRadius: 10, padding: '10px 14px', marginBottom: 14, fontSize: 12, color: '#1D4ED8', display: 'flex', alignItems: 'center', gap: 6 }}>
                    <CheckCircle size={14} /> Entry was granted at {formatDateTime(result.pass.used_at)}
                  </div>
                )}

                {/* ── Entry form (only for valid active pass) ── */}
                {result.state === 'valid' && !entryComplete && (
                  <div>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 12 }}>
                      <div>
                        <label className="field-label" style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
                          <Car size={11} /> Vehicle Number <span style={{ color: '#94A3B8' }}>(optional)</span>
                        </label>
                        <input className="input" placeholder="HR26AB1234" value={entryForm.vehicle_number}
                          onChange={e => setEntryForm({ ...entryForm, vehicle_number: e.target.value })} />
                      </div>
                      <div>
                        <label className="field-label" style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
                          <Camera size={11} /> Photo / Notes <span style={{ color: '#94A3B8' }}>(optional)</span>
                        </label>
                        <input className="input" placeholder="Guard notes…" value={entryForm.notes}
                          onChange={e => setEntryForm({ ...entryForm, notes: e.target.value })} />
                      </div>
                    </div>

                    <div style={{ background: '#FFFBEB', border: '1px solid #FDE68A', borderRadius: 10, padding: '10px 12px', marginBottom: 14, fontSize: 12, color: '#92400E' }}>
                      ✅ Verify visitor's name and mobile before allowing entry. This code will be marked <strong>Used</strong> and cannot be reused.
                    </div>

                    <button onClick={allowEntry} style={{
                      width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10,
                      background: 'linear-gradient(135deg, #16A34A, #15803D)', color: 'white',
                      border: 'none', borderRadius: 12, padding: '14px', fontSize: 15, fontWeight: 800, cursor: 'pointer',
                      boxShadow: '0 4px 16px rgba(22,163,74,0.3)',
                    }}>
                      <CheckCircle size={20} /> Allow Entry — Auto Approved
                    </button>
                  </div>
                )}

                {/* ── Entry complete ── */}
                {entryComplete && (
                  <div style={{ textAlign: 'center', padding: '20px 0' }}>
                    <div style={{ width: 64, height: 64, background: '#F0FDF4', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 14px' }}>
                      <CheckCircle size={36} style={{ color: '#16A34A' }} />
                    </div>
                    <p style={{ fontWeight: 800, fontSize: 18, color: '#1E293B', marginBottom: 6 }}>Entry Granted!</p>
                    <p style={{ fontSize: 13, color: '#64748B', marginBottom: 4 }}>
                      <strong>{result.pass.visitor_name}</strong> has been allowed entry for <strong>Flat {result.pass.flat_number}</strong>
                    </p>
                    <p style={{ fontSize: 12, color: '#94A3B8', marginBottom: 20 }}>Pass marked as <strong>Used</strong> · Code cannot be reused</p>
                    {entryForm.vehicle_number && (
                      <p style={{ fontSize: 12, color: '#64748B', marginBottom: 16, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 5 }}>
                        <Car size={12} /> Vehicle: {entryForm.vehicle_number}
                      </p>
                    )}
                    <button onClick={reset} className="btn btn-primary" style={{ margin: '0 auto' }}>
                      <ArrowRight size={15} /> Verify Next Visitor
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      )}

      {/* Recent pre-approved entries today */}
      <div>
        <p className="section-label">Pre-Approved Entries Today</p>
        <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
          <div className="table-wrap">
            <table className="data-table">
              <thead>
                <tr>
                  {['Code', 'Visitor', 'Host / Flat', 'Purpose', 'Status', 'Time'].map(h => <th key={h}>{h}</th>)}
                </tr>
              </thead>
              <tbody>
                {passes.map(p => (
                  <tr key={p.id} style={{ cursor: 'pointer' }} onClick={() => { setInput(p.code); setResult({ state: 'idle' }); setEntryComplete(false); }}>
                    <td><span style={{ fontFamily: 'monospace', fontWeight: 800, color: '#2563EB', fontSize: 14, letterSpacing: 2 }}>{p.code}</span></td>
                    <td style={{ fontSize: 13 }}>{p.visitor_name}</td>
                    <td>
                      <div>
                        <p style={{ fontWeight: 600, fontSize: 13 }}>{p.resident_name}</p>
                        <p style={{ fontSize: 11, color: '#94A3B8' }}>Flat {p.flat_number}</p>
                      </div>
                    </td>
                    <td style={{ fontSize: 12 }}>{p.purpose}</td>
                    <td>
                      <span style={{
                        display: 'inline-flex', alignItems: 'center', gap: 4, padding: '3px 8px', borderRadius: 999, fontSize: 11, fontWeight: 600,
                        background: p.status === 'active' ? '#F0FDF4' : p.status === 'used' ? '#EFF6FF' : p.status === 'expired' ? '#FFF7ED' : '#F1F5F9',
                        color: p.status === 'active' ? '#15803D' : p.status === 'used' ? '#1D4ED8' : p.status === 'expired' ? '#C2410C' : '#64748B',
                      }}>
                        <span style={{ width: 5, height: 5, borderRadius: '50%', background: 'currentColor' }} />
                        {p.status.charAt(0).toUpperCase() + p.status.slice(1)}
                      </span>
                    </td>
                    <td style={{ fontSize: 11, color: '#94A3B8' }}>{timeAgo(p.used_at || p.created_at)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
