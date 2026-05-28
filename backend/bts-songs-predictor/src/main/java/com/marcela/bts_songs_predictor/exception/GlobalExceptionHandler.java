package com.marcela.bts_songs_predictor.exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.time.LocalDateTime;

@RestControllerAdvice
public class GlobalExceptionHandler {

  @ExceptionHandler(BadRequestException.class)
  public ResponseEntity<ErrorResponseDTO> handleBadRequest(
      BadRequestException exception
  ) {

    ErrorResponseDTO error = new ErrorResponseDTO(
        exception.getMessage(),
        HttpStatus.BAD_REQUEST.value(),
        LocalDateTime.now()
    );

    return ResponseEntity
        .status(HttpStatus.BAD_REQUEST)
        .body(error);
  }

  @ExceptionHandler(ResourceNotFoundException.class)
  public ResponseEntity<ErrorResponseDTO> handleNotFound(
      ResourceNotFoundException exception
  ) {

    ErrorResponseDTO error = new ErrorResponseDTO(
        exception.getMessage(),
        HttpStatus.NOT_FOUND.value(),
        LocalDateTime.now()
    );

    return ResponseEntity
        .status(HttpStatus.NOT_FOUND)
        .body(error);
  }

  @ExceptionHandler(UnauthorizedException.class)
  public ResponseEntity<ErrorResponseDTO> handleUnauthorized(
      UnauthorizedException exception
  ) {

    ErrorResponseDTO error = new ErrorResponseDTO(
        exception.getMessage(),
        HttpStatus.UNAUTHORIZED.value(),
        LocalDateTime.now()
    );

    return ResponseEntity
        .status(HttpStatus.UNAUTHORIZED)
        .body(error);
  }

  @ExceptionHandler(AccessDeniedException.class)
  public ResponseEntity<ErrorResponseDTO> handleForbidden(
      AccessDeniedException exception
  ) {

    ErrorResponseDTO error = new ErrorResponseDTO(
        "Acesso negado.",
        HttpStatus.FORBIDDEN.value(),
        LocalDateTime.now()
    );

    return ResponseEntity
        .status(HttpStatus.FORBIDDEN)
        .body(error);
  }

  @ExceptionHandler(Exception.class)
  public ResponseEntity<ErrorResponseDTO> handleGenericException(
      Exception exception
  ) {

    ErrorResponseDTO error = new ErrorResponseDTO(
        "Erro interno no servidor.",
        HttpStatus.INTERNAL_SERVER_ERROR.value(),
        LocalDateTime.now()
    );

    return ResponseEntity
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .body(error);
  }
}