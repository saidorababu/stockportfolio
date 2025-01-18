package com.demo.demo.controllers;

import com.demo.demo.models.Portfolio;
import com.demo.demo.models.User;
import com.demo.demo.services.PortfolioService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import com.demo.demo.services.UserService;
import com.demo.demo.repositories.UserRepository;
import com.demo.demo.models.User;

import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/users")
public class UserController {
    private final UserService userService;
    private final PortfolioService portfolioService;
    private final BCryptPasswordEncoder passwordEncoder;

    public UserController(UserService userService, PortfolioService portfolioService, BCryptPasswordEncoder passwordEncoder){
        this.userService = userService;
        this.portfolioService = portfolioService;
        this.passwordEncoder = passwordEncoder;
    }

    // Get user by username
    @GetMapping("/{username}")
    public ResponseEntity<User> getUserByUsername(@PathVariable String username) {
        Optional<User> user = userService.findUserByUsername(username);
        return user.map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    // Get user by email
    @GetMapping("/email/{email}")
    public ResponseEntity<User> getUserByEmail(@PathVariable String email) {
        Optional<User> user = userService.findUserByEmail(email);
        System.out.println(user.get().getEmail());
        return user.map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping("/{id}")
    public ResponseEntity<?> updateUser(@PathVariable Long id, @RequestBody User updatedUser) {
        Optional<User> user = userService.findUserById(id);
        System.out.println("Hai");
        if (user.isPresent()) {
            User existingUser = user.get();
            existingUser.setUsername(updatedUser.getUsername());
            if (updatedUser.getPassword() != null) {
                existingUser.setPassword(passwordEncoder.encode(updatedUser.getPassword()));
            }
            userService.saveUser(existingUser);
            return ResponseEntity.ok("User updated successfully.");
        }
        return ResponseEntity.status(404).body("User not found.");
    }


    // Get all users
    @GetMapping
    public Iterable<User> getAllUsers() {
        return userService.getAllUsers();
    }

    // Delete user by id
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteUser(@PathVariable Long id) {
        userService.deleteUser(id);
        return ResponseEntity.noContent().build();
    }

}
