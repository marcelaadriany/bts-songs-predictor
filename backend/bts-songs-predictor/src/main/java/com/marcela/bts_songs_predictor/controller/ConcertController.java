package com.marcela.bts_songs_predictor.controller;

import com.marcela.bts_songs_predictor.dto.ConcertRequestDTO;
import com.marcela.bts_songs_predictor.dto.ConcertResponseDTO;
import com.marcela.bts_songs_predictor.dto.WinnerResponseDTO;
import com.marcela.bts_songs_predictor.service.ConcertService;
import com.marcela.bts_songs_predictor.service.WinnerService;
import com.marcela.bts_songs_predictor.dto.ConcertResultResponseDTO;
import com.marcela.bts_songs_predictor.service.ConcertResultService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/concerts")
public class ConcertController {

  private final ConcertService concertService;
  private final WinnerService winnerService;
  private final ConcertResultService concertResultService;

  public ConcertController(
      ConcertService concertService,
      WinnerService winnerService,
      ConcertResultService concertResultService
  ) {
    this.concertService = concertService;
    this.winnerService = winnerService;
    this.concertResultService = concertResultService;
  }

  @PostMapping
  public ConcertResponseDTO createConcert(@RequestBody ConcertRequestDTO dto) {
    return concertService.createConcert(dto);
  }

  @GetMapping
  public List<ConcertResponseDTO> getAllConcerts() {
    return concertService.getAllConcerts();
  }

  @GetMapping("/{concertId}/winners")
  public List<WinnerResponseDTO> getWinnersByConcert(@PathVariable Long concertId) {
    return winnerService.getWinnersByConcert(concertId);
  }

  @GetMapping("/next")
  public ConcertResponseDTO getNextConcert() {
    return concertService.getNextConcert();
  }

  @GetMapping("/{concertId}/results")
  public List<ConcertResultResponseDTO> getResultsByConcert(
      @PathVariable Long concertId
  ) {
    return concertResultService.getResultsByConcert(concertId);
  }
}