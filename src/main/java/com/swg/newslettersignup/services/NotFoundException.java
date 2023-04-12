package com.swg.newslettersignup.services;

import org.springframework.http.HttpStatus;

public class NotFoundException extends Exception {
    public NotFoundException(String message, HttpStatus notFound) {
        super(message);
    }
}

