package com.budgetInvestment.BudgetInvestment.controller;

import com.budgetInvestment.BudgetInvestment.model.User;
import com.budgetInvestment.BudgetInvestment.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/users")
public class UserController {
    @Autowired
    private UserService userService;

    @PostMapping("/add")
    public String add(@RequestBody User user){
        userService.saveUser(user);
        return "Nowy uzytkownik zostal dodany!";
    }

    @GetMapping("/getAll")
    public List<User> getAllUsers(){
        return userService.getAllUsers();
    }


}
