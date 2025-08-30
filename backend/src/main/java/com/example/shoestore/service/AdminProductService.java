package com.example.shoestore.service;

import com.example.shoestore.dto.response.ProductResponse;
import com.example.shoestore.entity.Product;
import com.example.shoestore.mapper.ProductMapper;
import com.example.shoestore.repository.ProductRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class AdminProductService {
    private final ProductRepository productRepository;
    private final ProductMapper productMapper;

    // Lấy tất cả sản phẩm
    public List<ProductResponse> getAllProducts() {
        return productMapper.toProductResponseList(productRepository.findAll());
    }

    // Lấy sản phẩm theo ID
    public ProductResponse getProductById(Long id) {
        return productRepository.findById(id)
                .map(productMapper::toProductResponse)
                .orElseThrow(() -> new RuntimeException("Không tìm thấy sản phẩm với id " + id));
    }

    // Tạo sản phẩm mới
    public ProductResponse createProduct(Product product) {
        product.setInStock(product.getQuantity() > 0);
        Product saved = productRepository.save(product);
        return productMapper.toProductResponse(saved);
    }

    // Cập nhật sản phẩm
    public ProductResponse updateProduct(Long id, Product updated) {
        return productRepository.findById(id)
                .map(p -> {
                    p.setName(updated.getName());
                    p.setPrice(updated.getPrice());
                    p.setDescription(updated.getDescription());
                    p.setQuantity(updated.getQuantity());
                    p.setImageUrl(updated.getImageUrl());
                    p.setCategory(updated.getCategory());
                    p.setInStock(updated.getQuantity() > 0);
                    return productMapper.toProductResponse(productRepository.save(p));
                })
                .orElseThrow(() -> new RuntimeException("Không tìm thấy sản phẩm với id " + id));
    }

    // Xóa sản phẩm
    public void deleteProduct(Long id) {
        if (!productRepository.existsById(id)) {
            throw new RuntimeException("Không tìm thấy sản phẩm với id " + id);
        }
        productRepository.deleteById(id);
    }
}
