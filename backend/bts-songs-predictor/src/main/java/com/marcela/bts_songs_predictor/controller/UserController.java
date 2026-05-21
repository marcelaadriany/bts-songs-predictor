package com.marcela.bts_songs_predictor.controller;

import com.marcela.bts_songs_predictor.dto.UserRequestDTO;
import com.marcela.bts_songs_predictor.dto.UserResponseDTO;
import com.marcela.bts_songs_predictor.service.UserService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/users")
public class UserController {

  private final UserService userService;

  public UserController(UserService userService) {
    this.userService = userService;
  }

  @PostMapping
  public UserResponseDTO createUser(@RequestBody UserRequestDTO dto) {
    return userService.createUser(dto);
  }

  @GetMapping
  public List<UserResponseDTO> getAllUsers() {
    return userService.getAllUsers();
  }
}