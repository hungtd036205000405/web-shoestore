package com.example.shoestore.controller;

import com.example.shoestore.dto.request.ReviewRequest;
import com.example.shoestore.dto.response.ApiResponse;
import com.example.shoestore.dto.response.ReviewResponse;
import com.example.shoestore.entity.Review;
import com.example.shoestore.entity.User;
import com.example.shoestore.entity.Product;
import com.example.shoestore.service.ReviewService;
import com.example.shoestore.repository.UserRepository;
import com.example.shoestore.repository.ProductRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/reviews")
@RequiredArgsConstructor
public class ReviewController {

    private final ReviewService reviewService;
    private final UserRepository userRepository;
    private final ProductRepository productRepository;

    // Thêm hoặc update review
    @PostMapping
    public ResponseEntity<Review> addOrUpdateReview(@RequestBody ReviewRequest request) {
        User user = userRepository.findById(request.getUserId())
                .orElseThrow(() -> new RuntimeException("User not found"));
        Product product = productRepository.findById(request.getProductId())
                .orElseThrow(() -> new RuntimeException("Product not found"));

        Review review = reviewService.addOrUpdateReview(
                user,
                product,
                request.getRating(),
                request.getComment()
        );

        return ResponseEntity.ok(review);
    }

    // Lấy review theo sản phẩm
    @GetMapping("/product/{productId}")
    public ApiResponse<List<ReviewResponse>> getReviewsByProduct(@PathVariable Long productId) {
        return ApiResponse.success(reviewService.getReviewsByProductId(productId));
    }





    // Xóa review
    // Chỉ người dùng đã tạo review mới có quyền xóa
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteReview(@PathVariable Long id) {
        reviewService.deleteReview(id);
        return ResponseEntity.noContent().build();
    }




    // Lấy review theo user
    @GetMapping("/user/{userId}")
    public ResponseEntity<List<Review>> getReviewsByUser(@PathVariable Long userId) {
        return ResponseEntity.ok(reviewService.getReviewsByUser(userId));
    }
}
