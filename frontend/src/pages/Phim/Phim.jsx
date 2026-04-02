import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './style.css';

function Phim() {
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(true);

    // 1. Gọi API lấy dữ liệu toàn bộ phim
    useEffect(() => {
        axios.get('http://localhost:8080/api/movies')
            .then(response => {
                setMovies(response.data);
                setLoading(false);
            })
            .catch(error => {
                console.error("Lỗi khi lấy dữ liệu phim:", error);
                setLoading(false);
            });
    }, []);

    const handleWatchTrailer = (url) => {
        if (url) window.open(url, "_blank");
    };

    if (loading) return <div>Đang tải danh sách phim...</div>;

    return (
        <div className="phim-container">
            {/* 2. Hiển thị trực tiếp từ mảng movies lấy được từ API */}
            <div className="phim-grid">
                {movies.map((movie) => (
                    <div key={movie.movie_id} className="phim-card">
                        <div className="phim-img" onClick={() => handleWatchTrailer(movie.trailer_url)}>
                            <img 
                                // Nếu poster_url trong DB là link (http) thì dùng luôn, nếu là tên file thì lấy từ assets
                                src={movie.poster_url?.startsWith('http') 
                                    ? movie.poster_url 
                                    : new URL(`../../assets/${movie.poster_url}`, import.meta.url).href}
                                alt={movie.title}
                                onError={(e) => { 
                                    e.target.src = 'https://via.placeholder.com/200x300?text=No+Image'; 
                                }}
                            />
                            <div className="overlay">
                                <span className="play-icon">▶</span>
                                <p>Xem Trailer</p>
                            </div>
                            {movie.age_rating && (
                                <span className={`badge ${movie.age_rating}`}>{movie.age_rating}</span>
                            )}
                        </div>
                        
                        <div className="phim-info">
                            <h3>{movie.title}</h3>
                            <button className="btn-book">MUA VÉ</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Phim;