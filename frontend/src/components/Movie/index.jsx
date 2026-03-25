import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Movie = () => {
    const [movies, setMovies] = useState([]);

    useEffect(() => {
        // Gọi API từ Spring Boot
        axios.get('http://localhost:8080/api/movies')
            .then(response => {
                setMovies(response.data); // Lưu dữ liệu vào state
            })
            .catch(error => {
                console.error("Lỗi khi lấy dữ liệu phim:", error);
            });
    }, []);

    return (
        <div>
            
            <h1>Danh sách phim</h1>
            <div className="movie-grid">
                {movies.map(movie => (
                <div key={movie.movie_id} className="movie-card">
                {/* Chỉ để lại một thẻ img chuẩn và bọc trong link trailer */}
                 <a href={movie.trailer_url} target="_blank" rel="noopener noreferrer">
                  <img 
                    src={new URL(`../../assets/${movie.poster_url}`, import.meta.url).href}
                    alt={movie.title}
                    onError={(e) => { e.target.src = 'https://via.placeholder.com/200x300?text=No+Image'; }} 
                  />
                 </a> 
                 <h3>{movie.title}</h3>
                 <p>{movie.genre}</p>
                 <button className="btn-buy">Đặt vé ngay</button>
                 </div>
                ))}
            </div>
        </div>
    );
};

export default Movie;