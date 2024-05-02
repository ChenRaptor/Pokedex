package fr.iut.ab.pkdxapi.services;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import fr.iut.ab.pkdxapi.errors.User.UserAlreadyExistException;
import fr.iut.ab.pkdxapi.errors.User.UserNotFoundException;
import fr.iut.ab.pkdxapi.models.auth.AuthRequest;
import fr.iut.ab.pkdxapi.models.auth.AuthResponse;
import fr.iut.ab.pkdxapi.models.user.UserDTO;
import fr.iut.ab.pkdxapi.models.user.UserData;
import fr.iut.ab.pkdxapi.models.user.UserResponse;
import fr.iut.ab.pkdxapi.models.user.UserStatusRequest;
import fr.iut.ab.pkdxapi.repositories.UserRepository;
import fr.iut.ab.pkdxapi.utils.JwtUtil;
import jakarta.servlet.http.HttpServletRequest;

@Service
public class UserDataService {

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private UserRepository repository;

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private JwtUtil jwtUtil;

    public UserDataService(UserRepository repository) {
        this.repository = repository;
    }

    public UserResponse changeUserStatus(UserStatusRequest userStatusRequest) {
        Optional<UserData> userData = repository.findById(userStatusRequest.getId());
        if (!userData.isPresent()) {
            throw new UserNotFoundException("User not found.");
        }
        UserData user = userData.get();
        user.setIsAdmin(userStatusRequest.getIsAdmin());
        repository.save(user);
        return new UserResponse(user.getLogin(), user.getIsAdmin());
    }

    public AuthResponse register(UserDTO userData) {
        if (userExists(userData.getLogin())) {
            throw new UserAlreadyExistException("User already exists.");
        }
        UserData user = new UserData(
            userData.getLogin(),
            passwordEncoder.encode(userData.getPassword()),
            false
        );
        repository.save(user);
        String token = getToken(user.getLogin(), userData.getPassword());
        UserResponse userResponse = new UserResponse(user.getLogin(), user.getIsAdmin());
        return new AuthResponse(token, userResponse);
    }

    public AuthResponse login(AuthRequest authRequest) {
        UserData user = getUserByLogin(authRequest.getLogin());
        if (user == null) {
            throw new BadCredentialsException("Incorrect username or password");
        }
        if (!passwordEncoder.matches(authRequest.getPassword(), user.getPassword())) {
            throw new BadCredentialsException("Incorrect username or password");
        }
        String token = getToken(authRequest.getLogin(), authRequest.getPassword());
        UserResponse userResponse = new UserResponse(user.getLogin(), user.getIsAdmin());
        return new AuthResponse(token, userResponse);
    }

    public UserResponse getUserLogedData (HttpServletRequest request) {
        String token = jwtUtil.parseJwt(request);
        String login = jwtUtil.extractUsername(token);
        UserData user = getUserByLogin(login);
        return new UserResponse(user.getLogin(), user.getIsAdmin());
    }

    private String getToken(String login, String password) {
        try {
            authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(login, password)
            );
        } catch (BadCredentialsException e) {
            throw new BadCredentialsException("Incorrect username or password", e);
        }

        return jwtUtil.generateToken(login);
    }

    public boolean userExists(String login) {
        return repository.findById(login).isPresent();
    }

    public UserData getUserByLogin(String login) {
        return repository.findByLogin(login);
    }
}
