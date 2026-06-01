import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
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
    <>
      {/* Overlay */}
      {open && (
        <div
          className="fixed inset-0 bg-black/50 z-20 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside className={cn(
        "fixed top-0 left-0 h-full w-64 z-30 flex flex-col transition-transform duration-300",
        "bg-[#0F172A] text-white",
        open ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
      )}>
        {/* Logo */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-blue-600 rounded-lg flex items-center justify-center">
              <Shield size={20} className="text-white" />
            </div>
            <div>
              <div className="font-bold text-base leading-tight">SYOS</div>
              <div className="text-xs text-slate-400">Secure Society</div>
            </div>
          </div>
          <button onClick={onClose} className="lg:hidden text-slate-400 hover:text-white">
            <X size={18} />
          </button>
        </div>

        {/* Society Info */}
        <div className="px-4 py-3 mx-3 mt-3 rounded-lg bg-white/5 border border-white/10">
          <div className="text-xs text-slate-400 mb-1">Active Society</div>
          <div className="text-sm font-medium leading-tight">AWGHS</div>
          <div className="text-xs text-slate-400">Sector 27, Panchkula</div>
        </div>

        {/* Nav */}
        <nav className="flex-1 px-3 py-4 overflow-y-auto scrollbar-thin">
          <div className="text-xs text-slate-500 font-semibold uppercase tracking-wider px-3 mb-2">Main Menu</div>
          <ul className="space-y-1">
            {navItems.map((item) => {
              const active = location.pathname === item.path;
              return (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    onClick={onClose}
                    className={cn(
                      "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all",
                      active
                        ? "bg-blue-600 text-white shadow-lg"
                        : "text-slate-300 hover:bg-white/10 hover:text-white"
                    )}
                  >
                    <item.icon size={18} />
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Footer */}
        <div className="px-4 py-4 border-t border-white/10">
          <Link to="/" className="flex items-center gap-2 text-xs text-slate-400 hover:text-white transition-colors">
            <Home size={14} />
            Back to Home
          </Link>
          <div className="mt-3 text-xs text-slate-500">
            © 2025 SYOS Enterprises
          </div>
        </div>
      </aside>
    </>
  );
}
