package com.Movie.Movie_ticket.repository;

import com.Movie.Movie_ticket.entity.Movie;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MovieRepository extends JpaRepository<Movie, Long> {
    // JpaRepository đã có sẵn các hàm save(), findAll(), findById()...
}