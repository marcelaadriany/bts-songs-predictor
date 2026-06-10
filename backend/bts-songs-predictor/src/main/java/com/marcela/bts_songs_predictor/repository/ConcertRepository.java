package com.marcela.bts_songs_predictor.repository;

import com.marcela.bts_songs_predictor.entity.Concert;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

public interface ConcertRepository extends JpaRepository<Concert, Long> {

    List<Concert> findAllByOrderByConcertDateAscConcertTimeAsc();

    Optional<Concert> findByNameAndConcertDate(String name, LocalDate concertDate);

    Optional<Concert> findFirstByResultReleasedFalseAndConcertDateGreaterThanEqualOrderByConcertDateAscConcertTimeAsc(
        LocalDate today
    );
}