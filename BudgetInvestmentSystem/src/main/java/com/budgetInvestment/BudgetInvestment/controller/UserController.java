package com.budgetInvestment.BudgetInvestment.controller;

import com.budgetInvestment.BudgetInvestment.model.User;
import com.budgetInvestment.BudgetInvestment.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/users")
@CrossOrigin
public class UserController {
    @Autowired
    private UserService userService;

    @PostMapping("/add")
    public String add(@RequestBody User user){
        try {
            userService.saveUser(user);
            return "Nowy uzytkownik zostal dodany!";
        }catch (Exception e){
            System.out.println(e);
            return "Błąd, nie udało się dodać nowego użytkownika!";
        }
    }

    @GetMapping("/getAll")
    public List<User> getAllUsers(){
        try {
            return userService.getAllUsers();
        }catch (Exception e){
            System.out.println(e);
            return null;
        }
    }


}
