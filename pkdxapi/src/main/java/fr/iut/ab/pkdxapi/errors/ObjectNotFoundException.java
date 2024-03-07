package fr.iut.ab.pkdxapi.errors;

import org.springframework.http.HttpStatus;

public class ObjectNotFoundException extends APIException{
    public ObjectNotFoundException(String message){
        super(message, HttpStatus.NOT_FOUND);
    }
}
