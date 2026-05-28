package com.marcela.bts_songs_predictor.repository;

import com.marcela.bts_songs_predictor.entity.Bet;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface BetRepository extends JpaRepository<Bet, Long> {

  List<Bet> findByConcertId(Long concertId);

  boolean existsByUserIdAndConcertId(Long userId, Long concertId);
}