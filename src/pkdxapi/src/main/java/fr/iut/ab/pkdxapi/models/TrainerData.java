package fr.iut.ab.pkdxapi.models;

import java.time.Instant;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.TypeAlias;
import org.springframework.data.mongodb.core.mapping.Document;

import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.fasterxml.jackson.databind.ser.std.ToStringSerializer;

@Document("Trainer")
@TypeAlias("TrainerData")
public class TrainerData extends TrainerDTO {

    @Id
    @JsonSerialize(using = ToStringSerializer.class)
    private ObjectId id;

    private Date creationDate;

    private List<String> pkmnSeen;
    private List<String> pkmnCatch;

    private String username;

    public TrainerData(String username, String imgUrl, String trainerName){
        super(imgUrl, trainerName);
        this.id = ObjectId.get();
        this.creationDate = Date.from(Instant.now());
        this.pkmnSeen = new ArrayList<>();
        this.pkmnCatch = new ArrayList<>();
        this.username = username;
    }

    public ObjectId getId(){
        return id;
    }

    public Date getCreationDate(){
        return creationDate;
    }

    public List<String> getPkmnSeen(){
        return pkmnSeen;
    }

    public void setPkmnSeen(ObjectId pkmnId){
        if (this.pkmnSeen.stream().noneMatch(pkmnSeenSimple -> pkmnSeenSimple.equals(pkmnId.toString()))) {
            this.pkmnSeen.add(pkmnId.toString());
        }
    }

    public List<String> getPkmnCatch(){
        return pkmnCatch;
    }

    public void setPkmnCatch(ObjectId pkmnId){
        if (this.pkmnCatch.stream().noneMatch(pkmnCatchSimple -> pkmnCatchSimple.equals(pkmnId.toString()))) {
            this.pkmnCatch.add(pkmnId.toString());
        }
    }

    public String getUsername(){
        return username;
    }
}