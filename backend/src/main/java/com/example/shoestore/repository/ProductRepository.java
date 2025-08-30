package com.example.shoestore.repository;
import com.example.shoestore.entity.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {
    List<Product> findByCategoryId(Long categoryId);

    @Query("SELECT p FROM Product p WHERE " +
            "(:name IS NULL OR LOWER(p.name) LIKE LOWER(CONCAT('%', :name, '%'))) AND " +
            "(:minPrice IS NULL OR p.price >= :minPrice) AND " +
            "(:maxPrice IS NULL OR p.price <= :maxPrice) AND " +
            "(:categoryId IS NULL OR p.category.id = :categoryId)")
    List<Product> searchProducts(@Param("name") String name,
                                 @Param("minPrice") Double minPrice,
                                 @Param("maxPrice") Double maxPrice,
                                 @Param("categoryId") Long categoryId);
//    Chức năng chính:
//
//    Tìm kiếm sản phẩm theo tên (không phân biệt hoa thường)
//    Lọc theo khoảng giá (giá tối thiểu và tối đa)
//    Lọc theo danh mục sản phẩm
}
