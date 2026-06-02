import { useState, useEffect, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Shield, Users, Camera, AlertTriangle, Eye, Clock, CheckCircle,
  Activity, Radio, Zap, Moon, Sun, Phone, X, ArrowRight,
  MapPin, ChevronRight, Bell, TrendingUp, Wifi, Car,
  Key, FileText, UserCheck, BarChart3, AlertCircle, Navigation
} from 'lucide-react';

// ─── Types ───────────────────────────────────────────────────────────────────
type SecurityStatus = 'NORMAL' | 'ATTENTION REQUIRED' | 'CRITICAL EVENT';
type WatchMode = 'day' | 'night';

// ─── Toast ───────────────────────────────────────────────────────────────────
interface Toast { id: number; msg: string; type: 'success' | 'error' | 'info'; }
function useToast() {
  const [toasts, setToasts] = useState<Toast[]>([]);
  const add = useCallback((msg: string, type: Toast['type'] = 'success') => {
    const id = Date.now();
    setToasts(t => [...t, { id, msg, type }]);
    setTimeout(() => setToasts(t => t.filter(x => x.id !== id)), 3500);
  }, []);
  return { toasts, add };
}
function ToastContainer({ toasts }: { toasts: Toast[] }) {
  const colors: Record<Toast['type'], { bg: string; border: string; icon: string }> = {
    success: { bg: '#052e16', border: '#16A34A', icon: '✓' },
    error:   { bg: '#2a0a0a', border: '#DC2626', icon: '✕' },
    info:    { bg: '#0c1a3a', border: '#2563EB', icon: 'ℹ' },
  };
  return (
    <div style={{ position: 'fixed', bottom: 24, right: 24, zIndex: 1000, display: 'flex', flexDirection: 'column', gap: 8 }}>
      {toasts.map(t => {
        const c = colors[t.type];
        return (
          <div key={t.id} style={{
            background: c.bg, border: `1px solid ${c.border}`, borderRadius: 10,
            padding: '12px 16px', display: 'flex', alignItems: 'center', gap: 10,
            color: 'white', fontSize: 13, fontWeight: 600,
            boxShadow: '0 8px 24px rgba(0,0,0,0.4)',
            animation: 'slideIn 0.3s ease',
            minWidth: 240, maxWidth: 360,
          }}>
            <span style={{ fontSize: 16 }}>{c.icon}</span>
            {t.msg}
          </div>
        );
      })}
    </div>
  );
}

// ─── Circular Gauge ──────────────────────────────────────────────────────────
function CircularGauge({ value, size = 120 }: { value: number; size?: number }) {
  const r = (size - 16) / 2;
  const circ = 2 * Math.PI * r;
  const offset = circ - (value / 100) * circ;
  const color = value >= 90 ? '#4ADE80' : value >= 70 ? '#FBBF24' : '#F87171';
  return (
    <div style={{ position: 'relative', width: size, height: size }}>
      <svg width={size} height={size} style={{ transform: 'rotate(-90deg)' }}>
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="rgba(255,255,255,0.07)" strokeWidth={8} />
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke={color} strokeWidth={8}
          strokeDasharray={circ} strokeDashoffset={offset} strokeLinecap="round"
          style={{ transition: 'stroke-dashoffset 1s ease' }} />
      </svg>
      <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
        <span style={{ fontSize: size === 120 ? 24 : 18, fontWeight: 800, color }}>{value}%</span>
      </div>
    </div>
  );
}

// ─── Pulse dot ───────────────────────────────────────────────────────────────
function Pulse({ color = '#4ADE80', size = 8 }: { color?: string; size?: number }) {
  return (
    <span style={{ position: 'relative', display: 'inline-flex', width: size, height: size, flexShrink: 0 }}>
      <span style={{ position: 'absolute', inset: 0, borderRadius: '50%', background: color, opacity: 0.4, animation: 'ping 1.5s cubic-bezier(0,0,0.2,1) infinite' }} />
      <span style={{ borderRadius: '50%', background: color, width: size, height: size }} />
    </span>
  );
}

// ─── Demo Data ────────────────────────────────────────────────────────────────
const ACTIVITY = [
  { time: '09:41 PM', icon: UserCheck, color: '#4ADE80',  cat: 'Access',     text: 'Visitor approved for Flat 302 by resident' },
  { time: '09:38 PM', icon: Shield,    color: '#60A5FA',  cat: 'Guard',      text: 'Guard Ramesh Kumar checked in at Gate 2' },
  { time: '09:31 PM', icon: Eye,       color: '#FBBF24',  cat: 'Observation',text: 'Observation logged: Street light failure near Block C' },
  { time: '09:28 PM', icon: Navigation,color: '#4ADE80',  cat: 'Patrol',     text: 'Patrol completed: Boundary Wall Route' },
  { time: '09:21 PM', icon: Camera,    color: '#F87171',  cat: 'CCTV',       text: 'Motion alert detected: Parking Area Camera' },
  { time: '09:15 PM', icon: Key,       color: '#A78BFA',  cat: 'Pass',       text: 'Pre-approved code used — Visitor entered Flat 105' },
  { time: '09:02 PM', icon: CheckCircle,color: '#34D399', cat: 'Supervisor', text: 'Supervisor inspection completed at Block B' },
  { time: '08:55 PM', icon: Users,     color: '#60A5FA',  cat: 'Guard',      text: 'Night shift commenced — 14 guards on duty' },
  { time: '08:47 PM', icon: AlertTriangle, color: '#FBBF24', cat: 'Incident', text: 'Incident logged: Suspicious vehicle near Gate 2' },
  { time: '08:33 PM', icon: Eye,       color: '#FBBF24',  cat: 'Observation',text: 'Water leakage reported near garden area' },
  { time: '08:21 PM', icon: CheckCircle, color: '#4ADE80', cat: 'Access',    text: 'Delivery visitor approved for Tower A' },
  { time: '08:10 PM', icon: Navigation, color: '#4ADE80', cat: 'Patrol',     text: 'Patrol completed: Main Gate Route' },
];

