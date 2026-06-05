import { useEffect, useState } from 'react';
import { getLeaveRequests, updateLeaveRequest } from '../services/leaveService';

function statusBadge(status) {
  if (status === 'Đã duyệt') return <span className="badge bg-success">{status}</span>;
  if (status === 'Chờ duyệt') return <span className="badge bg-warning text-dark">{status}</span>;
  if (status === 'Từ chối') return <span className="badge bg-danger">{status}</span>;
  return <span className="badge bg-secondary">{status}</span>;
}

function LeaveRequests() {
  const [leaves, setLeaves] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function loadLeaves() {
      try {
        setLoading(true);
        setError('');
        const data = await getLeaveRequests();
        setLeaves(data);
      } catch (err) {
        setError('Không thể tải danh sách nghỉ phép. Vui lòng kiểm tra json-server.');
      } finally {
        setLoading(false);
      }
    }

    loadLeaves();
  }, []);

  const updateStatus = async (id, status) => {
    const current = leaves.find((leave) => leave.id === id);
    if (!current) return;

    try {
      const updated = await updateLeaveRequest(id, { ...current, status });
      setLeaves((prevLeaves) =>
        prevLeaves.map((leave) => (leave.id === id ? updated : leave))
      );
    } catch (err) {
      setError('Không thể cập nhật trạng thái đơn nghỉ phép.');
    }
  };

  return (
    <div>
      <h4 className="mb-1">Nghỉ phép</h4>
      <p className="text-muted mb-3" style={{ fontSize: '14px' }}>
        Danh sách các đơn xin nghỉ phép của nhân viên.
      </p>

      {error && <div className="alert alert-danger py-2">{error}</div>}

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
              {loading ? (
                <tr>
                  <td colSpan="9" className="text-center py-4 text-muted">
                    Đang tải dữ liệu...
                  </td>
                </tr>
              ) : leaves.length > 0 ? (
                leaves.map((leave, index) => (
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
                            onClick={() => updateStatus(leave.id, 'Đã duyệt')}
                          >
                            Đồng ý
                          </button>
                          <button
                            className="btn btn-sm btn-outline-danger"
                            onClick={() => updateStatus(leave.id, 'Từ chối')}
                          >
                            Từ chối
                          </button>
                        </div>
                      ) : (
                        <span className="text-muted">-</span>
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="9" className="text-center py-4 text-muted">
                    Chưa có đơn xin nghỉ phép.
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

export default LeaveRequests;
