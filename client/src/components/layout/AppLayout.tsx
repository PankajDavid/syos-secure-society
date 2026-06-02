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
  '/passes': 'Pre-Approved Visitor Codes',
  '/gate': 'Gate — Code Verification',
  '/command-center': 'Security Operations Command Center',
};

export default function AppLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();
  const title = pageTitles[location.pathname] || 'SYOS Secure Society';

  return (
    <div className="app-shell">
      {/* Overlay for mobile */}
      <div
        className={`sidebar-overlay ${sidebarOpen ? 'show' : ''}`}
        onClick={() => setSidebarOpen(false)}
      />

      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div className="main-content">
        <Topbar onMenuClick={() => setSidebarOpen(true)} title={title} />
        <div className="page-area">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
