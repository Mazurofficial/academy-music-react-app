import { useMutation } from '@apollo/client';
import { DELETE_TRACK, GET_TRACKS } from '@/apollo/api';
import { useValidSearchParams } from '@/hooks/useValidSearchParams';
import type { DeleteTrackGraphResultT } from '@/features/trackList/schema';
import { err, ok, type Result } from 'neverthrow';
import { handleMutationError } from '@/utils/handleMutationError';

export function useDeleteTrack() {
   const [deleteTrackMutation, { loading, error }] =
      useMutation<DeleteTrackGraphResultT>(DELETE_TRACK);
   const { params } = useValidSearchParams();

   const deleteTrack = async (id: string): Promise<Result<boolean, string>> => {
      try {
         const result = await deleteTrackMutation({
            variables: { id },
            refetchQueries: [{ query: GET_TRACKS, variables: { ...params } }],
         });
         if (!result.data || typeof result.data.deleteTrack !== 'boolean') {
            return err(error?.message ?? 'Failed to delete track');
         }
         return ok(result.data.deleteTrack);
      } catch (e) {
         return handleMutationError(e);
      }
   };

   return { deleteTrack, loading, error };
}
