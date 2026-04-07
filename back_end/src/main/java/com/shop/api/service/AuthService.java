package com.shop.api.service;

import com.shop.api.dto.auth.AuthResponse;
import com.shop.api.dto.auth.LoginRequest;
import com.shop.api.dto.auth.RegisterRequest;
import com.shop.api.entity.Cart;
import com.shop.api.entity.Role;
import com.shop.api.entity.User;
import com.shop.api.entity.enums.RoleName;
import com.shop.api.exception.BadRequestException;
import com.shop.api.repository.CartRepository;
import com.shop.api.repository.RoleRepository;
import com.shop.api.repository.UserRepository;
import com.shop.api.security.JwtService;
import com.shop.api.security.UserPrincipal;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Map;
import java.util.Set;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    private final CartRepository cartRepository;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;
    private final JwtService jwtService;

    @Transactional
    public AuthResponse register(RegisterRequest request) {
        if (userRepository.existsByEmail(request.email())) {
            throw new BadRequestException("Email is already registered");
        }

        Role userRole = roleRepository.findByName(RoleName.ROLE_USER)
                .orElseThrow(() -> new BadRequestException("Default user role is missing"));

        User user = User.builder()
                .fullName(request.fullName())
                .email(request.email().toLowerCase())
                .password(passwordEncoder.encode(request.password()))
                .roles(Set.of(userRole))
                .enabled(true)
                .build();

        User savedUser = userRepository.save(user);
        cartRepository.save(Cart.builder().user(savedUser).build());

        return buildAuthResponse(savedUser);
    }

    public AuthResponse login(LoginRequest request) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(request.email(), request.password())
        );

        User user = userRepository.findByEmail(request.email())
                .orElseThrow(() -> new BadRequestException("Invalid credentials"));

        return buildAuthResponse(user);
    }

    private AuthResponse buildAuthResponse(User user) {
        UserPrincipal principal = new UserPrincipal(user);
        Set<String> roles = user.getRoles().stream().map(r -> r.getName().name()).collect(java.util.stream.Collectors.toSet());
        String token = jwtService.generateToken(principal, Map.of("roles", roles));

        return new AuthResponse(
                token,
                "Bearer",
                user.getId(),
                user.getFullName(),
                user.getEmail(),
                roles
        );
    }
}
