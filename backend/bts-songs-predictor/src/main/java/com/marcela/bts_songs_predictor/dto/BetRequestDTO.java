package com.marcela.bts_songs_predictor.dto;

import java.util.List;

public record BetRequestDTO(
    Long concertId,
    List<Long> songIds
) {
}