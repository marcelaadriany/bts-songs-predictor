package com.marcela.bts_songs_predictor.service;

import com.marcela.bts_songs_predictor.dto.WinnerResponseDTO;
import com.marcela.bts_songs_predictor.entity.Bet;
import com.marcela.bts_songs_predictor.entity.BetSong;
import com.marcela.bts_songs_predictor.entity.ConcertResult;
import com.marcela.bts_songs_predictor.repository.BetRepository;
import com.marcela.bts_songs_predictor.repository.BetSongRepository;
import com.marcela.bts_songs_predictor.repository.ConcertResultRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Service
public class WinnerService {

  private final BetRepository betRepository;
  private final BetSongRepository betSongRepository;
  private final ConcertResultRepository concertResultRepository;

  public WinnerService(
      BetRepository betRepository,
      BetSongRepository betSongRepository,
      ConcertResultRepository concertResultRepository
  ) {
    this.betRepository = betRepository;
    this.betSongRepository = betSongRepository;
    this.concertResultRepository = concertResultRepository;
  }

  public List<WinnerResponseDTO> getWinnersByConcert(Long concertId) {
    Set<Long> resultSongIds = concertResultRepository.findByConcertId(concertId)
        .stream()
        .map(concertResult -> concertResult.getSong().getId())
        .collect(Collectors.toSet());

    if (resultSongIds.isEmpty()) {
      throw new IllegalArgumentException("Resultado ainda não cadastrado para este show.");
    }

    return betRepository.findByConcertId(concertId)
        .stream()
        .map(bet -> calculateWinnerResult(bet, resultSongIds))
        .filter(result -> result.points() > 0)
        .sorted((a, b) -> b.points().compareTo(a.points()))
        .toList();
  }

  private WinnerResponseDTO calculateWinnerResult(Bet bet, Set<Long> resultSongIds) {
    List<BetSong> betSongs = betSongRepository.findByBetId(bet.getId());

    List<String> matchedSongs = betSongs.stream()
        .filter(betSong -> resultSongIds.contains(betSong.getSong().getId()))
        .map(betSong -> betSong.getSong().getTitle())
        .toList();

    return new WinnerResponseDTO(
        bet.getUser().getId(),
        bet.getUser().getUsername(),
        matchedSongs.size(),
        matchedSongs
    );
  }
}