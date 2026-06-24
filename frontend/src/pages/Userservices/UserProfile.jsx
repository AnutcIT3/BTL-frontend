import React, { useEffect, useState } from "react";
import axios from "axios";
import { Lucid, Blockfrost } from 'lucid-cardano'; 
import { useNavigate, useLocation } from "react-router-dom";
import './user-style.css';

// === IMPORT 4 FILE GIAO DIỆN CON VÀO ĐÂY ===
import MembershipPage from '../MembershipPage/MembershipPage';
import BookingPage from '../BookingPage/BookingPage';
import PointsPage from '../PointsPage/PointsPage';
import VoucherPage from '../VoucherPage/VoucherPage';

const UserProfile = () => {
    const navigate = useNavigate();
    const location = useLocation(); 
    
    // ==========================================
    // 1. STATE CHO GIAO DIỆN & DATA CƠ BẢN
    // ==========================================
    const [storedUser, setStoredUser] = useState({});
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState('accountInfo'); 

    // ==========================================
    // 2. STATE CHO TÍNH NĂNG ẢNH (AVATAR)
    // ==========================================
    const [selectedFile, setSelectedFile] = useState(null); 
    const [imagePreview, setImagePreview] = useState(null); 

    const [formData, setFormData] = useState({
        fullName: '',
        phoneNumber: '',
        passportId: '',
        birthday: '',
        gender: '',
        address: ''
    });

    const [walletAddr, setWalletAddr] = useState("");
    const [tAdaBalance, setTAdaBalance] = useState(0);
    const [lucid, setLucid] = useState(null);

    const [showPasswordModal, setShowPasswordModal] = useState(false);
    const [passwords, setPasswords] = useState({ oldPassword: '', newPassword: '', confirmPassword: '' });

    const tabsList = [
        { id: 'accountInfo', name: 'THÔNG TIN TÀI KHOẢN' },
        { id: 'cardanoWallet', name: 'VÍ CARDANO' }, 
        { id: 'membershipCard', name: 'THẺ THÀNH VIÊN' },
        { id: 'cinemaJourney', name: 'HÀNH TRÌNH ĐIỆN ẢNH' },
        { id: 'kofPoints', name: 'ĐIỂM KOF' },
        { id: 'vouchers', name: 'VOUCHER' }
    ];

    // ==========================================
    // 3. USE-EFFECT CHẠY LÚC LOAD TRANG
    // ==========================================
    useEffect(() => {
        const fetchLatestProfile = async () => {
            const token = localStorage.getItem('accessToken');
            if (!token) {
                navigate('/login'); 
                return;
            }
            try {
                const response = await axios.get('http://localhost:8080/api/v1/users/profile', {
                    headers: { Authorization: `Bearer ${token}` }
                });
                const freshUser = response.data.data;
                setStoredUser(freshUser);
                localStorage.setItem('user', JSON.stringify(freshUser));
                setLoading(false);
            } catch (error) {
                console.error("Lỗi khi lấy thông tin mới:", error);
                localStorage.clear();
                navigate('/login');
            }
        };
        fetchLatestProfile();
    }, [navigate]);

    useEffect(() => {
        if (storedUser && storedUser.email) {
            setFormData({
                fullName: storedUser.fullName || '',
                phoneNumber: storedUser.phoneNumber || storedUser.phone || '', 
                passportId: storedUser.passportId || '',
                birthday: storedUser.birthday || '',
                gender: storedUser.gender || '',
                address: storedUser.address || ''
            });
        }
    }, [storedUser]);

    useEffect(() => {
        const hash = location.hash.replace('#', '');
        const isValidTab = tabsList.some(tab => tab.id === hash);
        if (hash && isValidTab) {
            setActiveTab(hash);
        } else if (!hash) {
            setActiveTab('accountInfo');
        }
    }, [location.hash]); 

    useEffect(() => {
        const initWeb3 = async () => {
            try {
                const l = await Lucid.new(
                    new Blockfrost("https://cardano-preview.blockfrost.io/api/v0", "previewYo2MqgqvZgJC8L6HW9p8YVnV2LYrVaSQ"),
                    "Preview",
                );
                setLucid(l);
                if (window.cardano && window.cardano.eternl) {
                    const api = await window.cardano.eternl.enable();
                    l.selectWallet(api);
                    const addr = await l.wallet.address();
                    setWalletAddr(addr);
                    const utxos = await l.wallet.getUtxos();
                    const totalLovelace = utxos.reduce((acc, utxo) => acc + (utxo.assets.lovelace || 0n), 0n);
                    setTAdaBalance(Number(totalLovelace) / 1000000);
                }
            } catch (err) {
                console.log("Lỗi khởi tạo ví Cardano:", err);
            }
        };
        initWeb3();
    }, []);

    // ==========================================
    // 4. HÀM XỬ LÝ NÚT BẤM
    // ==========================================
    const handleTabClick = (tabId) => {
        setActiveTab(tabId);
        navigate(`/users#${tabId}`); 
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setSelectedFile(file); 
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result); 
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSavePhoto = async () => {
        if (!selectedFile) return;

        const token = localStorage.getItem('accessToken');
        const uploadData = new FormData();
        uploadData.append('file', selectedFile); 

        try {
            const response = await axios.put('http://localhost:8080/api/v1/users/profile/avatar', uploadData, {
                headers: { 
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data' 
                }
            });
            
            alert("Cập nhật ảnh đại diện thành công!");
            const updatedUser = response.data.data;
            localStorage.setItem('user', JSON.stringify(updatedUser));
            setStoredUser(updatedUser); 
            
            setSelectedFile(null);
            setImagePreview(null);
            
            window.dispatchEvent(new Event("storage")); 
        } catch (error) {
            console.error("Lỗi upload ảnh:", error);
            alert("Lỗi khi cập nhật ảnh đại diện!");
        }
    };

    const handleUpdateProfile = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('accessToken');
        try {
            const response = await axios.put('http://localhost:8080/api/v1/users/profile', formData, {
                headers: { Authorization: `Bearer ${token}` }
            });
            alert("Cập nhật thông tin thành công!");
            const updatedUser = response.data.data;
            localStorage.setItem('user', JSON.stringify(updatedUser));
            setStoredUser(updatedUser); 
            window.dispatchEvent(new Event("storage")); 
        } catch (error) {
            alert("Lỗi khi cập nhật thông tin!");
        }
    };

    const handleChangePassword = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('accessToken');
        if (passwords.newPassword !== passwords.confirmPassword) {
            alert("Mật khẩu xác nhận không khớp!");
            return;
        }
        try {
            await axios.put('http://localhost:8080/api/v1/users/password', passwords, {
                headers: { Authorization: `Bearer ${token}` }
            });
            alert("Đổi mật khẩu thành công! Vui lòng đăng nhập lại.");
            setShowPasswordModal(false);
            localStorage.clear(); 
            window.location.href = '/login'; 
        } catch (error) {
            alert(error.response?.data?.message || "Có lỗi xảy ra, vui lòng kiểm tra lại mật khẩu cũ!");
        }
    };

    if (loading) return <div className="loader">Đang tải thông tin...</div>;

    // ==========================================
    // 5. GIAO DIỆN HIỂN THỊ
    // ==========================================
    return (
        <div className="profile-container">
            <div className="profile-card-wrapper">
                
                <div className="profile-tabs-header">
                    <ul className="profile-tabs">
                        {tabsList.map(tab => (
                            <li 
                                key={tab.id} 
                                className={`tab-item ${activeTab === tab.id ? 'active' : ''}`}
                                onClick={() => handleTabClick(tab.id)}
                            >
                                {tab.name}
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="profile-tab-content">
                    {activeTab === 'accountInfo' && (
                        <div className="tab-account-info">
                            
                            <div className="avatar-left-col">
                                <div className="avatar-circle" style={{ overflow: 'hidden' }}>
                                    {imagePreview ? (
                                        <img src={imagePreview} alt="Preview" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                    ) : storedUser.avatarUrl ? (
                                        <img src={storedUser.avatarUrl} alt="Avatar" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                    ) : (
                                        storedUser.fullName ? storedUser.fullName.charAt(0).toUpperCase() : "U"
                                    )}
                                </div>

                                <div className="avatar-buttons">
                                    <label className="btn-upload-photo" style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                        TẢI ẢNH LÊN
                                        <input 
                                            type="file" 
                                            accept="image/*" 
                                            onChange={handleFileChange} 
                                            style={{ display: 'none' }} 
                                        />
                                    </label>

                                    <button 
                                        type="button" 
                                        className="btn-save-photo"
                                        onClick={handleSavePhoto}
                                        disabled={!selectedFile} 
                                        style={{ opacity: !selectedFile ? 0.5 : 1, cursor: !selectedFile ? 'not-allowed' : 'pointer' }}
                                    >
                                        LƯU ẢNH
                                    </button>
                                </div>
                            </div>
                            
                            <div className="form-right-col">
                                <form className="profile-form" onSubmit={handleUpdateProfile}>
                                    <div className="form-grid">
                                        <div className="form-group">
                                            <label><span className="text-danger">*</span> Họ tên</label>
                                            <input type="text" value={formData.fullName} onChange={(e) => setFormData({...formData, fullName: e.target.value})} required />
                                        </div>
                                        <div className="form-group">
                                            <label><span className="text-danger">*</span> Email</label>
                                            <input type="email" value={storedUser.email || ""} readOnly className="input-readonly" />
                                        </div>
                                        <div className="form-group">
                                            <label><span className="text-danger">*</span> Số điện thoại</label>
                                            <input type="tel" value={formData.phoneNumber} onChange={(e) => setFormData({...formData, phoneNumber: e.target.value})} required />
                                        </div>
                                        <div className="form-group">
                                            <label>CMND/Hộ chiếu</label>
                                            <input type="text" value={formData.passportId} onChange={(e) => setFormData({...formData, passportId: e.target.value})} />
                                        </div>
                                        <div className="form-group">
                                            <label>Ngày sinh</label>
                                            <input type="date" value={formData.birthday} onChange={(e) => setFormData({...formData, birthday: e.target.value})} />
                                        </div>
                                        <div className="form-group">
                                            <label>Giới tính</label>
                                            <select value={formData.gender} onChange={(e) => setFormData({...formData, gender: e.target.value})}>
                                                <option value="" disabled>Chọn giới tính</option>
                                                <option value="male">Nam</option>
                                                <option value="female">Nữ</option>
                                            </select>
                                        </div>
                                        <div className="form-group form-group-full">
                                            <label>Địa chỉ</label>
                                            <input type="text" value={formData.address} onChange={(e) => setFormData({...formData, address: e.target.value})} placeholder="Nhập địa chỉ của bạn" />
                                        </div>
                                    </div>
                                    <div className="form-footer">
                                        <span className="change-password-link" onClick={() => setShowPasswordModal(true)}>
                                            Đổi mật khẩu?
                                        </span>
                                        <button type="submit" className="btn-update">CẬP NHẬT</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    )}

                    {activeTab === 'cardanoWallet' && (
                        <div className="tab-cardano-wallet">
                            <div className="wallet-actions-section">
                                <div className="balance-and-button-group">
                                    <div className="system-balance-info">
                                        <label>Số dư hệ thống (VNĐ)</label>
                                        <div className="balance-amount-small">
                                            <span className="balance-value">{storedUser?.balance?.toLocaleString() || '0'}</span>
                                            <span className="balance-currency">VNĐ</span>
                                        </div>
                                        <div className="balance-blockchain-small">
                                            <span className="ada-value">{tAdaBalance.toFixed(2)}</span>
                                            <span className="ada-currency">tADA</span>
                                        </div>
                                    </div>
                                    <button className="btn-recharge-small">Nạp tiền VNĐ</button>
                                </div>
                                <div className="blockchain-wallet-card">
                                    <div className="wallet-card-header">
                                        <strong>VÍ CARDANO (WEB3)</strong><span className="network-badge">Preview</span>
                                    </div>
                                    <div className="wallet-card-address">
                                        <label>Địa chỉ đang kết nối:</label>
                                        <code>{walletAddr ? `${walletAddr.slice(0, 10)}...${walletAddr.slice(-8)}` : "Chưa kết nối ví eternl"}</code>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* === KHU VỰC HIỂN THỊ 4 TAB MỚI LẮP VÀO === */}
                    {activeTab === 'membershipCard' && <MembershipPage />}
                    {activeTab === 'cinemaJourney' && <BookingPage />}
                    {activeTab === 'kofPoints' && <PointsPage />}
                    {activeTab === 'vouchers' && <VoucherPage />}

                </div>
            </div>

            {showPasswordModal && (
                <div className="modal-overlay">
                    <div className="password-modal">
                        <h3>Đổi Mật Khẩu</h3>
                        <form onSubmit={handleChangePassword}>
                            <div className="form-group-modal">
                                <label>Mật khẩu hiện tại</label>
                                <input 
                                    type="password" 
                                    required
                                    value={passwords.oldPassword}
                                    onChange={(e) => setPasswords({...passwords, oldPassword: e.target.value})} 
                                />
                            </div>
                            <div className="form-group-modal">
                                <label>Mật khẩu mới (ít nhất 6 ký tự)</label>
                                <input 
                                    type="password" 
                                    required
                                    minLength="6"
                                    value={passwords.newPassword}
                                    onChange={(e) => setPasswords({...passwords, newPassword: e.target.value})} 
                                />
                            </div>
                            <div className="form-group-modal">
                                <label>Xác nhận mật khẩu mới</label>
                                <input 
                                    type="password" 
                                    required
                                    value={passwords.confirmPassword}
                                    onChange={(e) => setPasswords({...passwords, confirmPassword: e.target.value})} 
                                />
                            </div>
                            <div className="modal-actions">
                                <button type="button" className="btn-cancel" onClick={() => setShowPasswordModal(false)}>HỦY</button>
                                <button type="submit" className="btn-confirm">XÁC NHẬN</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default UserProfile;
