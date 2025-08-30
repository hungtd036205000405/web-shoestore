package com.example.shoestore.repository;

import com.example.shoestore.entity.Order;
import com.example.shoestore.entity.OrderDetail;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.awt.print.Pageable;
import java.time.LocalDateTime;
import java.util.List;
@Repository
public interface OrderRepository extends JpaRepository<Order, Long> {

    // Tổng doanh thu
    @Query("SELECT SUM(o.totalPrice) FROM Order o WHERE o.status = 'NEW'")
    Double getTotalRevenue();

    // Doanh thu theo từng ngày trong khoảng thời gian
    @Query("SELECT DATE(o.createdAt) as date, SUM(o.totalPrice) as revenue " +
            "FROM Order o " +
            "WHERE o.status = 'NEW' AND o.createdAt BETWEEN :start AND :end " +
            "GROUP BY DATE(o.createdAt) " +
            "ORDER BY DATE(o.createdAt)")
    List<Object[]> findDailyRevenueBetween(@Param("start") LocalDateTime start,
                                           @Param("end") LocalDateTime end);

    // Đếm số đơn hàng theo trạng thái
    @Query("SELECT o.status, COUNT(o) FROM Order o GROUP BY o.status")
    List<Object[]> countOrdersByStatus();

    // Top khách hàng chi tiêu nhiều nhất
    @Query("SELECT o.user.id, o.user.username, SUM(o.totalPrice) as totalSpent " +
            "FROM Order o WHERE o.status = 'NEW' " +
            "GROUP BY o.user.id, o.user.username " +
            "ORDER BY totalSpent DESC")
    List<Object[]> findTopCustomers(Pageable pageable);
}