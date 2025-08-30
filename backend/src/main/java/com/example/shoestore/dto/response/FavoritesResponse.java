package com.example.shoestore.dto.response;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class FavoritesResponse {
    private Long id;
    private Long userId;
    private ProductResponse product;
}