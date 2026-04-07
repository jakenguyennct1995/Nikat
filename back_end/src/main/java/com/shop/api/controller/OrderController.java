package com.shop.api.controller;

import com.shop.api.dto.common.ApiResponse;
import com.shop.api.dto.order.CreateOrderRequest;
import com.shop.api.dto.order.OrderResponse;
import com.shop.api.security.SecurityUtil;
import com.shop.api.service.OrderService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/orders")
@RequiredArgsConstructor
public class OrderController {

    private final OrderService orderService;
    private final SecurityUtil securityUtil;

    @PostMapping
    public ResponseEntity<ApiResponse<OrderResponse>> placeOrder(@Valid @RequestBody CreateOrderRequest request) {
        return ResponseEntity.ok(ApiResponse.ok("Order placed", orderService.placeOrder(securityUtil.getCurrentUser(), request)));
    }

    @GetMapping("/me")
    public ResponseEntity<ApiResponse<List<OrderResponse>>> myOrders() {
        return ResponseEntity.ok(ApiResponse.ok("Orders fetched", orderService.getMyOrders(securityUtil.getCurrentUser())));
    }
}
