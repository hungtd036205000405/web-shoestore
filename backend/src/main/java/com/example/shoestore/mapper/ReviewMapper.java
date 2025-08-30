package com.example.shoestore.service;

import com.example.shoestore.dto.response.ProductResponse;
import com.example.shoestore.dto.response.ReviewResponse;
import com.example.shoestore.dto.response.UserResponse;
import com.example.shoestore.entity.Review;
public class ReviewMapper {
    public static ReviewResponse toReviewResponse(Review review) {
        return ReviewResponse.builder()
                .id(review.getId())
                .comment(review.getComment())
                .rating(review.getRating())
                .createdAt(review.getCreatedAt())
                .updatedAt(review.getUpdatedAt())
                .username(review.getUser().getUsername())
                .build();
    }
}
