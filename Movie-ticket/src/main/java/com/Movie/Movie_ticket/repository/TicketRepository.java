package com.Movie.Movie_ticket.repository;

import com.Movie.Movie_ticket.entity.Ticket;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface TicketRepository extends JpaRepository<Ticket, Long> {

    // 1. Sửa t.user.user_id (vì trong User.java bạn đặt là user_id)
    @Query("SELECT t FROM Ticket t WHERE t.user.user_id = :userId")
    List<Ticket> findByUserId(@Param("userId") Long userId);

    // 2. Sửa seat_number thành seatNumber (khớp với Ticket.java)
    // Sửa t.showtime.showtime_id (vì trong Showtime.java bạn đặt là showtime_id)
    @Query("SELECT COUNT(t) > 0 FROM Ticket t WHERE t.showtime.showtime_id = :showtimeId AND t.seatNumber = :seatNumber")
    boolean existsByShowtimeIdAndSeatNumber(@Param("showtimeId") Long showtimeId, @Param("seatNumber") String seatNumber);
}