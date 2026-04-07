package com.shop.api.service;

import com.shop.api.dto.cart.AddCartItemRequest;
import com.shop.api.dto.cart.CartResponse;
import com.shop.api.dto.cart.UpdateCartItemRequest;
import com.shop.api.entity.Cart;
import com.shop.api.entity.CartItem;
import com.shop.api.entity.Product;
import com.shop.api.entity.User;
import com.shop.api.exception.ResourceNotFoundException;
import com.shop.api.mapper.CartMapper;
import com.shop.api.repository.CartItemRepository;
import com.shop.api.repository.CartRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class CartService {

    private final CartRepository cartRepository;
    private final CartItemRepository cartItemRepository;
    private final ProductService productService;
    private final CartMapper cartMapper;

    public CartResponse getCurrentCart(User user) {
        Cart cart = getCartByUser(user);
        return cartMapper.toResponse(cart);
    }

    @Transactional
    public CartResponse addItem(User user, AddCartItemRequest request) {
        Cart cart = getCartByUser(user);
        Product product = productService.findEntityById(request.productId());

        CartItem item = cartItemRepository.findByCartAndProduct(cart, product)
                .orElseGet(() -> {
                    CartItem newItem = CartItem.builder()
                            .cart(cart)
                            .product(product)
                            .quantity(0)
                            .build();
                    cart.getItems().add(newItem);
                    return newItem;
                });

        item.setQuantity(item.getQuantity() + request.quantity());
        cartItemRepository.save(item);
        return cartMapper.toResponse(cartRepository.save(cart));
    }

    @Transactional
    public CartResponse updateItem(User user, Long itemId, UpdateCartItemRequest request) {
        Cart cart = getCartByUser(user);
        CartItem item = cart.getItems().stream()
                .filter(ci -> ci.getId().equals(itemId))
                .findFirst()
                .orElseThrow(() -> new ResourceNotFoundException("Cart item not found"));

        item.setQuantity(request.quantity());
        cartItemRepository.save(item);
        return cartMapper.toResponse(cartRepository.save(cart));
    }

    @Transactional
    public CartResponse removeItem(User user, Long itemId) {
        Cart cart = getCartByUser(user);
        CartItem item = cart.getItems().stream()
                .filter(ci -> ci.getId().equals(itemId))
                .findFirst()
                .orElseThrow(() -> new ResourceNotFoundException("Cart item not found"));

        cart.getItems().remove(item);
        cartItemRepository.delete(item);
        return cartMapper.toResponse(cartRepository.save(cart));
    }

    @Transactional
    public void clearCart(Cart cart) {
        cart.getItems().clear();
        cartRepository.save(cart);
    }

    public Cart getCartByUser(User user) {
        return cartRepository.findByUser(user)
                .orElseGet(() -> cartRepository.save(Cart.builder().user(user).build()));
    }
}
