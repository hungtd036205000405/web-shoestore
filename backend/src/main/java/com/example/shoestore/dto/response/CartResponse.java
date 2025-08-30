// CartResponse.java
package com.example.shoestore.dto.response;

import com.example.shoestore.dto.response.CartDetailResponse;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

import java.util.List;

@Data
@AllArgsConstructor
@Builder
public class CartResponse {
    private Long cartId;
    private Long userId; // ✅ Đổi thành userId (chữ I hoa)
    private List<CartDetailResponse> cartDetails;
    private Double totalPrice;
    private Integer totalItems;
}
