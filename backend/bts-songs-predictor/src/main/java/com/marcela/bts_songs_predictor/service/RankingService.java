package com.marcela.bts_songs_predictor.service;

import com.marcela.bts_songs_predictor.dto.RankingResponseDTO;
import com.marcela.bts_songs_predictor.dto.WinnerResponseDTO;
import com.marcela.bts_songs_predictor.entity.Concert;
import com.marcela.bts_songs_predictor.repository.ConcertRepository;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class RankingService {

  private final ConcertRepository concertRepository;
  private final WinnerService winnerService;

  public RankingService(
      ConcertRepository concertRepository,
      WinnerService winnerService
  ) {
    this.concertRepository = concertRepository;
    this.winnerService = winnerService;
  }

  public List<RankingResponseDTO> getRanking() {

    Map<Long, RankingResponseDTO> rankingMap = new HashMap<>();

    List<Concert> concerts = concertRepository.findAll();

    for (Concert concert : concerts) {

      if (!Boolean.TRUE.equals(concert.getResultReleased())) {
        continue;
      }

      List<WinnerResponseDTO> winners =
          winnerService.getWinnersByConcert(concert.getId());

      for (WinnerResponseDTO winner : winners) {

        RankingResponseDTO existingUser =
            rankingMap.get(winner.userId());

        if (existingUser == null) {

          rankingMap.put(
              winner.userId(),
              new RankingResponseDTO(
                  winner.userId(),
                  winner.username(),
                  winner.points()
              )
          );

        } else {

          rankingMap.put(
              winner.userId(),
              new RankingResponseDTO(
                  existingUser.userId(),
                  existingUser.username(),
                  existingUser.totalPoints() + winner.points()
              )
          );
        }
      }
    }

    return rankingMap.values()
        .stream()
        .sorted((a, b) ->
            b.totalPoints().compareTo(a.totalPoints())
        )
        .toList();
  }
}