package com.marcela.bts_songs_predictor.repository;

import com.marcela.bts_songs_predictor.entity.ConcertResult;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ConcertResultRepository extends JpaRepository<ConcertResult, Long> {

  List<ConcertResult> findByConcertId(Long concertId);
}