const CAMERAS = [
  { id: 'CAM-001', name: 'Main Gate',     status: 'online', alert: '9:21 PM', icon: '🚪' },
  { id: 'CAM-002', name: 'Parking Area',  status: 'online', alert: '9:21 PM', icon: '🚗' },
  { id: 'CAM-003', name: 'Boundary Wall', status: 'online', alert: '8:45 PM', icon: '🧱' },
  { id: 'CAM-004', name: 'Club House',    status: 'online', alert: '7:30 PM', icon: '🏛️' },
];

const INCIDENTS = [
  { title: 'Suspicious vehicle near Gate 2', priority: 'high',   status: 'open',        time: '8:47 PM' },
  { title: 'Delivery dispute at Tower A',    priority: 'medium', status: 'in_progress', time: '7:15 PM' },
];

const OBSERVATIONS = [
  { title: 'Street light failure near Block C', priority: 'medium',   status: 'open' },
  { title: 'Water leakage near garden',          priority: 'high',     status: 'open' },
  { title: 'Broken tile near clubhouse',         priority: 'low',      status: 'acknowledged' },
  { title: 'Tree branch hazard near parking',    priority: 'high',     status: 'open' },
];

const EMERGENCY_CONTACTS = [
  { name: 'President',           person: 'Brig. S.K. Sharma', phone: '9810001000', icon: '🎖️', color: '#2563EB' },
  { name: 'Secretary',           person: 'Col. R. Verma',     phone: '9810001001', icon: '📋', color: '#0D9488' },
  { name: 'Security Supervisor', person: 'Rajesh Kumar',      phone: '9810001010', icon: '🛡️', color: '#7C3AED' },
  { name: 'Local Police',        person: 'Sector 27 PCR',     phone: '100',         icon: '👮', color: '#DC2626' },
  { name: 'Fire Brigade',        person: 'Panchkula Fire',    phone: '101',         icon: '🚒', color: '#EA580C' },
  { name: 'Ambulance',           person: 'PGIMER / 108',      phone: '108',         icon: '🚑', color: '#16A34A' },
];

