import BulkDeleteButton from "./BulkDelete/BulkDelete"
import { Filter } from "./Filter/Filter"
import Search from "./Search/Search"
import { Sorting } from "./Sorting/Sorting"
import styles from "./TrackControls.module.scss"

export default function TrackControls() {
  return (
    <div className={styles.trackControls}>
      <div className={styles.leftPart}>
        <Sorting />
        <Filter />
        <BulkDeleteButton />
      </div>
      <div className={styles.rightPart}>
        <Search />
      </div>
    </div>
  )
}
