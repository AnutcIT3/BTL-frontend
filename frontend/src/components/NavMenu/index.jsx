import React from 'react';
import './style.css'; // Chúng ta sẽ tạo file CSS này sau
import logoImg from '../../assets/logo.png'
import { Link } from 'react-router-dom';
function NavMenu() {
  return (
    <nav className="navbar">
      <div className="nav-container">
        {/* Phần Logo */}
        <div className="nav-logo">
          
          <img src={logoImg} alt="Logo" className="logo-image" />
          
        </div>

        {/* Phần Menu đường dẫn */}
        <ul className="nav-links">
          <li><Link to="/Rap-phim">Rạp phim</Link></li>
          <li><a href="/lich-chieu">Lịch Chiếu</a></li>
          <li><a href="/gia-ve">Giá Vé</a></li>
          <li><Link name="phhim" to="/phim">Phim</Link></li>
          <li><Link name="khuyenmai" to="/khuyen-mai">Khuyến mãi</Link></li>
        </ul>

        {/* Nút hành động (Tùy chọn thêm) */}
        <div className="nav-auth">
          <button className="btn-login">Đăng Nhập</button>
        </div>
      </div>
    </nav>
  );
}

export default NavMenu;