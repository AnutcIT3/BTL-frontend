package com.Movie.Movie_ticket.controller;

import com.Movie.Movie_ticket.entity.Ticket;
import com.Movie.Movie_ticket.repository.TicketRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("/api/tickets")
@CrossOrigin(origins = "http://localhost:5173")
public class TicketController {

    @Autowired
    private TicketRepository ticketRepository;

    // 1. Lấy tất cả vé (Dành cho Admin)
    @GetMapping
    public List<Ticket> getAllTickets() {
        return ticketRepository.findAll();
    }

    // 2. API Đặt vé mới
    @PostMapping("/book")
    public ResponseEntity<?> bookTicket(@RequestBody Ticket ticket) {
        // Kiểm tra xem ghế đã bị đặt chưa
        if (ticketRepository.existsByShowtimeIdAndSeatNumber(
                ticket.getShowtime().getShowtime_id(), ticket.getSeatNumber())) {
            return ResponseEntity.badRequest().body("Ghế này đã có người đặt!");
        }

        // Thiết lập các giá trị mặc định khi đặt vé
        ticket.setBookingTime(LocalDateTime.now());
        ticket.setStatus("PENDING"); // Chờ thanh toán qua Cardano

        Ticket savedTicket = ticketRepository.save(ticket);
        return ResponseEntity.ok(savedTicket);
    }

    // 3. Lấy lịch sử đặt vé của một User
    @GetMapping("/user/{userId}")
    public List<Ticket> getTicketsByUser(@PathVariable Long userId) {
        return ticketRepository.findByUserId(userId);
    }
}