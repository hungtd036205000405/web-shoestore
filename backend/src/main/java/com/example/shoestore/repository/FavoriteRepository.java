package com.example.shoestore.repository;

import com.example.shoestore.entity.Favorite;
import com.example.shoestore.entity.Product;
import com.example.shoestore.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface FavoriteRepository extends JpaRepository<Favorite, Long> {
    // Tìm tất cả sản phẩm yêu thích của người dùng
    List<Favorite> findByUser(User user);

    // Tìm sản phẩm yêu thích của người dùng theo sản phẩm
    Optional<Favorite> findByUserAndProduct(User user, Product product);


    // Kiểm tra xem sản phẩm đã được yêu thích bởi người dùng hay chưa
    boolean existsByUserAndProduct(User user, Product product);

    // Xóa sản phẩm yêu thích của người dùng theo sản phẩm
    void deleteByUserAndProduct(User user, Product product);
}
