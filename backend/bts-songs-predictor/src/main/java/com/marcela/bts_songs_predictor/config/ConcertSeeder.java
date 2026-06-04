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

    addConcert("TÓQUIO, JP", LocalDate.of(2026, 4, 17));
    addConcert("TÓQUIO, JP", LocalDate.of(2026, 4, 18));

    addConcert("TAMPA, EUA", LocalDate.of(2026, 4, 25));
    addConcert("TAMPA, EUA", LocalDate.of(2026, 4, 26));
    addConcert("TAMPA, EUA", LocalDate.of(2026, 4, 28));

    addConcert("EL PASO, EUA", LocalDate.of(2026, 5, 2));
    addConcert("EL PASO, EUA", LocalDate.of(2026, 5, 3));

    addConcert("CIDADE DO MÉXICO, MX", LocalDate.of(2026, 5, 7));
    addConcert("CIDADE DO MÉXICO, MX", LocalDate.of(2026, 5, 9));
    addConcert("CIDADE DO MÉXICO, MX", LocalDate.of(2026, 5, 10));

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

    addConcert("BRUXELAS, BE", LocalDate.of(2026, 7, 1));
    addConcert("BRUXELAS, BE", LocalDate.of(2026, 7, 2));

    addConcert("LONDRES, EN", LocalDate.of(2026, 7, 6));
    addConcert("LONDRES, EN", LocalDate.of(2026, 7, 7));

    addConcert("MUNIQUE, AL", LocalDate.of(2026, 7, 11));
    addConcert("MUNIQUE, AL", LocalDate.of(2026, 7, 12));

    addConcert("PARIS, FR", LocalDate.of(2026, 7, 17));
    addConcert("PARIS, FR", LocalDate.of(2026, 7, 18));

    addConcert("EAST RUTHERFORD, EUA", LocalDate.of(2026, 8, 1));
    addConcert("EAST RUTHERFORD, EUA", LocalDate.of(2026, 8, 2));

    addConcert("FOXBOROUGH, EUA", LocalDate.of(2026, 8, 5));
    addConcert("FOXBOROUGH, EUA", LocalDate.of(2026, 8, 6));

    addConcert("BALTIMORE, EUA", LocalDate.of(2026, 8, 10));
    addConcert("BALTIMORE, EUA", LocalDate.of(2026, 8, 11));

    addConcert("ARLINGTON, EUA", LocalDate.of(2026, 8, 15));
    addConcert("ARLINGTON, EUA", LocalDate.of(2026, 8, 16));

    addConcert("TORONTO, CA", LocalDate.of(2026, 8, 22));
    addConcert("TORONTO, CA", LocalDate.of(2026, 8, 23));

    addConcert("CHICAGO, EUA", LocalDate.of(2026, 8, 27));
    addConcert("CHICAGO, EUA", LocalDate.of(2026, 8, 28));

    addConcert("LOS ANGELES, EUA", LocalDate.of(2026, 9, 1));
    addConcert("LOS ANGELES, EUA", LocalDate.of(2026, 9, 2));
    addConcert("LOS ANGELES, EUA", LocalDate.of(2026, 9, 5));
    addConcert("LOS ANGELES, EUA", LocalDate.of(2026, 9, 6));

    addConcert("BOGOTÁ, CO", LocalDate.of(2026, 10, 2));
    addConcert("BOGOTÁ, CO", LocalDate.of(2026, 10, 3));

    addConcert("LIMA, PE", LocalDate.of(2026, 10, 7));
    addConcert("LIMA, PE", LocalDate.of(2026, 10, 9));
    addConcert("LIMA, PE", LocalDate.of(2026, 10, 10));

    addConcert("SANTIAGO, CL", LocalDate.of(2026, 10, 14));
    addConcert("SANTIAGO, Cl", LocalDate.of(2026, 10, 16));
    addConcert("SANTIAGO, Cl", LocalDate.of(2026, 10, 17));

    addConcert("BUENOS AIRES, AR", LocalDate.of(2026, 10, 21));
    addConcert("BUENOS AIRES, AR", LocalDate.of(2026, 10, 23));
    addConcert("BUENOS AIRES, AR", LocalDate.of(2026, 10, 24));

    addConcert("SÃO PAULO, BR", LocalDate.of(2026, 10, 28));
    addConcert("SÃO PAULO, BR", LocalDate.of(2026, 10, 30));
    addConcert("SÃO PAULO, BR", LocalDate.of(2026, 10, 31));

    addConcert("KAOHSIUNG, TW", LocalDate.of(2026, 11, 19));
    addConcert("KAOHSIUNG, TW", LocalDate.of(2026, 11, 21));
    addConcert("KAOHSIUNG, TW", LocalDate.of(2026, 11, 22));

    addConcert("BANGKOK, TH", LocalDate.of(2026, 12, 3));
    addConcert("BANGKOK, TH", LocalDate.of(2026, 12, 5));
    addConcert("BANGKOK, TH", LocalDate.of(2026, 12, 6));

    addConcert("KUALA LUMPUR, MY", LocalDate.of(2026, 12, 12));
    addConcert("KUALA LUMPUR, MY", LocalDate.of(2026, 12, 13));

    addConcert("SINGAPURA, SG", LocalDate.of(2026, 12, 17));
    addConcert("SINGAPURA, SG", LocalDate.of(2026, 12, 19));
    addConcert("SINGAPURA, SG", LocalDate.of(2026, 12, 20));
    addConcert("SINGAPURA, SG", LocalDate.of(2026, 12, 22));

    addConcert("JACARTA, ID", LocalDate.of(2026, 12, 26));
    addConcert("JACARTA, ID", LocalDate.of(2026, 12, 27));

    addConcert("MELBOURNE, AU", LocalDate.of(2027, 2, 12));
    addConcert("MELBOURNE, AU", LocalDate.of(2027, 2, 13));

    addConcert("SYDNEY, AU", LocalDate.of(2027, 2, 20));
    addConcert("SYDNEY, AU", LocalDate.of(2027, 2, 21));

    addConcert("HONG KING, CH", LocalDate.of(2027, 3, 4));
    addConcert("HONG KING, CH", LocalDate.of(2027, 3, 6));
    addConcert("HONG KING, CH", LocalDate.of(2027, 3, 7));

    addConcert("BULACAN, PH", LocalDate.of(2027, 3, 13));
    addConcert("BULACAN, PH", LocalDate.of(2027, 3, 14));

  }

  private void addConcert(String name, LocalDate concertDate) {
    Concert concert = new Concert();
    concert.setName(name);
    concert.setConcertDate(concertDate);

    concertRepository.save(concert);
  }
}