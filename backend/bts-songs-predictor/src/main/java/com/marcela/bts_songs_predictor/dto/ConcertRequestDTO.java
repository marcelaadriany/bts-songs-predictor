package com.marcela.bts_songs_predictor.dto;

import java.time.LocalDate;
import java.time.LocalTime;

public record ConcertRequestDTO(
    String name,
    LocalDate concertDate,
    LocalTime concertTime,
    String timezone
) {
}