package com.marcela.bts_songs_predictor.service;

import com.marcela.bts_songs_predictor.dto.BetRequestDTO;
import com.marcela.bts_songs_predictor.dto.BetResponseDTO;
import com.marcela.bts_songs_predictor.dto.SongResponseDTO;
import com.marcela.bts_songs_predictor.entity.*;
import com.marcela.bts_songs_predictor.repository.*;
import org.springframework.stereotype.Service;
import org.springframework.security.core.context.SecurityContextHolder;

import java.util.List;

@Service
public class BetService {

  private final BetRepository betRepository;
  private final BetSongRepository betSongRepository;
  private final ConcertRepository concertRepository;
  private final SongRepository songRepository;

  public BetService(
      BetRepository betRepository,
      BetSongRepository betSongRepository,
      UserRepository userRepository,
      ConcertRepository concertRepository,
      SongRepository songRepository
  ) {
    this.betRepository = betRepository;
    this.betSongRepository = betSongRepository;
    this.concertRepository = concertRepository;
    this.songRepository = songRepository;
  }

  private User getAuthenticatedUser() {
    return (User) SecurityContextHolder
        .getContext()
        .getAuthentication()
        .getPrincipal();
  }

  public BetResponseDTO createBet(BetRequestDTO dto) {
    if (dto.songIds() == null || dto.songIds().size() != 2) {
      throw new IllegalArgumentException("A aposta deve conter exatamente 2 músicas.");
    }

    User user = getAuthenticatedUser();

    Concert concert = concertRepository.findById(dto.concertId())
        .orElseThrow(() -> new IllegalArgumentException("Show não encontrado."));

    List<Song> songs = songRepository.findAllById(dto.songIds());

    if (songs.size() != 2) {
      throw new IllegalArgumentException("Uma ou mais músicas não foram encontradas.");
    }

    Bet bet = new Bet();
    bet.setUser(user);
    bet.setConcert(concert);

    Bet savedBet = betRepository.save(bet);

    songs.forEach(song -> {
      BetSong betSong = new BetSong();
      betSong.setBet(savedBet);
      betSong.setSong(song);
      betSongRepository.save(betSong);
    });

    return toResponseDTO(savedBet);
  }

  public List<BetResponseDTO> getBetsByConcert(Long concertId) {
    return betRepository.findByConcertId(concertId)
        .stream()
        .map(this::toResponseDTO)
        .toList();
  }

  private BetResponseDTO toResponseDTO(Bet bet) {
    List<SongResponseDTO> songs = betSongRepository.findByBetId(bet.getId())
        .stream()
        .map(betSong -> new SongResponseDTO(
            betSong.getSong().getId(),
            betSong.getSong().getTitle(),
            betSong.getSong().getAlreadyPlayed()
        ))
        .toList();

    return new BetResponseDTO(
        bet.getId(),
        bet.getUser().getDisplayUsername(),
        bet.getConcert().getName(),
        bet.getCreatedAt(),
        songs
    );
  }
}