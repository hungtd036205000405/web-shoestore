package com.example.shoestore.dto.response;

import jakarta.persistence.Column;
import lombok.*;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ProductResponse {
    private Long id;

    private String name;
    private double price;
    private String imageUrl;

    // Thêm các trường mới
    @Column(nullable = false)// Không cho phép giá trị null
    private int quantity;  // Số lượng tồn kho

    @Column(columnDefinition = "TEXT", nullable = false)
    private String description;  // Mô tả chi tiết sản phẩm


    @Column(name = "inStock", nullable = false)
    private boolean inStock;  // Còn hàng hay không (tính từ quantity)

    private CategoryResponse category;

    // Thêm giảm giá %
    private Double discountPercent;

    private Double finalPrice;

    // Danh sách size và stock chi tiết
    private List<ProductSizeResponse> sizes;
}
