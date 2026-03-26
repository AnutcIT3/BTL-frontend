import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../Login/style.css'; // Dùng chung phong cách thiết kế với Login

function Register() {
  const [fullname, setFullname] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
  };

  const validatePhone = (phone) => {
    // Kiểm tra số điện thoại: chỉ chứa chữ số, độ dài 10-11 ký tự
    return String(phone).match(/(84|0[3|5|7|8|9])+([0-9]{8})\b/);
  };

  const handleRegister = (e) => {
    e.preventDefault();
    setError('');

    // Kiểm tra dữ liệu rỗng
    if (!fullname || !email || !phone || !password) {
      setError('Vui lòng điền đầy đủ tất cả các trường.');
      return;
    }

    // Kiểm tra định dạng Email
    if (!validateEmail(email)) {
      setError('Định dạng email không hợp lệ!');
      return;
    }

    // Kiểm tra số điện thoại
    if (!validatePhone(phone)) {
      setError('Số điện thoại không hợp lệ (Ví dụ: 0987654321).');
      return;
    }

    // Kiểm tra độ mạnh mật khẩu (ít nhất 6 ký tự)
    if (password.length < 6) {
      setError('Mật khẩu của bạn phải có ít nhất 6 ký tự.');
      return;
    }

    setLoading(true);

    // Mock API (Giả lập gửi data lên server)
    setTimeout(() => {
      setLoading(false);
      // Khi đã Register Backend thành công, tuỳ thuộc flow bạn có thể tự động login
      localStorage.setItem('token', 'fake-jwt-token');
      alert('Đăng ký tài khoản hệ thống KOF thành công!');
      navigate('/Rap-phim'); // Di chuyển về trang chủ sau khi Đăng ký và login thành công
    }, 1500);
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2 className="auth-title">Đăng Ký Tài Khoản</h2>
        <p className="auth-subtitle">Gia nhập cộng đồng yêu phim KOF ngay hôm nay</p>

        <form onSubmit={handleRegister} className="auth-form">
          <div className="form-group">
            <label htmlFor="fullname">Họ và tên</label>
            <input
              type="text"
              id="fullname"
              value={fullname}
              onChange={(e) => setFullname(e.target.value)}
              placeholder="Nhập họ và tên đầy đủ"
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email liên hệ</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Nhập địa chỉ email"
            />
          </div>

          <div className="form-group">
            <label htmlFor="phone">Số điện thoại</label>
            <input
              type="tel"
              id="phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="Nhập số điện thoại"
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Mật khẩu</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Tạo mật khẩu (Mức tối thiểu 6 ký tự)"
            />
          </div>

          {error && <div className="auth-error">{error}</div>}

          <button type="submit" className="btn-auth-submit" disabled={loading}>
            {loading ? 'Đang tạo dữ liệu...' : 'Tạo Tài Khoản'}
          </button>
        </form>

        <div className="auth-footer">
          Đã có tài khoản? <Link to="/login" className="auth-link">Đăng nhập tại đây</Link>
        </div>
        
        {/* Nút quay lại trang chủ tiện lợi */}
        <div className="auth-back-home">
             <Link to="/Rap-phim">Trở về trang chủ</Link>
        </div>
      </div>
    </div>
  );
}

export default Register;
