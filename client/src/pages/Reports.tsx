import { FileText, Download, BarChart3, Users, Shield, AlertTriangle, Eye, Calendar } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, Legend } from 'recharts';

const reportTypes = [
  { title:'Daily Security Report',  desc:'Complete summary of all security activities for the day', icon:Shield,        color:'#EFF6FF', icolor:'#2563EB' },
  { title:'Visitor Summary Report', desc:'Visitor logs, approvals, rejections with analytics',     icon:Users,         color:'#F0FDF4', icolor:'#16A34A' },
  { title:'Guard Attendance Report',desc:'Attendance records, shift coverage, overtime',           icon:Shield,        color:'#F5F3FF', icolor:'#7C3AED' },
  { title:'Incident Report',        desc:'All incidents, resolution time, category breakdown',     icon:AlertTriangle, color:'#FFF1F2', icolor:'#E11D48' },
  { title:'Observation Report',     desc:'Guard observations, infrastructure issues, action taken',icon:Eye,           color:'#F0FDFA', icolor:'#0D9488' },
  { title:'Monthly Analytics',      desc:'Month-over-month trends, KPIs, performance metrics',    icon:BarChart3,     color:'#FFF7ED', icolor:'#EA580C' },
];

const monthlyData = [
  { month:'Jan', visitors:2340, incidents:8 },
  { month:'Feb', visitors:2100, incidents:6 },
  { month:'Mar', visitors:2800, incidents:11 },
  { month:'Apr', visitors:2650, incidents:5 },
  { month:'May', visitors:3100, incidents:9 },
  { month:'Jun', visitors:2900, incidents:4 },
];

const categoryData = [
  { name:'Personal Visit', count:1240 },
  { name:'Delivery',       count:890  },
  { name:'Domestic Help',  count:670  },
  { name:'Maintenance',    count:340  },
  { name:'Business',       count:280  },
  { name:'Courier',        count:520  },
];

const download = (type: string) => alert(`📥 ${type} download started!\n\nIn production this generates a real file.`);

export default function Reports() {
  return (
    <div style={{ display:'flex', flexDirection:'column', gap:16 }}>
      <div className="page-header">
        <div><h2>Reports & Analytics</h2><p>Generate and export security reports</p></div>
      </div>

      {/* Date range */}
      <div className="card" style={{ padding:12 }}>
        <div style={{ display:'flex', flexWrap:'wrap', alignItems:'center', gap:10 }}>
          <Calendar size={15} style={{ color:'#64748B' }} />
          <span style={{ fontSize:13, fontWeight:600, color:'#475569' }}>Report Period:</span>
          <input type="date" className="input" style={{ width:'auto' }} defaultValue="2025-06-01" />
          <span style={{ fontSize:13, color:'#94A3B8' }}>to</span>
          <input type="date" className="input" style={{ width:'auto' }} defaultValue="2025-06-30" />
          <button className="btn btn-primary btn-sm">Apply Filter</button>
        </div>
      </div>

      {/* Quick stats */}
      <div style={{ display:'grid', gridTemplateColumns:'repeat(2,1fr)', gap:10 }}>
        {[
          { label:'Total Visitors (June)', value:'2,847', change:'+8.2%', up:true },
          { label:'Incidents Reported',    value:'23',    change:'-12%',  up:false },
          { label:'Guard Attendance',      value:'94.2%', change:'+2.1%', up:true },
          { label:'Observations Filed',    value:'41',    change:'+15%',  up:true },
        ].map(s => (
          <div key={s.label} className="card">
            <p style={{ fontSize:22, fontWeight:800, color:'#1E293B' }}>{s.value}</p>
            <p style={{ fontSize:11, color:'#94A3B8', margin:'3px 0 6px', lineHeight:1.4 }}>{s.label}</p>
            <p style={{ fontSize:11, fontWeight:700, color: s.up?'#16A34A':'#EF4444' }}>{s.change} vs last month</p>
          </div>
        ))}
      </div>

      {/* Charts */}
      <div className="two-col">
        <div className="card">
          <p style={{ fontWeight:700, fontSize:14, color:'#1E293B', marginBottom:14 }}>Monthly Visitor Trends</p>
          <ResponsiveContainer width="100%" height={180}>
            <LineChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" />
              <XAxis dataKey="month" tick={{ fontSize:11, fill:'#94A3B8' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize:11, fill:'#94A3B8' }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ borderRadius:10, border:'1px solid #E2E8F0', fontSize:12 }} />
              <Line type="monotone" dataKey="visitors" stroke="#2563EB" strokeWidth={2.5} dot={{ fill:'#2563EB', r:3 }} name="Visitors" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="card">
          <p style={{ fontWeight:700, fontSize:14, color:'#1E293B', marginBottom:14 }}>Visitor Purpose Breakdown</p>
          <ResponsiveContainer width="100%" height={180}>
            <BarChart data={categoryData} layout="vertical" barSize={10}>
              <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" />
              <XAxis type="number" tick={{ fontSize:10, fill:'#94A3B8' }} axisLine={false} tickLine={false} />
              <YAxis dataKey="name" type="category" tick={{ fontSize:9, fill:'#64748B' }} axisLine={false} tickLine={false} width={80} />
              <Tooltip contentStyle={{ borderRadius:10, border:'1px solid #E2E8F0', fontSize:12 }} />
              <Bar dataKey="count" fill="#2563EB" radius={[0,4,4,0]} name="Count" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Report cards */}
      <div>
        <p className="section-label">Available Reports</p>
        <div className="reports-grid">
          {reportTypes.map(r => (
            <div key={r.title} className="card">
              <div style={{ display:'flex', alignItems:'flex-start', gap:12, marginBottom:14 }}>
                <div style={{ width:40, height:40, borderRadius:12, background:r.color, display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>
                  <r.icon size={18} style={{ color:r.icolor }} />
                </div>
                <div>
                  <p style={{ fontWeight:700, fontSize:13, color:'#1E293B', marginBottom:3 }}>{r.title}</p>
                  <p style={{ fontSize:11, color:'#94A3B8', lineHeight:1.5 }}>{r.desc}</p>
                </div>
              </div>
              <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:6 }}>
                {['PDF','Excel','CSV'].map(fmt => (
                  <button key={fmt} onClick={()=>download(`${r.title} — ${fmt}`)}
                    className="btn btn-ghost btn-sm" style={{ justifyContent:'center' }}>
                    <Download size={11}/> {fmt}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Scheduled */}
      <div style={{ background:'linear-gradient(135deg,#0F172A,#1E293B)', borderRadius:14, padding:'18px 16px', color:'white' }}>
        <p style={{ fontWeight:700, fontSize:14, marginBottom:12 }}>Automated Report Scheduling</p>
        <div style={{ display:'grid', gridTemplateColumns:'1fr', gap:8 }}>
          {[
            ['Daily Report',     'Every day at 8:00 AM'],
            ['Weekly Summary',   'Every Monday at 9:00 AM'],
            ['Monthly Analytics','1st of every month'],
          ].map(([label,time]) => (
            <div key={label} style={{ background:'rgba(255,255,255,0.05)', border:'1px solid rgba(255,255,255,0.08)', borderRadius:10, padding:'10px 14px', display:'flex', alignItems:'center', justifyContent:'space-between' }}>
              <div>
                <p style={{ fontWeight:600, fontSize:13 }}>{label}</p>
                <p style={{ fontSize:11, color:'#64748B' }}>{time}</p>
              </div>
              <span style={{ fontSize:11, color:'#4ADE80', fontWeight:700 }}>● Active</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
