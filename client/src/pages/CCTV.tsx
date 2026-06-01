import { useState } from 'react';
import { Camera, Bell, CheckCircle, AlertTriangle, Clock, Maximize2, Play, Wifi } from 'lucide-react';
import { DEMO_CAMERA_ALERTS } from '@/data/demo';
import { timeAgo } from '@/lib/utils';

const cameras = [
  { id: 'CAM-001', name: 'Main Gate', location: 'Main Entrance', status: 'live', color: 'from-slate-700 to-slate-900', icon: '🚪' },
  { id: 'CAM-002', name: 'Parking Area', location: 'B-Block Parking', status: 'live', color: 'from-slate-800 to-slate-950', icon: '🚗' },
  { id: 'CAM-003', name: 'Boundary Wall', location: 'North Perimeter', status: 'live', color: 'from-zinc-700 to-zinc-900', icon: '🧱' },
  { id: 'CAM-004', name: 'Club House', location: 'Community Hall', status: 'offline', color: 'from-stone-600 to-stone-900', icon: '🏛️' },
];

const alertTypeConfig: Record<string, { color: string; bg: string; icon: string }> = {
  'Movement Detected': { color: 'text-amber-600', bg: 'bg-amber-50 border-amber-200', icon: '🚶' },
  'Unknown Vehicle': { color: 'text-red-600', bg: 'bg-red-50 border-red-200', icon: '🚗' },
  'After Hours Activity': { color: 'text-purple-600', bg: 'bg-purple-50 border-purple-200', icon: '🌙' },
};

