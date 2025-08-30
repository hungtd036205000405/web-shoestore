package com.example.shoestore.repository;

import com.example.shoestore.entity.Review;
import com.example.shoestore.entity.Product;
import com.example.shoestore.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ReviewRepository extends JpaRepository<Review, Long> {
    List<Review> findByProductId(Long productId);

    List<Review> findByUser(User user);

    Optional<Review> findByUserAndProduct(User user, Product product);
}
