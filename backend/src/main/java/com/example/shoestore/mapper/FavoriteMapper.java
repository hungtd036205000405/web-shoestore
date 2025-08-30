package com.example.shoestore.mapper;

import com.example.shoestore.dto.response.FavoritesResponse;
import com.example.shoestore.entity.Favorite;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.stream.Collectors;


@Component
@RequiredArgsConstructor
public class FavoriteMapper {

    private final ProductMapper productMapper;

    public FavoritesResponse mapToFavoritesResponse(Favorite favorite) {
        if (favorite == null) {
            return null;
        }

        return FavoritesResponse.builder()
                .id(favorite.getId())
                .userId(favorite.getUser() != null ? favorite.getUser().getId() : null)
                .product(favorite.getProduct() != null ? productMapper.toProductResponse(favorite.getProduct()) : null)
                .build();
    }

    public List<FavoritesResponse> mapToFavoritesResponseList(List<Favorite> favorites) {
        if (favorites == null) {
            return List.of();
        }

        return favorites.stream()
                .map(this::mapToFavoritesResponse)
                .collect(Collectors.toList());
    }

}