import { useMutation } from '@apollo/client';
import { EDIT_TRACK, GET_TRACKS } from '@/apollo/api';
import type {
   UpdateTrackGraphT,
   UpdateTrackDtoT,
   TrackT,
} from '@/features/trackList/schema';
import { trackSchema } from '@/features/trackList/schema';
import { useValidSearchParams } from '@/hooks/useValidSearchParams';
import { parseMutationResult } from '@/utils/parseMutationResult';
import { type Result } from 'neverthrow';
import { handleMutationError } from '@/utils/handleMutationError';

export function useUpdateTrack() {
   const [updateTrackMutation, { loading, error }] =
      useMutation<UpdateTrackGraphT>(EDIT_TRACK);
   const { params } = useValidSearchParams();

   const updateTrack = async (
      input: UpdateTrackDtoT
   ): Promise<Result<TrackT, string>> => {
      try {
         const result = await updateTrackMutation({
            variables: { input },
            refetchQueries: [{ query: GET_TRACKS, variables: { ...params } }],
         });
         return parseMutationResult(
            result.data ?? {},
            'updateTrack',
            trackSchema
         );
      } catch (e) {
         return handleMutationError(e);
      }
   };

   return { updateTrack, loading, error };
}
