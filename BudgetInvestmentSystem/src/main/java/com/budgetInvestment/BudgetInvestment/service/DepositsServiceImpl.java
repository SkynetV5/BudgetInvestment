package com.budgetInvestment.BudgetInvestment.service;

import com.budgetInvestment.BudgetInvestment.model.Deposits;
import com.budgetInvestment.BudgetInvestment.repository.DepositsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class DepositsServiceImpl implements DepositsService{

    @Autowired
    private DepositsRepository depositsRepository;

    @Override
    public Deposits saveDeposits(Deposits deposits) {
        return depositsRepository.save(deposits);
    }
}
