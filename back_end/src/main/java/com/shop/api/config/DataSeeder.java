package com.shop.api.config;

import com.shop.api.entity.*;
import com.shop.api.entity.enums.RoleName;
import com.shop.api.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.math.BigDecimal;
import java.util.List;
import java.util.Set;

@Component
@RequiredArgsConstructor
public class DataSeeder implements CommandLineRunner {

    private final RoleRepository roleRepository;
    private final UserRepository userRepository;
    private final CategoryRepository categoryRepository;
    private final ProductRepository productRepository;
    private final CartRepository cartRepository;
    private final PasswordEncoder passwordEncoder;

    @Override
    public void run(String... args) {
        Role roleUser = roleRepository.findByName(RoleName.ROLE_USER)
                .orElseGet(() -> roleRepository.save(Role.builder().name(RoleName.ROLE_USER).build()));
        Role roleAdmin = roleRepository.findByName(RoleName.ROLE_ADMIN)
                .orElseGet(() -> roleRepository.save(Role.builder().name(RoleName.ROLE_ADMIN).build()));

        userRepository.findByEmail("admin@shop.com").orElseGet(() -> {
            User admin = User.builder()
                    .fullName("System Admin")
                    .email("admin@shop.com")
                    .password(passwordEncoder.encode("Admin@123"))
                    .roles(Set.of(roleAdmin, roleUser))
                    .enabled(true)
                    .build();
            User savedAdmin = userRepository.save(admin);
            cartRepository.save(Cart.builder().user(savedAdmin).build());
            return savedAdmin;
        });

        Category electronics = categoryRepository.findByNameIgnoreCase("Electronics")
                .orElseGet(() -> categoryRepository.save(Category.builder()
                        .name("Electronics")
                        .description("Electronic devices and gadgets")
                        .build()));

        Category fashion = categoryRepository.findByNameIgnoreCase("Fashion")
                .orElseGet(() -> categoryRepository.save(Category.builder()
                        .name("Fashion")
                        .description("Modern clothing and accessories")
                        .build()));

        if (productRepository.count() == 0) {
            productRepository.saveAll(List.of(
                    Product.builder()
                            .name("Noise Cancelling Headphones")
                            .description("Premium wireless headphones for focus and travel.")
                            .price(new BigDecimal("199.00"))
                            .stock(80)
                            .imageUrl("https://images.unsplash.com/photo-1583394838336-acd977736f90")
                            .category(electronics)
                            .build(),
                    Product.builder()
                            .name("Smart Watch Pro")
                            .description("Track health, notifications, and daily productivity.")
                            .price(new BigDecimal("149.00"))
                            .stock(120)
                            .imageUrl("https://images.unsplash.com/photo-1523275335684-37898b6baf30")
                            .category(electronics)
                            .build(),
                    Product.builder()
                            .name("Minimalist Backpack")
                            .description("Durable lightweight backpack for work and weekend trips.")
                            .price(new BigDecimal("59.00"))
                            .stock(200)
                            .imageUrl("https://images.unsplash.com/photo-1500530855697-b586d89ba3ee")
                            .category(fashion)
                            .build()
            ));
        }
    }
}
