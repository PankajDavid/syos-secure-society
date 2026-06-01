// Demo data used when API is not connected

export type PassStatus = 'active' | 'used' | 'expired' | 'cancelled';

export interface VisitorPass {
  id: string;
  code: string;
  flat_number: string;
  block: string;
  resident_name: string;
  resident_phone: string;
  visitor_name: string;
  visitor_mobile: string;
  purpose: string;
  valid_from: string;
  valid_until: string;
  status: PassStatus;
  used_at: string | null;
  vehicle_number?: string | null;
  created_at: string;
}

export const DEMO_PASSES: VisitorPass[] = [
  {
    id: 'p1', code: 'APX471',
    flat_number: 'B-204', block: 'B',
    resident_name: 'Col. Rajiv Sharma', resident_phone: '9810001001',
    visitor_name: 'Amit Patel', visitor_mobile: '9811223344',
    purpose: 'Personal Visit',
    valid_from: new Date(Date.now() - 2 * 3600000).toISOString(),
    valid_until: new Date(Date.now() + 4 * 3600000).toISOString(),
    status: 'active', used_at: null, vehicle_number: null,
    created_at: new Date(Date.now() - 2 * 3600000).toISOString(),
  },
  {
    id: 'p2', code: 'QRT892',
    flat_number: 'A-101', block: 'A',
    resident_name: 'Mrs. Sunita Verma', resident_phone: '9810001002',
    visitor_name: 'Rajesh Delivery', visitor_mobile: '9811223345',
    purpose: 'Courier / Delivery',
    valid_from: new Date(Date.now() - 3600000).toISOString(),
    valid_until: new Date(Date.now() + 3 * 3600000).toISOString(),
    status: 'used', used_at: new Date(Date.now() - 30 * 60000).toISOString(),
    vehicle_number: 'HR26AB4567',
    created_at: new Date(Date.now() - 3600000).toISOString(),
  },
  {
    id: 'p3', code: 'MNB556',
    flat_number: 'C-305', block: 'C',
    resident_name: 'Brig. Anil Kumar', resident_phone: '9810001003',
    visitor_name: 'Priya Mehta', visitor_mobile: '9811223346',
    purpose: 'Domestic Help',
    valid_from: new Date(Date.now() - 6 * 3600000).toISOString(),
    valid_until: new Date(Date.now() - 3600000).toISOString(),
    status: 'expired', used_at: null, vehicle_number: null,
    created_at: new Date(Date.now() - 6 * 3600000).toISOString(),
  },
  {
    id: 'p4', code: 'ZXK234',
    flat_number: 'D-410', block: 'D',
    resident_name: 'Maj. Deepak Singh', resident_phone: '9810001004',
    visitor_name: 'Ramesh Plumber', visitor_mobile: '9811223347',
    purpose: 'Maintenance',
    valid_from: new Date(Date.now() + 3600000).toISOString(),
    valid_until: new Date(Date.now() + 5 * 3600000).toISOString(),
    status: 'active', used_at: null, vehicle_number: null,
    created_at: new Date(Date.now() - 30 * 60000).toISOString(),
  },
  {
    id: 'p5', code: 'LPQ781',
    flat_number: 'B-102', block: 'B',
    resident_name: 'Lt. Col. Vinod Nair', resident_phone: '9810001005',
    visitor_name: 'Sanjay Guest', visitor_mobile: '9811223348',
    purpose: 'Personal Visit',
    valid_from: new Date(Date.now() - 3 * 3600000).toISOString(),
    valid_until: new Date(Date.now() + 3600000).toISOString(),
    status: 'cancelled', used_at: null, vehicle_number: null,
    created_at: new Date(Date.now() - 3 * 3600000).toISOString(),
  },
  {
    id: 'p6', code: 'GTW945',
    flat_number: 'A-203', block: 'A',
    resident_name: 'Mrs. Kavitha Rajan', resident_phone: '9810001006',
    visitor_name: 'Dr. Suresh Nair', visitor_mobile: '9811223349',
    purpose: 'Medical / Doctor Visit',
    valid_from: new Date(Date.now() - 10 * 60000).toISOString(),
    valid_until: new Date(Date.now() + 2 * 3600000).toISOString(),
    status: 'active', used_at: null, vehicle_number: null,
    created_at: new Date(Date.now() - 10 * 60000).toISOString(),
  },
];

export const SOCIETY = {
  name: 'Army Welfare Group Housing Society',
  location: 'Sector 27, Panchkula, Haryana',
  totalFlats: 120,
  totalResidents: 350,
  totalGuards: 14,
};

