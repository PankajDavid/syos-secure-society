import { useState } from 'react';
import { Plus, Search, Filter, Car, Phone, MapPin, Clock } from 'lucide-react';
import { statusBadge } from '@/components/ui/Badge';
import { DEMO_VISITORS } from '@/data/demo';
import { formatDateTime } from '@/lib/utils';

const purposes = ['Personal Visit','Delivery','Maintenance','Business','Domestic Help','Courier','Service','Other'];

export default function Visitors() {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [showForm, setShowForm] = useState(false);
  const [visitors, setVisitors] = useState(DEMO_VISITORS);
  const [form, setForm] = useState({ visitor_name:'', mobile:'', vehicle_number:'', flat_number:'', purpose:'' });

  const filtered = visitors.filter(v => {
    const ms = v.visitor_name.toLowerCase().includes(search.toLowerCase()) ||
               v.flat_number.toLowerCase().includes(search.toLowerCase()) ||
               v.mobile.includes(search);
    return ms && (statusFilter === 'all' || v.status === statusFilter);
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setVisitors([{ id:`v${Date.now()}`, ...form, vehicle_number: form.vehicle_number || null, entry_time: new Date().toISOString(), status:'pending' as const }, ...visitors]);
    setForm({ visitor_name:'', mobile:'', vehicle_number:'', flat_number:'', purpose:'' });
    setShowForm(false);
  };

  const updateStatus = (id: string, status: string) =>
    setVisitors(visitors.map(v => v.id === id ? { ...v, status: status as any } : v));

  return (
    <div style={{ display:'flex', flexDirection:'column', gap:16 }}>
      {/* Header */}
      <div className="page-header">
        <div><h2>Visitor Management</h2><p>Track and manage all visitor entries</p></div>
        <button onClick={() => setShowForm(!showForm)} className="btn btn-primary">
          <Plus size={15}/> Log Visitor
        </button>
      </div>

      {/* Entry Form */}
      {showForm && (
        <div className="card" style={{ borderColor:'#BFDBFE' }}>
          <h3 style={{ fontSize:14, fontWeight:700, color:'#1E293B', marginBottom:14, display:'flex', alignItems:'center', gap:6 }}>
            <Plus size={14} style={{ color:'#2563EB' }}/> New Visitor Entry
          </h3>
          <form onSubmit={handleSubmit}>
            <div className="form-grid">
              {[
                { key:'visitor_name', label:'Visitor Name', ph:'Full name', req:true },
                { key:'mobile',       label:'Mobile Number', ph:'10-digit', req:true },
                { key:'vehicle_number', label:'Vehicle Number', ph:'HR26AB1234 (optional)' },
                { key:'flat_number',  label:'Flat Number',  ph:'B-204', req:true },
              ].map(f => (
                <div key={f.key}>
                  <label className="field-label">{f.label}</label>
                  <input className="input" placeholder={f.ph} required={f.req}
                    value={form[f.key as keyof typeof form] || ''}
                    onChange={e => setForm({ ...form, [f.key]: e.target.value })} />
                </div>
              ))}
              <div>
                <label className="field-label">Purpose</label>
                <select className="input" required value={form.purpose}
                  onChange={e => setForm({ ...form, purpose: e.target.value })}>
                  <option value="">Select purpose</option>
                  {purposes.map(p => <option key={p}>{p}</option>)}
                </select>
              </div>
            </div>
            <div style={{ display:'flex', gap:10, marginTop:14 }}>
              <button type="submit" className="btn btn-primary">Submit Entry</button>
              <button type="button" className="btn btn-ghost" onClick={() => setShowForm(false)}>Cancel</button>
            </div>
          </form>
        </div>
      )}

      {/* Summary chips */}
      <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:10 }}>
        {[
          { label:'Total',    value: visitors.length,                                  bg:'#EFF6FF', color:'#1D4ED8' },
          { label:'Approved', value: visitors.filter(v=>v.status==='approved').length, bg:'#F0FDF4', color:'#15803D' },
          { label:'Pending',  value: visitors.filter(v=>v.status==='pending').length,  bg:'#FFFBEB', color:'#B45309' },
        ].map(s => (
          <div key={s.label} style={{ background:s.bg, borderRadius:12, padding:'12px 8px', textAlign:'center' }}>
            <div style={{ fontSize:24, fontWeight:800, color:s.color }}>{s.value}</div>
            <div style={{ fontSize:11, fontWeight:600, color:s.color, opacity:0.7 }}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="card" style={{ padding:12 }}>
        <div style={{ display:'flex', flexDirection:'column', gap:10 }}>
          <div style={{ position:'relative' }}>
            <Search size={14} style={{ position:'absolute', left:10, top:'50%', transform:'translateY(-50%)', color:'#94A3B8' }} />
            <input className="input" style={{ paddingLeft:32 }} placeholder="Search by name, flat, mobile…"
              value={search} onChange={e => setSearch(e.target.value)} />
          </div>
          <div style={{ display:'flex', gap:6, flexWrap:'wrap' }}>
            <Filter size={13} style={{ color:'#94A3B8', alignSelf:'center' }} />
            {['all','pending','approved','rejected'].map(s => (
              <button key={s} onClick={() => setStatusFilter(s)}
                className={`btn btn-sm ${statusFilter===s ? 'btn-primary' : 'btn-ghost'}`}
                style={{ textTransform:'capitalize' }}>{s}</button>
            ))}
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="card" style={{ padding:0, overflow:'hidden' }}>
        <div className="table-wrap">
          <table className="data-table">
            <thead>
              <tr>
                {['Visitor','Contact','Flat','Purpose','Entry Time','Status','Action'].map(h=>(
                  <th key={h}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map(v => (
                <tr key={v.id}>
                  <td>
                    <div style={{ display:'flex', alignItems:'center', gap:10 }}>
                      <div style={{ width:36, height:36, background:'linear-gradient(135deg,#DBEAFE,#BFDBFE)', borderRadius:10, display:'flex', alignItems:'center', justifyContent:'center', fontWeight:700, fontSize:14, color:'#1D4ED8', flexShrink:0 }}>
                        {v.visitor_name.charAt(0)}
                      </div>
                      <div>
                        <p style={{ fontWeight:600, fontSize:13, color:'#1E293B' }}>{v.visitor_name}</p>
                        {v.vehicle_number && <p style={{ fontSize:11, color:'#94A3B8', display:'flex', alignItems:'center', gap:3 }}><Car size={10}/>{v.vehicle_number}</p>}
                      </div>
                    </div>
                  </td>
                  <td><span style={{ display:'flex', alignItems:'center', gap:4, fontSize:12, color:'#64748B' }}><Phone size={11}/>{v.mobile}</span></td>
                  <td><span style={{ display:'flex', alignItems:'center', gap:4, fontWeight:600, fontSize:13 }}><MapPin size={11} style={{ color:'#3B82F6' }}/>{v.flat_number}</span></td>
                  <td style={{ fontSize:13 }}>{v.purpose}</td>
                  <td><span style={{ display:'flex', alignItems:'center', gap:4, fontSize:12, color:'#64748B' }}><Clock size={11}/>{formatDateTime(v.entry_time)}</span></td>
                  <td>{statusBadge(v.status)}</td>
                  <td>
                    {v.status==='pending' ? (
                      <div style={{ display:'flex', gap:6 }}>
                        <button onClick={() => updateStatus(v.id,'approved')} className="btn btn-sm btn-success">✓ Approve</button>
                        <button onClick={() => updateStatus(v.id,'rejected')} className="btn btn-sm btn-danger">✕ Reject</button>
                      </div>
                    ) : <span style={{ color:'#CBD5E1', fontSize:12 }}>—</span>}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div style={{ padding:'10px 14px', background:'#F8FAFC', borderTop:'1px solid #F1F5F9', display:'flex', alignItems:'center', justifyContent:'space-between', flexWrap:'wrap', gap:8 }}>
          <span style={{ fontSize:12, color:'#64748B' }}>Showing {filtered.length} of {visitors.length}</span>
          <div style={{ display:'flex', gap:4 }}>
            {['←','1','→'].map(l => (
              <button key={l} className={`btn btn-sm ${l==='1'?'btn-primary':'btn-ghost'}`}>{l}</button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
