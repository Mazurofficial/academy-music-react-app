import styles from "./Audio.module.scss"
import { useEffect, useRef } from "react"
import WaveSurfer from "wavesurfer.js"
import { useAppDispatch, useAppSelector } from "../../../../../app/hooks"
import { selectPlayingTrackId } from "../../../../../features/audio/audioSelectors"
import { playTrack, stopTrack } from "../../../../../features/audio/audioSlice"
import type { Track } from "../../../../../types/track"
import { selectTrackById } from "../../../../../features/trackList/trackListSelectors"
import Button from "../../../../UI/Button/Button"

type AudioProps = {
  id: Track["id"]
}

export default function Audio({ id }: AudioProps) {
  const track = useAppSelector(state => selectTrackById(state, id))
  const audioUrl = `http://localhost:3000/api/files/${track?.audioFile ?? ""}`
  const waveformRef = useRef<HTMLDivElement>(null)
  const wavesurfer = useRef<WaveSurfer | null>(null)

  const dispatch = useAppDispatch()
  const isPlayingTrackId = useAppSelector(selectPlayingTrackId)
  const isCurrentTrackPlaying = isPlayingTrackId === id

  // Ініціалізація WaveSurfer при монтуванні
  useEffect(() => {
    if (!waveformRef.current) return

    wavesurfer.current = WaveSurfer.create({
      container: waveformRef.current,
      waveColor: "#ccc",
      progressColor: "#0ea5e9",
      height: 25,
      barWidth: 2,
    })

    void wavesurfer.current.load(audioUrl)

    wavesurfer.current.on("finish", () => {
      dispatch(stopTrack())
    })

    return () => {
      wavesurfer.current?.destroy()
      wavesurfer.current = null
    }
  }, [audioUrl, dispatch])

  // Pause if another track is playing
  useEffect(() => {
    if (!wavesurfer.current) return
    if (!isCurrentTrackPlaying) {
      wavesurfer.current.pause()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isPlayingTrackId])

  const togglePlay = () => {
    if (!wavesurfer.current) return

    if (isCurrentTrackPlaying) {
      wavesurfer.current.pause()
      dispatch(stopTrack())
    } else {
      void wavesurfer.current.play()
      dispatch(playTrack(id))
    }
  }

  return (
    <div className={styles.audioContainer}>
      <div
        ref={waveformRef}
        className={`${styles.waveform} ${
          isCurrentTrackPlaying ? styles.activeWave : styles.hiddenWave
        }`}
      />
      <Button onClick={togglePlay} className={styles.playButton}>
        {isCurrentTrackPlaying ? (
          <i className="fa-solid fa-pause"></i>
        ) : (
          <i className="fa-solid fa-play"></i>
        )}
      </Button>
    </div>
  )
}
