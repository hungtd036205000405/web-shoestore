package com.example.shoestore.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "product_sizes",
        uniqueConstraints = @UniqueConstraint(columnNames = {"product_id", "size"}))
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ProductSize {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String size;   // ví dụ: "38", "39", "40"
    private int stock;     // tồn kho cho size này

    @ManyToOne
    @JoinColumn(name = "product_id", nullable = false)
    private Product product;
}
