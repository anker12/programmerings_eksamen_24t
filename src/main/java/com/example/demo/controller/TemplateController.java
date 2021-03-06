package com.example.demo.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class TemplateController {

    @GetMapping("/")
    public String index(){
        return "index";
    }

    @GetMapping("/sogne")
    public String sogne(){return "sogne";}

    @GetMapping("/nytSogn")
    public String nytSogn(){return"nyt-sogn";}

    @GetMapping("/fetch")
    public String fetch(){return "fetch";}
}
