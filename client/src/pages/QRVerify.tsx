import { useState } from 'react';
import { QrCode, Shield, Phone, MapPin, Calendar, CheckCircle, AlertTriangle } from 'lucide-react';
import { QRCodeSVG as QRCode } from 'qrcode.react';
import { DEMO_GUARDS } from '@/data/demo';
import { statusBadge } from '@/components/ui/Badge';

export default function QRVerify() {
  const [selectedGuard, setSelectedGuard] = useState(DEMO_GUARDS[0]);
  const [scanned, setScanned] = useState(false);
  const [scanning, setScanning] = useState(false);

  const qrData = JSON.stringify({
    id: selectedGuard.id, name: selectedGuard.name, employee_id: selectedGuard.employee_id,
    phone: selectedGuard.phone, shift: selectedGuard.shift,
    verification_status: selectedGuard.verification_status, society: 'AWGHS',
  });

  const simulateScan = () => {
    setScanning(true); setScanned(false);
    setTimeout(() => { setScanning(false); setScanned(true); }, 1600);
  };

  return (
    <div style={{ display:'flex', flexDirection:'column', gap:16 }}>
      <div className="page-header">
        <div><h2>QR Verification</h2><p>Instant guard identity verification</p></div>
      </div>

      {/* How it works */}
      <div style={{ background:'linear-gradient(135deg,#0F172A,#1E293B)', borderRadius:14, padding:'16px 18px', color:'white' }}>
        <p style={{ fontWeight:700, fontSize:14, marginBottom:12, display:'flex', alignItems:'center', gap:6 }}><QrCode size={15}/> How QR Verification Works</p>
        <div style={{ display:'grid', gridTemplateColumns:'1fr', gap:10 }}>
          {[
            ['01','Guard Shows ID','Presents QR code from mobile or printed card'],
            ['02','Resident Scans', 'Scans with any camera or QR reader'],
            ['03','Instant Verify', 'SYOS displays verified guard profile immediately'],
          ].map(([step,title,desc]) => (
            <div key={step} style={{ background:'rgba(255,255,255,0.05)', border:'1px solid rgba(255,255,255,0.08)', borderRadius:10, padding:'10px 12px' }}>
              <p style={{ fontSize:10, color:'#60A5FA', fontWeight:700, marginBottom:2 }}>Step {step}</p>
              <p style={{ fontSize:13, fontWeight:600, marginBottom:2 }}>{title}</p>
              <p style={{ fontSize:11, color:'#64748B' }}>{desc}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="qr-grid">
        {/* Generator */}
        <div className="card">
          <p style={{ fontWeight:700, fontSize:15, color:'#1E293B', marginBottom:14 }}>Generate Guard QR Code</p>
          <div style={{ marginBottom:14 }}>
            <label className="field-label">Select Guard</label>
            <select className="input" value={selectedGuard.id}
              onChange={e => { const g=DEMO_GUARDS.find(g=>g.id===e.target.value); if(g){setSelectedGuard(g);setScanned(false);} }}>
              {DEMO_GUARDS.map(g=><option key={g.id} value={g.id}>{g.name} — {g.employee_id}</option>)}
            </select>
          </div>

          <div style={{ background:'#F8FAFC', borderRadius:14, padding:20, display:'flex', flexDirection:'column', alignItems:'center', marginBottom:14 }}>
            <div style={{ background:'white', padding:12, borderRadius:12, border:'1px solid #E2E8F0', boxShadow:'0 2px 8px rgba(0,0,0,0.06)', marginBottom:10 }}>
              <QRCode value={qrData} size={160} level="H" />
            </div>
            <p style={{ fontSize:12, color:'#94A3B8', textAlign:'center' }}>Scan with any QR reader to verify</p>
            <p style={{ fontSize:12, fontWeight:700, color:'#2563EB', marginTop:4, fontFamily:'monospace' }}>{selectedGuard.employee_id}</p>
          </div>

          <button onClick={simulateScan} className="btn btn-primary" style={{ width:'100%', justifyContent:'center', padding:'11px' }}>
            <QrCode size={15}/>
            {scanning ? 'Scanning…' : 'Simulate QR Scan'}
          </button>
        </div>

        {/* Result */}
        <div className="card">
          <p style={{ fontWeight:700, fontSize:15, color:'#1E293B', marginBottom:14 }}>Verification Result</p>

          {scanning && (
            <div style={{ display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', minHeight:200, gap:12 }}>
              <div style={{ width:48, height:48, border:'4px solid #2563EB', borderTopColor:'transparent', borderRadius:'50%' }} className="animate-spin" />
              <p style={{ fontSize:14, fontWeight:600, color:'#1E293B' }}>Scanning QR Code…</p>
              <p style={{ fontSize:12, color:'#94A3B8' }}>Verifying with SYOS database</p>
            </div>
          )}

          {!scanning && !scanned && (
            <div style={{ display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', minHeight:200, gap:8, color:'#CBD5E1' }}>
              <QrCode size={44} />
              <p style={{ fontSize:14, fontWeight:600, color:'#94A3B8' }}>No scan yet</p>
              <p style={{ fontSize:12, color:'#CBD5E1', textAlign:'center' }}>Generate and simulate a scan to see results</p>
            </div>
          )}

          {scanned && !scanning && (
            <div style={{ display:'flex', flexDirection:'column', gap:12 }}>
              {/* Verification banner */}
              <div style={{
                display:'flex', alignItems:'center', gap:10, padding:'12px 14px', borderRadius:12,
                background: selectedGuard.verification_status==='verified'?'#F0FDF4':'#FFF1F2',
                border: `1px solid ${selectedGuard.verification_status==='verified'?'#BBF7D0':'#FECDD3'}`,
              }}>
                {selectedGuard.verification_status==='verified'
                  ? <CheckCircle size={20} style={{ color:'#16A34A', flexShrink:0 }} />
                  : <AlertTriangle size={20} style={{ color:'#E11D48', flexShrink:0 }} />}
                <div>
                  <p style={{ fontWeight:800, fontSize:13, color: selectedGuard.verification_status==='verified'?'#15803D':'#BE123C' }}>
                    {selectedGuard.verification_status==='verified'?'✓ IDENTITY VERIFIED':'⚠ VERIFICATION PENDING'}
                  </p>
                  <p style={{ fontSize:11, color:'#94A3B8' }}>Verified by SYOS Enterprises</p>
                </div>
              </div>

              {/* Guard profile */}
              <div style={{ display:'flex', alignItems:'center', gap:12, background:'#F8FAFC', borderRadius:12, padding:'12px 14px' }}>
                <div style={{ width:52, height:52, background:'linear-gradient(135deg,#DBEAFE,#BFDBFE)', borderRadius:14, display:'flex', alignItems:'center', justifyContent:'center', fontWeight:800, fontSize:22, color:'#1D4ED8', flexShrink:0 }}>
                  {selectedGuard.name.charAt(0)}
                </div>
                <div>
                  <p style={{ fontWeight:800, fontSize:16, color:'#1E293B' }}>{selectedGuard.name}</p>
                  <p style={{ fontSize:12, fontWeight:700, color:'#2563EB', fontFamily:'monospace' }}>{selectedGuard.employee_id}</p>
                  <div style={{ marginTop:4 }}>{statusBadge(selectedGuard.status)}</div>
                </div>
              </div>

              {/* Details grid */}
              <div style={{ display:'grid', gridTemplateColumns:'repeat(2,1fr)', gap:8 }}>
                {[
                  [Phone, 'Phone', selectedGuard.phone],
                  [MapPin, 'Location', selectedGuard.location],
                  [Shield, 'Shift', selectedGuard.shift.charAt(0).toUpperCase()+selectedGuard.shift.slice(1)],
                  [Phone, 'Emergency', selectedGuard.emergency_contact],
                  [Calendar, 'Join Date', selectedGuard.join_date],
                  [Shield, 'Society', 'AWGHS'],
                ].map(([Icon,label,value], i) => (
                  <div key={i} style={{ background:'#F8FAFC', borderRadius:10, padding:'10px 12px' }}>
                    <p style={{ fontSize:10, color:'#94A3B8', display:'flex', alignItems:'center', gap:4, marginBottom:3 }}>
                      {/* @ts-ignore */}
                      <Icon size={10}/>{label}
                    </p>
                    <p style={{ fontSize:12, fontWeight:600, color:'#1E293B' }}>{value as string}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
