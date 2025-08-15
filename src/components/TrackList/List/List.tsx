import { useAppSelector } from '@/app/hooks';
import { selectAllTrackList } from '@/features/trackList/trackListSelectors';
import styles from './List.module.scss';
import Track from './Track/Track';

export default function List() {
   const trackListIds = useAppSelector(selectAllTrackList).ids;
   if (trackListIds.length > 0)
      return (
         <ul data-testid="track-list" className={styles.list}>
            {trackListIds.map((trackId) => (
               <Track id={trackId} key={trackId} />
            ))}
         </ul>
      );
   return <h2>Sorry! There are no such tracks</h2>;
}
