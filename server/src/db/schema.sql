-- SYOS Secure Society Database Schema

-- Societies
CREATE TABLE IF NOT EXISTS societies (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  address TEXT,
  city VARCHAR(100),
  state VARCHAR(100),
  pincode VARCHAR(10),
  total_flats INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Users (all roles)
CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  society_id UUID REFERENCES societies(id),
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  phone VARCHAR(15),
  role VARCHAR(50) NOT NULL CHECK (role IN ('super_admin','society_admin','guard','resident')),
  flat_number VARCHAR(20),
  photo_url TEXT,
  is_active BOOLEAN DEFAULT TRUE,
  firebase_uid VARCHAR(255),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Guards
CREATE TABLE IF NOT EXISTS guards (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  society_id UUID REFERENCES societies(id),
  user_id UUID REFERENCES users(id),
  name VARCHAR(255) NOT NULL,
  employee_id VARCHAR(50) UNIQUE NOT NULL,
  phone VARCHAR(15) NOT NULL,
  photo_url TEXT,
  shift VARCHAR(20) CHECK (shift IN ('morning','evening','night')),
  status VARCHAR(20) DEFAULT 'active' CHECK (status IN ('active','inactive','on_leave')),
  location VARCHAR(100),
  verification_status VARCHAR(20) DEFAULT 'verified' CHECK (verification_status IN ('verified','pending','rejected')),
  address TEXT,
  emergency_contact VARCHAR(15),
  join_date DATE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Flats
CREATE TABLE IF NOT EXISTS flats (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  society_id UUID REFERENCES societies(id),
  flat_number VARCHAR(20) NOT NULL,
  floor INTEGER,
  resident_name VARCHAR(255),
  resident_phone VARCHAR(15),
  resident_email VARCHAR(255),
  occupancy_status VARCHAR(20) DEFAULT 'occupied' CHECK (occupancy_status IN ('occupied','vacant')),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Visitors
CREATE TABLE IF NOT EXISTS visitors (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  society_id UUID REFERENCES societies(id),
  visitor_name VARCHAR(255) NOT NULL,
  mobile VARCHAR(15) NOT NULL,
  vehicle_number VARCHAR(20),
  flat_number VARCHAR(20) NOT NULL,
  purpose VARCHAR(100) NOT NULL,
  photo_url TEXT,
  entry_time TIMESTAMPTZ DEFAULT NOW(),
  exit_time TIMESTAMPTZ,
  status VARCHAR(20) DEFAULT 'pending' CHECK (status IN ('pending','approved','rejected')),
  approved_by UUID REFERENCES users(id),
  guard_id UUID REFERENCES guards(id),
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Attendance
CREATE TABLE IF NOT EXISTS attendance (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  guard_id UUID REFERENCES guards(id),
  society_id UUID REFERENCES societies(id),
  check_in TIMESTAMPTZ,
  check_out TIMESTAMPTZ,
  shift VARCHAR(20),
  status VARCHAR(20) DEFAULT 'present' CHECK (status IN ('present','absent','late','half_day')),
  notes TEXT,
  date DATE DEFAULT CURRENT_DATE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Incidents
CREATE TABLE IF NOT EXISTS incidents (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  society_id UUID REFERENCES societies(id),
  title VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  category VARCHAR(100) NOT NULL,
  priority VARCHAR(20) DEFAULT 'medium' CHECK (priority IN ('low','medium','high','critical')),
  status VARCHAR(20) DEFAULT 'open' CHECK (status IN ('open','in_progress','resolved','closed')),
  reported_by UUID REFERENCES users(id),
  assigned_to UUID REFERENCES guards(id),
  photo_url TEXT,
  location VARCHAR(255),
  resolved_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Observations
CREATE TABLE IF NOT EXISTS observations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  society_id UUID REFERENCES societies(id),
  guard_id UUID REFERENCES guards(id),
  category VARCHAR(100) NOT NULL,
  description TEXT NOT NULL,
  location VARCHAR(255),
  photo_url TEXT,
  priority VARCHAR(20) DEFAULT 'medium' CHECK (priority IN ('low','medium','high','critical')),
  status VARCHAR(20) DEFAULT 'open' CHECK (status IN ('open','acknowledged','resolved')),
  resolved_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Camera Alerts
CREATE TABLE IF NOT EXISTS camera_alerts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  society_id UUID REFERENCES societies(id),
  camera_id VARCHAR(50) NOT NULL,
  camera_name VARCHAR(100) NOT NULL,
  alert_type VARCHAR(100) NOT NULL,
  description TEXT,
  timestamp TIMESTAMPTZ DEFAULT NOW(),
  is_acknowledged BOOLEAN DEFAULT FALSE,
  acknowledged_by UUID REFERENCES users(id),
  snapshot_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Audit Logs
CREATE TABLE IF NOT EXISTS audit_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  society_id UUID REFERENCES societies(id),
  user_id UUID REFERENCES users(id),
  action VARCHAR(255) NOT NULL,
  entity_type VARCHAR(100),
  entity_id UUID,
  details JSONB,
  ip_address VARCHAR(45),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_visitors_society ON visitors(society_id);
CREATE INDEX IF NOT EXISTS idx_visitors_status ON visitors(status);
CREATE INDEX IF NOT EXISTS idx_visitors_entry_time ON visitors(entry_time);
CREATE INDEX IF NOT EXISTS idx_guards_society ON guards(society_id);
CREATE INDEX IF NOT EXISTS idx_attendance_guard ON attendance(guard_id);
CREATE INDEX IF NOT EXISTS idx_attendance_date ON attendance(date);
CREATE INDEX IF NOT EXISTS idx_incidents_society ON incidents(society_id);
CREATE INDEX IF NOT EXISTS idx_incidents_status ON incidents(status);
CREATE INDEX IF NOT EXISTS idx_observations_society ON observations(society_id);
CREATE INDEX IF NOT EXISTS idx_camera_alerts_society ON camera_alerts(society_id);
