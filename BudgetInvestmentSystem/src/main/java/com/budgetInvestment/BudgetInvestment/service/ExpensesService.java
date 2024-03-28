package com.budgetInvestment.BudgetInvestment.service;

import com.budgetInvestment.BudgetInvestment.model.Expenses;
import com.budgetInvestment.BudgetInvestment.model.User;

import java.util.List;

public interface ExpensesService {
    public Expenses saveExpenses(Expenses expenses);

    public List<Expenses> getAllExpenses();

    public List<Expenses> getExpensesForUserById(Long userId);


}
