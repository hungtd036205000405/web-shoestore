package com.example.shoestore.dto.request;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ProductSizeRequest {
    private String size;   // ví dụ: "38", "39", "40"
    private int stock;     // số lượng tồn kho cho size đó
}
