package com.marcela.bts_songs_predictor.service;

import com.marcela.bts_songs_predictor.dto.BetRequestDTO;
import com.marcela.bts_songs_predictor.dto.BetResponseDTO;
import com.marcela.bts_songs_predictor.dto.SongResponseDTO;
import com.marcela.bts_songs_predictor.entity.*;
import com.marcela.bts_songs_predictor.repository.*;
import java.time.LocalDate;
import org.springframework.stereotype.Service;
import org.springframework.security.core.context.SecurityContextHolder;
import com.marcela.bts_songs_predictor.exception.BadRequestException;

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
    if (dto.songIds() == null || dto.songIds().size() != 6) {
      throw new BadRequestException("A aposta deve conter exatamente 6 músicas.");
    }

    User user = getAuthenticatedUser();

    Concert concert = concertRepository
        .findFirstByResultReleasedFalseAndConcertDateGreaterThanEqualOrderByConcertDateAscConcertTimeAsc(
            LocalDate.now())
        .orElseThrow(() -> new BadRequestException("Nenhum próximo show disponível para apostas."));

    if (Boolean.TRUE.equals(concert.getResultReleased())) {
      throw new BadRequestException("Não é possível apostar em um show com resultado já liberado.");
    }

    if (betRepository.existsByUserIdAndConcertId(user.getId(), concert.getId())) {
      throw new BadRequestException("Você já fez uma aposta para este show.");
    }

    List<Song> songs = songRepository.findAllById(dto.songIds());

    if (songs.size() != 6) {
      throw new BadRequestException("Uma ou mais músicas não foram encontradas.");
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

  public List<BetResponseDTO> getMyBets() {
    User user = getAuthenticatedUser();

    return betRepository.findByUserIdOrderByCreatedAtDesc(user.getId())
        .stream()
        .map(this::toResponseDTO)
        .toList();
  }

  public BetResponseDTO updateBet(Long betId, BetRequestDTO dto) {
    if (dto.songIds() == null || dto.songIds().size() != 6) {
      throw new BadRequestException("A aposta deve conter exatamente 6 músicas.");
    }

    User user = getAuthenticatedUser();

    Bet bet = betRepository.findById(betId)
        .orElseThrow(() -> new BadRequestException("Aposta não encontrada."));

    if (!bet.getUser().getId().equals(user.getId())) {
      throw new BadRequestException("Você não pode editar a aposta de outra usuária.");
    }

    Concert concert = bet.getConcert();

    Concert nextConcert = concertRepository
        .findFirstByResultReleasedFalseAndConcertDateGreaterThanEqualOrderByConcertDateAscConcertTimeAsc(
            LocalDate.now()
        )
        .orElseThrow(() ->
            new BadRequestException("Nenhum próximo show disponível para apostas.")
        );

    if (!concert.getId().equals(nextConcert.getId())) {
      throw new BadRequestException("Só é possível editar apostas do próximo show.");
    }

    if (Boolean.TRUE.equals(concert.getResultReleased())) {
      throw new BadRequestException("Não é possível editar apostas após o resultado ser liberado.");
    }

    List<Song> songs = songRepository.findAllById(dto.songIds());

    if (songs.size() != 6) {
      throw new BadRequestException("Uma ou mais músicas não foram encontradas.");
    }

    List<BetSong> existingBetSongs = betSongRepository.findByBetId(bet.getId());

    betSongRepository.deleteAll(existingBetSongs);

    songs.forEach(song -> {
      BetSong betSong = new BetSong();
      betSong.setBet(bet);
      betSong.setSong(song);
      betSongRepository.save(betSong);
    });

    return toResponseDTO(bet);
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
        bet.getConcert().getId(),
        bet.getUser().getUsername(),
        bet.getConcert().getName(),
        bet.getConcert().getConcertDate(),
        bet.getConcert().getResultReleased(),
        bet.getCreatedAt(),
        songs
    );
  }
}