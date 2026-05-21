package com.marcela.bts_songs_predictor.controller;

import com.marcela.bts_songs_predictor.dto.BetRequestDTO;
import com.marcela.bts_songs_predictor.dto.BetResponseDTO;
import com.marcela.bts_songs_predictor.service.BetService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/bets")
public class BetController {

  private final BetService betService;

  public BetController(BetService betService) {
    this.betService = betService;
  }

  @PostMapping
  public BetResponseDTO createBet(@RequestBody BetRequestDTO dto) {
    return betService.createBet(dto);
  }

  @GetMapping("/concert/{concertId}")
  public List<BetResponseDTO> getBetsByConcert(@PathVariable Long concertId) {
    return betService.getBetsByConcert(concertId);
  }
}