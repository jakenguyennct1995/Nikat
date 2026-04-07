package com.shop.api.dto.order;

import java.math.BigDecimal;

public record OrderItemResponse(
        Long id,
        String productName,
        BigDecimal productPrice,
        Integer quantity,
        BigDecimal subtotal
) {
}
