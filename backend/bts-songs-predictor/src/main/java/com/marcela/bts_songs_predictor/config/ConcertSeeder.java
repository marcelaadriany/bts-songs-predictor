package com.marcela.bts_songs_predictor.config;

import com.marcela.bts_songs_predictor.entity.Concert;
import com.marcela.bts_songs_predictor.repository.ConcertRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.core.annotation.Order;
import org.springframework.stereotype.Component;

import java.time.LocalDate;
import java.time.LocalTime;

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
    addConcert("Goyang, dia 1", LocalDate.of(2026, 4, 9), LocalTime.of(19, 0), "Asia/Seoul");
    addConcert("Goyang, dia 2", LocalDate.of(2026, 4, 11), LocalTime.of(19, 0), "Asia/Seoul");
    addConcert("Goyang, dia 3", LocalDate.of(2026, 4, 12), LocalTime.of(19, 0), "Asia/Seoul");

    addConcert("Tóquio, dia 1", LocalDate.of(2026, 4, 17), LocalTime.of(19, 0), "Asia/Tokyo");
    addConcert("Tóquio, dia 2", LocalDate.of(2026, 4, 18), LocalTime.of(19, 0), "Asia/Tokyo");

    addConcert("Tampa, dia 1", LocalDate.of(2026, 4, 25), LocalTime.of(19, 0), "America/New_York");
    addConcert("Tampa, dia 2", LocalDate.of(2026, 4, 26), LocalTime.of(19, 0), "America/New_York");
    addConcert("Tampa, dia 3", LocalDate.of(2026, 4, 28), LocalTime.of(19, 0), "America/New_York");

    addConcert("El Paso, dia 1", LocalDate.of(2026, 5, 2), LocalTime.of(19, 0), "America/Denver");
    addConcert("El Paso, dia 2", LocalDate.of(2026, 5, 3), LocalTime.of(19, 0), "America/Denver");

    addConcert("Cidade do México, dia 1", LocalDate.of(2026, 5, 7), LocalTime.of(19, 0), "America/Mexico_City");
    addConcert("Cidade do México, dia 2", LocalDate.of(2026, 5, 9), LocalTime.of(19, 0), "America/Mexico_City");
    addConcert("Cidade do México, dia 3", LocalDate.of(2026, 5, 10), LocalTime.of(19, 0), "America/Mexico_City");

    addConcert("Standford, dia 1", LocalDate.of(2026, 5, 16), LocalTime.of(19, 0), "America/Los_Angeles");
    addConcert("Standford, dia 2", LocalDate.of(2026, 5, 17), LocalTime.of(19, 0), "America/Los_Angeles");
    addConcert("Standford, dia 3", LocalDate.of(2026, 5, 19), LocalTime.of(19, 0), "America/Los_Angeles");

    addConcert("Las Vegas, dia 1", LocalDate.of(2026, 5, 23), LocalTime.of(19, 0), "America/Los_Angeles");
    addConcert("Las Vegas, dia 2", LocalDate.of(2026, 5, 24), LocalTime.of(19, 0), "America/Los_Angeles");
    addConcert("Las Vegas, dia 3", LocalDate.of(2026, 5, 27), LocalTime.of(19, 0), "America/Los_Angeles");
    addConcert("Las Vegas, dia 4", LocalDate.of(2026, 5, 28), LocalTime.of(19, 0), "America/Los_Angeles");

    addConcert("Busan, dia 1", LocalDate.of(2026, 6, 12), LocalTime.of(19, 0), "Asia/Seoul");
    addConcert("Busan, dia 2", LocalDate.of(2026, 6, 13), LocalTime.of(19, 0), "Asia/Seoul");

    addConcert("Madrid, dia 1", LocalDate.of(2026, 6, 26), LocalTime.of(19, 0), "Europe/Madrid");
    addConcert("Madrid, dia 2", LocalDate.of(2026, 6, 27), LocalTime.of(19, 0), "Europe/Madrid");

    addConcert("Bruxelas, dia 1", LocalDate.of(2026, 7, 1), LocalTime.of(19, 0), "Europe/Brussels");
    addConcert("Bruxelas, dia 2", LocalDate.of(2026, 7, 2), LocalTime.of(19, 0), "Europe/Brussels");

    addConcert("Londres, dia 1", LocalDate.of(2026, 7, 6), LocalTime.of(19, 0), "Europe/London");
    addConcert("Londres, dia 2", LocalDate.of(2026, 7, 7), LocalTime.of(19, 0), "Europe/London");

    addConcert("Munique, dia 1", LocalDate.of(2026, 7, 11), LocalTime.of(19, 0), "Europe/Berlin");
    addConcert("Munique, dia 2", LocalDate.of(2026, 7, 12), LocalTime.of(19, 0), "Europe/Berlin");

    addConcert("Paris, dia 1", LocalDate.of(2026, 7, 17), LocalTime.of(19, 0), "Europe/Paris");
    addConcert("Paris, dia 2", LocalDate.of(2026, 7, 18), LocalTime.of(19, 0), "Europe/Paris");

    addConcert("East Rutherford, dia 1", LocalDate.of(2026, 8, 1), LocalTime.of(19, 0), "America/New_York");
    addConcert("East Rutherford, dia 2", LocalDate.of(2026, 8, 2), LocalTime.of(19, 0), "America/New_York");

    addConcert("Foxborough, dia 1", LocalDate.of(2026, 8, 5), LocalTime.of(19, 0), "America/New_York");
    addConcert("Foxborough, dia 2", LocalDate.of(2026, 8, 6), LocalTime.of(19, 0), "America/New_York");

    addConcert("Baltimore, dia 1", LocalDate.of(2026, 8, 10), LocalTime.of(19, 0), "America/New_York");
    addConcert("Baltimore, dia 2", LocalDate.of(2026, 8, 11), LocalTime.of(19, 0), "America/New_York");

    addConcert("Arlington, dia 1", LocalDate.of(2026, 8, 15), LocalTime.of(19, 0), "America/Chicago");
    addConcert("Arlington, dia 2", LocalDate.of(2026, 8, 16), LocalTime.of(19, 0), "America/Chicago");

    addConcert("Toronto, dia 1", LocalDate.of(2026, 8, 22), LocalTime.of(19, 0), "America/Toronto");
    addConcert("Toronto, dia 2", LocalDate.of(2026, 8, 23), LocalTime.of(19, 0), "America/Toronto");

    addConcert("Chicago, dia 1", LocalDate.of(2026, 8, 27), LocalTime.of(19, 0), "America/Chicago");
    addConcert("Chicago, dia 2", LocalDate.of(2026, 8, 28), LocalTime.of(19, 0), "America/Chicago");

    addConcert("Los Angeles, dia 1", LocalDate.of(2026, 9, 1), LocalTime.of(19, 0), "America/Los_Angeles");
    addConcert("Los Angeles, dia 2", LocalDate.of(2026, 9, 2), LocalTime.of(19, 0), "America/Los_Angeles");
    addConcert("Los Angeles, dia 3", LocalDate.of(2026, 9, 5), LocalTime.of(19, 0), "America/Los_Angeles");
    addConcert("Los Angeles, dia 4", LocalDate.of(2026, 9, 6), LocalTime.of(19, 0), "America/Los_Angeles");

    addConcert("Bogotá, dia 1", LocalDate.of(2026, 10, 2), LocalTime.of(19, 0), "America/Bogota");
    addConcert("Bogotá, dia 2", LocalDate.of(2026, 10, 3), LocalTime.of(19, 0), "America/Bogota");

    addConcert("Lima, dia 1", LocalDate.of(2026, 10, 7), LocalTime.of(19, 0), "America/Lima");
    addConcert("Lima, dia 2", LocalDate.of(2026, 10, 9), LocalTime.of(19, 0), "America/Lima");
    addConcert("Lima, dia 3", LocalDate.of(2026, 10, 10), LocalTime.of(19, 0), "America/Lima");

    addConcert("Santiago, dia 1", LocalDate.of(2026, 10, 14), LocalTime.of(19, 0), "America/Santiago");
    addConcert("Santiago, dia 2", LocalDate.of(2026, 10, 16), LocalTime.of(19, 0), "America/Santiago");
    addConcert("Santiago, dia 3", LocalDate.of(2026, 10, 17), LocalTime.of(19, 0), "America/Santiago");

    addConcert("Buenos Aires, dia 1", LocalDate.of(2026, 10, 21), LocalTime.of(19, 0), "America/Argentina/Buenos_Aires");
    addConcert("Buenos Aires, dia 2", LocalDate.of(2026, 10, 23), LocalTime.of(19, 0), "America/Argentina/Buenos_Aires");
    addConcert("Buenos Aires, dia 3", LocalDate.of(2026, 10, 24), LocalTime.of(19, 0), "America/Argentina/Buenos_Aires");

    addConcert("São Paulo, dia 1", LocalDate.of(2026, 10, 28), LocalTime.of(19, 0), "America/Sao_Paulo");
    addConcert("São Paulo, dia 2", LocalDate.of(2026, 10, 30), LocalTime.of(19, 0), "America/Sao_Paulo");
    addConcert("São Paulo, dia 3", LocalDate.of(2026, 10, 31), LocalTime.of(19, 0), "America/Sao_Paulo");

    addConcert("Kaohsing, dia 1", LocalDate.of(2026, 11, 19), LocalTime.of(19, 0), "Asia/Taipei");
    addConcert("Kaohsing, dia 2", LocalDate.of(2026, 11, 21), LocalTime.of(19, 0), "Asia/Taipei");
    addConcert("Kaohsing, dia 3", LocalDate.of(2026, 11, 22), LocalTime.of(19, 0), "Asia/Taipei");

    addConcert("Bangkok, dia 1", LocalDate.of(2026, 12, 3), LocalTime.of(19, 0), "Asia/Bangkok");
    addConcert("Bangkok, dia 2", LocalDate.of(2026, 12, 5), LocalTime.of(19, 0), "Asia/Bangkok");
    addConcert("Bangkok, dia 3", LocalDate.of(2026, 12, 6), LocalTime.of(19, 0), "Asia/Bangkok");

    addConcert("Kuala Lumpur, dia 1", LocalDate.of(2026, 12, 12), LocalTime.of(19, 0), "Asia/Kuala_Lumpur");
    addConcert("Kuala Lumpur, dia 2", LocalDate.of(2026, 12, 13), LocalTime.of(19, 0), "Asia/Kuala_Lumpur");

    addConcert("Singapura, dia 1", LocalDate.of(2026, 12, 17), LocalTime.of(19, 0), "Asia/Singapore");
    addConcert("Singapura, dia 2", LocalDate.of(2026, 12, 19), LocalTime.of(19, 0), "Asia/Singapore");
    addConcert("Singapura, dia 3", LocalDate.of(2026, 12, 20), LocalTime.of(19, 0), "Asia/Singapore");
    addConcert("Singapura, dia 4", LocalDate.of(2026, 12, 22), LocalTime.of(19, 0), "Asia/Singapore");

    addConcert("Jacarta, dia 1", LocalDate.of(2026, 12, 26), LocalTime.of(19, 0), "Asia/Jakarta");
    addConcert("Jacarta, dia 2", LocalDate.of(2026, 12, 27), LocalTime.of(19, 0), "Asia/Jakarta");

    addConcert("Melbourne, dia 1", LocalDate.of(2027, 2, 12), LocalTime.of(19, 0), "Australia/Melbourne");
    addConcert("Melbourne, dia 2", LocalDate.of(2027, 2, 13), LocalTime.of(19, 0), "Australia/Melbourne");

    addConcert("Sydney, dia 1", LocalDate.of(2027, 2, 20), LocalTime.of(19, 0), "Australia/Sydney");
    addConcert("Sydney, dia 2", LocalDate.of(2027, 2, 21), LocalTime.of(19, 0), "Australia/Sydney");

    addConcert("Hong Kong, dia 1", LocalDate.of(2027, 3, 4), LocalTime.of(19, 0), "Asia/Hong_Kong");
    addConcert("Hong Kong, dia 2", LocalDate.of(2027, 3, 6), LocalTime.of(19, 0), "Asia/Hong_Kong");
    addConcert("Hong Kong, dia 3", LocalDate.of(2027, 3, 7), LocalTime.of(19, 0), "Asia/Hong_Kong");

    addConcert("Bulacan, dia 1", LocalDate.of(2027, 3, 13), LocalTime.of(19, 0), "Asia/Manila");
    addConcert("Bulacan, dia 2", LocalDate.of(2027, 3, 14), LocalTime.of(19, 0), "Asia/Manila");
  }

  private void addConcert(
      String name,
      LocalDate concertDate,
      LocalTime concertTime,
      String timezone
  ) {
    Concert concert = new Concert();

    concert.setName(name);
    concert.setConcertDate(concertDate);
    concert.setConcertTime(concertTime);
    concert.setTimezone(timezone);

    concertRepository.save(concert);
  }
}