import styles from "./Audio.module.scss"
import { useRef, useEffect, useState } from "react"
import type { Track } from "../../../../../types/track"
import { selectTrackById } from "../../../../../features/trackList/trackListSelectors"
import {
  playTrack,
  saveTrackProgress,
  stopTrack,
} from "../../../../../features/audio/audioSlice"
import {
  selectPlayingTrackId,
  selectTrackProgress,
} from "../../../../../features/audio/audioSelectors"
import { getAudioFile } from "../../../../../api/api"
import Button from "../../../../ui/Button/Button"
import { useAppDispatch, useAppSelector } from "../../../../../app/hooks"

export type AudioProps = {
  id: Track["id"]
}

export default function Audio({ id }: AudioProps) {
  const dispatch = useAppDispatch()
  const track = useAppSelector(state => selectTrackById(state, id))
  const isPlayingTrackId = useAppSelector(selectPlayingTrackId)
  const savedProgress = useAppSelector(selectTrackProgress(id))
  const isCurrentTrackPlaying = isPlayingTrackId === id

  const audioRef = useRef<HTMLAudioElement>(null)

  const [progress, setProgress] = useState(0)
  const [duration, setDuration] = useState(0)

  const audioUrl = track?.audioFile ? getAudioFile(track.audioFile) : ""

  // Обробка оновлення прогресу
  useEffect(() => {
    const audioEl = audioRef.current
    if (!audioEl) return

    const updateTime = () => {
      setProgress(audioEl.currentTime)
    }
    const updateDuration = () => {
      setDuration(audioEl.duration)
    }

    audioEl.addEventListener("timeupdate", updateTime)
    audioEl.addEventListener("loadedmetadata", updateDuration)
    audioEl.addEventListener("ended", () => dispatch(stopTrack()))

    return () => {
      audioEl.removeEventListener("timeupdate", updateTime)
      audioEl.removeEventListener("loadedmetadata", updateDuration)
    }
  }, [dispatch])

  // Контроль відтворення
  useEffect(() => {
    const audioEl = audioRef.current
    if (!audioEl) return

    if (isCurrentTrackPlaying) {
      // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
      audioEl.currentTime = savedProgress ?? 0
      void audioEl.play()
    } else {
      audioEl.pause()
    }
  }, [isCurrentTrackPlaying, savedProgress])

  const togglePlay = () => {
    const audioEl = audioRef.current
    if (!audioEl) return

    if (isCurrentTrackPlaying) {
      dispatch(saveTrackProgress({ id, progress: audioEl.currentTime }))
      dispatch(stopTrack())
    } else {
      dispatch(playTrack(id))
    }
  }

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTime = Number(e.target.value)
    const audioEl = audioRef.current
    if (!audioEl) return

    audioEl.currentTime = newTime
    setProgress(newTime)
  }

  const formatTime = (sec: number): string => {
    const minutes = Math.floor(sec / 60)
    const seconds = Math.floor(sec % 60)
    return `${minutes.toString()}:${seconds.toString().padStart(2, "0")}`
  }

  return (
    <div className={styles.audioContainer}>
      <Button
        onClick={togglePlay}
        disabled={!track?.audioFile}
        className={styles.playButton}
      >
        {isCurrentTrackPlaying ? (
          <i className="fa-solid fa-pause" />
        ) : (
          <i className="fa-solid fa-play" />
        )}
      </Button>

      {track?.audioFile ? (
        <div className={styles.audioControls}>
          <span className={styles.time}>{formatTime(progress)}</span>
          <input
            type="range"
            min={0}
            max={duration}
            step={0.1}
            value={progress}
            onChange={handleSeek}
            className={styles.progressBar}
          />
          <span className={styles.time}>{formatTime(duration)}</span>
          <audio ref={audioRef} src={audioUrl} hidden />
        </div>
      ) : (
        <div className={styles.audioControls}>
          <span className={styles.time}>{formatTime(progress)}</span>
          <input
            type="range"
            min={0}
            max={duration}
            step={0.1}
            value={progress}
            onChange={handleSeek}
            className={styles.progressBar}
          />
          <span className={styles.time}>{formatTime(duration)}</span>
          <audio ref={audioRef} src={audioUrl} hidden />
        </div>
      )}
    </div>
  )
}
