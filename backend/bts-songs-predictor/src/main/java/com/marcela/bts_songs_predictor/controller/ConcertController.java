package com.marcela.bts_songs_predictor.controller;

import com.marcela.bts_songs_predictor.dto.ConcertRequestDTO;
import com.marcela.bts_songs_predictor.dto.ConcertResponseDTO;
import com.marcela.bts_songs_predictor.service.ConcertService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/concerts")
public class ConcertController {

  private final ConcertService concertService;

  public ConcertController(ConcertService concertService) {
    this.concertService = concertService;
  }

  @PostMapping
  public ConcertResponseDTO createConcert(@RequestBody ConcertRequestDTO dto) {
    return concertService.createConcert(dto);
  }

  @GetMapping
  public List<ConcertResponseDTO> getAllConcerts() {
    return concertService.getAllConcerts();
  }
}