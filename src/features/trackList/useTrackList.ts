import { useEffect } from "react"
import { useAppDispatch } from "../../app/hooks"
import { loadTrackList } from "./trackListApiSlice"

export const useTrackList = () => {
  const dispatch = useAppDispatch()

  useEffect(() => {
    void dispatch(loadTrackList())
  }, [dispatch])
}
