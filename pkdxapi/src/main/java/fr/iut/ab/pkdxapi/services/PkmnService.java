package fr.iut.ab.pkdxapi.services;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Service;

import fr.iut.ab.pkdxapi.models.PkmnType;
import fr.iut.ab.pkdxapi.models.response.PokemonTypeResponse;


@Service
public class PkmnService {
    public static PokemonTypeResponse getAllPkmnTypes() {
        List<String> types = new ArrayList<>();
        for (PkmnType type : PkmnType.values()) {
            types.add(type.toString());
        }
        return new PokemonTypeResponse(types);
    }
}
