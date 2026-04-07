package com.shop.api.mapper;

import com.shop.api.dto.order.OrderItemResponse;
import com.shop.api.dto.order.OrderResponse;
import com.shop.api.entity.Order;
import com.shop.api.entity.OrderItem;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class OrderMapper {

    public OrderResponse toResponse(Order order) {
        List<OrderItemResponse> items = order.getItems().stream()
                .map(this::toItemResponse)
                .toList();

        return new OrderResponse(
                order.getId(),
                order.getUser().getId(),
                order.getUser().getFullName(),
                order.getUser().getEmail(),
                items,
                order.getTotalAmount(),
                order.getStatus(),
                order.getShippingAddress(),
                order.getPhone(),
                order.getCreatedAt()
        );
    }

    private OrderItemResponse toItemResponse(OrderItem item) {
        return new OrderItemResponse(
                item.getId(),
                item.getProductName(),
                item.getProductPrice(),
                item.getQuantity(),
                item.getSubtotal()
        );
    }
}
