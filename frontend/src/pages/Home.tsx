import { useEffect, useState } from "react";

import AlbumSection from "../components/AlbumSection";
import Layout from "../components/Layout";
import { getSongsGroupedByAlbum } from "../api/songService";
import type { AlbumWithSongs } from "../types/song";

import styles from "./Home.module.css";

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
        setError(
          error instanceof Error ? error.message : "Erro ao carregar músicas.",
        );
      } finally {
        setIsLoading(false);
      }
    }

    loadSongs();
  }, []);

  return (
    <Layout>
      <main className={styles.page}>
        <section className={styles.board}>
          <h1 className={styles.title}>BTS Surprise Songs</h1>

          {isLoading && <p className={styles.status}>Carregando músicas...</p>}

          {error && <p className={styles.error}>{error}</p>}

          {!isLoading && !error && (
            <div className={styles.grid}>
              {albums.map((album) => (
                <AlbumSection
                  key={album.id}
                  album={album}
                  showCheckbox={false}
                />
              ))}
            </div>
          )}
        </section>
      </main>
    </Layout>
  );
}
