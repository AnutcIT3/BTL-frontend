package com.Movie.Movie_ticket.entity;

import jakarta.persistence.*;
import lombok.Data;
import java.math.BigDecimal;
import java.time.LocalDateTime;

import com.fasterxml.jackson.annotation.JsonBackReference;

@Entity
@Data
@Table(name = "Ticket")
public class Ticket {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String seatNumber; // Ví dụ: A1, B5
    private BigDecimal price;
    private String status; // "PENDING", "PAID", "CANCELLED"
    private String transactionId; // Lưu mã giao dịch từ ví Cardano
    private LocalDateTime bookingTime;

    @ManyToOne
    @JoinColumn(name = "movie_id")
    private Movie movie;

    @ManyToOne
    @JoinColumn(name = "showtime_id")
    private Showtime showtime;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    // @ManyToOne(fetch = FetchType.LAZY)
    // @JoinColumn(name = "seat_id") // Tên cột khóa ngoại trong bảng MySQL
    // @JsonBackReference // Ngăn lỗi lặp vô tận JSON
    // private Seat seat;
    
    public Showtime getShowtime(){
        return showtime;
    }

}