package com.example.shoestore.mapper;

import com.example.shoestore.dto.response.UserResponse;
import com.example.shoestore.entity.User;

public class UserMapper {
    // Chuyển đổi từ User entity sang UserResponse DTO
    // Nếu User là null thì trả về null
    // Nếu User không null thì trả về một UserResponse mới với các trường đã được ánh
    public static UserResponse toUserResponse(User user) {
        if (user == null) {
            return null;
        }

        return UserResponse.builder()
                .id(user.getId())
                .username(user.getUsername())
                .firstName(user.getFirstName())
                .lastName(user.getLastName())
                .dob(user.getDob())
                .roles(user.getRoles()) // vì trong User đã có Set<String> roles rồi
                .build();
    }
}
