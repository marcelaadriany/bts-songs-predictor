package com.marcela.bts_songs_predictor.repository;

import com.marcela.bts_songs_predictor.entity.Concert;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ConcertRepository extends JpaRepository<Concert, Long> {

    List<Concert> findAllByOrderByConcertDateAsc();
}