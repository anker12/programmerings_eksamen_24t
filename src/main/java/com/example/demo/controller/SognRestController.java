package com.example.demo.controller;

import com.example.demo.model.Kommune;
import com.example.demo.model.Sogn;
import com.example.demo.repository.KommuneRepository;
import com.example.demo.repository.SognRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
public class SognRestController {

    @Autowired
    SognRepository sognRepository;

    @Autowired
    KommuneRepository kommuneRepository;

    @GetMapping(value = "/getallsogn")
    public List<Sogn> getAll(){
        return sognRepository.findAll();
    }

    @PutMapping(value = "/update/{kommunekode}/{sognNavn}", consumes = "application/json")
    public ResponseEntity<Sogn> updateSogn(@PathVariable String sognNavn,@PathVariable Integer kommunekode ,@RequestBody Sogn sogn){
        Sogn sognTemp;
        //burde nok bruge ID
        if(sognRepository.existsByNavn(sognNavn)){
            sognTemp = sognRepository.getSognByNavn(sognNavn);
        }else{
            sognTemp = new Sogn();
        }
        sognTemp.setNavn(sognNavn);
        sognTemp.setNedluk(sogn.getNedluk());
        sognTemp.setSmitteTryk(sogn.getSmitteTryk());
        sognTemp.setSognekode(sogn.getSognekode());

        Kommune kommuneTemp = kommuneRepository.getByKommuneKode(kommunekode);

        sognTemp.setKommune(kommuneTemp);
        sognRepository.save(sognTemp);

        return new ResponseEntity<>(sognTemp, HttpStatus.OK);
    }

    @DeleteMapping(value = "/delete/{sognID}")
    public ResponseEntity<Sogn> deleteSogn(@PathVariable Integer sognID){
        sognRepository.deleteById(sognID);
        return new ResponseEntity<>(HttpStatus.OK);
    }

}
