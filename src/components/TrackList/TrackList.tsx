import List from "./List/List"
import styles from "./TrackList.module.scss"

export default function TrackList() {
  return (
    <div className={styles.trackList}>
      <List />
    </div>
  )
}
