package com.example.shoestore.service;

import com.example.shoestore.dto.request.AddToCartRequest;
import com.example.shoestore.dto.request.UpdateCartRequest;
import com.example.shoestore.dto.response.CartDetailResponse;
import com.example.shoestore.dto.response.CartResponse;
import com.example.shoestore.entity.Cart;
import com.example.shoestore.entity.CartDetail;
import com.example.shoestore.entity.Product;
import com.example.shoestore.entity.ProductSize;
import com.example.shoestore.exception.AppException;
import com.example.shoestore.exception.ErrorCode;
import com.example.shoestore.repository.CartDetailRepository;
import com.example.shoestore.repository.CartRepository;
import com.example.shoestore.repository.ProductRepository;
import com.example.shoestore.repository.ProductSizeRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Slf4j
@Transactional
public class CartService {
    private final CartRepository cartRepository;
    private final ProductRepository productRepository;
    private final ProductSizeRepository productSizeRepository;
    private final CartDetailRepository cartDetailRepository;

    //  Thêm sản phẩm vào giỏ
    public CartResponse addToCart(Long userId, AddToCartRequest request) {
        Cart cart = cartRepository.findByUserId(userId)
                .orElseThrow(() -> new AppException(ErrorCode.CART_NOT_FOUND));

        Product product = productRepository.findById(request.getProductId())
                .orElseThrow(() -> new AppException(ErrorCode.PRODUCT_NOT_FOUND));

        // Tìm ProductSize theo productId và size
        ProductSize productSize = productSizeRepository.findByProductIdAndSize(
                        request.getProductId(), request.getSize())
                .orElseThrow(() -> new AppException(ErrorCode.SIZE_NOT_FOUND));

        // Kiểm tra số lượng tồn kho
        if (productSize.getStock() < request.getQuantity()) {
            throw new AppException(ErrorCode.INSUFFICIENT_STOCK);
        }

        // Kiểm tra xem CartDetail cùng product + size đã có chưa
        Optional<CartDetail> existingDetail = cartDetailRepository.findByCartIdAndProductIdAndProductSizeId(
                cart.getId(), product.getId(), productSize.getId());

        if (existingDetail.isPresent()) {
            CartDetail detail = existingDetail.get();
            int newQuantity = detail.getQuantity() + request.getQuantity();

            // Kiểm tra lại tồn kho sau khi cộng thêm
            if (productSize.getStock() < newQuantity) {
                throw new AppException(ErrorCode.INSUFFICIENT_STOCK);
            }

            detail.setQuantity(newQuantity);
            cartDetailRepository.save(detail);
        } else {
            CartDetail detail = CartDetail.builder()
                    .cart(cart)
                    .product(product)
                    .productSize(productSize)
                    .quantity(request.getQuantity())
                    .build();
            cartDetailRepository.save(detail);
        }

        return getCart(userId); // Load lại giỏ hàng để có dữ liệu mới nhất
    }

    //  Lấy giỏ hàng
    @Transactional(readOnly = true)
    public CartResponse getCart(Long userId) {
        Cart cart = cartRepository.findByUserId(userId)
                .orElseThrow(() -> new AppException(ErrorCode.CART_NOT_FOUND));

        // Ensure cart details are loaded
        cart.getCartDetails().size(); // Trigger lazy loading

        return mapToResponse(cart);
    }

