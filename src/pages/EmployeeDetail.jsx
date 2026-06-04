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
      <div className="text-center py-5">
        <h5 className="text-danger">Lỗi: Không tìm thấy hồ sơ!</h5>
        <p className="text-muted">Nhân viên này không tồn tại hoặc đã bị xóa.</p>
        <button className="btn btn-primary mt-3" onClick={() => navigate('/employees')}>
          ← Quay lại danh sách
        </button>
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
      <button className="btn btn-link text-decoration-none p-0 mb-3" onClick={() => navigate('/employees')}>
        ← Quay lại danh sách
      </button>

      <h4 className="mb-1">Hồ sơ Nhân viên</h4>
      <p className="text-muted mb-4" style={{ fontSize: '14px' }}>
        Thông tin chi tiết của <strong>{employee.name}</strong> (ID: #{id})
      </p>

      <div className="card shadow-sm border-0" style={{ maxWidth: '600px' }}>
        <div className="card-header bg-white border-bottom-0 pt-4 pb-0">
          <div className="d-flex align-items-center">
            <div 
              className="bg-primary text-white rounded-circle d-flex justify-content-center align-items-center me-3"
              style={{ width: '60px', height: '60px', fontSize: '24px', fontWeight: 'bold' }}
            >
              {employee.name.charAt(0)}
            </div>
            <div>
              <h5 className="mb-0">{employee.name}</h5>
              <span className="text-muted">{employee.position}</span>
            </div>
          </div>
        </div>
        
        <div className="card-body mt-3">
          <table className="table table-borderless mb-0">
            <tbody>
              {rows.map((row) => (
                <tr key={row.label} className="border-bottom">
                  <th className="text-muted" style={{ width: '160px', fontSize: '15px' }}>
                    {row.label}
                  </th>
                  <td className="fw-medium" style={{ fontSize: '15px' }}>
                    {row.value}
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

export default EmployeeDetail;