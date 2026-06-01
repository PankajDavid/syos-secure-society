-- SYOS Secure Society - Demo Seed Data

-- Society
INSERT INTO societies (id, name, address, city, state, pincode, total_flats) VALUES
('a1b2c3d4-0000-0000-0000-000000000001', 'Army Welfare Group Housing Society', 'Sector 27', 'Panchkula', 'Haryana', '134112', 120)
ON CONFLICT DO NOTHING;

-- Guards
INSERT INTO guards (id, society_id, name, employee_id, phone, shift, status, location, verification_status, emergency_contact, join_date) VALUES
('g0000001-0000-0000-0000-000000000001', 'a1b2c3d4-0000-0000-0000-000000000001', 'Ramesh Kumar', 'SYOS-G001', '9876543201', 'morning', 'active', 'Main Gate', 'verified', '9876543301', '2024-01-15'),
('g0000001-0000-0000-0000-000000000002', 'a1b2c3d4-0000-0000-0000-000000000001', 'Suresh Singh', 'SYOS-G002', '9876543202', 'evening', 'active', 'Parking', 'verified', '9876543302', '2024-02-10'),
('g0000001-0000-0000-0000-000000000003', 'a1b2c3d4-0000-0000-0000-000000000001', 'Mahesh Yadav', 'SYOS-G003', '9876543203', 'night', 'active', 'Boundary Wall', 'verified', '9876543303', '2024-01-20'),
('g0000001-0000-0000-0000-000000000004', 'a1b2c3d4-0000-0000-0000-000000000001', 'Dinesh Sharma', 'SYOS-G004', '9876543204', 'morning', 'active', 'Club House', 'verified', '9876543304', '2024-03-05'),
('g0000001-0000-0000-0000-000000000005', 'a1b2c3d4-0000-0000-0000-000000000001', 'Rajesh Verma', 'SYOS-G005', '9876543205', 'evening', 'active', 'Back Gate', 'verified', '9876543305', '2024-02-28'),
('g0000001-0000-0000-0000-000000000006', 'a1b2c3d4-0000-0000-0000-000000000001', 'Ajay Chauhan', 'SYOS-G006', '9876543206', 'night', 'on_leave', 'Main Gate', 'verified', '9876543306', '2024-04-01'),
('g0000001-0000-0000-0000-000000000007', 'a1b2c3d4-0000-0000-0000-000000000001', 'Vijay Thakur', 'SYOS-G007', '9876543207', 'morning', 'active', 'Parking', 'verified', '9876543307', '2024-03-15'),
('g0000001-0000-0000-0000-000000000008', 'a1b2c3d4-0000-0000-0000-000000000001', 'Mohan Lal', 'SYOS-G008', '9876543208', 'evening', 'active', 'Main Gate', 'verified', '9876543308', '2024-04-10')
ON CONFLICT DO NOTHING;

