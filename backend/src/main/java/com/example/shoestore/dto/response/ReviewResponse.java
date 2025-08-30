package com.example.shoestore.dto.response;

import lombok.*;
import lombok.experimental.FieldDefaults;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class ReviewResponse {
    Long id;
    String comment;
    int rating;
    LocalDateTime createdAt;  // đồng bộ với entity
    LocalDateTime updatedAt;
    String username;
}

