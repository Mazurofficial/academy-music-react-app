import Pagination from "../Pagination/Pagination"
import List from "./List/List"
import TrackControls from "./TrackControls/TrackControls"
import styles from "./TrackList.module.scss"

export default function TrackList() {
  return (
    <div className={styles.trackList}>
      <TrackControls />
      <List />
      <Pagination />
    </div>
  )
}
