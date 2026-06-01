import { Link, useLocation } from 'react-router-dom';
import {
  LayoutDashboard, Users, UserCheck, Shield, Clock,
  AlertTriangle, Eye, Camera, QrCode, FileText, Home, X
} from 'lucide-react';

const navItems = [
  { label: 'Dashboard', icon: LayoutDashboard, path: '/dashboard' },
  { label: 'Visitor Management', icon: Users, path: '/visitors' },
  { label: 'Resident Approval', icon: UserCheck, path: '/approvals' },
  { label: 'Guard Management', icon: Shield, path: '/guards' },
  { label: 'Attendance', icon: Clock, path: '/attendance' },
  { label: 'Incidents', icon: AlertTriangle, path: '/incidents' },
  { label: 'Observations', icon: Eye, path: '/observations' },
  { label: 'CCTV Monitoring', icon: Camera, path: '/cctv' },
  { label: 'QR Verification', icon: QrCode, path: '/qr-verify' },
  { label: 'Reports', icon: FileText, path: '/reports' },
];

interface SidebarProps {
  open: boolean;
  onClose: () => void;
}

export default function Sidebar({ open, onClose }: SidebarProps) {
  const location = useLocation();

  return (
    <aside className={`sidebar ${open ? 'open' : ''}`}>
      {/* Logo */}
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '20px 20px 16px', borderBottom: '1px solid rgba(255,255,255,0.08)',
        flexShrink: 0,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{
            width: 36, height: 36, background: '#2563EB', borderRadius: 10,
            display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
          }}>
            <Shield size={18} color="white" />
          </div>
          <div>
            <div style={{ fontWeight: 700, fontSize: 15, color: 'white', lineHeight: 1.2 }}>SYOS</div>
            <div style={{ fontSize: 11, color: '#94A3B8', lineHeight: 1.2 }}>Secure Society</div>
          </div>
        </div>
        <button
          onClick={onClose}
          style={{
            background: 'none', border: 'none', cursor: 'pointer', color: '#94A3B8',
            padding: 4, borderRadius: 6, display: 'flex',
          }}
          className="lg-hidden-btn"
        >
          <X size={18} />
        </button>
      </div>

      {/* Society badge */}
      <div style={{ padding: '12px 16px' }}>
        <div style={{
          background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)',
          borderRadius: 10, padding: '10px 12px',
        }}>
          <div style={{ fontSize: 10, color: '#64748B', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 3 }}>Active Society</div>
          <div style={{ fontSize: 13, fontWeight: 600, color: 'white', lineHeight: 1.3 }}>AWGHS</div>
          <div style={{ fontSize: 11, color: '#64748B' }}>Sector 27, Panchkula</div>
        </div>
      </div>

      {/* Nav */}
      <nav style={{ flex: 1, padding: '4px 12px', overflowY: 'auto' }}>
        <div style={{ fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#475569', padding: '8px 8px 6px' }}>
          Main Menu
        </div>
        <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 2 }}>
          {navItems.map((item) => {
            const active = location.pathname === item.path;
            return (
              <li key={item.path}>
                <Link
                  to={item.path}
                  onClick={onClose}
                  style={{
                    display: 'flex', alignItems: 'center', gap: 10,
                    padding: '9px 10px', borderRadius: 8,
                    fontSize: 13, fontWeight: 500, textDecoration: 'none',
                    transition: 'all 0.15s',
                    background: active ? '#2563EB' : 'transparent',
                    color: active ? 'white' : '#94A3B8',
                  }}
                  onMouseEnter={e => { if (!active) (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.07)'; }}
                  onMouseLeave={e => { if (!active) (e.currentTarget as HTMLElement).style.background = 'transparent'; }}
                >
                  <item.icon size={17} style={{ flexShrink: 0 }} />
                  <span>{item.label}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Footer */}
      <div style={{
        padding: '12px 16px', borderTop: '1px solid rgba(255,255,255,0.08)', flexShrink: 0,
      }}>
        <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 12, color: '#64748B', textDecoration: 'none' }}
          onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = 'white'}
          onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = '#64748B'}
        >
          <Home size={13} /> Back to Home
        </Link>
        <div style={{ marginTop: 10, fontSize: 11, color: '#334155' }}>© 2025 SYOS Enterprises</div>
      </div>
    </aside>
  );
}
