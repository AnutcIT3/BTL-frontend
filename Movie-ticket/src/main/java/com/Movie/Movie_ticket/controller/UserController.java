package com.Movie.Movie_ticket.controller;
import com.Movie.Movie_ticket.entity.User;
import com.Movie.Movie_ticket.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = "http://localhost:5173")
public class UserController {
    @Autowired
    private UserRepository userRepository;

    @GetMapping
    public List<User> getAllUser() {
        return userRepository.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<User> getUser(@PathVariable Long id) {
        return userRepository.findById(id)
            .map(user -> ResponseEntity.ok(user)) 
            .orElse(ResponseEntity.notFound().build()); 
    }


    @PostMapping
    public User createMovie(@RequestBody User user) {
        return userRepository.save(user);
    }
}
