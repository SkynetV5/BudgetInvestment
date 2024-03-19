package com.budgetInvestment.BudgetInvestment.service;

import com.budgetInvestment.BudgetInvestment.model.Expenses;

import java.util.List;

public interface ExpensesService {
    public Expenses saveExpenses(Expenses expenses);

    public List<Expenses> getAllExpenses();
}