export const DEMO_GUARDS = [
  { id: 'g1', name: 'Ramesh Kumar', employee_id: 'SYOS-G001', phone: '9876543201', shift: 'morning', status: 'active', location: 'Main Gate', verification_status: 'verified', emergency_contact: '9876543301', join_date: '2024-01-15' },
  { id: 'g2', name: 'Suresh Singh', employee_id: 'SYOS-G002', phone: '9876543202', shift: 'evening', status: 'active', location: 'Parking', verification_status: 'verified', emergency_contact: '9876543302', join_date: '2024-02-10' },
  { id: 'g3', name: 'Mahesh Yadav', employee_id: 'SYOS-G003', phone: '9876543203', shift: 'night', status: 'active', location: 'Boundary Wall', verification_status: 'verified', emergency_contact: '9876543303', join_date: '2024-01-20' },
  { id: 'g4', name: 'Dinesh Sharma', employee_id: 'SYOS-G004', phone: '9876543204', shift: 'morning', status: 'active', location: 'Club House', verification_status: 'verified', emergency_contact: '9876543304', join_date: '2024-03-05' },
  { id: 'g5', name: 'Rajesh Verma', employee_id: 'SYOS-G005', phone: '9876543205', shift: 'evening', status: 'active', location: 'Back Gate', verification_status: 'verified', emergency_contact: '9876543305', join_date: '2024-02-28' },
  { id: 'g6', name: 'Ajay Chauhan', employee_id: 'SYOS-G006', phone: '9876543206', shift: 'night', status: 'on_leave', location: 'Main Gate', verification_status: 'verified', emergency_contact: '9876543306', join_date: '2024-04-01' },
  { id: 'g7', name: 'Vijay Thakur', employee_id: 'SYOS-G007', phone: '9876543207', shift: 'morning', status: 'active', location: 'Parking', verification_status: 'verified', emergency_contact: '9876543307', join_date: '2024-03-15' },
  { id: 'g8', name: 'Mohan Lal', employee_id: 'SYOS-G008', phone: '9876543208', shift: 'evening', status: 'active', location: 'Main Gate', verification_status: 'verified', emergency_contact: '9876543308', join_date: '2024-04-10' },
  { id: 'g9', name: 'Harpreet Kaur', employee_id: 'SYOS-G009', phone: '9876543209', shift: 'morning', status: 'active', location: 'Club House', verification_status: 'verified', emergency_contact: '9876543309', join_date: '2024-05-01' },
  { id: 'g10', name: 'Santosh Mishra', employee_id: 'SYOS-G010', phone: '9876543210', shift: 'night', status: 'active', location: 'Main Gate', verification_status: 'verified', emergency_contact: '9876543310', join_date: '2024-05-15' },
  { id: 'g11', name: 'Ravi Shankar', employee_id: 'SYOS-G011', phone: '9876543211', shift: 'morning', status: 'active', location: 'Boundary Wall', verification_status: 'verified', emergency_contact: '9876543311', join_date: '2024-06-01' },
  { id: 'g12', name: 'Kiran Bedi', employee_id: 'SYOS-G012', phone: '9876543212', shift: 'evening', status: 'active', location: 'Parking', verification_status: 'pending', emergency_contact: '9876543312', join_date: '2024-06-15' },
  { id: 'g13', name: 'Deepak Nair', employee_id: 'SYOS-G013', phone: '9876543213', shift: 'night', status: 'inactive', location: 'Side Gate', verification_status: 'verified', emergency_contact: '9876543313', join_date: '2024-03-20' },
  { id: 'g14', name: 'Anil Tiwari', employee_id: 'SYOS-G014', phone: '9876543214', shift: 'morning', status: 'active', location: 'Main Gate', verification_status: 'verified', emergency_contact: '9876543314', join_date: '2024-07-01' },
];

