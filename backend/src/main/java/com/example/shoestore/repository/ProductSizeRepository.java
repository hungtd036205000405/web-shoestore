package com.example.shoestore.repository;

import com.example.shoestore.entity.ProductSize;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface ProductSizeRepository extends JpaRepository<ProductSize, Long> {
    Optional<ProductSize> findByProductIdAndSize(Long productId, String size);

    List<ProductSize> findByProductId(Long productId);
}
