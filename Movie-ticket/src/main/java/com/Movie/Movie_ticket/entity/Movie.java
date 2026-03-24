package com.Movie.Movie_ticket.entity;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;
import java.util.List;

@Entity
@Data
@Table(name = "Movie")
@Getter @Setter @NoArgsConstructor @AllArgsConstructor
public class Movie {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "movie_id")
    private Long movie_id;

    @Column(length = 255) 
    private String title;

    @Column(columnDefinition = "TEXT")
    private String description;

    private String age_rating;
    private LocalDateTime release_date;
    private Integer duration_minutes;
    private String genre;
    private String poster_url;
    private String trailer_url;
    private String status;

    // Quan hệ 1 Movie có nhiều Showtime (Lịch chiếu)
    @OneToMany(mappedBy = "movie", cascade = CascadeType.ALL)
    private List<Showtime> showtimes;
}
