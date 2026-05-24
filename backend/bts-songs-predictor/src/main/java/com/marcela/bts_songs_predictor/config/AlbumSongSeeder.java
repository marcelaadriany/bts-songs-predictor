package com.marcela.bts_songs_predictor.config;

import com.marcela.bts_songs_predictor.entity.Album;
import com.marcela.bts_songs_predictor.entity.Song;
import com.marcela.bts_songs_predictor.repository.AlbumRepository;
import com.marcela.bts_songs_predictor.repository.SongRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.core.annotation.Order;
import org.springframework.stereotype.Component;

@Component
@Order(1)
public class AlbumSongSeeder implements CommandLineRunner {

  private final AlbumRepository albumRepository;
  private final SongRepository songRepository;

  public AlbumSongSeeder(AlbumRepository albumRepository, SongRepository songRepository) {
    this.albumRepository = albumRepository;
    this.songRepository = songRepository;
  }

  @Override
  public void run(String... args) {
    if (albumRepository.count() > 0) {
      return;
    }

    seedAlbumsAndSongs();
  }

  private void seedAlbumsAndSongs() {
    Album album1 = createAlbum("2 COOL 4 SKOOL", 1);
    addSong(album1, "WE ARE BULLETPROOF PT. 2");
    addSong(album1, "NO MORE DREAM");
    addSong(album1, "LIKE");
    addSong(album1, "PATH");

    Album album2 = createAlbum("O!RUL8, 2?", 2);
    addSong(album2, "N.O");
    addSong(album2, "WE ON");
    addSong(album2, "IF I RUDE THE WORLD");
    addSong(album2, "COFFEE");
    addSong(album2, "ATTACK ON BANGTAN");
    addSong(album2, "PALDOGANGSAN");

    Album album3 = createAlbum("SKOOL LUV AFFAIR", 3);
    addSong(album3, "BOY IN LUV");
    addSong(album3, "WHERE YOU FROM");
    addSong(album3, "JUST ONE DAY");
    addSong(album3, "TOMORROW");
    addSong(album3, "SPINE BREAKER");
    addSong(album3, "JUMP");
    addSong(album3, "LOVE IS NOT OVER");
    addSong(album3, "MISS RIGHT");

    Album album4 = createAlbum("DARK & WILD", 4);
    addSong(album4, "DANGER");
    addSong(album4, "WAR OF HORMONE");
    addSong(album4, "HIP HOP PHILE");
    addSong(album4, "LET ME KNOW");
    addSong(album4, "RAIN");
    addSong(album4, "COULD YOUR TURN OFF YOUR PHONE");
    addSong(album4, "EMBARRASSED");
    addSong(album4, "24/7 = HEAVEN");
    addSong(album4, "LOOK HERE");
    addSong(album4, "2ND GRADE");

    Album album5 = createAlbum("WAKE UP", 5);
    addSong(album5, "THE STARTS");
    addSong(album5, "LIKE PT. 2");
    addSong(album5, "WAKE UP");

    Album album6 = createAlbum("HYYH PT.1", 6);
    addSong(album6, "I NEED U");
    addSong(album6, "HOLD ME TIGHT");
    addSong(album6, "DOPE");
    addSong(album6, "BOYZ WITH FUN");
    addSong(album6, "CONVERSE HIGH");
    addSong(album6, "MOVING ON");

    Album album7 = createAlbum("HYYH PT.2", 7);
    addSong(album7, "RUN");
    addSong(album7, "BUTTERFLY");
    addSong(album7, "WHALIEN 52");
    addSong(album7, "MA CITY");
    addSong(album7, "SILVER SPOON (BAEPSAE)");
    addSong(album7, "AUTUMN LEAVES");

    Album album8 = createAlbum("HYYH: YOUNG FOREVER", 8);
    addSong(album8, "SAVE ME");
    addSong(album8, "YOUNG FOREVER");
    addSong(album8, "HOUSE OF CARDS");

    Album album9 = createAlbum("YOUTH", 9);
    addSong(album9, "GOOD DAY");
    addSong(album9, "WISHING ON A START");
    addSong(album9, "FOR YOU");

    Album album10 = createAlbum("WINGS", 10);
    addSong(album10, "BLOOD SWEAT & TEARS");
    addSong(album10, "AM I WRONG");
    addSong(album10, "21ST CENTURY GIRL");
    addSong(album10, "2!3!");
    addSong(album10, "WINGS");
    addSong(album10, "LOST");

    Album album11 = createAlbum("YOU NEVER WALK ALONE", 11);
    addSong(album11, "SPRING DAY");
    addSong(album11, "YOU NEVER WALK ALONE");

    Album album12 = createAlbum("LOVE YOURSELF: HER", 12);
    addSong(album12, "DNA");
    addSong(album12, "BEST OF ME");
    addSong(album12, "PIED PIPER");
    addSong(album12, "GO GO");
    addSong(album12, "SEA");

    Album album13 = createAlbum("FACE YOURSELF", 13);
    addSong(album13, "DON'T LEAVE ME");
    addSong(album13, "CRYSTAL SNOW");
    addSong(album13, "LET GO");

    Album album14 = createAlbum("LOVE YOURSELF: TEAR", 14);
    addSong(album14, "134340");
    addSong(album14, "PARADISE");
    addSong(album14, "LOVE MAZE");
    addSong(album14, "MAGIC SHOP");
    addSong(album14, "THE TRUTH UNTOLD");
    addSong(album14, "AIRPLANE PT. 2");
    addSong(album14, "ANPANMAN");
    addSong(album14, "SO WHAT");

    Album album15 = createAlbum("LOVE YOURSELF: ANSWER", 15);
    addSong(album15, "I'M FINE");
    addSong(album15, "ANSWER: LOVE MYSELF");
    addSong(album15, "DIMPLE");

    Album album16 = createAlbum("MAP OF THE SOUL: PERSONA", 16);
    addSong(album16, "BOY WITH LUV");
    addSong(album16, "MIKROKOSMOS");
    addSong(album16, "MAKE IT RIGHT");
    addSong(album16, "HOME");
    addSong(album16, "DIONYSUS");

    Album album17 = createAlbum("MAP OF THE SOUL: 7", 17);
    addSong(album17, "BLACK SWAN");
    addSong(album17, "LOUDER THAN BOMBS");
    addSong(album17, "ON");
    addSong(album17, "WE ARE BULLETPROOF: THE ETERNAL");

    Album album18 = createAlbum("MAP OF THE SOUL: THE JOURNEY", 18);
    addSong(album18, "STAY GOLD");
    addSong(album18, "LIGHTS");
    addSong(album18, "YOUR EYES TELL");

    Album album19 = createAlbum("BE", 19);
    addSong(album19, "LIFE GOES ON");
    addSong(album19, "BLUE & GREY");
    addSong(album19, "TELEPATHY");
    addSong(album19, "DIS-EASE");

    Album album20 = createAlbum("PROOF", 20);
    addSong(album20, "BORN SINGER");
    addSong(album20, "YET TO COME");
    addSong(album20, "FOR YOUTH");

    Album album21 = createAlbum("ARIRANG", 21);
    addSong(album21, "ONE MORE NIGHT");
    addSong(album21, "NO.29");

    Album album22 = createAlbum("SINGLE", 22);
    addSong(album22, "COME BACK HOME");
    addSong(album22, "HEARTBEAT");
    addSong(album22, "FILM OUT");
    addSong(album22, "PERMISSION TO DANCE");
    addSong(album22, "MY UNIVERSE");
    addSong(album22, "THE PLANET");
    addSong(album22, "TAKE TWO");
  }

  private Album createAlbum(String name, int displayOrder) {
    Album album = new Album();
    album.setName(name);
    album.setDisplayOrder(displayOrder);
    return albumRepository.save(album);
  }

  private void addSong(Album album, String title) {
    Song song = new Song();
    song.setTitle(title);
    song.setAlreadyPlayed(false);
    song.setAlbum(album);
    songRepository.save(song);
  }
}