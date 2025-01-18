package com.demo.demo.controllers;

import com.demo.demo.DTO.AuthResponse;
import com.demo.demo.models.Funds;
import com.demo.demo.models.Portfolio;
import com.demo.demo.models.User;
import com.demo.demo.services.*;
import com.demo.demo.DTO.LoginRequest;
import com.demo.demo.DTO.RegisterRequest;
import com.demo.demo.services.JwtService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/auth")
public class AuthController {
    private final UserService userService;
    private final BCryptPasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final PortfolioService portfolioService;
    private final FundsService fundsService;

    @Autowired
    public AuthController(UserService userService, BCryptPasswordEncoder passwordEncoder, JwtService jwtService, PortfolioService portfolioService, FundsService fundsService) {
        this.userService = userService;
        this.passwordEncoder = passwordEncoder;
        this.jwtService = jwtService;
        this.portfolioService = portfolioService;
        this.fundsService = fundsService;
    }
    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody RegisterRequest registerRequest) {
        if (userService.findUserByUsername(registerRequest.getUsername()).isPresent()) {
            return ResponseEntity.badRequest().body("Username is already taken.");
        }
        if (userService.findUserByEmail(registerRequest.getEmail()).isPresent()) {
            return ResponseEntity.badRequest().body("Email is already registered.");
        }

        User newUser = new User();
        newUser.setUsername(registerRequest.getUsername());
        newUser.setEmail(registerRequest.getEmail());
        newUser.setPassword(passwordEncoder.encode(registerRequest.getPassword())); // Hash the password
        User savedUser =  userService.saveUser(newUser);

        // Create Funds for the new User and initialize with 1000
        Funds funds = new Funds();
        fundsService.addFunds(savedUser.getId(),1000.0);

        return ResponseEntity.ok("User registered successfully with initial funds of 1000.");

    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest loginRequest) {
        Optional<User> user = userService.findUserByEmail(loginRequest.getEmail());
        if (user.isPresent() && passwordEncoder.matches(loginRequest.getPassword(), user.get().getPassword())) {
            // Generate JWT Token
            String token = jwtService.generateToken(user.get());
            return ResponseEntity.ok(new AuthResponse(token, user.get().getUsername(), user.get().getEmail(), user.get().getId()));
        } else {
            return ResponseEntity.status(401).body("Invalid username or password.");
        }
    }


    // Endpoint to fetch user details
    @GetMapping("/user/{jwtToken}")
    public ResponseEntity<?> getUserDetails(@PathVariable String jwtToken) {
        try {
            String username = jwtService.extractUsername(jwtToken);
            Optional<User> userOptional = userService.findUserByUsername(username);
            if (userOptional.isEmpty()) {
                return ResponseEntity.status(404).body("User not found.");
            }
            return ResponseEntity.ok(userOptional.get());
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error retrieving user" + e.getMessage());
        }
    }
}
