package com.marcela.bts_songs_predictor.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "bet_songs")
@Getter
@Setter
@NoArgsConstructor
public class BetSong {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @ManyToOne
  @JoinColumn(name = "bet_id")
  private Bet bet;

  @ManyToOne
  @JoinColumn(name = "song_id")
  private Song song;
}