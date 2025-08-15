import { useAppSelector } from '@/app/hooks';
import { selectTrackById } from '@/features/trackList/trackListSelectors';
import type { TrackIdT } from '@/features/trackList/schema';
import Genre from './Genre';
import styles from './Trackgenres.module.scss';

type TrackGenresProps = {
   id: TrackIdT;
};

export default function TrackGenres({ id }: TrackGenresProps) {
   const track = useAppSelector((state) => selectTrackById(state, id));
   return (
      <div className={styles.genres}>
         {track.genres.map((genre) => (
            <Genre key={genre} genre={genre} />
         ))}
      </div>
   );
}
