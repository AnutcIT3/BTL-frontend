package com.Movie.Movie_ticket.controller;

import com.Movie.Movie_ticket.dto.LoginRequest;
import com.Movie.Movie_ticket.dto.LoginResponse;
import com.Movie.Movie_ticket.entity.User;
import com.Movie.Movie_ticket.repository.UserRepository;
import com.Movie.Movie_ticket.service.JwtService;
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

    @Autowired
    private JwtService jwtService;

    @GetMapping
    public List<User> getAllUser() {
        return userRepository.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<User> getUser(@PathVariable Long id) {
        return userRepository.findById(id)
            .map(ResponseEntity::ok)
            .orElse(ResponseEntity.notFound().build());
    }


    @PostMapping
    public User createMovie(@RequestBody User user) {
        return userRepository.save(user);
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest loginRequest) {
        return userRepository.findByEmailAndPassword(loginRequest.getEmail(), loginRequest.getPassword())
            .map(user -> {
                String token = jwtService.generateToken(user);
                LoginResponse loginResponse = new LoginResponse(
                    token,
                    user.getUser_id(),
                    user.getFull_name(),
                    user.getEmail(),
                    user.getRole()
                );
                return ResponseEntity.ok((Object) loginResponse);
            })
            .orElse(ResponseEntity.status(401).body("Sai email hoặc mật khẩu"));
    }
}
