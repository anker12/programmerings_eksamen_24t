package com.example.demo.repository;

import com.example.demo.model.Kommune;
import com.example.demo.model.Sogn;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface SognRepository extends JpaRepository<Sogn, Integer> {
    Sogn findSognByNavn(String navn);
    Boolean existsByNavn(String navn);
    Sogn getSognByNavn(String navn);
    Sogn getSognByKommune(Kommune kommune);
    List<Sogn> findAllByKommune(Kommune kommune);
}
