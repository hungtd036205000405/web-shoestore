package com.example.shoestore.service;

import com.example.shoestore.dto.response.DailyRevenueResponse;
import com.example.shoestore.dto.response.TopProductResponse;
import com.example.shoestore.repository.OrderDetailRepository;
import com.example.shoestore.repository.OrderRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class AdminStatisticService {
    private final OrderDetailRepository orderDetailRepository;
    private final OrderRepository orderRepository;

    public List<TopProductResponse> getTopSellingProducts(int limit) {
        return orderDetailRepository.findTopSellingProducts(PageRequest.of(0, limit))
                .stream()
                .map(obj -> new TopProductResponse(
                        (Long) obj[0],        // productId
                        (String) obj[1],      // productName
                        (Long) obj[2]         // totalSold
                ))
                .collect(Collectors.toList());
    }

    // Tổng doanh thu
    public Double getTotalRevenue() {
        return Optional.ofNullable(orderRepository.getTotalRevenue()).orElse(0.0);
    }

    // Doanh thu theo khoảng thời gian
    public List<DailyRevenueResponse> getDailyRevenue(LocalDate start, LocalDate end) {
        LocalDateTime startDateTime = start.atStartOfDay();
        LocalDateTime endDateTime = end.atTime(23, 59, 59);

        List<Object[]> results = orderRepository.findDailyRevenueBetween(startDateTime, endDateTime);

        return results.stream()
                .map(row -> new DailyRevenueResponse(
                        row[0].toString(),  // date
                        (Double) row[1]     // revenue
                ))
                .collect(Collectors.toList());
    }

    // Doanh thu theo sản phẩm
    public List<TopProductResponse> getRevenueByProduct(int limit) {
        return orderDetailRepository.findRevenueByProduct(PageRequest.of(0, limit))
                .stream()
                .map(obj -> new TopProductResponse(
                        (Long) obj[0],
                        (String) obj[1],
                        (Long) ((Double) obj[2]).longValue()
                ))
                .collect(Collectors.toList());
    }

}

