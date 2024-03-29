package com.budgetInvestment.BudgetInvestment.controller;

import com.budgetInvestment.BudgetInvestment.model.Deposits;
import com.budgetInvestment.BudgetInvestment.service.DepositsService;
import com.budgetInvestment.BudgetInvestment.service.SavingsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/deposits")
public class DepositsController {

    @Autowired
    private DepositsService depositsService;

    @PostMapping("/add")
    public String add(@RequestBody Deposits deposits){
        depositsService.saveDeposits(deposits);
        return "Dodano nowy przelew!";
    }

    @GetMapping("/getAll")
    public List<Deposits> getAllDeposists(){
        return depositsService.getAllDeposits();
    }
}
