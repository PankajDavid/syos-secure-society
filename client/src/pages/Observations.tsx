import { useState } from 'react';
import { Eye, Plus, MapPin, Clock, Zap, CheckCircle, AlertTriangle } from 'lucide-react';
import { statusBadge } from '@/components/ui/Badge';
import { DEMO_OBSERVATIONS, DEMO_GUARDS } from '@/data/demo';
import { timeAgo } from '@/lib/utils';

const obsCategories = [
  'Street Light Not Working', 'Water Leakage', 'Open Manhole',
  'Damaged Road', 'Broken Tile', 'Tree Hazard', 'Electrical Hazard', 'Other'
];

const catIcons: Record<string, string> = {
  'Street Light Not Working': '💡',
  'Water Leakage': '💧',
  'Open Manhole': '⚠️',
  'Damaged Road': '🛣️',
  'Broken Tile': '🧱',
  'Tree Hazard': '🌳',
  'Electrical Hazard': '⚡',
  'Other': '📋',
};

export default function Observations() {
  const [observations, setObservations] = useState(DEMO_OBSERVATIONS);
  const [showForm, setShowForm] = useState(false);
  const [statusFilter, setStatusFilter] = useState('all');
  const [form, setForm] = useState({ guard_id: '', category: '', description: '', location: '', priority: 'medium' });

  const filtered = observations.filter(o => statusFilter === 'all' || o.status === statusFilter);
  const criticalCount = observations.filter(o => o.priority === 'critical' && o.status !== 'resolved').length;
  const openCount = observations.filter(o => o.status === 'open').length;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const guard = DEMO_GUARDS.find(g => g.id === form.guard_id);
    const newObs = {
      id: `o${Date.now()}`,
      guard_name: guard?.name || 'Guard',
      ...form,
      status: 'open' as const,
      created_at: new Date().toISOString(),
    };
    setObservations([newObs, ...observations]);
    setForm({ guard_id: '', category: '', description: '', location: '', priority: 'medium' });
    setShowForm(false);
  };

  const updateStatus = (id: string, status: string) => {
    setObservations(observations.map(o => o.id === id ? { ...o, status: status as any } : o));
  };

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-slate-800">Security Observation System</h2>
          <p className="text-sm text-slate-500">Guards as eyes and ears of the society</p>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className="flex items-center gap-2 bg-teal-600 text-white px-4 py-2.5 rounded-xl text-sm font-semibold hover:bg-teal-700 transition-colors shadow-sm"
        >
          <Plus size={16} /> New Observation
        </button>
      </div>

      {/* Key Differentiator Banner */}
      <div className="bg-gradient-to-r from-teal-600 to-cyan-600 text-white rounded-xl p-5">
        <div className="flex items-start gap-3">
          <Eye size={24} className="flex-shrink-0 mt-0.5" />
          <div>
            <h3 className="font-bold text-lg mb-1">SYOS Observation System™</h3>
            <p className="text-teal-100 text-sm">Beyond security — guards proactively report infrastructure issues, hazards, and anomalies. This transforms your security team into a society maintenance intelligence network.</p>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          { label: 'Total', value: observations.length, color: 'bg-slate-50 border-slate-200 text-slate-800' },
          { label: 'Open', value: openCount, color: 'bg-red-50 border-red-200 text-red-700' },
          { label: 'Critical', value: criticalCount, color: 'bg-red-100 border-red-300 text-red-800' },
          { label: 'Resolved', value: observations.filter(o => o.status === 'resolved').length, color: 'bg-green-50 border-green-200 text-green-700' },
        ].map(s => (
          <div key={s.label} className={`${s.color} border rounded-xl p-3 text-center`}>
            <div className="text-2xl font-bold">{s.value}</div>
            <div className="text-xs font-medium opacity-80">{s.label}</div>
          </div>
        ))}
      </div>

      {/* Form */}
      {showForm && (
        <div className="bg-white rounded-xl p-5 shadow-sm border border-teal-100">
          <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2"><Eye size={16} className="text-teal-600" /> Log New Observation</h3>
          <form onSubmit={handleSubmit} className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1.5">Reporting Guard</label>
              <select required value={form.guard_id} onChange={e => setForm({ ...form, guard_id: e.target.value })}
                className="w-full px-3 py-2.5 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-teal-400">
                <option value="">Select guard</option>
                {DEMO_GUARDS.filter(g => g.status === 'active').map(g => <option key={g.id} value={g.id}>{g.name} ({g.employee_id})</option>)}
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1.5">Observation Category</label>
              <select required value={form.category} onChange={e => setForm({ ...form, category: e.target.value })}
                className="w-full px-3 py-2.5 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-teal-400">
                <option value="">Select category</option>
                {obsCategories.map(c => <option key={c} value={c}>{catIcons[c]} {c}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1.5">Location</label>
              <input value={form.location} onChange={e => setForm({ ...form, location: e.target.value })}
                className="w-full px-3 py-2.5 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-teal-400"
                placeholder="Specific location in society" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1.5">Priority</label>
              <select value={form.priority} onChange={e => setForm({ ...form, priority: e.target.value })}
                className="w-full px-3 py-2.5 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-teal-400">
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
                <option value="critical">Critical — Immediate action needed</option>
              </select>
            </div>
            <div className="sm:col-span-2">
              <label className="block text-xs font-semibold text-slate-600 mb-1.5">Observation Details</label>
              <textarea required value={form.description} onChange={e => setForm({ ...form, description: e.target.value })}
                rows={3}
                className="w-full px-3 py-2.5 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-teal-400 resize-none"
                placeholder="Describe what you observed..." />
            </div>
            <div className="sm:col-span-2 flex gap-3">
              <button type="submit" className="bg-teal-600 text-white px-6 py-2.5 rounded-lg text-sm font-semibold hover:bg-teal-700 transition-colors">
                Submit Observation
              </button>
              <button type="button" onClick={() => setShowForm(false)} className="bg-slate-100 text-slate-600 px-6 py-2.5 rounded-lg text-sm font-semibold hover:bg-slate-200">
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 flex-wrap">
        {['all', 'open', 'acknowledged', 'resolved'].map(s => (
          <button key={s} onClick={() => setStatusFilter(s)}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors capitalize ${statusFilter === s ? 'bg-teal-600 text-white' : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'}`}>
            {s}
          </button>
        ))}
      </div>

      {/* Observations */}
      <div className="space-y-3">
        {filtered.map((obs) => (
          <div key={obs.id} className={`bg-white rounded-xl p-5 shadow-sm border ${obs.priority === 'critical' && obs.status !== 'resolved' ? 'border-red-200' : obs.status === 'resolved' ? 'border-green-100 opacity-75' : 'border-slate-100'} hover:shadow-md transition-shadow`}>
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-start gap-3 flex-1">
                <div className={`text-2xl w-10 h-10 flex items-center justify-center rounded-xl flex-shrink-0 ${obs.priority === 'critical' ? 'bg-red-50' : obs.priority === 'high' ? 'bg-orange-50' : 'bg-teal-50'}`}>
                  {catIcons[obs.category] || '📋'}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap mb-1">
                    <h3 className="font-bold text-slate-800">{obs.category}</h3>
                    {statusBadge(obs.priority)}
                    {statusBadge(obs.status)}
                  </div>
                  <p className="text-sm text-slate-600 mb-2">{obs.description}</p>
                  <div className="flex items-center gap-4 text-xs text-slate-400">
                    <span className="flex items-center gap-1"><MapPin size={10} />{obs.location}</span>
                    <span className="flex items-center gap-1"><Clock size={10} />{timeAgo(obs.created_at)}</span>
                    <span className="font-medium text-teal-600">Guard: {obs.guard_name}</span>
                  </div>
                </div>
              </div>
              {obs.status !== 'resolved' && (
                <div className="flex flex-col gap-1.5 flex-shrink-0">
                  {obs.status === 'open' && (
                    <button onClick={() => updateStatus(obs.id, 'acknowledged')}
                      className="text-xs bg-blue-100 text-blue-700 px-3 py-1.5 rounded-lg font-semibold hover:bg-blue-200 transition-colors whitespace-nowrap">
                      Acknowledge
                    </button>
                  )}
                  <button onClick={() => updateStatus(obs.id, 'resolved')}
                    className="flex items-center gap-1 text-xs bg-green-100 text-green-700 px-3 py-1.5 rounded-lg font-semibold hover:bg-green-200 transition-colors whitespace-nowrap">
                    <CheckCircle size={12} /> Resolve
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
