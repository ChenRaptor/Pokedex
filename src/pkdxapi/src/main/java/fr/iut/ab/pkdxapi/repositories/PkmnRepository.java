package fr.iut.ab.pkdxapi.repositories;

import java.util.Optional;

import org.bson.types.ObjectId;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

import fr.iut.ab.pkdxapi.models.PkmnData;

@Repository
public interface PkmnRepository extends MongoRepository<PkmnData,ObjectId>{
    @Query("{name:'?0'}")
    Optional<PkmnData> findByName(String name);

    @Query("{name: { $regex: ?0, $options: 'i' }}")
    Page<PkmnData> searchPokemons(String partialName, Pageable pageable);

    @Query("{name: { $regex: ?0, $options: 'i' }, types: { $all: [?1] } }")
    Page<PkmnData> searchPokemons(String partialName, String typeOne, Pageable pageable);

    @Query("{name: { $regex: ?0, $options: 'i' }, types: { $all: [?1, ?2] } }")
    Page<PkmnData> searchPokemons(String partialName, String typeOne, String typeTwo, Pageable pageable);
}
