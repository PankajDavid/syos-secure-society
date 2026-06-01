import { useState } from 'react';
import { Clock, CheckCircle, XCircle, AlertCircle, Calendar, TrendingUp } from 'lucide-react';
import { statusBadge } from '@/components/ui/Badge';
import { ATTENDANCE_DATA } from '@/data/demo';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend
} from 'recharts';

const weekData = [
  { day: 'Mon', present: 12, absent: 1, late: 1 },
  { day: 'Tue', present: 11, absent: 2, late: 1 },
  { day: 'Wed', present: 13, absent: 1, late: 0 },
  { day: 'Thu', present: 10, absent: 2, late: 2 },
  { day: 'Fri', present: 12, absent: 1, late: 1 },
  { day: 'Sat', present: 11, absent: 2, late: 1 },
  { day: 'Sun', present: 13, absent: 0, late: 1 },
];

export default function Attendance() {
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [records, setRecords] = useState(ATTENDANCE_DATA);

  const present = records.filter(r => r.status === 'present').length;
  const absent = records.filter(r => r.status === 'absent').length;
  const late = records.filter(r => r.status === 'late').length;

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h2 className="text-xl font-bold text-slate-800">Attendance Management</h2>
          <p className="text-sm text-slate-500">Guard check-in/out and shift tracking</p>
        </div>
        <input
          type="date"
          value={selectedDate}
          onChange={e => setSelectedDate(e.target.value)}
          className="px-3 py-2.5 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          { label: 'Total Guards', value: records.length, icon: Clock, color: 'bg-blue-50 text-blue-600', bg: 'bg-blue-50 border-blue-100' },
          { label: 'Present', value: present, icon: CheckCircle, color: 'bg-green-50 text-green-600', bg: 'bg-green-50 border-green-100' },
          { label: 'Absent', value: absent, icon: XCircle, color: 'bg-red-50 text-red-600', bg: 'bg-red-50 border-red-100' },
          { label: 'Late', value: late, icon: AlertCircle, color: 'bg-amber-50 text-amber-600', bg: 'bg-amber-50 border-amber-100' },
        ].map(s => (
          <div key={s.label} className={`${s.bg} border rounded-xl p-4`}>
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold text-slate-800">{s.value}</div>
                <div className="text-xs text-slate-500 mt-1">{s.label}</div>
              </div>
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${s.color}`}>
                <s.icon size={18} />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Attendance Rate */}
      <div className="bg-white rounded-xl p-5 shadow-sm border border-slate-100">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-bold text-slate-800">Weekly Attendance Overview</h3>
          <span className="text-xs bg-green-50 text-green-600 px-2 py-1 rounded-full font-medium flex items-center gap-1">
            <TrendingUp size={11} /> 87% avg rate
          </span>
        </div>
        <ResponsiveContainer width="100%" height={200}>
          <BarChart data={weekData} barSize={12}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
            <XAxis dataKey="day" tick={{ fontSize: 12, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fontSize: 12, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
            <Tooltip contentStyle={{ borderRadius: '8px', border: '1px solid #e2e8f0', fontSize: 12 }} />
            <Bar dataKey="present" fill="#16A34A" radius={[3, 3, 0, 0]} name="Present" />
            <Bar dataKey="late" fill="#F59E0B" radius={[3, 3, 0, 0]} name="Late" />
            <Bar dataKey="absent" fill="#DC2626" radius={[3, 3, 0, 0]} name="Absent" />
            <Legend iconType="circle" iconSize={8} formatter={(v) => <span style={{ fontSize: 12, color: '#64748b' }}>{v}</span>} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Attendance Table */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between">
          <h3 className="font-bold text-slate-800">Today's Attendance Log</h3>
          <span className="text-xs text-slate-400 flex items-center gap-1"><Calendar size={11} /> {selectedDate}</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-slate-50 border-b border-slate-100">
              <tr>
                {['Guard', 'Employee ID', 'Shift', 'Check In', 'Check Out', 'Status'].map(h => (
                  <th key={h} className="text-left text-xs font-semibold text-slate-500 uppercase tracking-wider px-4 py-3">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {records.map((r, i) => (
                <tr key={i} className={`hover:bg-slate-50 transition-colors ${r.status === 'absent' ? 'opacity-60' : ''}`}>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 bg-gradient-to-br from-blue-100 to-slate-100 rounded-full flex items-center justify-center text-slate-600 font-bold text-xs">
                        {r.guard.charAt(0)}
                      </div>
                      <span className="font-semibold text-slate-800">{r.guard}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 font-mono text-xs text-slate-500">{r.id}</td>
                  <td className="px-4 py-3">{statusBadge(r.shift.toLowerCase())}</td>
                  <td className="px-4 py-3">
                    <span className={`text-xs font-semibold flex items-center gap-1 ${r.status === 'absent' ? 'text-slate-400' : 'text-green-600'}`}>
                      <CheckCircle size={12} /> {r.checkIn}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <span className="text-xs text-slate-400">{r.checkOut}</span>
                  </td>
                  <td className="px-4 py-3">{statusBadge(r.status)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
