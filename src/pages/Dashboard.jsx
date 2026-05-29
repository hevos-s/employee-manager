import { getLocalData } from '../utils/storage';

const stats = [
  { label: 'Tổng nhân viên', value: '24', colorClass: 'text-primary' },
  { label: 'Phòng ban', value: '5', colorClass: 'text-success' },
  { label: 'Đang nghỉ phép', value: '3', colorClass: 'text-warning' },
  { label: 'Chấm công hôm nay', value: '21', colorClass: 'text-purple' },
];

const recentActivity = [
  'Nguyễn Văn A đã gửi đơn xin nghỉ phép.',
  'Phòng Kỹ thuật cập nhật danh sách nhân viên.',
  'Chấm công ngày 22/05 đã được ghi nhận.',
  'Trần Thị B được thêm vào phòng Marketing.',
];

function Dashboard() {
  const currentUser = getLocalData('currentUser');
  const name = currentUser ? currentUser.name || currentUser.username : 'bạn';

  return (
    <div>
      <h4 className="mb-1">Dashboard</h4>
      <p className="text-muted mb-4" style={{ fontSize: '14px' }}>
        Xin chào, <strong>{name}</strong>! Đây là tổng quan hệ thống.
      </p>

      {/* Thẻ thống kê */}
      <div className="row g-3 mb-4">
        {stats.map((stat) => (
          <div key={stat.label} className="col-sm-6 col-md-3">
            <div className="card h-100">
              <div className="card-body">
                <p className="text-muted mb-1" style={{ fontSize: '13px' }}>{stat.label}</p>
                <p className={`fw-bold mb-0 fs-3 ${stat.colorClass}`}>{stat.value}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Hoạt động gần đây */}
      <div className="card">
        <div className="card-header bg-white fw-semibold">Hoạt động gần đây</div>
        <ul className="list-group list-group-flush">
          {recentActivity.map((item, i) => (
            <li key={i} className="list-group-item" style={{ fontSize: '14px' }}>
              {item}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Dashboard;
