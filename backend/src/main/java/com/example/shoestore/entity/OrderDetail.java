package com.example.shoestore.entity;

import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;

@Entity
@Table(name = "order_detail")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class OrderDetail {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)  // hoặc AUTO
    private Long id;


    // Đơn hàng nào
    @ManyToOne
    @JoinColumn(name = "order_id")
    private Order order;

    // Sản phẩm nào
    @ManyToOne
    @JoinColumn(name = "product_id")
    private Product product;

    private Double price;

    private Integer quantity; // Sẽ được SUM() → Long
}
