package com.example.shoestore.service;
import com.example.shoestore.dto.response.ReviewResponse;
import com.example.shoestore.entity.Review;
import com.example.shoestore.entity.User;
import com.example.shoestore.entity.Product;
import com.example.shoestore.repository.ReviewRepository;
import com.example.shoestore.repository.UserRepository;
import com.example.shoestore.repository.ProductRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import com.example.shoestore.service.ReviewMapper;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class  ReviewService {

    private final ReviewRepository reviewRepository;
    private final UserRepository userRepository;
    private final ProductRepository productRepository;

    // Thêm hoặc cập nhật đánh giá
    public Review addOrUpdateReview(User user, Product product, int rating, String comment) {
        return reviewRepository.findByUserAndProduct(user, product)
                .map(existingReview -> {
                    existingReview.setRating(rating);
                    existingReview.setComment(comment);
                    return reviewRepository.save(existingReview);
                })
                .orElseGet(() -> {
                    Review review = Review.builder()
                            .user(user)
                            .product(product)
                            .rating(rating)
                            .comment(comment)
                            .build();
                    return reviewRepository.save(review);
                });
    }


    // Xoá đánh giá
    public void deleteReview(Long reviewId) {
        reviewRepository.deleteById(reviewId);
    }



    public List<ReviewResponse> getReviewsByProductId(Long productId) {
        return reviewRepository.findByProductId(productId).stream()
                .map(ReviewMapper::toReviewResponse)
                .collect(Collectors.toList());
    }




    // Lấy tất cả đánh giá của một người dùng
    public List<Review> getReviewsByUser(Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));
        return reviewRepository.findByUser(user);
    }
}