export default function CCTV() {
  const [alerts, setAlerts] = useState(DEMO_CAMERA_ALERTS);
  const [selectedCam, setSelectedCam] = useState(cameras[0]);
  const [selectedAlert, setSelectedAlert] = useState<string | null>(null);

  const acknowledgeAlert = (id: string) => {
    setAlerts(alerts.map(a => a.id === id ? { ...a, is_acknowledged: true } : a));
  };

  const unacknowledged = alerts.filter(a => !a.is_acknowledged).length;

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-slate-800">CCTV Monitoring</h2>
          <p className="text-sm text-slate-500">Live camera feeds and AI-powered alerts</p>
        </div>
        {unacknowledged > 0 && (
          <div className="flex items-center gap-2 bg-red-50 border border-red-200 px-3 py-2 rounded-xl">
            <Bell size={14} className="text-red-600 animate-pulse" />
            <span className="text-sm font-semibold text-red-700">{unacknowledged} active alert{unacknowledged > 1 ? 's' : ''}</span>
          </div>
        )}
      </div>

      <div className="grid lg:grid-cols-3 gap-5">
        {/* Main Feed */}
        <div className="lg:col-span-2 space-y-4">
          {/* Active Camera */}
          <div className="bg-slate-900 rounded-2xl overflow-hidden shadow-xl">
            <div className="flex items-center justify-between px-4 py-3 border-b border-white/10">
              <div className="flex items-center gap-2">
                <div className={`w-2 h-2 rounded-full ${selectedCam.status === 'live' ? 'bg-green-400 animate-pulse' : 'bg-red-400'}`} />
                <span className="text-white font-semibold text-sm">{selectedCam.name}</span>
                <span className="text-slate-400 text-xs">{selectedCam.location}</span>
              </div>
              <div className="flex items-center gap-2">
                {selectedCam.status === 'live' && (
                  <span className="bg-red-600 text-white text-xs font-bold px-2 py-0.5 rounded animate-blink">● LIVE</span>
                )}
                <button className="text-slate-400 hover:text-white"><Maximize2 size={16} /></button>
              </div>
            </div>

            {/* Camera Placeholder */}
            <div className={`bg-gradient-to-br ${selectedCam.color} aspect-video flex flex-col items-center justify-center relative`}>
              {selectedCam.status === 'offline' ? (
                <div className="text-center text-slate-400">
                  <Wifi size={40} className="mx-auto mb-3 opacity-30" />
                  <p className="text-sm font-medium">Camera Offline</p>
                  <p className="text-xs opacity-50">Signal not detected</p>
                </div>
              ) : (
                <>
                  <div className="text-7xl mb-4">{selectedCam.icon}</div>
                  <div className="text-white/20 text-xs font-mono">{selectedCam.id}</div>
                  {/* Simulated scan lines */}
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/1 to-transparent animate-pulse opacity-30" />
                  {/* Corner overlays */}
                  <div className="absolute top-3 left-3 w-6 h-6 border-l-2 border-t-2 border-green-400/60" />
                  <div className="absolute top-3 right-3 w-6 h-6 border-r-2 border-t-2 border-green-400/60" />
                  <div className="absolute bottom-3 left-3 w-6 h-6 border-l-2 border-b-2 border-green-400/60" />
                  <div className="absolute bottom-3 right-3 w-6 h-6 border-r-2 border-b-2 border-green-400/60" />
                  {/* Timestamp */}
                  <div className="absolute bottom-3 left-1/2 -translate-x-1/2 text-green-400 text-xs font-mono">
                    {new Date().toLocaleTimeString('en-IN')} | {selectedCam.name.toUpperCase()}
                  </div>
                </>
              )}
            </div>

            <div className="px-4 py-2 bg-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-3 text-xs text-slate-400">
                <span className="flex items-center gap-1"><Camera size={11} /> HD 1080p</span>
                <span className="flex items-center gap-1"><Clock size={11} /> 24/7 Recording</span>
              </div>
              <button className="flex items-center gap-1 text-xs text-slate-300 bg-slate-700 px-3 py-1.5 rounded-lg hover:bg-slate-600">
                <Play size={11} /> Playback
              </button>
            </div>
          </div>

          {/* Camera Thumbnails */}
          <div className="grid grid-cols-4 gap-2">
            {cameras.map((cam) => (
              <button
                key={cam.id}
                onClick={() => setSelectedCam(cam)}
                className={`bg-slate-900 rounded-xl overflow-hidden border-2 transition-all ${selectedCam.id === cam.id ? 'border-blue-500' : 'border-transparent hover:border-slate-600'}`}
              >
                <div className={`bg-gradient-to-br ${cam.color} aspect-video flex items-center justify-center`}>
                  <div className="text-2xl">{cam.icon}</div>
                  {cam.status === 'live' && (
                    <div className="absolute top-1 right-1 w-1.5 h-1.5 bg-green-400 rounded-full" />
                  )}
                </div>
                <div className="px-2 py-1.5">
                  <p className="text-xs text-white font-medium truncate">{cam.name}</p>
                  <p className="text-xs text-slate-500">{cam.status.toUpperCase()}</p>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Alerts Panel */}
        <div className="space-y-3">
          <div className="bg-white rounded-xl shadow-sm border border-slate-100">
            <div className="px-4 py-3 border-b border-slate-100 flex items-center justify-between">
              <h3 className="font-bold text-slate-800">Alert Timeline</h3>
              <span className="text-xs text-slate-400">{alerts.length} total</span>
            </div>
            <div className="p-3 space-y-2 max-h-96 overflow-y-auto scrollbar-thin">
              {alerts.map((alert) => {
                const cfg = alertTypeConfig[alert.alert_type] || { color: 'text-slate-600', bg: 'bg-slate-50 border-slate-200', icon: '⚠️' };
                return (
                  <div
                    key={alert.id}
                    className={`p-3 rounded-xl border text-xs ${cfg.bg} ${alert.is_acknowledged ? 'opacity-60' : ''}`}
                  >
                    <div className="flex items-start justify-between gap-2 mb-1">
                      <div className="flex items-center gap-1.5 font-semibold">
                        <span>{cfg.icon}</span>
                        <span className={cfg.color}>{alert.alert_type}</span>
                      </div>
                      {!alert.is_acknowledged && (
                        <button
                          onClick={() => acknowledgeAlert(alert.id)}
                          className="text-xs bg-white border border-slate-200 px-2 py-0.5 rounded-lg hover:bg-slate-50 text-slate-600 whitespace-nowrap"
                        >
                          Ack
                        </button>
                      )}
                      {alert.is_acknowledged && <CheckCircle size={12} className="text-green-500 flex-shrink-0" />}
                    </div>
                    <p className="text-slate-600 mb-1">{alert.camera_name}</p>
                    <p className="text-slate-400">{timeAgo(alert.timestamp)}</p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Camera Status */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-4">
            <h3 className="font-bold text-slate-800 mb-3 text-sm">Camera Status</h3>
            <div className="space-y-2">
              {cameras.map((cam) => (
                <div key={cam.id} className="flex items-center justify-between py-2 border-b border-slate-50 last:border-0">
                  <div className="flex items-center gap-2">
                    <div className={`w-2 h-2 rounded-full ${cam.status === 'live' ? 'bg-green-400' : 'bg-red-400'}`} />
                    <div>
                      <p className="text-xs font-semibold text-slate-700">{cam.name}</p>
                      <p className="text-xs text-slate-400">{cam.id}</p>
                    </div>
                  </div>
                  <span className={`text-xs font-semibold ${cam.status === 'live' ? 'text-green-600' : 'text-red-500'}`}>
                    {cam.status === 'live' ? 'ONLINE' : 'OFFLINE'}
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
