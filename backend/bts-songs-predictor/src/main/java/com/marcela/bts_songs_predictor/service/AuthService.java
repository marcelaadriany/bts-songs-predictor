package com.marcela.bts_songs_predictor.service;

import com.marcela.bts_songs_predictor.dto.AuthResponseDTO;
import com.marcela.bts_songs_predictor.dto.LoginRequestDTO;
import com.marcela.bts_songs_predictor.dto.RegisterRequestDTO;
import com.marcela.bts_songs_predictor.dto.UserResponseDTO;
import com.marcela.bts_songs_predictor.entity.User;
import com.marcela.bts_songs_predictor.exception.UnauthorizedException;
import com.marcela.bts_songs_predictor.repository.UserRepository;
import com.marcela.bts_songs_predictor.security.TokenService;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import com.marcela.bts_songs_predictor.exception.BadRequestException;

@Service
public class AuthService {

  private final UserRepository userRepository;
  private final PasswordEncoder passwordEncoder;
  private final TokenService tokenService;

  public AuthService(
      UserRepository userRepository,
      PasswordEncoder passwordEncoder,
      TokenService tokenService
  ) {
    this.userRepository = userRepository;
    this.passwordEncoder = passwordEncoder;
    this.tokenService = tokenService;
  }

  public UserResponseDTO register(RegisterRequestDTO dto) {

    if (userRepository.existsByEmail(dto.email())) {
      throw new BadRequestException("Email já cadastrado.");
    }

    if (userRepository.existsByUsername(dto.username())) {
      throw new BadRequestException("Username já cadastrado.");
    }

    User user = new User();

    user.setUsername(dto.username());
    user.setEmail(dto.email());
    user.setPassword(passwordEncoder.encode(dto.password()));

    User savedUser = userRepository.save(user);

    return new UserResponseDTO(
        savedUser.getId(),
        savedUser.getDisplayUsername(),
        savedUser.getEmail(),
        savedUser.getScore()
    );
  }

  public AuthResponseDTO login(LoginRequestDTO dto) {
    User user = userRepository.findByEmail(dto.email())
        .orElseThrow(() -> new UnauthorizedException("Email ou senha inválidos."));

    boolean passwordMatches = passwordEncoder.matches(
        dto.password(),
        user.getPassword()
    );

    if (!passwordMatches) {
      throw new UnauthorizedException("Email ou senha inválidos.");
    }

    String token = tokenService.generateToken(user);

    return new AuthResponseDTO(token);
  }

  public UserResponseDTO getAuthenticatedUser() {
    User user = (User) SecurityContextHolder
        .getContext()
        .getAuthentication()
        .getPrincipal();

    return new UserResponseDTO(
        user.getId(),
        user.getDisplayUsername(),
        user.getEmail(),
        user.getScore()
    );
  }
}