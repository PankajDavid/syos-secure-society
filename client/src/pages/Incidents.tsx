import { useState } from 'react';
import { AlertTriangle, Plus, MapPin, Clock, CheckCircle } from 'lucide-react';
import { statusBadge } from '@/components/ui/Badge';
import { DEMO_INCIDENTS } from '@/data/demo';
import { timeAgo } from '@/lib/utils';

const categories = ['Unauthorized Access','Suspicious Vehicle','Street Light Failure','Water Leakage','Broken Boundary','Medical Emergency','Other'];

const priorityStyle: Record<string, { bg:string; border:string; iconColor:string }> = {
  critical: { bg:'#FFF1F2', border:'#FECDD3', iconColor:'#E11D48' },
  high:     { bg:'#FFF7ED', border:'#FED7AA', iconColor:'#EA580C' },
  medium:   { bg:'#FFFBEB', border:'#FDE68A', iconColor:'#D97706' },
  low:      { bg:'#EFF6FF', border:'#BFDBFE', iconColor:'#2563EB' },
};

export default function Incidents() {
  const [incidents, setIncidents] = useState(DEMO_INCIDENTS);
  const [showForm, setShowForm] = useState(false);
  const [statusFilter, setStatusFilter] = useState('all');
  const [form, setForm] = useState({ title:'', description:'', category:'', priority:'medium', location:'' });

  const filtered = incidents.filter(i => statusFilter==='all' || i.status===statusFilter);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIncidents([{ id:`i${Date.now()}`, ...form, status:'open' as const, created_at: new Date().toISOString() }, ...incidents]);
    setForm({ title:'', description:'', category:'', priority:'medium', location:'' });
    setShowForm(false);
  };

  const resolve = (id: string) =>
    setIncidents(incidents.map(i => i.id===id ? { ...i, status:'resolved' as const } : i));

  return (
    <div style={{ display:'flex', flexDirection:'column', gap:16 }}>
      <div className="page-header">
        <div><h2>Incident Management</h2><p>Report and track security incidents</p></div>
        <button onClick={() => setShowForm(!showForm)} className="btn btn-danger"><Plus size={15}/> Report Incident</button>
      </div>

      {/* Summary */}
      <div style={{ display:'grid', gridTemplateColumns:'repeat(2,1fr)', gap:10 }}>
        {[
          { label:'Total',       value: incidents.length,                                      bg:'#F8FAFC', c:'#475569' },
          { label:'Open',        value: incidents.filter(i=>i.status==='open').length,         bg:'#FFF1F2', c:'#BE123C' },
          { label:'In Progress', value: incidents.filter(i=>i.status==='in_progress').length,  bg:'#FFFBEB', c:'#B45309' },
          { label:'Resolved',    value: incidents.filter(i=>i.status==='resolved').length,     bg:'#F0FDF4', c:'#15803D' },
        ].map(s => (
          <div key={s.label} style={{ background:s.bg, borderRadius:12, padding:'12px 8px', textAlign:'center', border:`1px solid ${s.bg === '#F8FAFC' ? '#E2E8F0' : 'transparent'}` }}>
            <div style={{ fontSize:22, fontWeight:800, color:s.c }}>{s.value}</div>
            <div style={{ fontSize:11, fontWeight:600, color:s.c, opacity:0.75 }}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* Form */}
      {showForm && (
        <div className="card" style={{ borderColor:'#FECDD3' }}>
          <h3 style={{ fontSize:14, fontWeight:700, color:'#1E293B', marginBottom:14, display:'flex', alignItems:'center', gap:6 }}>
            <AlertTriangle size={14} style={{ color:'#E11D48' }}/> Report New Incident
          </h3>
          <form onSubmit={handleSubmit}>
            <div className="form-grid">
              <div>
                <label className="field-label">Incident Title</label>
                <input className="input" required placeholder="Brief title…" value={form.title} onChange={e=>setForm({...form,title:e.target.value})} />
              </div>
              <div>
                <label className="field-label">Category</label>
                <select className="input" required value={form.category} onChange={e=>setForm({...form,category:e.target.value})}>
                  <option value="">Select category</option>
                  {categories.map(c=><option key={c}>{c}</option>)}
                </select>
              </div>
              <div>
                <label className="field-label">Location</label>
                <input className="input" placeholder="Where did this happen?" value={form.location} onChange={e=>setForm({...form,location:e.target.value})} />
              </div>
              <div>
                <label className="field-label">Priority</label>
                <select className="input" value={form.priority} onChange={e=>setForm({...form,priority:e.target.value})}>
                  {['low','medium','high','critical'].map(p=><option key={p} value={p} style={{ textTransform:'capitalize' }}>{p.charAt(0).toUpperCase()+p.slice(1)}</option>)}
                </select>
              </div>
              <div style={{ gridColumn:'1/-1' }}>
                <label className="field-label">Description</label>
                <textarea className="input" required rows={3} style={{ resize:'none' }} placeholder="Describe the incident in detail…"
                  value={form.description} onChange={e=>setForm({...form,description:e.target.value})} />
              </div>
            </div>
            <div style={{ display:'flex', gap:10, marginTop:14 }}>
              <button type="submit" className="btn btn-danger">Submit Report</button>
              <button type="button" className="btn btn-ghost" onClick={()=>setShowForm(false)}>Cancel</button>
            </div>
          </form>
        </div>
      )}

      {/* Filter tabs */}
      <div style={{ display:'flex', gap:6, flexWrap:'wrap' }}>
        {['all','open','in_progress','resolved'].map(s => (
          <button key={s} onClick={()=>setStatusFilter(s)}
            className={`btn btn-sm ${statusFilter===s?'btn-primary':'btn-ghost'}`}
            style={{ textTransform:'capitalize' }}>{s.replace('_',' ')}</button>
        ))}
      </div>

      {/* List */}
      <div style={{ display:'flex', flexDirection:'column', gap:10 }}>
        {filtered.map(inc => {
          const ps = priorityStyle[inc.priority] || priorityStyle.medium;
          return (
            <div key={inc.id} className="card"
              style={{ border: inc.status!=='resolved' ? `1px solid ${ps.border}` : '1px solid #F1F5F9', background: inc.status==='resolved' ? '#FAFAFA' : 'white' }}>
              <div style={{ display:'flex', gap:12 }}>
                <div style={{ width:40, height:40, borderRadius:12, background:ps.bg, display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>
                  <AlertTriangle size={18} style={{ color:ps.iconColor }} />
                </div>
                <div style={{ flex:1, minWidth:0 }}>
                  <div style={{ display:'flex', flexWrap:'wrap', alignItems:'center', gap:6, marginBottom:6 }}>
                    <span style={{ fontWeight:700, fontSize:14, color:'#1E293B' }}>{inc.title}</span>
                    {statusBadge(inc.priority)}
                    {statusBadge(inc.status)}
                  </div>
                  <p style={{ fontSize:13, color:'#64748B', marginBottom:8, lineHeight:1.5 }}>{inc.description}</p>
                  <div style={{ display:'flex', flexWrap:'wrap', gap:12, fontSize:11, color:'#94A3B8' }}>
                    <span style={{ display:'flex', alignItems:'center', gap:3 }}><MapPin size={10}/>{inc.location}</span>
                    <span style={{ display:'flex', alignItems:'center', gap:3 }}><Clock size={10}/>{timeAgo(inc.created_at)}</span>
                    <span style={{ background:'#F1F5F9', color:'#475569', padding:'2px 8px', borderRadius:999 }}>{inc.category}</span>
                  </div>
                </div>
                {inc.status!=='resolved' && (
                  <button onClick={()=>resolve(inc.id)} className="btn btn-sm btn-success" style={{ flexShrink:0, alignSelf:'flex-start', whiteSpace:'nowrap' }}>
                    <CheckCircle size={12}/> Resolve
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
