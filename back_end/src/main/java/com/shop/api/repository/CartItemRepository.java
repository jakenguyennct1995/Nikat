package com.shop.api.repository;

import com.shop.api.entity.Cart;
import com.shop.api.entity.CartItem;
import com.shop.api.entity.Product;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface CartItemRepository extends JpaRepository<CartItem, Long> {
    Optional<CartItem> findByCartAndProduct(Cart cart, Product product);
}
