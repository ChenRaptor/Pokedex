package fr.iut.ab.pkdxapi.models.type;

import com.fasterxml.jackson.annotation.JsonProperty;

import fr.iut.ab.pkdxapi.models.PkmnType;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

public class Pkmn {

    @JsonProperty("pokedex_id")
    private int pokedexId;

    @JsonProperty("generation")
    private int generation;

    @JsonProperty("category")
    private String category;

    @JsonProperty("name")
    private Map<String, String> name;

    @JsonProperty("sprites")
    private Map<String, Object> sprites;

    @JsonProperty("types")
    private List<Type> types;

    @JsonProperty("talents")
    private List<Talent> talents;

    @JsonProperty("stats")
    private Stats stats;

    @JsonProperty("resistances")
    private List<Resistance> resistances;

    @JsonProperty("evolution")
    private Evolution evolution;

    @JsonProperty("height")
    private String height;

    @JsonProperty("weight")
    private String weight;

    @JsonProperty("egg_groups")
    private List<String> eggGroups;

    @JsonProperty("sexe")
    private Map<String, Double> sexe;

    @JsonProperty("catch_rate")
    private int catchRate;

    @JsonProperty("level_100")
    private int level100;

    @JsonProperty("formes")
    private Object formes;

    public Object pokedex_id;

    public String getName(String lang) {
        return name.get(lang);
    }

    public List<PkmnType> getTypes() {
        List<PkmnType> typesList = new ArrayList<>();
        if (this.types != null) {
            for (Type type : this.types) {
                typesList.add(
                    PkmnType.fromString(type.getNameType())
                );
            }
        }
        return typesList;
    }


    public String getSprite(String model) {
        // Warning
        return (String) sprites.get(model);
    }

    // Constructors, getters, and setters
}

class Type {
    @JsonProperty("name")
    private String name;
    //private String image;

    public String getNameType() {
        return name;
    }

    // Getters and setters
}

class Talent {
    @JsonProperty("name")
    private String name;

    @JsonProperty("tc")
    private boolean tc;

    // Getters and setters
}

class Stats {
    @JsonProperty("hp")
    private int hp;

    @JsonProperty("atk")
    private int atk;

    @JsonProperty("def")
    private int def;

    @JsonProperty("spe_atk")
    private int speAtk;

    @JsonProperty("spe_def")
    private int speDef;

    @JsonProperty("vit")
    private int vit;

    // Getters and setters
}

class Resistance {
    @JsonProperty("name")
    private String name;

    @JsonProperty("multiplier")
    private double multiplier;

    // Getters and setters
}

class Evolution {
    @JsonProperty("pre")
    private Object pre;

    @JsonProperty("next")
    private List<EvolutionDetail> next;

    @JsonProperty("mega")
    private Object mega;

    // Getters and setters
}

class EvolutionDetail {
    @JsonProperty("pokedex_id")
    private int pokedexId;

    @JsonProperty("name")
    private String name;

    @JsonProperty("condition")
    private String condition;

    // Getters and setters
}
