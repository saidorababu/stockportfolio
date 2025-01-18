package com.demo.demo.DTO;

import java.math.BigDecimal;
import java.util.List;

public class StockPriceRequest {

    private String jwtToken;
    private List<StockPriceData> stocks;

    public static class StockPriceData {
        private String ticker;
        private BigDecimal currentPrice;

        // Getters and setters
        public String getTicker() {
            return ticker;
        }

        public void setTicker(String ticker) {
            this.ticker = ticker;
        }

        public BigDecimal getCurrentPrice() {
            return currentPrice;
        }

        public void setCurrentPrice(BigDecimal currentPrice) {
            this.currentPrice = currentPrice;
        }
    }

    // Getters and setters for portfolioId and stocks
    public String getJwtToken() {
        return jwtToken;
    }

    public void setJwtToken(String jwtToken) {
        this.jwtToken = jwtToken;
    }

    public List<StockPriceData> getStocks() {
        return stocks;
    }

    public void setStocks(List<StockPriceData> stocks) {
        this.stocks = stocks;
    }
}
