package com.example.shoestore.dto.request;

import java.time.LocalDate;

public record DateRangeRequest(
        LocalDate startDate,
        LocalDate endDate
) {}
