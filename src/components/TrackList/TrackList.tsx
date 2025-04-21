import { Filter } from "../Filter/Filter"
import Pagination from "../Pagination/Pagination"
import { Sorting } from "../Sorting/Sorting"
import List from "./List/List"
import styles from "./TrackList.module.scss"

export default function TrackList() {
  return (
    <div className={styles.trackList}>
      <Sorting />
      <Filter />
      <List />
      <Pagination />
    </div>
  )
}
