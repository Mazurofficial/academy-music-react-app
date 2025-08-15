import { useLocation } from 'react-router-dom';
import { pipe, O, D, A } from '@mobily/ts-belt';
import type { TrackQueryT } from '@/features/trackList/schema';
import {
   getCleanStringFromURL,
   getValidNumberFromURL,
} from '@/utils/getUrlParamHelpers';
import { useAppDispatch } from '@/app/hooks';
import { setQuery } from '@/features/query/querySlice';

const sortOptions = ['title', 'artist', 'album', 'createdAt'] as const;
const orderOptions = ['asc', 'desc'] as const;

type SortOption = (typeof sortOptions)[number];
type OrderOption = (typeof orderOptions)[number];

export function useValidSearchParams(): {
   params: Partial<TrackQueryT>;
   paramsUrl: URLSearchParams;
} {
   const dispatch = useAppDispatch();
   const { search } = useLocation();
   const params = new URLSearchParams(search);

   const getValidSort = (
      key: string,
      allowed: readonly SortOption[]
   ): SortOption | '' =>
      pipe(
         getCleanStringFromURL(key, params) as SortOption,
         O.filter((v) => allowed.includes(v)),
         O.getWithDefault<SortOption | ''>('')
      );

   const getValidOrder = (
      key: string,
      allowed: readonly OrderOption[]
   ): OrderOption | '' =>
      pipe(
         getCleanStringFromURL(key, params) as OrderOption,
         O.filter((v) => allowed.includes(v)),
         O.getWithDefault<OrderOption | ''>('')
      );

   const result: Partial<TrackQueryT> = {};

   O.tap(getCleanStringFromURL('search', params), (v) => (result.search = v));
   O.tap(getCleanStringFromURL('artist', params), (v) => (result.artist = v));
   O.tap(getCleanStringFromURL('genre', params), (v) => (result.genre = v));
   O.tap(getValidNumberFromURL('page', params, 1, 5), (v) => (result.page = v));
   O.tap(
      getValidNumberFromURL('limit', params, 10, 50),
      (v) => (result.limit = v)
   );
   O.tap(getValidSort('sort', sortOptions), (v) => {
      if (v !== '') result.sort = v;
   });
   O.tap(getValidOrder('order', orderOptions), (v) => {
      if (v !== '') result.order = v;
   });

   // Build back URL from the sanitized object
   const url = pipe(
      result,
      D.toPairs<string | number, string>, // split params object into array with tuples [[key,value],...]
      A.filter(([, value]) => O.isSome(O.fromNullable(value))), // filter nullish parameters
      A.filter(([, value]) => value !== ''), // filter empty strings
      A.filter(([, value]) => !Number.isNaN(value)), // filter NaN values
      (entries) => {
         const searchParams = new URLSearchParams();
         entries.forEach(([key, value]) => {
            searchParams.append(key, String(value));
         });
         return searchParams;
      }
   );
   console.log(result);
   dispatch(setQuery({ ...result }));
   return { params: result, paramsUrl: url };
}
