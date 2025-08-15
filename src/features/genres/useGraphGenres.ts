import { useQuery } from '@apollo/client';
import { useEffect } from 'react';
import { useAppDispatch } from '@/app/hooks';
import { GET_GENRES } from '@/apollo/api';
import { setGenres } from '@/features/genres/genresSlice';
import { genresSchema } from '@/features/genres/schema';

type GetGenresGraphT = {
   genres: string[];
};

const useGraphGenres = () => {
   const dispatch = useAppDispatch();
   const { loading, error, data } = useQuery<GetGenresGraphT>(GET_GENRES);

   const parsed = data ? genresSchema.safeParse(data.genres) : null;

   useEffect(() => {
      if (parsed?.success) {
         dispatch(setGenres(parsed.data));
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [data]);

   if (!parsed?.success && data) {
      return { loading: false, genres: null, error: 'Invalid response format' };
   }
   if (loading) return { loading, genres: null, error: null };
   if (error) return { loading: false, genres: null, error: error.message };

   return { loading: false, genres: parsed?.data ?? null, error: null };
};

export default useGraphGenres;
