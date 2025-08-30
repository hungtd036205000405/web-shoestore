package com.example.shoestore.controller;

import com.example.shoestore.dto.request.AddToCartRequest;
import com.example.shoestore.dto.request.UpdateCartRequest;
import com.example.shoestore.dto.response.CartResponse;
import com.example.shoestore.service.CartService;
import jakarta.validation.constraints.Min;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/cart")
@RequiredArgsConstructor
public class CartController {
    private final CartService cartService;

    //  Thêm sản phẩm vào giỏ
    @PostMapping("/{userId}/add")
    public ResponseEntity<CartResponse> addToCart(
            @PathVariable Long userId,
            @RequestBody AddToCartRequest request) {
        return ResponseEntity.ok(cartService.addToCart(userId, request));
    }

    //  Lấy giỏ hàng của user
    @GetMapping("/{userId}")
    public ResponseEntity<CartResponse> getCart(@PathVariable Long userId) {
        CartResponse cartResponse = cartService.getCart(userId);
        return ResponseEntity.ok(cartResponse);
    }

    //  Cập nhật số lượng sản phẩm trong giỏ
    @PutMapping("/{userId}/update")
    public ResponseEntity<CartResponse> updateCartItem(
            @PathVariable Long userId,
            @RequestBody UpdateCartRequest request) {
        return ResponseEntity.ok(cartService.updateCartItem(userId, request));
    }

    //  Xóa 1 sản phẩm khỏi giỏ
    @DeleteMapping({
            "/{userId}/remove/{productId}",
            "/{userId}/remove/{productId}/"  // Chấp nhận cả URL có dấu / cuối
    })
    public ResponseEntity<CartResponse> removeCartItem(
            @PathVariable Long userId,
            @PathVariable @Min(1) Long productId) {
        System.out.println("Removing product " + productId + " from cart of user " + userId); // Log để debug
        return ResponseEntity.ok(cartService.removeCartItem(userId, productId));
    }

    //  Xóa toàn bộ giỏ hàng (tuỳ chọn)
    @DeleteMapping("/{userId}/clear")
    public ResponseEntity<CartResponse> clearCart(@PathVariable Long userId) {
        return ResponseEntity.ok(cartService.clearCart(userId));
    }
}