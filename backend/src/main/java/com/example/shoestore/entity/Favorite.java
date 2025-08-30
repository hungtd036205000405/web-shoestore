package com.example.shoestore.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "favorites",
        uniqueConstraints = @UniqueConstraint(name = "uk_user_product_favorite", columnNames = {"user_id", "product_id"}))
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Favorite {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;


    // Người dùng yêu thích sản phẩm nào
    // Chỉ cần lưu user_id và product_id là đủ
    // ManytoOne nghĩa là một người dùng có thể yêu thích nhiều sản phẩm
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    // ManytoOne nghĩa là một sản phẩm có thể được nhiều người dùng yêu thích
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "product_id", nullable = false)
    private Product product;
}