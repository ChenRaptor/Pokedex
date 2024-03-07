package fr.iut.ab.pkdxapi.repositories;

import java.util.Optional;

import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

import fr.iut.ab.pkdxapi.models.UserData;

@Repository
public interface UserRepository extends MongoRepository<UserData,ObjectId>{
    @Query("{login:'?0'}")
    Optional<UserData> findByLogin(String login);
}
