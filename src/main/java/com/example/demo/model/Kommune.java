package com.example.demo.model;

import javax.persistence.*;
import java.util.List;
import java.util.Set;

@Entity(name = "Kommuner")
public class Kommune {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "kommune_id")
    private Integer id;

    private int kommuneKode;

    private String name;


    public Kommune() {
    }
    public Kommune(int kommunekode, String name){
        this.kommuneKode = kommunekode;
        this.name = name;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public int getKommuneKode() {
        return kommuneKode;
    }

    public void setKommuneKode(int kommuneKode) {
        this.kommuneKode = kommuneKode;
    }

    public Kommune(String name) {
        this.name = name;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
}
