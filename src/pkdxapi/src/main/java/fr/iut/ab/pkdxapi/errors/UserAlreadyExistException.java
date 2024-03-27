package fr.iut.ab.pkdxapi.errors;

import org.springframework.http.HttpStatus;

public class UserAlreadyExistException extends APIException{
    public UserAlreadyExistException(String message){
        super(message, HttpStatus.CONFLICT);
    }
}
