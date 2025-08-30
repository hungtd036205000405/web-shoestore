package com.example.shoestore.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

@Data
@AllArgsConstructor
@Builder
public class CartDetailResponse {
    private Long cartDetailId;
    private Long productId;
    private String productName;
    private Double price;
    private Integer quantity;
    private String size;
    private String imageUrl;
    private Integer maxStock; // Số lượng tối đa có thể mua
}

