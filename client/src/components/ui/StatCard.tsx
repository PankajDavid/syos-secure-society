import { type LucideIcon, TrendingUp, TrendingDown } from 'lucide-react';

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
    <div style={{
      background: 'white', borderRadius: 12, padding: '18px 16px',
      border: alert ? '1px solid #FECACA' : '1px solid #F1F5F9',
      boxShadow: '0 1px 3px rgba(0,0,0,0.06)',
      transition: 'box-shadow 0.2s',
      display: 'flex', flexDirection: 'column', gap: 8,
    }}>
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 8 }}>
        <div style={{ flex: 1, minWidth: 0 }}>
          <p style={{ fontSize: 11, fontWeight: 600, color: '#64748B', textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: 4 }}>
            {title}
          </p>
          <p style={{ fontSize: 28, fontWeight: 800, color: alert ? '#DC2626' : '#0F172A', lineHeight: 1, marginBottom: subtitle ? 4 : 0 }}>
            {value}
          </p>
          {subtitle && <p style={{ fontSize: 11, color: '#94A3B8' }}>{subtitle}</p>}
        </div>
        <div style={{
          width: 44, height: 44, borderRadius: 12, display: 'flex',
          alignItems: 'center', justifyContent: 'center', flexShrink: 0,
          background: iconBg,
        }}>
          <Icon size={20} style={{ color: iconColor }} />
        </div>
      </div>
      {trend && (
        <div style={{
          display: 'flex', alignItems: 'center', gap: 4,
          paddingTop: 8, borderTop: '1px solid #F8FAFC',
        }}>
          {trendUp
            ? <TrendingUp size={12} style={{ color: '#16A34A', flexShrink: 0 }} />
            : <TrendingDown size={12} style={{ color: '#DC2626', flexShrink: 0 }} />}
          <span style={{ fontSize: 11, fontWeight: 600, color: trendUp ? '#16A34A' : '#DC2626' }}>{trend}</span>
        </div>
      )}
    </div>
  );
}
