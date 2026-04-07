package com.shop.api.dto.order;

import com.shop.api.entity.enums.OrderStatus;

import java.math.BigDecimal;
import java.time.Instant;
import java.util.List;

public record OrderResponse(
        Long id,
        Long userId,
        String customerName,
        String customerEmail,
        List<OrderItemResponse> items,
        BigDecimal totalAmount,
        OrderStatus status,
        String shippingAddress,
        String phone,
        Instant createdAt
) {
}
