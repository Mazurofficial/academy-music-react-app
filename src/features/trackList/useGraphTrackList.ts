import { useAppDispatch } from '@/app/hooks';
import { useValidSearchParams } from '@/hooks/useValidSearchParams';
import type { GetTracksGraphT } from './schema';
import { trackListGraphQLSchema } from './schema';
import { useQuery } from '@apollo/client';
import { GET_TRACKS } from '@/apollo/api';
import { setTracks } from './trackListSlice';
import { useEffect } from 'react';

const useGraphTrackList = () => {
   const dispatch = useAppDispatch();
   const { params } = useValidSearchParams();
   const { loading, error, data } = useQuery<GetTracksGraphT>(GET_TRACKS, {
      variables: { ...params },
   });
   const parsed = data ? trackListGraphQLSchema.safeParse(data) : null;

   useEffect(() => {
      if (parsed?.success) {
         dispatch(
            setTracks({
               data: parsed.data.tracks.data,
               meta: parsed.data.tracks.meta,
            })
         );
      }
   }, [parsed, dispatch]);

   if (!parsed?.success && data) {
      return { loading: false, data: null, error: 'Invalid response format' };
   }
   if (loading) return { loading, error: null };
   if (error) return { loading: false, error: error.message };

   return { loading: false, error: null };
};

export default useGraphTrackList;
