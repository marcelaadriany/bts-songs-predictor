package com.marcela.bts_songs_predictor.service;

import com.marcela.bts_songs_predictor.dto.AuthResponseDTO;
import com.marcela.bts_songs_predictor.dto.LoginRequestDTO;
import com.marcela.bts_songs_predictor.dto.RegisterRequestDTO;
import com.marcela.bts_songs_predictor.dto.UserResponseDTO;
import com.marcela.bts_songs_predictor.entity.User;
import com.marcela.bts_songs_predictor.repository.UserRepository;
import com.marcela.bts_songs_predictor.security.TokenService;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

  private final UserRepository userRepository;
  private final PasswordEncoder passwordEncoder;
  private final AuthenticationManager authenticationManager;
  private final TokenService tokenService;

  public AuthService(
      UserRepository userRepository,
      PasswordEncoder passwordEncoder,
      AuthenticationManager authenticationManager,
      TokenService tokenService
  ) {
    this.userRepository = userRepository;
    this.passwordEncoder = passwordEncoder;
    this.authenticationManager = authenticationManager;
    this.tokenService = tokenService;
  }

  public UserResponseDTO register(RegisterRequestDTO dto) {
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
    var authenticationToken = new UsernamePasswordAuthenticationToken(
        dto.email(),
        dto.password()
    );

    var authentication = authenticationManager.authenticate(authenticationToken);

    var user = (User) authentication.getPrincipal();

    String token = tokenService.generateToken(user);

    return new AuthResponseDTO(token);
  }
}