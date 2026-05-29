import { useParams, useNavigate } from 'react-router-dom';

const fakeEmployees = [
  { id: 1, name: 'Nguyễn Văn An', department: 'Kỹ thuật', position: 'Lập trình viên', status: 'Đang làm', email: 'an.nv@hrm.com', phone: '0901234567', joinDate: '01/03/2022' },
  { id: 2, name: 'Trần Thị Bình', department: 'Marketing', position: 'Chuyên viên', status: 'Đang làm', email: 'binh.tt@hrm.com', phone: '0902345678', joinDate: '15/06/2021' },
  { id: 3, name: 'Lê Văn Cường', department: 'Kế toán', position: 'Kế toán viên', status: 'Nghỉ phép', email: 'cuong.lv@hrm.com', phone: '0903456789', joinDate: '10/01/2020' },
  { id: 4, name: 'Phạm Thị Dung', department: 'Nhân sự', position: 'Chuyên viên HR', status: 'Đang làm', email: 'dung.pt@hrm.com', phone: '0904567890', joinDate: '20/09/2023' },
  { id: 5, name: 'Hoàng Văn Em', department: 'Kỹ thuật', position: 'Kỹ sư', status: 'Đang làm', email: 'em.hv@hrm.com', phone: '0905678901', joinDate: '05/04/2022' },
];

function EmployeeDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const employee = fakeEmployees.find((e) => e.id === parseInt(id));

  if (!employee) {
    return (
      <div>
        <button className="btn btn-link p-0 mb-3" onClick={() => navigate('/employees')}>
          ← Quay lại
        </button>
        <p className="text-muted">Không tìm thấy nhân viên.</p>
      </div>
    );
  }

  const rows = [
    { label: 'Họ tên', value: employee.name },
    { label: 'Phòng ban', value: employee.department },
    { label: 'Chức vụ', value: employee.position },
    { label: 'Trạng thái', value: employee.status },
    { label: 'Email', value: employee.email },
    { label: 'Số điện thoại', value: employee.phone },
    { label: 'Ngày vào làm', value: employee.joinDate },
  ];

  return (
    <div>
      <button className="btn btn-link p-0 mb-3" onClick={() => navigate('/employees')}>
        ← Quay lại danh sách
      </button>

      <h4 className="mb-1">Chi tiết nhân viên</h4>
      <p className="text-muted mb-3" style={{ fontSize: '14px' }}>
        Thông tin chi tiết của nhân viên #{id}
      </p>

      <div className="card" style={{ maxWidth: '520px' }}>
        <div className="card-body">
          <table className="table table-bordered mb-0">
            <tbody>
              {rows.map((row) => (
                <tr key={row.label}>
                  <th className="table-light" style={{ width: '160px', fontSize: '14px' }}>
                    {row.label}
                  </th>
                  <td style={{ fontSize: '14px' }}>{row.value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default EmployeeDetail;
