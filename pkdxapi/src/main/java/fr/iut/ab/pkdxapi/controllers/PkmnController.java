package fr.iut.ab.pkdxapi.controllers;

import org.springframework.web.bind.annotation.RestController;

import fr.iut.ab.pkdxapi.models.PkmnDTO;
import fr.iut.ab.pkdxapi.models.PkmnType;
import fr.iut.ab.pkdxapi.models.response.PokemonTypeResponse;
import fr.iut.ab.pkdxapi.services.PkmnService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;


@RestController
public class PkmnController {

    @Autowired
    private PkmnService PkmnService;

    @GetMapping("/pkmn/types")
    public PokemonTypeResponse getAllPkmnTypes() {
        return PkmnService.getAllPkmnTypes();
    }

    @PostMapping("/pkmn")
    public void addPokemon(@RequestBody PkmnDTO pkmnDTO) {
        PkmnService.addPokemon(pkmnDTO);
    }

    @PostMapping("/pkmn/region")
    public void addRegionToPokemon(@RequestBody PkmnDTO pkmnDTO) {
        PkmnService.addPokemon(pkmnDTO);
    }

    @PostMapping("/pkmn/api")
    public void addPokemonsFromApi() {
        PkmnService.addPokemonsFromApi();
    }
}
