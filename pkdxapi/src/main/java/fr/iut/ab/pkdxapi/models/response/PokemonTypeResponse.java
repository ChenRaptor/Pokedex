package fr.iut.ab.pkdxapi.models.response;

import java.util.List;

public class PokemonTypeResponse {
    private List<String> data;
    private int count;

    public PokemonTypeResponse(List<String> data) {
        this.data = data;
        this.count = data.size();
    }

    // Getters
    public List<String> getData() {
        return data;
    }

    public int getCount() {
        return count;
    }

    // Setters
    public void setData(List<String> data) {
        this.data = data;
    }

    public void setCount(int count) {
        this.count = count;
    }
}