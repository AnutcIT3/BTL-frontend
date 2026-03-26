import React, { useState, useEffect } from "react"; // 1. Đã thêm useState ở đây
import axios from "axios";
import './user-style.css';

const UserProfile = ({ userId = 1 }) => { // Mặc định chọn ID của Admin trong DB của bạn
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);
        // 2. Gọi đúng ID của user để lấy 1 object thay vì 1 mảng
        axios.get(`http://localhost:8080/api/users/${userId}`)
             .then(response => {
                setUser(response.data);
                setLoading(false); // 3. Đã thêm setLoading(false) khi thành công
             })
             .catch(error => {
                console.error("Lỗi khi lấy dữ liệu người dùng:", error);
                setLoading(false); // 4. Đã thêm setLoading(false) khi lỗi
             });
             
    }, [userId]);

    if (loading) return <div className="loader">Đang tải thông tin...</div>;
    
    // 5. Kiểm tra dữ liệu an toàn trước khi render
    if (!user) return <div className="error">Không tìm thấy người dùng!</div>;

    return (
        <div className="profile-container">
            <div className="profile-card">
                <div className="profile-header">
                    <div className="avatar-circle">
                        {/* Dùng ?. để tránh lỗi nếu full_name chưa load kịp */}
                        {user.full_name?.charAt(0).toUpperCase() || "U"}
                    </div>
                    <h2>{user.full_name}</h2>
                    <span className="role-badge">{user.role}</span>
                </div>

                <div className="profile-body">
                    <div className="info-group">
                        <label>Email</label>
                        <p>{user.email}</p>
                    </div>
                    
                    <div className="info-group">
                        <label>Số điện thoại</label>
                        <p>{user.phone || "Chưa cập nhật"}</p>
                    </div>
{/* PHẦN HIỂN THỊ SỐ DƯ VÀ VÍ (CẬP NHẬT MỚI) */}
<div className="wallet-actions-section">
    {/* Phần Số dư tài khoản - Được bọc lại để dễ style */}
    <div className="system-balance-info">
        <label>Số dư tài khoản</label>
        <div className="balance-amount-small">
            <span className="balance-value">
                {user.total_balance?.toLocaleString() || '0'}
            </span>
            <span className="balance-currency">VNĐ</span>
        </div>
    </div>
    <div className="action-buttons-group">
        <div className="blockchain-wallet-card">
            <div className="wallet-card-header">
                <strong>VÍ CARDANO (WEB3)</strong>
                <span className="network-badge">Preview</span>
            </div>
            <div className="wallet-card-address">
                <label>Địa chỉ:</label>
                <code>
                    {"addr_test1...9p8yvnv2lyrvasq".slice(0, 10)}...{"addr_test1...9p8yvnv2lyrvasq".slice(-8)}
                </code>
            </div>
        </div>
    </div>
</div>
                </div>
            </div>
        </div>
    );
}

export default UserProfile;