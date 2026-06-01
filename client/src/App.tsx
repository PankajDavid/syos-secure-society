import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useState } from 'react';
import { RoleCtx } from './hooks/useRole';
import AppLayout from './components/layout/AppLayout';
import LandingPage from './pages/LandingPage';
import Dashboard from './pages/Dashboard';
import Visitors from './pages/Visitors';
import Approvals from './pages/Approvals';
import Guards from './pages/Guards';
import Attendance from './pages/Attendance';
import Incidents from './pages/Incidents';
import Observations from './pages/Observations';
import CCTV from './pages/CCTV';
import QRVerify from './pages/QRVerify';
import Reports from './pages/Reports';
import VisitorPasses from './pages/VisitorPasses';
import GateVerify from './pages/GateVerify';

type Role = 'super_admin' | 'society_admin' | 'guard' | 'resident';

export default function App() {
  const [role, setRole] = useState<Role>('society_admin');

  return (
    <RoleCtx.Provider value={{ role, setRole }}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route element={<AppLayout />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/visitors" element={<Visitors />} />
            <Route path="/approvals" element={<Approvals />} />
            <Route path="/guards" element={<Guards />} />
            <Route path="/attendance" element={<Attendance />} />
            <Route path="/incidents" element={<Incidents />} />
            <Route path="/observations" element={<Observations />} />
            <Route path="/cctv" element={<CCTV />} />
            <Route path="/qr-verify" element={<QRVerify />} />
            <Route path="/reports" element={<Reports />} />
            <Route path="/passes" element={<VisitorPasses />} />
            <Route path="/gate" element={<GateVerify />} />
          </Route>
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </BrowserRouter>
    </RoleCtx.Provider>
  );
}
