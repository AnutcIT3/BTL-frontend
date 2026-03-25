import React from 'react';
import './style.css';

const PaymentPage = ({ selectedSeats = ["A1", "A2"], movie, showtime }) => {
  // Dữ liệu mẫu nếu props bị trống
  const movieData = movie || {
    title: "Dune: Part Two",
    poster_url: "https://via.placeholder.com/150x220",
  };
  const showData = showtime || { start_time: "19:00 - 24/05/2024" };
  
  const pricePerSeat = 100000; 
  const totalAmount = selectedSeats.length * pricePerSeat;

  return (
    <div className="payment-wrapper">
      <div className="payment-container">
        
        {/* Cột trái: Chi tiết giao dịch */}
        <div className="payment-main">
          <h2 className="section-title">Thông Tin Đặt Vé</h2>
          
          <div className="movie-summary-card">
            <img src={movieData.poster_url} alt="Poster" className="movie-poster" />
            <div className="movie-info">
              <h3 className="movie-title">{movieData.title}</h3>
              <div className="info-item">
                <span className="label">Suất chiếu:</span>
                <span className="value text-highlight">{showData.start_time}</span>
              </div>
              <div className="info-item">
                <span className="label">Rạp:</span>
                <span className="value">Cinema Hall 01</span>
              </div>
              <div className="info-item">
                <span className="label">Ghế đã chọn:</span>
                <span className="value seat-list">{selectedSeats.join(", ")}</span>
              </div>
            </div>
          </div>

          <div className="payment-methods-section">
            <h3 className="section-subtitle">Phương thức thanh toán</h3>
            <div className="payment-grid">
              <button className="payment-method-btn momo-zalo">
                <div className="btn-content">
                  <span>Ví MoMo / ZaloPay</span>
                </div>
              </button>
              <button className="payment-method-btn momo-zalo">
                <div className="btn-content">
                  <span>Tiền mặt</span>
                </div>
              </button>
              
              <button className="payment-method-btn cardano-wallet active">
                <div className="btn-content">
                  <span className="icon">₳</span>
                  <span>Cardano Wallet (TADA Rewards)</span>
                </div>
                <span className="badge">Khuyến mãi</span>
              </button>
            </div>
          </div>
        </div>

        {/* Cột phải: Tổng kết đơn hàng */}
        <aside className="payment-sidebar">
          <div className="summary-card">
            <h2 className="summary-title">Tổng Kết</h2>
            
            <div className="summary-details">
              <div className="summary-row">
                <span>Giá vé ({selectedSeats.length}x)</span>
                <span>{totalAmount.toLocaleString()} VNĐ</span>
              </div>
              <div className="summary-row">
                <span>Phí dịch vụ</span>
                <span>0 VNĐ</span>
              </div>
              <div className="divider"></div>
              <div className="summary-row total">
                <span>Tổng cộng</span>
                <span className="total-price">{totalAmount.toLocaleString()} VNĐ</span>
              </div>
            </div>

            <button className="confirm-button">
              XÁC NHẬN THANH TOÁN
            </button>
            
            <div className="reward-note">
              <p>Nhận ngay <strong>10 tADA</strong> sau khi thanh toán thành công.</p>
            </div>
          </div>
        </aside>

      </div>
    </div>
  );
};

export default PaymentPage;