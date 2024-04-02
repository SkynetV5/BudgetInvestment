package com.budgetInvestment.BudgetInvestment.controller;

import com.budgetInvestment.BudgetInvestment.model.Expenses;
import com.budgetInvestment.BudgetInvestment.service.ExpensesService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/expenses")
public class ExpensesController {

    @Autowired
    private ExpensesService expensesService;

    @PostMapping("/add")
    public String add(@RequestBody Expenses expenses){
        try{
            expensesService.saveExpenses(expenses);
            return "Nowy wydatek zostal dodany!";
        } catch (Exception e){
            System.out.println(e);
            return "Błąd dodania wydatku! Spróbuj ponownie później.";
        }

    }

    @GetMapping("/getAll")
    public List<Expenses> getAllExpenses(){
        try{
            return expensesService.getAllExpenses();
        } catch (Exception e){
            System.out.println(e);
            return null;
        }

    }

    @GetMapping("/{userId}")
    public List<Expenses> getExpensesForUser(@PathVariable Long userId) {
        try {
            return expensesService.getExpensesForUserById(userId);
        } catch (Exception e){
            System.out.println(e);
            return null;
        }


    }
}
