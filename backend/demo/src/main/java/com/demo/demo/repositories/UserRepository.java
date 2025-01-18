package com.demo.demo.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import com.demo.demo.models.User;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User,Long> {
    // Find a user by username
    Optional<User> findByUsername(String username);
    // Find a user by email
    Optional<User> findByEmail(String email);

    Optional<User> findById(Long id);
}