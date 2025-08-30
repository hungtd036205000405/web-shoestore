package com.example.shoestore.dto.response;

import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Data;
import lombok.experimental.FieldDefaults;

@Data// Lombok will generate getters, setters, toString, equals, and hashCode methods
@FieldDefaults(level = AccessLevel.PRIVATE)
@Builder
public class AuthenticationResponse {
    String token;
    boolean isAuthenticated;
     // hoặc AUTO
    private Long userid;

}
