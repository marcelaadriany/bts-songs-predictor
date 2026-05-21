package com.marcela.bts_songs_predictor.dto;

public record UserRequestDTO(
    String username,
    String email,
    String password
) {
}