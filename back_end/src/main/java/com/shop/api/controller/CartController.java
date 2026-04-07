package com.shop.api.controller;

import com.shop.api.dto.cart.AddCartItemRequest;
import com.shop.api.dto.cart.CartResponse;
import com.shop.api.dto.cart.UpdateCartItemRequest;
import com.shop.api.dto.common.ApiResponse;
import com.shop.api.security.SecurityUtil;
import com.shop.api.service.CartService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/cart")
@RequiredArgsConstructor
public class CartController {

    private final CartService cartService;
    private final SecurityUtil securityUtil;

    @GetMapping
    public ResponseEntity<ApiResponse<CartResponse>> getCart() {
        return ResponseEntity.ok(ApiResponse.ok("Cart fetched", cartService.getCurrentCart(securityUtil.getCurrentUser())));
    }

    @PostMapping("/items")
    public ResponseEntity<ApiResponse<CartResponse>> addItem(@Valid @RequestBody AddCartItemRequest request) {
        return ResponseEntity.ok(ApiResponse.ok("Item added to cart", cartService.addItem(securityUtil.getCurrentUser(), request)));
    }

    @PutMapping("/items/{itemId}")
    public ResponseEntity<ApiResponse<CartResponse>> updateItem(@PathVariable Long itemId,
                                                                @Valid @RequestBody UpdateCartItemRequest request) {
        return ResponseEntity.ok(ApiResponse.ok("Cart item updated", cartService.updateItem(securityUtil.getCurrentUser(), itemId, request)));
    }

    @DeleteMapping("/items/{itemId}")
    public ResponseEntity<ApiResponse<CartResponse>> removeItem(@PathVariable Long itemId) {
        return ResponseEntity.ok(ApiResponse.ok("Cart item removed", cartService.removeItem(securityUtil.getCurrentUser(), itemId)));
    }
}
