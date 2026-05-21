package com.marcela.bts_songs_predictor.controller;

import com.marcela.bts_songs_predictor.dto.AlbumWithSongsDTO;
import com.marcela.bts_songs_predictor.dto.SongResponseDTO;
import com.marcela.bts_songs_predictor.service.SongService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class SongController {

  private final SongService songService;

  public SongController(SongService songService) {
    this.songService = songService;
  }

  @GetMapping("/songs")
  public List<SongResponseDTO> getAllSongs() {
    return songService.getAllSongs();
  }

  @GetMapping("/songs/grouped-by-album")
  public List<AlbumWithSongsDTO> getSongsGroupedByAlbum() {
    return songService.getSongsGroupedByAlbum();
  }
}