package com.demo.demo.repositories;

import com.demo.demo.models.Portfolio;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Repository
public interface PortfolioRepository extends JpaRepository<Portfolio, Long> {

    // Fetch all stocks with quantities for a user (for dashboard)
    @Query("SELECT p FROM Portfolio p WHERE p.user.id = :userId")
    List<Portfolio> findAllByUserId(Long userId);

    // Find portfolio entry for a specific user and stock
    @Query("SELECT p FROM Portfolio p WHERE p.user.id = :userId AND p.stock.id = :stockId")
    Portfolio findByUserIdAndStockId(Long userId, Long stockId);

    // Fetch the top-performing stock in a user's portfolio
    @Query("""
        SELECT p 
        FROM Portfolio p 
        WHERE p.user.id = :userId 
        ORDER BY ((p.stock.currentPrice - p.averagePrice) / p.averagePrice) DESC
        """)
    List<Portfolio> findTopPerformingStock(Long userId);

    @Modifying
    @Transactional
    @Query("DELETE FROM Portfolio p WHERE p.user.id = :userId AND p.stock.id = :stockId")
    void deleteByUserIdAndStockId(Long userId, Long stockId);

}
