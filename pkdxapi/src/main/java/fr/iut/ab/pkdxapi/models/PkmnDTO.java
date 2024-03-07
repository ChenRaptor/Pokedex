package fr.iut.ab.pkdxapi.models;

import java.util.List;

public class PkmnDTO {
    private String name;
    private String imgUrl;
    private String description;
    private List<String> types;
    private List<PkmnRegion> regions;


    public PkmnDTO(String name, String imgUrl, String description, List<String> types, List<PkmnRegion> regions){
        this.name=name;
        this.imgUrl=imgUrl;
        this.description=description;
        this.types=types;
        this.regions=regions;
    }

    public String getName(){
        return name;
    }

    public String getImage(){
        return imgUrl;
    }

    public String getDescription(){
        return description;
    }

    public List<String> getTypes(){
        return types;
    }

    public List<PkmnRegion> getRegions(){
        return regions;
    }
}
