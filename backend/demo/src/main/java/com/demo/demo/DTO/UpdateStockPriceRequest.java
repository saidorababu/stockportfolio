package com.demo.demo.DTO;

public class UpdateStockPriceRequest {
    private String ticker;
    private double price;

    // Default Constructor
    public UpdateStockPriceRequest() {
    }

    // Parameterized Constructor
    public UpdateStockPriceRequest(String ticker, double price) {
        this.ticker = ticker;
        this.price = price;
    }

    // Getters and Setters
    public String getTicker() {
        return ticker;
    }

    public void setTicker(String ticker) {
        this.ticker = ticker;
    }

    public double getPrice() {
        return price;
    }

    public void setPrice(double price) {
        this.price = price;
    }
}
