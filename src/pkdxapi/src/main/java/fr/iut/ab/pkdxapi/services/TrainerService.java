package fr.iut.ab.pkdxapi.services;

import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import fr.iut.ab.pkdxapi.errors.PkmnNotFoundException;
import fr.iut.ab.pkdxapi.errors.TrainerAlreadyExistException;
import fr.iut.ab.pkdxapi.errors.TrainerNotFoundException;
import fr.iut.ab.pkdxapi.models.TrainerDTO;
import fr.iut.ab.pkdxapi.models.TrainerData;
import fr.iut.ab.pkdxapi.repositories.PkmnRepository;
import fr.iut.ab.pkdxapi.repositories.TrainerRepository;

@Service
public class TrainerService {
    @Autowired
    private TrainerRepository repository;
    @Autowired
    private PkmnRepository pkmnRepository;

    public TrainerData postTrainer(TrainerDTO trainerCreationData, String username) {
        TrainerData trainerData = new TrainerData(
            username,
            trainerCreationData.getImage(),
            trainerCreationData.getTrainerName()
        );
        if (trainerExist(username)) {
            throw new TrainerAlreadyExistException("Trainer already exist");
        }
        repository.insert(trainerData);
        return trainerData;
    }

    private boolean trainerExist(String name){
        return repository.findByUsername(name).isPresent();
    }

    public TrainerData getTrainer(String username) {
        return repository.findByUsername(username).get();
    }

    public void updateTrainer (String username, TrainerDTO trainerCreationData) {

        if (trainerExist(username)) {
            TrainerData trainer = getTrainer(username);

            trainer.setImage(trainerCreationData.getImage());
            trainer.setTrainerName(trainerCreationData.getTrainerName());

            repository.save(trainer);
        }
        else {
            throw new TrainerNotFoundException("Trainer not found");
        }
    }

    public void deleteTrainer(String username) {
        if (trainerExist(username)) {
            repository.delete(repository.findByUsername(username).get());
        }
        else {
            throw new TrainerNotFoundException("Trainer not found");
        }
    }

    public void mark(String username, boolean captured, ObjectId pkmnId) {
        if(!pkmnRepository.findById(pkmnId).isPresent()) {
            throw new PkmnNotFoundException("Pokemon not found");
        }
        if (trainerExist(username)) {
            TrainerData trainer = getTrainer(username);
            if (captured) {
                trainer.setPkmnSeen(pkmnId);
                trainer.setPkmnCatch(pkmnId);
            }
            else {
                trainer.setPkmnSeen(pkmnId);
            }
            repository.save(trainer);
        }
        else {
            throw new TrainerNotFoundException("Trainer not found");
        }
    }
}
