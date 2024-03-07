package fr.iut.ab.pkdxapi.errors;

public class PersonsNotFoundException extends ObjectNotFoundException{
    public PersonsNotFoundException(){
        super("No persons in database");
    }
}
