import { useState } from 'react';
import { CheckCircle, XCircle, Phone, MapPin, Clock, Bell } from 'lucide-react';
import { DEMO_VISITORS } from '@/data/demo';
import { timeAgo } from '@/lib/utils';
import { statusBadge } from '@/components/ui/Badge';

export default function Approvals() {
  const [visitors, setVisitors] = useState(DEMO_VISITORS);
  const pending  = visitors.filter(v => v.status === 'pending');
  const decided  = visitors.filter(v => v.status !== 'pending').slice(0, 6);

  const handle = (id: string, action: 'approved' | 'rejected') =>
    setVisitors(visitors.map(v => v.id === id ? { ...v, status: action } : v));

  return (
    <div style={{ display:'flex', flexDirection:'column', gap:16 }}>
      <div className="page-header">
        <div><h2>Resident Approvals</h2><p>Review and approve visitor entry requests</p></div>
      </div>

      {pending.length > 0 && (
        <div style={{ display:'flex', alignItems:'center', gap:10, background:'#FFFBEB', border:'1px solid #FDE68A', borderRadius:12, padding:'12px 14px' }}>
          <Bell size={16} style={{ color:'#D97706', flexShrink:0 }} />
          <div>
            <p style={{ fontWeight:700, fontSize:13, color:'#92400E' }}>{pending.length} visitor(s) awaiting your approval</p>
            <p style={{ fontSize:12, color:'#B45309' }}>Approve or reject each request below</p>
          </div>
        </div>
      )}

      {/* Pending */}
      <div>
        <p className="section-label">Pending Requests</p>
        {pending.length === 0 ? (
          <div className="card" style={{ textAlign:'center', padding:40 }}>
            <CheckCircle size={36} style={{ color:'#86EFAC', margin:'0 auto 10px' }} />
            <p style={{ fontWeight:600, color:'#64748B' }}>All caught up! No pending approvals.</p>
          </div>
        ) : (
          <div className="approval-grid">
            {pending.map(v => (
              <div key={v.id} className="card" style={{ borderColor:'#FDE68A' }}>
                <div style={{ display:'flex', alignItems:'flex-start', gap:12, marginBottom:14 }}>
                  <div style={{ width:52, height:52, background:'linear-gradient(135deg,#DBEAFE,#BFDBFE)', borderRadius:14, display:'flex', alignItems:'center', justifyContent:'center', fontWeight:800, fontSize:20, color:'#1D4ED8', flexShrink:0 }}>
                    {v.visitor_name.charAt(0)}
                  </div>
                  <div style={{ flex:1, minWidth:0 }}>
                    <p style={{ fontWeight:700, fontSize:15, color:'#1E293B' }}>{v.visitor_name}</p>
                    <p style={{ fontSize:12, color:'#64748B', display:'flex', alignItems:'center', gap:4 }}><Phone size={10}/>{v.mobile}</p>
                    <p style={{ fontSize:12, color:'#2563EB', fontWeight:600, display:'flex', alignItems:'center', gap:4 }}><MapPin size={10}/>Flat {v.flat_number}</p>
                  </div>
                  <span style={{ width:8, height:8, background:'#F59E0B', borderRadius:'50%', flexShrink:0, animation:'pulse-dot 2s infinite' }} />
                </div>

                <div style={{ display:'flex', flexDirection:'column', gap:7, marginBottom:14, background:'#F8FAFC', borderRadius:10, padding:'10px 12px' }}>
                  {[['Purpose', v.purpose], ['Entry Time', timeAgo(v.entry_time)], ...(v.vehicle_number ? [['Vehicle', v.vehicle_number]] : [])].map(([k,val]) => (
                    <div key={k} style={{ display:'flex', justifyContent:'space-between', fontSize:12 }}>
                      <span style={{ color:'#94A3B8' }}>{k}</span>
                      <span style={{ fontWeight:600, color:'#1E293B' }}>{val}</span>
                    </div>
                  ))}
                </div>

                <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:8 }}>
                  <button onClick={() => handle(v.id,'approved')} className="btn btn-success" style={{ width:'100%', justifyContent:'center' }}>
                    <CheckCircle size={14}/> Approve
                  </button>
                  <button onClick={() => handle(v.id,'rejected')} className="btn btn-danger" style={{ width:'100%', justifyContent:'center' }}>
                    <XCircle size={14}/> Reject
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Recent Decisions */}
      <div>
        <p className="section-label">Recent Decisions</p>
        <div className="card" style={{ padding:0, overflow:'hidden' }}>
          <div className="table-wrap">
            <table className="data-table">
              <thead><tr>{['Visitor','Flat','Purpose','Time','Status'].map(h=><th key={h}>{h}</th>)}</tr></thead>
              <tbody>
                {decided.map(v => (
                  <tr key={v.id}>
                    <td>
                      <div style={{ display:'flex', alignItems:'center', gap:8 }}>
                        <div style={{ width:30, height:30, background:'#F1F5F9', borderRadius:8, display:'flex', alignItems:'center', justifyContent:'center', fontWeight:700, fontSize:12, color:'#475569', flexShrink:0 }}>
                          {v.visitor_name.charAt(0)}
                        </div>
                        <span style={{ fontWeight:500, fontSize:13 }}>{v.visitor_name}</span>
                      </div>
                    </td>
                    <td style={{ fontSize:13 }}>{v.flat_number}</td>
                    <td style={{ fontSize:13 }}>{v.purpose}</td>
                    <td style={{ fontSize:12, color:'#94A3B8' }}>{timeAgo(v.entry_time)}</td>
                    <td>{statusBadge(v.status)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
