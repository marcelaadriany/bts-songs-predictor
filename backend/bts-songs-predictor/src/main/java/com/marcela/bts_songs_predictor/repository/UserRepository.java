package com.marcela.bts_songs_predictor.repository;

import com.marcela.bts_songs_predictor.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.security.core.userdetails.UserDetails;

public interface UserRepository extends JpaRepository<User, Long> {

  UserDetails findByEmail(String email);
}