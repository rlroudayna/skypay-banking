package com.skypay.banking_service;

import com.skypay.banking_service.service.Account;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;

class AccountTest {
    private Account account;

    @BeforeEach
    void setUp() {
        account = new Account();
    }

    @Test
    void testDepositIncreasesBalance() {
        account.deposit(1000);
        assertEquals(1000, account.getBalance());
    }

    @Test
    void testWithdrawDecreasesBalance() {
        account.deposit(1000);
        account.withdraw(400);
        assertEquals(600, account.getBalance());
    }
    @Test
    void testCannotWithdrawMoreThanBalance()   {
        account.deposit(100);
        assertThrows(IllegalStateException.class, () -> account.withdraw(200));
    }
}