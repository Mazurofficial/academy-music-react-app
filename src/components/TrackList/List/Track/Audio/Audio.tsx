import styles from "./Audio.module.scss"
import { useRef, useEffect } from "react"
import type { Track } from "../../../../../types/track"
import { useAppDispatch, useAppSelector } from "../../../../../app/hooks"
import { selectTrackById } from "../../../../../features/trackList/trackListSelectors"
import { selectPlayingTrackId } from "../../../../../features/audio/audioSelectors"
import { getAudioFile } from "../../../../../api/api"
import { playTrack, stopTrack } from "../../../../../features/audio/audioSlice"
import Button from "../../../../ui/Button/Button"

export type AudioProps = {
  id: Track["id"]
}

export default function Audio({ id }: AudioProps) {
  const dispatch = useAppDispatch()
  const track = useAppSelector(state => selectTrackById(state, id))
  const isPlayingTrackId = useAppSelector(selectPlayingTrackId)
  const isCurrentTrackPlaying = isPlayingTrackId === id
  const audioRef = useRef<HTMLAudioElement>(null)

  const audioUrl = track?.audioFile ? getAudioFile(track.audioFile) : ""

  useEffect(() => {
    const audioEl = audioRef.current
    if (!audioEl) return

    if (isCurrentTrackPlaying) {
      void audioEl.play()
    } else {
      audioEl.pause()
      audioEl.currentTime = 0
    }
  }, [isCurrentTrackPlaying])

  const togglePlay = () => {
    const audioEl = audioRef.current
    if (!audioEl) return

    if (isCurrentTrackPlaying) {
      audioEl.pause()
      dispatch(stopTrack())
    } else {
      void audioEl.play()
      dispatch(playTrack(id))
    }
  }

  return (
    <div className={styles.audioContainer}>
      <Button
        onClick={togglePlay}
        disabled={!track?.audioFile}
        className={styles.playButton}
      >
        {isCurrentTrackPlaying ? (
          <i className="fa-solid fa-pause"></i>
        ) : (
          <i className="fa-solid fa-play"></i>
        )}
      </Button>
      {track?.audioFile && (
        <audio
          ref={audioRef}
          src={audioUrl}
          onEnded={() => dispatch(stopTrack())}
          controls
        />
      )}
    </div>
  )
}
