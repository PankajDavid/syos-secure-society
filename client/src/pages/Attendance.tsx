import { useState } from 'react';
import { Clock, CheckCircle, XCircle, AlertCircle, Calendar } from 'lucide-react';
import { statusBadge } from '@/components/ui/Badge';
import { ATTENDANCE_DATA } from '@/data/demo';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

const weekData = [
  { day:'Mon', present:12, absent:1, late:1 },
  { day:'Tue', present:11, absent:2, late:1 },
  { day:'Wed', present:13, absent:1, late:0 },
  { day:'Thu', present:10, absent:2, late:2 },
  { day:'Fri', present:12, absent:1, late:1 },
  { day:'Sat', present:11, absent:2, late:1 },
  { day:'Sun', present:13, absent:0, late:1 },
];

export default function Attendance() {
  const [selectedDate] = useState(new Date().toISOString().split('T')[0]);
  const records = ATTENDANCE_DATA;
  const present = records.filter(r=>r.status==='present').length;
  const absent  = records.filter(r=>r.status==='absent').length;
  const late    = records.filter(r=>r.status==='late').length;

  return (
    <div style={{ display:'flex', flexDirection:'column', gap:16 }}>
      <div className="page-header">
        <div><h2>Attendance Management</h2><p>Guard check-in/out and shift tracking</p></div>
        <span style={{ display:'flex', alignItems:'center', gap:6, fontSize:12, color:'#64748B', background:'#F1F5F9', padding:'7px 12px', borderRadius:9 }}>
          <Calendar size={13}/> {selectedDate}
        </span>
      </div>

      {/* Summary */}
      <div style={{ display:'grid', gridTemplateColumns:'repeat(2,1fr)', gap:10 }}>
        {[
          { label:'Total Guards', value:records.length, bg:'#EFF6FF', c:'#1D4ED8', icon:Clock },
          { label:'Present',      value:present,         bg:'#F0FDF4', c:'#15803D', icon:CheckCircle },
          { label:'Absent',       value:absent,          bg:'#FFF1F2', c:'#BE123C', icon:XCircle },
          { label:'Late',         value:late,            bg:'#FFFBEB', c:'#B45309', icon:AlertCircle },
        ].map(s => (
          <div key={s.label} style={{ background:s.bg, borderRadius:12, padding:'14px 12px', display:'flex', alignItems:'center', justifyContent:'space-between' }}>
            <div>
              <div style={{ fontSize:26, fontWeight:800, color:s.c }}>{s.value}</div>
              <div style={{ fontSize:11, fontWeight:600, color:s.c, opacity:0.75 }}>{s.label}</div>
            </div>
            <div style={{ width:38, height:38, borderRadius:10, background:'rgba(255,255,255,0.6)', display:'flex', alignItems:'center', justifyContent:'center' }}>
              <s.icon size={18} style={{ color:s.c }} />
            </div>
          </div>
        ))}
      </div>

      {/* Chart */}
      <div className="card">
        <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:16 }}>
          <div>
            <p style={{ fontWeight:700, fontSize:15, color:'#1E293B' }}>Weekly Overview</p>
            <p style={{ fontSize:12, color:'#94A3B8' }}>Attendance trend this week</p>
          </div>
          <span style={{ fontSize:11, fontWeight:600, color:'#15803D', background:'#F0FDF4', padding:'3px 8px', borderRadius:999 }}>87% avg</span>
        </div>
        <ResponsiveContainer width="100%" height={180}>
          <BarChart data={weekData} barSize={10}>
            <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" />
            <XAxis dataKey="day" tick={{ fontSize:11, fill:'#94A3B8' }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fontSize:11, fill:'#94A3B8' }} axisLine={false} tickLine={false} />
            <Tooltip contentStyle={{ borderRadius:10, border:'1px solid #E2E8F0', fontSize:12 }} />
            <Bar dataKey="present" fill="#16A34A" radius={[3,3,0,0]} name="Present" />
            <Bar dataKey="late"    fill="#F59E0B" radius={[3,3,0,0]} name="Late" />
            <Bar dataKey="absent"  fill="#EF4444" radius={[3,3,0,0]} name="Absent" />
            <Legend iconType="circle" iconSize={8} formatter={v=><span style={{ fontSize:11, color:'#64748B' }}>{v}</span>} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Table */}
      <div className="card" style={{ padding:0, overflow:'hidden' }}>
        <div style={{ padding:'14px 16px', borderBottom:'1px solid #F1F5F9' }}>
          <p style={{ fontWeight:700, fontSize:14, color:'#1E293B' }}>Today's Attendance Log</p>
        </div>
        <div className="table-wrap">
          <table className="data-table">
            <thead><tr>{['Guard','ID','Shift','Check In','Check Out','Status'].map(h=><th key={h}>{h}</th>)}</tr></thead>
            <tbody>
              {records.map((r,i) => (
                <tr key={i} style={{ opacity: r.status==='absent' ? 0.6 : 1 }}>
                  <td>
                    <div style={{ display:'flex', alignItems:'center', gap:8 }}>
                      <div style={{ width:30, height:30, background:'linear-gradient(135deg,#EFF6FF,#DBEAFE)', borderRadius:8, display:'flex', alignItems:'center', justifyContent:'center', fontWeight:700, fontSize:12, color:'#1D4ED8', flexShrink:0 }}>
                        {r.guard.charAt(0)}
                      </div>
                      <span style={{ fontWeight:600, fontSize:13 }}>{r.guard}</span>
                    </div>
                  </td>
                  <td style={{ fontFamily:'monospace', fontSize:11, color:'#94A3B8' }}>{r.id}</td>
                  <td>{statusBadge(r.shift.toLowerCase())}</td>
                  <td><span style={{ fontSize:12, fontWeight:600, color: r.status==='absent'?'#94A3B8':'#15803D', display:'flex', alignItems:'center', gap:4 }}><CheckCircle size={11}/>{r.checkIn}</span></td>
                  <td style={{ fontSize:12, color:'#94A3B8' }}>{r.checkOut}</td>
                  <td>{statusBadge(r.status)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
