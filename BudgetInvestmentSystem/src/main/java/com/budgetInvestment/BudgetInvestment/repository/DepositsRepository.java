package com.budgetInvestment.BudgetInvestment.repository;

import com.budgetInvestment.BudgetInvestment.model.Deposits;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface DepositsRepository extends JpaRepository<Deposits,Long> {

    public List<Deposits> findDepositsByUserId(Long userId);
}
