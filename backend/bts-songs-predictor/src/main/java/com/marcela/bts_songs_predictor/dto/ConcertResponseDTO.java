package com.marcela.bts_songs_predictor.dto;

import java.time.LocalDate;

public record ConcertResponseDTO(
    Long id,
    String name,
    LocalDate concertDate,
    Boolean resultReleased
) {
}