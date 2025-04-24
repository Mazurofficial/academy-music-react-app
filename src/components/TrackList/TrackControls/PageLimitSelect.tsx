import { useAppDispatch, useAppSelector } from "../../../app/hooks"
import { loadTracks } from "../../../features/trackList/trackListApiSlice"
import {
  selectTrackListMeta,
  selectTrackListQuery,
  selectTrackListStatus,
} from "../../../features/trackList/trackListSelectors"
import Select from "../../ui/Select/Select"
import styles from "./TrackControls.module.scss"

export default function PageLimitSelect() {
  const dispatch = useAppDispatch()
  const { limit } = useAppSelector(selectTrackListMeta)
  const trackListQuery = useAppSelector(selectTrackListQuery)
  const status = useAppSelector(selectTrackListStatus)
  const options = [5, 10, 15, 20, 50].map(val => ({
    label: val.toString(),
    value: val.toString(),
  }))

  // Send request to load tracks with new Meta{limit}
  const handleLimitChange = (newLimit: number) => {
    void dispatch(loadTracks({ ...trackListQuery, page: 1, limit: newLimit }))
  }

  return (
    <div className={styles.pageLimitSelect}>
      <Select
        label="Tracks per page:"
        name="page-limit"
        value={limit.toString()}
        onChange={value => {
          handleLimitChange(parseInt(value, 10))
        }}
        disabled={status === "loading"}
        options={options}
      />
    </div>
  )
}
