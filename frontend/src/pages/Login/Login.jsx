import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './style.css';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');

    if (!email || !password) {
      setError('Vui lòng nhập đầy đủ email và mật khẩu.');
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post('http://localhost:8080/api/users/login', {
        email,
        password,
      });

      if (response.data?.token) {
        localStorage.setItem('token', response.data.token);

        const normalizedUser = {
          user_id: response.data.userId,
          full_name: response.data.fullName,
          email: response.data.email,
          role: response.data.role,
        };

        localStorage.setItem('user', JSON.stringify(normalizedUser));
        navigate('/');
      } else {
        setError('Đăng nhập thất bại, dữ liệu trả về không hợp lệ.');
      }
    } catch (err) {
      if (err.response?.data) {
        const message = typeof err.response.data === 'string'
          ? err.response.data
          : err.response.data.message;
        setError(message || 'Email hoặc mật khẩu không chính xác.');
      } else {
        setError('Không thể kết nối đến máy chủ. Vui lòng thử lại sau.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2 className="auth-title">Đăng Nhập</h2>
        <p className="auth-subtitle">Chào mừng bạn trở lại với rạp phim KOF</p>

        <form onSubmit={handleLogin} className="auth-form">
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Nhập email của bạn"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Mật khẩu</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Nhập mật khẩu"
              required
            />
          </div>

          {error && <div className="auth-error">{error}</div>}

          <button type="submit" className="btn-auth-submit" disabled={loading}>
            {loading ? 'Đang xử lý...' : 'Đăng Nhập'}
          </button>
        </form>

        <div className="auth-footer">
          Chưa có tài khoản? <Link to="/register" className="auth-link">Đăng ký ngay</Link>
        </div>

        <div className="auth-back-home">
          <Link to="/">Trở về trang chủ</Link>
        </div>
      </div>
    </div>
  );
}

export default Login;
