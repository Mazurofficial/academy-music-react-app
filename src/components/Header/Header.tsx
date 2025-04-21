import AddTrackBtn from "./AddTrackBtn/AddTrackBtn"
import styles from "./Header.module.scss"

export default function Header() {
  return (
    <header className={styles.header}>
      <AddTrackBtn />
    </header>
  )
}
