import { albums } from "../data/songs";

import AlbumSection from "../components/AlbumSection";
import Layout from "../components/Layout";

export default function Home() {
  return (
    <Layout>
      <div style={styles.container}>
        <h1 style={styles.title}>BTS Surprise Songs</h1>

        <div style={styles.grid}>
          {albums.map((album) => (
            <AlbumSection key={album.id} album={album} />
          ))}
        </div>
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
};
