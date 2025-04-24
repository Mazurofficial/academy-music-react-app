import { useAppSelector } from "../../../../../app/hooks"
import { selectTrackById } from "../../../../../features/trackList/trackListSelectors"
import type { Track } from "../../../../../types/track"
import Genre from "./Genre"
import styles from "./Trackgenres.module.scss"

type TrackGenresProps = {
  id: Track["id"]
}

export default function TrackGenres({ id }: TrackGenresProps) {
  const track = useAppSelector(state => selectTrackById(state, id))
  return (
    <div className={styles.genres}>
      {track?.genres.map((genre, i) => <Genre key={i} genre={genre} />)}
    </div>
  )
}
