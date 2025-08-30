package com.example.shoestore.service;

import com.example.shoestore.dto.request.UserCreateRequest;
import com.example.shoestore.dto.request.UserUpdateRequest;
import com.example.shoestore.dto.response.UserResponse;
import com.example.shoestore.entity.Cart;
import com.example.shoestore.entity.User;
import com.example.shoestore.enums.Role;
import com.example.shoestore.exception.AppException;
import com.example.shoestore.exception.ErrorCode;
import com.example.shoestore.mapper.UserMapper;
import com.example.shoestore.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class UserService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    @Transactional
    public User createUser(UserCreateRequest request) {
        if (userRepository.existsByUsername(request.getUsername())) {
            throw new AppException(ErrorCode.USER_EXISTED);
        }

        // Tạo user
        User user = User.builder()
                .username(request.getUsername())
                .firstName(request.getFirstName())
                .lastName(request.getLastName())
                .dob(request.getDob())
                .password(passwordEncoder.encode(request.getPassword()))
                .roles(new ArrayList<>(List.of(Role.USER.name()))) // Gán vai trò USER
                .build();

        // Lưu user trước để tạo id
        user = userRepository.saveAndFlush(user);

        // Tạo giỏ hàng và liên kết với user
        Cart cart = Cart.builder()
                .user(user)
                .cartDetails(new ArrayList<>())
                .build();
        user.setCart(cart); // Liên kết hai chiều

        // Lưu lại user để cascade lưu cart
        return userRepository.saveAndFlush(user);
    }

    public List<UserResponse> getUsers() {
        return userRepository.findAll()
                .stream()
                .map(UserMapper::toUserResponse)
                .toList();
    }

    public UserResponse getUser(Long id) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new AppException(ErrorCode.USER_NOT_EXISTED));
        return UserMapper.toUserResponse(user);
    }

    @Transactional
    public void deleteUser(Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new AppException(ErrorCode.USER_NOT_EXISTED));
        userRepository.delete(user); // Cascade sẽ tự động xóa cart
    }

    @Transactional
    public UserResponse updateUser(Long userId, UserUpdateRequest request) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new AppException(ErrorCode.USER_NOT_EXISTED));

        // Nếu request có password thì mới mã hóa và update
        if (request.getPassword() != null && !request.getPassword().isEmpty()) {
            user.setPassword(passwordEncoder.encode(request.getPassword()));
        }

        // Cập nhật các field khác
        if (request.getFirstName() != null) {
            user.setFirstName(request.getFirstName());
        }
        if (request.getLastName() != null) {
            user.setLastName(request.getLastName());
        }
        if (request.getDob() != null) {
            user.setDob(request.getDob());
        }

        User updatedUser = userRepository.save(user);
        return UserMapper.toUserResponse(updatedUser);
    }

}