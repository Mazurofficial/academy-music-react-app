import { useState } from "react"
import styles from "./GenreSelect.module.scss"
import GenreTag from "./GenreTag/GenreTag"

type GenreSelectProps = {
  availableGenres: string[]
  selectedGenres: string[]
  onChange: (genres: string[]) => void
}

export default function GenreSelect({
  availableGenres,
  selectedGenres,
  onChange,
}: GenreSelectProps) {
  const [isOpen, setIsOpen] = useState(false)

  const addGenre = (genre: string) => {
    if (!selectedGenres.includes(genre)) {
      onChange([...selectedGenres, genre])
    }
    setIsOpen(false)
  }

  const removeGenre = (genre: string) => {
    onChange(selectedGenres.filter(g => g !== genre))
  }

  return (
    <div className={styles.genreSelect}>
      <p className={styles.title}>Select genres:</p>
      <div className={styles.tags}>
        {selectedGenres.map(genre => (
          <GenreTag
            key={genre}
            label={genre}
            onRemove={() => {
              removeGenre(genre)
            }}
          />
        ))}
        <button
          type="button"
          onClick={() => {
            setIsOpen(!isOpen)
          }}
          className={styles.addButton}
        >
          <i className="fa fa-plus" aria-hidden="true"></i>
        </button>
      </div>

      {isOpen && (
        <div className={styles.dropdown}>
          {availableGenres
            .filter(genre => !selectedGenres.includes(genre))
            .map(genre => (
              <div
                key={genre}
                onClick={() => {
                  addGenre(genre)
                }}
                className={styles.option}
              >
                {genre}
              </div>
            ))}
        </div>
      )}
    </div>
  )
}
