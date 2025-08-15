import styles from './Track.module.scss';
import CoverImage from './CoverImage/CoverImage';
import TrackInfo from './TrackInfo/TrackInfo';
import TrackBtns from './TrackBtns/TrackBtns';
import type { TrackIdT } from '@/features/trackList/schema';
import Audio from '@/components/ui/Audio/Audio';

type TrackProps = {
   id: TrackIdT;
};

export default function Track({ id }: TrackProps) {
   return (
      <li className={styles.track} id={id} data-testid={`track-item-${id}`}>
         <CoverImage id={id} />
         <TrackInfo id={id} />
         <Audio id={id} />
         <TrackBtns id={id} />
      </li>
   );
}
