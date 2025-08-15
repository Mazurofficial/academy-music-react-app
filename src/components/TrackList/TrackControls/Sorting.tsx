import styles from './TrackControls.module.scss';
import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { setSorting } from '@/features/query/querySlice';

import Select from '@/components/ui/Select/Select';
import type { TrackQueryT } from '@/features/trackList/schema';
import { useSearchParams } from 'react-router-dom';
import { selectTrackListQuery } from '@/features/query/querySelectors';
import { updateSearchParam } from '@/utils/updateSearchParams';

const sortOptions = [
   { label: 'Title', value: 'title' },
   { label: 'Artist', value: 'artist' },
   { label: 'Album', value: 'album' },
   { label: 'Created At', value: 'createdAt' },
];

const orderOptions = [
   { label: 'Ascending', value: 'asc' },
   { label: 'Descending', value: 'desc' },
];

export default function Sorting() {
   const dispatch = useAppDispatch();

   const initialSort = useAppSelector(selectTrackListQuery).sort;
   const initialOrder = useAppSelector(selectTrackListQuery).order;

   const [sort, setSort] = useState<TrackQueryT['sort']>(initialSort);
   const [order, setOrder] = useState<'asc' | 'desc'>(initialOrder ?? 'asc');
   const [, setSearchParams] = useSearchParams();

   useEffect(() => {
      setSort(initialSort);
   }, [initialSort]);

   useEffect(() => {
      setOrder(initialOrder ?? 'asc');
   }, [initialOrder]);

   // Load sorted results from server
   const handleSortChange = (value: string) => {
      const newSort = (value || undefined) as TrackQueryT['sort'];
      setSort(newSort);
      dispatch(setSorting({ sort: newSort, order }));
      setSearchParams((searchParams) =>
         updateSearchParam(searchParams, 'sort', newSort)
      );
   };

   // Load ordered results from server
   const handleOrderChange = (value: string) => {
      const newOrder = value as 'asc' | 'desc';
      setOrder(newOrder);
      dispatch(setSorting({ sort, order: newOrder }));
      setSearchParams((searchParams) => {
         searchParams.set('order', newOrder);
         return searchParams;
      });
   };

   return (
      <div className={styles.sorting}>
         <Select
            name="sort"
            label="Sort by:"
            value={sort ?? ''}
            onChange={handleSortChange}
            options={[{ label: '--', value: '' }, ...sortOptions]}
            className={styles.sort}
            data-testid="sort-select"
         />
         <Select
            name="order"
            label="Order:"
            value={order}
            onChange={handleOrderChange}
            options={orderOptions}
            className={styles.order}
         />
      </div>
   );
}
