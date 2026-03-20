import React, { useState, useEffect } from 'react';
import { Lucid, Blockfrost } from 'lucid-cardano';
import './style.css';

function KhuyenMai() {
    const [lucid, setLucid] = useState(null);
    const [walletAddr, setWalletAddr] = useState("");
    const [loading, setLoading] = useState(false);
    const [connectedWalletName, setConnectedWalletName] = useState("");

    // 1. Khởi tạo Lucid với mạng Preview khi trang web load
    useEffect(() => {
        const initLucid = async () => {
            try {
                const l = await Lucid.new(
                    new Blockfrost(
                        "https://cardano-preview.blockfrost.io/api/v0", 
                        "previewYo2MqgqvZgJC8L6HW9p8YVnV2LYrVaSQ" // THAY BẰNG PROJECT ID CỦA BẠN TRÊN BLOCKFROST
                    ),
                    "Preview",
                );
                setLucid(l);
            } catch (err) {
                console.error("Lỗi khởi tạo Lucid:", err);
            }
        };
        initLucid();
    }, []);

    // 2. Hàm kết nối ví người dùng chọn
    const connectWallet = async (walletName) => {
        try {
            if (!window.cardano || !window.cardano[walletName]) {
                alert(`Máy tính của bạn chưa cài đặt ví ${walletName.toUpperCase()}!`);
                return;
            }
            const api = await window.cardano[walletName].enable();
            lucid.selectWallet(api);
            const addr = await lucid.wallet.address();
            
            setWalletAddr(addr);
            setConnectedWalletName(walletName);
            alert(`Đã kết nối thành công với ví ${walletName}!`);
        } catch (error) {
            console.error("Lỗi kết nối:", error);
            alert("Bạn đã từ chối kết nối ví.");
        }
    };

    // Hàm Hủy kết nối
    const disconnectWallet = () => {
        setWalletAddr("");
        setConnectedWalletName("");
        // Tùy chọn: nếu bạn muốn ép trình duyệt quên kết nối cũ hoàn toàn
        // có thể reload hoặc xóa session nếu cần, nhưng set state là đủ để quay về UI chọn ví.
        alert("Đã hủy kết nối ví.");
    };

    // 3. Logic gửi tADA tự động từ ví Admin
    async function claimReward() {
        if (!walletAddr) {
            alert("Vui lòng chọn và kết nối ví trước!");
            return;
        }

        try {
            setLoading(true);
            const rewardAmount = 5; // Số tADA tặng cố định (ví dụ 5 tADA)

            // CẢNH BÁO: Seed Phrase ví Admin nạp sẵn tiền Preview
            const adminSeed = "enable moment educate sense sponsor casual twist rapid almost announce allow floor slab imitate finger poem stool attack original pledge head physical demand alley"; 
            lucid.selectWalletFromSeed(adminSeed);

            // Tạo giao dịch gửi tiền cho người dùng đang kết nối
            const tx = await lucid.newTx()
                .payToAddress(walletAddr, { lovelace: BigInt(rewardAmount * 1000000) })
                .complete();

            const signedTx = await tx.sign().complete();
            const txHash = await signedTx.submit();

            alert(`🎉 Chúc mừng! Bạn đã nhận được ${rewardAmount} tADA từ Admin.\nTransaction Hash: ${txHash}`);
        } catch (error) {
            console.error("Lỗi giao dịch:", error);
            alert("Giao dịch thất bại! Hãy kiểm tra số dư ví Admin hoặc ID Blockfrost.");
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="promo-page">
            <section className="promo-hero">
                <div className="hero-content">
                    <h1>Sự Kiện Web3 Movie</h1>
                    
                    <div className="wallet-section">
                        {!walletAddr ? (
                            <div className="connect-group">
                                <h3>Bước 1: Chọn ví của bạn</h3>
                                <div className="wallet-buttons">
                                    <button onClick={() => connectWallet('eternl')} className="btn-wallet">
                                        Kết nối Eternl
                                    </button>
                                    <button onClick={() => connectWallet('nami')} className="btn-wallet nami">
                                        Kết nối Nami
                                    </button>
                                </div>
                            </div>
                        ) : (
                            <div className="reward-group">
                                <div className="status-box">
                                    <div className="status-header">
                                        <span className="dot"></span>
                                        <p>Đang dùng ví: <strong>{connectedWalletName}</strong></p>
                                        {/* Nút Hủy kết nối */}
                                        <button onClick={disconnectWallet} className="btn-disconnect">
                                            Hủy kết nối
                                        </button>
                                    </div>
                                    <small>{walletAddr.slice(0, 12)}...{walletAddr.slice(-8)}</small>
                                </div>
                                
                                <h3>Bước 2: Nhận quà tặng</h3>
                                <button 
                                    onClick={claimReward} 
                                    className="btn-claim" 
                                    disabled={loading}
                                >
                                    {loading ? "ĐANG XỬ LÝ..." : "NHẬN 5 tADA NGAY"}
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </section>
        </div>
    );
}

export default KhuyenMai;