    public CartResponse updateCartItem(Long userId, UpdateCartRequest request) {
        Cart cart = cartRepository.findByUserId(userId)
                .orElseThrow(() -> new AppException(ErrorCode.CART_NOT_FOUND));

        // Tìm sản phẩm trong giỏ dựa trên productId + size hiện tại
        CartDetail cartDetail = cart.getCartDetails().stream()
                .filter(cd -> cd.getProduct().getId().equals(request.getProductId())
                        && cd.getProductSize().getSize().equals(request.getSize()))
                .findFirst()
                .orElseThrow(() -> new AppException(ErrorCode.CART_ITEM_NOT_FOUND));

        // Kiểm tra quyền sở hữu
        if (!cartDetail.getCart().getId().equals(cart.getId())) {
            throw new AppException(ErrorCode.UNAUTHORIZED);
        }

        // Nếu có yêu cầu đổi size
        if (request.getNewSize() != null && !request.getNewSize().equals(request.getSize())) {
            ProductSize newProductSize = productSizeRepository.findByProductIdAndSize(
                            request.getProductId(), request.getNewSize())
                    .orElseThrow(() -> new AppException(ErrorCode.SIZE_NOT_FOUND));

            if (newProductSize.getStock() < request.getQuantity()) {
                throw new AppException(ErrorCode.INSUFFICIENT_STOCK);
            }

            // Kiểm tra nếu giỏ đã có sản phẩm cùng productId + newSize → cộng dồn
            Optional<CartDetail> existingDetail = cartDetailRepository
                    .findByCartIdAndProductIdAndProductSizeId(cart.getId(),
                            request.getProductId(), newProductSize.getId());

            if (existingDetail.isPresent()) {
                CartDetail existing = existingDetail.get();
                int newQuantity = existing.getQuantity() + request.getQuantity();

                if (newProductSize.getStock() < newQuantity) {
                    throw new AppException(ErrorCode.INSUFFICIENT_STOCK);
                }

                existing.setQuantity(newQuantity);
                cartDetailRepository.save(existing);
                cartDetailRepository.delete(cartDetail); // Xóa bản ghi size cũ
            } else {
                cartDetail.setProductSize(newProductSize);
                cartDetail.setQuantity(request.getQuantity());
                cartDetailRepository.save(cartDetail);
            }
        } else {
            // Không đổi size, chỉ update số lượng
            ProductSize productSize = cartDetail.getProductSize();

            if (request.getQuantity() <= 0) {
                cartDetailRepository.delete(cartDetail);
            } else {
                if (productSize.getStock() < request.getQuantity()) {
                    throw new AppException(ErrorCode.INSUFFICIENT_STOCK);
                }
                cartDetail.setQuantity(request.getQuantity());
                cartDetailRepository.save(cartDetail);
            }
        }

        return getCart(userId);
    }


    //  Xoá 1 sản phẩm khỏi giỏ
    public CartResponse removeCartItem(Long userId, Long productId) {
        Cart cart = cartRepository.findByUserId(userId)
                .orElseThrow(() -> new AppException(ErrorCode.CART_NOT_FOUND));

        boolean removed = cart.getCartDetails().removeIf(cd -> cd.getProduct().getId().equals(productId));

        if (!removed) {
            throw new AppException(ErrorCode.PRODUCT_NOT_IN_CART);
        }

        return mapToResponse(cartRepository.save(cart));
    }

    //  Xoá toàn bộ giỏ
    public CartResponse clearCart(Long userId) {
        Cart cart = cartRepository.findByUserId(userId)
                .orElseThrow(() -> new RuntimeException("Cart not found for user: " + userId));

        cart.getCartDetails().clear();

        Cart savedCart = cartRepository.save(cart);
        return mapToResponse(savedCart);
    }


    //  Helper method: map entity → response
    private CartResponse mapToResponse(Cart cart) {
        List<CartDetailResponse> detailResponses = cart.getCartDetails().stream()
                .map(cd -> CartDetailResponse.builder()
                        .cartDetailId(cd.getId())
                        .productId(cd.getProduct().getId())
                        .productName(cd.getProduct().getName())
                        .price(cd.getProduct().getPrice())
                        .quantity(cd.getQuantity())
                        .size(cd.getProductSize().getSize())
                        .imageUrl(cd.getProduct().getImageUrl())
                        .maxStock(cd.getProductSize().getStock()) // Thêm thông tin stock max
                        .build())
                .collect(Collectors.toList());

        double totalPrice = detailResponses.stream()
                .mapToDouble(item -> item.getPrice() * item.getQuantity())
                .sum();

        return CartResponse.builder()
                .cartId(cart.getId())
                .userId(cart.getUser().getId())
                .cartDetails(detailResponses)
                .totalPrice(totalPrice)
                .totalItems(detailResponses.size())
                .build();
    }
}