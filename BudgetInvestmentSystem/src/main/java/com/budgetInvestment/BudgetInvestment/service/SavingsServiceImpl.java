package com.budgetInvestment.BudgetInvestment.service;

import com.budgetInvestment.BudgetInvestment.model.Savings;
import com.budgetInvestment.BudgetInvestment.repository.SavingsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class SavingsServiceImpl implements SavingsService{
    @Autowired
    private SavingsRepository savingsRepository;

    @Override
    public Savings saveSavings(Savings savings) {
        return savingsRepository.save(savings);
    }
}
