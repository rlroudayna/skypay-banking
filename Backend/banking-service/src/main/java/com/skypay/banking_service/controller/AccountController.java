package com.skypay.banking_service.controller;

import com.skypay.banking_service.model.Transaction;
import com.skypay.banking_service.service.AccountService;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/bank")
@CrossOrigin(origins = "http://localhost:3000")
public class AccountController {

    private final AccountService accountService;

    public AccountController(AccountService accountService) {
        this.accountService = accountService;
    }

    @PostMapping("/deposit")
    public void deposit(@RequestParam int amount) {
        accountService.deposit(amount);
    }

    @PostMapping("/withdraw")
    public void withdraw(@RequestParam int amount) {
        accountService.withdraw(amount);
    }

    @GetMapping("/statement")
    public List<Transaction> getStatement() {
        accountService.printStatement();
        return accountService.getTransactions();
    }
}