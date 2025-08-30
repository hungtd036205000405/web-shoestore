package com.example.shoestore.controller;

import com.example.shoestore.dto.response.ApiResponse;
import com.example.shoestore.dto.response.ProductResponse;
import com.example.shoestore.entity.Product;
import com.example.shoestore.service.AdminProductService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/admin/products")
@RequiredArgsConstructor
public class AdminProductController {

    private final AdminProductService adminProductService;

    // Lấy tất cả sản phẩm
    @GetMapping
    public ResponseEntity<ApiResponse<List<ProductResponse>>> getAllProducts() {
        return ResponseEntity.ok(
                ApiResponse.success(adminProductService.getAllProducts())
        );
    }

    // Lấy sản phẩm theo id
    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<ProductResponse>> getProductById(@PathVariable Long id) {
        return ResponseEntity.ok(
                ApiResponse.success(adminProductService.getProductById(id))
        );
    }

    // Tạo sản phẩm mới
    @PostMapping
    public ResponseEntity<ApiResponse<ProductResponse>> createProduct(@RequestBody Product product) {
        return ResponseEntity.ok(
                ApiResponse.success(adminProductService.createProduct(product))
        );
    }

    // Cập nhật sản phẩm
    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse<ProductResponse>> updateProduct(
            @PathVariable Long id,
            @RequestBody Product updated
    ) {
        return ResponseEntity.ok(
                ApiResponse.success(adminProductService.updateProduct(id, updated))
        );
    }

    // Xóa sản phẩm
    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<Void>> deleteProduct(@PathVariable Long id) {
        adminProductService.deleteProduct(id);
        return ResponseEntity.ok(
                ApiResponse.<Void>builder()
                        .code(200)
                        .message("Xóa sản phẩm thành công")
                        .build()
        );
    }
}
