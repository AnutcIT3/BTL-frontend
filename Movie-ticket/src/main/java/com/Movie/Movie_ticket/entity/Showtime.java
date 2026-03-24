package com.Movie.Movie_ticket.entity;

import jakarta.persistence.*;
import lombok.*;
import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Data
@Table(name = "Showtime")
@Getter @Setter @NoArgsConstructor @AllArgsConstructor
public class Showtime {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long showtime_id;

    private LocalDateTime start_time;
    private LocalDateTime end_time;

    @Column(precision = 10, scale = 2)
    private BigDecimal price; // Decimal trong SQL Server tương ứng BigDecimal

    @ManyToOne
    @JoinColumn(name = "movie_id") // Khóa ngoại tới bảng Movie
    private Movie movie;
    public void setId(Long id) {
       this.showtime_id = id;
    }

    public Long getShowtime_id() {
        return showtime_id;
    }

    

    // Sau này bạn tạo thêm bảng Room thì thêm vào đây:
    // @ManyToOne
    // @JoinColumn(name = "room_id")
    // private Room room;
}
