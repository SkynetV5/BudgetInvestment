package com.budgetInvestment.BudgetInvestment.service;

import com.budgetInvestment.BudgetInvestment.model.Savings;

import java.util.List;

public interface SavingsService {
    public Savings saveSavings(Savings savings);

    public List<Savings> getAllSavings();

    public List<Savings> getSavingForUserById(Long userId);
}
