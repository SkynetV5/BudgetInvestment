package com.budgetInvestment.BudgetInvestment.service;

import com.budgetInvestment.BudgetInvestment.model.Deposits;

import java.util.List;

public interface DepositsService {

    public Deposits saveDeposits(Deposits deposits);

    public List<Deposits> getAllDeposits();

    public List<Deposits> getDepositsForUserById(Long userId);
}
