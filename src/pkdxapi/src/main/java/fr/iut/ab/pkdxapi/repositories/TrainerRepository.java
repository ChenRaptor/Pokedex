package fr.iut.ab.pkdxapi.repositories;

import java.util.Optional;

import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

import fr.iut.ab.pkdxapi.models.TrainerData;

@Repository
public interface TrainerRepository extends MongoRepository<TrainerData,ObjectId>{
    @Query("{username:'?0'}")
    Optional<TrainerData> findByUsername(String login);
}
