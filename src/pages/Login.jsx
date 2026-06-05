import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../services/authService';

function Login() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  async function handleLogin(e) {
    e.preventDefault();

    try {
      setLoading(true);
      setError('');
      const found = await login(username, password);

      if (found) {
        navigate('/dashboard');
      } else {
        setError('Tên đăng nhập hoặc mật khẩu không đúng.');
      }
    } catch (err) {
      setError('Không thể đăng nhập. Vui lòng kiểm tra json-server.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="bg-light d-flex align-items-center justify-content-center" style={{ minHeight: '100vh' }}>
      <div className="col-md-4 col-sm-8 col-11">
        <div className="card shadow-sm">
          <div className="card-body p-4">
            <h4 className="text-center text-primary mb-1">HRM System</h4>
            <p className="text-center text-muted mb-4" style={{ fontSize: '13px' }}>
              Hệ thống quản lý nhân sự
            </p>

            {error && (
              <div className="alert alert-danger py-2" style={{ fontSize: '13px' }}>
                {error}
              </div>
            )}

            <form onSubmit={handleLogin}>
              <div className="mb-3">
                <label className="form-label" style={{ fontSize: '13px' }}>Tên đăng nhập</label>
                <input
                  type="text"
                  className="form-control"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Nhập tên đăng nhập"
                />
              </div>

              <div className="mb-4">
                <label className="form-label" style={{ fontSize: '13px' }}>Mật khẩu</label>
                <input
                  type="password"
                  className="form-control"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Nhập mật khẩu"
                />
              </div>

              <button type="submit" className="btn btn-primary w-100" disabled={loading}>
                {loading ? 'Đang đăng nhập...' : 'Đăng nhập'}
              </button>
            </form>

            <p className="text-center text-muted mt-3 mb-0" style={{ fontSize: '12px' }}>
              Tài khoản test: admin / 123456
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
