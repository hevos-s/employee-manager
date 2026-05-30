import { useState } from 'react';

const initialLeaves = [
  { id: 1, name: 'Nguyễn Văn An', type: 'Nghỉ phép năm', from: '20/05/2026', to: '22/05/2026', days: 3, reason: 'Việc gia đình', status: 'Đã duyệt' },
  { id: 2, name: 'Trần Thị Bình', type: 'Nghỉ bệnh', from: '21/05/2026', to: '21/05/2026', days: 1, reason: 'Khám bệnh', status: 'Chờ duyệt' },
  { id: 3, name: 'Hoàng Văn Em', type: 'Nghỉ không lương', from: '25/05/2026', to: '27/05/2026', days: 3, reason: 'Du lịch cá nhân', status: 'Từ chối' },
  { id: 4, name: 'Phạm Thị Dung', type: 'Nghỉ phép năm', from: '01/06/2026', to: '03/06/2026', days: 3, reason: 'Nghỉ hè', status: 'Chờ duyệt' },
];

function statusBadge(status) {
  if (status === 'Đã duyệt') return <span className="badge bg-success">{status}</span>;
  if (status === 'Chờ duyệt') return <span className="badge bg-warning text-dark">{status}</span>;
  if (status === 'Từ chối') return <span className="badge bg-danger">{status}</span>;
  return <span className="badge bg-secondary">{status}</span>;
}

function LeaveRequests() {
  const [leaves, setLeaves] = useState(initialLeaves);

  const handleApprove = (id) => {
    setLeaves(prevLeaves => 
      prevLeaves.map(leave => 
        leave.id === id ? { ...leave, status: 'Đã duyệt' } : leave
      )
    );
  };

  const handleReject = (id) => {
    setLeaves(prevLeaves => 
      prevLeaves.map(leave => 
        leave.id === id ? { ...leave, status: 'Từ chối' } : leave
      )
    );
  };

  return (
    <div>
      <h4 className="mb-1">Nghỉ phép</h4>
      <p className="text-muted mb-3" style={{ fontSize: '14px' }}>
        Danh sách các đơn xin nghỉ phép của nhân viên.
      </p>

      <div className="card">
        <div className="card-body p-0">
          <table className="table table-bordered table-striped table-hover mb-0">
            <thead className="table-light">
              <tr>
                <th>STT</th>
                <th>Nhân viên</th>
                <th>Loại nghỉ</th>
                <th>Từ ngày</th>
                <th>Đến ngày</th>
                <th>Số ngày</th>
                <th>Lý do</th>
                <th>Trạng thái</th>
                <th className="text-center">Thao tác</th>
              </tr>
            </thead>
            <tbody>
              {leaves.map((leave, index) => (
                <tr key={leave.id}>
                  <td>{index + 1}</td>
                  <td>{leave.name}</td>
                  <td>{leave.type}</td>
                  <td>{leave.from}</td>
                  <td>{leave.to}</td>
                  <td>{leave.days}</td>
                  <td>{leave.reason}</td>
                  <td>{statusBadge(leave.status)}</td>
                  <td className="text-center">
                    {leave.status === 'Chờ duyệt' ? (
                      <div className="d-flex justify-content-center gap-2">
                        <button 
                          className="btn btn-sm btn-success" 
                          onClick={() => handleApprove(leave.id)}
                        >
                          Đồng ý
                        </button>
                        <button 
                          className="btn btn-sm btn-outline-danger" 
                          onClick={() => handleReject(leave.id)}
                        >
                          Từ chối
                        </button>
                      </div>
                    ) : (
                      <span className="text-muted">-</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default LeaveRequests;