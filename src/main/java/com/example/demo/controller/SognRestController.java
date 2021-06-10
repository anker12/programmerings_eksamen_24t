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

    @PutMapping(value = "/update/{name}/{kommune}")
    public ResponseEntity<Sogn> update(@PathVariable String name, @PathVariable Integer kommune){
        Sogn sognTemp;
        if(sognRepository.existsByNavn(name)){
            sognTemp = sognRepository.getSognByNavn(name);
        }else{
            sognTemp = new Sogn();
        }
        sognTemp.setNavn(name);
        Kommune kommuneTemp = kommuneRepository.getById(kommune);
        sognTemp.setKommune(kommuneTemp);
        sognRepository.save(sognTemp);


        return new ResponseEntity<>(sognTemp, HttpStatus.OK);
    }

    @PostMapping(value = "/newSogn", consumes = "application/json")
    public ResponseEntity<Sogn> newSogn(@RequestBody Sogn sogn){
        System.out.println("test");
        sognRepository.save(sogn);
        return new ResponseEntity<>(sogn, HttpStatus.CREATED);
    }

}
