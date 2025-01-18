package com.demo.demo.services;

import com.demo.demo.models.Funds;
import com.demo.demo.models.User;
import com.demo.demo.repositories.FundsRepository;
import org.springframework.stereotype.Service;

@Service
public class FundsService {

    private final FundsRepository fundsRepository;

    public FundsService(FundsRepository fundsRepository) {
        this.fundsRepository = fundsRepository;
    }

    // Deduct funds from the user's account
    public void deductFunds(Long userId, double amount) {
        Funds funds = fundsRepository.findByUserId(userId);
        if (funds == null || funds.getBalance() < amount) {
            throw new IllegalArgumentException("Insufficient funds.");
        }
        funds.setBalance(funds.getBalance() - amount);
        fundsRepository.save(funds);
    }

    // Add funds to the user's account
    public void addFunds(Long userId, double amount) {
        Funds funds = fundsRepository.findByUserId(userId);
        if (funds == null) {
            funds = new Funds();
            funds.setUser(new User(userId));  // Assuming User object exists
            funds.setBalance(amount);
        } else {
            funds.setBalance(funds.getBalance() + amount);
        }
        fundsRepository.save(funds);
    }
}
