import { useState } from 'react';

const fakeAttendance = [
  // --- Dữ liệu ngày 22/05/2026 ---
  { id: 1, name: 'Phạm Thị Dung', date: '2026-05-22', checkIn: '07:55', checkOut: '17:05', status: 'Đúng giờ' },
  { id: 2, name: 'Nguyễn Văn An', date: '2026-05-22', checkIn: '08:02', checkOut: '17:10', status: 'Đúng giờ' },
  { id: 3, name: 'Lê Văn Cường', date: '2026-05-22', checkIn: '--', checkOut: '--', status: 'Nghỉ phép' },
  { id: 4, name: 'Trần Thị Bình', date: '2026-05-22', checkIn: '08:45', checkOut: '17:00', status: 'Đi muộn' },
  
  // --- Dữ liệu ngày 21/05/2026 ---
  { id: 5, name: 'Phạm Thị Dung', date: '2026-05-21', checkIn: '--', checkOut: '--', status: 'Nghỉ phép' },
  { id: 6, name: 'Nguyễn Văn An', date: '2026-05-21', checkIn: '08:00', checkOut: '17:00', status: 'Đúng giờ' },
  { id: 7, name: 'Lê Văn Cường', date: '2026-05-21', checkIn: '09:10', checkOut: '17:30', status: 'Đi muộn' },
  { id: 8, name: 'Trần Thị Bình', date: '2026-05-21', checkIn: '07:50', checkOut: '17:15', status: 'Đúng giờ' },

  // --- Dữ liệu ngày 20/05/2026 ---
  { id: 9, name: 'Phạm Thị Dung', date: '2026-05-20', checkIn: '08:05', checkOut: '17:02', status: 'Đúng giờ' },
  { id: 10, name: 'Nguyễn Văn An', date: '2026-05-20', checkIn: '08:30', checkOut: '17:00', status: 'Đi muộn' },
  { id: 11, name: 'Lê Văn Cường', date: '2026-05-20', checkIn: '07:45', checkOut: '17:00', status: 'Đúng giờ' },
  { id: 12, name: 'Trần Thị Bình', date: '2026-05-20', checkIn: '--', checkOut: '--', status: 'Nghỉ phép' },
];

function statusBadge(status) {
  if (status === 'Đúng giờ') return <span className="badge bg-success">{status}</span>;
  if (status === 'Đi muộn') return <span className="badge bg-warning text-dark">{status}</span>;
  if (status === 'Nghỉ phép') return <span className="badge bg-secondary">{status}</span>;
  return <span className="badge bg-danger">{status}</span>;
}

function formatDateForDisplay(dateString) {
  if (!dateString) return '';
  const [year, month, day] = dateString.split('-');
  return `${day}/${month}/${year}`;
}

function Attendance() {
  const [selectedDate, setSelectedDate] = useState('2026-05-22');

  const filteredAttendance = fakeAttendance.filter(row => row.date === selectedDate);

  return (
    <div>
      <h4 className="mb-1">Chấm công</h4>
      <p className="text-muted mb-3" style={{ fontSize: '14px' }}>
        Theo dõi thời gian ra vào của nhân viên.
      </p>

      <div className="row mb-3">
        <div className="col-md-3">
          <div className="d-flex align-items-center gap-2">
            <label className="form-label mb-0 text-nowrap">Ngày:</label>
            <input 
              type="date"
              className="form-control" 
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
            />
          </div>
        </div>
      </div>

      <div className="card">
        <div className="card-body p-0">
          <table className="table table-bordered table-striped table-hover mb-0">
            <thead className="table-light">
              <tr>
                <th>STT</th>
                <th>Họ tên</th>
                <th>Ngày</th>
                <th>Giờ vào</th>
                <th>Giờ ra</th>
                <th>Trạng thái</th>
              </tr>
            </thead>
            <tbody>
              {filteredAttendance.length > 0 ? (
                filteredAttendance.map((row, index) => (
                  <tr key={row.id}>
                    <td>{index + 1}</td>
                    <td>{row.name}</td>
                    <td>{formatDateForDisplay(row.date)}</td>
                    <td>{row.checkIn}</td>
                    <td>{row.checkOut}</td>
                    <td>{statusBadge(row.status)}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="text-center py-4 text-muted">
                    Không có dữ liệu chấm công cho ngày này.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Attendance;