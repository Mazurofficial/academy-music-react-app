import styles from "./Trackgenres.module.scss"

type GenreProps = {
  genre: string
}

export default function Genre({ genre }: GenreProps) {
  return <p className={styles.genre}>{genre}</p>
}
