# 🛡️ SYOS Secure Society

> **Security Beyond Manpower** — Technology Enabled Security Solutions for Modern Residential Communities

An enterprise-grade MVP platform built for **Army Welfare Group Housing Society, Sector 27 Panchkula** to demonstrate modern security operations management.

---

## 🎯 What This Is

SYOS Secure Society is a full-stack web application MVP demonstrating how SYOS Enterprises transforms traditional residential security into a smart, data-driven operation. Built for presentation to the housing society's President and Managing Committee.

---

## 🚀 Quick Start (Local Development)

### Prerequisites
- Node.js 18+
- npm 9+
- PostgreSQL (or Neon PostgreSQL URL)

### 1. Clone & Install
```bash
git clone https://github.com/your-org/syos-secure-society.git
cd syos-secure-society
npm run install:all
```

### 2. Configure Server
```bash
cd server
cp .env.example .env
# Edit .env with your database URL
```

### 3. Initialize Database
```bash
# Connect to your PostgreSQL and run:
psql -d your_database -f server/src/db/schema.sql
psql -d your_database -f server/src/db/seed.sql
```

### 4. Start Development
```bash
# Terminal 1 - Backend
npm run dev:server

# Terminal 2 - Frontend
npm run dev:client
```

App runs at: http://localhost:5173  
API runs at: http://localhost:5000

---

## 📦 Project Structure

```
syos-secure-society/
├── client/                      # React + TypeScript Frontend
│   ├── src/
│   │   ├── components/
│   │   │   ├── layout/         # Sidebar, Topbar, AppLayout
│   │   │   └── ui/             # Reusable UI components
│   │   ├── pages/              # All 10 module pages
│   │   │   ├── LandingPage.tsx
│   │   │   ├── Dashboard.tsx
│   │   │   ├── Visitors.tsx
│   │   │   ├── Approvals.tsx
│   │   │   ├── Guards.tsx
│   │   │   ├── Attendance.tsx
│   │   │   ├── Incidents.tsx
│   │   │   ├── Observations.tsx
│   │   │   ├── CCTV.tsx
│   │   │   ├── QRVerify.tsx
│   │   │   └── Reports.tsx
│   │   ├── data/               # Demo data
│   │   ├── hooks/              # React hooks
│   │   └── lib/                # Utilities
│   └── package.json
│
├── server/                      # Node.js + Express Backend
│   ├── src/
│   │   ├── routes/             # API route handlers
│   │   ├── db/                 # Database schema & seed
│   │   └── index.ts            # Entry point
│   └── package.json
│
├── railway.toml                 # Railway deployment config
├── package.json                 # Root scripts
└── README.md
```

---

## 🗃️ Database Schema

| Table | Description |
|-------|-------------|
| `societies` | Housing society master data |
| `users` | All user accounts (all roles) |
| `guards` | Security guard profiles |
| `flats` | Flat/unit registry |
| `visitors` | Visitor entry logs |
| `attendance` | Guard check-in/check-out |
| `incidents` | Security incident reports |
| `observations` | Guard field observations |
| `camera_alerts` | CCTV alert events |
| `audit_logs` | Full audit trail |

---

## 📡 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/health` | Health check |
| GET | `/api/dashboard/stats` | Dashboard KPIs |
| GET | `/api/dashboard/recent-activity` | Activity feed |
| GET/POST | `/api/visitors` | Visitor management |
| PATCH | `/api/visitors/:id/status` | Approve/reject visitor |
| GET/POST | `/api/guards` | Guard management |
| GET/POST | `/api/attendance` | Attendance logs |
| POST | `/api/attendance/checkin` | Guard check-in |
| PATCH | `/api/attendance/:id/checkout` | Guard check-out |
| GET/POST | `/api/incidents` | Incident reports |
| GET/POST | `/api/observations` | Guard observations |
| GET | `/api/camera-alerts` | CCTV alerts |
| GET | `/api/reports/daily-summary` | Daily report data |

---

## 🌐 Modules Overview

| # | Module | Description |
|---|--------|-------------|
| 1 | **Dashboard** | KPI cards, charts, activity feed |
| 2 | **Visitor Management** | Entry log, search, approve/reject |
| 3 | **Resident Approval** | Approval cards with one-click decisions |
| 4 | **Guard Management** | Guard profiles, grid/list view, QR link |
| 5 | **Attendance** | Check-in/out tracking, weekly charts |
| 6 | **Incident Management** | Report incidents, priority tracking |
| 7 | **Observations** | Guard field observations system |
| 8 | **CCTV Monitoring** | Live feed simulation, alert timeline |
| 9 | **QR Verification** | Generate & verify guard QR codes |
| 10 | **Reports** | Export reports in PDF/Excel/CSV |

---

## 🚂 Railway Deployment

### Backend (Server)
1. Create a new Railway project
2. Add a service from GitHub repo
3. Set root directory to `server/`
4. Add environment variables:
   ```
   DATABASE_URL=<neon_postgres_url>
   PORT=5000
   NODE_ENV=production
   CORS_ORIGIN=<your_frontend_url>
   ```
5. Railway auto-detects Node.js and runs `npm start`

### Frontend (Client)
1. Add another service in Railway from same repo
2. Set root directory to `client/`
3. Add environment variable:
   ```
   VITE_API_URL=<your_backend_railway_url>/api
   ```
4. Build command: `npm run build`
5. Start command: `npx serve dist`

### Database (Neon PostgreSQL)
1. Create account at neon.tech
2. Create a new project → copy connection string
3. Run schema.sql and seed.sql via Neon SQL console
4. Use connection string in Railway backend env vars

---

## 🔧 GitHub Setup

```bash
# Initialize repository
git init
git add .
git commit -m "feat: initial SYOS Secure Society MVP"

# Create repo on GitHub, then:
git remote add origin https://github.com/your-org/syos-secure-society.git
git branch -M main
git push -u origin main
```

---

## 🎨 Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend Framework | React 18 + TypeScript |
| Styling | TailwindCSS v4 |
| Charts | Recharts |
| Icons | Lucide React |
| Routing | React Router v6 |
| Backend | Node.js + Express |
| Database | Neon PostgreSQL (pg driver) |
| QR Codes | qrcode.react |
| Hosting | Railway |
| Auth (future) | Firebase Authentication |

---

## 👥 Demo Roles

Use the role switcher in the top bar to experience each perspective:

| Role | Access Level |
|------|-------------|
| **Super Admin** | Full system access, multi-society |
| **Society Admin** | Full society management |
| **Guard** | Visitor entry, observations, attendance |
| **Resident** | Visitor approvals only |

---

## 🔮 Roadmap (Future Phases)

- [ ] WhatsApp Business API integration (visitor notifications)
- [ ] AI CCTV monitoring (real camera feeds + ML alerts)
- [ ] Face recognition at entry gate
- [ ] Mobile apps (React Native)
- [ ] Payment gateway (maintenance dues)
- [ ] Firebase Authentication (full auth flows)
- [ ] Multi-society management console
- [ ] Predictive security analytics

---

## 🏢 Demo Society

**Army Welfare Group Housing Society**  
Sector 27, Panchkula, Haryana 134112

| Metric | Value |
|--------|-------|
| Guards | 14 |
| Flats | 120 |
| Residents | 350 |
| CCTV Cameras | 12 |

---

## 📞 Contact

**SYOS Enterprises**  
📧 info@syos.in  
📞 +91 98765 43200  
📍 Chandigarh, India

---

*© 2025 SYOS Enterprises. Security Beyond Manpower.*
