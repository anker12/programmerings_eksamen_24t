package com.example.demo.model;

import javax.persistence.*;
import java.util.Date;

@Entity
@Table(name = "Sogne")
public class Sogn {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    private Integer sognekode;
    private String navn;

    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "kommune_id",referencedColumnName = "kommune_id")
    private Kommune kommune;

    private int smitteTryk;
    private Date nedluk;


    public Integer getId() {
        return id;
    }

    public int getSmitteTryk() {
        return smitteTryk;
    }

    public void setSmitteTryk(int smitteTryk) {
        this.smitteTryk = smitteTryk;
    }

    public Date getNedluk() {
        return nedluk;
    }

    public void setNedluk(Date nedluk) {
        this.nedluk = nedluk;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Integer getSognekode() {
        return sognekode;
    }

    public void setSognekode(Integer sognekode) {
        this.sognekode = sognekode;
    }

    public String getNavn() {
        return navn;
    }

    public void setNavn(String navn) {
        this.navn = navn;
    }

    public Kommune getKommune() {
        return kommune;
    }

    public void setKommune(Kommune kommune) {
        this.kommune = kommune;
    }
}
