import { useMutation } from '@apollo/client';
import { BULK_DELETE_TRACKS, GET_TRACKS } from '@/apollo/api';
import { useValidSearchParams } from '@/hooks/useValidSearchParams';
import {
   deleteTracksBulkSchema,
   type BulkDeleteTracksGraphResultT,
   type DeleteTracksBulkReturnT,
} from '@/features/trackList/schema';
import { parseMutationResult } from '@/utils/parseMutationResult';
import { type Result } from 'neverthrow';
import { handleMutationError } from '@/utils/handleMutationError';

export function useBulkDeleteTracks() {
   const [bulkDeleteTracksMutation, { loading, error }] =
      useMutation<BulkDeleteTracksGraphResultT>(BULK_DELETE_TRACKS);
   const { params } = useValidSearchParams();

   const bulkDeleteTracks = async (
      ids: string[]
   ): Promise<Result<DeleteTracksBulkReturnT, string>> => {
      try {
         const result = await bulkDeleteTracksMutation({
            variables: { ids },
            refetchQueries: [{ query: GET_TRACKS, variables: { ...params } }],
         });
         return parseMutationResult(
            result.data ?? {},
            'deleteTracks',
            deleteTracksBulkSchema
         );
      } catch (e) {
         return handleMutationError(e);
      }
   };

   return { bulkDeleteTracks, loading, error };
}
