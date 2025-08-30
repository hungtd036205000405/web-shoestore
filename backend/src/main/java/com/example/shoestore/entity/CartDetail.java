package com.example.shoestore.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "cart_detail")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CartDetail {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)  // hoặc AUTO
    private Long id;


    // Giỏ hàng nào
    @ManyToOne
    @JoinColumn(name = "cart_id")
    private Cart cart;

    // Sản phẩm nào
    @ManyToOne
    @JoinColumn(name = "product_id")
    private Product product;// chứa tên sản phẩm , giá , số lượng

    // Số lượng
    @Column(name = "quantity", nullable = false)
    private int quantity;


    @ManyToOne
    @JoinColumn(name = "product_size_id")
    private ProductSize productSize;

}
