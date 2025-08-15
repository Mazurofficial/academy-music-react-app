import { useMutation } from '@apollo/client';
import { CREATE_TRACK, GET_TRACKS } from '@/apollo/api';
import {
   trackSchema,
   type CreateTrackDtoT,
   type TrackT,
} from '@/features/trackList/schema';
import { useValidSearchParams } from '@/hooks/useValidSearchParams';
import type { CreateTrackGraphT } from '@/features/trackList/schema';
import { parseMutationResult } from '@/utils/parseMutationResult';
import { type Result } from 'neverthrow';
import { handleMutationError } from '@/utils/handleMutationError';

export function useCreateTrack() {
   const [createTrackMutation, { loading, error }] =
      useMutation<CreateTrackGraphT>(CREATE_TRACK);
   const { params } = useValidSearchParams();

   const createTrack = async (
      input: CreateTrackDtoT
   ): Promise<Result<TrackT, string>> => {
      try {
         const result = await createTrackMutation({
            variables: { input },
            refetchQueries: [{ query: GET_TRACKS, variables: { ...params } }],
         });
         return parseMutationResult(
            result.data ?? {},
            'createTrack',
            trackSchema
         );
      } catch (e) {
         return handleMutationError(e);
      }
   };

   return { createTrack, loading, error };
}
