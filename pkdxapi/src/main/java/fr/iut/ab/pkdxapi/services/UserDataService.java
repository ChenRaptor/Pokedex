package fr.iut.ab.pkdxapi.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import fr.iut.ab.pkdxapi.errors.UserAlreadyExistException;
import fr.iut.ab.pkdxapi.models.UserDTO;
import fr.iut.ab.pkdxapi.models.UserData;
import fr.iut.ab.pkdxapi.repositories.UserRepository;

@Service
public class UserDataService {
    @Autowired
    private PasswordEncoder passwordEncoder;

    private UserRepository repository;

    public UserDataService(UserRepository repository) {
        this.repository = repository;
    }

    public UserData registerUser(UserDTO userDTO) {
        UserData userData = new UserData(userDTO.getLogin(), passwordEncoder.encode(userDTO.getPassword()), userDTO.getIsAdmin());
        if (usernameExist(userData.getLogin())) {
            throw new UserAlreadyExistException("Username already exist");
        }
        repository.insert(userData);
        return userData;
    }

    private boolean usernameExist(String username){
        return repository.findByLogin(username).isPresent();
    }
}
