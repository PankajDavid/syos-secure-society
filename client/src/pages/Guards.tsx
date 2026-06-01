import { useState } from 'react';
import { Search, Phone, MapPin, Calendar, QrCode, Plus } from 'lucide-react';
import { statusBadge } from '@/components/ui/Badge';
import { DEMO_GUARDS } from '@/data/demo';
import { Link } from 'react-router-dom';

export default function Guards() {
  const [search, setSearch] = useState('');
  const [shiftFilter, setShiftFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [view, setView] = useState<'grid'|'list'>('grid');

  const filtered = DEMO_GUARDS.filter(g => {
    const ms = g.name.toLowerCase().includes(search.toLowerCase()) ||
               g.employee_id.toLowerCase().includes(search.toLowerCase()) ||
               g.location.toLowerCase().includes(search.toLowerCase());
    return ms && (shiftFilter==='all'||g.shift===shiftFilter) && (statusFilter==='all'||g.status===statusFilter);
  });

  return (
    <div style={{ display:'flex', flexDirection:'column', gap:16 }}>
      <div className="page-header">
        <div><h2>Guard Management</h2><p>{DEMO_GUARDS.length} guards registered</p></div>
        <button className="btn btn-primary"><Plus size={15}/> Add Guard</button>
      </div>

      {/* Summary */}
      <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:10 }}>
        {[
          { label:'Active',   value: DEMO_GUARDS.filter(g=>g.status==='active').length,   bg:'#F0FDF4', c:'#15803D' },
          { label:'On Leave', value: DEMO_GUARDS.filter(g=>g.status==='on_leave').length, bg:'#FFFBEB', c:'#B45309' },
          { label:'Inactive', value: DEMO_GUARDS.filter(g=>g.status==='inactive').length, bg:'#FFF1F2', c:'#BE123C' },
        ].map(s => (
          <div key={s.label} style={{ background:s.bg, borderRadius:12, padding:'12px 8px', textAlign:'center' }}>
            <div style={{ fontSize:24, fontWeight:800, color:s.c }}>{s.value}</div>
            <div style={{ fontSize:11, fontWeight:600, color:s.c, opacity:0.75 }}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="card" style={{ padding:12 }}>
        <div style={{ display:'flex', flexDirection:'column', gap:10 }}>
          <div style={{ position:'relative' }}>
            <Search size={14} style={{ position:'absolute', left:10, top:'50%', transform:'translateY(-50%)', color:'#94A3B8' }} />
            <input className="input" style={{ paddingLeft:32 }} placeholder="Search guards…" value={search} onChange={e=>setSearch(e.target.value)} />
          </div>
          <div style={{ display:'flex', gap:8, flexWrap:'wrap', alignItems:'center' }}>
            <select className="input" style={{ width:'auto', minWidth:120 }} value={shiftFilter} onChange={e=>setShiftFilter(e.target.value)}>
              <option value="all">All Shifts</option>
              <option value="morning">Morning</option>
              <option value="evening">Evening</option>
              <option value="night">Night</option>
            </select>
            <select className="input" style={{ width:'auto', minWidth:120 }} value={statusFilter} onChange={e=>setStatusFilter(e.target.value)}>
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="on_leave">On Leave</option>
              <option value="inactive">Inactive</option>
            </select>
            <div style={{ display:'flex', border:'1.5px solid #E2E8F0', borderRadius:9, overflow:'hidden', marginLeft:'auto' }}>
              {(['grid','list'] as const).map(v => (
                <button key={v} onClick={() => setView(v)} style={{
                  padding:'6px 12px', fontSize:12, fontWeight:600, border:'none', cursor:'pointer',
                  background: view===v ? '#2563EB' : 'white', color: view===v ? 'white' : '#64748B',
                }}>{v==='grid'?'⊞ Grid':'≡ List'}</button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Grid view */}
      {view === 'grid' && (
        <div className="guard-grid">
          {filtered.map(g => (
            <div key={g.id} className="card" style={{ opacity: g.status!=='active' ? 0.75 : 1 }}>
              <div style={{ display:'flex', alignItems:'flex-start', justifyContent:'space-between', marginBottom:12 }}>
                <div style={{ display:'flex', alignItems:'center', gap:10 }}>
                  <div style={{ width:44, height:44, background:'linear-gradient(135deg,#EFF6FF,#DBEAFE)', borderRadius:12, display:'flex', alignItems:'center', justifyContent:'center', fontWeight:800, fontSize:17, color:'#1D4ED8', flexShrink:0 }}>
                    {g.name.charAt(0)}
                  </div>
                  <div>
                    <p style={{ fontWeight:700, fontSize:14, color:'#1E293B' }}>{g.name}</p>
                    <p style={{ fontSize:11, color:'#94A3B8', fontFamily:'monospace' }}>{g.employee_id}</p>
                  </div>
                </div>
                {statusBadge(g.status)}
              </div>

              <div style={{ display:'flex', flexDirection:'column', gap:6, marginBottom:12 }}>
                {[
                  [Phone, g.phone],
                  [MapPin, g.location],
                  [Calendar, `Joined: ${g.join_date}`],
                ].map(([Icon, text], i) => (
                  <div key={i} style={{ display:'flex', alignItems:'center', gap:6, fontSize:12, color:'#64748B' }}>
                    {/* @ts-ignore */}
                    <Icon size={11} style={{ color:'#94A3B8', flexShrink:0 }} /> {text}
                  </div>
                ))}
              </div>

              <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', paddingTop:10, borderTop:'1px solid #F1F5F9' }}>
                <div style={{ display:'flex', gap:6, flexWrap:'wrap' }}>
                  {statusBadge(g.shift)}
                  {statusBadge(g.verification_status)}
                </div>
                <Link to="/qr-verify" style={{ display:'flex', alignItems:'center', gap:4, fontSize:11, color:'#2563EB', fontWeight:600, textDecoration:'none' }}>
                  <QrCode size={12}/> Verify
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* List view */}
      {view === 'list' && (
        <div className="card" style={{ padding:0, overflow:'hidden' }}>
          <div className="table-wrap">
            <table className="data-table">
              <thead><tr>{['Guard','Employee ID','Phone','Shift','Location','Status','Verified'].map(h=><th key={h}>{h}</th>)}</tr></thead>
              <tbody>
                {filtered.map(g => (
                  <tr key={g.id}>
                    <td>
                      <div style={{ display:'flex', alignItems:'center', gap:8 }}>
                        <div style={{ width:30, height:30, background:'#EFF6FF', borderRadius:8, display:'flex', alignItems:'center', justifyContent:'center', fontWeight:700, fontSize:12, color:'#1D4ED8', flexShrink:0 }}>{g.name.charAt(0)}</div>
                        <span style={{ fontWeight:600, fontSize:13 }}>{g.name}</span>
                      </div>
                    </td>
                    <td style={{ fontFamily:'monospace', fontSize:12 }}>{g.employee_id}</td>
                    <td style={{ fontSize:12, color:'#64748B' }}>{g.phone}</td>
                    <td>{statusBadge(g.shift)}</td>
                    <td style={{ fontSize:13 }}>{g.location}</td>
                    <td>{statusBadge(g.status)}</td>
                    <td>{statusBadge(g.verification_status)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
