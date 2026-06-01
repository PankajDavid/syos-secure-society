import { useState } from 'react';
import { AlertTriangle, Plus, MapPin, Clock, Filter, CheckCircle } from 'lucide-react';
import { statusBadge } from '@/components/ui/Badge';
import { DEMO_INCIDENTS } from '@/data/demo';
import { timeAgo } from '@/lib/utils';

const categories = [
  'Unauthorized Access', 'Suspicious Vehicle', 'Street Light Failure',
  'Water Leakage', 'Broken Boundary', 'Medical Emergency', 'Other'
];

const priorityConfig: Record<string, { bg: string; border: string; dot: string }> = {
  critical: { bg: 'bg-red-50', border: 'border-red-200', dot: 'bg-red-500' },
  high: { bg: 'bg-orange-50', border: 'border-orange-200', dot: 'bg-orange-500' },
  medium: { bg: 'bg-amber-50', border: 'border-amber-200', dot: 'bg-amber-500' },
  low: { bg: 'bg-blue-50', border: 'border-blue-200', dot: 'bg-blue-500' },
};

export default function Incidents() {
  const [incidents, setIncidents] = useState(DEMO_INCIDENTS);
  const [showForm, setShowForm] = useState(false);
  const [statusFilter, setStatusFilter] = useState('all');
  const [form, setForm] = useState({ title: '', description: '', category: '', priority: 'medium', location: '' });

  const filtered = incidents.filter(i => statusFilter === 'all' || i.status === statusFilter);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newIncident = {
      id: `i${Date.now()}`,
      ...form,
      status: 'open' as const,
      created_at: new Date().toISOString(),
    };
    setIncidents([newIncident, ...incidents]);
    setForm({ title: '', description: '', category: '', priority: 'medium', location: '' });
    setShowForm(false);
  };

  const resolve = (id: string) => {
    setIncidents(incidents.map(i => i.id === id ? { ...i, status: 'resolved' as const } : i));
  };

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-slate-800">Incident Management</h2>
          <p className="text-sm text-slate-500">Report and track security incidents</p>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className="flex items-center gap-2 bg-red-600 text-white px-4 py-2.5 rounded-xl text-sm font-semibold hover:bg-red-700 transition-colors shadow-sm"
        >
          <Plus size={16} /> Report Incident
        </button>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          { label: 'Total', value: incidents.length, color: 'bg-slate-50 border-slate-200' },
          { label: 'Open', value: incidents.filter(i => i.status === 'open').length, color: 'bg-red-50 border-red-200' },
          { label: 'In Progress', value: incidents.filter(i => i.status === 'in_progress').length, color: 'bg-amber-50 border-amber-200' },
          { label: 'Resolved', value: incidents.filter(i => i.status === 'resolved').length, color: 'bg-green-50 border-green-200' },
        ].map(s => (
          <div key={s.label} className={`${s.color} border rounded-xl p-3 text-center`}>
            <div className="text-2xl font-bold text-slate-800">{s.value}</div>
            <div className="text-xs text-slate-500">{s.label}</div>
          </div>
        ))}
      </div>

      {/* Report Form */}
      {showForm && (
        <div className="bg-white rounded-xl p-5 shadow-sm border border-red-100">
          <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2"><AlertTriangle size={16} className="text-red-600" /> Report New Incident</h3>
          <form onSubmit={handleSubmit} className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1.5">Incident Title</label>
              <input required value={form.title} onChange={e => setForm({ ...form, title: e.target.value })}
                className="w-full px-3 py-2.5 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-red-400"
                placeholder="Brief title of the incident" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1.5">Category</label>
              <select required value={form.category} onChange={e => setForm({ ...form, category: e.target.value })}
                className="w-full px-3 py-2.5 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-red-400">
                <option value="">Select category</option>
                {categories.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1.5">Location</label>
              <input value={form.location} onChange={e => setForm({ ...form, location: e.target.value })}
                className="w-full px-3 py-2.5 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-red-400"
                placeholder="Where did this happen?" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1.5">Priority</label>
              <select value={form.priority} onChange={e => setForm({ ...form, priority: e.target.value })}
                className="w-full px-3 py-2.5 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-red-400">
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
                <option value="critical">Critical</option>
              </select>
            </div>
            <div className="sm:col-span-2">
              <label className="block text-xs font-semibold text-slate-600 mb-1.5">Description</label>
              <textarea required value={form.description} onChange={e => setForm({ ...form, description: e.target.value })}
                rows={3}
                className="w-full px-3 py-2.5 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-red-400 resize-none"
                placeholder="Describe the incident in detail..." />
            </div>
            <div className="sm:col-span-2 flex gap-3">
              <button type="submit" className="bg-red-600 text-white px-6 py-2.5 rounded-lg text-sm font-semibold hover:bg-red-700 transition-colors">
                Submit Report
              </button>
              <button type="button" onClick={() => setShowForm(false)} className="bg-slate-100 text-slate-600 px-6 py-2.5 rounded-lg text-sm font-semibold hover:bg-slate-200">
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Filters */}
      <div className="flex items-center gap-2 flex-wrap">
        <Filter size={14} className="text-slate-400" />
        {['all', 'open', 'in_progress', 'resolved'].map(s => (
          <button key={s} onClick={() => setStatusFilter(s)}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors capitalize ${statusFilter === s ? 'bg-blue-600 text-white' : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'}`}>
            {s.replace('_', ' ')}
          </button>
        ))}
      </div>

      {/* Incidents List */}
      <div className="space-y-3">
        {filtered.map((incident) => {
          const cfg = priorityConfig[incident.priority] || priorityConfig.medium;
          return (
            <div key={incident.id} className={`bg-white rounded-xl p-5 shadow-sm border ${incident.status === 'open' ? cfg.border : 'border-slate-100'} hover:shadow-md transition-shadow`}>
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-start gap-3 flex-1">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${cfg.bg}`}>
                    <AlertTriangle size={18} className={cfg.dot.replace('bg-', 'text-')} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap mb-1">
                      <h3 className="font-bold text-slate-800">{incident.title}</h3>
                      {statusBadge(incident.priority)}
                      {statusBadge(incident.status)}
                    </div>
                    <p className="text-sm text-slate-600 mb-2">{incident.description}</p>
                    <div className="flex items-center gap-4 text-xs text-slate-400">
                      <span className="flex items-center gap-1"><MapPin size={10} />{incident.location}</span>
                      <span className="flex items-center gap-1"><Clock size={10} />{timeAgo(incident.created_at)}</span>
                      <span className="bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full">{incident.category}</span>
                    </div>
                  </div>
                </div>
                {incident.status !== 'resolved' && (
                  <button
                    onClick={() => resolve(incident.id)}
                    className="flex items-center gap-1 text-xs bg-green-100 text-green-700 px-3 py-1.5 rounded-lg font-semibold hover:bg-green-200 transition-colors whitespace-nowrap flex-shrink-0"
                  >
                    <CheckCircle size={13} /> Mark Resolved
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
