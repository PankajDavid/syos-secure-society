import React from 'react';

type Variant = 'default' | 'success' | 'warning' | 'danger' | 'info' | 'purple';

const variantStyles: Record<Variant, { background: string; color: string; dot: string }> = {
  default: { background: '#F1F5F9', color: '#475569', dot: '#94A3B8' },
  success: { background: '#DCFCE7', color: '#15803D', dot: '#16A34A' },
  warning: { background: '#FEF9C3', color: '#A16207', dot: '#EAB308' },
  danger:  { background: '#FEE2E2', color: '#B91C1C', dot: '#EF4444' },
  info:    { background: '#DBEAFE', color: '#1D4ED8', dot: '#3B82F6' },
  purple:  { background: '#F3E8FF', color: '#7E22CE', dot: '#A855F7' },
};

interface BadgeProps {
  children: React.ReactNode;
  variant?: Variant;
  dot?: boolean;
  style?: React.CSSProperties;
}

export function Badge({ children, variant = 'default', dot, style }: BadgeProps) {
  const s = variantStyles[variant];
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', gap: 5,
      padding: '3px 8px', borderRadius: 999,
      fontSize: 11, fontWeight: 600, whiteSpace: 'nowrap',
      background: s.background, color: s.color,
      ...style,
    }}>
      {dot && <span style={{ width: 6, height: 6, borderRadius: '50%', background: s.dot, flexShrink: 0 }} />}
      {children}
    </span>
  );
}

export function statusBadge(status: string) {
  const map: Record<string, { label: string; variant: Variant }> = {
    approved:    { label: 'Approved',    variant: 'success' },
    pending:     { label: 'Pending',     variant: 'warning' },
    rejected:    { label: 'Rejected',    variant: 'danger'  },
    active:      { label: 'Active',      variant: 'success' },
    inactive:    { label: 'Inactive',    variant: 'danger'  },
    on_leave:    { label: 'On Leave',    variant: 'warning' },
    verified:    { label: 'Verified',    variant: 'success' },
    open:        { label: 'Open',        variant: 'danger'  },
    in_progress: { label: 'In Progress', variant: 'warning' },
    resolved:    { label: 'Resolved',    variant: 'success' },
    closed:      { label: 'Closed',      variant: 'default' },
    acknowledged:{ label: 'Acknowledged',variant: 'info'    },
    present:     { label: 'Present',     variant: 'success' },
    absent:      { label: 'Absent',      variant: 'danger'  },
    late:        { label: 'Late',        variant: 'warning' },
    critical:    { label: 'Critical',    variant: 'danger'  },
    high:        { label: 'High',        variant: 'danger'  },
    medium:      { label: 'Medium',      variant: 'warning' },
    low:         { label: 'Low',         variant: 'info'    },
    morning:     { label: 'Morning',     variant: 'info'    },
    evening:     { label: 'Evening',     variant: 'warning' },
    night:       { label: 'Night',       variant: 'purple'  },
  };
  const cfg = map[status] || { label: status, variant: 'default' as Variant };
  return <Badge variant={cfg.variant} dot>{cfg.label}</Badge>;
}
