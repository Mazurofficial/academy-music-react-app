import { useAppSelector } from "../../../app/hooks"
import {
  selectAllTrackList,
  selectTrackListStatus,
} from "../../../features/trackList/trackListSelectors"
import styles from "./List.module.scss"
import Track from "./Track/Track"
import { useTrackList } from "../../../features/trackList/useTrackList"

export default function List() {
  const list = useAppSelector(selectAllTrackList)
  const loadingStatus = useAppSelector(selectTrackListStatus)
  useTrackList()

  if (loadingStatus === "loading") {
    return <h2 data-testid="loading-tracks">Loading...</h2>
  }

  return (
    <ul className={styles.list}>
      {list.map(track => (
        <Track id={track.id} key={track.id} />
      ))}
    </ul>
  )
}
