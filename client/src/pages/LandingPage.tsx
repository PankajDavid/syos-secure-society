import { Link } from 'react-router-dom';
import {
  Shield, Users, Camera, AlertTriangle, QrCode, Eye,
  CheckCircle, ArrowRight, Phone, Mail, MapPin, Star,
  Clock, BarChart3, Smartphone, Zap, Lock, Bell
} from 'lucide-react';

const features = [
  { icon: Users, title: 'Visitor Management', desc: 'Digital visitor entry with photo capture, pre-approval system, and real-time notifications to residents.', color: 'bg-blue-50 text-blue-600' },
  { icon: Shield, title: 'Guard Management', desc: 'Complete guard profiles, shift management, QR-based identity verification, and performance tracking.', color: 'bg-green-50 text-green-600' },
  { icon: AlertTriangle, title: 'Incident Reporting', desc: 'Structured incident logging with priorities, photo evidence, and resolution tracking for full accountability.', color: 'bg-red-50 text-red-600' },
  { icon: Camera, title: 'CCTV Monitoring', desc: 'Centralized camera feeds with AI-powered alerts for movement, unknown vehicles, and after-hours activity.', color: 'bg-purple-50 text-purple-600' },
  { icon: QrCode, title: 'QR Verification', desc: 'Instant guard identity verification via QR scan — prevents impersonation and unauthorized access.', color: 'bg-amber-50 text-amber-600' },
  { icon: Eye, title: 'Security Observations', desc: 'Guards act as eyes of the society — reporting infrastructure issues, hazards, and anomalies proactively.', color: 'bg-teal-50 text-teal-600' },
];

const stats = [
  { value: '99.9%', label: 'Uptime SLA' },
  { value: '< 30s', label: 'Alert Response' },
  { value: '500+', label: 'Societies Served' },
  { value: '24/7', label: 'Support' },
];

