import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { toggleTrack } from '@/features/trackList/trackListSlice';
import {
   selectBulkDeleteMode,
   selectSelectedTrackIds,
} from '@/features/trackList/trackListSelectors';
import type { TrackIdT } from '@/features/trackList/schema';
import Checkbox from '@/components/ui/Checkbox/Checkbox';
import DeleteTrackBtn from './DeleteTrackBtn';
import EditTrackBtn from './EditTrackBtn';
import styles from './TrackBtns.module.scss';
import UploadAudioFileBtn from './UploadAudioFileBtn';

type TrackBtnsProps = {
   id: TrackIdT;
};

export default function TrackBtns({ id }: TrackBtnsProps) {
   const dispatch = useAppDispatch();
   const bulkDeleteMode = useAppSelector(selectBulkDeleteMode);
   const selectedTrackIds = useAppSelector(selectSelectedTrackIds);
   const isSelected = selectedTrackIds.includes(id);

   // Select track for deleting
   const handleSelect = () => {
      dispatch(toggleTrack(id));
   };

   return (
      <div className={styles.buttonsContainer}>
         <EditTrackBtn id={id} />
         <UploadAudioFileBtn id={id} />
         {bulkDeleteMode ? (
            <Checkbox
               checked={isSelected}
               onChange={handleSelect}
               data-testid={`track-checkbox-${id}`}
            />
         ) : (
            <DeleteTrackBtn id={id} />
         )}
      </div>
   );
}
