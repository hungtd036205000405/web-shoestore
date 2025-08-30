package com.example.shoestore.exception;

import lombok.Getter;

@Getter
public enum ErrorCode {
    CART_NOT_FOUND(1007, "Giỏ hàng không tồn tại"),
    PRODUCT_NOT_IN_CART(1008, "Sản phẩm không có trong giỏ hàng"),
    UNAUTHENTICATED(1006, "Unauthenticated"),
    USER_NOT_EXISTED(1005, "User not existed"),
    INVALID_KEY(1001, "Uncategorized error"),
    INVALID_PASSWORD(1004, "Password must be at least {min} characters"),
    USERNAME_INVALID(1003, "Username must be at least {min} characters"),
    UNCATEGORIZED_EXCEPTION(9999, "Uncategorized error"),
    USER_EXISTED(1002, "User existed"),

    // ✅ THÊM MỚI các error code cho cart và product
    PRODUCT_NOT_FOUND(1009, "Sản phẩm không tồn tại"),
    SIZE_NOT_FOUND(1010, "Size không tồn tại cho sản phẩm này"),
    INSUFFICIENT_STOCK(1011, "Sản phẩm không đủ số lượng trong kho"),
    CART_ITEM_NOT_FOUND(1012, "Sản phẩm không tồn tại trong giỏ hàng"),
    UNAUTHORIZED(1013, "Bạn không có quyền thực hiện hành động này"),
    ;

    private final int code;
    private final String message;

    ErrorCode(int code, String message) {
        this.code = code;
        this.message = message;
    }
}