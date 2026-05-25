package com.marcela.bts_songs_predictor.dto;

import java.time.LocalDate;

public record ConcertRequestDTO(
    String name,
    LocalDate concertDate
) {
}