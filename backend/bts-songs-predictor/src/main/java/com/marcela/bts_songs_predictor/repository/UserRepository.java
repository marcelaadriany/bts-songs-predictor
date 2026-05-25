package com.marcela.bts_songs_predictor.repository;

import com.marcela.bts_songs_predictor.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Long> {
}