package com.marcela.bts_songs_predictor.dto;

public record RankingResponseDTO(
    Long userId,
    String username,
    Integer totalPoints
) {
}