package com.Movie.Movie_ticket.controller;

import com.Movie.Movie_ticket.entity.Movie;
import com.Movie.Movie_ticket.repository.MovieRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/movies")
@CrossOrigin(origins = "http://localhost:5173") // Cho phép React gọi API này
public class MovieController {

    @Autowired
    private MovieRepository movieRepository;

    // Lấy danh sách tất cả phim: http://localhost:8080/api/movies
    @GetMapping
    public List<Movie> getAllMovies() {
        return movieRepository.findAll();
    }

    // Thêm một bộ phim mới (dùng Postman để test)
    @PostMapping
    public Movie createMovie(@RequestBody Movie movie) {
        return movieRepository.save(movie);
    }
}
