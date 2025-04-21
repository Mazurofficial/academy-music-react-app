import Header from "../../components/Header/Header"
import TrackList from "../../components/TrackList/TrackList"
import styles from "./TracksPage.module.scss"

export default function TracksPage() {
  return (
    <div className={styles.tracksPage}>
      <Header />
      <TrackList />
    </div>
  )
}
