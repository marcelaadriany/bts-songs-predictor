package com.marcela.bts_songs_predictor.entity;

import jakarta.persistence.*;
import java.time.LocalDate;
import java.time.LocalTime;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "concerts")
@Getter
@Setter
@NoArgsConstructor
public class Concert {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;
  private String name;
  private LocalDate concertDate;
  private LocalTime concertTime;
  private String timezone;

  @Column(nullable = false)
  private Boolean resultReleased = false;
}