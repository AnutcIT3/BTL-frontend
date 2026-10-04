import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './PointsPage.css';

const PointsPage = () => {
    const [pointData, setPointData] = useState({
        currentPoints: 0,
        earnedPoints: 0,
        usedPoints: 0,
        history: []
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPoints = async () => {
            const userStr = localStorage.getItem('user');
            const token = localStorage.getItem('accessToken');
            
            if (userStr && token) {
                try {
                    const userId = JSON.parse(userStr).id;
                    const response = await axios.get(`http://localhost:8080/api/tickets/points/${userId}`, {
                        headers: { Authorization: `Bearer ${token}` }
                    });
                    setPointData(response.data);
                } catch (error) {
                    console.error("Lỗi tải lịch sử điểm:", error);
                }
            }
            setLoading(false);
        };
        fetchPoints();
    }, []);

    const formatTime = (timeStr) => {
        if (!timeStr) return '';
        const d = new Date(timeStr);
        return `${d.toLocaleDateString('vi-VN')} ${d.toLocaleTimeString('vi-VN', {hour: '2-digit', minute:'2-digit'})}`;
    };

    if (loading) return <div className="text-center p-5">Đang tải dữ liệu điểm...</div>;

    return (
        <div className="tab-content fade-in points-tab-container">
            <div className="points-overview-section">
                <h3 className="section-heading text-blue">TỔNG QUAN</h3>
                <div className="overview-grid">
                    <div className="overview-row"><span className="overview-label">Điểm đã tích luỹ</span><span className="overview-value text-green">{pointData.earnedPoints.toLocaleString('vi-VN')} điểm</span></div>
                    <div className="overview-row"><span className="overview-label">Điểm đã sử dụng</span><span className="overview-value text-red">{pointData.usedPoints.toLocaleString('vi-VN')} điểm</span></div>
                    <div className="overview-row"><span className="overview-label">Điểm hiện có</span><span className="overview-value text-blue" style={{fontSize: '18px'}}>{pointData.currentPoints.toLocaleString('vi-VN')} điểm</span></div>
                    <div className="overview-row"><span className="overview-label">Điểm sắp hết hạn</span><span className="overview-value">0 điểm</span></div>
                </div>
            </div>

            <div className="points-history-section">
                <h3 className="section-heading text-blue">LỊCH SỬ ĐIỂM</h3>
                <div className="booking-table-wrapper">
                    <table className="kof-custom-table">
                        <thead>
                            <tr><th>THỜI GIAN</th><th>SỐ ĐIỂM</th><th>NỘI DUNG GIAO DỊCH</th></tr>
                        </thead>
                        <tbody>
                            {pointData.history.length > 0 ? (
                                pointData.history.map((item, index) => (
                                    <tr key={index}>
                                        <td className="text-center">{formatTime(item.time)}</td>
                                        <td className={`text-center font-bold ${item.isPositive ? 'text-green' : 'text-red'}`}>{item.points}</td>
                                        <td className="text-center">{item.content}</td>
                                    </tr>
                                ))
                            ) : (
                                <tr><td colSpan="3" className="text-center p-4">Bạn chưa có lịch sử tích điểm nào.</td></tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default PointsPage;