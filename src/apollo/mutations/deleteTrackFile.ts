import { useMutation } from '@apollo/client';
import { DELETE_TRACK_FILE, GET_TRACKS } from '@/apollo/api';
import {
   trackSchema,
   type DeleteTrackFileGraphT,
   type TrackT,
} from '@/features/trackList/schema';
import { useValidSearchParams } from '@/hooks/useValidSearchParams';
import { parseMutationResult } from '@/utils/parseMutationResult';
import { type Result } from 'neverthrow';
import { handleMutationError } from '@/utils/handleMutationError';

export function useDeleteTrackFile() {
   const [deleteTrackFileMutation, { loading, error }] =
      useMutation<DeleteTrackFileGraphT>(DELETE_TRACK_FILE);
   const { params } = useValidSearchParams();

   const deleteTrackFile = async (
      id: string
   ): Promise<Result<TrackT, string>> => {
      try {
         const result = await deleteTrackFileMutation({
            variables: { id },
            refetchQueries: [{ query: GET_TRACKS, variables: { ...params } }],
         });
         return parseMutationResult(
            result.data ?? {},
            'deleteTrackFile',
            trackSchema
         );
      } catch (e) {
         return handleMutationError(e);
      }
   };

   return { deleteTrackFile, loading, error };
}
