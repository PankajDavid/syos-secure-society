import { useState } from 'react';
import { Search, Shield, Phone, MapPin, Calendar, QrCode, Filter } from 'lucide-react';
import { statusBadge, Badge } from '@/components/ui/Badge';
import { DEMO_GUARDS } from '@/data/demo';
import { Link } from 'react-router-dom';

const shiftColors: Record<string, string> = {
  morning: 'bg-amber-50 border-amber-100',
  evening: 'bg-purple-50 border-purple-100',
  night: 'bg-slate-100 border-slate-200',
};

export default function Guards() {
  const [search, setSearch] = useState('');
  const [shiftFilter, setShiftFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [view, setView] = useState<'grid' | 'list'>('grid');

  const filtered = DEMO_GUARDS.filter(g => {
    const matchSearch = g.name.toLowerCase().includes(search.toLowerCase()) ||
      g.employee_id.toLowerCase().includes(search.toLowerCase()) ||
      g.location.toLowerCase().includes(search.toLowerCase());
    const matchShift = shiftFilter === 'all' || g.shift === shiftFilter;
    const matchStatus = statusFilter === 'all' || g.status === statusFilter;
    return matchSearch && matchShift && matchStatus;
  });

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-slate-800">Guard Management</h2>
          <p className="text-sm text-slate-500">All security personnel — {DEMO_GUARDS.length} guards registered</p>
        </div>
        <button className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2.5 rounded-xl text-sm font-semibold hover:bg-blue-700 transition-colors shadow-sm">
          + Add Guard
        </button>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-3 gap-3">
        {[
          { label: 'Active', value: DEMO_GUARDS.filter(g => g.status === 'active').length, color: 'bg-green-50 text-green-700 border-green-100' },
          { label: 'On Leave', value: DEMO_GUARDS.filter(g => g.status === 'on_leave').length, color: 'bg-amber-50 text-amber-700 border-amber-100' },
          { label: 'Inactive', value: DEMO_GUARDS.filter(g => g.status === 'inactive').length, color: 'bg-red-50 text-red-700 border-red-100' },
        ].map(s => (
          <div key={s.label} className={`${s.color} border rounded-xl p-3 text-center`}>
            <div className="text-2xl font-bold">{s.value}</div>
            <div className="text-xs font-medium">{s.label}</div>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl p-4 shadow-sm border border-slate-100 flex flex-wrap gap-3">
        <div className="relative flex-1 min-w-48">
          <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search guards..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full pl-9 pr-3 py-2.5 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <select
          value={shiftFilter}
          onChange={e => setShiftFilter(e.target.value)}
          className="px-3 py-2.5 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="all">All Shifts</option>
          <option value="morning">Morning</option>
          <option value="evening">Evening</option>
          <option value="night">Night</option>
        </select>
        <select
          value={statusFilter}
          onChange={e => setStatusFilter(e.target.value)}
          className="px-3 py-2.5 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="all">All Status</option>
          <option value="active">Active</option>
          <option value="on_leave">On Leave</option>
          <option value="inactive">Inactive</option>
        </select>
        <div className="flex border border-slate-200 rounded-lg overflow-hidden">
          {(['grid', 'list'] as const).map(v => (
            <button key={v} onClick={() => setView(v)} className={`px-3 py-2 text-xs font-medium transition-colors ${view === v ? 'bg-blue-600 text-white' : 'bg-white text-slate-500 hover:bg-slate-50'}`}>
              {v === 'grid' ? '⊞ Grid' : '≡ List'}
            </button>
          ))}
        </div>
      </div>

      {/* Guard Grid */}
      {view === 'grid' ? (
        <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-4">
          {filtered.map((g) => (
            <div key={g.id} className={`bg-white rounded-xl p-5 shadow-sm border hover:shadow-md transition-all ${g.status === 'active' ? 'border-slate-100' : 'border-slate-200 opacity-80'}`}>
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center font-bold text-lg ${shiftColors[g.shift]}`}>
                    {g.name.charAt(0)}
                  </div>
                  <div>
                    <p className="font-bold text-slate-800">{g.name}</p>
                    <p className="text-xs text-slate-400">{g.employee_id}</p>
                  </div>
                </div>
                {statusBadge(g.status)}
              </div>

              <div className="space-y-2 mb-4">
                <div className="flex items-center gap-2 text-xs text-slate-500">
                  <Phone size={11} className="text-slate-400" /> {g.phone}
                </div>
                <div className="flex items-center gap-2 text-xs text-slate-500">
                  <MapPin size={11} className="text-blue-400" /> {g.location}
                </div>
                <div className="flex items-center gap-2 text-xs text-slate-500">
                  <Calendar size={11} className="text-slate-400" /> Joined: {g.join_date}
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex gap-2">
                  {statusBadge(g.shift)}
                  {statusBadge(g.verification_status)}
                </div>
                <Link
                  to="/qr-verify"
                  className="flex items-center gap-1 text-xs text-blue-600 font-medium hover:text-blue-700"
                >
                  <QrCode size={13} /> Verify
                </Link>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-slate-50 border-b border-slate-100">
              <tr>
                {['Guard', 'Employee ID', 'Phone', 'Shift', 'Location', 'Status', 'Verification'].map(h => (
                  <th key={h} className="text-left text-xs font-semibold text-slate-500 uppercase tracking-wider px-4 py-3">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {filtered.map((g) => (
                <tr key={g.id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-700 font-bold text-xs">{g.name.charAt(0)}</div>
                      <span className="font-semibold text-slate-800">{g.name}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-slate-600 font-mono text-xs">{g.employee_id}</td>
                  <td className="px-4 py-3 text-slate-500 text-xs">{g.phone}</td>
                  <td className="px-4 py-3">{statusBadge(g.shift)}</td>
                  <td className="px-4 py-3 text-slate-600">{g.location}</td>
                  <td className="px-4 py-3">{statusBadge(g.status)}</td>
                  <td className="px-4 py-3">{statusBadge(g.verification_status)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
