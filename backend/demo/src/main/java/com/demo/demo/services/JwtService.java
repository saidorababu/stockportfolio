package com.demo.demo.services;

import io.jsonwebtoken.*;
import io.jsonwebtoken.security.Keys;
import org.springframework.stereotype.Service;
import com.demo.demo.models.User;

import java.security.Key;
import java.util.Date;

@Service
public class JwtService {

    private static final String SECRET_KEY = "your-secure-random-secret-key-for-jwt"; // Use a strong key
    private static final long EXPIRATION_TIME = 86400000; // 1 day in milliseconds

    private final Key key;

    public JwtService() {
        // Use the SECRET_KEY to generate a secure Key object
        this.key = Keys.hmacShaKeyFor(SECRET_KEY.getBytes());
    }

    // Generate a JWT token
    public String generateToken(User user) {
        return Jwts.builder()
                .setSubject(user.getUsername())
                .claim("email", user.getEmail())
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + EXPIRATION_TIME))
                .signWith(key, SignatureAlgorithm.HS256)
                .compact();
    }

    // Validate a JWT token
    public boolean validateToken(String token, User user) {
        try {
            String username = extractUsername(token);
            return (username.equals(user.getUsername()) && !isTokenExpired(token));
        } catch (JwtException | IllegalArgumentException e) {
            return false;
        }
    }

    // Extract the username from the token
    public String extractUsername(String token) {
        return getClaimsFromToken(token).getSubject();
    }

    // Check if the token is expired
    private boolean isTokenExpired(String token) {
        Date expiration = getClaimsFromToken(token).getExpiration();
        return expiration.before(new Date());
    }

    // Extract claims from the token
    private Claims getClaimsFromToken(String token) {
        return Jwts.parserBuilder()
                .setSigningKey(key)
                .build()
                .parseClaimsJws(token)
                .getBody();
    }
}
