package fr.iut.ab.pkdxapi.services;

import org.springframework.stereotype.Service;

import fr.iut.ab.pkdxapi.models.UserDTO;
import fr.iut.ab.pkdxapi.models.UserData;
import fr.iut.ab.pkdxapi.repositories.UserRepository;

@Service
public class UserDataService {

    private UserRepository repository;

    public UserDataService(UserRepository repository) {
        this.repository = repository;
    }

    public UserData registerUser(UserDTO userDTO) {
        UserData userData = new UserData(userDTO.getLogin(), userDTO.getPassword(), userDTO.getIsAdmin());
        if (usernameExist(userData.getLogin())) {
            throw new IllegalArgumentException("Username already exist");
        }
        repository.insert(userData);
        return userData;
    }

    private boolean usernameExist(String username){
        return repository.findByLogin(username).isPresent();
    }
}
