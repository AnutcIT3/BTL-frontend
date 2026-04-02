import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Clock, Tag, Globe, PlayCircle, MapPin, CalendarDays, User, Users } from 'lucide-react';
import './MovieDetailStyle.css';

const MovieDetailPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [movie, setMovie] = useState(null);
    const [loading, setLoading] = useState(true);
    const [showTrailer, setShowTrailer] = useState(false);

    // ==========================================
    // MOCK DATA: DỮ LIỆU LỊCH CHIẾU (Có số lượng ghế)
    // ==========================================
    const mockShowtimes = {
        "Hà Nội": {
            "KOF Cinema Cầu Giấy": {
                "05/04/2026": [
                    { time: "09:30", available: 120 },
                    { time: "13:15", available: 85 },
                    { time: "16:45", available: 12 }, 
                    { time: "20:00", available: 0 }   // Hết vé
                ],
                "06/04/2026": [
                    { time: "10:00", available: 140 },
                    { time: "14:30", available: 90 },
                    { time: "19:00", available: 45 }
                ]
            },
            "KOF Cinema Giải Phóng": {
                "05/04/2026": [
                    { time: "08:45", available: 100 },
                    { time: "12:00", available: 110 }
                ]
            }
        },
        "TP. Hồ Chí Minh": {
            "KOF Cinema Quận 1": {
                "05/04/2026": [
                    { time: "11:00", available: 120 }
                ]
            }
        }
    };

    const [selectedCity, setSelectedCity] = useState("Hà Nội");
    const [selectedCinema, setSelectedCinema] = useState("");
    const [selectedDate, setSelectedDate] = useState("");

    useEffect(() => {
        const cinemasInCity = Object.keys(mockShowtimes[selectedCity] || {});
        if (cinemasInCity.length > 0) {
            setSelectedCinema(cinemasInCity[0]);
        } else {
            setSelectedCinema("");
        }
    }, [selectedCity]);

    useEffect(() => {
        if (selectedCity && selectedCinema && mockShowtimes[selectedCity][selectedCinema]) {
            const datesInCinema = Object.keys(mockShowtimes[selectedCity][selectedCinema]);
            if (datesInCinema.length > 0) {
                setSelectedDate(datesInCinema[0]);
            } else {
                setSelectedDate("");
            }
        }
    }, [selectedCinema, selectedCity]);

    const availableCities = Object.keys(mockShowtimes);
    const availableCinemas = mockShowtimes[selectedCity] ? Object.keys(mockShowtimes[selectedCity]) : [];
    const availableDates = (mockShowtimes[selectedCity] && mockShowtimes[selectedCity][selectedCinema]) 
                            ? Object.keys(mockShowtimes[selectedCity][selectedCinema]) : [];
    const availableTimes = (mockShowtimes[selectedCity] && mockShowtimes[selectedCity][selectedCinema] && mockShowtimes[selectedCity][selectedCinema][selectedDate])
                            ? mockShowtimes[selectedCity][selectedCinema][selectedDate] : [];

    useEffect(() => {
        axios.get(`http://localhost:8080/api/movies/${id}`)
            .then(response => {
                setMovie(response.data);
                setLoading(false);
            })
            .catch(error => {
                console.error("Lỗi lấy chi tiết phim:", error);
                setLoading(false);
            });
    }, [id]);

    const getPosterUrl = (posterUrl) => {
        if (!posterUrl) return 'https://via.placeholder.com/300x450?text=No+Image';
        try {
            return new URL(`../../assets/${posterUrl}`, import.meta.url).href;
        } catch (e) {
            return 'https://via.placeholder.com/300x450?text=Error';
        }
    };

    const getEmbedUrl = (url) => {
        if (!url) return null;
        const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
        const match = url.match(regExp);
        return (match && match[2].length === 11) ? `https://www.youtube.com/embed/${match[2]}?autoplay=1` : null;
    };

    if (loading) return <h2 style={{ textAlign: 'center', marginTop: '100px' }}>Đang tải thông tin phim...</h2>;
    if (!movie) return <h2 style={{ textAlign: 'center', marginTop: '100px' }}>Không tìm thấy phim này!</h2>;

    return (
        <div className="movie-detail-container">
            <button className="btn-back" onClick={() => navigate(-1)}>
                &laquo; Quay lại
            </button>
            
            <div className="detail-wrapper">
                <div className="detail-left">
                    <img src={getPosterUrl(movie.poster_url)} alt={movie.title} className="detail-poster" />
                </div>

                <div className="detail-right">
                    <h1 className="detail-title">{movie.title}</h1>
                    <div className="detail-meta-group">
                        <span className={`detail-age-badge ${movie.age_rating}`}>{movie.age_rating || 'P'}</span>
                        <span className="meta-item"><Clock size={18}/> {movie.duration} phút</span>
                        <span className="meta-item"><Tag size={18}/> {movie.genre}</span>
                        <span className="meta-item"><Globe size={18}/> {movie.language}</span>
                    </div>

                    <div className="detail-crew">
                        <p><User size={18}/> <b>Đạo diễn:</b> {movie.director || "Đang cập nhật"}</p>
                        <p><Users size={18}/> <b>Diễn viên:</b> {movie.actors || "Đang cập nhật"}</p>
                    </div>

                    <div className="detail-description">
                        <h3>Nội dung phim:</h3>
                        <p>{movie.description || "Đang cập nhật nội dung..."}</p>
                    </div>

                    <div className="detail-action-buttons">
                        <button className="btn-watch-trailer-full" onClick={() => setShowTrailer(true)}>
                            <PlayCircle size={22} /> XEM TRAILER
                        </button>
                    </div>
                </div>
            </div>

            {/* --- KHU VỰC LỊCH CHIẾU --- */}
            <div id="booking-section" className="booking-future-section">
                <h2><CalendarDays size={24}/> LỊCH CHIẾU PHIM</h2>
                
                <div className="booking-filters">
                    <div className="filter-group">
                        <MapPin size={18} color="#6A1B24"/>
                        <select className="filter-select" value={selectedCity} onChange={(e) => setSelectedCity(e.target.value)}>
                            {availableCities.map(city => <option key={city} value={city}>{city}</option>)}
                        </select>
                    </div>
                    
                    <div className="filter-group">
                        <select className="filter-select" value={selectedCinema} onChange={(e) => setSelectedCinema(e.target.value)}>
                            {availableCinemas.length > 0 ? availableCinemas.map(cinema => <option key={cinema} value={cinema}>{cinema}</option>) : <option value="">Không có rạp</option>}
                        </select>
                    </div>

                    <div className="filter-group">
                        <select className="filter-select" value={selectedDate} onChange={(e) => setSelectedDate(e.target.value)}>
                            {availableDates.length > 0 ? availableDates.map(date => <option key={date} value={date}>{date}</option>) : <option value="">Chưa có lịch chiếu</option>}
                        </select>
                    </div>
                </div>

                <div className="showtime-container">
                    <h4 className="cinema-name">{selectedCinema || "Vui lòng chọn rạp"}</h4>
                    
                    <div className="time-slots">
                        {availableTimes.length > 0 ? (
                            availableTimes.map((slot, index) => (
                                <button 
                                    key={index} 
                                    className={`time-btn-wrapper ${slot.available === 0 ? 'sold-out' : ''}`}
                                    disabled={slot.available === 0}
                                    onClick={() => navigate('/seat-selection', { 
                                        state: { movie, cinema: selectedCinema, date: selectedDate, time: slot.time } 
                                    })}
                                >
                                    <span className="time-text">{slot.time}</span>
                                    <span className="seat-text">
                                        {slot.available === 0 ? 'Hết vé' : `${slot.available} ghế trống`}
                                    </span>
                                </button>
                            ))
                        ) : (
                            <p style={{ color: '#666', fontStyle: 'italic' }}>Không có suất chiếu nào phù hợp.</p>
                        )}
                    </div>
                </div>
            </div>

            {/* MODAL TRAILER */}
            {showTrailer && (
                <div className="trailer-modal-overlay" onClick={() => setShowTrailer(false)}>
                    <div className="beta-modal-content" onClick={(e) => e.stopPropagation()}>
                        <div className="modal-header">
                            <h2>TRAILER - {movie.title?.toUpperCase()}</h2>
                            <button className="beta-close-btn" onClick={() => setShowTrailer(false)}>&times;</button>
                        </div>
                        <div className="video-wrapper">
                            <iframe
                                src={getEmbedUrl(movie.trailer_url)}
                                title="YouTube video player"
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                            ></iframe>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default MovieDetailPage;