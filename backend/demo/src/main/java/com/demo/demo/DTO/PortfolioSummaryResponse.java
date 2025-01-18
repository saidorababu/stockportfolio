package com.demo.demo.DTO;

import java.math.BigDecimal;

public class PortfolioSummaryResponse {
    private BigDecimal totalValue;
    private BigDecimal totalChange;
    private String topPerformerTicker;
    private BigDecimal topPerformerChange;

    public PortfolioSummaryResponse(BigDecimal totalValue, BigDecimal totalChange, String topPerformerTicker, BigDecimal topPerformerChange) {
        this.totalValue = totalValue;
        this.totalChange = totalChange;
        this.topPerformerTicker = topPerformerTicker;
        this.topPerformerChange = topPerformerChange;
    }

    public BigDecimal getTotalValue() {
        return totalValue;
    }

    public void setTotalValue(BigDecimal totalValue) {
        this.totalValue = totalValue;
    }

    public BigDecimal getTotalChange() {
        return totalChange;
    }

    public void setTotalChange(BigDecimal totalChange) {
        this.totalChange = totalChange;
    }

    public String getTopPerformerTicker() {
        return topPerformerTicker;
    }

    public void setTopPerformerTicker(String topPerformerTicker) {
        this.topPerformerTicker = topPerformerTicker;
    }

    public BigDecimal getTopPerformerChange() {
        return topPerformerChange;
    }

    public void setTopPerformerChange(BigDecimal topPerformerChange) {
        this.topPerformerChange = topPerformerChange;
    }
}
