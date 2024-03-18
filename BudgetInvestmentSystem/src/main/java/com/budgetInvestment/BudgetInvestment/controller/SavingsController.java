package com.budgetInvestment.BudgetInvestment.controller;

import com.budgetInvestment.BudgetInvestment.model.Savings;
import com.budgetInvestment.BudgetInvestment.service.SavingsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

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

}
