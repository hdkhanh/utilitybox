package com.utilitybox.auth.models.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.UNAUTHORIZED)
public class InvalidCredentialsException extends Exception {
    public InvalidCredentialsException(Throwable cause) {
        super("INVALID_CREDENTIALS", cause);
    }
}
