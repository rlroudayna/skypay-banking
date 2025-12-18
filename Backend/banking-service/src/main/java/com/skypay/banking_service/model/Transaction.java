package com.skypay.banking_service.model;

import java.time.LocalDateTime;

public record Transaction(LocalDateTime date, int amount, int balance) {}