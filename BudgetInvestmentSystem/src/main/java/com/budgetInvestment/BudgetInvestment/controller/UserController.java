package com.budgetInvestment.BudgetInvestment.controller;

import com.budgetInvestment.BudgetInvestment.model.User;
import com.budgetInvestment.BudgetInvestment.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

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

    @GetMapping("/email/{email}")
    public List<User> getUserByEmail(@PathVariable String email){
        try {
            return userService.getUserByEmail(email);
        } catch (Exception e){
            return null;
        }

    }

    @GetMapping("/userName/{userName}")
    public List<User> getUserByUserName(@PathVariable String userName){
        try{
            return userService.getUserByUserName(userName);
        } catch (Exception e){
            System.out.println(e);
            return null;
        }
    }

    @GetMapping("/id/{id}")
    public Optional<User> getUserById(@PathVariable Long id){
        try{
            return userService.getUserById(id);
        } catch (Exception e){
            System.out.println(e);
            return null;
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
