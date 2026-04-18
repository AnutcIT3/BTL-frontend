import React, { useState, useEffect } from 'react';
import './style.css';
import logoImg from '../../assets/logo.png';
import { Link, useLocation } from 'react-router-dom';
import { FaUserCircle } from 'react-icons/fa';

function NavMenu() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');
    setIsLoggedIn(Boolean(token && user && user !== 'undefined' && user !== 'null'));
  }, [location]);

  return (
    <nav className="navbar">
      <div className="nav-container">
        <div className="nav-logo">
          <Link to="/">
            <img src={logoImg} alt="Logo" className="logo-image" />
          </Link>
        </div>

        <ul className="nav-links">
          <li><Link to="/">Rạp phim</Link></li>
          <li><Link to="/lich-chieu">Lịch Chiếu</Link></li>
          <li><Link to="/gia-ve">Giá Vé</Link></li>
          <li><Link to="/phim">Phim</Link></li>
          <li><Link to="/khuyen-mai">Khuyến mãi</Link></li>
          <li><Link to="/user">Nguoi dung</Link></li>
        </ul>

        <div className="nav-auth">
          {isLoggedIn ? (
            <Link to="/user" className="user-icon-link">
              <FaUserCircle className="user-nav-icon" />
            </Link>
          ) : (
            <Link to="/login">
              <button className="btn-login">Đăng Nhập</button>
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}

export default NavMenu;
