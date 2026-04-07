package com.shop.api.service;

import com.shop.api.dto.order.CreateOrderRequest;
import com.shop.api.dto.order.OrderResponse;
import com.shop.api.entity.Cart;
import com.shop.api.entity.CartItem;
import com.shop.api.entity.Order;
import com.shop.api.entity.OrderItem;
import com.shop.api.entity.User;
import com.shop.api.entity.enums.OrderStatus;
import com.shop.api.exception.BadRequestException;
import com.shop.api.exception.ResourceNotFoundException;
import com.shop.api.mapper.OrderMapper;
import com.shop.api.repository.OrderRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.List;

@Service
@RequiredArgsConstructor
public class OrderService {

    private final OrderRepository orderRepository;
    private final CartService cartService;
    private final OrderMapper orderMapper;

    @Transactional
    public OrderResponse placeOrder(User user, CreateOrderRequest request) {
        Cart cart = cartService.getCartByUser(user);
        if (cart.getItems().isEmpty()) {
            throw new BadRequestException("Cart is empty");
        }

        Order order = new Order();
        order.setUser(user);
        order.setStatus(OrderStatus.PENDING);
        order.setShippingAddress(request.shippingAddress());
        order.setPhone(request.phone());

        List<OrderItem> orderItems = cart.getItems().stream()
                .map(item -> mapToOrderItem(order, item))
                .toList();

        BigDecimal total = orderItems.stream()
                .map(OrderItem::getSubtotal)
                .reduce(BigDecimal.ZERO, BigDecimal::add);

        order.setItems(orderItems);
        order.setTotalAmount(total);

        Order saved = orderRepository.save(order);
        cartService.clearCart(cart);

        return orderMapper.toResponse(saved);
    }

    public List<OrderResponse> getMyOrders(User user) {
        return orderRepository.findByUserOrderByCreatedAtDesc(user).stream()
                .map(orderMapper::toResponse)
                .toList();
    }

    public List<OrderResponse> findAll() {
        return orderRepository.findAll().stream()
                .map(orderMapper::toResponse)
                .toList();
    }

    @Transactional
    public OrderResponse updateStatus(Long orderId, OrderStatus status) {
        Order order = orderRepository.findById(orderId)
                .orElseThrow(() -> new ResourceNotFoundException("Order not found"));
        order.setStatus(status);
        return orderMapper.toResponse(orderRepository.save(order));
    }

    private OrderItem mapToOrderItem(Order order, CartItem item) {
        BigDecimal price = item.getProduct().getPrice();
        int quantity = item.getQuantity();

        return OrderItem.builder()
                .order(order)
                .productName(item.getProduct().getName())
                .productPrice(price)
                .quantity(quantity)
                .subtotal(price.multiply(BigDecimal.valueOf(quantity)))
                .build();
    }
}
