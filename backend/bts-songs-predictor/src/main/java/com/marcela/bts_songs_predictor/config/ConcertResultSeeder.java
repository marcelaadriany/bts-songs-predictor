package com.marcela.bts_songs_predictor.config;

import com.marcela.bts_songs_predictor.entity.Concert;
import com.marcela.bts_songs_predictor.entity.ConcertResult;
import com.marcela.bts_songs_predictor.entity.Song;
import com.marcela.bts_songs_predictor.repository.ConcertRepository;
import com.marcela.bts_songs_predictor.repository.ConcertResultRepository;
import com.marcela.bts_songs_predictor.repository.SongRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.core.annotation.Order;
import org.springframework.stereotype.Component;

import java.time.LocalDate;

@Component
@Order(3)
public class ConcertResultSeeder implements CommandLineRunner {

  private final ConcertRepository concertRepository;
  private final SongRepository songRepository;
  private final ConcertResultRepository concertResultRepository;

  public ConcertResultSeeder(
      ConcertRepository concertRepository,
      SongRepository songRepository,
      ConcertResultRepository concertResultRepository
  ) {
    this.concertRepository = concertRepository;
    this.songRepository = songRepository;
    this.concertResultRepository = concertResultRepository;
  }

  @Override
  public void run(String... args) {
    if (concertResultRepository.count() > 0) {
      return;
    }

    seedConcertResults();
  }

  private void seedConcertResults() {
    addConcertResult("GOYANG, KR", LocalDate.of(2026, 4, 9), "MIKROKOSMOS", "I NEED U");
    addConcertResult("GOYANG, KR", LocalDate.of(2026, 4, 11), "DNA", "TAKE TWO");
    addConcertResult("GOYANG, KR", LocalDate.of(2026, 4, 12), "RUN", "SPRING DAY");

    addConcertResult("TOKYO, JP", LocalDate.of(2026, 4, 17), "SAVE ME", "CRYSTAL SNOW");
    addConcertResult("TOKYO, JP", LocalDate.of(2026, 4, 18), "DOPE", "FOR YOU");

    addConcertResult("TAMPA, EUA", LocalDate.of(2026, 4, 25), "PERMISSION TO DANCE", "MAGIC SHOP");
    addConcertResult("TAMPA, EUA", LocalDate.of(2026, 4, 26), "PIED PIPER", "BOY WITH LUV");
    addConcertResult("TAMPA, EUA", LocalDate.of(2026, 4, 28), "SILVER SPOON (BAEPSAE)", "LIFE GOES ON");

    addConcertResult("EL PASO, EUA", LocalDate.of(2026, 5, 2), "ON", "WINGS");
    addConcertResult("EL PASO, EUA", LocalDate.of(2026, 5, 3), "DIONYSUS", "BEST OF ME");

    addConcertResult("MÉXICO CITY, MX", LocalDate.of(2026, 5, 7), "SO WHAT", "BOY IN LUV");
    addConcertResult("MÉXICO CITY, MX", LocalDate.of(2026, 5, 9), "WE ARE BULLETPROOF PT. 2", "JUST ONE DAY");
    addConcertResult("MÉXICO CITY, MX", LocalDate.of(2026, 5, 10), "AIRPLANE PT. 2", "SPRING DAY");

    addConcertResult("STANFORD, EUA", LocalDate.of(2026, 5, 16), "N.O", "ANPANMAN");
    addConcertResult("STANFORD, EUA", LocalDate.of(2026, 5, 17), "DOPE", "BLOOD SWEAT & TEARS");
    addConcertResult("STANFORD, EUA", LocalDate.of(2026, 5, 19), "I NEED U", "NO MORE DREAM");
  }

  private void addConcertResult(String concertName, LocalDate date, String firstSongTitle, String secondSongTitle) {
    Concert concert = findConcert(concertName, date);

    addResultSong(concert, firstSongTitle);
    addResultSong(concert, secondSongTitle);

    concert.setResultReleased(true);
    concertRepository.save(concert);
  }

  private Concert findConcert(String name, LocalDate date) {
    return concertRepository.findByNameAndConcertDate(name, date)
        .orElseThrow(() -> new IllegalArgumentException(
            "Show não encontrado no ConcertSeeder: " + name + " - " + date
        ));
  }

  private void addResultSong(Concert concert, String songTitle) {
    Song song = songRepository.findByTitle(songTitle)
        .orElseThrow(() -> new IllegalArgumentException(
            "Música não encontrada no AlbumSongSeeder: " + songTitle
        ));

    ConcertResult concertResult = new ConcertResult();
    concertResult.setConcert(concert);
    concertResult.setSong(song);

    concertResultRepository.save(concertResult);

    song.setAlreadyPlayed(true);
    songRepository.save(song);
  }
}