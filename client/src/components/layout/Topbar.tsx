import { Menu, Bell, ChevronDown, Shield } from 'lucide-react';
import { useRole } from '@/hooks/useRole';

interface TopbarProps {
  onMenuClick: () => void;
  title: string;
}

const roleColors: Record<string, string> = {
  super_admin: 'bg-purple-100 text-purple-700',
  society_admin: 'bg-blue-100 text-blue-700',
  guard: 'bg-green-100 text-green-700',
  resident: 'bg-orange-100 text-orange-700',
};

const roleLabels: Record<string, string> = {
  super_admin: 'Super Admin',
  society_admin: 'Society Admin',
  guard: 'Security Guard',
  resident: 'Resident',
};

export default function Topbar({ onMenuClick, title }: TopbarProps) {
  const { role, setRole } = useRole();

  return (
    <header className="sticky top-0 z-10 bg-white border-b border-slate-200 px-4 py-3 flex items-center justify-between shadow-sm">
      <div className="flex items-center gap-3">
        <button
          onClick={onMenuClick}
          className="lg:hidden p-2 rounded-lg hover:bg-slate-100 transition-colors"
        >
          <Menu size={20} className="text-slate-600" />
        </button>
        <h1 className="text-base font-semibold text-slate-800">{title}</h1>
      </div>

      <div className="flex items-center gap-3">
        {/* Demo Role Switcher */}
        <select
          value={role}
          onChange={(e) => setRole(e.target.value as any)}
          className={`text-xs font-medium px-2 py-1 rounded-full border-0 cursor-pointer ${roleColors[role]}`}
        >
          <option value="super_admin">Super Admin</option>
          <option value="society_admin">Society Admin</option>
          <option value="guard">Guard</option>
          <option value="resident">Resident</option>
        </select>

        <button className="relative p-2 rounded-lg hover:bg-slate-100 transition-colors">
          <Bell size={18} className="text-slate-600" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
        </button>

        <div className="flex items-center gap-2 pl-3 border-l border-slate-200">
          <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
            <Shield size={16} className="text-white" />
          </div>
          <div className="hidden sm:block">
            <div className="text-xs font-semibold text-slate-800">Demo User</div>
            <div className="text-xs text-slate-500">{roleLabels[role]}</div>
          </div>
          <ChevronDown size={14} className="text-slate-400" />
        </div>
      </div>
    </header>
  );
}
