package com.marcela.bts_songs_predictor.service;

import com.marcela.bts_songs_predictor.dto.AlbumWithSongsDTO;
import com.marcela.bts_songs_predictor.dto.SongResponseDTO;
import com.marcela.bts_songs_predictor.entity.Album;
import com.marcela.bts_songs_predictor.entity.Song;
import com.marcela.bts_songs_predictor.repository.AlbumRepository;
import com.marcela.bts_songs_predictor.repository.SongRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SongService {

  private final SongRepository songRepository;
  private final AlbumRepository albumRepository;

  public SongService(SongRepository songRepository, AlbumRepository albumRepository) {
    this.songRepository = songRepository;
    this.albumRepository = albumRepository;
  }

  public List<SongResponseDTO> getAllSongs() {
    return songRepository.findAllByOrderByAlbumDisplayOrderAscTitleAsc()
        .stream()
        .map(this::toSongResponseDTO)
        .toList();
  }

  public List<AlbumWithSongsDTO> getSongsGroupedByAlbum() {
    return albumRepository.findAllByOrderByDisplayOrderAsc()
        .stream()
        .map(album -> new AlbumWithSongsDTO(
            album.getId(),
            album.getName(),
            album.getDisplayOrder(),
            getSongsByAlbum(album)
        ))
        .toList();
  }

  private List<SongResponseDTO> getSongsByAlbum(Album album) {
    return songRepository.findByAlbumIdOrderByTitleAsc(album.getId())
        .stream()
        .map(this::toSongResponseDTO)
        .toList();
  }

  private SongResponseDTO toSongResponseDTO(Song song) {
    return new SongResponseDTO(
        song.getId(),
        song.getTitle(),
        song.getAlreadyPlayed()
    );
  }
}