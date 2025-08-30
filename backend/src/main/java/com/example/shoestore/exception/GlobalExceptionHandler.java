package com.example.shoestore.exception;

import com.example.shoestore.dto.response.ApiResponse;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@ControllerAdvice
public class GlobalExceptionHandler {
    private static final Logger log = LoggerFactory.getLogger(GlobalExceptionHandler.class);

    // Xử lý AppException (các exception nghiệp vụ)
    @ExceptionHandler(value = AppException.class)
    public ResponseEntity<ApiResponse> handlingAppException(AppException exception) {
        ErrorCode errorCode = exception.getErrorCode();
        log.error("AppException occurred: {}", errorCode.getMessage(), exception);

        ApiResponse apiResponse = new ApiResponse();
        apiResponse.setCode(errorCode.getCode());
        apiResponse.setMessage(errorCode.getMessage());

        // Trả về 404 nếu là lỗi không tìm thấy
        if(errorCode == ErrorCode.CART_NOT_FOUND || errorCode == ErrorCode.PRODUCT_NOT_IN_CART) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(apiResponse);
        }

        // Mặc định trả về 400 cho các lỗi nghiệp vụ khác
        return ResponseEntity.badRequest().body(apiResponse);
    }

    // Xử lý validation exception
    @ExceptionHandler(value = MethodArgumentNotValidException.class)
    public ResponseEntity<ApiResponse> handlingValidation(MethodArgumentNotValidException exception) {
        String enumKey = exception.getFieldError().getDefaultMessage();
        ErrorCode errorCode = ErrorCode.INVALID_KEY;

        try {
            errorCode = ErrorCode.valueOf(enumKey);
        } catch (IllegalArgumentException e) {
            log.warn("Invalid error code: {}", enumKey);
        }

        ApiResponse apiResponse = new ApiResponse();
        apiResponse.setCode(errorCode.getCode());
        apiResponse.setMessage(errorCode.getMessage());

        return ResponseEntity.badRequest().body(apiResponse);
    }

    // Xử lý các exception không xác định
    @ExceptionHandler(value = Exception.class)
    public ResponseEntity<ApiResponse> handlingException(Exception exception) {
        log.error("Unexpected exception occurred", exception);

        ApiResponse apiResponse = new ApiResponse();
        apiResponse.setCode(ErrorCode.UNCATEGORIZED_EXCEPTION.getCode());
        apiResponse.setMessage("Internal Server Error: " + exception.getMessage());

        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(apiResponse);
    }
}