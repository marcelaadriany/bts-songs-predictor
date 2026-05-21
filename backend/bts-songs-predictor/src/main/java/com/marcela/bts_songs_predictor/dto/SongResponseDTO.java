package com.marcela.bts_songs_predictor.dto;

public record SongResponseDTO(
    Long id,
    String title,
    Boolean alreadyPlayed
) {
}