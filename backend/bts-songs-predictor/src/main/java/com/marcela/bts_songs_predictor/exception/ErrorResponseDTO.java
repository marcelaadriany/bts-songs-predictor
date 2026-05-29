package com.marcela.bts_songs_predictor.exception;

import java.time.LocalDateTime;

public record ErrorResponseDTO(
    String message,
    Integer status,
    LocalDateTime timestamp
) {
}