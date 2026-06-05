import { useEffect, useState } from 'react';
import { getAttendance } from '../services/attendanceService';
import { getDepartments } from '../services/departmentService';
import { getEmployees } from '../services/employeeService';
import { getLeaveRequests } from '../services/leaveService';
import { getCurrentUser } from '../services/authService';

function Dashboard() {
  const currentUser = getCurrentUser();
  const name = currentUser ? currentUser.name || currentUser.username : 'bạn';
  const [stats, setStats] = useState([]);
  const [recentActivity, setRecentActivity] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function loadDashboard() {
      try {
        setLoading(true);
        setError('');
        const [employees, departments, attendance, leaveRequests] = await Promise.all([
          getEmployees(),
          getDepartments(),
          getAttendance(),
          getLeaveRequests(),
        ]);
        const today = attendance
          .map((item) => item.date)
          .sort()
          .at(-1);
        const leaveCount = leaveRequests.filter((item) => item.status === 'Chờ duyệt').length;
        const attendanceToday = today
          ? attendance.filter((item) => item.date === today).length
          : 0;

        setStats([
          { label: 'Tổng nhân viên', value: employees.length, colorClass: 'text-primary' },
          { label: 'Phòng ban', value: departments.length, colorClass: 'text-success' },
          { label: 'Đơn chờ duyệt', value: leaveCount, colorClass: 'text-warning' },
          { label: 'Chấm công hôm nay', value: attendanceToday, colorClass: 'text-purple' },
        ]);

        setRecentActivity([
          `${leaveRequests[0]?.name || 'Nhân viên'} đã gửi đơn xin nghỉ phép.`,
          `Phòng ${departments[0]?.name || 'ban'} có ${departments[0]?.count || 0} nhân viên.`,
          `Chấm công ngày ${today || '--'} có ${attendanceToday} bản ghi.`,
          `${employees[0]?.name || 'Nhân viên'} đang ở trạng thái ${employees[0]?.status || '--'}.`,
        ]);
      } catch (err) {
        setError('Không thể tải dữ liệu dashboard. Vui lòng kiểm tra json-server.');
      } finally {
        setLoading(false);
      }
    }

    loadDashboard();
  }, []);

  return (
    <div>
      <h4 className="mb-1">Dashboard</h4>
      <p className="text-muted mb-4" style={{ fontSize: '14px' }}>
        Xin chào, <strong>{name}</strong>! Đây là tổng quan hệ thống.
      </p>

      {error && <div className="alert alert-danger py-2">{error}</div>}

      <div className="row g-3 mb-4">
        {loading ? (
          <div className="col-12">
            <div className="card">
              <div className="card-body text-center text-muted">Đang tải dữ liệu...</div>
            </div>
          </div>
        ) : (
          stats.map((stat) => (
            <div key={stat.label} className="col-sm-6 col-md-3">
              <div className="card h-100">
                <div className="card-body">
                  <p className="text-muted mb-1" style={{ fontSize: '13px' }}>{stat.label}</p>
                  <p className={`fw-bold mb-0 fs-3 ${stat.colorClass}`}>{stat.value}</p>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      <div className="card">
        <div className="card-header bg-white fw-semibold">Hoạt động gần đây</div>
        <ul className="list-group list-group-flush">
          {loading ? (
            <li className="list-group-item text-muted" style={{ fontSize: '14px' }}>
              Đang tải hoạt động...
            </li>
          ) : (
            recentActivity.map((item, i) => (
              <li key={i} className="list-group-item" style={{ fontSize: '14px' }}>
                {item}
              </li>
            ))
          )}
        </ul>
      </div>
    </div>
  );
}

export default Dashboard;