export const DEMO_VISITORS = [
  { id: 'v1', visitor_name: 'Amit Patel', mobile: '9811223344', vehicle_number: 'HR26AB1234', flat_number: 'B-204', purpose: 'Personal Visit', entry_time: new Date(Date.now() - 30 * 60000).toISOString(), status: 'approved' },
  { id: 'v2', visitor_name: 'Priya Nair', mobile: '9811223345', vehicle_number: null, flat_number: 'A-101', purpose: 'Delivery', entry_time: new Date(Date.now() - 60 * 60000).toISOString(), status: 'approved' },
  { id: 'v3', visitor_name: 'Rakesh Mehra', mobile: '9811223346', vehicle_number: 'HR26CD5678', flat_number: 'C-305', purpose: 'Business', entry_time: new Date(Date.now() - 120 * 60000).toISOString(), status: 'pending' },
  { id: 'v4', visitor_name: 'Sunita Gupta', mobile: '9811223347', vehicle_number: null, flat_number: 'D-410', purpose: 'Domestic Help', entry_time: new Date(Date.now() - 180 * 60000).toISOString(), status: 'approved' },
  { id: 'v5', visitor_name: 'Vikas Arora', mobile: '9811223348', vehicle_number: 'HR26EF9012', flat_number: 'B-102', purpose: 'Courier', entry_time: new Date(Date.now() - 240 * 60000).toISOString(), status: 'rejected' },
  { id: 'v6', visitor_name: 'Neha Joshi', mobile: '9811223349', vehicle_number: null, flat_number: 'A-203', purpose: 'Personal Visit', entry_time: new Date(Date.now() - 300 * 60000).toISOString(), status: 'approved' },
  { id: 'v7', visitor_name: 'Sunil Kumar', mobile: '9811223350', vehicle_number: 'HR26GH3456', flat_number: 'C-108', purpose: 'Maintenance', entry_time: new Date(Date.now() - 360 * 60000).toISOString(), status: 'approved' },
  { id: 'v8', visitor_name: 'Kavita Singh', mobile: '9811223351', vehicle_number: null, flat_number: 'D-201', purpose: 'Personal Visit', entry_time: new Date(Date.now() - 420 * 60000).toISOString(), status: 'pending' },
  { id: 'v9', visitor_name: 'Deepak Sharma', mobile: '9811223352', vehicle_number: 'HR26IJ7890', flat_number: 'A-405', purpose: 'Service', entry_time: new Date(Date.now() - 480 * 60000).toISOString(), status: 'pending' },
  { id: 'v10', visitor_name: 'Rani Agarwal', mobile: '9811223353', vehicle_number: null, flat_number: 'B-303', purpose: 'Delivery', entry_time: new Date(Date.now() - 540 * 60000).toISOString(), status: 'approved' },
];

export const DEMO_INCIDENTS = [
  { id: 'i1', title: 'Unauthorized Vehicle Parked', description: 'Unknown vehicle with no parking sticker parked in Block C reserved area', category: 'Unauthorized Access', priority: 'high', status: 'open', location: 'Block C Parking', created_at: new Date(Date.now() - 2 * 3600000).toISOString() },
  { id: 'i2', title: 'Street Light Failure - Block A', description: 'Two street lights near Block A entrance not working since last night', category: 'Street Light Failure', priority: 'medium', status: 'in_progress', location: 'Block A Entrance', created_at: new Date(Date.now() - 5 * 3600000).toISOString() },
  { id: 'i3', title: 'Suspicious Person Near Boundary', description: 'Unknown individual seen loitering near boundary wall sector 4', category: 'Suspicious Activity', priority: 'critical', status: 'open', location: 'Boundary Wall - Sector 4', created_at: new Date(Date.now() - 1 * 3600000).toISOString() },
  { id: 'i4', title: 'Water Leakage in Parking', description: 'Water pipe leaking near parking lot B, water accumulating on floor', category: 'Water Leakage', priority: 'medium', status: 'resolved', location: 'Parking Lot B', created_at: new Date(Date.now() - 24 * 3600000).toISOString() },
  { id: 'i5', title: 'Broken Gate Lock', description: 'Side gate lock broken, gate can be opened from outside', category: 'Broken Boundary', priority: 'high', status: 'in_progress', location: 'Side Gate - North', created_at: new Date(Date.now() - 3 * 3600000).toISOString() },
];

