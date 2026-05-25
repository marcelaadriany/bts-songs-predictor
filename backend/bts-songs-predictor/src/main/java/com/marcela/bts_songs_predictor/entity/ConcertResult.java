package com.marcela.bts_songs_predictor.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "concert_results")
@Getter
@Setter
@NoArgsConstructor
public class ConcertResult {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @ManyToOne
  @JoinColumn(name = "concert_id")
  private Concert concert;

  @ManyToOne
  @JoinColumn(name = "song_id")
  private Song song;
}