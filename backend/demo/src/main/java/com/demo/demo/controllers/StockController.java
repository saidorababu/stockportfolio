package com.demo.demo.controllers;

import com.demo.demo.DTO.BuyStockRequest;
import com.demo.demo.DTO.SellStockRequest;
import com.demo.demo.DTO.*;
import com.demo.demo.models.Portfolio;
import com.demo.demo.models.Stock;
import com.demo.demo.models.User;
import com.demo.demo.services.JwtService;
import com.demo.demo.services.PortfolioService;
import com.demo.demo.services.StockService;
import com.demo.demo.services.UserService;
import io.jsonwebtoken.Jwt;
import io.jsonwebtoken.JwtException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/stocks")
public class StockController {

    private final StockService stockService;
    private final PortfolioService portfolioService;
    private final JwtService jwtService;
    private final UserService userService;

    @Autowired
    public StockController(StockService stockService, PortfolioService portfolioService, JwtService jwtService, UserService userService) {
        this.stockService = stockService;
        this.portfolioService = portfolioService;
        this.jwtService = jwtService;
        this.userService = userService;
    }

    @PostMapping("/buy")
    public ResponseEntity<String> buyStock(@RequestBody BuyStockRequest buyStockRequest) {
        try {
            // Extract userId from JWT token

            String username = jwtService.extractUsername(buyStockRequest.getJwtToken());
            System.out.println(username);
            // Fetch the user entity using the username
            Optional<User> user = userService.findUserByUsername(username);
            System.out.println(user.get().getId());

            if (user.isEmpty()) {
                return ResponseEntity.status(404).body("User not found.");
            }

            Long userId = user.get().getId(); // Extract the userId
            System.out.println(userId);
            // Perform the buy operation (passing price as well)
            stockService.buyStock(
                    userId,
                    buyStockRequest.getTicker(),
                    buyStockRequest.getQuantity(),
                    buyStockRequest.getPrice() // Pass the price here
            );
            System.out.println(userId);

            // Return success response
            return ResponseEntity.ok("Stock purchased successfully.");
        } catch (Exception e) {
            // Handle errors and return appropriate response
            return ResponseEntity.badRequest().body("Error purchasing stock: " + e.getMessage());
        }
    }
    // Sell Stock API Endpoint
    @PostMapping("/sell")
    public ResponseEntity<String> sellStock(@RequestBody SellStockRequest sellStockRequest) {
        try {
            // Extract userId from JWT token
            String username = jwtService.extractUsername(sellStockRequest.getJwtToken());
            // Fetch the user entity using the username
            Optional<User> user = userService.findUserByUsername(username);

            if (user.isEmpty()) {
                return ResponseEntity.status(404).body("User not found.");
            }

            Long userId = user.get().getId(); // Extract the userId
            // Perform the sell operation
            System.out.println("hai bro000");
            stockService.sellStock(
                    userId,
                    sellStockRequest.getTicker(),
                    sellStockRequest.getQuantity(),
                    sellStockRequest.getPrice()
            );
            System.out.println("hai bro000");

            // Return success response
            return ResponseEntity.ok("Stock sold successfully.");
        } catch (Exception e) {
            // Handle errors and return appropriate response
            return ResponseEntity.badRequest().body("Error selling stock: " + e.getMessage());
        }
    }
    // Get the top-performing stock in the user's portfolio
    @GetMapping("/top-performing/{jwtToken}")
    public ResponseEntity<?> getTopPerformingStock(@PathVariable String jwtToken) {
        try {
            // Extract userId from JWT token
            String username = jwtService.extractUsername(jwtToken);
            System.out.println(username);
            // Fetch the user entity using the username
            Optional<User> userOptional = userService.findUserByUsername(username);
            System.out.println(username);
            if (userOptional.isEmpty()) {
                return ResponseEntity.status(404).body("User not found.");
            }
            System.out.println(username);
            // Get the userId from the user entity
            Long userId = userOptional.get().getId();
            // Get the top-performing stock
            Portfolio topPerformer = stockService.getTopPerformingStock(userId);
            System.out.println(userId);
            // Return response
            if (topPerformer != null) {
                return ResponseEntity.ok(topPerformer);
            } else {
                return ResponseEntity.ok("No stocks found in the user's portfolio.");
            }
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error retrieving top-performing stock: " + e.getMessage());
        }
    }

