import { useAppSelector } from "../../../app/hooks"
import {
  selectAllTrackList,
  selectTrackListStatus,
} from "../../../features/trackList/trackListSelectors"
import styles from "./List.module.scss"
import Track from "./Track/Track"
import { useTrackList } from "../../../features/trackList/useTrackList"
import Preloader from "../../ui/Preloader/Preloader"

export default function List() {
  const list = useAppSelector(selectAllTrackList)
  const loadingStatus = useAppSelector(selectTrackListStatus)
  useTrackList()

  if (loadingStatus === "loading") {
    return <Preloader />
  }

  return (
    <ul className={styles.list}>
      {list.map(track => (
        <Track id={track.id} key={track.id} />
      ))}
    </ul>
  )
}
