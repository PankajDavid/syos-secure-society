import { Shield, Users, AlertTriangle, Camera, Clock, Eye, Key, CheckCircle as Check } from 'lucide-react';
import {
  AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend
} from 'recharts';
import StatCard from '@/components/ui/StatCard';
import { statusBadge } from '@/components/ui/Badge';
import {
  VISITOR_CHART_DATA, INCIDENT_CHART_DATA, DEMO_VISITORS,
  DEMO_INCIDENTS, DEMO_OBSERVATIONS, DEMO_CAMERA_ALERTS, SOCIETY, DEMO_PASSES
} from '@/data/demo';
import { Link } from 'react-router-dom';
import { timeAgo } from '@/lib/utils';

const PIE_COLORS = ['#16A34A', '#F59E0B', '#DC2626'];
const visitorStatusData = [
  { name: 'Approved', value: 89 },
  { name: 'Pending',  value: 7  },
  { name: 'Rejected', value: 31 },
];

const S: Record<string, React.CSSProperties> = {
  page:      { display: 'flex', flexDirection: 'column', gap: 20 },
  section:   { display: 'flex', flexDirection: 'column', gap: 20 },
  row:       { display: 'grid', gap: 20 },
  card:      { background: 'white', borderRadius: 14, padding: 20, border: '1px solid #F1F5F9', boxShadow: '0 1px 3px rgba(0,0,0,0.06)' },
  cardTitle: { fontSize: 15, fontWeight: 700, color: '#1E293B', marginBottom: 2 },
  cardSub:   { fontSize: 12, color: '#94A3B8', marginBottom: 16 },
};

