package com.budgetInvestment.BudgetInvestment.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import org.springframework.format.annotation.DateTimeFormat;

import java.util.Date;

@Entity
@Table(name = "savings")
public class Savings {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @ManyToOne
    @JoinColumn(nullable = false)
    private User users;

    @Column(nullable = false)
    private double savings;

    @Column(nullable = false)
    private boolean addSavings;

    @Column(nullable = false)
    private boolean removeSavings;
    @DateTimeFormat(pattern = "yyyy-MM-dd")
    @Column(nullable = false)
    private Date date;

    public Savings() {
    }

    public Savings(long id, User users, double savings, boolean addSavings, boolean removeSavings, Date date) {
        this.id = id;
        this.users = users;
        this.savings = savings;
        this.addSavings = addSavings;
        this.removeSavings = removeSavings;
        this.date = date;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public double getSavings() {
        return savings;
    }

    public void setSavings(double savings) {
        this.savings = savings;
    }

    public Date getDate() {
        return date;
    }

    public void setDate(Date date) {
        this.date = date;
    }

    public User getUsers() {
        return users;
    }

    public void setUsers(User users) {
        this.users = users;
    }

    public boolean isAddSavings() {
        return addSavings;
    }

    public void setAddSavings(boolean addSavings) {
        this.addSavings = addSavings;
    }

    public boolean isRemoveSavings() {
        return removeSavings;
    }

    public void setRemoveSavings(boolean removeSavings) {
        this.removeSavings = removeSavings;
    }
}
