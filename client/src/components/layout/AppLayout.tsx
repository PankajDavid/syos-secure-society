import { useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Sidebar from './Sidebar';
import Topbar from './Topbar';

const pageTitles: Record<string, string> = {
  '/dashboard': 'Dashboard',
  '/visitors': 'Visitor Management',
  '/approvals': 'Resident Approvals',
  '/guards': 'Guard Management',
  '/attendance': 'Attendance Management',
  '/incidents': 'Incident Management',
  '/observations': 'Security Observations',
  '/cctv': 'CCTV Monitoring',
  '/qr-verify': 'QR Verification',
  '/reports': 'Reports & Analytics',
};

export default function AppLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();
  const title = pageTitles[location.pathname] || 'SYOS Secure Society';

  return (
    <div className="flex h-screen overflow-hidden bg-slate-100">
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div className="flex-1 flex flex-col lg:ml-64 overflow-hidden">
        <Topbar onMenuClick={() => setSidebarOpen(true)} title={title} />
        <main className="flex-1 overflow-y-auto p-4 md:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