const roles = [
  { role: 'Society Admin', desc: 'Full command center visibility', color: 'bg-blue-600', path: '/dashboard' },
  { role: 'Security Guard', desc: 'Guard operations panel', color: 'bg-green-600', path: '/dashboard' },
  { role: 'Resident', desc: 'Resident approval portal', color: 'bg-purple-600', path: '/approvals' },
  { role: 'Super Admin', desc: 'Multi-society management', color: 'bg-slate-800', path: '/dashboard' },
];

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white font-sans">
      {/* Navbar */}
      <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-slate-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 bg-[#0F172A] rounded-xl flex items-center justify-center">
                <Shield size={20} className="text-white" />
              </div>
              <div>
                <div className="font-bold text-[#0F172A] text-lg leading-tight">SYOS</div>
                <div className="text-xs text-slate-400 leading-tight">Secure Society</div>
              </div>
            </div>
            <div className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-600">
              <a href="#features" className="hover:text-blue-600 transition-colors">Features</a>
              <a href="#demo" className="hover:text-blue-600 transition-colors">Demo Logins</a>
              <a href="#contact" className="hover:text-blue-600 transition-colors">Contact</a>
            </div>
            <Link
              to="/dashboard"
              className="bg-[#2563EB] text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-blue-700 transition-colors flex items-center gap-2"
            >
              Open Dashboard <ArrowRight size={15} />
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="bg-gradient-to-br from-[#0F172A] via-[#1E293B] to-[#0F172A] text-white pt-20 pb-24 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-blue-600/20 border border-blue-500/30 rounded-full px-4 py-1.5 text-sm text-blue-300 mb-8">
              <Zap size={14} /> Technology-Enabled Security Platform
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold leading-tight mb-6">
              Security{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">
                Beyond Manpower
              </span>
            </h1>
            <p className="text-lg sm:text-xl text-slate-300 mb-10 leading-relaxed">
              Technology Enabled Security Solutions for Modern Residential Communities.
              Empowering guards, residents, and committees with real-time intelligence.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/dashboard"
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3.5 rounded-xl font-semibold text-base transition-all hover:shadow-lg hover:shadow-blue-600/30 flex items-center justify-center gap-2"
              >
                View Live Demo <ArrowRight size={18} />
              </Link>
              <a
                href="#demo"
                className="bg-white/10 hover:bg-white/20 border border-white/20 text-white px-8 py-3.5 rounded-xl font-semibold text-base transition-all flex items-center justify-center gap-2"
              >
                Explore Modules
              </a>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-16 max-w-3xl mx-auto">
            {stats.map((s) => (
              <div key={s.label} className="text-center bg-white/5 border border-white/10 rounded-xl p-4">
                <div className="text-2xl font-bold text-blue-400">{s.value}</div>
                <div className="text-xs text-slate-400 mt-1">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-20 px-4 bg-slate-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-[#0F172A] mb-3">Complete Security Suite</h2>
            <p className="text-slate-500 max-w-xl mx-auto">Every module designed to give your society complete visibility and control over security operations.</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((f) => (
              <div key={f.title} className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 hover:shadow-md hover:-translate-y-0.5 transition-all">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${f.color}`}>
                  <f.icon size={22} />
                </div>
                <h3 className="font-bold text-slate-800 text-lg mb-2">{f.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why SYOS */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-[#0F172A] mb-4">Why SYOS Secure Society?</h2>
              <p className="text-slate-500 mb-8">Traditional security relies purely on manpower. SYOS augments your guards with technology — making every shift smarter, every incident traceable, every visitor accountable.</p>
              <div className="space-y-4">
                {[
                  { icon: Clock, text: 'Real-time alerts within 30 seconds of any incident' },
                  { icon: Lock, text: 'Digital audit trail for every visitor and guard action' },
                  { icon: Bell, text: 'Instant resident notifications for visitor approvals' },
                  { icon: BarChart3, text: 'Monthly security analytics and management reports' },
                  { icon: Smartphone, text: 'Mobile-ready for guards on patrol' },
                  { icon: Star, text: 'Committee dashboard with complete visibility' },
                ].map((item) => (
                  <div key={item.text} className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-blue-50 rounded-lg flex items-center justify-center flex-shrink-0">
                      <item.icon size={15} className="text-blue-600" />
                    </div>
                    <p className="text-slate-600 text-sm leading-relaxed pt-1">{item.text}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-gradient-to-br from-[#0F172A] to-[#1E293B] rounded-2xl p-8 text-white">
              <div className="text-sm text-slate-400 mb-2">Powered by SYOS Enterprises</div>
              <h3 className="text-2xl font-bold mb-6">Army Welfare Group Housing Society</h3>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { label: 'Guards', value: '14' },
                  { label: 'Flats', value: '120' },
                  { label: 'Residents', value: '350' },
                  { label: 'Cameras', value: '12' },
                ].map((item) => (
                  <div key={item.label} className="bg-white/5 border border-white/10 rounded-xl p-4">
                    <div className="text-2xl font-bold text-blue-400">{item.value}</div>
                    <div className="text-xs text-slate-400 mt-1">{item.label}</div>
                  </div>
                ))}
              </div>
              <div className="mt-6 p-4 bg-green-500/10 border border-green-500/20 rounded-xl">
                <div className="flex items-center gap-2 text-green-400 text-sm font-semibold">
                  <CheckCircle size={16} /> System Status: All Operations Normal
                </div>
                <div className="text-xs text-slate-400 mt-1">Last updated: Just now</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Demo Logins */}
      <section id="demo" className="py-20 px-4 bg-slate-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-[#0F172A] mb-3">Explore the Demo</h2>
            <p className="text-slate-500">Select a role and experience the platform from different perspectives.</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-4xl mx-auto">
            {roles.map((r) => (
              <Link
                key={r.role}
                to={r.path}
                className="group bg-white rounded-xl p-6 shadow-sm border border-slate-100 hover:shadow-md hover:-translate-y-0.5 transition-all text-center"
              >
                <div className={`w-12 h-12 ${r.color} rounded-xl flex items-center justify-center mx-auto mb-3`}>
                  <Shield size={22} className="text-white" />
                </div>
                <h3 className="font-bold text-slate-800 mb-1">{r.role}</h3>
                <p className="text-xs text-slate-500 mb-4">{r.desc}</p>
                <span className="text-xs font-semibold text-blue-600 group-hover:gap-2 flex items-center justify-center gap-1 transition-all">
                  Enter Demo <ArrowRight size={13} />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-4 bg-gradient-to-r from-[#0F172A] to-[#1E293B] text-white">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Modernize Your Society's Security?</h2>
          <p className="text-slate-300 mb-8">Join hundreds of residential societies that have upgraded from traditional security to SYOS technology-enabled operations.</p>
          <a
            href="tel:+919876543200"
            className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-8 py-3.5 rounded-xl font-semibold transition-all hover:shadow-lg"
          >
            <Phone size={18} /> Book a Free Demo
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer id="contact" className="bg-[#0F172A] text-slate-400 py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Shield size={20} className="text-blue-400" />
                <span className="font-bold text-white">SYOS Enterprises</span>
              </div>
              <p className="text-sm leading-relaxed">Technology-enabled security solutions for modern residential communities across India.</p>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-3">Contact</h4>
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2"><Phone size={14} /> +91 98765 43200</div>
                <div className="flex items-center gap-2"><Mail size={14} /> info@syos.in</div>
                <div className="flex items-center gap-2"><MapPin size={14} /> Chandigarh, India</div>
              </div>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-3">Platform</h4>
              <div className="space-y-1 text-sm">
                {['Visitor Management', 'Guard Management', 'CCTV Monitoring', 'Incident Reporting', 'QR Verification'].map(f => (
                  <div key={f} className="flex items-center gap-2"><CheckCircle size={12} className="text-green-400" /> {f}</div>
                ))}
              </div>
            </div>
          </div>
          <div className="border-t border-white/10 pt-6 text-center text-xs">
            © 2025 SYOS Enterprises. All rights reserved. | Security Beyond Manpower
          </div>
        </div>
      </footer>
    </div>
  );
}
