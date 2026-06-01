import { useState } from 'react';
import { Camera, Bell, CheckCircle, Clock, Maximize2, Play, Wifi } from 'lucide-react';
import { DEMO_CAMERA_ALERTS } from '@/data/demo';
import { timeAgo } from '@/lib/utils';

const cameras = [
  { id:'CAM-001', name:'Main Gate',     location:'Main Entrance',   status:'live',    color:'#1E293B', icon:'🚪' },
  { id:'CAM-002', name:'Parking Area',  location:'B-Block Parking', status:'live',    color:'#0F172A', icon:'🚗' },
  { id:'CAM-003', name:'Boundary Wall', location:'North Perimeter', status:'live',    color:'#1C1917', icon:'🧱' },
  { id:'CAM-004', name:'Club House',    location:'Community Hall',  status:'offline', color:'#27272A', icon:'🏛️' },
];

const alertTypeConfig: Record<string,{color:string;bg:string;border:string;icon:string}> = {
  'Movement Detected': { color:'#B45309', bg:'#FFFBEB', border:'#FDE68A', icon:'🚶' },
  'Unknown Vehicle':   { color:'#BE123C', bg:'#FFF1F2', border:'#FECDD3', icon:'🚗' },
  'After Hours Activity': { color:'#6D28D9', bg:'#F5F3FF', border:'#DDD6FE', icon:'🌙' },
};

