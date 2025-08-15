import styles from './UploadAudioForm.module.scss';
import { useRef, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/app/hooks';
import {
   deleteExTrackFile,
   uploadExTrackFile,
} from '@/features/trackList/trackListSlice';
import { selectTrackById } from '@/features/trackList/trackListSelectors';
import Button from '@/components/ui/Button/Button';
import { getAudioFile } from '@/api/api';
import type { TrackIdT } from '@/features/trackList/schema';
import { useUploadTrackFile } from '@/apollo/mutations/uploadTrackFile';
import { useDeleteTrackFile } from '@/apollo/mutations/deleteTrackFile';

export type UploadAudioFormProps = {
   id: TrackIdT;
};

export default function UploadAudioForm({ id }: UploadAudioFormProps) {
   const dispatch = useAppDispatch();
   const track = useAppSelector((state) => selectTrackById(state, id));
   const [file, setFile] = useState<File | null>(null);
   const [error, setError] = useState<string | null>(null);
   const fileInputRef = useRef<HTMLInputElement | null>(null);
   const chooseDisabled =
      track.audioFile !== undefined &&
      track.audioFile !== '' &&
      track.audioFile !== null;

   const { uploadTrackFile } = useUploadTrackFile();
   const { deleteTrackFile } = useDeleteTrackFile();

   // "Choose file" button handler
   const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const selected = e.target.files?.[0];
      if (!selected) return;

      const validTypes = ['audio/mpeg', 'audio/wav'];
      console.log(selected.type);
      if (!validTypes.includes(selected.type)) {
         setError('Only MP3 or WAV files are allowed.');
         return;
      }

      if (selected.size > 10 * 1024 * 1024) {
         setError('File size exceeds 10MB.');
         return;
      }

      setFile(selected);
      setError(null);
   };

   // Upload audio file on server
   const handleUpload = async () => {
      if (!file) return;
      const result = await uploadTrackFile(id, file);
      if (result.isOk()) {
         setFile(null);
         setError(null);
         dispatch(uploadExTrackFile(result.value));
      } else if (result.isErr()) {
         setError(result.error || 'Upload failed');
         console.error('Upload failed:', result.error);
      }
   };

   // Delete temporary added file
   const handleRemove = () => {
      setFile(null);
      setError(null);
   };

   // Delete existing file
   const handleDeleteFile = async () => {
      const result = await deleteTrackFile(id);
      if (result.isOk()) {
         setError(null);
         setFile(null);
         dispatch(deleteExTrackFile(result.value));
      } else if (result.isErr()) {
         setError(result.error || 'Failed to delete audio file');
         console.error('Delete audio file failed:', result.error);
      }
   };

   return (
      <div className={styles.uploadContainer}>
         <h3>Upload audio file</h3>
         <input
            type="file"
            accept=".mp3,.wav"
            onChange={handleFileChange}
            ref={fileInputRef}
            className={styles.hiddenFileInput}
            data-testid={`upload-track-${id}`}
         />
         <Button
            onClick={() => fileInputRef.current?.click()}
            className={styles.chooseButton}
            disabled={chooseDisabled}
         >
            Choose file
         </Button>
         {chooseDisabled ? <p>Delete current track first</p> : null}
         {file && (
            <div>
               <p>{file.name}</p>
               <div className={styles.newTrackButtons}>
                  <Button onClick={() => void handleUpload()}>Upload</Button>
                  <Button onClick={handleRemove}>Remove</Button>
               </div>
            </div>
         )}
         {error && <p style={{ color: 'red' }}>{error}</p>}
         {track.audioFile && (
            <div className={styles.oldTrack}>
               <audio controls src={getAudioFile(track.audioFile)} />
               <Button onClick={() => void handleDeleteFile()}>
                  Delete file
               </Button>
            </div>
         )}
      </div>
   );
}
