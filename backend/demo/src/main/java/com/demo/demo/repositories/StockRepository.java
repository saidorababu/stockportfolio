package com.demo.demo.repositories;

import com.demo.demo.models.Stock;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface StockRepository extends JpaRepository<Stock, Long> {

    // Find stock by ticker (e.g., AAPL, TSLA)
    Stock findByTicker(String ticker);
//    Optional<Stock> findByTicker(String ticker);
}
