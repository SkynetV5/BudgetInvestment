package com.budgetInvestment.BudgetInvestment.controller;

import com.budgetInvestment.BudgetInvestment.model.Savings;
import com.budgetInvestment.BudgetInvestment.service.SavingsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/savings")
public class SavingsController {

    @Autowired
    private SavingsService savingsService;

    @PostMapping("/add")
    public String add(@RequestBody Savings savings){
        savingsService.saveSavings(savings);
        try {
            return "Dodano nowe oszczedności!";
        } catch (Exception e){
            System.out.println(e);
            return "Błąd dodania oszczędności! Spróbuj ponownie później.";
        }
    }

    @GetMapping("/getAll")
    public List<Savings> getAllSavings(){
        try {
            return savingsService.getAllSavings();
        } catch(Exception e){
            System.out.println(e);
            return null;
        }
    }

    @GetMapping("/{userId}")
    public List<Savings> getSavingsForUser(Long userId){
        try {
            return savingsService.getSavingForUserById(userId);
        } catch (Exception e){
            System.out.println(e);
            return null;
        }
    }


}
