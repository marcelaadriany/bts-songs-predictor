package com.marcela.bts_songs_predictor.controller;

import com.marcela.bts_songs_predictor.dto.AuthResponseDTO;
import com.marcela.bts_songs_predictor.dto.LoginRequestDTO;
import com.marcela.bts_songs_predictor.dto.RegisterRequestDTO;
import com.marcela.bts_songs_predictor.dto.UserResponseDTO;
import com.marcela.bts_songs_predictor.service.AuthService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
public class AuthController {

  private final AuthService authService;

  public AuthController(AuthService authService) {
    this.authService = authService;
  }

  @PostMapping("/register")
  public UserResponseDTO register(@RequestBody RegisterRequestDTO dto) {
    return authService.register(dto);
  }

  @PostMapping("/login")
  public AuthResponseDTO login(@RequestBody LoginRequestDTO dto) {
    return authService.login(dto);
  }

  @GetMapping("/me")
  public UserResponseDTO getAuthenticatedUser() {
    return authService.getAuthenticatedUser();
  }
}