import { useAppDispatch } from '@/app/hooks';
import type { TrackIdT } from '@/features/trackList/schema';
import DeleteIcon from '@mui/icons-material/Delete';
import { useDeleteTrack } from '@/apollo/mutations/deleteTrack';
import { deleteExTrack } from '@/features/trackList/trackListSlice';
import IconButtonCustom from '@/components/ui/Button/IconButton';

type DeleteTrackBtnProps = {
   id: TrackIdT;
};

export default function DeleteTrackBtn({ id }: DeleteTrackBtnProps) {
   const dispatch = useAppDispatch();
   const { deleteTrack, loading } = useDeleteTrack();

   const handleDeleteTrack = async (id: string) => {
      if (window.confirm('Are you sure you want to delete this track?')) {
         const result = await deleteTrack(id);
         if (result.isOk() && result.value) {
            dispatch(deleteExTrack(id));
         } else if (result.isErr()) {
            console.error(result.error);
         }
      }
   };

   return (
      <IconButtonCustom
         ariaLabel="delete track"
         loading={loading}
         dataTestId={`delete-track-${id}`}
         onClick={() => {
            void handleDeleteTrack(id);
         }}
         color="error"
      >
         <DeleteIcon />
      </IconButtonCustom>
   );
}
