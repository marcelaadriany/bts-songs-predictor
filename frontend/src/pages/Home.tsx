import { useEffect, useState } from "react";

import AlbumSection from "../components/AlbumSection";
import Layout from "../components/Layout";
import { getSongsGroupedByAlbum } from "../api/songService";
import type { AlbumWithSongs } from "../types/song";

export default function Home() {
  const [albums, setAlbums] = useState<AlbumWithSongs[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadSongs() {
      try {
        const data = await getSongsGroupedByAlbum();
        setAlbums(data);
      } catch (error) {
        if (error instanceof Error) {
          setError(error.message);
        } else {
          setError("Erro ao carregar músicas.");
        }
      } finally {
        setIsLoading(false);
      }
    }

    loadSongs();
  }, []);

  return (
    <Layout>
      <div style={styles.container}>
        <h1 style={styles.title}>BTS Surprise Songs</h1>

        {isLoading && <p>Carregando músicas...</p>}

        {error && <p style={styles.error}>{error}</p>}

        {!isLoading && !error && (
          <div style={styles.grid}>
            {albums.map((album) => (
              <AlbumSection key={album.id} album={album} showCheckbox={false} />
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
}

const styles = {
  container: {
    padding: "20px",
    fontFamily: "Arial",
  },

  title: {
    textAlign: "center" as const,
    marginBottom: "40px",
  },

  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
    gap: "24px",
  },

  error: {
    color: "red",
    textAlign: "center" as const,
  },
};
