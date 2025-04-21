import AddTrackForm from "../AddTrackForm/AddTrackForm"
import AddTrackBtn from "./AddTrackBtn/AddTrackBtn"
import styles from "./Header.module.scss"

export default function Header() {
  return (
    <header className={styles.header}>
      <AddTrackBtn />
      <AddTrackForm />
    </header>
  )
}
