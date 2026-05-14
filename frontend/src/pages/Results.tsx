import Layout from "../components/Layout";

const playedSongs = ["Spring Day", "Sea"];

const winners = ["armygirl7", "kimtae95"];

export default function Results() {
  return (
    <Layout>
      <h1>🎉 Results</h1>

      <section style={styles.section}>
        <h2>Played Songs</h2>

        <ul>
          {playedSongs.map((song) => (
            <li key={song}>{song}</li>
          ))}
        </ul>
      </section>

      <section style={styles.section}>
        <h2>Winners</h2>

        <ul>
          {winners.map((winner) => (
            <li key={winner}>{winner}</li>
          ))}
        </ul>
      </section>
    </Layout>
  );
}

const styles = {
  section: {
    marginBottom: "32px",
  },
};
