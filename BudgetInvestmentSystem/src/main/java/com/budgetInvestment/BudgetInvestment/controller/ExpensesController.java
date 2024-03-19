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
        expensesService.saveExpenses(expenses);
        return "Nowy wydatek zostal dodany!";
    }

    @GetMapping("/getAll")
    public List<Expenses> getAllExpenses(){
        return expensesService.getAllExpenses();
    }
}
