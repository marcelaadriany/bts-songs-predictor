package com.marcela.bts_songs_predictor.dto;

import java.util.List;

public record WinnerResponseDTO(
    Long userId,
    String username,
    Integer points,
    List<String> matchedSongs
) {
}