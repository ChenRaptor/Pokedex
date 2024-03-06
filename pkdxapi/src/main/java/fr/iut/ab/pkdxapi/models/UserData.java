package fr.iut.ab.pkdxapi.models;

import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.TypeAlias;
import org.springframework.data.mongodb.core.mapping.Document;

@Document("User")
@TypeAlias("UserData")
public class UserData extends UserDTO{

    @Id
    private ObjectId id;

    public UserData(String login, String password, boolean isAdmin){
        super(login, password, isAdmin); // Add this line to invoke the constructor of the superclass UserDTO
        this.id = ObjectId.get();
    }

    public ObjectId getId(){
        return id;
    }
}