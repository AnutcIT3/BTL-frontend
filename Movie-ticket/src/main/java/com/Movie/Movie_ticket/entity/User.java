package com.Movie.Movie_ticket.entity;

import java.math.BigDecimal;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "[User]") // 'User' là từ khóa nhạy cảm trong SQL Server nên để trong ngoặc []
@Getter @Setter @NoArgsConstructor @AllArgsConstructor
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long user_id;

    @Column(columnDefinition = "NVARCHAR(100)")
    private String full_name;

    @Column(unique = true)
    private String email;

    private String password;
    private String role;
    private String phone;
    @Column(name = "total_balance", precision = 15, scale = 2)
    private BigDecimal total_balance = BigDecimal.ZERO;
}
