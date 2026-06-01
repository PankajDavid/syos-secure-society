import { useState } from 'react';
import { Eye, Plus, MapPin, Clock, CheckCircle } from 'lucide-react';
import { statusBadge } from '@/components/ui/Badge';
import { DEMO_OBSERVATIONS, DEMO_GUARDS } from '@/data/demo';
import { timeAgo } from '@/lib/utils';

const obsCategories = ['Street Light Not Working','Water Leakage','Open Manhole','Damaged Road','Broken Tile','Tree Hazard','Electrical Hazard','Other'];
const catIcons: Record<string,string> = {
  'Street Light Not Working':'💡','Water Leakage':'💧','Open Manhole':'⚠️',
  'Damaged Road':'🛣️','Broken Tile':'🧱','Tree Hazard':'🌳','Electrical Hazard':'⚡','Other':'📋',
};

export default function Observations() {
  const [observations, setObservations] = useState(DEMO_OBSERVATIONS);
  const [showForm, setShowForm] = useState(false);
  const [statusFilter, setStatusFilter] = useState('all');
  const [form, setForm] = useState({ guard_id:'', category:'', description:'', location:'', priority:'medium' });

  const filtered = observations.filter(o => statusFilter==='all' || o.status===statusFilter);
  const critical  = observations.filter(o => o.priority==='critical' && o.status!=='resolved').length;
  const open      = observations.filter(o => o.status==='open').length;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const guard = DEMO_GUARDS.find(g => g.id===form.guard_id);
    setObservations([{ id:`o${Date.now()}`, guard_name: guard?.name||'Guard', ...form, status:'open' as const, created_at: new Date().toISOString() }, ...observations]);
    setForm({ guard_id:'', category:'', description:'', location:'', priority:'medium' });
    setShowForm(false);
  };

  const updateStatus = (id: string, status: string) =>
    setObservations(observations.map(o => o.id===id ? { ...o, status: status as any } : o));

  return (
    <div style={{ display:'flex', flexDirection:'column', gap:16 }}>
      <div className="page-header">
        <div><h2>Security Observations</h2><p>Guards as eyes and ears of the society</p></div>
        <button onClick={()=>setShowForm(!showForm)} className="btn btn-teal"><Plus size={15}/> New Observation</button>
      </div>

      {/* Banner */}
      <div style={{ background:'linear-gradient(135deg,#0D9488,#0891B2)', borderRadius:14, padding:'16px 18px', color:'white', display:'flex', gap:12, alignItems:'flex-start' }}>
        <Eye size={22} style={{ flexShrink:0, marginTop:2 }} />
        <div>
          <p style={{ fontWeight:800, fontSize:15, marginBottom:4 }}>SYOS Observation System™</p>
          <p style={{ fontSize:13, color:'rgba(255,255,255,0.8)', lineHeight:1.6 }}>
            Beyond security — guards proactively report infrastructure issues and hazards, transforming your security team into a society maintenance intelligence network.
          </p>
        </div>
      </div>

      {/* Stats */}
      <div style={{ display:'grid', gridTemplateColumns:'repeat(2,1fr)', gap:10 }}>
        {[
          { label:'Total',    value: observations.length,                                      bg:'#F8FAFC', c:'#475569' },
          { label:'Open',     value: open,                                                      bg:'#FFF1F2', c:'#BE123C' },
          { label:'Critical', value: critical,                                                  bg:'#FEE2E2', c:'#991B1B' },
          { label:'Resolved', value: observations.filter(o=>o.status==='resolved').length,     bg:'#F0FDF4', c:'#15803D' },
        ].map(s => (
          <div key={s.label} style={{ background:s.bg, borderRadius:12, padding:'12px 8px', textAlign:'center' }}>
            <div style={{ fontSize:22, fontWeight:800, color:s.c }}>{s.value}</div>
            <div style={{ fontSize:11, fontWeight:600, color:s.c, opacity:0.75 }}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* Form */}
      {showForm && (
        <div className="card" style={{ borderColor:'#99F6E4' }}>
          <h3 style={{ fontSize:14, fontWeight:700, color:'#1E293B', marginBottom:14, display:'flex', alignItems:'center', gap:6 }}>
            <Eye size={14} style={{ color:'#0D9488' }}/> Log New Observation
          </h3>
          <form onSubmit={handleSubmit}>
            <div className="form-grid">
              <div>
                <label className="field-label">Reporting Guard</label>
                <select className="input" required value={form.guard_id} onChange={e=>setForm({...form,guard_id:e.target.value})}>
                  <option value="">Select guard</option>
                  {DEMO_GUARDS.filter(g=>g.status==='active').map(g=><option key={g.id} value={g.id}>{g.name} ({g.employee_id})</option>)}
                </select>
              </div>
              <div>
                <label className="field-label">Category</label>
                <select className="input" required value={form.category} onChange={e=>setForm({...form,category:e.target.value})}>
                  <option value="">Select category</option>
                  {obsCategories.map(c=><option key={c} value={c}>{catIcons[c]} {c}</option>)}
                </select>
              </div>
              <div>
                <label className="field-label">Location</label>
                <input className="input" placeholder="Specific location in society" value={form.location} onChange={e=>setForm({...form,location:e.target.value})} />
              </div>
              <div>
                <label className="field-label">Priority</label>
                <select className="input" value={form.priority} onChange={e=>setForm({...form,priority:e.target.value})}>
                  {['low','medium','high','critical'].map(p=><option key={p} value={p}>{p.charAt(0).toUpperCase()+p.slice(1)}{p==='critical'?' — Immediate action':''}</option>)}
                </select>
              </div>
              <div style={{ gridColumn:'1/-1' }}>
                <label className="field-label">Observation Details</label>
                <textarea className="input" required rows={3} style={{ resize:'none' }} placeholder="Describe what you observed…"
                  value={form.description} onChange={e=>setForm({...form,description:e.target.value})} />
              </div>
            </div>
            <div style={{ display:'flex', gap:10, marginTop:14 }}>
              <button type="submit" className="btn btn-teal">Submit Observation</button>
              <button type="button" className="btn btn-ghost" onClick={()=>setShowForm(false)}>Cancel</button>
            </div>
          </form>
        </div>
      )}

      {/* Filter tabs */}
      <div style={{ display:'flex', gap:6, flexWrap:'wrap' }}>
        {['all','open','acknowledged','resolved'].map(s=>(
          <button key={s} onClick={()=>setStatusFilter(s)}
            className={`btn btn-sm ${statusFilter===s?'btn-teal':'btn-ghost'}`}
            style={{ textTransform:'capitalize' }}>{s}</button>
        ))}
      </div>

      {/* List */}
      <div style={{ display:'flex', flexDirection:'column', gap:10 }}>
        {filtered.map(obs => (
          <div key={obs.id} className="card"
            style={{ border: obs.priority==='critical'&&obs.status!=='resolved' ? '1px solid #FECDD3' : obs.status==='resolved'?'1px solid #F1F5F9':'1px solid #F1F5F9', opacity: obs.status==='resolved'?0.75:1 }}>
            <div style={{ display:'flex', gap:12 }}>
              <div style={{ width:44, height:44, borderRadius:12, background: obs.priority==='critical'?'#FFF1F2':obs.priority==='high'?'#FFF7ED':'#F0FDFA', display:'flex', alignItems:'center', justifyContent:'center', fontSize:20, flexShrink:0 }}>
                {catIcons[obs.category]||'📋'}
              </div>
              <div style={{ flex:1, minWidth:0 }}>
                <div style={{ display:'flex', flexWrap:'wrap', alignItems:'center', gap:6, marginBottom:6 }}>
                  <span style={{ fontWeight:700, fontSize:14, color:'#1E293B' }}>{obs.category}</span>
                  {statusBadge(obs.priority)}
                  {statusBadge(obs.status)}
                </div>
                <p style={{ fontSize:13, color:'#64748B', marginBottom:8, lineHeight:1.5 }}>{obs.description}</p>
                <div style={{ display:'flex', flexWrap:'wrap', gap:12, fontSize:11, color:'#94A3B8' }}>
                  <span style={{ display:'flex', alignItems:'center', gap:3 }}><MapPin size={10}/>{obs.location}</span>
                  <span style={{ display:'flex', alignItems:'center', gap:3 }}><Clock size={10}/>{timeAgo(obs.created_at)}</span>
                  <span style={{ color:'#0D9488', fontWeight:600 }}>Guard: {obs.guard_name}</span>
                </div>
              </div>
              {obs.status!=='resolved' && (
                <div style={{ display:'flex', flexDirection:'column', gap:6, flexShrink:0 }}>
                  {obs.status==='open' && (
                    <button onClick={()=>updateStatus(obs.id,'acknowledged')} className="btn btn-sm" style={{ background:'#EFF6FF', color:'#1D4ED8', border:'none' }}>
                      Acknowledge
                    </button>
                  )}
                  <button onClick={()=>updateStatus(obs.id,'resolved')} className="btn btn-sm btn-success">
                    <CheckCircle size={12}/> Resolve
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
