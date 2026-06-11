import { useState } from "react";

import AlbumSection from "./AlbumSection";

import type { AlbumWithSongs } from "../types/song";

import styles from "./BetForm.module.css";

type Props = {
  albums: AlbumWithSongs[];
  initialSelectedSongs?: number[];
  submitLabel?: string;
  isSubmitting?: boolean;
  onSubmit: (songIds: number[]) => Promise<void>;
};

export default function BetForm({
  albums,
  initialSelectedSongs = [],
  submitLabel = "Salvar aposta",
  isSubmitting = false,
  onSubmit,
}: Props) {
  const [selectedSongs, setSelectedSongs] =
    useState<number[]>(initialSelectedSongs);

  function handleSelect(songId: number) {
    const alreadySelected = selectedSongs.includes(songId);

    if (alreadySelected) {
      setSelectedSongs(selectedSongs.filter((id) => id !== songId));
      return;
    }

    if (selectedSongs.length >= 6) {
      return;
    }

    setSelectedSongs([...selectedSongs, songId]);
  }

  async function handleSubmit() {
    await onSubmit(selectedSongs);
  }

  return (
    <section className={styles.form}>
      {/* <div className={styles.selectedBox}>
        <h3>
          Músicas selecionadas <span>({selectedSongs.length}/6)</span>
        </h3>

        <div className={styles.selectedSlots}>
          {Array.from({ length: 6 }).map((_, index) => (
            <div key={index} className={styles.slot}>
              {selectedSongs[index] ? "✓" : "+"}
            </div>
          ))}
        </div>
      </div> */}

      <div className={styles.albumGrid}>
        {albums.map((album) => (
          <AlbumSection
            key={album.id}
            album={album}
            clickable
            selectedSongs={selectedSongs}
            onSelect={handleSelect}
            showCheckbox
          />
        ))}
      </div>

      <div className={styles.footer}>
        <button
          className={styles.submitButton}
          type="button"
          disabled={isSubmitting}
          onClick={handleSubmit}
        >
          {isSubmitting
            ? "Enviando..."
            : `${submitLabel} (${selectedSongs.length}/6)`}
        </button>
      </div>
    </section>
  );
}
