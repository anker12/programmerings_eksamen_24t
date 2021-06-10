package com.example.demo.config;


import com.example.demo.model.Kommune;
import com.example.demo.repository.KommuneRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
public class HardcodeKommune implements CommandLineRunner {
    @Autowired
    KommuneRepository kommuneRepository;

    @Override
    public void run(String... args) throws Exception {
        Kommune kbh = new Kommune(101,"København");
        Kommune fred = new Kommune(147,"Frederiksberg");
        kommuneRepository.save(kbh);
        kommuneRepository.save(fred);
    }
}