    @GetMapping("/portfolio-summary/{jwtToken}")
    public ResponseEntity<?> getPortfolioSummary(@PathVariable String jwtToken) {
        try {
            // Extract username from JWT token
            String username = jwtService.extractUsername(jwtToken);

            // Fetch the user entity using the username
            Optional<User> userOptional = userService.findUserByUsername(username);

            if (userOptional.isEmpty()) {
                return ResponseEntity.status(404).body("User not found.");
            }

            // Get the userId from the user entity
            Long userId = userOptional.get().getId();

            // Get the portfolio summary
            PortfolioSummaryResponse summary = portfolioService.getPortfolioSummary(userId);

            return ResponseEntity.ok(summary);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error retrieving portfolio summary: " + e.getMessage());
        }
    }


    // Endpoint to retrieve all stocks of the user by jwtToken
    @GetMapping("/holdings/{jwtToken}")
    public ResponseEntity<?> getUserStocks(@PathVariable String jwtToken) {
        try {
            // Extract username from the JWT token
            String username = jwtService.extractUsername(jwtToken);
            System.out.println(username);
            // Fetch the user entity using the username
            Optional<User> userOptional = userService.findUserByUsername(username);
            System.out.println(username);
            if (userOptional.isEmpty()) {
                return ResponseEntity.status(404).body("User not found.");
            }
            System.out.println(username);
            // Get the userId from the user entity
            Long userId = userOptional.get().getId();

            // Retrieve the user's portfolio
            List<Portfolio> portfolios = portfolioService.getPortfoliosByUserId(userId);
            System.out.println(username);
            // Extract and return the stocks in the portfolio
            if (portfolios.isEmpty()) {
                return ResponseEntity.ok("No portfolios found for this user.");
            }
            System.out.println(username);

            return ResponseEntity.ok(portfolios);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error retrieving user stocks: " + e.getMessage());
        }
    }

    @PostMapping("/updatePrice")
    public ResponseEntity<String> updateStockPrice(@RequestBody UpdateStockPriceRequest request) {
        try {
            // Extract the ticker and price from the DTO
            String ticker = request.getTicker();
            double price = request.getPrice();

            // Update the stock price in the database
            stockService.updateStockPrice(ticker, price);

            // Return success response
            return ResponseEntity.ok("Stock price updated successfully.");
        } catch (Exception e) {
            // Handle errors and return appropriate response
            return ResponseEntity.badRequest().body("Error updating stock price: " + e.getMessage());
        }
    }



}

//    @PostMapping("/add")
//    public ResponseEntity<?> addStock(@RequestBody BuyStockRequest buyStockRequest) {
//        String jwtToken = buyStockRequest.getJwtToken();
//        String ticker = buyStockRequest.getTicker();
//        int quantity = buyStockRequest.getQuantity();
//        BigDecimal price = buyStockRequest.getPrice();
//        System.out.println(price);
//
//        try {
//            System.out.println(ticker);
//            // Step 1: Extract username from the token
//            String username = jwtService.extractUsername(jwtToken);
//            System.out.println(username);
//            // Step 2: Find the user in the database by username
//            Optional<User> userOptional = userService.findUserByUsername(username);
//            if (userOptional.isEmpty()) {
//                return ResponseEntity.status(404).body("User not found.");
//            }
//            User user = userOptional.get();
//            // Step 3: Validate the token for the user
//            if (!jwtService.validateToken(jwtToken, user)) {
//                return ResponseEntity.status(401).body("Invalid or expired JWT token.");
//            }
//            System.out.println(user.getUsername());
////
//            // Step 4: Proceed to add stock to user's portfolio
//            Optional<Portfolio> portfolio = portfolioService.getPortfolioForUser(user.getId());
//            Stock stock = new Stock();
//            stock.setTicker(ticker);
//            stock.setQuantity(quantity);
//            stock.setBuyPrice(price);
//            System.out.println(portfolio.get());
//            stock.setPortfolio(portfolio.get());
//            stock.setPurchaseDate(LocalDateTime.now());
//
//            Stock stk = portfolioService.addStockToPortfolio(portfolio.get().getId(), stock);
//            System.out.println(stk);
//            Portfolio newportfolio = portfolio.get();
//            // Update the portfolio total value
//            newportfolio.setTotalValue(newportfolio.getTotalValue().add(price.multiply(BigDecimal.valueOf(quantity))));
//            portfolioService.updatePortfolio(newportfolio); // Assuming there's an update method in the service
//            return ResponseEntity.ok("Stock added successfully.");
//        } catch (JwtException e) {
//            return ResponseEntity.status(401).body("Invalid JWT token: " + e.getMessage());
//        } catch (Exception e) {
//            return ResponseEntity.status(500).body("An error occurred: " + e.getMessage());
//        }
//    }

