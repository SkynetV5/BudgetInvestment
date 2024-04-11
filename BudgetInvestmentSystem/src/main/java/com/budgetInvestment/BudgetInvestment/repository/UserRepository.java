package com.budgetInvestment.BudgetInvestment.repository;

import com.budgetInvestment.BudgetInvestment.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User,Long> {

    List<User> findByEmail(String email);

    List<User> findByUserName(String userName);

    Optional<User> findById(Long id);
}

