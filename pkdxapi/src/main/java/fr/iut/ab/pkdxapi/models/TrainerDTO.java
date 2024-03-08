package fr.iut.ab.pkdxapi.models;

public class TrainerDTO {
    private String imgUrl;
    private String trainerName;

    public TrainerDTO(String imgUrl, String trainerName){
        this.imgUrl=imgUrl;
        this.trainerName=trainerName;
    }

    public String getImage(){
        return imgUrl;
    }

    public void setImage(String imgUrl){
        this.imgUrl=imgUrl;
    }

    public String getTrainerName(){
        return trainerName;
    }

    public void setTrainerName(String trainerName){
        this.trainerName=trainerName;
    }
}