export const DEMO_OBSERVATIONS = [
  { id: 'o1', guard_name: 'Ramesh Kumar', category: 'Street Light Not Working', description: 'Street light pole #12 near main gate has been flickering for 2 days', location: 'Main Gate Area', priority: 'medium', status: 'open', created_at: new Date(Date.now() - 3 * 3600000).toISOString() },
  { id: 'o2', guard_name: 'Suresh Singh', category: 'Water Leakage', description: 'Overhead water tank showing signs of leakage, water dripping on walkway below', location: 'Block D Terrace', priority: 'high', status: 'acknowledged', created_at: new Date(Date.now() - 24 * 3600000).toISOString() },
  { id: 'o3', guard_name: 'Mahesh Yadav', category: 'Damaged Road', description: 'Large pothole near Block B entrance, risk for two-wheelers', location: 'Block B Entrance', priority: 'medium', status: 'open', created_at: new Date(Date.now() - 48 * 3600000).toISOString() },
  { id: 'o4', guard_name: 'Vijay Thakur', category: 'Electrical Hazard', description: 'Exposed wire near parking area electrical panel, immediate attention needed', location: 'Parking Area - Panel Room', priority: 'critical', status: 'open', created_at: new Date(Date.now() - 30 * 60000).toISOString() },
  { id: 'o5', guard_name: 'Dinesh Sharma', category: 'Tree Hazard', description: 'Large branch of tree near clubhouse appears to be dead and could fall', location: 'Club House Entrance', priority: 'high', status: 'acknowledged', created_at: new Date(Date.now() - 4 * 3600000).toISOString() },
  { id: 'o6', guard_name: 'Ramesh Kumar', category: 'Broken Tile', description: 'Multiple broken tiles on walkway near Block A creating trip hazard', location: 'Block A Walkway', priority: 'low', status: 'resolved', created_at: new Date(Date.now() - 72 * 3600000).toISOString() },
];

export const DEMO_CAMERA_ALERTS = [
  { id: 'ca1', camera_id: 'CAM-001', camera_name: 'Main Gate Camera', alert_type: 'Movement Detected', description: 'Movement detected at main gate during low traffic hours', timestamp: new Date(Date.now() - 15 * 60000).toISOString(), is_acknowledged: false },
  { id: 'ca2', camera_id: 'CAM-002', camera_name: 'Parking Camera', alert_type: 'Unknown Vehicle', description: 'Vehicle without society sticker detected in premium parking zone', timestamp: new Date(Date.now() - 45 * 60000).toISOString(), is_acknowledged: false },
  { id: 'ca3', camera_id: 'CAM-003', camera_name: 'Boundary Wall Camera', alert_type: 'After Hours Activity', description: 'Activity detected near boundary wall after 11 PM', timestamp: new Date(Date.now() - 2 * 3600000).toISOString(), is_acknowledged: true },
  { id: 'ca4', camera_id: 'CAM-004', camera_name: 'Club House Camera', alert_type: 'Movement Detected', description: 'Movement detected in club house area during closed hours', timestamp: new Date(Date.now() - 6 * 3600000).toISOString(), is_acknowledged: true },
];

export const VISITOR_CHART_DATA = [
  { day: 'Mon', visitors: 98 },
  { day: 'Tue', visitors: 112 },
  { day: 'Wed', visitors: 89 },
  { day: 'Thu', visitors: 134 },
  { day: 'Fri', visitors: 121 },
  { day: 'Sat', visitors: 145 },
  { day: 'Sun', visitors: 127 },
];

export const INCIDENT_CHART_DATA = [
  { month: 'Jan', incidents: 8, resolved: 7 },
  { month: 'Feb', incidents: 6, resolved: 6 },
  { month: 'Mar', incidents: 11, resolved: 9 },
  { month: 'Apr', incidents: 5, resolved: 5 },
  { month: 'May', incidents: 9, resolved: 7 },
  { month: 'Jun', incidents: 4, resolved: 2 },
];

export const ATTENDANCE_DATA = [
  { guard: 'Ramesh Kumar', id: 'SYOS-G001', shift: 'Morning', checkIn: '06:02 AM', checkOut: '--', status: 'present' },
  { guard: 'Suresh Singh', id: 'SYOS-G002', shift: 'Evening', checkIn: '02:05 PM', checkOut: '--', status: 'present' },
  { guard: 'Mahesh Yadav', id: 'SYOS-G003', shift: 'Night', checkIn: '10:00 PM', checkOut: '06:00 AM', status: 'present' },
  { guard: 'Dinesh Sharma', id: 'SYOS-G004', shift: 'Morning', checkIn: '06:45 AM', checkOut: '--', status: 'late' },
  { guard: 'Rajesh Verma', id: 'SYOS-G005', shift: 'Evening', checkIn: '02:00 PM', checkOut: '--', status: 'present' },
  { guard: 'Ajay Chauhan', id: 'SYOS-G006', shift: 'Night', checkIn: '--', checkOut: '--', status: 'absent' },
  { guard: 'Vijay Thakur', id: 'SYOS-G007', shift: 'Morning', checkIn: '06:00 AM', checkOut: '--', status: 'present' },
  { guard: 'Mohan Lal', id: 'SYOS-G008', shift: 'Evening', checkIn: '02:03 PM', checkOut: '--', status: 'present' },
];
