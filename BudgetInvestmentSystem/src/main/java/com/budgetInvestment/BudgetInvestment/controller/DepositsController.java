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
        try {
            depositsService.saveDeposits(deposits);
            return "Dodano nowy przelew!";
        } catch (Exception e){
            System.out.println(e);
            return "Błąd dodania przelewu! Spróbuj ponownie później";
        }
    }

    @GetMapping("/getAll")
    public List<Deposits> getAllDeposists(){
        try {
            return depositsService.getAllDeposits();
        } catch( Exception e){
            System.out.println(e);
            return null;
        }
    }

    @GetMapping("/{userId}")
    public List<Deposits> getDepositsForUser(@PathVariable Long userId){
        try{
            return depositsService.getDepositsForUserById(userId);
        } catch (Exception e){
            System.out.println(e);
            return null;
        }
    }
}
