import { useAppSelector } from "../../../../../app/hooks"
import { selectTrackById } from "../../../../../features/trackList/trackListSelectors"
import type { Track } from "../../../../../types/track"
import styles from "./CoverImage.module.scss"

type CoverImageProps = {
  id: Track["id"]
}

export default function CoverImage({ id }: CoverImageProps) {
  const track = useAppSelector(state => selectTrackById(state, id))
  return (
    <img
      className={styles.cover}
      src={
        track?.coverImage ??
        "https://demo.tutorialzine.com/2015/03/html5-music-player/assets/img/default.png"
      }
    />
  )
}
