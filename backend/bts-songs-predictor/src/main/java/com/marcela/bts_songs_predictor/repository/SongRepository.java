package com.marcela.bts_songs_predictor.repository;

import com.marcela.bts_songs_predictor.entity.Song;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface SongRepository extends JpaRepository<Song, Long> {

  List<Song> findAllByOrderByAlbumDisplayOrderAscTitleAsc();

  List<Song> findByAlbumIdOrderByTitleAsc(Long albumId);
}