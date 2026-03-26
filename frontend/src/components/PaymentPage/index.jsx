import React, { useState, useEffect } from 'react';
import UserService from '../../services/UserService'; // Import service vừa tạo

const PaymentPage = ({ movie, selectedSeats, userId = 1 }) => { // Giả sử userId = 1 cho demo
    const [userBalance, setUserBalance] = useState(0);

    useEffect(() => {
        // Gọi API lấy số dư người dùng khi vào trang thanh toán
        UserService.getUserProfile(userId)
            .then(res => {
                setUserBalance(res.data.total_balance);
            })
            .catch(err => console.error("Lỗi lấy thông tin ví:", err));
    }, [userId]);

    const totalAmount = selectedSeats.length * 100000;
    const canPay = userBalance >= totalAmount;

    return (
        <div className="payment-container">
            {/* ... các phần cũ ... */}
            
            <div className="user-wallet-info">
                <span>Số dư ví của bạn: </span>
                <strong className={canPay ? "text-success" : "text-danger"}>
                    {userBalance.toLocaleString()} VNĐ
                </strong>
            </div>

            <button 
                className="confirm-button" 
                disabled={!canPay} // Vô hiệu hóa nút nếu không đủ tiền
            >
                {canPay ? "XÁC NHẬN THANH TOÁN" : "SỐ DƯ KHÔNG ĐỦ"}
            </button>
            
            {!canPay && (
                <p className="error-hint">Vui lòng nạp thêm tiền để tiếp tục đặt vé.</p>
            )}
        </div>
    );
};