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
        return "Dodano nowe oszczednosci!";
    }

    @GetMapping("/getAll")
    public List<Savings> getAllSavings(){
        return savingsService.getAllSavings();
    }


}
