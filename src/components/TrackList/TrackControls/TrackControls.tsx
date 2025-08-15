import BulkDelete from './BulkDelete';
import Filter from './Filter';
import PageLimitSelect from './PageLimitSelect';
import Search from './Search';
import Sorting from './Sorting';
import styles from './TrackControls.module.scss';

export default function TrackControls() {
   return (
      <>
         <div className={styles.trackControls}>
            <div className={styles.leftPart}>
               <Sorting />
               <div className={styles.filterLimitContainer}>
                  <Filter />
                  <PageLimitSelect />
               </div>
            </div>
            <div className={styles.rightPart}>
               <Search />
            </div>
         </div>
         <BulkDelete />
      </>
   );
}
