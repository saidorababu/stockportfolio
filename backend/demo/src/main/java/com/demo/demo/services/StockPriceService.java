package com.demo.demo.services;

import com.demo.demo.models.Stock;
import com.demo.demo.repositories.StockRepository;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.List;
import java.util.Random;

@Service
public class StockPriceService {

    private final StockRepository stockRepository;
    private final RestTemplate restTemplate;

    public StockPriceService(StockRepository stockRepository, RestTemplate restTemplate) {
        this.stockRepository = stockRepository;
        this.restTemplate = restTemplate;
    }

    private static final String API_URL = "https://api.twelvedata.com/price";
    private static final String[] API_KEYS = {
            "e81dbf2504ce43239381926950226928",  // khsd118194@gmail.com
            "ea1a6eb075a24df18b9fe3dc20469609",  // khsaidorababu219@gmail.com
            "351621a8538b42168dfcafbc56f4eb7b",  // khsdorababu11819@gmail.com
            "4ad764c35ba44c6c88fbd1604069112b",  // coderr912@gmail.com
            "52cb795c776f404abfbdf6a7e0028867",  // khsdorababu.pc@gmail.com
            "171587164539423193268477e9ddaef9"   // khsaidorababu@gmail.com
    };

    private String getRandomApiKey() {
        Random random = new Random();
        int index = random.nextInt(API_KEYS.length); // Random index from 0 to API_KEYS.length-1
        return API_KEYS[index];
    }

    public Double fetchRealtimePrice(String ticker) {
        String apiKey = getRandomApiKey();
        String url = API_URL + "?symbol=" + ticker + "&apikey=" + apiKey;

        try {
            // Call the API and get the price
            RealtimePriceResponse response = restTemplate.getForObject(url, RealtimePriceResponse.class);
            return response != null ? response.getPrice() : null;
        } catch (Exception e) {
            System.err.println("Error fetching real-time price for ticker: " + ticker);
            e.printStackTrace();
            return null;
        }
    }

//    @Scheduled(fixedRate = 30000) // Run every 30 seconds
//    public void updateStockPrices() {
//        List<Stock> stocks = stockRepository.findAll();
//
//        for (Stock stock : stocks) {
//            Double realtimePrice = fetchRealtimePrice(stock.getTicker());
//            if (realtimePrice != null) {
//                stock.setCurrentPrice(realtimePrice);
//                stockRepository.save(stock);
//                System.out.println("Updated price for " + stock.getTicker() + ": " + realtimePrice);
//            }
//        }
//    }

    private static class RealtimePriceResponse {
        private Double price;

        public Double getPrice() {
            return price;
        }

        public void setPrice(Double price) {
            this.price = price;
        }
    }
}
