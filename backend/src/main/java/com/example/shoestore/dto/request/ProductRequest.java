package com.example.shoestore.dto.request;

import lombok.*;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ProductRequest {
    private String name;
    private double price;
    private String imageUrl;
    private String description;
    private Long categoryId; // chỉ gửi id category từ FE

    // Thêm giảm giá %
    private Double discountPercent;
    // Danh sách size và số lượng tồn kho
    private List<ProductSizeRequest> sizes;
}
