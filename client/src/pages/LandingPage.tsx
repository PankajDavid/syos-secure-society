import { Link } from 'react-router-dom';
import {
  Shield, Users, Camera, AlertTriangle, QrCode, Eye,
  CheckCircle, ArrowRight, Phone, Mail, MapPin, Star,
  Clock, BarChart3, Smartphone, Zap, Lock, Bell
} from 'lucide-react';

const features = [
  { icon: Users,         title: 'Visitor Management',    desc: 'Digital visitor entry with photo capture, pre-approval system, and real-time resident notifications.',  color: '#EFF6FF', icolor: '#2563EB' },
  { icon: Shield,        title: 'Guard Management',      desc: 'Complete guard profiles, shift management, QR-based identity verification and performance tracking.',    color: '#F0FDF4', icolor: '#16A34A' },
  { icon: AlertTriangle, title: 'Incident Reporting',    desc: 'Structured incident logging with priorities, photo evidence, and resolution tracking for accountability.', color: '#FFF1F2', icolor: '#E11D48' },
  { icon: Camera,        title: 'CCTV Monitoring',       desc: 'Centralised feeds with AI-powered alerts for movement, unknown vehicles, and after-hours activity.',       color: '#F5F3FF', icolor: '#7C3AED' },
  { icon: QrCode,        title: 'QR Verification',       desc: 'Instant guard identity verification via QR scan — prevents impersonation and unauthorised access.',        color: '#FFFBEB', icolor: '#D97706' },
  { icon: Eye,           title: 'Security Observations', desc: 'Guards report infrastructure issues and hazards proactively, acting as your society\'s intelligence network.', color: '#F0FDFA', icolor: '#0D9488' },
];

const stats = [
  { value: '99.9%', label: 'Uptime SLA' },
  { value: '< 30s', label: 'Alert Response' },
  { value: '500+',  label: 'Societies' },
  { value: '24/7',  label: 'Support' },
];

const roles = [
  { role: 'Society Admin', desc: 'Full command centre', color: '#2563EB', path: '/dashboard' },
  { role: 'Security Guard', desc: 'Guard operations',  color: '#16A34A', path: '/dashboard' },
  { role: 'Resident',       desc: 'Approval portal',   color: '#7C3AED', path: '/approvals' },
  { role: 'Super Admin',    desc: 'Multi-society',     color: '#0F172A', path: '/dashboard' },
];

const whyPoints = [
  { icon: Clock,      text: 'Real-time alerts within 30 seconds of any incident' },
  { icon: Lock,       text: 'Digital audit trail for every visitor and guard action' },
  { icon: Bell,       text: 'Instant resident notifications for visitor approvals' },
  { icon: BarChart3,  text: 'Monthly security analytics and management reports' },
  { icon: Smartphone, text: 'Mobile-ready for guards on patrol' },
  { icon: Star,       text: 'Committee dashboard with complete visibility' },
];

