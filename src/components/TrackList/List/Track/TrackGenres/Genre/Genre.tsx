import styles from "./Genre.module.scss"

type GenreProps = {
  genre: string
}

export default function Genre({ genre }: GenreProps) {
  return <p className={styles.genre}>{genre}</p>
}
