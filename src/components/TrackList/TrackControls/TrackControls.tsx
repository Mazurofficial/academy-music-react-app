import BulkDeleteButton from "./BulkDelete/BulkDelete"
import { Filter } from "./Filter/Filter"
import PageLimitSelect from "./PageLimitSelect/PageLimitSelect"
import Search from "./Search/Search"
import { Sorting } from "./Sorting/Sorting"
import styles from "./TrackControls.module.scss"

export default function TrackControls() {
  return (
    <div className={styles.trackControls}>
      <div className={styles.leftPart}>
        <Sorting />
        <Filter />
        <PageLimitSelect />
      </div>
      <div className={styles.rightPart}>
        <Search />
        <BulkDeleteButton />
      </div>
    </div>
  )
}
