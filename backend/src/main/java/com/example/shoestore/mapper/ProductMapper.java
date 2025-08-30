package com.example.shoestore.mapper;

import com.example.shoestore.dto.response.CategoryResponse;
import com.example.shoestore.dto.response.ProductResponse;
import com.example.shoestore.dto.response.ProductSizeResponse;
import com.example.shoestore.entity.Product;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.stream.Collectors;

@Component
public class ProductMapper {

    public ProductResponse toProductResponse(Product product) {
        // Map danh sách size
        List<ProductSizeResponse> sizeResponses = product.getSizes() != null
                ? product.getSizes().stream()
                .map(size -> ProductSizeResponse.builder()
                        .size(size.getSize())
                        .stock(size.getStock())
                        .build())
                .collect(Collectors.toList())
                : List.of();

        // Tính giá cuối cùng sau khi giảm giá (nếu có)
        double finalPrice = product.getPrice();
        if (product.getDiscountPercent() != null && product.getDiscountPercent() > 0) {
            finalPrice = product.getPrice() * (1 - product.getDiscountPercent() / 100);
        }

        return ProductResponse.builder()
                .id(product.getId())
                .name(product.getName())
                .price(product.getPrice())
                .discountPercent(product.getDiscountPercent()) // thêm discount
                .finalPrice(finalPrice) // giá sau khi áp dụng discount
                .imageUrl(product.getImageUrl())
                .description(product.getDescription())
                .inStock(product.isInStock()) // dựa trên entity
                .category(product.getCategory() != null ? CategoryResponse.builder()
                        .id(product.getCategory().getId())
                        .name(product.getCategory().getName())
                        .description(product.getCategory().getDescription())
                        .build() : null)
                .sizes(sizeResponses) // danh sách size trả về FE
                .quantity(product.getQuantity()) // tổng stock, entity đã tự tính
                .build();
    }

    public List<ProductResponse> toProductResponseList(List<Product> products) {
        return products.stream()
                .map(this::toProductResponse)
                .toList();
    }
}