export default function CCTV() {
  const [alerts, setAlerts] = useState(DEMO_CAMERA_ALERTS);
  const [selectedCam, setSelectedCam] = useState(cameras[0]);
  const unack = alerts.filter(a=>!a.is_acknowledged).length;

  const ack = (id: string) => setAlerts(alerts.map(a=>a.id===id?{...a,is_acknowledged:true}:a));

  return (
    <div style={{ display:'flex', flexDirection:'column', gap:16 }}>
      <div className="page-header">
        <div><h2>CCTV Monitoring</h2><p>Live camera feeds and AI-powered alerts</p></div>
        {unack > 0 && (
          <div style={{ display:'flex', alignItems:'center', gap:6, background:'#FFF1F2', border:'1px solid #FECDD3', borderRadius:10, padding:'7px 12px' }}>
            <Bell size={13} style={{ color:'#E11D48', animation:'pulse-dot 2s infinite' }} />
            <span style={{ fontSize:13, fontWeight:700, color:'#BE123C' }}>{unack} active alert{unack>1?'s':''}</span>
          </div>
        )}
      </div>

      <div className="cctv-grid">
        {/* Main feed */}
        <div style={{ display:'flex', flexDirection:'column', gap:10 }}>
          <div style={{ background:'#0F172A', borderRadius:16, overflow:'hidden', boxShadow:'0 20px 40px rgba(0,0,0,0.4)' }}>
            {/* Feed header */}
            <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', padding:'10px 14px', borderBottom:'1px solid rgba(255,255,255,0.08)' }}>
              <div style={{ display:'flex', alignItems:'center', gap:8 }}>
                <span style={{ width:7, height:7, borderRadius:'50%', background: selectedCam.status==='live'?'#4ADE80':'#EF4444', animation: selectedCam.status==='live'?'pulse-dot 2s infinite':'none' }} />
                <span style={{ color:'white', fontWeight:700, fontSize:13 }}>{selectedCam.name}</span>
                <span style={{ color:'#64748B', fontSize:11 }}>{selectedCam.location}</span>
              </div>
              <div style={{ display:'flex', alignItems:'center', gap:8 }}>
                {selectedCam.status==='live' && (
                  <span style={{ background:'#DC2626', color:'white', fontSize:10, fontWeight:800, padding:'2px 6px', borderRadius:4, animation:'blink 1s infinite' }}>● LIVE</span>
                )}
                <button style={{ background:'none', border:'none', cursor:'pointer', color:'#64748B', display:'flex' }}><Maximize2 size={14}/></button>
              </div>
            </div>

            {/* Camera feed */}
            <div style={{ background:`linear-gradient(135deg, ${selectedCam.color}, #000)`, aspectRatio:'16/9', display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', position:'relative' }}>
              {selectedCam.status==='offline' ? (
                <div style={{ textAlign:'center', color:'#475569' }}>
                  <Wifi size={36} style={{ margin:'0 auto 10px', opacity:0.3 }} />
                  <p style={{ fontSize:13, fontWeight:600 }}>Camera Offline</p>
                  <p style={{ fontSize:11, opacity:0.5 }}>Signal not detected</p>
                </div>
              ) : (
                <>
                  <div style={{ fontSize:56, marginBottom:8 }}>{selectedCam.icon}</div>
                  <div style={{ color:'rgba(255,255,255,0.15)', fontSize:11, fontFamily:'monospace' }}>{selectedCam.id}</div>
                  {/* Corner brackets */}
                  {[['top:10px','left:10px','borderLeft','borderTop'],['top:10px','right:10px','borderRight','borderTop'],
                    ['bottom:10px','left:10px','borderLeft','borderBottom'],['bottom:10px','right:10px','borderRight','borderBottom']].map((c,i) => (
                    <div key={i} style={{
                      position:'absolute', width:18, height:18,
                      top: c[0].split(':')[1], left: c[0].startsWith('top')?c[1].split(':')[1]:undefined,
                      right: c[0].startsWith('top')&&c[1].startsWith('right')?c[1].split(':')[1]:c[0].startsWith('bottom')&&c[1].startsWith('right')?c[1].split(':')[1]:undefined,
                      bottom: c[0].startsWith('bottom')?c[0].split(':')[1]:undefined,
                      [c[2]]: '2px solid rgba(74,222,128,0.5)',
                      [c[3]]: '2px solid rgba(74,222,128,0.5)',
                    }} />
                  ))}
                  <div style={{ position:'absolute', bottom:8, left:'50%', transform:'translateX(-50%)', color:'#4ADE80', fontSize:10, fontFamily:'monospace', whiteSpace:'nowrap' }}>
                    {new Date().toLocaleTimeString('en-IN')} | {selectedCam.name.toUpperCase()}
                  </div>
                </>
              )}
            </div>

            <div style={{ padding:'8px 14px', background:'#1E293B', display:'flex', alignItems:'center', justifyContent:'space-between' }}>
              <div style={{ display:'flex', gap:14, fontSize:11, color:'#64748B' }}>
                <span style={{ display:'flex', alignItems:'center', gap:4 }}><Camera size={10}/> HD 1080p</span>
                <span style={{ display:'flex', alignItems:'center', gap:4 }}><Clock size={10}/> 24/7 Recording</span>
              </div>
              <button className="btn btn-sm" style={{ background:'#334155', color:'#CBD5E1', border:'none', display:'flex', alignItems:'center', gap:4 }}>
                <Play size={10}/> Playback
              </button>
            </div>
          </div>

          {/* Thumbnails */}
          <div className="cam-thumbs">
            {cameras.map(cam => (
              <button key={cam.id} onClick={()=>setSelectedCam(cam)} style={{
                background:'#0F172A', borderRadius:12, overflow:'hidden', cursor:'pointer',
                border: selectedCam.id===cam.id ? '2px solid #2563EB' : '2px solid transparent',
                padding:0, transition:'border-color 0.15s',
              }}>
                <div style={{ background:`linear-gradient(135deg,${cam.color},#000)`, aspectRatio:'16/9', display:'flex', alignItems:'center', justifyContent:'center', fontSize:18 }}>
                  {cam.icon}
                </div>
                <div style={{ padding:'6px 8px' }}>
                  <p style={{ fontSize:10, color:'white', fontWeight:600, overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' }}>{cam.name}</p>
                  <p style={{ fontSize:9, color: cam.status==='live'?'#4ADE80':'#EF4444', fontWeight:600 }}>{cam.status.toUpperCase()}</p>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Alerts panel */}
        <div style={{ display:'flex', flexDirection:'column', gap:12 }}>
          <div className="card" style={{ padding:0, overflow:'hidden' }}>
            <div style={{ padding:'12px 14px', borderBottom:'1px solid #F1F5F9', display:'flex', alignItems:'center', justifyContent:'space-between' }}>
              <p style={{ fontWeight:700, fontSize:14, color:'#1E293B' }}>Alert Timeline</p>
              <span style={{ fontSize:11, color:'#94A3B8' }}>{alerts.length} total</span>
            </div>
            <div style={{ maxHeight:280, overflowY:'auto', padding:'8px' }}>
              {alerts.map(alert => {
                const cfg = alertTypeConfig[alert.alert_type]||{color:'#475569',bg:'#F8FAFC',border:'#E2E8F0',icon:'⚠️'};
                return (
                  <div key={alert.id} style={{
                    padding:'10px', borderRadius:10, border:`1px solid ${cfg.border}`,
                    background: cfg.bg, marginBottom:8, opacity: alert.is_acknowledged?0.6:1,
                  }}>
                    <div style={{ display:'flex', alignItems:'flex-start', justifyContent:'space-between', gap:6, marginBottom:4 }}>
                      <div style={{ display:'flex', alignItems:'center', gap:5 }}>
                        <span style={{ fontSize:14 }}>{cfg.icon}</span>
                        <span style={{ fontSize:12, fontWeight:700, color:cfg.color }}>{alert.alert_type}</span>
                      </div>
                      {!alert.is_acknowledged
                        ? <button onClick={()=>ack(alert.id)} style={{ fontSize:10, background:'white', border:'1px solid #E2E8F0', borderRadius:6, padding:'2px 7px', cursor:'pointer', color:'#475569', fontWeight:600, flexShrink:0 }}>Ack</button>
                        : <CheckCircle size={13} style={{ color:'#16A34A', flexShrink:0 }} />}
                    </div>
                    <p style={{ fontSize:11, color:'#64748B' }}>{alert.camera_name}</p>
                    <p style={{ fontSize:10, color:'#94A3B8', marginTop:2 }}>{timeAgo(alert.timestamp)}</p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Camera status */}
          <div className="card">
            <p style={{ fontWeight:700, fontSize:13, color:'#1E293B', marginBottom:12 }}>Camera Status</p>
            <div style={{ display:'flex', flexDirection:'column', gap:0 }}>
              {cameras.map((cam,i) => (
                <div key={cam.id} style={{ display:'flex', alignItems:'center', justifyContent:'space-between', padding:'10px 0', borderBottom: i<cameras.length-1?'1px solid #F1F5F9':'none' }}>
                  <div style={{ display:'flex', alignItems:'center', gap:8 }}>
                    <span style={{ width:7, height:7, borderRadius:'50%', background: cam.status==='live'?'#4ADE80':'#EF4444', flexShrink:0 }} />
                    <div>
                      <p style={{ fontSize:12, fontWeight:600, color:'#1E293B' }}>{cam.name}</p>
                      <p style={{ fontSize:10, color:'#94A3B8' }}>{cam.id}</p>
                    </div>
                  </div>
                  <span style={{ fontSize:11, fontWeight:700, color: cam.status==='live'?'#16A34A':'#EF4444' }}>
                    {cam.status==='live'?'ONLINE':'OFFLINE'}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
