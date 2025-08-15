import { useAppDispatch } from '@/app/hooks';
import {
   openModal,
   setModalEdit,
} from '@/features/modalWindow/modalWindowSlice';
import type { TrackIdT } from '@/features/trackList/schema';
import EditIcon from '@mui/icons-material/Edit';
import IconButtonCustom from '@/components/ui/Button/IconButton';

type EditTrackBtnProps = {
   id: TrackIdT;
};

export default function EditTrackBtn({ id }: EditTrackBtnProps) {
   const dispatch = useAppDispatch();

   const handleEditTrack = () => {
      dispatch(setModalEdit(id));
      dispatch(openModal());
   };

   return (
      <IconButtonCustom
         ariaLabel="edit track"
         onClick={handleEditTrack}
         dataTestId={`edit-track-${id}`}
      >
         <EditIcon />
      </IconButtonCustom>
   );
}
