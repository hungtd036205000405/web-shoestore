package com.example.shoestore.service;

import com.example.shoestore.dto.response.ProductResponse;
import com.example.shoestore.entity.Product;
import com.example.shoestore.mapper.ProductMapper;
import com.example.shoestore.repository.ProductRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ProductService {

    private final ProductRepository productRepository;
    private final ProductMapper productMapper; // bean inject sẵn

    // Phân trang
    public Page<ProductResponse> getAllProducts(int page, int size) {
        Pageable pageable = PageRequest.of(page, size);
        Page<Product> productPage = productRepository.findAll(pageable);

        return productPage.map(productMapper::toProductResponse);
    }

    // Lấy sản phẩm theo ID
    public ProductResponse getProductById(Long id) {
        return productRepository.findById(id)
                .map(productMapper::toProductResponse)
                .orElseThrow(() -> new RuntimeException("Product not found"));
    }

    // Lấy sản phẩm theo categoryId
    public List<ProductResponse> getByCategory(Long categoryId) {
        return productMapper.toProductResponseList(
                productRepository.findByCategoryId(categoryId)
        );
    }

    // Tìm kiếm sản phẩm theo nhiều tiêu chí
    public List<ProductResponse> search(String name, Double minPrice, Double maxPrice, Long categoryId) {
        return productMapper.toProductResponseList(
                productRepository.searchProducts(name, minPrice, maxPrice, categoryId)
        );
    }
}

