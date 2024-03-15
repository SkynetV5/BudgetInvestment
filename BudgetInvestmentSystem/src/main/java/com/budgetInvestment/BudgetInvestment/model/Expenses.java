package com.budgetInvestment.BudgetInvestment.model;

import jakarta.persistence.*;
import org.springframework.format.annotation.DateTimeFormat;

import java.util.Date;
import java.util.List;

@Entity
@Table(name="expenses")
public class Expenses {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    @ManyToOne
    @JoinColumn(nullable = false)
    private User users;
    @Column(nullable = false)
    private double expenses;
    @Column(nullable = false, length = 50)
    private String infoExpenses;


    private String descprition;
    @DateTimeFormat(pattern = "yyyy-MM-dd")
    @Column(nullable = false)
    private Date date;

    public Expenses(long id, User users, double expenses, String infoExpenses, Date date) {
        this.id = id;
        this.users = users;
        this.expenses = expenses;
        this.infoExpenses = infoExpenses;
        this.date = date;
    }

    public Expenses() {
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public User getUsers() {
        return users;
    }

    public void setUsers(User users) {
        this.users = users;
    }

    public double getExpenses() {
        return expenses;
    }

    public void setExpenses(double expenses) {
        this.expenses = expenses;
    }

    public String getInfoExpenses() {
        return infoExpenses;
    }

    public void setInfoExpenses(String infoExpenses) {
        this.infoExpenses = infoExpenses;
    }

    public Date getDate() {
        return date;
    }

    public void setDate(Date date) {
        this.date = date;
    }
}
