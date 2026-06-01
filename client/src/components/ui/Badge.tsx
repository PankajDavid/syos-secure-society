import { cn } from '@/lib/utils';

type Variant = 'default' | 'success' | 'warning' | 'danger' | 'info' | 'purple';

const variants: Record<Variant, string> = {
  default: 'bg-slate-100 text-slate-700',
  success: 'bg-green-100 text-green-700',
  warning: 'bg-amber-100 text-amber-700',
  danger: 'bg-red-100 text-red-700',
  info: 'bg-blue-100 text-blue-700',
  purple: 'bg-purple-100 text-purple-700',
};

interface BadgeProps {
  children: React.ReactNode;
  variant?: Variant;
  className?: string;
  dot?: boolean;
}

export function Badge({ children, variant = 'default', className, dot }: BadgeProps) {
  return (
    <span className={cn(
      'inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-xs font-medium',
      variants[variant],
      className
    )}>
      {dot && <span className={cn('w-1.5 h-1.5 rounded-full', {
        'bg-slate-500': variant === 'default',
        'bg-green-500': variant === 'success',
        'bg-amber-500': variant === 'warning',
        'bg-red-500': variant === 'danger',
        'bg-blue-500': variant === 'info',
        'bg-purple-500': variant === 'purple',
      })} />}
      {children}
    </span>
  );
}

export function statusBadge(status: string) {
  const map: Record<string, { label: string; variant: Variant }> = {
    approved: { label: 'Approved', variant: 'success' },
    pending: { label: 'Pending', variant: 'warning' },
    rejected: { label: 'Rejected', variant: 'danger' },
    active: { label: 'Active', variant: 'success' },
    inactive: { label: 'Inactive', variant: 'danger' },
    on_leave: { label: 'On Leave', variant: 'warning' },
    verified: { label: 'Verified', variant: 'success' },
    open: { label: 'Open', variant: 'danger' },
    in_progress: { label: 'In Progress', variant: 'warning' },
    resolved: { label: 'Resolved', variant: 'success' },
    closed: { label: 'Closed', variant: 'default' },
    acknowledged: { label: 'Acknowledged', variant: 'info' },
    present: { label: 'Present', variant: 'success' },
    absent: { label: 'Absent', variant: 'danger' },
    late: { label: 'Late', variant: 'warning' },
    critical: { label: 'Critical', variant: 'danger' },
    high: { label: 'High', variant: 'danger' },
    medium: { label: 'Medium', variant: 'warning' },
    low: { label: 'Low', variant: 'info' },
    morning: { label: 'Morning', variant: 'info' },
    evening: { label: 'Evening', variant: 'warning' },
    night: { label: 'Night', variant: 'purple' },
  };
  const config = map[status] || { label: status, variant: 'default' as Variant };
  return <Badge variant={config.variant} dot>{config.label}</Badge>;
}
