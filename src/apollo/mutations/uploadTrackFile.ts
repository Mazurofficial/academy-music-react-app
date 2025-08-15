import { useMutation } from '@apollo/client';
import { UPLOAD_TRACK_FILE, GET_TRACKS } from '@/apollo/api';
import {
   trackSchema,
   type UploadTrackFileGraphT,
   type TrackT,
} from '@/features/trackList/schema';
import { useValidSearchParams } from '@/hooks/useValidSearchParams';
import { parseMutationResult } from '@/utils/parseMutationResult';
import { type Result } from 'neverthrow';
import { handleMutationError } from '@/utils/handleMutationError';

export function useUploadTrackFile() {
   const [uploadTrackFileMutation, { loading, error }] =
      useMutation<UploadTrackFileGraphT>(UPLOAD_TRACK_FILE);
   const { params } = useValidSearchParams();

   const uploadTrackFile = async (
      id: string,
      file: File
   ): Promise<Result<TrackT, string>> => {
      try {
         const result = await uploadTrackFileMutation({
            variables: { id, file },
            refetchQueries: [{ query: GET_TRACKS, variables: { ...params } }],
         });
         return parseMutationResult(
            result.data ?? {},
            'uploadTrackFile',
            trackSchema
         );
      } catch (e) {
         return handleMutationError(e);
      }
   };

   return { uploadTrackFile, loading, error };
}
