import { useState } from "react"
import styles from "./GenreSelect.module.scss"
import GenreTag from "./GenreTag/GenreTag"

type GenreSelectProps = {
  availableGenres: string[]
  selectedGenres: string[]
  onChange: (genres: string[]) => void
}

const MAX_GENRES = 3 // Maximum amount of genres on one track

export default function GenreSelect({
  availableGenres,
  selectedGenres,
  onChange,
}: GenreSelectProps) {
  const [isOpen, setIsOpen] = useState(false)

  // Add genre to array with track genres
  const addGenre = (genre: string) => {
    if (!selectedGenres.includes(genre)) {
      onChange([...selectedGenres, genre])
    }
    setIsOpen(false)
  }

  // Remove genre from array with track genres
  const removeGenre = (genre: string) => {
    onChange(selectedGenres.filter(g => g !== genre))
  }

  return (
    <div className={styles.genreSelect}>
      <p className={styles.title}>Select genres (max: {MAX_GENRES})</p>
      <div className={styles.tags} data-testid="genre-selector">
        {selectedGenres.map(genre => (
          <GenreTag
            key={genre}
            label={genre}
            onRemove={() => {
              removeGenre(genre)
            }}
          />
        ))}
        {selectedGenres.length < MAX_GENRES && (
          <button
            type="button"
            onClick={() => {
              setIsOpen(!isOpen)
            }}
            className={styles.addButton}
          >
            <i className="fa fa-plus" aria-hidden="true"></i>
          </button>
        )}
      </div>

      {isOpen && (
        <div className={styles.dropdown}>
          {availableGenres
            .filter(genre => !selectedGenres.includes(genre))
            .map(genre => (
              <p
                key={genre}
                onClick={() => {
                  addGenre(genre)
                }}
                className={styles.option}
              >
                {genre}
              </p>
            ))}
        </div>
      )}
    </div>
  )
}
