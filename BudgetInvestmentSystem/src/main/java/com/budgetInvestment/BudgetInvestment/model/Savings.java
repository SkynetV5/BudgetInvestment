package com.budgetInvestment.BudgetInvestment.model;

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
    private User user;

    @Column(nullable = false)
    private double savings;

    @Column(nullable = false, columnDefinition = "TINYINT", length = 1)
    private boolean addSavings;

    @Column(nullable = false, columnDefinition = "TINYINT", length = 1)
    private boolean removeSavings;
    @DateTimeFormat(pattern = "yyyy-MM-dd")
    @Column(nullable = false)
    private Date date;

    public Savings() {
    }

    public Savings(long id, User user, double savings, boolean addSavings, boolean removeSavings, Date date) {
        this.id = id;
        this.user = user;
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

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
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
