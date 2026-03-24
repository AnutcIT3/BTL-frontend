package com.Movie.Movie_ticket.controller;
import com.Movie.Movie_ticket.entity.Showtime;
import com.Movie.Movie_ticket.repository.ShowtimeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/showtimes")
@CrossOrigin(origins = "http://localhost:5173")
public class ShowtimeController {
    @Autowired
    private ShowtimeRepository showtimeRepository;

    @GetMapping("/movie/{movie_id}")
    public List<Showtime> getShowtimesByMovie(@PathVariable Long movieId) {
        return showtimeRepository.findByMovieIdCustom(movieId);
    }
}