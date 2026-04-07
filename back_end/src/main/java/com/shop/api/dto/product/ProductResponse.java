package com.shop.api.dto.product;

import com.shop.api.dto.category.CategoryResponse;

import java.math.BigDecimal;

public record ProductResponse(
        Long id,
        String name,
        String description,
        BigDecimal price,
        Integer stock,
        String imageUrl,
        CategoryResponse category
) {
}
