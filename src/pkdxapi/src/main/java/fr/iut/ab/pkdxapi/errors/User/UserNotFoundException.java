package fr.iut.ab.pkdxapi.errors.User;

import org.springframework.http.HttpStatus;

import fr.iut.ab.pkdxapi.errors.APIException;

public class UserNotFoundException extends APIException {
    public UserNotFoundException(String message) {
        super(message, HttpStatus.NOT_FOUND);
    }
}
