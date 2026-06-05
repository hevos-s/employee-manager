import { useNavigate } from 'react-router-dom';
import { getCurrentUser, logout } from '../services/authService';

function Header() {
  const navigate = useNavigate();
  const currentUser = getCurrentUser();

  const userName = currentUser ? currentUser.name || currentUser.username || 'User' : 'User';
  const firstLetter = userName.charAt(0).toUpperCase();

  function handleLogout() {
    logout();
    navigate('/login');
  }

  return (
    <div className="d-flex align-items-center justify-content-between px-3 py-2 bg-white border-bottom">
      <span className="fw-bold text-primary fs-5">HRM System</span>

      <div className="d-flex align-items-center gap-2">
        <div
          className="rounded-circle bg-primary text-white d-flex align-items-center justify-content-center fw-bold"
          style={{ width: '32px', height: '32px', fontSize: '14px', flexShrink: 0 }}
        >
          {firstLetter}
        </div>

        <span className="text-secondary" style={{ fontSize: '14px' }}>{userName}</span>

        <button
          className="btn btn-outline-danger btn-sm"
          onClick={handleLogout}
        >
          Đăng xuất
        </button>
      </div>
    </div>
  );
}

export default Header;
