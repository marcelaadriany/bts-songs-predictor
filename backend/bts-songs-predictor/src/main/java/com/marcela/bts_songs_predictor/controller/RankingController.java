package com.marcela.bts_songs_predictor.controller;

import com.marcela.bts_songs_predictor.dto.RankingResponseDTO;
import com.marcela.bts_songs_predictor.service.RankingService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class RankingController {

  private final RankingService rankingService;

  public RankingController(RankingService rankingService) {
    this.rankingService = rankingService;
  }

  @GetMapping("/ranking")
  public List<RankingResponseDTO> getRanking() {
    return rankingService.getRanking();
  }
}