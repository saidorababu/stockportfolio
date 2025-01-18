package com.demo.demo.services;

import com.demo.demo.DTO.PortfolioSummaryResponse;
import com.demo.demo.models.Portfolio;
import com.demo.demo.models.Stock;
import com.demo.demo.models.User;
import com.demo.demo.repositories.PortfolioRepository;
import com.demo.demo.repositories.StockRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.sound.sampled.Port;
import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class PortfolioService {

    private final PortfolioRepository portfolioRepository;
    private final StockRepository stockRepository;

    @Autowired
    public PortfolioService(PortfolioRepository portfolioRepository, StockRepository stockRepository) {
        this.portfolioRepository = portfolioRepository;
        this.stockRepository = stockRepository;
    }

    public List<Portfolio> getPortfoliosByUserId(Long userId) {
        return portfolioRepository.findAllByUserId(userId);
    }

    public PortfolioSummaryResponse getPortfolioSummary(Long userId) {
        // Fetch all portfolios for the user
        List<Portfolio> portfolios = getPortfoliosByUserId(userId);

        BigDecimal totalValue = BigDecimal.ZERO;
        BigDecimal totalChange = BigDecimal.ZERO;

        String topPerformerTicker = null;
        BigDecimal topPerformerChange = BigDecimal.ZERO;

        for (Portfolio portfolio : portfolios) {
            Stock stock = portfolio.getStock();
                // Calculate total value (current price * quantity)
            totalValue = totalValue.add(BigDecimal.valueOf(stock.getCurrentPrice()*(portfolio.getQuantity())));

            // Calculate total change (current price - buy price) * quantity
            BigDecimal changePerStock = BigDecimal.valueOf(stock.getCurrentPrice() - portfolio.getAveragePrice());
            BigDecimal totalStockChange = changePerStock.multiply(BigDecimal.valueOf(portfolio.getQuantity()));
            totalChange = totalChange.add(totalStockChange);

            // Update top performer if this stock has a higher total change
            if (totalStockChange.compareTo(topPerformerChange) > 0) {
                topPerformerChange = totalStockChange;
                topPerformerTicker = stock.getTicker();
            }

        }

        return new PortfolioSummaryResponse(totalValue, totalChange, topPerformerTicker, topPerformerChange);
    }

//    public Portfolio createPortfolio(User user){
//        // If not, create a new portfolio
//        Portfolio newPortfolio = new Portfolio();
//        newPortfolio.setUser(user);
//        newPortfolio.setTotalValue(BigDecimal.ZERO);
//        newPortfolio.setCreatedAt(LocalDateTime.now());
//        newPortfolio.setUpdatedAt(LocalDateTime.now());
//        return portfolioRepository.save(newPortfolio);
//    }
//    // Method to create or fetch an existing portfolio for a user
//    public Optional<Portfolio> getPortfolioForUser(Long userId) {
//        return portfolioRepository.findByUserId(userId);
//    }
//    // Add a stock to a portfolio (if needed)
//    public Stock addStockToPortfolio(Long portfolioId, Stock stock) {
//        System.out.println("hai");
//        stock.setPortfolio(portfolioRepository.findById(portfolioId).orElseThrow(() -> new RuntimeException("Portfolio not found")));
//        System.out.println("Hai2");
//        Stock stk = stockRepository.save(stock);
//        System.out.println(stk);
//        return stk;
//    }
//
//    // Get portfolio by ID
//    public Optional<Portfolio> getPortfolioById(Long portfolioId) {
//        return portfolioRepository.findById(portfolioId);
//    }
//
//    // Get all portfolios
//    public List<Portfolio> getAllPortfolios() {
//        return portfolioRepository.findAll();
//    }
//
//    // Update portfolio details
//    public Portfolio updatePortfolio(Portfolio portfolioDetails) {
//        Portfolio portfolio = portfolioRepository.findById(portfolioDetails.getId())
//                .orElseThrow(() -> new RuntimeException("Portfolio not found with id " + portfolioDetails.getId()));
//        portfolio.setTotalValue(portfolioDetails.getTotalValue());
//        return portfolioRepository.save(portfolio);
//    }
//
//    // Delete a portfolio by ID
//    public void deletePortfolio(Long portfolioId) {
//        portfolioRepository.deleteById(portfolioId);
//    }
//
//    // Get total value of a portfolio by its ID
//    public BigDecimal getTotalValueByPortfolioId(Long portfolioId) {
//        return stockRepository.findTotalValueByPortfolioId(portfolioId);
//    }
//
//    // Get all stocks belonging to a portfolio
//    public List<Stock> getStocksByPortfolioId(Long portfolioId) {
//        return stockRepository.findStocksByPortfolioId(portfolioId);
//    }
//
//
//    // Remove a stock from a portfolio
//    public void removeStockFromPortfolio(Long portfolioId, String ticker) {
//        List<Stock> stocks = stockRepository.findByTicker(ticker);
//        if (!stocks.isEmpty()) {
//            stockRepository.deleteByTickerNative(ticker);
//        } else {
//            throw new RuntimeException("Stock not found in the portfolio");
//        }
//    }
//
//    // **Update the total value of the portfolio**
//    public void updatePortfolioValue(Long portfolioId, BigDecimal valueAdjustment) {
//        Portfolio portfolio = portfolioRepository.findById(portfolioId)
//                .orElseThrow(() -> new RuntimeException("Portfolio not found with id " + portfolioId));
//
//        // Adjust the total value
//        BigDecimal updatedValue = portfolio.getTotalValue().add(valueAdjustment);
//        portfolio.setTotalValue(updatedValue);
//
//        // Save the updated portfolio
//        portfolioRepository.save(portfolio);
//    }
}



