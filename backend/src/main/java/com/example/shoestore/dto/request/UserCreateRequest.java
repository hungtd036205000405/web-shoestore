package com.example.shoestore.dto.request;

import jakarta.validation.constraints.Size;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.time.LocalDate;
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class UserCreateRequest {
    @Size(min = 3 , message = "USERNAME_INVALID") // Độ dài tối thiểu của username
    String username;

    @Size(min = 8, message = "INVALID_PASSWORD")// Độ dài tối thiểu của mật khẩu
    String password;
    String firstName;
    String lastName;
    LocalDate dob;


}
