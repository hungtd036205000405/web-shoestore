package com.example.shoestore.controller;

import com.example.shoestore.dto.response.DailyRevenueResponse;
import com.example.shoestore.dto.response.TopProductResponse;
import com.example.shoestore.service.AdminStatisticService;
import lombok.RequiredArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/admin/statistics")
@RequiredArgsConstructor
public class AdminStatisticController {
    private final AdminStatisticService statisticService;

    @GetMapping("/products/top-selling")
    public ResponseEntity<List<TopProductResponse>> getTopSellingProducts(
            @RequestParam(defaultValue = "5") int limit) {
        return ResponseEntity.ok(statisticService.getTopSellingProducts(limit));
    }

    @GetMapping("/revenue/total")
    public ResponseEntity<Double> getTotalRevenue() {
        return ResponseEntity.ok(statisticService.getTotalRevenue());
    }

    @GetMapping("/revenue/daily")
    public ResponseEntity<List<DailyRevenueResponse>> getDailyRevenue(
            @RequestParam("start") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate start,
            @RequestParam("end") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate end) {
        return ResponseEntity.ok(statisticService.getDailyRevenue(start, end));
    }

    @GetMapping("/products/revenue")
    public ResponseEntity<List<TopProductResponse>> getRevenueByProduct(
            @RequestParam(defaultValue = "5") int limit) {
        return ResponseEntity.ok(statisticService.getRevenueByProduct(limit));
    }

    //====API thêm , sửa xóa sản phẩm, danh mục, người dùng, đơn hàng, giỏ hàng, bình luận====

}
