package com.Movie.Movie_ticket.controller;
import com.Movie.Movie_ticket.entity.Showtime;
import com.Movie.Movie_ticket.repository.ShowtimeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/showtimes")
@CrossOrigin(origins = "http://localhost:5173")
public class ShowtimeController {
    @Autowired
    private ShowtimeRepository showtimeRepository;

    @GetMapping("/movies/{movie_id}")
    public List<Showtime> getShowtimesByMovie(@PathVariable Long movieId) {
        return showtimeRepository.findByMovieIdCustom(movieId);
    }
    @GetMapping
    public List<Showtime> getAllShowtimes(){
        return showtimeRepository.findAll();
    }
    @PostMapping
    public Showtime createShowtime(@RequestBody Showtime showtime) {
        return showtimeRepository.save(showtime);
    }
    @PutMapping("/{id}")
    public ResponseEntity<Showtime> updateShowtime(@PathVariable Long id, @RequestBody Showtime showtimeDetails) {
        Showtime showtime = showtimeRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Không tìm thấy suất chiếu có ID: " + id));

        // Cập nhật các trường dữ liệu
        showtime.setStart_time(showtimeDetails.getStart_time());
        showtime.setEnd_time(showtimeDetails.getEnd_time());
        showtime.setPrice(showtimeDetails.getPrice());
        
        // Nếu bạn truyền cả đối tượng movie để thay đổi phim của suất chiếu
        if (showtimeDetails.getMovie() != null) {
            showtime.setMovie(showtimeDetails.getMovie());
        }

        Showtime updatedShowtime = showtimeRepository.save(showtime);
        return ResponseEntity.ok(updatedShowtime);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteShowtime(@PathVariable Long id) {
        showtimeRepository.deleteById(id);
        return ResponseEntity.ok("Đã xóa suất chiếu thành công!");
    }
}