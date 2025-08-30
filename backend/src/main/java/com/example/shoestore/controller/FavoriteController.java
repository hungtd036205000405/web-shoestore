package com.example.shoestore.controller;

import com.example.shoestore.dto.response.FavoritesResponse;
import com.example.shoestore.service.FavoriteService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/favorites")
@RequiredArgsConstructor
public class FavoriteController {

    private final FavoriteService favoriteService;
    // API để quản lý danh sách yêu thích của người dùng
    @GetMapping("/{userId}")
    public ResponseEntity<List<FavoritesResponse>> getFavorites(@PathVariable Long userId) {
        return ResponseEntity.ok(favoriteService.getFavoritesByUserId(userId));
    }

    // API để thêm sản phẩm vào danh sách yêu thích
    @PostMapping("/{userId}/{productId}")
    public ResponseEntity<FavoritesResponse> addFavorite(@PathVariable Long userId,
                                                         @PathVariable Long productId) {
        return ResponseEntity.ok(favoriteService.addFavorite(userId, productId));
    }

    // API để xóa sản phẩm khỏi danh sách yêu thích
    @DeleteMapping("/{userId}/{productId}")
    public ResponseEntity<Void> removeFavorite(@PathVariable Long userId,
                                               @PathVariable Long productId) {
        favoriteService.removeFavorite(userId, productId);
        return ResponseEntity.noContent().build();
    }
}
