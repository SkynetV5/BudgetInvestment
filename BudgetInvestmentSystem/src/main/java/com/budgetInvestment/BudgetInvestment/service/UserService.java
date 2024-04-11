package com.budgetInvestment.BudgetInvestment.service;

import com.budgetInvestment.BudgetInvestment.model.User;

import java.util.List;
import java.util.Optional;

public interface UserService {
    public User saveUser(User user);
    public List<User> getAllUsers();
    public List<User> getUserByEmail(String email);

    public List<User> getUserByUserName(String userName);

    public Optional<User> getUserById(Long id);
}
