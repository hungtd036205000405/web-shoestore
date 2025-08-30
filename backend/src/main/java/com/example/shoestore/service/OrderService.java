package com.example.shoestore.service;

import com.example.shoestore.entity.*;
import com.example.shoestore.enums.OrderStatus;
import com.example.shoestore.repository.CartRepository;
import com.example.shoestore.repository.OrderRepository;
import com.example.shoestore.repository.ProductRepository;
import com.example.shoestore.repository.UserRepository;
import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class OrderService {

    private final OrderRepository orderRepository;
    private final UserRepository userRepository;
    private final ProductRepository productRepository;
    private final CartRepository cartRepository;

    @Transactional
    public Order placeOrder(Long userId) {
        // Fetch user
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new EntityNotFoundException("User not found with id " + userId));
        Cart cart = user.getCart();

        // Validate cart
        if (cart == null || cart.getCartDetails().isEmpty()) {
            throw new RuntimeException("Giỏ hàng trống, không thể đặt hàng!");
        }

        // Create new order
        Order order = Order.builder()
                .user(user)
                .createdAt(LocalDateTime.now())
                .status(OrderStatus.NEW)
                .build();

        // Process cart details into order details
        var orderDetails = cart.getCartDetails().stream().map(cd -> {
            Product product = cd.getProduct();
            String size = cd.getProductSize().getSize();  // Using size field from CartDetail

            // Find specific ProductSize
            ProductSize productSize = product.getSizes().stream()
                    .filter(ps -> ps.getSize().equals(size))
                    .findFirst()
                    .orElseThrow(() -> new RuntimeException("Size " + size + " not found for product " + product.getName()));

            // Check stock for specific size
            if (productSize.getStock() < cd.getQuantity()) {
                throw new RuntimeException("Sản phẩm '" + product.getName() + "' (size " + size + ") không đủ số lượng!");
            }

            // Deduct stock from specific size
            productSize.setStock(productSize.getStock() - cd.getQuantity());

            // Update product's total quantity and inStock status
            product.setQuantity(product.getSizes().stream()
                    .mapToInt(ProductSize::getStock)
                    .sum());
            product.setInStock(product.getQuantity() > 0);
            productRepository.save(product);

            // Build order detail
            return OrderDetail.builder()
                    .order(order)
                    .product(product)
                    .quantity(cd.getQuantity())
                    .price(product.getPrice())
                    .build();
        }).collect(Collectors.toList());

        // Set order details
        order.setOrderDetails(orderDetails);

        // Calculate total price
        Double total = orderDetails.stream()
                .mapToDouble(od -> od.getQuantity() * od.getPrice())
                .sum();
        order.setTotalPrice(total);

        // Save order
        Order savedOrder = orderRepository.save(order);

        // Clear cart
        cart.getCartDetails().clear();
        cartRepository.save(cart);

        return savedOrder;
    }
}