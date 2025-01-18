package com.demo.demo.controllers;

import com.demo.demo.models.Portfolio;
import com.demo.demo.models.Stock;
import com.demo.demo.services.PortfolioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/portfolios")
public class PortfolioController {

    private final PortfolioService portfolioService;

    @Autowired
    public PortfolioController(PortfolioService portfolioService) {
        this.portfolioService = portfolioService;
    }




//    // Endpoint to get all portfolios
//    @GetMapping("/")
//    public List<Portfolio> getAllPortfolios() {
//        return portfolioService.getAllPortfolios();
//    }
//
//    // Endpoint to get portfolio by its ID
//    @GetMapping("/{portfolioId}")
//    public Optional<Portfolio> getPortfolioById(@PathVariable Long portfolioId) {
//        return portfolioService.getPortfolioById(portfolioId);
//    }
//
//    // Endpoint to get the total value of a portfolio by its ID
//    @GetMapping("/{portfolioId}/value")
//    public BigDecimal getTotalValueByPortfolioId(@PathVariable Long portfolioId) {
//        return portfolioService.getTotalValueByPortfolioId(portfolioId);
//    }
//
//    // Endpoint to create a new portfolio
//    @PostMapping("/add")
//    public Portfolio createPortfolio(@RequestBody Portfolio portfolio) {
//        return portfolioService.createPortfolio(portfolio);
//    }
//
//    // Endpoint to update an existing portfolio
//    @PutMapping("/{portfolioId}")
//    public Portfolio updatePortfolio(@PathVariable Long portfolioId, @RequestBody Portfolio portfolio) {
//        return portfolioService.updatePortfolio(portfolioId, portfolio);
//    }
//
//    // Endpoint to delete a portfolio by ID
//    @DeleteMapping("/{portfolioId}")
//    public void deletePortfolio(@PathVariable Long portfolioId) {
//        portfolioService.deletePortfolio(portfolioId);
//    }
//
//    // Endpoint to get all stocks in a portfolio by portfolio ID
//    @GetMapping("/{portfolioId}/stocks")
//    public List<Stock> getStocksByPortfolioId(@PathVariable Long portfolioId) {
//        return portfolioService.getStocksByPortfolioId(portfolioId);
//    }

//    // Endpoint to get the portfolio summary by portfolio ID (e.g., total value, top performer, etc.)
//    @GetMapping("/{portfolioId}/summary")
//    public PortfolioSummary getPortfolioSummary(@PathVariable Long portfolioId) {
//        return portfolioService.getPortfolioSummary(portfolioId);
//    }
}
