package com.example.shoestore.repository;

import com.example.shoestore.entity.CartDetail;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Repository
public interface CartDetailRepository extends JpaRepository<CartDetail, Long> {
    Optional<CartDetail> findByCartIdAndProductIdAndProductSizeId(Long cartId, Long productId, Long productSizeId);
    List<CartDetail> findByCartId(Long cartId);

    // ✅ THÊM @Modifying và @Transactional
    @Modifying
    @Transactional
    @Query("DELETE FROM CartDetail cd WHERE cd.cart.id = :cartId")
    void deleteAllByCartId(@Param("cartId") Long cartId);

    // ✅ Hoặc có thể dùng derived query với @Modifying
    @Modifying
    @Transactional
    void deleteByCartId(Long cartId);
}