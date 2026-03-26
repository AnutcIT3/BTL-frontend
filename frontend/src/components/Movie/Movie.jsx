import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './style.css'; 

const Movie = () => {
    const [movies, setMovies] = useState([]);
    const [activeTab, setActiveTab] = useState(1); // 1: Đang chiếu, 2: Sắp chiếu

    useEffect(() => {
        // Gọi API từ Spring Boot
        axios.get('http://localhost:8080/api/movies')
            .then(response => {
                setMovies(response.data);
            })
            .catch(error => {
                console.error("Lỗi khi lấy dữ liệu phim:", error);
            });
    }, []);

    // Lọc phim dựa trên tab và status trong database
    const filteredMovies = movies.filter(movie => {
        if (activeTab === 1) return movie.status === 'NOW_SHOWING';
        if (activeTab === 2) return movie.status === 'COMING_SOON';
        return false;
    });

    return (
        <div className="movie-section">
            {/* Hệ thống Tab */}
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

            {/* Lưới hiển thị phim */}
            <div className="movie-grid">
                {filteredMovies.map(movie => (
                    <div key={movie.movie_id} className="movie-card">
                        <a href={movie.trailer_url} target="_blank" rel="noopener noreferrer">
                            <img 
                                src={new URL(`../../assets/${movie.poster_url}`, import.meta.url).href}
                                alt={movie.title}
                                onError={(e) => { e.target.src = 'https://via.placeholder.com/200x300?text=No+Image'; }}
                            />
                        </a>
                        <h3>{movie.title}</h3>
                        <p>{movie.genre}</p>
                        <button className="btn-buy">MUA VÉ</button>
                    </div>
                ))}
            </div>
            
            {filteredMovies.length === 0 && <p>Hiện chưa có phim trong mục này.</p>}
        </div>
    );
};

export default Movie;