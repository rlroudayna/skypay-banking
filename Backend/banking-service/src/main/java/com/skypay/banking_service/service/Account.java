package com.skypay.banking_service.service;

import com.skypay.banking_service.model.Transaction;
import org.springframework.stereotype.Service;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

@Service
public class Account implements AccountService {
    private final List<Transaction> transactions = new ArrayList<>();
    private int currentBalance = 0;


    @Override
    public void deposit(int amount) {
        if (amount <= 0) throw new IllegalArgumentException("Amount must be positive");
        currentBalance += amount;
        transactions.add(new Transaction(LocalDateTime.now(), amount, currentBalance));
    }

    @Override
    public void withdraw(int amount) {
        if (amount <= 0) throw new IllegalArgumentException("Amount must be positive");
        if (amount > currentBalance) {
            throw new IllegalStateException("Insufficient balance");
        }

        currentBalance -= amount;
        transactions.add(new Transaction(LocalDateTime.now(), -amount, currentBalance));
    }

    @Override
    public void printStatement() {
        System.out.println("Date || Amount || Balance");
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd/MM/yyyy");

        for (int i = transactions.size() - 1; i >= 0; i--) {
            Transaction t = transactions.get(i);
            System.out.printf("%s || %d || %d%n",
                    t.date().format(formatter), t.amount(), t.balance());
        }
    }
    @Override
    public List<Transaction> getTransactions() {
        List<Transaction> reversed = new ArrayList<>(transactions);
        Collections.reverse(reversed);
        return reversed;
    }
    @Override
    public int getBalance() {
        return currentBalance;
    }
}