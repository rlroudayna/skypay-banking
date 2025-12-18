package com.skypay.banking_service.service;

import com.skypay.banking_service.model.Transaction;
import java.util.List;

public interface AccountService {
    void deposit(int amount);
    void withdraw(int amount);
    void printStatement();

    int getBalance();

    List<Transaction> getTransactions();
}