import { useAppDispatch } from '@/app/hooks';
import {
   openModal,
   setModalUpload,
} from '@/features/modalWindow/modalWindowSlice';
import type { TrackIdT } from '@/features/trackList/schema';
import UploadIcon from '@mui/icons-material/Upload';
import IconButtonCustom from '@/components/ui/Button/IconButton';

type UploadAudioFileBtnProps = {
   id: TrackIdT;
};

export default function UploadAudioFileBtn({ id }: UploadAudioFileBtnProps) {
   const dispatch = useAppDispatch();

   // Open modal window with uploading audio file functionality
   const handleUploadAudio = () => {
      dispatch(setModalUpload(id));
      dispatch(openModal());
   };

   return (
      <IconButtonCustom
         ariaLabel="upload track file"
         onClick={handleUploadAudio}
      >
         <UploadIcon />
      </IconButtonCustom>
   );
}
