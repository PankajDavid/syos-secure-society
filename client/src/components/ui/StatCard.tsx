import { cn } from '@/lib/utils';
import { type LucideIcon, TrendingUp } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  iconBg: string;
  iconColor: string;
  trend?: string;
  trendUp?: boolean;
  subtitle?: string;
  alert?: boolean;
}

export default function StatCard({ title, value, icon: Icon, iconBg, iconColor, trend, trendUp, subtitle, alert }: StatCardProps) {
  return (
    <div className={cn(
      "bg-white rounded-xl p-5 shadow-sm border transition-shadow hover:shadow-md",
      alert ? "border-red-200" : "border-slate-100"
    )}>
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-slate-500 font-medium mb-1">{title}</p>
          <p className={cn("text-3xl font-bold", alert ? "text-red-600" : "text-slate-800")}>{value}</p>
          {subtitle && <p className="text-xs text-slate-400 mt-1">{subtitle}</p>}
        </div>
        <div className={cn("w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0", iconBg)}>
          <Icon size={22} className={iconColor} />
        </div>
      </div>
      {trend && (
        <div className="flex items-center gap-1 mt-3 pt-3 border-t border-slate-50">
          <TrendingUp size={13} className={trendUp ? "text-green-500" : "text-red-500"} />
          <span className={cn("text-xs font-medium", trendUp ? "text-green-600" : "text-red-600")}>{trend}</span>
        </div>
      )}
    </div>
  );
}
