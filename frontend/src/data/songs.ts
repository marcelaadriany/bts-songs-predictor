import type { Album } from "../types/Album";

export const albums: Album[] = [
  {
    id: 1,
    name: "HYYH PT.1",
    songs: [
      {
        id: 101,
        name: "I NEED U",
        played: true,
      },
      {
        id: 102,
        name: "DOPE",
        played: true,
      },
      {
        id: 103,
        name: "Moving On",
        played: false,
      },
    ],
  },

  {
    id: 2,
    name: "WINGS",
    songs: [
      {
        id: 201,
        name: "Blood Sweat & Tears",
        played: false,
      },
      {
        id: 202,
        name: "2! 3!",
        played: false,
      },
      {
        id: 203,
        name: "Wings",
        played: true,
      },
    ],
  },

  {
    id: 3,
    name: "LOVE YOURSELF: HER",
    songs: [
      {
        id: 301,
        name: "DNA",
        played: true,
      },
      {
        id: 302,
        name: "Pied Piper",
        played: true,
      },
      {
        id: 303,
        name: "Sea",
        played: false,
      },
    ],
  },
];