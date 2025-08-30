package com.example.shoestore.dto.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


@Data
@AllArgsConstructor
@NoArgsConstructor
public class TopCustomerResponse {
    private Long userId;
    private String username;
    private Double totalSpent;
}
