import React, { useState, useEffect } from 'react';
import './MembershipPage.css';

const MembershipPage = () => {
    const [userName, setUserName] = useState("NGUYỄN VĂN THỌ");
    const [memberCode, setMemberCode] = useState("KOF - 889 112 334");

    useEffect(() => {
        const userStr = localStorage.getItem('user');
        if (userStr && userStr !== "undefined" && userStr !== "null") {
            try {
                const user = JSON.parse(userStr);
                if (user.fullName) setUserName(user.fullName.toUpperCase());
                if (user.id) setMemberCode(`KOF - ${String(user.id).padStart(6, '0')}`);
            } catch (error) {
                console.log("Dùng mock data cho Thẻ");
            }
        }
    }, []);

    return (
        <div className="tab-content fade-in membership-container">
            <div className="membership-card-visual">
                <div className="card-bg-pattern"></div>
                <div className="card-top">
                    <span className="card-logo">KOF CINEMA</span>
                    <span className="card-type">MEMBER</span>
                </div>
                <div className="card-mid">
                    <h3 className="member-name">{userName}</h3>
                    <p className="member-tier">Hạng thẻ: <strong>VÀNG (GOLD)</strong></p>
                </div>
                <div className="card-bottom">
                    <div className="barcode-mock">||| ||||| || |||||| ||||</div>
                    <span className="member-code">{memberCode}</span>
                </div>
            </div>
            <div className="membership-perks">
                <h4>Quyền lợi hạng VÀNG:</h4>
                <ul>
                    <li>Tích lũy 10% giá trị giao dịch vào Điểm KOF.</li>
                    <li>Tặng 1 vé 2D và 1 Combo bắp nước vào tháng sinh nhật.</li>
                    <li>Ưu tiên mua vé sớm các suất chiếu đặc biệt (Sneak Show).</li>
                </ul>
            </div>
        </div>
    );
};

export default MembershipPage;