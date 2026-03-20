import React, { useState } from 'react';
import './style.css';

// Import các hình ảnh (Đảm bảo đường dẫn này đúng với thư mục của bạn)
import Thooi from '../../assets/Thỏ_ơi.webp';
import Tai from '../../assets/Tài_poster.jpg';
import Doraemon45 from '../../assets/Doraemon45.webp';
import QNT from '../../assets/QNT.jpg';
import CONDTCT from '../../assets/CONDTCT.jpg';
import MP from '../../assets/Mui_Pho.webp';

function Phim() {
  const [tab, setTab] = useState('dang-chieu');

  const danhSachPhim = {
    'dang-chieu': [
      { 
        id: 1, 
        title: "Phim Tài", 
        img: Tai, 
        phanLoai: "T18",
        trailer: "https://www.youtube.com/watch?v=HyaRaYwgQ-A" 
      },
      { 
        id: 2, 
        title: "Thỏ ơi", 
        img: Thooi, 
        phanLoai: "P",
        trailer: "https://www.youtube.com/watch?v=XMv1Zhj5TQg" 
      },
      {
        id: 3,
        title: "Quỷ nhập tràng",
        img: QNT,
        phanLoai: "T18",
        trailer: "https://www.youtube.com/watch?v=zO18gS2BDfw"
      },
      {
        id: 4,
        title: "Cảm ơn người đã thức cùng tôi",
        img: CONDTCT,
        phanLoai: "T13",
        trailer: "https://www.youtube.com/watch?v=uf2oOeJ-Z3s"
      },
      {
        id: 5,
        title: "Mùi Phở",
        img: MP,
        phanLoai: "P",
        trailer: "https://www.youtube.com/watch?v=7L5qkIkkcY8"
      }
    ],
    'sap-chieu': [
      { 
        id: 6, 
        title: "Doraemon movie 45", 
        img: Doraemon45, 
        phanLoai: "P",
        trailer: "https://www.youtube.com/watch?v=Ví_dụ_link_Doraemon" 
      },
      { 
        id: 7, 
        title: "Phim Sắp Chiêu 2", 
        img: "https://via.placeholder.com/200x300", 
        phanLoai: "T13",
        trailer: "https://www.youtube.com/watch?v=abcxyz" 
      },
    ]
  };

  // Hàm để mở Trailer
  const handleWatchTrailer = (url) => {
    if(url) window.open(url, "_blank");
  };

  return (
    <div className="phim-container">
      {/* Nút chuyển Tab */}
      <div className="phim-tabs">
        <button 
          className={tab === 'dang-chieu' ? 'active' : ''} 
          onClick={() => setTab('dang-chieu')}
        >
          ĐANG CHIẾU
        </button>
        <button 
          className={tab === 'sap-chieu' ? 'active' : ''} 
          onClick={() => setTab('sap-chieu')}
        >
          SẮP CHIẾU
        </button>
      </div>

      {/* Danh sách phim */}
      <div className="phim-grid">
        {danhSachPhim[tab].map((phim) => (
          <div key={phim.id} className="phim-card">
            <div className="phim-img" onClick={() => handleWatchTrailer(phim.trailer)}>
              <img src={phim.img} alt={phim.title} />
              {/* Lớp phủ khi hover để hiện nút xem trailer */}
              <div className="overlay">
                <span className="play-icon">▶</span>
                <p>Xem Trailer</p>
              </div>
              <span className={`badge ${phim.phanLoai}`}>{phim.phanLoai}</span>
            </div>
            
            <div className="phim-info">
              <h3>{phim.title}</h3>
              <button className="btn-book">MUA VÉ</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Phim;