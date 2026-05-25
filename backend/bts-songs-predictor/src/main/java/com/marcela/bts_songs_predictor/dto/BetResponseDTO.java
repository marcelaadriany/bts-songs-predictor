package com.marcela.bts_songs_predictor.dto;

import java.time.LocalDateTime;
import java.util.List;

public record BetResponseDTO(
    Long id,
    String username,
    String concertName,
    LocalDateTime createdAt,
    List<SongResponseDTO> songs
) {
}