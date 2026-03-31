package com.Movie.Movie_ticket.entity;

import jakarta.persistence.*;
import lombok.*;
import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;

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
    @JsonIgnore
    private Movie movie;

    @OneToMany(mappedBy = "showtime", cascade = CascadeType.ALL)
    private List<Ticket> tickets;

    // @ManyToOne(fetch = FetchType.LAZY)
    // @JoinColumn(name = "room_id") // Tên cột khóa ngoại trong DB
    // @JsonBackReference // Ngăn đệ quy JSON khi gọi từ Room -> Showtime -> Room
    // private Room room;

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
