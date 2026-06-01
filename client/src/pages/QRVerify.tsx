import { useState } from 'react';
import { QrCode, Shield, Phone, MapPin, Calendar, CheckCircle, AlertTriangle, ChevronDown } from 'lucide-react';
import { QRCodeSVG as QRCode } from 'qrcode.react';
import { DEMO_GUARDS } from '@/data/demo';
import { statusBadge } from '@/components/ui/Badge';

export default function QRVerify() {
  const [selectedGuard, setSelectedGuard] = useState(DEMO_GUARDS[0]);
  const [scanned, setScanned] = useState(false);
  const [scanning, setScanning] = useState(false);

  const qrData = JSON.stringify({
    id: selectedGuard.id,
    name: selectedGuard.name,
    employee_id: selectedGuard.employee_id,
    phone: selectedGuard.phone,
    shift: selectedGuard.shift,
    verification_status: selectedGuard.verification_status,
    society: 'AWGHS',
    issued_by: 'SYOS Enterprises',
  });

  const simulateScan = () => {
    setScanning(true);
    setScanned(false);
    setTimeout(() => {
      setScanning(false);
      setScanned(true);
    }, 1500);
  };

  return (
    <div className="space-y-5">
      <div>
        <h2 className="text-xl font-bold text-slate-800">QR Verification System</h2>
        <p className="text-sm text-slate-500">Instant guard identity verification via QR code</p>
      </div>

      {/* How it works */}
      <div className="bg-gradient-to-r from-[#0F172A] to-[#1E293B] text-white rounded-xl p-5">
        <h3 className="font-bold mb-2 flex items-center gap-2"><QrCode size={16} /> How QR Verification Works</h3>
        <div className="grid sm:grid-cols-3 gap-3 mt-3">
          {[
            { step: '01', title: 'Guard Shows ID', desc: 'Guard presents QR code from mobile or printed card' },
            { step: '02', title: 'Resident Scans', desc: 'Resident or admin scans the QR code with any camera' },
            { step: '03', title: 'Instant Verify', desc: 'SYOS displays verified guard profile immediately' },
          ].map(s => (
            <div key={s.step} className="bg-white/5 border border-white/10 rounded-xl p-3">
              <div className="text-blue-400 text-xs font-bold mb-1">Step {s.step}</div>
              <div className="font-semibold text-sm mb-1">{s.title}</div>
              <div className="text-slate-400 text-xs">{s.desc}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* QR Generator */}
        <div className="bg-white rounded-xl p-5 shadow-sm border border-slate-100">
          <h3 className="font-bold text-slate-800 mb-4">Generate Guard QR Code</h3>

          <div className="mb-4">
            <label className="block text-xs font-semibold text-slate-600 mb-1.5">Select Guard</label>
            <select
              value={selectedGuard.id}
              onChange={e => {
                const g = DEMO_GUARDS.find(g => g.id === e.target.value);
                if (g) { setSelectedGuard(g); setScanned(false); }
              }}
              className="w-full px-3 py-2.5 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {DEMO_GUARDS.map(g => <option key={g.id} value={g.id}>{g.name} — {g.employee_id}</option>)}
            </select>
          </div>

          {/* QR Code Display */}
          <div className="flex flex-col items-center bg-slate-50 rounded-xl p-6 mb-4">
            <div className="bg-white p-4 rounded-xl shadow-sm mb-3 border border-slate-200">
              <QRCode
                value={qrData}
                size={180}
                level="H"
              />
            </div>
            <p className="text-xs text-slate-500 text-center">Scan with any QR reader to verify</p>
            <p className="text-xs font-mono text-blue-600 mt-1">{selectedGuard.employee_id}</p>
          </div>

          <button
            onClick={simulateScan}
            className="w-full bg-blue-600 text-white py-3 rounded-xl text-sm font-semibold hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
          >
            <QrCode size={16} />
            {scanning ? 'Scanning...' : 'Simulate QR Scan'}
          </button>
        </div>

        {/* Verification Result */}
        <div className="bg-white rounded-xl p-5 shadow-sm border border-slate-100">
          <h3 className="font-bold text-slate-800 mb-4">Verification Result</h3>

          {scanning && (
            <div className="flex flex-col items-center justify-center h-64">
              <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mb-4" />
              <p className="text-sm font-medium text-slate-600">Scanning QR Code...</p>
              <p className="text-xs text-slate-400">Verifying with SYOS database</p>
            </div>
          )}

          {!scanning && !scanned && (
            <div className="flex flex-col items-center justify-center h-64 text-slate-300">
              <QrCode size={48} className="mb-3" />
              <p className="text-sm text-slate-500 font-medium">No scan yet</p>
              <p className="text-xs text-slate-400">Generate and simulate a scan to see results</p>
            </div>
          )}

          {scanned && !scanning && (
            <div className="space-y-4">
              {/* Verified Banner */}
              <div className={`flex items-center gap-2 p-3 rounded-xl ${selectedGuard.verification_status === 'verified' ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'}`}>
                {selectedGuard.verification_status === 'verified' ? (
                  <CheckCircle size={20} className="text-green-600" />
                ) : (
                  <AlertTriangle size={20} className="text-red-600" />
                )}
                <div>
                  <p className={`font-bold text-sm ${selectedGuard.verification_status === 'verified' ? 'text-green-800' : 'text-red-800'}`}>
                    {selectedGuard.verification_status === 'verified' ? '✓ IDENTITY VERIFIED' : '⚠ VERIFICATION PENDING'}
                  </p>
                  <p className="text-xs text-slate-500">Verified by SYOS Enterprises</p>
                </div>
              </div>

              {/* Guard Profile */}
              <div className="flex items-center gap-4 bg-slate-50 rounded-xl p-4">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-100 to-blue-200 rounded-xl flex items-center justify-center text-blue-700 font-bold text-2xl flex-shrink-0">
                  {selectedGuard.name.charAt(0)}
                </div>
                <div>
                  <h4 className="font-bold text-slate-800 text-lg">{selectedGuard.name}</h4>
                  <p className="text-sm text-blue-600 font-semibold">{selectedGuard.employee_id}</p>
                  {statusBadge(selectedGuard.status)}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                {[
                  { label: 'Phone', value: selectedGuard.phone, icon: Phone },
                  { label: 'Current Location', value: selectedGuard.location, icon: MapPin },
                  { label: 'Shift', value: selectedGuard.shift.charAt(0).toUpperCase() + selectedGuard.shift.slice(1), icon: Shield },
                  { label: 'Emergency', value: selectedGuard.emergency_contact, icon: Phone },
                  { label: 'Join Date', value: selectedGuard.join_date, icon: Calendar },
                  { label: 'Society', value: 'AWGHS', icon: Shield },
                ].map(f => (
                  <div key={f.label} className="bg-slate-50 rounded-lg p-3">
                    <p className="text-xs text-slate-400 flex items-center gap-1 mb-1"><f.icon size={10} />{f.label}</p>
                    <p className="text-xs font-semibold text-slate-700">{f.value}</p>
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
