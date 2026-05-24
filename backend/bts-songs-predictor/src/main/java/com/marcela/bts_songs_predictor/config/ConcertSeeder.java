package com.marcela.bts_songs_predictor.config;

import com.marcela.bts_songs_predictor.entity.Concert;
import com.marcela.bts_songs_predictor.repository.ConcertRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.core.annotation.Order;
import org.springframework.stereotype.Component;

import java.time.LocalDate;

@Component
@Order(2)
public class ConcertSeeder implements CommandLineRunner {

  private final ConcertRepository concertRepository;

  public ConcertSeeder(ConcertRepository concertRepository) {
    this.concertRepository = concertRepository;
  }

  @Override
  public void run(String... args) {
    if (concertRepository.count() > 0) {
      return;
    }

    seedConcerts();
  }

  private void seedConcerts() {
    addConcert("GOYANG, KR", LocalDate.of(2026, 4, 9));
    addConcert("GOYANG, KR", LocalDate.of(2026, 4, 11));
    addConcert("GOYANG, KR", LocalDate.of(2026, 4, 12));

    addConcert("TOKYO, JP", LocalDate.of(2026, 4, 17));
    addConcert("TOKYO, JP", LocalDate.of(2026, 4, 18));

    addConcert("TAMPA, EUA", LocalDate.of(2026, 4, 25));
    addConcert("TAMPA, EUA", LocalDate.of(2026, 4, 26));
    addConcert("TAMPA, EUA", LocalDate.of(2026, 4, 28));

    addConcert("EL PASO, EUA", LocalDate.of(2026, 5, 2));
    addConcert("EL PASO, EUA", LocalDate.of(2026, 5, 3));

    addConcert("MÉXICO CITY, MX", LocalDate.of(2026, 5, 7));
    addConcert("MÉXICO CITY, MX", LocalDate.of(2026, 5, 9));
    addConcert("MÉXICO CITY, MX", LocalDate.of(2026, 5, 10));

    addConcert("STANFORD, EUA", LocalDate.of(2026, 5, 16));
    addConcert("STANFORD, EUA", LocalDate.of(2026, 5, 17));
    addConcert("STANFORD, EUA", LocalDate.of(2026, 5, 19));

    addConcert("LAS VEGAS, EUA", LocalDate.of(2026, 5, 23));
    addConcert("LAS VEGAS, EUA", LocalDate.of(2026, 5, 24));
    addConcert("LAS VEGAS, EUA", LocalDate.of(2026, 5, 27));
    addConcert("LAS VEGAS, EUA", LocalDate.of(2026, 5, 28));

    addConcert("BUSAN, KR", LocalDate.of(2026, 6, 12));
    addConcert("BUSAN, KR", LocalDate.of(2026, 6, 13));

    addConcert("MADRID, ES", LocalDate.of(2026, 6, 26));
    addConcert("MADRID, ES", LocalDate.of(2026, 6, 27));

  }

  private void addConcert(String name, LocalDate concertDate) {
    Concert concert = new Concert();
    concert.setName(name);
    concert.setConcertDate(concertDate);

    concertRepository.save(concert);
  }
}