//    @PostMapping("/highest-performing")
//    public ResponseEntity<?> getHighestPerformingStock(@RequestBody StockPriceRequest stockPriceRequest) {
//        try {
//            String jwtToken = stockPriceRequest.getJwtToken();
//            String username = jwtService.extractUsername(jwtToken);
//            System.out.println(username);
//            // Step 2: Find the user in the database by username
//            Optional<User> userOptional = userService.findUserByUsername(username);
//            if (userOptional.isEmpty()) {
//                return ResponseEntity.status(404).body("User not found.");
//            }
//            User user = userOptional.get();
//            // Step 3: Validate the token for the user
//            if (!jwtService.validateToken(jwtToken, user)) {
//                return ResponseEntity.status(401).body("Invalid or expired JWT token.");
//            }
//            System.out.println(user.getUsername());
////
//            // Step 4: Proceed to add stock to user's portfolio
//            Optional<Portfolio> portfolio = portfolioService.getPortfolioForUser(user.getId());
//
//            Long portfolioId = portfolio.get().getId();
//            List<StockPriceRequest.StockPriceData> stocks = stockPriceRequest.getStocks();
//
//            Stock highestPerformingStock = null;
//            BigDecimal highestPerformance = BigDecimal.ZERO;
//
//            for (StockPriceRequest.StockPriceData stockData : stocks) {
//                String ticker = stockData.getTicker();
//                BigDecimal currentPrice = stockData.getCurrentPrice();
//
//                // Calculate total change for each stock using the current price
//                BigDecimal totalChange = stockService.getTotalChange(ticker, portfolioId, currentPrice);
//
//                // Compare performance to find the highest performing stock
//                if (totalChange.compareTo(highestPerformance) > 0) {
//                    highestPerformance = totalChange;
//                    highestPerformingStock = stockService.getStockByTickerAndPortfolioId(ticker, portfolioId).get(0);
//                }
//            }
//
//            if (highestPerformingStock != null) {
//                return ResponseEntity.ok(highestPerformingStock);
//            } else {
//                return ResponseEntity.status(404).body("No stocks found in portfolio");
//            }
//
//        } catch (Exception e) {
//            return ResponseEntity.status(500).body("An error occurred: " + e.getMessage());
//        }
//    }





//    // Endpoint to get stocks by ticker
//    @GetMapping("/ticker/{ticker}")
//    public List<Stock> getStocksByTicker(@PathVariable String ticker) {
//        return stockService.getStocksByTicker(ticker);
//    }
//
//    // Endpoint to get stocks by stock name
//    @GetMapping("/name/{stockName}")
//    public List<Stock> getStocksByStockName(@PathVariable String stockName) {
//        return stockService.getStocksByStockName(stockName);
//    }
//
//    // Endpoint to get the total quantity of a stock by ticker
//    @GetMapping("/quantity")
//    public Integer getTotalQuantityByTicker(@RequestParam String ticker) {
//        return stockService.getTotalQuantityByTicker(ticker);
//    }
//
//    // Endpoint to get stocks by buy price greater than a certain value
//    @GetMapping("/buyPrice")
//    public List<Stock> getStocksByBuyPriceGreaterThan(@RequestParam BigDecimal buyPrice) {
//        return stockService.getStocksByBuyPriceGreaterThan(buyPrice);
//    }
//
//    // Endpoint to get stocks by stock name and ticker
//    @GetMapping("/search")
//    public List<Stock> getStocksByStockNameAndTicker(@RequestParam String stockName, @RequestParam String ticker) {
//        return stockService.getStocksByStockNameAndTicker(stockName, ticker);
//    }
//
//    // Endpoint to create a new stock
//    @PostMapping("/add")
//    public Stock createStock(@RequestBody Stock stock) {
//        return portfolioService.addStockToPortfolio(stock.getPortfolio().getId(), stock);  // Assuming the stock has portfolio information
//    }
//
//    // Endpoint to delete a stock by ticker
//    @DeleteMapping("/ticker/{ticker}")
//    public void deleteStockByTicker(@PathVariable String ticker) {
//        stockService.deleteStockByTicker(ticker);
//    }
//
//    // Endpoint to get the total value of a portfolio by its ID
//    @GetMapping("/portfolio/{portfolioId}/value")
//    public BigDecimal getTotalValueByPortfolioId(@PathVariable Long portfolioId) {
//        return stockService.getTotalValueByPortfolioId(portfolioId);
//    }
//
//    @PostMapping("/sell")
//    public ResponseEntity<String> sellStock(@RequestBody SellStockRequest sellStockRequest) {
//        String response = stockService.sellStock(sellStockRequest.getTicker(), sellStockRequest.getQuantity(), sellStockRequest.getPortfolioId());
//        return ResponseEntity.ok(response);
//    }

