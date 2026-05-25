package com.marcela.bts_songs_predictor.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "songs")
@Getter
@Setter
@NoArgsConstructor
public class Song {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  private String title;

  private Boolean alreadyPlayed;

  @ManyToOne
  @JoinColumn(name = "album_id")
  private Album album;
}