-- Pre-Approved Visitor Passes

CREATE TABLE IF NOT EXISTS visitor_passes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  society_id UUID REFERENCES societies(id),
  code VARCHAR(6) UNIQUE NOT NULL,
  host_user_id UUID REFERENCES users(id),
  flat_number VARCHAR(20) NOT NULL,
  block VARCHAR(10),
  resident_name VARCHAR(255) NOT NULL,
  resident_phone VARCHAR(15),
  visitor_name VARCHAR(255) NOT NULL,
  visitor_mobile VARCHAR(15) NOT NULL,
  purpose VARCHAR(100) NOT NULL,
  valid_from TIMESTAMPTZ NOT NULL,
  valid_until TIMESTAMPTZ NOT NULL,
  status VARCHAR(20) DEFAULT 'active'
    CHECK (status IN ('active','used','expired','cancelled')),
  used_at TIMESTAMPTZ,
  used_by_guard_id UUID REFERENCES guards(id),
  visitor_photo_url TEXT,
  vehicle_number VARCHAR(20),
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_passes_code       ON visitor_passes(code);
CREATE INDEX IF NOT EXISTS idx_passes_society    ON visitor_passes(society_id);
CREATE INDEX IF NOT EXISTS idx_passes_status     ON visitor_passes(status);
CREATE INDEX IF NOT EXISTS idx_passes_flat       ON visitor_passes(flat_number);
CREATE INDEX IF NOT EXISTS idx_passes_valid_until ON visitor_passes(valid_until);
