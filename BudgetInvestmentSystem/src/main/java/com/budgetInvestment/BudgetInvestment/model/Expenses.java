package com.budgetInvestment.BudgetInvestment.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import org.springframework.format.annotation.DateTimeFormat;

import java.util.Date;

@Entity
@Table(name="expenses")
public class Expenses {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    @ManyToOne
    @JoinColumn(nullable = false)
    private User user;
    @Column(nullable = false)
    private double expenses;
    @Column(nullable = false, length = 50)
    private String infoExpenses;

    private String description;
    @DateTimeFormat(pattern = "yyyy-MM-dd")
    @Column(nullable = false)
    private Date date;


    public Expenses(long id, User user, double expenses, String infoExpenses, String description, Date date) {
        this.id = id;
        this.user = user;
        this.expenses = expenses;
        this.infoExpenses = infoExpenses;
        this.description = description;
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

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
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

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }
}
