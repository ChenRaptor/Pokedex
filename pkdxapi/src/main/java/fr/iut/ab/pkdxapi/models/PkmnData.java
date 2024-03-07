package fr.iut.ab.pkdxapi.models;

import java.util.List;

import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;

import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.fasterxml.jackson.databind.ser.std.ToStringSerializer;

public class PkmnData extends PkmnDTO {

    @Id
    @JsonSerialize(using= ToStringSerializer.class)
    private ObjectId id;

    public PkmnData(String name, String imgUrl, String description, List<PkmnType> types, List<PkmnRegion> regions){
        super(name, imgUrl, description, types, regions);
        this.id = ObjectId.get();
    }

    public ObjectId getId(){
        return id;
    }
}
