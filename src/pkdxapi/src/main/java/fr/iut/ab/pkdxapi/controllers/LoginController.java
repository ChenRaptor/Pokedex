package fr.iut.ab.pkdxapi.controllers;


import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;


import fr.iut.ab.pkdxapi.services.JWTService;


@RestController
public class LoginController {


	private JWTService jwtService;

	public LoginController(JWTService jwtService) {
		this.jwtService = jwtService;
	}

	@PostMapping("/login")
	public String getToken(Authentication authentication) {
        String token = jwtService.generateToken(authentication);
        return token;
	}
}