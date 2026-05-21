package com.marcela.bts_songs_predictor.dto;

import java.util.List;

public record AlbumWithSongsDTO(
    Long id,
    String name,
    Integer displayOrder,
    List<SongResponseDTO> songs
) {
}