-- Visitors (recent)
INSERT INTO visitors (society_id, visitor_name, mobile, vehicle_number, flat_number, purpose, entry_time, status) VALUES
('a1b2c3d4-0000-0000-0000-000000000001', 'Amit Patel', '9811223344', 'HR26AB1234', 'B-204', 'Personal Visit', NOW() - INTERVAL '30 minutes', 'approved'),
('a1b2c3d4-0000-0000-0000-000000000001', 'Priya Nair', '9811223345', NULL, 'A-101', 'Delivery', NOW() - INTERVAL '1 hour', 'approved'),
('a1b2c3d4-0000-0000-0000-000000000001', 'Rakesh Mehra', '9811223346', 'HR26CD5678', 'C-305', 'Business', NOW() - INTERVAL '2 hours', 'pending'),
('a1b2c3d4-0000-0000-0000-000000000001', 'Sunita Gupta', '9811223347', NULL, 'D-410', 'Domestic Help', NOW() - INTERVAL '3 hours', 'approved'),
('a1b2c3d4-0000-0000-0000-000000000001', 'Vikas Arora', '9811223348', 'HR26EF9012', 'B-102', 'Courier', NOW() - INTERVAL '4 hours', 'rejected'),
('a1b2c3d4-0000-0000-0000-000000000001', 'Neha Joshi', '9811223349', NULL, 'A-203', 'Personal Visit', NOW() - INTERVAL '5 hours', 'approved'),
('a1b2c3d4-0000-0000-0000-000000000001', 'Sunil Kumar', '9811223350', 'HR26GH3456', 'C-108', 'Maintenance', NOW() - INTERVAL '6 hours', 'approved'),
('a1b2c3d4-0000-0000-0000-000000000001', 'Kavita Singh', '9811223351', NULL, 'D-201', 'Personal Visit', NOW() - INTERVAL '7 hours', 'approved'),
('a1b2c3d4-0000-0000-0000-000000000001', 'Deepak Sharma', '9811223352', 'HR26IJ7890', 'A-405', 'Service', NOW() - INTERVAL '8 hours', 'pending'),
('a1b2c3d4-0000-0000-0000-000000000001', 'Rani Agarwal', '9811223353', NULL, 'B-303', 'Delivery', NOW() - INTERVAL '9 hours', 'approved')
ON CONFLICT DO NOTHING;

-- Incidents
INSERT INTO incidents (society_id, title, description, category, priority, status, location, created_at) VALUES
('a1b2c3d4-0000-0000-0000-000000000001', 'Unauthorized Vehicle Parked', 'Unknown vehicle with no parking sticker parked in Block C reserved area', 'Unauthorized Access', 'high', 'open', 'Block C Parking', NOW() - INTERVAL '2 hours'),
('a1b2c3d4-0000-0000-0000-000000000001', 'Street Light Failure - Block A', 'Two street lights near Block A entrance not working since last night', 'Street Light Failure', 'medium', 'in_progress', 'Block A Entrance', NOW() - INTERVAL '5 hours'),
('a1b2c3d4-0000-0000-0000-000000000001', 'Suspicious Person Near Boundary', 'Unknown individual seen loitering near boundary wall sector 4', 'Suspicious Vehicle', 'critical', 'open', 'Boundary Wall - Sector 4', NOW() - INTERVAL '1 hour'),
('a1b2c3d4-0000-0000-0000-000000000001', 'Water Leakage in Parking', 'Water pipe leaking near parking lot B, water accumulating on floor', 'Water Leakage', 'medium', 'resolved', 'Parking Lot B', NOW() - INTERVAL '1 day'),
('a1b2c3d4-0000-0000-0000-000000000001', 'Broken Gate Lock', 'Side gate lock broken, gate can be opened from outside', 'Broken Boundary', 'high', 'in_progress', 'Side Gate - North', NOW() - INTERVAL '3 hours')
ON CONFLICT DO NOTHING;

-- Observations
INSERT INTO observations (society_id, guard_id, category, description, location, priority, status, created_at) VALUES
('a1b2c3d4-0000-0000-0000-000000000001', 'g0000001-0000-0000-0000-000000000001', 'Street Light Not Working', 'Street light pole #12 near main gate has been flickering for 2 days', 'Main Gate Area', 'medium', 'open', NOW() - INTERVAL '3 hours'),
('a1b2c3d4-0000-0000-0000-000000000001', 'g0000001-0000-0000-0000-000000000002', 'Water Leakage', 'Overhead water tank showing signs of leakage, water dripping on walkway below', 'Block D Terrace', 'high', 'acknowledged', NOW() - INTERVAL '1 day'),
('a1b2c3d4-0000-0000-0000-000000000001', 'g0000001-0000-0000-0000-000000000003', 'Damaged Road', 'Large pothole near Block B entrance, risk for two-wheelers', 'Block B Entrance', 'medium', 'open', NOW() - INTERVAL '2 days'),
('a1b2c3d4-0000-0000-0000-000000000001', 'g0000001-0000-0000-0000-000000000007', 'Electrical Hazard', 'Exposed wire near parking area electrical panel, immediate attention needed', 'Parking Area - Panel Room', 'critical', 'open', NOW() - INTERVAL '30 minutes'),
('a1b2c3d4-0000-0000-0000-000000000001', 'g0000001-0000-0000-0000-000000000004', 'Tree Hazard', 'Large branch of tree near clubhouse appears to be dead and could fall', 'Club House Entrance', 'high', 'acknowledged', NOW() - INTERVAL '4 hours'),
('a1b2c3d4-0000-0000-0000-000000000001', 'g0000001-0000-0000-0000-000000000001', 'Broken Tile', 'Multiple broken tiles on walkway near Block A creating trip hazard', 'Block A Walkway', 'low', 'resolved', NOW() - INTERVAL '3 days')
ON CONFLICT DO NOTHING;

