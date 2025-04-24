import { useAppSelector } from "../../../../../app/hooks"
import { selectTrackById } from "../../../../../features/trackList/trackListSelectors"
import type { Track } from "../../../../../types/track"
import TrackGenres from "../TrackGenres/TrackGenres"
import styles from "./TrackInfo.module.scss"

type TrackInfoProps = {
  id: Track["id"]
}

export default function TrackInfo({ id }: TrackInfoProps) {
  const track = useAppSelector(state => selectTrackById(state, id))
  return (
    <div className={styles.trackInfo}>
      <h4 className={styles.trackTitle} data-testid={`track-item-${id}-title`}>
        {track?.title}
        {track?.album && (
          <span className={styles.trackAlbum}>({track.album})</span>
        )}
      </h4>
      <h5
        className={styles.trackArtist}
        data-testid={`track-item-${id}-artist`}
      >
        {track?.artist}
      </h5>
      <TrackGenres id={id} />
    </div>
  )
}
