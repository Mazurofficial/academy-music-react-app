import { useAppSelector } from "../../../../app/hooks"
import { selectTrackById } from "../../../../features/trackList/trackListSelectors"
import type { Track } from "../../../../types/track"
import styles from "./Track.module.scss"
import CoverImage from "./CoverImage/CoverImage"
import TrackInfo from "./TrackInfo/TrackInfo"
import Audio from "../../../ui/Audio/Audio"
import TrackBtns from "./TrackBtns/TrackBtns"

type TrackProps = {
  id: Track["id"]
}

export default function Track({ id }: TrackProps) {
  const track = useAppSelector(state => selectTrackById(state, id))

  return (
    <>
      {track && (
        <li className={styles.track} id={id} data-testid={`track-item-${id}`}>
          <CoverImage id={id} />
          <TrackInfo id={id} />
          <Audio id={id} />
          <TrackBtns id={id} />
        </li>
      )}
    </>
  )
}
