package com.demo.demo.services;

import org.springframework.stereotype.Service;
import com.demo.demo.repositories.UserRepository;
import com.demo.demo.models.User;

import java.util.Optional;


@Service
public class UserService {
    private final UserRepository userRepository;

    public UserService(UserRepository userRepository){
        this.userRepository = userRepository;
    }

    // Create or update a user
    public User saveUser(User user) {
        return userRepository.save(user);
    }

    // Find a user by username
    public Optional<User> findUserByUsername(String username) {
        return userRepository.findByUsername(username);
    }

    // Find a user by email
    public Optional<User> findUserByEmail(String email) {
        return userRepository.findByEmail(email);
    }

    public Optional<User> findUserById(Long id) {
        System.out.println(userRepository.findById(id));
        return userRepository.findById(id);
    }

    // Delete a user by id
    public void deleteUser(Long id) {
        userRepository.deleteById(id);
    }

    // Get all users
    public Iterable<User> getAllUsers() {
        return userRepository.findAll();
    }
}
