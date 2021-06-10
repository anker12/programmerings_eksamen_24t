package com.example.demo.repository;

import com.example.demo.model.Sogn;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SognRepository extends JpaRepository<Sogn, Integer> {
    Sogn findSognByNavn(String navn);
    Boolean existsByNavn(String navn);
    Sogn getSognByNavn(String navn);
}
