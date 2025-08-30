package com.example.shoestore.repository;

import com.example.shoestore.entity.OrderDetail;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface OrderDetailRepository extends JpaRepository<OrderDetail, Long> {

    // Lấy top sản phẩm bán chạy kèm tên
    @Query("SELECT od.product.id, od.product.name, SUM(od.quantity) as totalSold " +
            "FROM OrderDetail od JOIN od.order o " +
            "WHERE o.status = 'NEW' " +
            "GROUP BY od.product.id, od.product.name " +
            "ORDER BY totalSold DESC")

    List<Object[]> findTopSellingProducts(Pageable pageable);
    // Query này đang lấy OrderStatus là NEW(mai sẽ đổi là COMPLETED) để lấy sản phẩm bán chạy nhất

    // Doanh thu theo sản phẩm
    @Query("SELECT od.product.id, od.product.name, SUM(od.price * od.quantity) as totalRevenue " +
            "FROM OrderDetail od JOIN od.order o " +
            "WHERE o.status = 'NEW' " +
            "GROUP BY od.product.id, od.product.name " +
            "ORDER BY totalRevenue DESC")
    List<Object[]> findRevenueByProduct(Pageable pageable);




}