-- Camera Alerts
INSERT INTO camera_alerts (society_id, camera_id, camera_name, alert_type, description, timestamp, is_acknowledged) VALUES
('a1b2c3d4-0000-0000-0000-000000000001', 'CAM-001', 'Main Gate Camera', 'Movement Detected', 'Movement detected at main gate during low traffic hours', NOW() - INTERVAL '15 minutes', FALSE),
('a1b2c3d4-0000-0000-0000-000000000001', 'CAM-002', 'Parking Camera', 'Unknown Vehicle', 'Vehicle without society sticker detected in premium parking zone', NOW() - INTERVAL '45 minutes', FALSE),
('a1b2c3d4-0000-0000-0000-000000000001', 'CAM-003', 'Boundary Wall Camera', 'After Hours Activity', 'Activity detected near boundary wall after 11 PM', NOW() - INTERVAL '2 hours', TRUE),
('a1b2c3d4-0000-0000-0000-000000000001', 'CAM-004', 'Club House Camera', 'Movement Detected', 'Movement detected in club house area during closed hours', NOW() - INTERVAL '6 hours', TRUE)
ON CONFLICT DO NOTHING;

-- Attendance (last 7 days)
INSERT INTO attendance (guard_id, society_id, check_in, check_out, shift, status, date) VALUES
('g0000001-0000-0000-0000-000000000001', 'a1b2c3d4-0000-0000-0000-000000000001', NOW() - INTERVAL '8 hours', NULL, 'morning', 'present', CURRENT_DATE),
('g0000001-0000-0000-0000-000000000002', 'a1b2c3d4-0000-0000-0000-000000000001', NOW() - INTERVAL '2 hours', NULL, 'evening', 'present', CURRENT_DATE),
('g0000001-0000-0000-0000-000000000003', 'a1b2c3d4-0000-0000-0000-000000000001', NOW() - INTERVAL '20 hours', NOW() - INTERVAL '12 hours', 'night', 'present', CURRENT_DATE - 1),
('g0000001-0000-0000-0000-000000000004', 'a1b2c3d4-0000-0000-0000-000000000001', NOW() - INTERVAL '9 hours', NULL, 'morning', 'late', CURRENT_DATE),
('g0000001-0000-0000-0000-000000000005', 'a1b2c3d4-0000-0000-0000-000000000001', NOW() - INTERVAL '3 hours', NULL, 'evening', 'present', CURRENT_DATE),
('g0000001-0000-0000-0000-000000000007', 'a1b2c3d4-0000-0000-0000-000000000001', NOW() - INTERVAL '7 hours', NULL, 'morning', 'present', CURRENT_DATE),
('g0000001-0000-0000-0000-000000000008', 'a1b2c3d4-0000-0000-0000-000000000001', NOW() - INTERVAL '1 hour', NULL, 'evening', 'present', CURRENT_DATE)
ON CONFLICT DO NOTHING;
