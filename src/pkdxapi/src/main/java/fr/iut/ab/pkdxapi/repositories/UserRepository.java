package fr.iut.ab.pkdxapi.repositories;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import fr.iut.ab.pkdxapi.models.user.UserData;

@Repository
public interface UserRepository extends MongoRepository<UserData, String> {
    UserData findByLogin(String login);
}
