import AddTrackBtn from "./AddTrackBtn/AddTrackBtn"
import styles from "./Header.module.scss"
import logo from "../../assets/logo_tunee.svg"

export default function Header() {
  return (
    <header className={styles.header}>
      <a href="/">
        <img src={logo} alt="logo" />
      </a>
      <AddTrackBtn />
    </header>
  )
}
