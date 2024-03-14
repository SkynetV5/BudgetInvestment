package com.budgetInvestment.BudgetInvestment.repository;

import com.budgetInvestment.BudgetInvestment.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<User,Long> {
}
