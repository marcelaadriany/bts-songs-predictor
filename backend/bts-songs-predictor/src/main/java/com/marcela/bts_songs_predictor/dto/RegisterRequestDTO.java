package com.marcela.bts_songs_predictor.dto;

public record RegisterRequestDTO(
    String username,
    String email,
    String password
) {
}