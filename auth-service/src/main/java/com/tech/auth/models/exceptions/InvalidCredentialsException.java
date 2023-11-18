package com.tech.auth.models.exceptions;

public class InvalidCredentialsException extends Exception {
    public InvalidCredentialsException(Throwable cause) {
        super("INVALID_CREDENTIALS", cause);
    }
}
