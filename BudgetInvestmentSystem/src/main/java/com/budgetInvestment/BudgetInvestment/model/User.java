package com.budgetInvestment.BudgetInvestment.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;

import java.util.List;

@Entity
@Table(name="users")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToMany(mappedBy = "user")
    @JsonIgnore
    private List<Expenses> expenses;

    @OneToMany(mappedBy = "users")
    @JsonIgnore
    private List<Savings> savings;

    @OneToMany(mappedBy = "users")
    @JsonIgnore
    private List<Deposits> deposits;
    @Column(nullable = false,unique = true, length = 25)
    private String userName;
    @Column(nullable = false,length = 20)
    private String firstName;
    @Column(nullable = false,length = 20)
    private String lastName;
    @Column(nullable = false,length = 64)
    private String password;
    @Column(nullable = false,unique = true, length = 45)
    private String email;

    public User() {
    }

    public User(Long id, List<Expenses> expenses, List<Savings> savings, List<Deposits> deposits, String userName, String firstName, String lastName, String password, String email) {
        this.id = id;
        this.expenses = expenses;
        this.savings = savings;
        this.deposits = deposits;
        this.userName = userName;
        this.firstName = firstName;
        this.lastName = lastName;
        this.password = password;
        this.email = email;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getUsername() {
        return userName;
    }

    public void setUsername(String username) {
        this.userName = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public List<Expenses> getExpenses() {
        return expenses;
    }

    public void setExpenses(List<Expenses> expenses) {
        this.expenses = expenses;
    }

    public List<Savings> getSavings() {
        return savings;
    }

    public void setSavings(List<Savings> savings) {
        this.savings = savings;
    }

    public List<Deposits> getDeposits() {
        return deposits;
    }

    public void setDeposits(List<Deposits> deposits) {
        this.deposits = deposits;
    }
}
