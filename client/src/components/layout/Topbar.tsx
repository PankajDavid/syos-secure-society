import { Menu, Bell, Shield, ChevronDown } from 'lucide-react';
import { useRole } from '@/hooks/useRole';

interface TopbarProps { onMenuClick: () => void; title: string; }

const roleColors: Record<string, { bg: string; text: string }> = {
  super_admin:   { bg: '#EDE9FE', text: '#6D28D9' },
  society_admin: { bg: '#DBEAFE', text: '#1D4ED8' },
  guard:         { bg: '#DCFCE7', text: '#15803D' },
  resident:      { bg: '#FEF3C7', text: '#B45309' },
};
const roleLabels: Record<string, string> = {
  super_admin: 'Super Admin', society_admin: 'Society Admin',
  guard: 'Guard', resident: 'Resident',
};
type Role = 'super_admin' | 'society_admin' | 'guard' | 'resident';

export default function Topbar({ onMenuClick, title }: TopbarProps) {
  const { role, setRole } = useRole();
  const rc = roleColors[role];

  return (
    <header className="topbar">
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, minWidth: 0 }}>
        {/* Hamburger — only on mobile */}
        <button
          onClick={onMenuClick}
          className="hide-lg"
          style={{
            background: 'none', border: 'none', cursor: 'pointer',
            padding: 6, borderRadius: 8, color: '#64748B',
            display: 'flex', alignItems: 'center', flexShrink: 0,
          }}
        >
          <Menu size={20} />
        </button>
        <h1 className="topbar-title">{title}</h1>
      </div>

      <div className="topbar-right">
        {/* Role switcher */}
        <select
          value={role}
          onChange={e => setRole(e.target.value as Role)}
          style={{
            fontSize: 11, fontWeight: 600, padding: '4px 6px',
            borderRadius: 999, border: 'none', cursor: 'pointer',
            background: rc.bg, color: rc.text, fontFamily: 'inherit', outline: 'none',
            maxWidth: 100,
          }}
        >
          <option value="super_admin">Super Admin</option>
          <option value="society_admin">Society Admin</option>
          <option value="guard">Guard</option>
          <option value="resident">Resident</option>
        </select>

        {/* Bell */}
        <button style={{
          position: 'relative', background: 'none', border: 'none',
          cursor: 'pointer', padding: 6, borderRadius: 8, color: '#64748B',
          display: 'flex', alignItems: 'center', flexShrink: 0,
        }}>
          <Bell size={18} />
          <span style={{
            position: 'absolute', top: 5, right: 5, width: 7, height: 7,
            background: '#EF4444', borderRadius: '50%', border: '1.5px solid white',
          }} />
        </button>

        {/* User avatar */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, paddingLeft: 8, borderLeft: '1px solid #E2E8F0' }}>
          <div style={{
            width: 30, height: 30, background: '#2563EB', borderRadius: '50%',
            display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
          }}>
            <Shield size={14} color="white" />
          </div>
          {/* Name hidden on small screens */}
          <div className="hide-xs" style={{ flexDirection: 'column' }}>
            <span style={{ fontSize: 11, fontWeight: 700, color: '#1E293B', lineHeight: 1.2, display: 'block' }}>Demo User</span>
            <span style={{ fontSize: 10, color: '#94A3B8', lineHeight: 1.2, display: 'block' }}>{roleLabels[role]}</span>
          </div>
          <ChevronDown size={13} color="#94A3B8" />
        </div>
      </div>
    </header>
  );
}
