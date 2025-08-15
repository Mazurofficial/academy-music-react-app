import { useAppSelector } from '@/app/hooks';
import { selectTrackListStatus } from '@/features/trackList/trackListSelectors';
import { selectTrackListQuery } from '@/features/query/querySelectors';
import Select from '@/components/ui/Select/Select';
import styles from './TrackControls.module.scss';
import { useSearchParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { updateSearchParam } from '@/utils/updateSearchParams';

export default function PageLimitSelect() {
   const { limit } = useAppSelector(selectTrackListQuery);
   const [limitValue, setLimitValue] = useState(limit ?? 10);
   const status = useAppSelector(selectTrackListStatus);
   const possibleLimit = [5, 10, 15, 20, 50];
   const options = possibleLimit.map((val) => ({
      label: val.toString(),
      value: val.toString(),
   }));
   const [, setSearchParams] = useSearchParams();

   useEffect(() => {
      setLimitValue(limit ?? 10);
   }, [limit]);

   const isValidLimit = (limit: number) => possibleLimit.includes(limit);

   // updates limit in url
   const handleLimitChange = (newLimit: number) => {
      if (isValidLimit(newLimit)) {
         setSearchParams((searchParams) =>
            updateSearchParam(searchParams, 'limit', newLimit.toString(), true)
         );
         setLimitValue(newLimit);
      } else console.error('Inappropriate limit');
   };

   return (
      <div className={styles.pageLimitSelect}>
         <Select
            label="Tracks per page:"
            name="page-limit"
            value={limitValue.toString()}
            onChange={(value) => {
               handleLimitChange(parseInt(value, 10));
            }}
            disabled={status === 'loading'}
            options={options}
         />
      </div>
   );
}
