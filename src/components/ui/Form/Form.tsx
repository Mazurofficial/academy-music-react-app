import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { selectAllGenres } from '@/features/genres/trackListSelectors';
import styles from './Form.module.scss';
import Input from '../Input/Input';
import GenreSelect from '../../GenreSelect/GenreSelect';
import Button from '../Button/Button';
import { closeModal } from '@/features/modalWindow/modalWindowSlice';
import type {
   CreateTrackDtoT,
   TrackIdT,
   UpdateTrackDtoT,
} from '@/features/trackList/schema';
import { trackFormSchema } from './schema';
import { z } from 'zod';
import { useCreateTrack } from '@/apollo/mutations/createTrack';
import {
   addNewTrack,
   updateExTrack,
} from '@/features/trackList/trackListSlice';
import { useUpdateTrack } from '@/apollo/mutations/updateTrack';

export type FormProps = {
   id?: TrackIdT;
   initialState: CreateTrackDtoT | UpdateTrackDtoT;
   onSubmitAction: 'ADD' | 'EDIT';
};

export default function Form({ id, initialState, onSubmitAction }: FormProps) {
   const dispatch = useAppDispatch();
   const genres = useAppSelector(selectAllGenres);
   const [formData, setFormData] = useState(initialState);
   const [errors, setErrors] = useState<Record<string, string>>({});
   const createTrack = useCreateTrack();
   const updateTrack = useUpdateTrack();

   // Form validation function
   const validate = () => {
      try {
         trackFormSchema.parse(formData);
         setErrors({});
         return true;
      } catch (error) {
         if (error instanceof z.ZodError) {
            const newErrors: Record<string, string> = {};
            error.errors.forEach((err) => {
               const path = err.path.join('.');
               newErrors[path] = err.message;
            });
            setErrors(newErrors);
         }
         return false;
      }
   };

   // onChange for text inputs
   const handleChange =
      (field: keyof CreateTrackDtoT) =>
      (e: React.ChangeEvent<HTMLInputElement>) => {
         setFormData((prev) => ({
            ...prev,
            [field]: e.target.value,
         }));
      };

   // onSelect for genre select field
   const handleGenreChange = (value: string[]) => {
      setFormData((prev) => ({
         ...prev,
         genres: [...value],
      }));
   };

   //   onSubmit for form
   const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      if (!validate()) return;
      if (onSubmitAction === 'EDIT' && id) {
         const result = await updateTrack.updateTrack({ id, ...formData });
         if (result.isOk()) {
            dispatch(updateExTrack(result.value));
            dispatch(closeModal());
         } else if (result.isErr()) {
            console.error(result.error);
         }
      } else {
         const result = await createTrack.createTrack(formData);
         if (result.isOk() && !createTrack.loading && !updateTrack.loading) {
            dispatch(addNewTrack(result.value));
            dispatch(closeModal());
         } else if (result.isErr()) {
            console.error(result.error);
         }
      }
   };

   return (
      <form
         onSubmit={(e) => void handleSubmit(e)}
         className={styles.Form}
         data-testid="track-form"
      >
         <Input
            type="text"
            label="Title"
            value={formData.title}
            onChange={handleChange('title')}
            name="title"
            placeholder="Track title"
            error={errors.title ? true : false}
            errorText={errors.title}
            data-testid="input-title"
         />
         <Input
            type="text"
            label="Artist"
            value={formData.artist}
            onChange={handleChange('artist')}
            name="artist"
            placeholder="Artist name"
            error={errors.artist ? true : false}
            errorText={errors.artist}
            data-testid="input-artist"
         />
         <Input
            type="text"
            label="Album"
            value={formData.album ?? ''}
            onChange={handleChange('album')}
            name="album"
            placeholder="Album title"
            error={errors.album ? true : false}
            errorText={errors.album}
            data-testid="input-album"
         />
         <GenreSelect
            availableGenres={genres}
            selectedGenres={formData.genres}
            onChange={handleGenreChange}
         />
         <Input
            type="text"
            label="Cover Image URL"
            value={formData.coverImage ?? ''}
            onChange={handleChange('coverImage')}
            name="coverImage"
            placeholder="https://..."
            error={errors.coverImage ? true : false}
            errorText={errors.coverImage}
            data-testid="input-cover-image"
         />
         <Button
            type="submit"
            data-testid="submit-button"
            loading={
               onSubmitAction === 'ADD'
                  ? createTrack.loading
                  : updateTrack.loading
            }
         >
            Save
         </Button>
      </form>
   );
}
