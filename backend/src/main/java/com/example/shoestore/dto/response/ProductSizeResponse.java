package com.example.shoestore.dto.response;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ProductSizeResponse {
    private String size;   // VD: "36", "37", "38"
    private int stock;     // số lượng còn lại của size
}
