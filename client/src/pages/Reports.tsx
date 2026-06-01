import { FileText, Download, BarChart3, Users, Shield, AlertTriangle, Eye, Calendar } from 'lucide-react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  LineChart, Line, Legend
} from 'recharts';

const reportTypes = [
  { title: 'Daily Security Report', desc: 'Complete summary of all security activities for the day', icon: Shield, color: 'text-blue-600 bg-blue-50', category: 'Daily' },
  { title: 'Visitor Summary Report', desc: 'Visitor logs, approvals, rejections with analytics', icon: Users, color: 'text-green-600 bg-green-50', category: 'Visitor' },
  { title: 'Guard Attendance Report', desc: 'Detailed attendance records, shift coverage, overtime', icon: Shield, color: 'text-purple-600 bg-purple-50', category: 'Attendance' },
  { title: 'Incident Report', desc: 'All incidents, resolution time, category breakdown', icon: AlertTriangle, color: 'text-red-600 bg-red-50', category: 'Incident' },
  { title: 'Observation Report', desc: 'Guard observations, infrastructure issues, action taken', icon: Eye, color: 'text-teal-600 bg-teal-50', category: 'Observation' },
  { title: 'Monthly Analytics', desc: 'Month-over-month trends, KPIs, and performance metrics', icon: BarChart3, color: 'text-orange-600 bg-orange-50', category: 'Analytics' },
];

const monthlyData = [
  { month: 'Jan', visitors: 2340, incidents: 8, guards: 14 },
  { month: 'Feb', visitors: 2100, incidents: 6, guards: 14 },
  { month: 'Mar', visitors: 2800, incidents: 11, guards: 15 },
  { month: 'Apr', visitors: 2650, incidents: 5, guards: 14 },
  { month: 'May', visitors: 3100, incidents: 9, guards: 16 },
  { month: 'Jun', visitors: 2900, incidents: 4, guards: 14 },
];

const categoryData = [
  { name: 'Personal Visit', count: 1240 },
  { name: 'Delivery', count: 890 },
  { name: 'Domestic Help', count: 670 },
  { name: 'Maintenance', count: 340 },
  { name: 'Business', count: 280 },
  { name: 'Courier', count: 520 },
];

function downloadMock(type: string) {
  alert(`📥 ${type} download started!\n\nIn production, this will generate a real PDF/Excel/CSV file.`);
}

export default function Reports() {
  return (
    <div className="space-y-5">
      <div>
        <h2 className="text-xl font-bold text-slate-800">Reports & Analytics</h2>
        <p className="text-sm text-slate-500">Generate and export security reports</p>
      </div>

      {/* Date Range Selector */}
      <div className="bg-white rounded-xl p-4 shadow-sm border border-slate-100 flex flex-wrap items-center gap-3">
        <Calendar size={16} className="text-slate-400" />
        <span className="text-sm text-slate-600 font-medium">Report Period:</span>
        <input type="date" defaultValue="2025-06-01" className="px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
        <span className="text-slate-400 text-sm">to</span>
        <input type="date" defaultValue="2025-06-30" className="px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-blue-700 transition-colors">Apply Filter</button>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          { label: 'Total Visitors (June)', value: '2,847', change: '+8.2%', up: true },
          { label: 'Incidents Reported', value: '23', change: '-12%', up: false },
          { label: 'Guard Attendance', value: '94.2%', change: '+2.1%', up: true },
          { label: 'Observations Filed', value: '41', change: '+15%', up: true },
        ].map(s => (
          <div key={s.label} className="bg-white rounded-xl p-4 shadow-sm border border-slate-100">
            <p className="text-2xl font-bold text-slate-800">{s.value}</p>
            <p className="text-xs text-slate-500 mt-0.5">{s.label}</p>
            <p className={`text-xs font-semibold mt-2 ${s.up ? 'text-green-600' : 'text-red-600'}`}>{s.change} vs last month</p>
          </div>
        ))}
      </div>

      {/* Charts */}
      <div className="grid lg:grid-cols-2 gap-5">
        <div className="bg-white rounded-xl p-5 shadow-sm border border-slate-100">
          <h3 className="font-bold text-slate-800 mb-4">Monthly Visitor Trends</h3>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="month" tick={{ fontSize: 12, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 12, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ borderRadius: '8px', border: '1px solid #e2e8f0', fontSize: 12 }} />
              <Line type="monotone" dataKey="visitors" stroke="#2563EB" strokeWidth={2.5} dot={{ fill: '#2563EB', r: 3 }} name="Visitors" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded-xl p-5 shadow-sm border border-slate-100">
          <h3 className="font-bold text-slate-800 mb-4">Visitor Purpose Breakdown</h3>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={categoryData} layout="vertical" barSize={12}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis type="number" tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
              <YAxis dataKey="name" type="category" tick={{ fontSize: 10, fill: '#64748b' }} axisLine={false} tickLine={false} width={90} />
              <Tooltip contentStyle={{ borderRadius: '8px', border: '1px solid #e2e8f0', fontSize: 12 }} />
              <Bar dataKey="count" fill="#2563EB" radius={[0, 4, 4, 0]} name="Count" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Report Cards */}
      <div>
        <h3 className="text-sm font-bold text-slate-700 mb-3 uppercase tracking-wide">Available Reports</h3>
        <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-4">
          {reportTypes.map((report) => (
            <div key={report.title} className="bg-white rounded-xl p-5 shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
              <div className="flex items-start gap-3 mb-4">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${report.color}`}>
                  <report.icon size={18} />
                </div>
                <div>
                  <h4 className="font-bold text-slate-800 text-sm">{report.title}</h4>
                  <p className="text-xs text-slate-400 mt-0.5">{report.desc}</p>
                </div>
              </div>
              <div className="flex gap-2">
                {['PDF', 'Excel', 'CSV'].map(format => (
                  <button
                    key={format}
                    onClick={() => downloadMock(`${report.title} — ${format}`)}
                    className="flex-1 flex items-center justify-center gap-1 text-xs border border-slate-200 text-slate-600 py-2 rounded-lg hover:bg-slate-50 hover:border-blue-300 hover:text-blue-600 transition-all font-medium"
                  >
                    <Download size={11} /> {format}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Scheduled Reports */}
      <div className="bg-gradient-to-r from-[#0F172A] to-[#1E293B] text-white rounded-xl p-5">
        <h3 className="font-bold mb-3">Automated Report Scheduling</h3>
        <div className="grid sm:grid-cols-3 gap-3">
          {[
            { label: 'Daily Report', time: 'Every day at 8:00 AM', status: 'Active' },
            { label: 'Weekly Summary', time: 'Every Monday at 9:00 AM', status: 'Active' },
            { label: 'Monthly Analytics', time: '1st of every month', status: 'Active' },
          ].map(s => (
            <div key={s.label} className="bg-white/5 border border-white/10 rounded-xl p-3">
              <p className="font-semibold text-sm">{s.label}</p>
              <p className="text-xs text-slate-400 mt-0.5">{s.time}</p>
              <span className="inline-block mt-2 text-xs text-green-400 font-semibold">● {s.status}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
