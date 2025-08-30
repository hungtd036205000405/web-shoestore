package com.example.shoestore.configuration;

import com.example.shoestore.entity.Cart;
import com.example.shoestore.entity.User;
import com.example.shoestore.enums.Role;
import com.example.shoestore.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.ApplicationRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.Collections;

@Configuration
@RequiredArgsConstructor
@Slf4j
public class ApplicationInitConfig {

    private final PasswordEncoder passwordEncoder;
    private final UserRepository userRepository;

    @Bean
    @Transactional
    ApplicationRunner applicationRunner() {
        return args -> {
            try {
                if (userRepository.findByUsername("admin").isEmpty()) {
                    // Tạo user admin
                    User user = User.builder()
                            .username("admin")
                            .password(passwordEncoder.encode("admin"))
                            .firstName("Admin")
                            .lastName("User")
                            .build();

                    // Lưu user trước để tạo id
                    User savedUser = userRepository.saveAndFlush(user);
                    log.info("User saved with ID: {}", savedUser.getId());

                    // Gán vai trò ADMIN
                    savedUser.setRoles(new ArrayList<>(Collections.singletonList(Role.ADMIN.name())));

                    // Tạo giỏ hàng và liên kết với user
                    Cart cart = Cart.builder()
                            .user(savedUser)
                            .cartDetails(new ArrayList<>())
                            .build();
                    savedUser.setCart(cart);

                    // Lưu lại user để cascade lưu roles và cart
                    userRepository.saveAndFlush(savedUser);
                    log.warn("Admin user has been created with username: admin, password: admin, ID: {}", savedUser.getId());
                } else {
                    log.info("Admin user already exists, skipping creation.");
                }
            } catch (Exception e) {
                log.error("Failed to create admin user: ", e);
                throw e;
            }
        };
    }
}