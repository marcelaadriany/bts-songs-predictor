package com.marcela.bts_songs_predictor.dto;

public record UserResponseDTO(
    Long id,
    String username,
    String email,
    Integer score
) {
}