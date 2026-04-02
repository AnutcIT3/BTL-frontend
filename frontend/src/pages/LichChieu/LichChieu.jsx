import React, { useState, useEffect } from "react";
import axios from "axios";
import "./LichChieu.css";

const LichChieu = () => {
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Lấy danh sách phim (mỗi phim đã có sẵn danh sách showtimes bên trong)
        axios.get('http://localhost:8080/api/movies')
            .then(response => {
                setMovies(response.data);
                setLoading(false);
            })
            .catch(error => {
                console.error("Lỗi:", error);
                setLoading(false);
            });
    }, []);

    if (loading) return <div>Đang tải dữ liệu...</div>;

    return (
        <div className="lich-chieu-container">
            {movies.map((movie) => (
                // Chỉ hiển thị phim nếu phim đó có suất chiếu
                movie.showtimes && movie.showtimes.length > 0 && (
                    <div key={movie.movie_id} className="phim-row">
                        <div className="phim-poster-left">
                            <img 
                                src={movie.poster_url?.startsWith('http') 
                                    ? movie.poster_url 
                                    : new URL(`../../assets/${movie.poster_url}`, import.meta.url).href}
                                alt={movie.title}
                                onError={(e) => { e.target.src = 'https://via.placeholder.com/150x220?text=No+Image'; }}
                            />
                        </div>

                        <div className="phim-content-right">
                              <h3>{movie.title}</h3>
                            <p className="genre">Thể loại: {movie.genre}</p>
                            
                            <div className="showtimes-grid">
                                {movie.showtimes.map((st) => (
                                    <button key={st.showtime_id} className="st-time-btn">
                                        {new Date(st.start_time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                )
            ))}
        </div>
    );
};

export default LichChieu;
