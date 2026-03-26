import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios'; // Đảm bảo đã npm install axios
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
      // Gửi yêu cầu POST tới API backend Spring Boot
      const response = await axios.post('http://localhost:8080/api/auth/login', {
        email: email,
        password: password
      });

      // Kiểm tra phản hồi từ backend
      if (response.data && response.data.token) {
        // 1. Lưu JWT Token để dùng cho các request sau
        localStorage.setItem('token', response.data.token); 
        
        // 2. Lưu thông tin User để hiển thị Icon trên Nav
        // Giả sử backend trả về object user trong response.data.user
        localStorage.setItem('user', JSON.stringify(response.data.user)); 

        // 3. Điều hướng về trang chính
        navigate('/Rap-phim'); 
      }
    } catch (err) {
      // Xử lý lỗi từ backend (401 Unauthorized, 404 Not Found, v.v.)
      if (err.response && err.response.data) {
        setError(err.response.data.message || 'Email hoặc mật khẩu không chính xác.');
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
             <Link to="/Rap-phim">Trở về trang chủ</Link>
        </div>
      </div>
    </div>
  );
}

export default Login;