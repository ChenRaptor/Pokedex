package fr.iut.ab.pkdxapi.errors;

import org.springframework.http.HttpStatus;

public class TrainerAlreadyExistException extends APIException {
    public TrainerAlreadyExistException(String message){
        super(message, HttpStatus.CONFLICT);
    }
}