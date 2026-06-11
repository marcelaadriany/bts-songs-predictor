package com.marcela.bts_songs_predictor.dto;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

public record BetResponseDTO(
    Long id,
    Long concertId,
    String username,
    String concertName,
    LocalDate concertDate,
    Boolean resultReleased,
    LocalDateTime createdAt,
    List<SongResponseDTO> songs
) {
}
