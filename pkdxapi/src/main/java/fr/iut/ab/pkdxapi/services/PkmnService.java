package fr.iut.ab.pkdxapi.services;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import fr.iut.ab.pkdxapi.errors.PkmnAlreadyExistException;
import fr.iut.ab.pkdxapi.models.PkmnDTO;
import fr.iut.ab.pkdxapi.models.PkmnData;
import fr.iut.ab.pkdxapi.models.PkmnType;
import fr.iut.ab.pkdxapi.models.response.PokemonTypeResponse;
import fr.iut.ab.pkdxapi.models.type.Pkmn;
import fr.iut.ab.pkdxapi.repositories.PkmnRepository;


@Service
public class PkmnService {
    @Autowired
    private PkmnRepository repository;

    private String API_URL = "https://tyradex.vercel.app/api/v1/pokemon";

    public PokemonTypeResponse getAllPkmnTypes() {
        List<String> types = new ArrayList<>();
        for (PkmnType type : PkmnType.values()) {
            types.add(type.toString());
        }
        return new PokemonTypeResponse(types);
    }

    public void addPokemon(PkmnDTO pkmnDTO) {
        PkmnData pkmnData = new PkmnData(pkmnDTO.getName(), pkmnDTO.getImage(), pkmnDTO.getDescription(), pkmnDTO.getTypes(), pkmnDTO.getRegions());
        if (pkmnExist(pkmnData.getName())) {
            throw new PkmnAlreadyExistException("This pokemon is already in the database");
        }
        repository.insert(pkmnData);
    }

    private boolean pkmnExist(String name){
        return repository.findByName(name).isPresent();
    }

    public void addPokemonsFromApi() {
        RestTemplate restTemplate = new RestTemplate();
        Pkmn[] result = restTemplate.getForObject(API_URL, Pkmn[].class);
        for (Pkmn pkmn : result) {
            if (!pkmnExist(pkmn.getName("fr"))) {
                PkmnData pkmnData = new PkmnData(
                    pkmn.getName("fr"),
                    pkmn.getSprite("regular"),
                    "",
                    pkmn.getTypes(),
                    new ArrayList<>()
                );
                repository.insert(pkmnData);
            }
        }
    }
}