package fr.iut.ab.pkdxapi.models;

import java.util.List;
import java.util.Optional;

import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.TypeAlias;
import org.springframework.data.mongodb.core.mapping.Document;

import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.fasterxml.jackson.databind.ser.std.ToStringSerializer;

@Document("Pkmn")
@TypeAlias("PkmnData")
public class PkmnData extends PkmnDTO {

    @Id
    @JsonSerialize(using = ToStringSerializer.class)
    private ObjectId id;

    public PkmnData(String name, String imgUrl, String description, List<PkmnType> types, List<PkmnRegion> regions){
        super(name, imgUrl, description, types, regions);
        this.id = ObjectId.get();
    }

    public ObjectId getId(){
        return id;
    }

    public void addRegion(PkmnRegion pkmnRegion){
        // avoid doublons by region name
        if (this.regions.stream().noneMatch(region -> region.getRegionName().equals(pkmnRegion.getRegionName()))) {
            this.regions.add(pkmnRegion);
        }
    }

    public void removeRegion(String regionName) {
        // find region by name and remove it
        this.regions.removeIf(region -> region.getRegionName().equals(regionName));
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public void setType(Optional<PkmnType> type1, Optional<PkmnType> type2) {
        if (type1.isPresent() || type2.isPresent()) {
            this.types.clear();
        }
        if (type1.isPresent()) {
            this.types.add(type1.get());
        }
        if (type2.isPresent()) {
            this.types.add(type2.get());
        }
    }
}
