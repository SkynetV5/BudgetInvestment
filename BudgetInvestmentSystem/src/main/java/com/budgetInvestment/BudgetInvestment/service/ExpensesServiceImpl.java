package com.budgetInvestment.BudgetInvestment.service;

import com.budgetInvestment.BudgetInvestment.model.Expenses;
import com.budgetInvestment.BudgetInvestment.repository.ExpensesRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ExpensesServiceImpl implements ExpensesService{

    @Autowired
    private ExpensesRepository expensesRepository;

    @Override
    public Expenses saveExpenses(Expenses expenses) {
        return expensesRepository.save(expenses);
    }

    @Override
    public List<Expenses> getAllExpenses() {
        return expensesRepository.findAll();
    }

//    @Override
//    public List<Expenses> getExpensesForUser(Long users) {
//        return expensesRepository.findByUserId(users);
//    }
}
