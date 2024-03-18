package com.budgetInvestment.BudgetInvestment.model;

import jakarta.persistence.*;
import org.springframework.format.annotation.DateTimeFormat;

import java.util.Date;

@Entity
@Table(name = "deposits")
public class Deposits {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @ManyToOne
    @JoinColumn(nullable = false)
    private User users;

    @Column(nullable = false)
    private double deposits;

    @Column(nullable = false)
    private String infoDeposits;

    private String description;

    @DateTimeFormat(pattern = "yyyy-MM-dd")
    @Column(nullable = false)
    private Date date;

    public Deposits(long id, User users, double deposits, String infoDeposits, String description, Date date) {
        this.id = id;
        this.users = users;
        this.deposits = deposits;
        this.infoDeposits = infoDeposits;
        this.description = description;
        this.date = date;
    }

    public Deposits() {
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

    public double getDeposits() {
        return deposits;
    }

    public void setDeposits(double deposits) {
        this.deposits = deposits;
    }

    public String getInfoDeposits() {
        return infoDeposits;
    }

    public void setInfoDeposits(String infoDeposits) {
        this.infoDeposits = infoDeposits;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Date getDate() {
        return date;
    }

    public void setDate(Date date) {
        this.date = date;
    }
}
