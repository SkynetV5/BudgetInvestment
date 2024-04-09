package com.budgetInvestment.BudgetInvestment.service;

import com.budgetInvestment.BudgetInvestment.model.User;
import com.budgetInvestment.BudgetInvestment.response.LoginResponse;

import java.util.List;

public interface UserService {
    public User saveUser(User user);
    public List<User> getAllUsers();
    public List<User> getUserByEmail(String email);
}
