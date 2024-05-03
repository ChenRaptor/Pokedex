package fr.iut.ab.pkdxapi.services;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import fr.iut.ab.pkdxapi.errors.PkmnAlreadyExistException;
import fr.iut.ab.pkdxapi.errors.PkmnNotFoundException;
import fr.iut.ab.pkdxapi.models.PkmnDTO;
import fr.iut.ab.pkdxapi.models.PkmnData;
import fr.iut.ab.pkdxapi.models.PkmnRegion;
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

    public void addRegionToPokemon(PkmnRegion pkmnRegion, String pkmnName) {
        Optional<PkmnData> pkmn = repository.findByName(pkmnName);

        if (!pkmn.isPresent())
        {
            throw new PkmnNotFoundException("Pokemon with name " + pkmnName + " not found.");
        }

        PkmnData pkmn2 = pkmn.get();
        pkmn2.addRegion(pkmnRegion);
        repository.save(pkmn2);
    }

    public void removeRegionFromPokemon(String regionName, String pkmnName) {
        Optional<PkmnData> pkmn = repository.findByName(pkmnName);

        if (!pkmn.isPresent())
        {
            throw new PkmnNotFoundException("Pokemon with name " + pkmnName + " not found.");
        }

        PkmnData pkmn2 = pkmn.get();
        pkmn2.removeRegion(regionName);
        repository.save(pkmn2);
    }

    public void addPokemonsFromApi() {
        RestTemplate restTemplate = new RestTemplate();
        Pkmn[] result = restTemplate.getForObject(API_URL, Pkmn[].class);
        for (Pkmn pkmn : result) {
            if (!pkmnExist(pkmn.getName("en"))) {
                PkmnData pkmnData = new PkmnData(
                    pkmn.getName("en"),
                    pkmn.getSprite("regular"),
                    "",
                    pkmn.getTypes(),
                    new ArrayList<>()
                );
                repository.insert(pkmnData);
            }
        }
    }

    public Page<PkmnData> searchPokemons(String partialName, Optional<String> typeOne, Optional<String> typeTwo, String page, String size) {

        Pageable pageable = PageRequest.of(Integer.parseInt(page), Integer.parseInt(size));

        if (typeOne.isPresent() && typeTwo.isPresent()) {
            return repository.searchPokemons(partialName, typeOne.get(), typeTwo.get(), pageable);
        } else if (typeOne.isPresent()) {
            return repository.searchPokemons(partialName, typeOne.get(), pageable);
        } else if (typeTwo.isPresent()) {
            return repository.searchPokemons(partialName, typeTwo.get(), pageable);
        }
        return repository.searchPokemons(partialName, pageable);
    }

    public PkmnData getPokemon(Optional<ObjectId> id, Optional<String> name) {
        if (id.isPresent())
        {
            Optional<PkmnData> pkmn = repository.findById(id.get());
            if (!pkmn.isPresent())
            {
                throw new PkmnNotFoundException("Pokemon with id " + id.get() + " not found.");
            }
            return pkmn.get();
        }
        else if (name.isPresent())
        {
            Optional<PkmnData> pkmn = repository.findByName(name.get());
            if (!pkmn.isPresent())
            {
                throw new PkmnNotFoundException("Pokemon with name " + name.get() + " not found.");
            }
            return pkmn.get();
        }
        else
        {
            throw new PkmnNotFoundException("Pokemon not found.");
        }
    }

    public PkmnData deletePokemon(Optional<ObjectId> id, Optional<String> name) {
        if (id.isPresent())
        {
            Optional<PkmnData> pkmn = repository.findById(id.get());
            if (!pkmn.isPresent())
            {
                throw new PkmnNotFoundException("Pokemon with id " + id.get() + " not found.");
            }
            repository.deleteById(pkmn.get().getId());
            return pkmn.get();
        }
        else if (name.isPresent())
        {
            Optional<PkmnData> pkmn = repository.findByName(name.get());
            if (!pkmn.isPresent())
            {
                throw new PkmnNotFoundException("Pokemon with name " + name.get() + " not found.");
            }
            repository.deleteById(pkmn.get().getId());
            return pkmn.get();
        }
        else
        {
            throw new PkmnNotFoundException("Pokemon not found.");
        }
    }

    public PkmnData updatePokemon(Optional<ObjectId> id, Optional<PkmnType> typeOne, Optional<PkmnType> typeTwo, Optional<String> description) {
        if (id.isPresent())
        {
            Optional<PkmnData> pkmn = repository.findById(id.get());
            if (!pkmn.isPresent())
            {
                throw new PkmnNotFoundException("Pokemon with id " + id.get() + " not found.");
            }
            PkmnData pkmn2 = pkmn.get();
            pkmn2.setType(typeOne, typeTwo);
            if (description.isPresent()) {
                pkmn2.setDescription(description.get());
            }
            repository.save(pkmn2);
            return pkmn2;
        }
        else
        {
            throw new PkmnNotFoundException("Pokemon not found.");
        }
    }

    public List<PkmnData> getListOfPokemonFromIds(List<ObjectId> ids) {
        List<PkmnData> pkmns = new ArrayList<>();
        for (ObjectId id : ids) {
            Optional<PkmnData> pkmn = repository.findById(id);
            if (pkmn.isPresent()) {
                pkmns.add(pkmn.get());
            }
        }

        return pkmns;
    }
}