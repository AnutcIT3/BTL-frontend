import React, { useState } from 'react';
import './style.css';
import Thooi from '../../assets/Thỏ_ơi.webp'
import Tai from '../../assets/Tài_poster.jpg'
import Doraemon45 from '../../assets/Doraemon45.webp'
import QNT from '../../assets/QNT.jpg'
import CONDTCT from '../../assets/CONDTCT.jpg'
import MP from '../../assets/Mui_Pho.webp'

function MovieList() {
  // tab = 1: Phim đang chiếu, tab = 2: Phim sắp chiếu
  const [activeTab, setActiveTab] = useState(1);

  // Thêm thuộc tính trailer vào mỗi đối tượng phim
  const moviesPlaying = [
    { 
      id: 1, 
      title: "Tài", 
      img: Tai, 
      trailer: "https://www.youtube.com/watch?v=HyaRaYwgQ-A" // Link trailer riêng cho phim Tài
    },
    { 
      id: 2, 
      title: "Thỏ ơi", 
      img: Thooi, 
      trailer: "https://www.youtube.com/watch?v=XMv1Zhj5TQg" 
    },
    {
      id: 3,
      title:"Quỷ nhập tràng",
      img: QNT,
      trailer: "https://www.youtube.com/watch?v=zO18gS2BDfw"
    },
    {
      id: 4,
      title:"Cảm ơn người đã thức cùng tôi",
      img: CONDTCT,
      trailer: "https://www.youtube.com/watch?v=uf2oOeJ-Z3s&list=RDuf2oOeJ-Z3s&start_radio=1"
    },
    {
      id: 5,
      title:"Mùi Phở",
      img: MP,
      trailer: "https://www.youtube.com/watch?v=7L5qkIkkcY8"
    }
  ];

  const moviesComing = [
    { 
      id: 3, 
      title: "Doraemon movie 45", 
      img: Doraemon45, 
      trailer: "https://www.youtube.com/watch?v=Ví_dụ_link_Doraemon" 
    },
    { 
      id: 4, 
      title: "Phim Sắp Chiếu 2", 
      img: "https://via.placeholder.com/200x300", 
      trailer: "https://www.youtube.com/watch?v=abcxyz" 
    },
  ];

  // Chọn danh sách hiển thị dựa trên tab đang active
  const currentMovies = activeTab === 1 ? moviesPlaying : moviesComing;

  return (
    <div className="movie-section">
      <div className="tab-container">
        <button 
          className={activeTab === 1 ? "tab-btn active" : "tab-btn"} 
          onClick={() => setActiveTab(1)}
        >
          PHIM ĐANG CHIẾU
        </button>
        <button 
          className={activeTab === 2 ? "tab-btn active" : "tab-btn"} 
          onClick={() => setActiveTab(2)}
        >
          PHIM SẮP CHIẾU
        </button>
      </div>

      <div className="movie-grid">
        {currentMovies.map(movie => (
          <div key={movie.id} className="movie-card">
            {/* Gán link trailer động từ dữ liệu của từng phim */}
            <a href={movie.trailer} target="_blank" rel="noopener noreferrer">
              <img src={movie.img} alt={movie.title}/>
            </a>
            <h3>{movie.title}</h3>
            <button className="btn-buy">MUA VÉ</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MovieList;