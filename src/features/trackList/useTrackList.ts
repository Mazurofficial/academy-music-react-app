import { useEffect } from "react"
import { useAppDispatch } from "../../app/hooks"
import { loadTracks } from "./trackListApiSlice"

// Initial request to load Tracklist

export const useTrackList = () => {
  const dispatch = useAppDispatch()

  useEffect(() => {
    void dispatch(loadTracks({}))
  }, [dispatch])
}
