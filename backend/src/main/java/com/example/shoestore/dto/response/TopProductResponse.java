package com.example.shoestore.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class TopProductResponse {
    private Long productId;
    private String productName;
    private Long totalSold;
}
