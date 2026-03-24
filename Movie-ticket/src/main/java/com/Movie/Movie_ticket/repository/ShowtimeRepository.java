package com.Movie.Movie_ticket.repository;
import com.Movie.Movie_ticket.entity.Showtime;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import java.util.List;

@Repository
public interface ShowtimeRepository extends JpaRepository<Showtime, Long> {
    
    @Query("SELECT s FROM Showtime s WHERE s.movie.movie_id = :movieId")
    List<Showtime> findByMovieIdCustom(@Param("movieId") Long movieId);
}