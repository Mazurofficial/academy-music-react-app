import styles from './TrackControls.module.scss';
import { useAppDispatch, useAppSelector } from '@/app/hooks';
import {
   clearSelectedTracks,
   deleteExTracksBulk,
   selectAllTracks,
   toggleBulkDeleteMode,
} from '@/features/trackList/trackListSlice';
import {
   selectBulkDeleteMode,
   selectSelectedTrackIds,
   selectTrackListMeta,
} from '@/features/trackList/trackListSelectors';
import Button from '@/components/ui/Button/Button';
import { useBulkDeleteTracks } from '@/apollo/mutations/bulkDeleteTracks';
import DeleteIcon from '@mui/icons-material/Delete';

export default function BulkDelete() {
   const dispatch = useAppDispatch();
   const bulkDeleteMode = useAppSelector(selectBulkDeleteMode);
   const selectedTrackIds = useAppSelector(selectSelectedTrackIds);
   const { limit } = useAppSelector(selectTrackListMeta);
   const { bulkDeleteTracks, loading } = useBulkDeleteTracks();

   const handleToggle = () => dispatch(toggleBulkDeleteMode());

   const handleBulkDelete = async () => {
      if (
         selectedTrackIds.length > 0 &&
         window.confirm('Are you sure you want to delete these tracks?')
      ) {
         const result = await bulkDeleteTracks(selectedTrackIds);
         if (result.isOk()) {
            const { success, failed } = result.value;
            dispatch(
               deleteExTracksBulk({
                  success,
                  failed,
               })
            );
         } else if (result.isErr()) {
            console.error(result.error);
         }
         if (!loading) {
            dispatch(clearSelectedTracks());
            handleToggle();
         }
      }
   };

   const handleSelectAll = () => {
      dispatch(selectAllTracks());
   };

   return (
      <div className={styles.buttonsContainer}>
         <Button
            onClick={handleToggle}
            dataTestId="select-mode-toggle"
            color={bulkDeleteMode ? 'error' : 'primary'}
            startIcon={bulkDeleteMode ? null : <DeleteIcon />}
         >
            {bulkDeleteMode ? 'Cancel' : <span>Bulk Delete</span>}
         </Button>
         {bulkDeleteMode && selectedTrackIds.length < limit && (
            <Button onClick={handleSelectAll} dataTestId="select-all">
               Select all
            </Button>
         )}
         {bulkDeleteMode && selectedTrackIds.length > 0 && (
            <Button
               onClick={() => void handleBulkDelete()}
               className={styles.deleteSelected}
               dataTestId="bulk-delete-button"
               loading={loading}
               startIcon={<DeleteIcon />}
            >
               Delete Selected ({selectedTrackIds.length})
            </Button>
         )}
      </div>
   );
}
