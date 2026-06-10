package com.marcela.bts_songs_predictor.dto;

import java.time.LocalDate;
import java.time.LocalTime;

public record ConcertResponseDTO(
    Long id,
    String name,
    LocalDate concertDate,
    LocalTime concertTime,
    String timezone,
    String startsAtUtc,
    Boolean resultReleased
) {
}