import { useAppSelector } from "../../../../../app/hooks"
import { selectTrackById } from "../../../../../features/trackList/trackListSelectors"
import type { Track } from "../../../../../types/track"
import styles from "./CoverImage.module.scss"
import fallbackImage from "../../../../../assets/fallbak.svg"

type CoverImageProps = {
  id: Track["id"]
}

export default function CoverImage({ id }: CoverImageProps) {
  const track = useAppSelector(state => selectTrackById(state, id))
  const imageUrl = track?.coverImage
  // eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing
  return <img className={styles.cover} src={imageUrl || fallbackImage} />
}
