package fr.iut.ab.pkdxapi.errors;

public class ApiFileNotFoundException extends ObjectNotFoundException {
    public ApiFileNotFoundException(String fileName){
        super("the file " + fileName + " is not found or not readable");
    }
}
