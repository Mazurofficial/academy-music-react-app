import React, { Suspense } from 'react';
import Pagination from './Pagination/Pagination';
import TrackControls from './TrackControls/TrackControls';
import styles from './TrackList.module.scss';
import Preloader from '../ui/Preloader/Preloader';
import useGraphTrackList from '@/features/trackList/useGraphTrackList';

const List = React.lazy(() => import('./List/List'));

export default function TrackList() {
   const { error } = useGraphTrackList();

   if (error) {
      return (
         <div className={styles.trackList}>
            <h1 data-testid="tracks-header">Something went wrong</h1>
            <p>{error}</p>
         </div>
      );
   }
   return (
      <div className={styles.trackList}>
         <h1 data-testid="tracks-header">Your personal tracklist</h1>
         <TrackControls />
         <Suspense fallback={<Preloader />}>
            <List />
         </Suspense>
         <Pagination />
      </div>
   );
}
