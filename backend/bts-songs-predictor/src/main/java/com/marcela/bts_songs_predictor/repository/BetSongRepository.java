package com.marcela.bts_songs_predictor.repository;

import com.marcela.bts_songs_predictor.entity.BetSong;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface BetSongRepository extends JpaRepository<BetSong, Long> {

  List<BetSong> findByBetId(Long betId);
}