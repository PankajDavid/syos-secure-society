import { useState } from 'react';
import { Plus, Search, Filter, Car, Phone, MapPin, Clock, Camera } from 'lucide-react';
import { statusBadge } from '@/components/ui/Badge';
import { DEMO_VISITORS } from '@/data/demo';
import { formatDateTime } from '@/lib/utils';

const purposes = ['Personal Visit', 'Delivery', 'Maintenance', 'Business', 'Domestic Help', 'Courier', 'Service', 'Other'];

export default function Visitors() {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [showForm, setShowForm] = useState(false);
  const [visitors, setVisitors] = useState(DEMO_VISITORS);
  const [form, setForm] = useState({ visitor_name: '', mobile: '', vehicle_number: '', flat_number: '', purpose: '' });

  const filtered = visitors.filter(v => {
    const matchSearch = v.visitor_name.toLowerCase().includes(search.toLowerCase()) ||
      v.flat_number.toLowerCase().includes(search.toLowerCase()) ||
      v.mobile.includes(search);
    const matchStatus = statusFilter === 'all' || v.status === statusFilter;
    return matchSearch && matchStatus;
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newVisitor = {
      id: `v${Date.now()}`,
      ...form,
      vehicle_number: form.vehicle_number || null,
      entry_time: new Date().toISOString(),
      status: 'pending' as const,
    };
    setVisitors([newVisitor, ...visitors]);
    setForm({ visitor_name: '', mobile: '', vehicle_number: '', flat_number: '', purpose: '' });
    setShowForm(false);
  };

  const updateStatus = (id: string, status: string) => {
    setVisitors(visitors.map(v => v.id === id ? { ...v, status: status as any } : v));
  };

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-slate-800">Visitor Management</h2>
          <p className="text-sm text-slate-500">Track and manage all visitor entries</p>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2.5 rounded-xl text-sm font-semibold hover:bg-blue-700 transition-colors shadow-sm"
        >
          <Plus size={16} /> Log Visitor
        </button>
      </div>

      {/* Entry Form */}
      {showForm && (
        <div className="bg-white rounded-xl p-5 shadow-sm border border-slate-100">
          <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
            <Plus size={16} className="text-blue-600" /> New Visitor Entry
          </h3>
          <form onSubmit={handleSubmit} className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { key: 'visitor_name', label: 'Visitor Name', placeholder: 'Full name', required: true },
              { key: 'mobile', label: 'Mobile Number', placeholder: '10-digit mobile', required: true },
              { key: 'vehicle_number', label: 'Vehicle Number', placeholder: 'HR26AB1234 (optional)' },
              { key: 'flat_number', label: 'Flat Number', placeholder: 'B-204', required: true },
            ].map((field) => (
              <div key={field.key}>
                <label className="block text-xs font-semibold text-slate-600 mb-1.5">{field.label}</label>
                <input
                  type="text"
                  placeholder={field.placeholder}
                  value={form[field.key as keyof typeof form]}
                  onChange={e => setForm({ ...form, [field.key]: e.target.value })}
                  required={field.required}
                  className="w-full px-3 py-2.5 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            ))}
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1.5">Purpose</label>
              <select
                value={form.purpose}
                onChange={e => setForm({ ...form, purpose: e.target.value })}
                required
                className="w-full px-3 py-2.5 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select purpose</option>
                {purposes.map(p => <option key={p} value={p}>{p}</option>)}
              </select>
            </div>
            <div className="sm:col-span-2 lg:col-span-3 flex gap-3">
              <button type="submit" className="bg-blue-600 text-white px-6 py-2.5 rounded-lg text-sm font-semibold hover:bg-blue-700 transition-colors">
                Submit Entry
              </button>
              <button type="button" onClick={() => setShowForm(false)} className="bg-slate-100 text-slate-600 px-6 py-2.5 rounded-lg text-sm font-semibold hover:bg-slate-200 transition-colors">
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Filters */}
      <div className="bg-white rounded-xl p-4 shadow-sm border border-slate-100 flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search by name, flat, mobile..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full pl-9 pr-3 py-2.5 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="flex items-center gap-2">
          <Filter size={14} className="text-slate-400" />
          {['all', 'pending', 'approved', 'rejected'].map(s => (
            <button
              key={s}
              onClick={() => setStatusFilter(s)}
              className={`px-3 py-2 rounded-lg text-xs font-semibold transition-colors capitalize ${statusFilter === s ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      {/* Stats Bar */}
      <div className="grid grid-cols-3 gap-3">
        {[
          { label: 'Total Today', value: visitors.length, color: 'bg-blue-50 text-blue-700' },
          { label: 'Approved', value: visitors.filter(v => v.status === 'approved').length, color: 'bg-green-50 text-green-700' },
          { label: 'Pending', value: visitors.filter(v => v.status === 'pending').length, color: 'bg-amber-50 text-amber-700' },
        ].map(s => (
          <div key={s.label} className={`${s.color} rounded-xl p-3 text-center`}>
            <div className="text-2xl font-bold">{s.value}</div>
            <div className="text-xs font-medium mt-0.5">{s.label}</div>
          </div>
        ))}
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-slate-50 border-b border-slate-100">
              <tr>
                {['Visitor', 'Contact', 'Flat', 'Purpose', 'Entry Time', 'Status', 'Action'].map(h => (
                  <th key={h} className="text-left text-xs font-semibold text-slate-500 uppercase tracking-wider px-4 py-3">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {filtered.map((v) => (
                <tr key={v.id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 bg-gradient-to-br from-blue-100 to-blue-200 rounded-full flex items-center justify-center text-blue-700 font-bold text-sm flex-shrink-0">
                        {v.visitor_name.charAt(0)}
                      </div>
                      <div>
                        <p className="font-semibold text-slate-800">{v.visitor_name}</p>
                        {v.vehicle_number && (
                          <p className="text-xs text-slate-400 flex items-center gap-1"><Car size={10} />{v.vehicle_number}</p>
                        )}
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <span className="flex items-center gap-1 text-slate-500 text-xs"><Phone size={11} />{v.mobile}</span>
                  </td>
                  <td className="px-4 py-3">
                    <span className="flex items-center gap-1 text-slate-700 font-medium"><MapPin size={11} className="text-blue-400" />{v.flat_number}</span>
                  </td>
                  <td className="px-4 py-3 text-slate-600">{v.purpose}</td>
                  <td className="px-4 py-3">
                    <span className="flex items-center gap-1 text-slate-500 text-xs"><Clock size={11} />{formatDateTime(v.entry_time)}</span>
                  </td>
                  <td className="px-4 py-3">{statusBadge(v.status)}</td>
                  <td className="px-4 py-3">
                    {v.status === 'pending' && (
                      <div className="flex gap-2">
                        <button onClick={() => updateStatus(v.id, 'approved')} className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-lg font-semibold hover:bg-green-200 transition-colors">
                          Approve
                        </button>
                        <button onClick={() => updateStatus(v.id, 'rejected')} className="text-xs bg-red-100 text-red-700 px-2 py-1 rounded-lg font-semibold hover:bg-red-200 transition-colors">
                          Reject
                        </button>
                      </div>
                    )}
                    {v.status !== 'pending' && <span className="text-xs text-slate-400">–</span>}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="px-4 py-3 border-t border-slate-100 bg-slate-50 flex items-center justify-between">
          <span className="text-xs text-slate-500">Showing {filtered.length} of {visitors.length} entries</span>
          <div className="flex gap-1">
            <button className="px-3 py-1.5 text-xs border border-slate-200 rounded-lg text-slate-600 hover:bg-white">Previous</button>
            <button className="px-3 py-1.5 text-xs bg-blue-600 rounded-lg text-white">1</button>
            <button className="px-3 py-1.5 text-xs border border-slate-200 rounded-lg text-slate-600 hover:bg-white">Next</button>
          </div>
        </div>
      </div>
    </div>
  );
}
