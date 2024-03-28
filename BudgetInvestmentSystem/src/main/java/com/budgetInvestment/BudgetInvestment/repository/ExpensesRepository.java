package com.budgetInvestment.BudgetInvestment.repository;

import com.budgetInvestment.BudgetInvestment.model.Expenses;
import com.budgetInvestment.BudgetInvestment.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ExpensesRepository extends JpaRepository<Expenses,Long> {

    public List<Expenses> findExpensesByUserId(Long userId);
}
