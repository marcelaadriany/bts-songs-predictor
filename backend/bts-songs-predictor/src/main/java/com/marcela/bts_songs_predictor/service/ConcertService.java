package com.marcela.bts_songs_predictor.service;

import com.marcela.bts_songs_predictor.dto.ConcertRequestDTO;
import com.marcela.bts_songs_predictor.dto.ConcertResponseDTO;
import com.marcela.bts_songs_predictor.entity.Concert;
import com.marcela.bts_songs_predictor.repository.ConcertRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ConcertService {

  private final ConcertRepository concertRepository;

  public ConcertService(ConcertRepository concertRepository) {
    this.concertRepository = concertRepository;
  }

  public ConcertResponseDTO createConcert(ConcertRequestDTO dto) {
    Concert concert = new Concert();
    concert.setName(dto.name());
    concert.setConcertDate(dto.concertDate());

    Concert savedConcert = concertRepository.save(concert);

    return toResponseDTO(savedConcert);
  }

  public List<ConcertResponseDTO> getAllConcerts() {
    return concertRepository.findAllByOrderByConcertDateAsc()
        .stream()
        .map(this::toResponseDTO)
        .toList();
  }

  private ConcertResponseDTO toResponseDTO(Concert concert) {
    return new ConcertResponseDTO(
        concert.getId(),
        concert.getName(),
        concert.getConcertDate(),
        concert.getResultReleased()
    );
  }
}