package com.marcela.bts_songs_predictor.repository;

import com.marcela.bts_songs_predictor.entity.Album;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface AlbumRepository extends JpaRepository<Album, Long> {

  List<Album> findAllByOrderByDisplayOrderAsc();
}