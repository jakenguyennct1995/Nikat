package com.shop.api.dto.order;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record CreateOrderRequest(
        @NotBlank @Size(max = 400) String shippingAddress,
        @NotBlank @Size(max = 20) String phone
) {
}