// ─── Main Component ───────────────────────────────────────────────────────────
export default function CommandCenter() {
  const navigate = useNavigate();
  const { toasts, add: toast } = useToast();
  const [watchMode, setWatchMode] = useState<WatchMode>('night');
  const [secStatus, setSecStatus] = useState<SecurityStatus>('NORMAL');
  const [codeModal, setCodeModal] = useState(false);
  const [codeInput, setCodeInput] = useState('');
  const [codeResult, setCodeResult] = useState<null | 'valid' | 'invalid'>(null);
  const [entryGranted, setEntryGranted] = useState(false);
  const [ticker, setTicker] = useState(0);
  const [activityLog, setActivityLog] = useState(ACTIVITY);

  // Live clock
  const [time, setTime] = useState(new Date());
  useEffect(() => { const t = setInterval(() => setTime(new Date()), 1000); return () => clearInterval(t); }, []);

  // Simulate live activity every 45s
  useEffect(() => {
    const t = setInterval(() => {
      const msgs = [
        { icon: Shield,    color: '#60A5FA', cat: 'Guard',  text: 'Guard checked in at Back Gate' },
        { icon: Camera,    color: '#F87171', cat: 'CCTV',   text: 'Motion detected at Main Gate camera' },
        { icon: UserCheck, color: '#4ADE80', cat: 'Access', text: `Visitor approved for Flat ${Math.floor(Math.random()*4+1)}0${Math.floor(Math.random()*9+1)}` },
        { icon: Navigation,color: '#4ADE80', cat: 'Patrol', text: 'Patrol completed: Club House Route' },
      ];
      const entry = msgs[Math.floor(Math.random() * msgs.length)];
      const now = new Date();
      const hh = now.getHours() % 12 || 12, mm = now.getMinutes().toString().padStart(2,'0'), ampm = now.getHours() >= 12 ? 'PM' : 'AM';
      setActivityLog(prev => [{ time: `${hh}:${mm} ${ampm}`, ...entry }, ...prev.slice(0, 11)]);
      setTicker(t => t + 1);
    }, 45000);
    return () => clearInterval(t);
  }, []);

  const isNight = watchMode === 'night';
  const BG = isNight ? '#060D1A' : '#0A1628';
  const CARD_BG = isNight ? 'rgba(255,255,255,0.04)' : 'rgba(255,255,255,0.06)';
  const CARD_BORDER = 'rgba(255,255,255,0.08)';

  const verifyCode = () => {
    if (codeInput === '123456' || codeInput === 'APX471' || codeInput === 'GTW945') {
      setCodeResult('valid'); setEntryGranted(false);
    } else {
      setCodeResult('invalid');
    }
  };

  const allowEntry = () => {
    setEntryGranted(true);
    setCodeModal(false);
    setCodeInput('');
    setCodeResult(null);
    toast('✓ Entry approved. Code marked as Used.', 'success');
    const now = new Date();
    const hh = now.getHours() % 12 || 12, mm = now.getMinutes().toString().padStart(2,'0'), ampm = now.getHours() >= 12 ? 'PM' : 'AM';
    setActivityLog(prev => [{ time: `${hh}:${mm} ${ampm}`, icon: Key, color: '#A78BFA', cat: 'Pass', text: 'Pre-approved code used — Visitor entered Flat B-302' }, ...prev.slice(0, 11)]);
  };

  const statusConfig: Record<SecurityStatus, { color: string; bg: string; border: string; glow: string; label: string }> = {
    'NORMAL':            { color: '#4ADE80', bg: 'rgba(74,222,128,0.08)',  border: 'rgba(74,222,128,0.3)',  glow: '0 0 40px rgba(74,222,128,0.15)',  label: 'All systems operational. No critical incident active.' },
    'ATTENTION REQUIRED':{ color: '#FBBF24', bg: 'rgba(251,191,36,0.08)', border: 'rgba(251,191,36,0.3)', glow: '0 0 40px rgba(251,191,36,0.15)', label: 'One or more issues require your attention.' },
    'CRITICAL EVENT':    { color: '#F87171', bg: 'rgba(248,113,113,0.08)', border: 'rgba(248,113,113,0.3)', glow: '0 0 40px rgba(248,113,113,0.2)',  label: 'Critical security event in progress. Immediate action required.' },
  };
  const sc = statusConfig[secStatus];

  const priorityColor = (p: string) => p === 'critical' ? '#F87171' : p === 'high' ? '#FBBF24' : p === 'medium' ? '#60A5FA' : '#94A3B8';

  const card = (children: React.ReactNode, extra?: React.CSSProperties) => (
    <div style={{ background: CARD_BG, border: `1px solid ${CARD_BORDER}`, borderRadius: 14, padding: 16, ...extra }}>
      {children}
    </div>
  );

  const sectionTitle = (title: string, icon?: React.ReactNode, badge?: React.ReactNode) => (
    <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 14 }}>
      {icon}
      <span style={{ fontWeight: 700, fontSize: 13, color: '#E2E8F0', textTransform: 'uppercase', letterSpacing: '0.06em' }}>{title}</span>
      {badge}
    </div>
  );

  return (
    <div style={{ background: BG, minHeight: '100vh', color: 'white', fontFamily: 'Inter, sans-serif', transition: 'background 0.4s' }}>
      <style>{`
        @keyframes ping { 0%,100%{transform:scale(1);opacity:0.5} 50%{transform:scale(1.8);opacity:0} }
        @keyframes slideIn { from{transform:translateX(40px);opacity:0} to{transform:translateX(0);opacity:1} }
        @keyframes glow-pulse { 0%,100%{opacity:1} 50%{opacity:0.6} }
        .cmd-btn { transition: all 0.15s; }
        .cmd-btn:hover { transform: translateY(-2px); filter: brightness(1.15); }
        .op-card:hover { border-color: rgba(255,255,255,0.18) !important; background: rgba(255,255,255,0.07) !important; }
      `}</style>

      {/* ── Header ── */}
      <header style={{
        background: 'rgba(0,0,0,0.5)',
        backdropFilter: 'blur(20px)',
        borderBottom: `1px solid ${CARD_BORDER}`,
        padding: '14px 24px',
        position: 'sticky', top: 0, zIndex: 20,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12, flexWrap: 'wrap',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          <div style={{ width: 40, height: 40, background: 'linear-gradient(135deg,#1D4ED8,#7C3AED)', borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <Shield size={20} />
          </div>
          <div>
            <div style={{ fontSize: 11, color: '#60A5FA', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.12em' }}>Security Operations Command Center</div>
            <div style={{ fontSize: 14, fontWeight: 800, color: 'white', lineHeight: 1.2 }}>Army Welfare Group Housing Society</div>
            <div style={{ fontSize: 11, color: '#64748B', display: 'flex', alignItems: 'center', gap: 4 }}><MapPin size={10} />Sector 27, Panchkula</div>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap' }}>
          {/* Live clock */}
          <div style={{ textAlign: 'center', background: 'rgba(0,0,0,0.3)', border: `1px solid ${CARD_BORDER}`, borderRadius: 10, padding: '6px 14px' }}>
            <div style={{ fontFamily: 'monospace', fontSize: 18, fontWeight: 800, color: '#60A5FA', lineHeight: 1 }}>
              {time.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
            </div>
            <div style={{ fontSize: 9, color: '#475569', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              {time.toLocaleDateString('en-IN', { weekday: 'short', day: 'numeric', month: 'short' })}
            </div>
          </div>

          {/* Status pill */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, background: sc.bg, border: `1px solid ${sc.border}`, borderRadius: 999, padding: '6px 12px' }}>
            <Pulse color={sc.color} />
            <span style={{ fontSize: 11, fontWeight: 800, color: sc.color, letterSpacing: '0.06em' }}>{secStatus}</span>
          </div>

          {/* Watch mode toggle */}
          <button onClick={() => setWatchMode(m => m === 'day' ? 'night' : 'day')} style={{
            display: 'flex', alignItems: 'center', gap: 6, background: isNight ? 'rgba(124,58,237,0.2)' : 'rgba(234,179,8,0.15)',
            border: `1px solid ${isNight ? 'rgba(124,58,237,0.4)' : 'rgba(234,179,8,0.3)'}`,
            borderRadius: 999, padding: '6px 14px', cursor: 'pointer', color: isNight ? '#C4B5FD' : '#FDE68A',
            fontSize: 12, fontWeight: 700,
          }} className="cmd-btn">
            {isNight ? <Moon size={14} /> : <Sun size={14} />}
            {isNight ? 'Night Watch' : 'Day Watch'}
          </button>
        </div>
      </header>

      <div style={{ padding: '20px 20px', maxWidth: 1600, margin: '0 auto' }}>

        {/* ── Row 1: Security Status + Health Score ── */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: 16, marginBottom: 16 }}>
          {/* Main status card */}
          <div style={{
            background: sc.bg, border: `2px solid ${sc.border}`,
            boxShadow: sc.glow, borderRadius: 16, padding: '20px 24px',
            display: 'flex', alignItems: 'center', gap: 20, flexWrap: 'wrap',
          }}>
            <div style={{ width: 56, height: 56, background: sc.border, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, animation: 'glow-pulse 2s ease-in-out infinite' }}>
              <Shield size={26} style={{ color: sc.color }} />
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: sc.color, marginBottom: 4 }}>Security Status</div>
              <div style={{ fontSize: 28, fontWeight: 900, color: sc.color, letterSpacing: '0.02em', lineHeight: 1 }}>{secStatus}</div>
              <div style={{ fontSize: 13, color: '#94A3B8', marginTop: 6 }}>{sc.label}</div>
            </div>
            {/* Status switcher (demo) */}
            <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
              {(['NORMAL','ATTENTION REQUIRED','CRITICAL EVENT'] as SecurityStatus[]).map(s => (
                <button key={s} onClick={() => { setSecStatus(s); toast(`Status changed to: ${s}`, s === 'NORMAL' ? 'success' : s === 'ATTENTION REQUIRED' ? 'info' : 'error'); }}
                  style={{
                    padding: '5px 10px', borderRadius: 8, fontSize: 10, fontWeight: 700, cursor: 'pointer',
                    background: secStatus === s ? statusConfig[s].bg : 'rgba(255,255,255,0.05)',
                    border: `1px solid ${secStatus === s ? statusConfig[s].border : 'rgba(255,255,255,0.1)'}`,
                    color: secStatus === s ? statusConfig[s].color : '#64748B',
                  }} className="cmd-btn">{s}</button>
              ))}
            </div>
          </div>

          {/* Security Readiness Score */}
          <div style={{ background: CARD_BG, border: `1px solid ${CARD_BORDER}`, borderRadius: 16, padding: '20px 24px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8, minWidth: 180 }}>
            <div style={{ fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: '#64748B' }}>Readiness Score</div>
            <CircularGauge value={94} size={120} />
            <div style={{ fontSize: 13, fontWeight: 700, color: '#4ADE80' }}>Excellent</div>
            <div style={{ fontSize: 10, color: '#475569', textAlign: 'center', lineHeight: 1.5 }}>Attendance · Patrol · CCTV<br />Incidents · Observations</div>
          </div>
        </div>

        {/* ── Row 2: Operation Cards ── */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))', gap: 10, marginBottom: 16 }}>
          {[
            { label: 'Guards On Duty',      value: '14 / 14', sub: 'All present',        icon: Shield,        color: '#4ADE80', pulse: true },
            { label: 'Supervisor On Duty',  value: '1',        sub: 'Rajesh Kumar',        icon: UserCheck,     color: '#60A5FA', pulse: true },
            { label: 'Patrol Compliance',   value: '92%',      sub: '11 routes done',      icon: Navigation,    color: '#34D399', pulse: false },
            { label: 'Visitors Today',      value: '127',      sub: '18 inside now',       icon: Users,         color: '#60A5FA', pulse: false },
            { label: 'Pending Approvals',   value: '3',        sub: 'Awaiting resident',   icon: Clock,         color: '#FBBF24', pulse: true },
            { label: 'Visitors Inside',     value: '18',       sub: 'On premises',         icon: MapPin,        color: '#A78BFA', pulse: false },
            { label: 'Open Incidents',      value: '2',        sub: '0 critical',          icon: AlertTriangle, color: '#FBBF24', pulse: true },
            { label: 'Critical Incidents',  value: '0',        sub: 'All clear',           icon: AlertCircle,   color: '#4ADE80', pulse: false },
            { label: 'CCTV Online',         value: '4 / 4',    sub: 'All cameras live',    icon: Camera,        color: '#4ADE80', pulse: true },
            { label: 'Motion Alerts',       value: '2',        sub: 'Unacknowledged',      icon: Radio,         color: '#F87171', pulse: true },
            { label: 'Open Observations',   value: '4',        sub: '1 high priority',     icon: Eye,           color: '#FBBF24', pulse: false },
            { label: 'Emergency Status',    value: 'NORMAL',   sub: 'No active emergency', icon: Zap,           color: '#4ADE80', pulse: false },
          ].map((item) => (
            <div key={item.label} className="op-card" style={{
              background: CARD_BG, border: `1px solid ${CARD_BORDER}`, borderRadius: 12,
              padding: '12px 14px', cursor: 'pointer', transition: 'all 0.15s',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 6 }}>
                <item.icon size={14} style={{ color: item.color }} />
                {item.pulse && <Pulse color={item.color} size={6} />}
              </div>
              <div style={{ fontSize: 20, fontWeight: 800, color: item.color, lineHeight: 1, marginBottom: 3 }}>{item.value}</div>
              <div style={{ fontSize: 10, fontWeight: 700, color: '#CBD5E1', lineHeight: 1.3, marginBottom: 2 }}>{item.label}</div>
              <div style={{ fontSize: 9, color: '#475569' }}>{item.sub}</div>
            </div>
          ))}
        </div>

        {/* ── Main Grid: Content + Activity Feed ── */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 320px', gap: 16, alignItems: 'start' }}>

          {/* Left content */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>

            {/* Command Actions */}
            {card(
              <>
                {sectionTitle('Command Actions', <Zap size={14} style={{ color: '#FBBF24' }} />)}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(130px, 1fr))', gap: 8 }}>
                  {[
                    { label: 'Register Visitor',    icon: Users,       color: '#2563EB', action: () => navigate('/visitors') },
                    { label: 'Verify Code',         icon: Key,         color: '#7C3AED', action: () => { setCodeModal(true); setCodeResult(null); setCodeInput(''); } },
                    { label: 'Report Incident',     icon: AlertTriangle, color: '#DC2626', action: () => navigate('/incidents') },
                    { label: 'Log Observation',     icon: Eye,         color: '#0D9488', action: () => navigate('/observations') },
                    { label: 'View CCTV',           icon: Camera,      color: '#6D28D9', action: () => navigate('/cctv') },
                    { label: 'Call Supervisor',     icon: Phone,       color: '#059669', action: () => toast('📞 Calling Rajesh Kumar (Supervisor)…', 'info') },
                    { label: 'Daily Report',        icon: FileText,    color: '#0369A1', action: () => navigate('/reports') },
                    { label: 'Emergency Alert',     icon: Bell,        color: '#DC2626', action: () => { toast('🚨 Emergency Alert broadcasted to all guards!', 'error'); setSecStatus('CRITICAL EVENT'); } },
                  ].map(a => (
                    <button key={a.label} onClick={a.action} className="cmd-btn" style={{
                      display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 7,
                      background: `${a.color}18`, border: `1px solid ${a.color}35`,
                      borderRadius: 12, padding: '12px 8px', cursor: 'pointer', transition: 'all 0.15s',
                    }}>
                      <div style={{ width: 36, height: 36, background: `${a.color}25`, borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <a.icon size={17} style={{ color: a.color }} />
                      </div>
                      <span style={{ fontSize: 11, fontWeight: 600, color: '#CBD5E1', textAlign: 'center', lineHeight: 1.3 }}>{a.label}</span>
                    </button>
                  ))}
                </div>
              </>
            )}

            {/* CCTV + Manpower row */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
              {/* CCTV Snapshot */}
              {card(
                <>
                  {sectionTitle('CCTV Status', <Camera size={14} style={{ color: '#A78BFA' }} />,
                    <span style={{ marginLeft: 'auto', fontSize: 10, background: '#052e16', color: '#4ADE80', border: '1px solid #166534', borderRadius: 999, padding: '2px 8px', fontWeight: 700 }}>4/4 ONLINE</span>)}
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
                    {CAMERAS.map(cam => (
                      <div key={cam.id} style={{ background: '#0A0F1E', border: `1px solid ${CARD_BORDER}`, borderRadius: 10, overflow: 'hidden', cursor: 'pointer' }}
                        onClick={() => navigate('/cctv')}>
                        <div style={{ background: 'linear-gradient(135deg,#1E293B,#0F172A)', aspectRatio: '16/9', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
                          <span style={{ fontSize: 22 }}>{cam.icon}</span>
                          <span style={{ position: 'absolute', top: 4, right: 4, fontSize: 8, background: '#DC2626', color: 'white', borderRadius: 3, padding: '1px 4px', fontWeight: 800, animation: 'glow-pulse 1.5s infinite' }}>● LIVE</span>
                          <span style={{ position: 'absolute', bottom: 3, left: 3, right: 3, fontSize: 8, color: '#4ADE80', fontFamily: 'monospace', textAlign: 'center' }}>
                            {time.toLocaleTimeString('en-IN')}
                          </span>
                        </div>
                        <div style={{ padding: '6px 8px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                          <span style={{ fontSize: 10, fontWeight: 600, color: '#CBD5E1' }}>{cam.name}</span>
                          <span style={{ fontSize: 9, color: '#4ADE80', fontWeight: 700 }}>● ONLINE</span>
                        </div>
                      </div>
                    ))}
                  </div>
                  <button onClick={() => navigate('/cctv')} style={{ width: '100%', marginTop: 10, background: 'rgba(124,58,237,0.15)', border: '1px solid rgba(124,58,237,0.3)', borderRadius: 8, padding: '8px', color: '#C4B5FD', fontSize: 12, fontWeight: 600, cursor: 'pointer' }} className="cmd-btn">
                    Open Full CCTV Monitor →
                  </button>
                </>
              )}

              {/* Manpower */}
              {card(
                <>
                  {sectionTitle('Manpower Status', <Shield size={14} style={{ color: '#60A5FA' }} />)}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
                    {[
                      ['Current Shift',  'Night Shift',             '#60A5FA'],
                      ['Shift Hours',    '8:00 PM – 8:00 AM',       '#94A3B8'],
                      ['Supervisor',     'Rajesh Kumar',             '#4ADE80'],
                    ].map(([k,v,c]) => (
                      <div key={k} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px 0', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                        <span style={{ fontSize: 11, color: '#64748B' }}>{k}</span>
                        <span style={{ fontSize: 12, fontWeight: 700, color: c as string }}>{v}</span>
                      </div>
                    ))}
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 8, marginTop: 12 }}>
                    {[
                      { label: 'Present', value: 14, color: '#4ADE80', bg: 'rgba(74,222,128,0.1)' },
                      { label: 'Late',    value: 0,  color: '#FBBF24', bg: 'rgba(251,191,36,0.1)' },
                      { label: 'Absent',  value: 0,  color: '#F87171', bg: 'rgba(248,113,113,0.1)' },
                    ].map(s => (
                      <div key={s.label} style={{ background: s.bg, borderRadius: 10, padding: '10px 6px', textAlign: 'center' }}>
                        <div style={{ fontSize: 22, fontWeight: 800, color: s.color }}>{s.value}</div>
                        <div style={{ fontSize: 10, color: '#64748B', fontWeight: 600 }}>{s.label}</div>
                      </div>
                    ))}
                  </div>
                  <div style={{ marginTop: 12, background: 'rgba(74,222,128,0.06)', border: '1px solid rgba(74,222,128,0.2)', borderRadius: 8, padding: '8px 12px', fontSize: 11, color: '#4ADE80', display: 'flex', alignItems: 'center', gap: 6 }}>
                    <Pulse color="#4ADE80" size={7} /> 100% attendance — Excellent shift start
                  </div>
                  <button onClick={() => navigate('/attendance')} style={{ width: '100%', marginTop: 10, background: 'rgba(37,99,235,0.12)', border: '1px solid rgba(37,99,235,0.25)', borderRadius: 8, padding: '8px', color: '#93C5FD', fontSize: 12, fontWeight: 600, cursor: 'pointer' }} className="cmd-btn">
                    View Full Attendance →
                  </button>
                </>
              )}
            </div>

            {/* Pre-Approved Passes */}
            {card(
              <>
                {sectionTitle('Pre-Approved Visitor Codes', <Key size={14} style={{ color: '#A78BFA' }} />)}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 10, marginBottom: 14 }}>
                  {[
                    { label: 'Active',            value: '11', color: '#4ADE80', bg: 'rgba(74,222,128,0.1)' },
                    { label: 'Used Today',         value: '19', color: '#60A5FA', bg: 'rgba(96,165,250,0.1)' },
                    { label: 'Expired Unused',     value: '3',  color: '#FBBF24', bg: 'rgba(251,191,36,0.1)' },
                    { label: 'Expected Visitors',  value: '6',  color: '#A78BFA', bg: 'rgba(167,139,250,0.1)' },
                  ].map(s => (
                    <div key={s.label} style={{ background: s.bg, borderRadius: 10, padding: '12px 8px', textAlign: 'center' }}>
                      <div style={{ fontSize: 22, fontWeight: 800, color: s.color }}>{s.value}</div>
                      <div style={{ fontSize: 9, color: '#64748B', fontWeight: 600, lineHeight: 1.4 }}>{s.label}</div>
                    </div>
                  ))}
                </div>
                <div style={{ display: 'flex', gap: 8 }}>
                  <button onClick={() => { setCodeModal(true); setCodeResult(null); setCodeInput(''); }} style={{
                    flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 7,
                    background: 'rgba(124,58,237,0.2)', border: '1px solid rgba(124,58,237,0.4)',
                    borderRadius: 10, padding: '10px', color: '#C4B5FD', fontSize: 13, fontWeight: 700, cursor: 'pointer',
                  }} className="cmd-btn">
                    <Key size={15} /> Verify Visitor Code
                  </button>
                  <Link to="/passes" style={{
                    display: 'flex', alignItems: 'center', gap: 5, padding: '10px 16px',
                    background: 'rgba(255,255,255,0.05)', border: `1px solid ${CARD_BORDER}`,
                    borderRadius: 10, color: '#94A3B8', fontSize: 12, fontWeight: 600, textDecoration: 'none',
                  }}>Manage Passes <ChevronRight size={13} /></Link>
                </div>
              </>
            )}

            {/* Incidents + Observations row */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
              {/* Incidents */}
              {card(
                <>
                  {sectionTitle('Open Incidents', <AlertTriangle size={14} style={{ color: '#FBBF24' }} />,
                    <span style={{ marginLeft: 'auto', fontSize: 9, background: 'rgba(251,191,36,0.15)', color: '#FBBF24', border: '1px solid rgba(251,191,36,0.3)', borderRadius: 999, padding: '2px 7px', fontWeight: 700 }}>{INCIDENTS.length} OPEN</span>)}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                    {INCIDENTS.map((inc, i) => (
                      <div key={i} style={{ background: 'rgba(251,191,36,0.05)', border: '1px solid rgba(251,191,36,0.15)', borderRadius: 10, padding: '10px 12px' }}>
                        <div style={{ display: 'flex', alignItems: 'flex-start', gap: 8 }}>
                          <span style={{ width: 6, height: 6, borderRadius: '50%', background: priorityColor(inc.priority), flexShrink: 0, marginTop: 5 }} />
                          <div style={{ flex: 1 }}>
                            <p style={{ fontSize: 12, fontWeight: 600, color: '#E2E8F0', lineHeight: 1.4 }}>{inc.title}</p>
                            <div style={{ display: 'flex', gap: 6, marginTop: 4 }}>
                              <span style={{ fontSize: 9, background: `${priorityColor(inc.priority)}20`, color: priorityColor(inc.priority), borderRadius: 4, padding: '1px 5px', fontWeight: 700, textTransform: 'uppercase' }}>{inc.priority}</span>
                              <span style={{ fontSize: 9, color: '#475569' }}>{inc.time}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <button onClick={() => navigate('/incidents')} style={{ width: '100%', marginTop: 10, background: 'rgba(251,191,36,0.08)', border: '1px solid rgba(251,191,36,0.2)', borderRadius: 8, padding: '7px', color: '#FBBF24', fontSize: 11, fontWeight: 600, cursor: 'pointer' }} className="cmd-btn">
                    View All Incidents →
                  </button>
                </>
              )}

              {/* Observations */}
              {card(
                <>
                  {sectionTitle('Guard Observations', <Eye size={14} style={{ color: '#34D399' }} />,
                    <span style={{ marginLeft: 'auto', fontSize: 9, background: 'rgba(52,211,153,0.1)', color: '#34D399', border: '1px solid rgba(52,211,153,0.25)', borderRadius: 999, padding: '2px 7px', fontWeight: 700 }}>{OBSERVATIONS.length} OPEN</span>)}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 7 }}>
                    {OBSERVATIONS.map((obs, i) => (
                      <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '8px 0', borderBottom: i < OBSERVATIONS.length - 1 ? '1px solid rgba(255,255,255,0.05)' : 'none' }}>
                        <span style={{ width: 6, height: 6, borderRadius: '50%', background: priorityColor(obs.priority), flexShrink: 0 }} />
                        <span style={{ fontSize: 12, color: '#CBD5E1', flex: 1, lineHeight: 1.4 }}>{obs.title}</span>
                        <span style={{ fontSize: 9, background: `${priorityColor(obs.priority)}20`, color: priorityColor(obs.priority), padding: '1px 6px', borderRadius: 4, fontWeight: 700, textTransform: 'uppercase', flexShrink: 0 }}>{obs.priority}</span>
                      </div>
                    ))}
                  </div>
                  <button onClick={() => navigate('/observations')} style={{ width: '100%', marginTop: 10, background: 'rgba(52,211,153,0.08)', border: '1px solid rgba(52,211,153,0.2)', borderRadius: 8, padding: '7px', color: '#34D399', fontSize: 11, fontWeight: 600, cursor: 'pointer' }} className="cmd-btn">
                    View All Observations →
                  </button>
                </>
              )}
            </div>

            {/* Emergency Contacts + Daily Summary row */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
              {/* Emergency Contacts */}
              {card(
                <>
                  {sectionTitle('Emergency Contacts', <Phone size={14} style={{ color: '#F87171' }} />)}
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: 8 }}>
                    {EMERGENCY_CONTACTS.map(c => (
                      <button key={c.name} onClick={() => toast(`📞 Dialling ${c.name}: ${c.phone}`, 'info')} className="cmd-btn" style={{
                        display: 'flex', alignItems: 'center', gap: 8, padding: '9px 10px',
                        background: `${c.color}12`, border: `1px solid ${c.color}28`, borderRadius: 10, cursor: 'pointer', textAlign: 'left',
                      }}>
                        <span style={{ fontSize: 18 }}>{c.icon}</span>
                        <div style={{ minWidth: 0 }}>
                          <p style={{ fontSize: 11, fontWeight: 700, color: '#E2E8F0', lineHeight: 1.2, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{c.name}</p>
                          <p style={{ fontSize: 10, color: c.color, fontFamily: 'monospace', fontWeight: 700 }}>{c.phone}</p>
                        </div>
                      </button>
                    ))}
                  </div>
                </>
              )}

              {/* Daily Summary */}
              {card(
                <>
                  {sectionTitle('Daily Operational Summary', <BarChart3 size={14} style={{ color: '#60A5FA' }} />)}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
                    {[
                      ['Visitors Processed',    '127', '#60A5FA'],
                      ['Incidents Resolved',    '7',   '#4ADE80'],
                      ['Patrols Completed',     '11',  '#34D399'],
                      ['Observations Logged',   '8',   '#FBBF24'],
                      ['CCTV Alerts Reviewed',  '5',   '#A78BFA'],
                      ['Security Status',       'Normal', '#4ADE80'],
                    ].map(([k,v,c]) => (
                      <div key={k} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px 0', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                        <span style={{ fontSize: 12, color: '#64748B' }}>{k}</span>
                        <span style={{ fontSize: 13, fontWeight: 800, color: c as string }}>{v}</span>
                      </div>
                    ))}
                  </div>
                  <button onClick={() => { navigate('/reports'); toast('Generating daily report…', 'info'); }} style={{ width: '100%', marginTop: 12, background: 'rgba(37,99,235,0.15)', border: '1px solid rgba(37,99,235,0.3)', borderRadius: 8, padding: '8px', color: '#93C5FD', fontSize: 12, fontWeight: 600, cursor: 'pointer' }} className="cmd-btn">
                    Generate Full Report →
                  </button>
                </>
              )}
            </div>

          </div>{/* end left */}

          {/* ── Right: Live Activity Feed ── */}
          <div style={{ position: 'sticky', top: 80 }}>
            {card(
              <>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 14 }}>
                  <Activity size={14} style={{ color: '#4ADE80' }} />
                  <span style={{ fontWeight: 700, fontSize: 12, color: '#E2E8F0', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Live Activity Feed</span>
                  <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 4 }}>
                    <Pulse color="#4ADE80" size={7} />
                    <span style={{ fontSize: 9, color: '#4ADE80', fontWeight: 700 }}>LIVE</span>
                  </div>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 0, maxHeight: 'calc(100vh - 200px)', overflowY: 'auto' }}>
                  {activityLog.map((entry, i) => {
                    const Icon = entry.icon;
                    return (
                      <div key={i} style={{
                        display: 'flex', gap: 10, padding: '10px 0',
                        borderBottom: i < activityLog.length - 1 ? '1px solid rgba(255,255,255,0.04)' : 'none',
                        animation: i === 0 && ticker > 0 ? 'slideIn 0.4s ease' : 'none',
                      }}>
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4, flexShrink: 0 }}>
                          <div style={{ width: 28, height: 28, background: `${entry.color}18`, border: `1px solid ${entry.color}35`, borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <Icon size={13} style={{ color: entry.color }} />
                          </div>
                          {i < activityLog.length - 1 && <div style={{ width: 1, flex: 1, background: 'rgba(255,255,255,0.05)', minHeight: 10 }} />}
                        </div>
                        <div style={{ flex: 1, paddingBottom: 8 }}>
                          <p style={{ fontSize: 11, color: '#CBD5E1', lineHeight: 1.5, marginBottom: 2 }}>{entry.text}</p>
                          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                            <span style={{ fontSize: 9, fontFamily: 'monospace', color: '#475569' }}>{entry.time}</span>
                            <span style={{ fontSize: 9, background: `${entry.color}18`, color: entry.color, padding: '1px 5px', borderRadius: 4, fontWeight: 700 }}>{entry.cat}</span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </>,
              { padding: 16 }
            )}

            {/* SYOS branding */}
            <div style={{ marginTop: 12, textAlign: 'center', padding: '12px', background: 'rgba(0,0,0,0.3)', border: `1px solid ${CARD_BORDER}`, borderRadius: 12 }}>
              <div style={{ fontSize: 9, color: '#334155', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 3 }}>Powered by</div>
              <div style={{ fontSize: 13, fontWeight: 800, color: '#60A5FA' }}>SYOS Enterprises</div>
              <div style={{ fontSize: 10, color: '#1E3A5F', fontStyle: 'italic' }}>Security Beyond Manpower</div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Verify Code Modal ── */}
      {codeModal && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(6px)', zIndex: 100, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 16 }}
          onClick={e => e.target === e.currentTarget && setCodeModal(false)}>
          <div style={{ background: '#0D1626', border: '1px solid rgba(124,58,237,0.4)', borderRadius: 20, padding: 28, width: '100%', maxWidth: 420, boxShadow: '0 24px 64px rgba(0,0,0,0.6)' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <div style={{ width: 38, height: 38, background: 'rgba(124,58,237,0.2)', border: '1px solid rgba(124,58,237,0.4)', borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Key size={18} style={{ color: '#C4B5FD' }} /></div>
                <div>
                  <p style={{ fontWeight: 800, fontSize: 15, color: 'white' }}>Verify Visitor Code</p>
                  <p style={{ fontSize: 11, color: '#64748B' }}>Enter the 6-digit pre-approved code</p>
                </div>
              </div>
              <button onClick={() => { setCodeModal(false); setCodeResult(null); }} style={{ background: 'rgba(255,255,255,0.06)', border: 'none', color: '#64748B', borderRadius: 8, padding: 6, cursor: 'pointer', display: 'flex' }}><X size={16} /></button>
            </div>

            <div style={{ display: 'flex', gap: 10, marginBottom: 16 }}>
              <input value={codeInput} onChange={e => { setCodeInput(e.target.value.toUpperCase()); setCodeResult(null); }}
                onKeyDown={e => e.key === 'Enter' && verifyCode()}
                placeholder="ENTER CODE" maxLength={6}
                style={{ flex: 1, padding: '12px 16px', fontFamily: 'monospace', fontSize: 22, fontWeight: 800, letterSpacing: 8, background: 'rgba(255,255,255,0.06)', border: '2px solid rgba(255,255,255,0.12)', borderRadius: 12, color: '#60A5FA', outline: 'none', textTransform: 'uppercase' }} />
              <button onClick={verifyCode} style={{ padding: '12px 18px', background: 'rgba(124,58,237,0.3)', border: '1px solid rgba(124,58,237,0.5)', borderRadius: 12, color: '#C4B5FD', fontSize: 13, fontWeight: 700, cursor: 'pointer' }} className="cmd-btn">
                Verify
              </button>
            </div>

            {/* Hint */}
            <p style={{ fontSize: 11, color: '#334155', marginBottom: 14, textAlign: 'center' }}>
              Demo codes: <span style={{ fontFamily: 'monospace', color: '#60A5FA' }}>123456</span> · <span style={{ fontFamily: 'monospace', color: '#60A5FA' }}>APX471</span> · <span style={{ fontFamily: 'monospace', color: '#60A5FA' }}>GTW945</span>
            </p>

            {/* Result */}
            {codeResult === 'valid' && (
              <div style={{ background: 'rgba(74,222,128,0.08)', border: '1px solid rgba(74,222,128,0.3)', borderRadius: 14, padding: 16 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 14 }}>
                  <CheckCircle size={18} style={{ color: '#4ADE80' }} />
                  <span style={{ fontWeight: 800, color: '#4ADE80', fontSize: 14 }}>Valid Pre-Approved Visitor</span>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 14 }}>
                  {[['Host', 'Col. R. Sharma'], ['Flat', 'B-302'], ['Visitor', 'Amit Verma'], ['Purpose', 'Family Visit'], ['Status', 'Auto Approved']].map(([k,v]) => (
                    <div key={k} style={{ background: 'rgba(0,0,0,0.2)', borderRadius: 8, padding: '8px 10px' }}>
                      <p style={{ fontSize: 9, color: '#64748B', fontWeight: 600, marginBottom: 2 }}>{k}</p>
                      <p style={{ fontSize: 12, fontWeight: 700, color: '#E2E8F0' }}>{v}</p>
                    </div>
                  ))}
                </div>
                <button onClick={allowEntry} style={{
                  width: '100%', padding: '12px', background: 'linear-gradient(135deg,#16A34A,#15803D)', color: 'white',
                  border: 'none', borderRadius: 12, fontWeight: 800, fontSize: 14, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                }} className="cmd-btn">
                  <CheckCircle size={18} /> Allow Entry — Auto Approved
                </button>
              </div>
            )}
            {codeResult === 'invalid' && (
              <div style={{ background: 'rgba(248,113,113,0.08)', border: '1px solid rgba(248,113,113,0.3)', borderRadius: 12, padding: 16, textAlign: 'center' }}>
                <AlertTriangle size={32} style={{ color: '#F87171', margin: '0 auto 8px' }} />
                <p style={{ fontWeight: 800, color: '#F87171', fontSize: 14, marginBottom: 4 }}>No Valid Pre-Approved Pass Found</p>
                <p style={{ fontSize: 12, color: '#64748B' }}>This code does not exist or has expired. Ask the visitor to contact their host for a new code.</p>
              </div>
            )}
          </div>
        </div>
      )}

      <ToastContainer toasts={toasts} />
    </div>
  );
}
