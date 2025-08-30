// DailyRevenueResponse.java
package com.example.shoestore.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class DailyRevenueResponse {
    private String date;      // Format: "2025-08-01"
    private Double revenue;
}