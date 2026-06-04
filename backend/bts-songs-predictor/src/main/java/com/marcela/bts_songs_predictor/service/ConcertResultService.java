package com.marcela.bts_songs_predictor.service;

import com.marcela.bts_songs_predictor.dto.ConcertResultResponseDTO;
import com.marcela.bts_songs_predictor.entity.Concert;
import com.marcela.bts_songs_predictor.repository.ConcertRepository;
import com.marcela.bts_songs_predictor.repository.ConcertResultRepository;
import com.marcela.bts_songs_predictor.exception.ResourceNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ConcertResultService {

  private final ConcertRepository concertRepository;
  private final ConcertResultRepository concertResultRepository;

  public ConcertResultService(
      ConcertRepository concertRepository,
      ConcertResultRepository concertResultRepository
  ) {
    this.concertRepository = concertRepository;
    this.concertResultRepository = concertResultRepository;
  }

  public List<ConcertResultResponseDTO> getResultsByConcert(Long concertId) {
    Concert concert = concertRepository.findById(concertId)
        .orElseThrow(() -> new ResourceNotFoundException("Show não encontrado."));

    if (!Boolean.TRUE.equals(concert.getResultReleased())) {
      return List.of();
    }

    return concertResultRepository.findByConcertId(concertId)
        .stream()
        .map(concertResult -> new ConcertResultResponseDTO(
            concertResult.getSong().getId(),
            concertResult.getSong().getTitle()
        ))
        .toList();
  }
}