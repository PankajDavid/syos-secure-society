import { Shield, Users, AlertTriangle, Camera, Clock, Eye, CheckCircle, TrendingUp } from 'lucide-react';
import {
  AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend
} from 'recharts';
import StatCard from '@/components/ui/StatCard';
import { statusBadge } from '@/components/ui/Badge';
import {
  VISITOR_CHART_DATA, INCIDENT_CHART_DATA, DEMO_VISITORS,
  DEMO_INCIDENTS, DEMO_OBSERVATIONS, DEMO_CAMERA_ALERTS, SOCIETY
} from '@/data/demo';
import { timeAgo, formatDateTime } from '@/lib/utils';

const PIE_COLORS = ['#16A34A', '#F59E0B', '#DC2626'];

const visitorStatusData = [
  { name: 'Approved', value: 89 },
  { name: 'Pending', value: 7 },
  { name: 'Rejected', value: 31 },
];

export default function Dashboard() {
  const recentVisitors = DEMO_VISITORS.slice(0, 5);
  const openIncidents = DEMO_INCIDENTS.filter(i => i.status === 'open' || i.status === 'in_progress');
  const openObservations = DEMO_OBSERVATIONS.filter(o => o.status === 'open');
  const pendingAlerts = DEMO_CAMERA_ALERTS.filter(a => !a.is_acknowledged);

  return (
    <div className="space-y-6">
      {/* Society Banner */}
      <div className="bg-gradient-to-r from-[#0F172A] to-[#1E293B] text-white rounded-2xl p-5 shadow-lg">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <div className="text-xs text-slate-400 mb-0.5">Active Society</div>
            <h2 className="text-xl font-bold">{SOCIETY.name}</h2>
            <p className="text-slate-300 text-sm">{SOCIETY.location}</p>
          </div>
          <div className="flex gap-4">
            {[
              { label: 'Guards', value: SOCIETY.totalGuards },
              { label: 'Flats', value: SOCIETY.totalFlats },
              { label: 'Residents', value: SOCIETY.totalResidents },
            ].map(s => (
              <div key={s.label} className="text-center bg-white/5 border border-white/10 rounded-xl px-4 py-2">
                <div className="text-xl font-bold text-blue-400">{s.value}</div>
                <div className="text-xs text-slate-400">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        <StatCard title="Guards On Duty" value={14} icon={Shield} iconBg="bg-blue-50" iconColor="text-blue-600" trend="+2 vs yesterday" trendUp />
        <StatCard title="Visitors Today" value={127} icon={Users} iconBg="bg-green-50" iconColor="text-green-600" trend="+12% this week" trendUp />
        <StatCard title="Open Incidents" value={3} icon={AlertTriangle} iconBg="bg-red-50" iconColor="text-red-600" trend="1 critical" trendUp={false} alert />
        <StatCard title="CCTV Alerts" value={2} icon={Camera} iconBg="bg-purple-50" iconColor="text-purple-600" trend="Unacknowledged" trendUp={false} />
        <StatCard title="Pending Approvals" value={7} icon={Clock} iconBg="bg-amber-50" iconColor="text-amber-600" trend="Awaiting response" trendUp={false} />
        <StatCard title="Observations" value={4} icon={Eye} iconBg="bg-teal-50" iconColor="text-teal-600" trend="1 critical" trendUp={false} />
      </div>

      {/* Charts Row */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Visitor Trend */}
        <div className="lg:col-span-2 bg-white rounded-xl p-5 shadow-sm border border-slate-100">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="font-bold text-slate-800">Visitor Trend</h3>
              <p className="text-xs text-slate-400">Last 7 days</p>
            </div>
            <span className="text-xs bg-green-50 text-green-600 px-2 py-1 rounded-full font-medium">+8% this week</span>
          </div>
          <ResponsiveContainer width="100%" height={200}>
            <AreaChart data={VISITOR_CHART_DATA}>
              <defs>
                <linearGradient id="visitorGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#2563EB" stopOpacity={0.15} />
                  <stop offset="95%" stopColor="#2563EB" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="day" tick={{ fontSize: 12, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 12, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ borderRadius: '8px', border: '1px solid #e2e8f0', fontSize: 12 }} />
              <Area type="monotone" dataKey="visitors" stroke="#2563EB" fill="url(#visitorGrad)" strokeWidth={2.5} dot={{ fill: '#2563EB', r: 3 }} />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Visitor Status Pie */}
        <div className="bg-white rounded-xl p-5 shadow-sm border border-slate-100">
          <h3 className="font-bold text-slate-800 mb-1">Visitor Status</h3>
          <p className="text-xs text-slate-400 mb-4">Today's breakdown</p>
          <ResponsiveContainer width="100%" height={180}>
            <PieChart>
              <Pie data={visitorStatusData} cx="50%" cy="50%" innerRadius={50} outerRadius={75} paddingAngle={3} dataKey="value">
                {visitorStatusData.map((_, i) => <Cell key={i} fill={PIE_COLORS[i]} />)}
              </Pie>
              <Legend iconType="circle" iconSize={8} formatter={(v) => <span style={{ fontSize: 12, color: '#64748b' }}>{v}</span>} />
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Incident Chart + Activity */}
      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white rounded-xl p-5 shadow-sm border border-slate-100">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-slate-800">Incident Overview</h3>
            <p className="text-xs text-slate-400">Last 6 months</p>
          </div>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={INCIDENT_CHART_DATA} barSize={14}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="month" tick={{ fontSize: 12, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 12, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ borderRadius: '8px', border: '1px solid #e2e8f0', fontSize: 12 }} />
              <Bar dataKey="incidents" fill="#DC2626" radius={[4, 4, 0, 0]} name="Incidents" opacity={0.8} />
              <Bar dataKey="resolved" fill="#16A34A" radius={[4, 4, 0, 0]} name="Resolved" />
              <Legend iconType="circle" iconSize={8} formatter={(v) => <span style={{ fontSize: 12, color: '#64748b' }}>{v}</span>} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-xl p-5 shadow-sm border border-slate-100">
          <h3 className="font-bold text-slate-800 mb-4">Recent Activity</h3>
          <div className="space-y-3">
            {[
              ...recentVisitors.slice(0, 3).map(v => ({
                type: 'visitor', label: v.visitor_name, sub: `${v.purpose} • ${v.flat_number}`, time: v.entry_time, status: v.status
              })),
              ...openIncidents.slice(0, 2).map(i => ({
                type: 'incident', label: i.title, sub: i.category, time: i.created_at, status: i.status
              })),
            ].sort((a, b) => new Date(b.time).getTime() - new Date(a.time).getTime()).slice(0, 6).map((item, idx) => (
              <div key={idx} className="flex items-start gap-3">
                <div className={`w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5 ${item.type === 'visitor' ? 'bg-blue-50' : 'bg-red-50'}`}>
                  {item.type === 'visitor' ? <Users size={13} className="text-blue-600" /> : <AlertTriangle size={13} className="text-red-600" />}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-semibold text-slate-800 truncate">{item.label}</p>
                  <p className="text-xs text-slate-400 truncate">{item.sub}</p>
                  <p className="text-xs text-slate-300">{timeAgo(item.time)}</p>
                </div>
                {statusBadge(item.status)}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Alerts Strip */}
      <div className="grid sm:grid-cols-2 gap-4">
        {/* Camera Alerts */}
        <div className="bg-white rounded-xl p-5 shadow-sm border border-slate-100">
          <div className="flex items-center gap-2 mb-3">
            <Camera size={16} className="text-purple-600" />
            <h3 className="font-bold text-slate-800">CCTV Alerts</h3>
            <span className="ml-auto text-xs bg-red-50 text-red-600 px-2 py-0.5 rounded-full font-medium">{pendingAlerts.length} unread</span>
          </div>
          <div className="space-y-2">
            {DEMO_CAMERA_ALERTS.slice(0, 3).map((a) => (
              <div key={a.id} className={`flex items-start gap-3 p-2.5 rounded-lg ${a.is_acknowledged ? 'bg-slate-50' : 'bg-red-50 border border-red-100'}`}>
                <div className={`w-2 h-2 rounded-full mt-1.5 flex-shrink-0 ${a.is_acknowledged ? 'bg-slate-400' : 'bg-red-500 animate-pulse'}`} />
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-semibold text-slate-800">{a.alert_type}</p>
                  <p className="text-xs text-slate-500 truncate">{a.camera_name}</p>
                </div>
                <span className="text-xs text-slate-400 whitespace-nowrap">{timeAgo(a.timestamp)}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Critical Observations */}
        <div className="bg-white rounded-xl p-5 shadow-sm border border-slate-100">
          <div className="flex items-center gap-2 mb-3">
            <Eye size={16} className="text-teal-600" />
            <h3 className="font-bold text-slate-800">Guard Observations</h3>
            <span className="ml-auto text-xs bg-amber-50 text-amber-600 px-2 py-0.5 rounded-full font-medium">{openObservations.length} open</span>
          </div>
          <div className="space-y-2">
            {DEMO_OBSERVATIONS.filter(o => o.status !== 'resolved').slice(0, 3).map((o) => (
              <div key={o.id} className={`flex items-start gap-3 p-2.5 rounded-lg ${o.priority === 'critical' ? 'bg-red-50 border border-red-100' : 'bg-slate-50'}`}>
                <div className={`w-2 h-2 rounded-full mt-1.5 flex-shrink-0 ${o.priority === 'critical' ? 'bg-red-500 animate-pulse' : o.priority === 'high' ? 'bg-amber-500' : 'bg-blue-500'}`} />
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-semibold text-slate-800">{o.category}</p>
                  <p className="text-xs text-slate-500 truncate">{o.location}</p>
                </div>
                <span className="text-xs text-slate-400 whitespace-nowrap">{timeAgo(o.created_at)}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
