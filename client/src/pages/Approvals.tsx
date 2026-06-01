import { useState } from 'react';
import { CheckCircle, XCircle, Phone, MapPin, Clock, Bell } from 'lucide-react';
import { DEMO_VISITORS } from '@/data/demo';
import { formatDateTime, timeAgo } from '@/lib/utils';
import { statusBadge } from '@/components/ui/Badge';

export default function Approvals() {
  const [visitors, setVisitors] = useState(DEMO_VISITORS);

  const pendingVisitors = visitors.filter(v => v.status === 'pending');
  const recentApprovals = visitors.filter(v => v.status !== 'pending').slice(0, 6);

  const handleAction = (id: string, action: 'approved' | 'rejected') => {
    setVisitors(visitors.map(v => v.id === id ? { ...v, status: action } : v));
  };

  return (
    <div className="space-y-5">
      <div>
        <h2 className="text-xl font-bold text-slate-800">Resident Approvals</h2>
        <p className="text-sm text-slate-500">Review and approve visitor entry requests</p>
      </div>

      {/* Pending count banner */}
      {pendingVisitors.length > 0 && (
        <div className="flex items-center gap-3 bg-amber-50 border border-amber-200 rounded-xl p-4">
          <Bell size={18} className="text-amber-600" />
          <div>
            <p className="font-semibold text-amber-800 text-sm">{pendingVisitors.length} visitor(s) awaiting approval</p>
            <p className="text-xs text-amber-600">Review and approve or reject each request below</p>
          </div>
        </div>
      )}

      {/* Pending Cards */}
      <div>
        <h3 className="text-sm font-bold text-slate-700 mb-3 uppercase tracking-wide">Pending Requests</h3>
        {pendingVisitors.length === 0 ? (
          <div className="bg-white rounded-xl p-10 text-center shadow-sm border border-slate-100">
            <CheckCircle size={40} className="text-green-400 mx-auto mb-3" />
            <p className="font-semibold text-slate-600">All caught up!</p>
            <p className="text-sm text-slate-400">No pending visitor approvals</p>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-4">
            {pendingVisitors.map((v) => (
              <div key={v.id} className="bg-white rounded-xl p-5 shadow-sm border border-amber-100 hover:shadow-md transition-shadow">
                <div className="flex items-start gap-3 mb-4">
                  <div className="w-14 h-14 bg-gradient-to-br from-blue-100 to-blue-200 rounded-xl flex items-center justify-center text-blue-700 font-bold text-xl flex-shrink-0">
                    {v.visitor_name.charAt(0)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-bold text-slate-800 text-base">{v.visitor_name}</p>
                    <p className="text-xs text-slate-500 flex items-center gap-1 mt-0.5"><Phone size={10} />{v.mobile}</p>
                    <p className="text-xs text-blue-600 font-semibold flex items-center gap-1 mt-0.5"><MapPin size={10} />Flat {v.flat_number}</p>
                  </div>
                  <span className="animate-pulse w-2 h-2 bg-amber-500 rounded-full mt-1" />
                </div>

                <div className="space-y-2 mb-4">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-500">Purpose</span>
                    <span className="font-semibold text-slate-700">{v.purpose}</span>
                  </div>
                  {v.vehicle_number && (
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-slate-500">Vehicle</span>
                      <span className="font-semibold text-slate-700">{v.vehicle_number}</span>
                    </div>
                  )}
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-500">Entry Time</span>
                    <span className="font-semibold text-slate-700 flex items-center gap-1"><Clock size={10} />{timeAgo(v.entry_time)}</span>
                  </div>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => handleAction(v.id, 'approved')}
                    className="flex-1 flex items-center justify-center gap-1.5 bg-green-600 text-white py-2.5 rounded-lg text-sm font-semibold hover:bg-green-700 transition-colors"
                  >
                    <CheckCircle size={15} /> Approve
                  </button>
                  <button
                    onClick={() => handleAction(v.id, 'rejected')}
                    className="flex-1 flex items-center justify-center gap-1.5 bg-red-600 text-white py-2.5 rounded-lg text-sm font-semibold hover:bg-red-700 transition-colors"
                  >
                    <XCircle size={15} /> Reject
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Recent Decisions */}
      <div>
        <h3 className="text-sm font-bold text-slate-700 mb-3 uppercase tracking-wide">Recent Decisions</h3>
        <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-slate-50 border-b border-slate-100">
              <tr>
                {['Visitor', 'Flat', 'Purpose', 'Time', 'Status'].map(h => (
                  <th key={h} className="text-left text-xs font-semibold text-slate-500 uppercase tracking-wider px-4 py-3">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {recentApprovals.map((v) => (
                <tr key={v.id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 bg-gradient-to-br from-slate-100 to-slate-200 rounded-full flex items-center justify-center text-slate-600 font-bold text-xs">
                        {v.visitor_name.charAt(0)}
                      </div>
                      <span className="font-medium text-slate-700">{v.visitor_name}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-slate-600">{v.flat_number}</td>
                  <td className="px-4 py-3 text-slate-600">{v.purpose}</td>
                  <td className="px-4 py-3 text-slate-400 text-xs">{timeAgo(v.entry_time)}</td>
                  <td className="px-4 py-3">{statusBadge(v.status)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
