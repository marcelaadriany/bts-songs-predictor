package com.marcela.bts_songs_predictor.service;

import com.marcela.bts_songs_predictor.dto.ConcertRequestDTO;
import com.marcela.bts_songs_predictor.dto.ConcertResponseDTO;
import com.marcela.bts_songs_predictor.entity.Concert;
import com.marcela.bts_songs_predictor.repository.ConcertRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.ZoneId;
import java.time.ZonedDateTime;
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
    concert.setConcertTime(dto.concertTime());
    concert.setTimezone(dto.timezone());

    Concert savedConcert = concertRepository.save(concert);

    return toResponseDTO(savedConcert);
  }

  public List<ConcertResponseDTO> getAllConcerts() {
    return concertRepository.findAllByOrderByConcertDateAscConcertTimeAsc()
        .stream()
        .map(this::toResponseDTO)
        .toList();
  }

  public ConcertResponseDTO getNextConcert() {
    Concert concert = concertRepository
        .findFirstByResultReleasedFalseAndConcertDateGreaterThanEqualOrderByConcertDateAscConcertTimeAsc(
            LocalDate.now()
        )
        .orElseThrow(() ->
            new IllegalArgumentException("Nenhum próximo show encontrado.")
        );

    return toResponseDTO(concert);
  }

  private ConcertResponseDTO toResponseDTO(Concert concert) {
    String startsAtUtc = ZonedDateTime.of(
        concert.getConcertDate(),
        concert.getConcertTime(),
        ZoneId.of(concert.getTimezone())
    ).toInstant().toString();

    return new ConcertResponseDTO(
        concert.getId(),
        concert.getName(),
        concert.getConcertDate(),
        concert.getConcertTime(),
        concert.getTimezone(),
        startsAtUtc,
        concert.getResultReleased()
    );
  }
}