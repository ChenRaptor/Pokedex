package fr.iut.ab.pkdxapi.models;

public class PkmnRegion {
    private String regionName;
    private String regionNumber;


    public PkmnRegion(String regionName, String regionNumber){
        this.regionName=regionName;
        this.regionNumber=regionNumber;
    }

    public String getRegionName(){
        return regionName;
    }

    public String getRegionNumber(){
        return regionNumber;
    }
}
