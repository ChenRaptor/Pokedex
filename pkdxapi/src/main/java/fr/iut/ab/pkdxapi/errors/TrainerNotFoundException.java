package fr.iut.ab.pkdxapi.errors;

import org.springframework.http.HttpStatus;

public class TrainerNotFoundException extends APIException{
    public TrainerNotFoundException(String message){
        super(message, HttpStatus.NOT_FOUND);
    }
}
