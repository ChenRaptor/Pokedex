package fr.iut.ab.pkdxapi.errors.User;

import org.springframework.http.HttpStatus;

import fr.iut.ab.pkdxapi.errors.APIException;

public class UserAlreadyExistException extends APIException{
    public UserAlreadyExistException(String message){
        super(message, HttpStatus.CONFLICT);
    }
}
