package fr.iut.ab.pkdxapi.controllers;

import org.springframework.web.bind.annotation.RestController;

import fr.iut.ab.pkdxapi.models.PkmnDTO;
import fr.iut.ab.pkdxapi.models.PkmnData;
import fr.iut.ab.pkdxapi.models.PkmnRegion;
import fr.iut.ab.pkdxapi.models.PkmnType;
import fr.iut.ab.pkdxapi.models.response.PokemonTypeResponse;
import fr.iut.ab.pkdxapi.services.PkmnService;

import java.util.List;
import java.util.Optional;

import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;


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

    @GetMapping("/pkmn")
    public PkmnData getPokemon(
        @RequestParam(required = false) Optional<ObjectId> id,
        @RequestParam(required = false) Optional<String> name
    ) {
        return PkmnService.getPokemon(id, name);
    }

    @DeleteMapping("/pkmn")
    public PkmnData deletePokemon(
        @RequestParam(required = false) Optional<ObjectId> id,
        @RequestParam(required = false) Optional<String> name
    ) {
        return PkmnService.deletePokemon(id, name);
    }

    @PutMapping("/pkmn")
    public PkmnData updatePokemon(
        @RequestParam(required = false) Optional<ObjectId> id,
        @RequestParam(required = false) Optional<PkmnType> typeOne,
        @RequestParam(required = false) Optional<PkmnType> typeTwo,
        @RequestParam(required = false) Optional<String> description
    ) {
        return PkmnService.updatePokemon(id, typeOne, typeTwo, description);
    }

    @PostMapping("/pkmn/region")
    public void addRegionToPokemon(@RequestBody PkmnRegion pkmnRegion, @RequestParam String pkmnName) {
        PkmnService.addRegionToPokemon(pkmnRegion, pkmnName);
    }

    @DeleteMapping("/pkmn/region")
    public void removeRegionFromPokemon(@RequestParam String regionName, @RequestParam String pkmnName) {
        PkmnService.removeRegionFromPokemon(regionName, pkmnName);
    }

    @GetMapping("/pkmn/search")
    public Page<PkmnData> searchPokemons(
            @RequestParam(required = false, defaultValue = "") String partialName,
            @RequestParam(required = false) Optional<String> typeOne,
            @RequestParam(required = false) Optional<String> typeTwo,
            @RequestParam(required = false, defaultValue = "0") String page,
            @RequestParam(required = false, defaultValue = "10") String size
    ) {
        return PkmnService.searchPokemons(partialName, typeOne, typeTwo, page, size);
    }

    @PostMapping("/pkmn/api")
    public void addPokemonsFromApi() {
        PkmnService.addPokemonsFromApi();
    }

    @PostMapping("/pkmn/ids")
    public List<PkmnData> getMethodName(@RequestBody List<ObjectId> ids) {
        return PkmnService.getListOfPokemonFromIds(ids);
    }
}
