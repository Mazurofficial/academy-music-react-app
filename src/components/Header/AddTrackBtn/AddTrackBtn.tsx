import { useAppDispatch } from '@/app/hooks';
import {
   openModal,
   setModalAdd,
} from '@/features/modalWindow/modalWindowSlice';
import Button from '@/components/ui/Button/Button';
import styles from './AddTrackBtn.module.scss';
import AddIcon from '@mui/icons-material/Add';

export default function AddTrackBtn() {
   const dispatch = useAppDispatch();

   const handleAddTrack = () => {
      dispatch(openModal());
      dispatch(setModalAdd());
   };

   return (
      <Button
         className={styles.button}
         onClick={handleAddTrack}
         dataTestId="create-track-button"
         startIcon={<AddIcon />}
      >
         <span className={styles.buttonText}> Add track</span>
      </Button>
   );
}
