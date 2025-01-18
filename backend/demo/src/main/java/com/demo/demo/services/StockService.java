package com.demo.demo.services;

import com.demo.demo.models.Portfolio;
import com.demo.demo.models.Stock;
import com.demo.demo.models.Transaction;
import com.demo.demo.models.User;
import com.demo.demo.repositories.PortfolioRepository;
import com.demo.demo.repositories.StockRepository;
import com.demo.demo.repositories.TransactionRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;

@Service
public class StockService {
    private final StockRepository stockRepository;
    private final PortfolioRepository portfolioRepository;
    private final TransactionRepository transactionRepository;
    private final FundsService fundsService;

    public StockService(StockRepository stockRepository, PortfolioRepository portfolioRepository, TransactionRepository transactionRepository, FundsService fundsService) {
        this.stockRepository = stockRepository;
        this.portfolioRepository = portfolioRepository;
        this.transactionRepository = transactionRepository;
        this.fundsService = fundsService;
    }

    @Transactional
    public void buyStock(Long userId, String ticker, int quantity, double stockPrice) {
        Stock stock = stockRepository.findByTicker(ticker);

        // If the stock is not found, create a new stock entry
        if (stock == null) {
            stock = new Stock();
            stock.setTicker(ticker);
            stock.setName(ticker.toUpperCase()); // Assuming the name is the ticker for simplicity
            stock.setCurrentPrice(stockPrice);
            stock.setLastUpdated(java.time.LocalDateTime.now());
            stock = stockRepository.save(stock); // Save the newly created stock
        }

        double totalCost = stockPrice * quantity;

        // Deduct funds from the user's account
        fundsService.deductFunds(userId, totalCost);

        // Update the portfolio with the purchased stock
        Portfolio portfolio = portfolioRepository.findByUserIdAndStockId(userId, stock.getId());
        if (portfolio == null) {
            portfolio = new Portfolio();
            portfolio.setUser(new User(userId));  // Assuming User object exists
            portfolio.setStock(stock);
            portfolio.setQuantity(quantity);
            portfolio.setAveragePrice(stockPrice);
        } else {
            int newQuantity = portfolio.getQuantity() + quantity;
            double newAveragePrice = ((portfolio.getAveragePrice() * portfolio.getQuantity()) + totalCost) / newQuantity;
            portfolio.setQuantity(newQuantity);
            portfolio.setAveragePrice(newAveragePrice);
        }
        portfolioRepository.save(portfolio);

        // Add a transaction record for the buy operation
        Transaction transaction = new Transaction();
        transaction.setUser(new User(userId));  // Assuming User object exists
        transaction.setStock(stock);
        transaction.setType("BUY");
        transaction.setQuantity(quantity);
        transaction.setPrice(stockPrice);
        transaction.setTransactionDate(java.time.LocalDateTime.now());
        transactionRepository.save(transaction);
    }

    @Transactional
    public void sellStock(Long userId, String ticker, int quantity, double stockPrice) {
        Stock stock = stockRepository.findByTicker(ticker);
        if (stock == null) {
            throw new IllegalArgumentException("Stock not found for ticker: " + ticker);
        }

        Portfolio portfolio = portfolioRepository.findByUserIdAndStockId(userId, stock.getId());
        if (portfolio == null || portfolio.getQuantity() < quantity) {
            throw new IllegalArgumentException("Not enough stock quantity to sell.");
        }

//        double stockPrice = stock.getCurrentPrice();
        double totalRevenue = stockPrice * quantity;

        // Add funds to the user's account from selling the stock
        fundsService.addFunds(userId, totalRevenue);

        // Update the portfolio after the sale
        int newQuantity = portfolio.getQuantity() - quantity;
        System.out.println("Hai bro 2");
        if (newQuantity == 0) {
            System.out.println("Hai bro 3");
            portfolioRepository.deleteByUserIdAndStockId(userId, stock.getId());  // Delete portfolio entry if no stocks are left
        } else {
            portfolio.setQuantity(newQuantity);
            portfolioRepository.save(portfolio);
        }

        // Add a transaction record for the sell operation
        Transaction transaction = new Transaction();
        transaction.setUser(new User(userId));  // Assuming User object exists
        transaction.setStock(stock);
        transaction.setType("SELL");
        transaction.setQuantity(quantity);
        transaction.setPrice(stockPrice);
        transaction.setTransactionDate(java.time.LocalDateTime.now());
        transactionRepository.save(transaction);
    }

    // Get the top-performing stock in the user's portfolio based on percentage gain
    public Portfolio getTopPerformingStock(Long userId) {
        List<Portfolio> topPerformers = portfolioRepository.findTopPerformingStock(userId);
        return topPerformers.isEmpty() ? null : topPerformers.get(0);  // Return the top-performing stock
    }

    public void updateStockPrice(String ticker, double price) {
        // Find the stock by ticker
        Stock stock = stockRepository.findByTicker(ticker);

        stock.setCurrentPrice(price); // Assuming Stock has a setPrice method

        // Save the updated stock back to the database
        stockRepository.save(stock);
    }

    // Fetch all stocks in a user's portfolio (for dashboard view)
    public List<Portfolio> getPortfolioByUser(Long userId) {
        return portfolioRepository.findAllByUserId(userId);
    }
}
