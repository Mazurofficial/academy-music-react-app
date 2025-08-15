import { useAppSelector } from '@/app/hooks';
import { selectTrackById } from '@/features/trackList/trackListSelectors';
import type { TrackIdT } from '@/features/trackList/schema';
import TrackGenres from '../TrackGenres/TrackGenres';
import styles from './TrackInfo.module.scss';

type TrackInfoProps = {
   id: TrackIdT;
};

export default function TrackInfo({ id }: TrackInfoProps) {
   const track = useAppSelector((state) => selectTrackById(state, id));
   return (
      <div className={styles.trackInfo}>
         <span
            className={styles.trackTitle}
            data-testid={`track-item-${id}-title`}
         >
            {track.title}
         </span>
         {track.album && (
            <span className={styles.trackAlbum}>({track.album})</span>
         )}
         <span
            className={styles.trackArtist}
            data-testid={`track-item-${id}-artist`}
         >
            {track.artist}
         </span>
         <TrackGenres id={id} />
      </div>
   );
}
