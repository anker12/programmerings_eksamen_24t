package com.example.demo.controller;

import com.example.demo.model.Kommune;
import com.example.demo.model.Sogn;
import com.example.demo.repository.KommuneRepository;
import com.example.demo.repository.SognRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class KommuneRestController {

    @Autowired
    KommuneRepository kommuneRepository;

    @Autowired
    SognRepository sognRepository;

    @PostMapping(value = "/postKommune", consumes = "application/json")
    public ResponseEntity<Kommune> postKommune(@RequestBody Kommune kommune){
        if(!kommuneRepository.existsByName(kommune.getName())){
            kommuneRepository.save(kommune);

        }else{
            //System.out.println("already exists");
            return new ResponseEntity<>(HttpStatus.ALREADY_REPORTED);
        }
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @GetMapping("/getAllKommuner")
    public List<Kommune> getAllKommuner(){
        return kommuneRepository.findAll();
    }

    @GetMapping("/getSmitteTryk/{kommuneID}")
    public int getSmitteTryk(@PathVariable Integer kommuneID){
        List<Sogn> listOfSogn = sognRepository.findAllByKommune(kommuneRepository.getById(kommuneID));
        int samletSmitteTryk = 0;

        for(int i=0; i<listOfSogn.size();i++){
            samletSmitteTryk = samletSmitteTryk + listOfSogn.get(i).getSmitteTryk();
        }

        return samletSmitteTryk;
    }

}
