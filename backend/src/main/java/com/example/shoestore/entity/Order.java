package com.example.shoestore.entity;

import com.example.shoestore.enums.OrderStatus;
import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

@Entity
@Table(name = "orders")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Order {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)  // hoặc AUTO
    private Long id;


    // Đơn hàng của user nào
    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    // Danh sách chi tiết đơn hàng
    @OneToMany(mappedBy = "order", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<OrderDetail> orderDetails;


    private Double totalPrice;

    private LocalDateTime createdAt;

    @Enumerated(EnumType.STRING)
    private OrderStatus status; // NEW, PAID, SHIPPED, CANCELED
}
