package com.marcela.bts_songs_predictor.service;

import com.marcela.bts_songs_predictor.dto.UserRequestDTO;
import com.marcela.bts_songs_predictor.dto.UserResponseDTO;
import com.marcela.bts_songs_predictor.entity.User;
import com.marcela.bts_songs_predictor.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService {

  private final UserRepository userRepository;

  public UserService(UserRepository userRepository) {
    this.userRepository = userRepository;
  }

  public UserResponseDTO createUser(UserRequestDTO dto) {

    User user = new User();

    user.setUsername(dto.username());
    user.setEmail(dto.email());
    user.setPassword(dto.password());

    User savedUser = userRepository.save(user);

    return toResponseDTO(savedUser);
  }

  public List<UserResponseDTO> getAllUsers() {
    return userRepository.findAll()
        .stream()
        .map(this::toResponseDTO)
        .toList();
  }

  private UserResponseDTO toResponseDTO(User user) {
    return new UserResponseDTO(
        user.getId(),
        user.getDisplayUsername(),
        user.getEmail(),
        user.getScore()
    );
  }
}