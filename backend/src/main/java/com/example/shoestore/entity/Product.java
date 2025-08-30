package com.example.shoestore.entity;

import jakarta.persistence.*;
import lombok.*;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "products")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Product {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    private Double price;

    private String imageUrl;

    // Tổng số lượng tất cả size (dùng cho các API khác)
    @Column(nullable = false)
    private int quantity;

    @Column(columnDefinition = "TEXT", nullable = false)
    private String description;

    // Có hàng hay không (dựa theo quantity hoặc stock các size)
    @Column(nullable = false)
    private boolean inStock;

    @ManyToOne
    @JoinColumn(name = "category_id")
    private Category category;

    // Thêm cột giảm giá %
    @Column(name = "discount_percent", columnDefinition = "DOUBLE DEFAULT 0")
    private Double discountPercent;


    // Danh sách size và stock
    @OneToMany(mappedBy = "product", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<ProductSize> sizes = new ArrayList<>();


}
