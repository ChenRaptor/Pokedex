package fr.iut.ab.pkdxapi.controllers;

import org.springframework.web.bind.annotation.PostMapping;

import fr.iut.ab.pkdxapi.services.UserDataService;

public class UserController {
    private UserDataService UserDataService;

    public UserController(UserDataService UserDataService) {
        this.UserDataService = UserDataService;
    }

    @PostMapping("/users/register")
    public void registerUser() {
        UserDataService.registerUser();
    }
}