export default function LandingPage() {
  return (
    <div style={{ minHeight: '100vh', background: 'white', fontFamily: 'Inter, sans-serif' }}>

      {/* ── Navbar ── */}
      <nav className="landing-nav">
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{ width: 36, height: 36, background: '#0F172A', borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <Shield size={18} color="white" />
          </div>
          <div>
            <div style={{ fontWeight: 800, fontSize: 16, color: '#0F172A', lineHeight: 1.1 }}>SYOS</div>
            <div style={{ fontSize: 10, color: '#94A3B8', lineHeight: 1.1 }}>Secure Society</div>
          </div>
        </div>

        <div className="landing-nav-links" style={{ gap: 24 }}>
          {['#features', '#demo', '#contact'].map((href, i) => (
            <a key={href} href={href} style={{ fontSize: 13, fontWeight: 500, color: '#64748B', textDecoration: 'none' }}
              onMouseEnter={e => (e.currentTarget.style.color = '#2563EB')}
              onMouseLeave={e => (e.currentTarget.style.color = '#64748B')}>
              {['Features', 'Demo', 'Contact'][i]}
            </a>
          ))}
        </div>

        <Link to="/dashboard" style={{
          background: '#2563EB', color: 'white', padding: '8px 14px', borderRadius: 10,
          fontSize: 13, fontWeight: 600, textDecoration: 'none',
          display: 'flex', alignItems: 'center', gap: 6, flexShrink: 0,
        }}>
          Dashboard <ArrowRight size={14} />
        </Link>
      </nav>

      {/* ── Hero ── */}
      <section className="hero-section">
        <div style={{ maxWidth: 720, margin: '0 auto' }}>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: 6,
            background: 'rgba(37,99,235,0.2)', border: '1px solid rgba(37,99,235,0.3)',
            borderRadius: 999, padding: '5px 14px', fontSize: 12, color: '#93C5FD', marginBottom: 24,
          }}>
            <Zap size={12} /> Technology-Enabled Security Platform
          </div>

          <h1 className="hero-h1">
            Security{' '}
            <span style={{ background: 'linear-gradient(90deg,#60A5FA,#34D399)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              Beyond Manpower
            </span>
          </h1>

          <p className="hero-sub">
            Technology Enabled Security Solutions for Modern Residential Communities.
            Empowering guards, residents, and committees with real-time intelligence.
          </p>

          <div className="hero-btns">
            <Link to="/dashboard" style={{
              background: '#2563EB', color: 'white', padding: '13px 28px', borderRadius: 12,
              fontWeight: 700, fontSize: 14, textDecoration: 'none',
              display: 'flex', alignItems: 'center', gap: 8, width: '100%', justifyContent: 'center', maxWidth: 260,
            }}>
              View Live Demo <ArrowRight size={16} />
            </Link>
            <a href="#features" style={{
              background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)',
              color: 'white', padding: '13px 28px', borderRadius: 12,
              fontWeight: 600, fontSize: 14, textDecoration: 'none',
              display: 'flex', alignItems: 'center', gap: 8, width: '100%', justifyContent: 'center', maxWidth: 260,
            }}>
              Explore Modules
            </a>
          </div>

          {/* Stats */}
          <div className="hero-stats">
            {stats.map(s => (
              <div key={s.label} style={{
                background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: 12, padding: '12px 8px', textAlign: 'center',
              }}>
                <div style={{ fontSize: 20, fontWeight: 800, color: '#60A5FA' }}>{s.value}</div>
                <div style={{ fontSize: 11, color: '#64748B', marginTop: 2 }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Features ── */}
      <section id="features" style={{ padding: '60px 16px', background: '#F8FAFC' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 40 }}>
            <h2 style={{ fontSize: 26, fontWeight: 800, color: '#0F172A', marginBottom: 8 }}>Complete Security Suite</h2>
            <p style={{ fontSize: 14, color: '#64748B', maxWidth: 480, margin: '0 auto' }}>
              Every module designed to give your society complete visibility and control over security operations.
            </p>
          </div>
          <div className="features-grid">
            {features.map(f => (
              <div key={f.title} style={{
                background: 'white', borderRadius: 16, padding: 20,
                border: '1px solid #F1F5F9', boxShadow: '0 1px 4px rgba(0,0,0,0.05)',
                transition: 'transform 0.2s, box-shadow 0.2s',
              }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.transform = 'translateY(-3px)'; (e.currentTarget as HTMLElement).style.boxShadow = '0 8px 24px rgba(0,0,0,0.1)'; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform = 'none'; (e.currentTarget as HTMLElement).style.boxShadow = '0 1px 4px rgba(0,0,0,0.05)'; }}
              >
                <div style={{ width: 44, height: 44, borderRadius: 12, background: f.color, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 14 }}>
                  <f.icon size={20} style={{ color: f.icolor }} />
                </div>
                <h3 style={{ fontSize: 15, fontWeight: 700, color: '#1E293B', marginBottom: 6 }}>{f.title}</h3>
                <p style={{ fontSize: 13, color: '#64748B', lineHeight: 1.6 }}>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Why SYOS ── */}
      <section style={{ padding: '60px 16px', background: 'white' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr', gap: 40 }}>
          <div style={{ maxWidth: 520 }}>
            <h2 style={{ fontSize: 24, fontWeight: 800, color: '#0F172A', marginBottom: 12 }}>Why SYOS Secure Society?</h2>
            <p style={{ fontSize: 14, color: '#64748B', marginBottom: 24, lineHeight: 1.7 }}>
              Traditional security relies on manpower alone. SYOS augments your guards with technology — making every shift smarter, every incident traceable, every visitor accountable.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {whyPoints.map(p => (
                <div key={p.text} style={{ display: 'flex', alignItems: 'flex-start', gap: 10 }}>
                  <div style={{ width: 32, height: 32, background: '#EFF6FF', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <p.icon size={14} style={{ color: '#2563EB' }} />
                  </div>
                  <p style={{ fontSize: 13, color: '#475569', lineHeight: 1.6, paddingTop: 6 }}>{p.text}</p>
                </div>
              ))}
            </div>
          </div>

          <div style={{ background: 'linear-gradient(135deg,#0F172A,#1E293B)', borderRadius: 20, padding: 24, color: 'white' }}>
            <div style={{ fontSize: 11, color: '#64748B', fontWeight: 600, marginBottom: 4 }}>Powered by SYOS Enterprises</div>
            <h3 style={{ fontSize: 18, fontWeight: 800, marginBottom: 20 }}>Group Housing Society</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: 10, marginBottom: 16 }}>
              {[['14','Guards'],['120','Flats'],['350','Residents'],['12','Cameras']].map(([v,l]) => (
                <div key={l} style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 12, padding: '12px 14px' }}>
                  <div style={{ fontSize: 22, fontWeight: 800, color: '#60A5FA' }}>{v}</div>
                  <div style={{ fontSize: 12, color: '#64748B', marginTop: 2 }}>{l}</div>
                </div>
              ))}
            </div>
            <div style={{ background: 'rgba(22,163,74,0.12)', border: '1px solid rgba(22,163,74,0.25)', borderRadius: 12, padding: '12px 14px', display: 'flex', alignItems: 'center', gap: 8 }}>
              <CheckCircle size={16} style={{ color: '#4ADE80', flexShrink: 0 }} />
              <div>
                <p style={{ fontSize: 13, fontWeight: 600, color: '#4ADE80' }}>System Status: All Operations Normal</p>
                <p style={{ fontSize: 11, color: '#475569' }}>Last updated: Just now</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Demo Logins ── */}
      <section id="demo" style={{ padding: '60px 16px', background: '#F8FAFC' }}>
        <div style={{ maxWidth: 900, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 32 }}>
            <h2 style={{ fontSize: 24, fontWeight: 800, color: '#0F172A', marginBottom: 8 }}>Explore the Demo</h2>
            <p style={{ fontSize: 14, color: '#64748B' }}>Select a role and experience the platform from different perspectives.</p>
          </div>
          <div className="demo-roles-grid">
            {roles.map(r => (
              <Link key={r.role} to={r.path} style={{
                background: 'white', borderRadius: 16, padding: '20px 16px',
                border: '1px solid #F1F5F9', boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
                textDecoration: 'none', textAlign: 'center', display: 'block',
                transition: 'transform 0.2s, box-shadow 0.2s',
              }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.transform = 'translateY(-3px)'; (e.currentTarget as HTMLElement).style.boxShadow = '0 8px 20px rgba(0,0,0,0.1)'; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform = 'none'; (e.currentTarget as HTMLElement).style.boxShadow = '0 1px 3px rgba(0,0,0,0.05)'; }}
              >
                <div style={{ width: 48, height: 48, background: r.color, borderRadius: 14, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 12px' }}>
                  <Shield size={22} color="white" />
                </div>
                <p style={{ fontSize: 14, fontWeight: 700, color: '#1E293B', marginBottom: 4 }}>{r.role}</p>
                <p style={{ fontSize: 12, color: '#94A3B8', marginBottom: 14 }}>{r.desc}</p>
                <span style={{ fontSize: 12, fontWeight: 600, color: '#2563EB', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 4 }}>
                  Enter Demo <ArrowRight size={12} />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section style={{ background: 'linear-gradient(135deg,#0F172A,#1E293B)', padding: '56px 16px', textAlign: 'center', color: 'white' }}>
        <h2 style={{ fontSize: 22, fontWeight: 800, marginBottom: 10, maxWidth: 560, margin: '0 auto 10px' }}>Ready to Modernise Your Society's Security?</h2>
        <p style={{ fontSize: 14, color: '#94A3B8', marginBottom: 28, maxWidth: 480, margin: '0 auto 28px', lineHeight: 1.6 }}>
          Join hundreds of residential societies that have upgraded to SYOS technology-enabled security.
        </p>
        <a href="tel:+919876543200" style={{
          display: 'inline-flex', alignItems: 'center', gap: 8,
          background: '#2563EB', color: 'white', padding: '13px 28px',
          borderRadius: 12, fontWeight: 700, fontSize: 14, textDecoration: 'none',
        }}>
          <Phone size={16} /> Book a Free Demo
        </a>
      </section>

      {/* ── Footer ── */}
      <footer id="contact" style={{ background: '#0F172A', color: '#64748B', padding: '40px 16px 24px' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 28, marginBottom: 28 }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
                <Shield size={18} style={{ color: '#3B82F6' }} />
                <span style={{ fontWeight: 700, color: 'white', fontSize: 14 }}>SYOS Enterprises</span>
              </div>
              <p style={{ fontSize: 13, lineHeight: 1.7 }}>Technology-enabled security solutions for modern residential communities across India.</p>
            </div>
            <div>
              <h4 style={{ fontWeight: 600, color: 'white', marginBottom: 10, fontSize: 13 }}>Contact</h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8, fontSize: 13 }}>
                {[[Phone,'+91 98765 43200'],[Mail,'info@syos.in'],[MapPin,'Chandigarh, India']].map(([Icon,text],i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    {/* @ts-ignore */}
                    <Icon size={13} /> {text as string}
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div style={{ borderTop: '1px solid rgba(255,255,255,0.07)', paddingTop: 20, fontSize: 12, textAlign: 'center' }}>
            © 2025 SYOS Enterprises. All rights reserved. | Security Beyond Manpower
          </div>
        </div>
      </footer>
    </div>
  );
}
