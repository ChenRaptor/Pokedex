package fr.iut.ab.pkdxapi.models;

import java.util.HashMap;
import java.util.Map;

public enum PkmnType {
    STEEL,
    DRAGON,
    ELECTRIC,
    FIRE,
    BUG,
    GRASS,
    PSYCHIC,
    GROUND,
    DARK,
    FIGHTING,
    WATER,
    FAIRY,
    ICE,
    NORMAL,
    POISON,
    ROCK,
    GHOST,
    FLYING,
    UNKNOWN,
    SHADOW,
    CELESTIAL;

    private static final Map<String, PkmnType> typeMap = new HashMap<>();

    static {
        typeMap.put("Feu", FIRE);
        typeMap.put("Acier", STEEL);
        typeMap.put("Dragon", DRAGON);
        typeMap.put("Électrik", ELECTRIC);
        typeMap.put("Insecte", BUG);
        typeMap.put("Plante", GRASS);
        typeMap.put("Psy", PSYCHIC);
        typeMap.put("Sol", GROUND);
        typeMap.put("Ténèbres", DARK);
        typeMap.put("Combat", FIGHTING);
        typeMap.put("Eau", WATER);
        typeMap.put("Fée", FAIRY);
        typeMap.put("Glace", ICE);
        typeMap.put("Normal", NORMAL);
        typeMap.put("Poison", POISON);
        typeMap.put("Roche", ROCK);
        typeMap.put("Spectre", GHOST);
        typeMap.put("Vol", FLYING);
        typeMap.put("Inconnu", UNKNOWN);
        typeMap.put("Ombre", SHADOW);
        typeMap.put("Céleste", CELESTIAL);
    }

    public static PkmnType fromString(String typeString) {
        return typeMap.get(typeString);
    }
}