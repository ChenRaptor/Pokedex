package fr.iut.ab.pkdxapi.controllers;

import org.springframework.web.bind.annotation.RestController;

import fr.iut.ab.pkdxapi.models.response.PokemonTypeResponse;
import fr.iut.ab.pkdxapi.services.PkmnService;

import org.springframework.web.bind.annotation.GetMapping;


@RestController
public class PkmnController {

    // If not static:
    // private PkmnService PkmnService;

    // Renvoie la liste des types de Pokémons de PkmnType.java
    @GetMapping("/pkmn/types")
    public PokemonTypeResponse getAllPkmnTypes() {
        return PkmnService.getAllPkmnTypes();
    }

}
