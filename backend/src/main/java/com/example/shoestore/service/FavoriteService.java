package com.example.shoestore.service;

import com.example.shoestore.dto.response.FavoritesResponse;
import com.example.shoestore.entity.Favorite;
import com.example.shoestore.entity.Product;
import com.example.shoestore.entity.User;
import com.example.shoestore.mapper.FavoriteMapper;
import com.example.shoestore.repository.FavoriteRepository;
import com.example.shoestore.repository.ProductRepository;
import com.example.shoestore.repository.UserRepository;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional
public class FavoriteService {

    private final FavoriteRepository favoriteRepository;
    private final UserRepository userRepository;
    private final ProductRepository productRepository;
    private final FavoriteMapper favoriteMapper;

    public List<FavoritesResponse> getFavoritesByUserId(Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        return favoriteMapper.mapToFavoritesResponseList(
                favoriteRepository.findByUser(user)
        );
    }


    public FavoritesResponse addFavorite(Long userId, Long productId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new RuntimeException("Product not found"));

        if (favoriteRepository.existsByUserAndProduct(user, product)) {
            throw new RuntimeException("This product is already in favorites");
        }

        Favorite favorite = new Favorite();
        favorite.setUser(user);
        favorite.setProduct(product);

        Favorite saved = favoriteRepository.save(favorite);
        return favoriteMapper.mapToFavoritesResponse(saved);
    }


    public void removeFavorite(Long userId, Long productId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new RuntimeException("Product not found"));

        favoriteRepository.deleteByUserAndProduct(user, product);
    }
}
