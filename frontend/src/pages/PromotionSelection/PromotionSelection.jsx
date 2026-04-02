import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import './PromotionStyle.css';
import KhuyenMai from '../KhuyenMai/Khuyenmai';

const PromotionSection = () => {
    // Data mới chuẩn đét của bro
    const mainPromo = { id: 1, title: 'HẸN EM - SONG HỶ - DEAL "NGON" KHỎI NGHĨ', img: 'promo-1.png' };
    
    const topPromos = [
        { id: 2, title: 'BÍNH NGỌ PHÁT TÀI - QUÀ TỚI LIỀN TAY', img: 'promo-2.png' },
        { id: 3, title: 'TUYỂN DỤNG PART-TIME TOÀN HỆ THỐNG', img: 'promo-3.png' }
    ];

    const bottomPromos = [
        { id: 4, title: 'ƯU ĐÃI ĐẶC QUYỀN CHO KHÁCH HÀNG THÀNH VIÊN BETA CINEMAS', img: 'promo-4.png' },
        { id: 5, title: 'MỲ LY THƠM NGON, XEM PHIM THÊM CUỐN', img: 'promo-5.png' },
        { id: 6, title: 'ĐẶT VÉ BETA CINEMAS, MOMO LIỀN! 🚀', img: 'promo-6.jpg' },
        { id: 7, title: 'BẠN MỚI, BẠN THÂN - BẠN NÀO CŨNG CÓ QUÀ', img: 'promo-7.png' },
        { id: 8, title: 'KOF CINEMA VÉ RẺ, VÀO MOMO MUA LIỀN!', img: 'promo-8.jpg' },
        { id: 9, title: 'SALE KHÔNG NGỪNG - MỪNG "MAD SALE DAY"', img: 'promo-9.png' },
        { id: 10, title: 'GIÁ VÉ ƯU ĐÃI CHO HỌC SINH, SINH VIÊN', img: 'promo-10.png' },
    ];

    const [currentIndex, setCurrentIndex] = useState(0);
    const itemsToShow = 4;

    // Tiến lên (nhảy 4 cái, hết thì lộn về 0)
    const handleNext = () => {
        if (currentIndex + itemsToShow < bottomPromos.length) {
            setCurrentIndex(currentIndex + itemsToShow);
        } else {
            setCurrentIndex(0); 
        }
    };

    // Lùi lại (đang ở 0 thì lộn xuống trang cuối)
    const handlePrev = () => {
        if (currentIndex - itemsToShow >= 0) {
            setCurrentIndex(currentIndex - itemsToShow);
        } else {
            const remainder = bottomPromos.length % itemsToShow;
            const lastIndex = remainder === 0 
                ? bottomPromos.length - itemsToShow 
                : bottomPromos.length - remainder;
            setCurrentIndex(lastIndex);
        }
    };

    const getImgUrl = (imgName) => {
        try {
            return new URL(`../../assets/${imgName}`, import.meta.url).href;
        } catch (e) {
            return 'https://via.placeholder.com/500x300?text=KOF+Promo';
        }
    };

    return (
        <>
        <div className="promo-section-wrapper">
            <div className="promo-header-top">
                <h2 className="promo-title-main">KHUYẾN MÃI MỚI</h2>
            </div>

            <div className="promo-grid-top">
                <div className="promo-card-large">
                    <div className="promo-img-box">
                        <img src={getImgUrl(mainPromo.img)} alt="Main Promo" loading="lazy" />
                    </div>
                    <h3 className="promo-title-large">{mainPromo.title}</h3>
                </div>

                <div className="promo-grid-small">
                    {topPromos.map(item => (
                        <div key={item.id} className="promo-card-small">
                            <div className="promo-img-box">
                                <img src={getImgUrl(item.img)} alt={item.title} loading="lazy" />
                            </div>
                            <h3 className="promo-title-small">{item.title}</h3>
                        </div>
                    ))}
                </div>
            </div>

            <div className="promo-carousel-bottom">
                {/* Đã tháo disabled để nút Prev có thể lộn về trang cuối */}
                <button className="nav-arrow left" onClick={handlePrev}>
                    <ChevronLeft size={24} />
                </button>
                
                <div className="promo-list-row">
                    {bottomPromos.slice(currentIndex, currentIndex + itemsToShow).map(item => (
                        <div key={item.id} className="promo-card-small">
                            <div className="promo-img-box">
                                <img src={getImgUrl(item.img)} alt={item.title} loading="lazy" />
                            </div>
                            <h3 className="promo-title-small">{item.title}</h3>
                        </div>
                    ))}
                </div>

                {/* Đã tháo disabled để nút Next có thể lộn về 0 */}
                <button className="nav-arrow right" onClick={handleNext}>
                    <ChevronRight size={24} />
                </button>
            </div>
        </div>
        <KhuyenMai/>
        </>
    );
};

export default PromotionSection;