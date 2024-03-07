package fr.iut.ab.pkdxapi.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import fr.iut.ab.pkdxapi.models.UserDTO;
import fr.iut.ab.pkdxapi.models.UserData;
import fr.iut.ab.pkdxapi.services.UserDataService;

@RestController
public class UserController {
    @Autowired
    private UserDataService UserDataService;

    @PostMapping("/users/register")
    public UserData registerUser(@RequestBody UserDTO userDTO) {
        return UserDataService.registerUser(userDTO);
    }

    @GetMapping("/users/login")
    public String loginUser() {
        return "ok";
    }
}
