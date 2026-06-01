-- Demo pre-approved visitor passes

INSERT INTO visitor_passes (
  society_id, code, flat_number, block, resident_name, resident_phone,
  visitor_name, visitor_mobile, purpose, valid_from, valid_until, status, used_at, created_at
) VALUES
(
  'a1b2c3d4-0000-0000-0000-000000000001',
  'APX471', 'B-204', 'B', 'Col. Rajiv Sharma', '9810001001',
  'Amit Patel', '9811223344', 'Personal Visit',
  NOW() - INTERVAL '2 hours', NOW() + INTERVAL '4 hours',
  'active', NULL, NOW() - INTERVAL '2 hours'
),
(
  'a1b2c3d4-0000-0000-0000-000000000001',
  'QRT892', 'A-101', 'A', 'Mrs. Sunita Verma', '9810001002',
  'Rajesh Delivery', '9811223345', 'Courier / Delivery',
  NOW() - INTERVAL '1 hour', NOW() + INTERVAL '3 hours',
  'used', NOW() - INTERVAL '30 minutes', NOW() - INTERVAL '1 hour'
),
(
  'a1b2c3d4-0000-0000-0000-000000000001',
  'MNB556', 'C-305', 'C', 'Brig. Anil Kumar', '9810001003',
  'Priya Mehta', '9811223346', 'Domestic Help',
  NOW() - INTERVAL '6 hours', NOW() - INTERVAL '1 hour',
  'expired', NULL, NOW() - INTERVAL '6 hours'
),
(
  'a1b2c3d4-0000-0000-0000-000000000001',
  'ZXK234', 'D-410', 'D', 'Maj. Deepak Singh', '9810001004',
  'Ramesh Plumber', '9811223347', 'Maintenance',
  NOW() + INTERVAL '1 hour', NOW() + INTERVAL '5 hours',
  'active', NULL, NOW() - INTERVAL '30 minutes'
),
(
  'a1b2c3d4-0000-0000-0000-000000000001',
  'LPQ781', 'B-102', 'B', 'Lt. Col. Vinod Nair', '9810001005',
  'Sanjay Guest', '9811223348', 'Personal Visit',
  NOW() - INTERVAL '3 hours', NOW() + INTERVAL '1 hour',
  'cancelled', NULL, NOW() - INTERVAL '3 hours'
),
(
  'a1b2c3d4-0000-0000-0000-000000000001',
  'GTW945', 'A-203', 'A', 'Mrs. Kavitha Rajan', '9810001006',
  'Dr. Suresh Nair', '9811223349', 'Medical / Doctor Visit',
  NOW(), NOW() + INTERVAL '2 hours',
  'active', NULL, NOW()
)
ON CONFLICT (code) DO NOTHING;
