package fr.iut.ab.pkdxapi.errors;

import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;

public class APIException extends RuntimeException {
    private final HttpStatus status;

    public APIException(String message, HttpStatus status){
        super(message);
        this.status = status;
    }

    public HttpStatusCode getStatus() {
        return status;
    }
}
