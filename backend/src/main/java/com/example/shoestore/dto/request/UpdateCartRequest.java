package com.example.shoestore.dto.request;

import lombok.Data;

@Data
public class UpdateCartRequest {
    private Long productId;
    private int quantity;
    private String size;      // Size hiện tại trong giỏ
    private String newSize;
}
