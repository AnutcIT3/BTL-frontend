package com.Movie.Movie_ticket.config;

import com.Movie.Movie_ticket.entity.Movie;
import com.Movie.Movie_ticket.repository.MovieRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.time.LocalDateTime;
import java.util.List;

@Configuration
public class DataSeeder {

    @Bean
    CommandLineRunner initDatabase(MovieRepository repository) {
        return args -> {
            if (repository.count() == 0) { // Chỉ thêm nếu database đang trống
                Movie m1 = new Movie();
                m1.setTitle("Avatar: The Way of Water");
                m1.setDescription("Jake Sully lives with his newfound family formed on the extrasolar moon Pandora.");
                m1.setGenre("Sci-fi/Action");
                m1.setDuration_minutes(192);
                m1.setStatus("Showing");
                m1.setRelease_date(LocalDateTime.now());
                m1.setPoster_url("https://image.tmdb.org/t/p/w500/t6SnaZYpMv6pS3CAp1o7v1u6o6o.jpg");

                Movie m2 = new Movie();
                m2.setTitle("Dune: Part Two");
                m2.setDescription("Paul Atreides unites with Chani and the Fremen while on a warpath of revenge.");
                m2.setGenre("Adventure/Sci-fi");
                m2.setDuration_minutes(166);
                m2.setStatus("Coming Soon");
                m2.setRelease_date(LocalDateTime.now().plusDays(10));
                m2.setPoster_url("https://image.tmdb.org/t/p/w500/czembS0RREv2PpepWXYYnuCSTv6.jpg");

                repository.saveAll(List.of(m1, m2));
                System.out.println("Data Seeding: Đã thêm phim mẫu thành công!");
            }
        };
    }
}