export default function Dashboard() {
  const recentVisitors = DEMO_VISITORS.slice(0, 5);
  const openIncidents  = DEMO_INCIDENTS.filter(i => i.status === 'open' || i.status === 'in_progress');
  const pendingAlerts  = DEMO_CAMERA_ALERTS.filter(a => !a.is_acknowledged);
  const openObs        = DEMO_OBSERVATIONS.filter(o => o.status !== 'resolved');

  return (
    <div style={S.page}>

      {/* Society Banner */}
      <div style={{
        background: 'linear-gradient(135deg, #0F172A 0%, #1E293B 100%)',
        borderRadius: 16, padding: '20px 24px', color: 'white',
        display: 'flex', flexWrap: 'wrap', gap: 16,
        alignItems: 'center', justifyContent: 'space-between',
      }}>
        <div>
          <p style={{ fontSize: 11, color: '#64748B', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 4 }}>Active Society</p>
          <h2 style={{ fontSize: 20, fontWeight: 800, marginBottom: 2 }}>{SOCIETY.name}</h2>
          <p style={{ fontSize: 13, color: '#94A3B8' }}>{SOCIETY.location}</p>
        </div>
        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
          {[
            { label: 'Guards', value: SOCIETY.totalGuards },
            { label: 'Flats', value: SOCIETY.totalFlats },
            { label: 'Residents', value: SOCIETY.totalResidents },
          ].map(s => (
            <div key={s.label} style={{
              textAlign: 'center', background: 'rgba(255,255,255,0.06)',
              border: '1px solid rgba(255,255,255,0.1)', borderRadius: 12, padding: '10px 18px',
            }}>
              <div style={{ fontSize: 22, fontWeight: 800, color: '#60A5FA' }}>{s.value}</div>
              <div style={{ fontSize: 11, color: '#94A3B8', marginTop: 2 }}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* KPI Cards */}
      <div className="stats-grid">
        <StatCard title="Guards On Duty"     value={14}  icon={Shield}        iconBg="#EFF6FF" iconColor="#2563EB" trend="+2 vs yesterday" trendUp />
        <StatCard title="Visitors Today"     value={127} icon={Users}         iconBg="#F0FDF4" iconColor="#16A34A" trend="+12% this week"  trendUp />
        <StatCard title="Open Incidents"     value={3}   icon={AlertTriangle} iconBg="#FFF1F2" iconColor="#E11D48" trend="1 critical"      trendUp={false} alert />
        <StatCard title="CCTV Alerts"        value={2}   icon={Camera}        iconBg="#F5F3FF" iconColor="#7C3AED" trend="Unacknowledged"  trendUp={false} />
        <StatCard title="Pending Approvals"  value={7}   icon={Clock}         iconBg="#FFFBEB" iconColor="#D97706" trend="Awaiting action"  trendUp={false} />
        <StatCard title="Observations"       value={4}   icon={Eye}           iconBg="#F0FDFA" iconColor="#0D9488" trend="1 critical"      trendUp={false} />
      </div>

      {/* Charts Row */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 20 }} className="charts-row">
        {/* Visitor Trend */}
        <div style={S.card}>
          <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 16 }}>
            <div>
              <p style={S.cardTitle}>Visitor Trend</p>
              <p style={S.cardSub}>Last 7 days</p>
            </div>
            <span style={{ fontSize: 11, fontWeight: 600, color: '#16A34A', background: '#F0FDF4', padding: '3px 8px', borderRadius: 999 }}>+8% this week</span>
          </div>
          <ResponsiveContainer width="100%" height={200}>
            <AreaChart data={VISITOR_CHART_DATA}>
              <defs>
                <linearGradient id="visGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%"  stopColor="#2563EB" stopOpacity={0.15} />
                  <stop offset="95%" stopColor="#2563EB" stopOpacity={0}    />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" />
              <XAxis dataKey="day"      tick={{ fontSize: 11, fill: '#94A3B8' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: '#94A3B8' }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ borderRadius: 10, border: '1px solid #E2E8F0', fontSize: 12, fontFamily: 'Inter, sans-serif' }} />
              <Area type="monotone" dataKey="visitors" stroke="#2563EB" fill="url(#visGrad)" strokeWidth={2.5} dot={{ fill: '#2563EB', r: 3 }} />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Visitor Status Pie */}
        <div style={S.card}>
          <p style={S.cardTitle}>Visitor Status</p>
          <p style={S.cardSub}>Today's breakdown</p>
          <ResponsiveContainer width="100%" height={190}>
            <PieChart>
              <Pie data={visitorStatusData} cx="50%" cy="50%" innerRadius={52} outerRadius={78} paddingAngle={3} dataKey="value">
                {visitorStatusData.map((_, i) => <Cell key={i} fill={PIE_COLORS[i]} />)}
              </Pie>
              <Legend iconType="circle" iconSize={8} formatter={v => <span style={{ fontSize: 12, color: '#64748B' }}>{v}</span>} />
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Incident Chart + Activity */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 20 }} className="charts-row">
        {/* Incident Bar Chart */}
        <div style={S.card}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
            <p style={S.cardTitle}>Incident Overview</p>
            <p style={{ fontSize: 12, color: '#94A3B8' }}>Last 6 months</p>
          </div>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={INCIDENT_CHART_DATA} barSize={12}>
              <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" />
              <XAxis dataKey="month"    tick={{ fontSize: 11, fill: '#94A3B8' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: '#94A3B8' }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ borderRadius: 10, border: '1px solid #E2E8F0', fontSize: 12 }} />
              <Bar dataKey="incidents" fill="#EF4444" radius={[4,4,0,0]} name="Incidents" opacity={0.85} />
              <Bar dataKey="resolved"  fill="#16A34A" radius={[4,4,0,0]} name="Resolved"           />
              <Legend iconType="circle" iconSize={8} formatter={v => <span style={{ fontSize: 12, color: '#64748B' }}>{v}</span>} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Activity Feed */}
        <div style={S.card}>
          <p style={{ ...S.cardTitle, marginBottom: 16 }}>Recent Activity</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {[
              ...recentVisitors.slice(0, 3).map(v => ({ type: 'visitor', label: v.visitor_name, sub: `${v.purpose} · ${v.flat_number}`, time: v.entry_time, status: v.status })),
              ...openIncidents.slice(0, 2).map(i  => ({ type: 'incident', label: i.title, sub: i.category, time: i.created_at, status: i.status })),
            ].sort((a,b) => new Date(b.time).getTime() - new Date(a.time).getTime()).slice(0,6).map((item, idx) => (
              <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <div style={{
                  width: 32, height: 32, borderRadius: 9, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                  background: item.type === 'visitor' ? '#EFF6FF' : '#FFF1F2',
                }}>
                  {item.type === 'visitor'
                    ? <Users size={13} style={{ color: '#2563EB' }} />
                    : <AlertTriangle size={13} style={{ color: '#E11D48' }} />}
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <p style={{ fontSize: 12, fontWeight: 600, color: '#1E293B', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{item.label}</p>
                  <p style={{ fontSize: 11, color: '#94A3B8', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{item.sub} · {timeAgo(item.time)}</p>
                </div>
                {statusBadge(item.status)}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Pre-Approved Passes SOC Widget */}
      {(() => {
        const activePasses  = DEMO_PASSES.filter(p => p.status === 'active').length;
        const usedToday     = DEMO_PASSES.filter(p => p.status === 'used').length;
        const expiredUnused = DEMO_PASSES.filter(p => p.status === 'expired').length;
        return (
          <div style={S.card}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14 }}>
              <div style={{ width: 36, height: 36, background: '#EFF6FF', borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Key size={17} style={{ color: '#2563EB' }} />
              </div>
              <div>
                <p style={{ fontWeight: 700, fontSize: 14, color: '#1E293B' }}>Pre-Approved Visitor Codes</p>
                <p style={{ fontSize: 11, color: '#94A3B8' }}>Resident-generated entry passes today</p>
              </div>
              <Link to="/passes" style={{ marginLeft: 'auto', fontSize: 12, color: '#2563EB', fontWeight: 600, textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 4 }}>
                Manage →
              </Link>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 10, marginBottom: 14 }}>
              {[
                { label: 'Active Passes',    value: activePasses,  bg: '#F0FDF4', c: '#15803D' },
                { label: 'Used Today',       value: usedToday,     bg: '#EFF6FF', c: '#1D4ED8' },
                { label: 'Expired Unused',   value: expiredUnused, bg: '#FFF7ED', c: '#C2410C' },
              ].map(s => (
                <div key={s.label} style={{ background: s.bg, borderRadius: 10, padding: '10px 8px', textAlign: 'center' }}>
                  <div style={{ fontSize: 22, fontWeight: 800, color: s.c }}>{s.value}</div>
                  <div style={{ fontSize: 10, fontWeight: 600, color: s.c, opacity: 0.75 }}>{s.label}</div>
                </div>
              ))}
            </div>

            {/* Live activity feed */}
            <p style={{ fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', color: '#94A3B8', marginBottom: 8 }}>Live Activity</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 7 }}>
              {DEMO_PASSES.slice(0, 4).map(pass => (
                <div key={pass.id} style={{
                  display: 'flex', alignItems: 'center', gap: 10, padding: '8px 10px', borderRadius: 9,
                  background: pass.status === 'used' ? '#F0FDF4' : pass.status === 'active' ? '#F8FAFC' : '#FAFAFA',
                  border: `1px solid ${pass.status === 'used' ? '#BBF7D0' : '#F1F5F9'}`,
                }}>
                  <span style={{
                    width: 6, height: 6, borderRadius: '50%', flexShrink: 0,
                    background: pass.status === 'active' ? '#16A34A' : pass.status === 'used' ? '#2563EB' : '#94A3B8',
                  }} />
                  <div style={{ flex: 1, minWidth: 0 }}>
                    {pass.status === 'used'
                      ? <p style={{ fontSize: 12, color: '#15803D', fontWeight: 600, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                          Visitor entered using pre-approved code for Flat {pass.flat_number}
                        </p>
                      : <p style={{ fontSize: 12, color: '#475569', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                          Code <strong style={{ fontFamily: 'monospace' }}>{pass.code}</strong> — {pass.visitor_name} → Flat {pass.flat_number}
                        </p>
                    }
                    <p style={{ fontSize: 10, color: '#94A3B8' }}>{pass.purpose} · {pass.status}</p>
                  </div>
                  <span style={{
                    fontSize: 10, fontWeight: 600, padding: '2px 7px', borderRadius: 999,
                    background: pass.status === 'used' ? '#DCFCE7' : pass.status === 'active' ? '#DBEAFE' : '#F1F5F9',
                    color: pass.status === 'used' ? '#15803D' : pass.status === 'active' ? '#1D4ED8' : '#64748B',
                  }}>{pass.status}</span>
                </div>
              ))}
            </div>
          </div>
        );
      })()}

      {/* Alerts Strip */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 20 }}>
        {/* CCTV Alerts */}
        <div style={S.card}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 14 }}>
            <Camera size={15} style={{ color: '#7C3AED' }} />
            <span style={{ fontWeight: 700, fontSize: 14, color: '#1E293B' }}>CCTV Alerts</span>
            <span style={{ marginLeft: 'auto', fontSize: 11, fontWeight: 600, color: '#EF4444', background: '#FFF1F2', padding: '2px 8px', borderRadius: 999 }}>{pendingAlerts.length} unread</span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {DEMO_CAMERA_ALERTS.slice(0,3).map(a => (
              <div key={a.id} style={{
                display: 'flex', alignItems: 'center', gap: 10, padding: '8px 10px', borderRadius: 9,
                background: a.is_acknowledged ? '#F8FAFC' : '#FFF1F2',
                border: `1px solid ${a.is_acknowledged ? '#F1F5F9' : '#FECDD3'}`,
              }}>
                <span style={{ width: 7, height: 7, borderRadius: '50%', background: a.is_acknowledged ? '#CBD5E1' : '#EF4444', flexShrink: 0, animation: a.is_acknowledged ? 'none' : 'pulse-dot 2s infinite' }} />
                <div style={{ flex: 1, minWidth: 0 }}>
                  <p style={{ fontSize: 12, fontWeight: 600, color: '#1E293B', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{a.alert_type}</p>
                  <p style={{ fontSize: 11, color: '#94A3B8' }}>{a.camera_name}</p>
                </div>
                <span style={{ fontSize: 11, color: '#94A3B8', whiteSpace: 'nowrap' }}>{timeAgo(a.timestamp)}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Observations */}
        <div style={S.card}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 14 }}>
            <Eye size={15} style={{ color: '#0D9488' }} />
            <span style={{ fontWeight: 700, fontSize: 14, color: '#1E293B' }}>Guard Observations</span>
            <span style={{ marginLeft: 'auto', fontSize: 11, fontWeight: 600, color: '#D97706', background: '#FFFBEB', padding: '2px 8px', borderRadius: 999 }}>{openObs.length} open</span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {DEMO_OBSERVATIONS.filter(o => o.status !== 'resolved').slice(0,3).map(o => (
              <div key={o.id} style={{
                display: 'flex', alignItems: 'center', gap: 10, padding: '8px 10px', borderRadius: 9,
                background: o.priority === 'critical' ? '#FFF1F2' : '#F8FAFC',
                border: `1px solid ${o.priority === 'critical' ? '#FECDD3' : '#F1F5F9'}`,
              }}>
                <span style={{ width: 7, height: 7, borderRadius: '50%', flexShrink: 0,
                  background: o.priority === 'critical' ? '#EF4444' : o.priority === 'high' ? '#F59E0B' : '#3B82F6',
                  animation: o.priority === 'critical' ? 'pulse-dot 2s infinite' : 'none',
                }} />
                <div style={{ flex: 1, minWidth: 0 }}>
                  <p style={{ fontSize: 12, fontWeight: 600, color: '#1E293B', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{o.category}</p>
                  <p style={{ fontSize: 11, color: '#94A3B8', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{o.location}</p>
                </div>
                <span style={{ fontSize: 11, color: '#94A3B8', whiteSpace: 'nowrap' }}>{timeAgo(o.created_at)}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
