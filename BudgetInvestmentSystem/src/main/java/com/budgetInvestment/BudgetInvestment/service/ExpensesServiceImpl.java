package com.budgetInvestment.BudgetInvestment.service;

import com.budgetInvestment.BudgetInvestment.model.Expenses;
import com.budgetInvestment.BudgetInvestment.repository.ExpensesRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ExpensesServiceImpl implements ExpensesService{

    @Autowired
    private ExpensesRepository expensesRepository;

    @Override
    public Expenses saveExpenses(Expenses expenses) {
        return expensesRepository.save(expenses);
    }
}
