import styles from "./Audio.module.scss"
import { useEffect, useRef } from "react"
import WaveSurfer from "wavesurfer.js"
import { useAppDispatch, useAppSelector } from "../../../../../app/hooks"
import { selectPlayingTrackId } from "../../../../../features/audio/audioSelectors"
import { playTrack, stopTrack } from "../../../../../features/audio/audioSlice"
import type { Track } from "../../../../../types/track"
import { selectTrackById } from "../../../../../features/trackList/trackListSelectors"
import Button from "../../../../ui/Button/Button"

type AudioProps = {
  id: Track["id"]
}

export default function Audio({ id }: AudioProps) {
  const dispatch = useAppDispatch()
  const track = useAppSelector(state => selectTrackById(state, id))
  const isPlayingTrackId = useAppSelector(selectPlayingTrackId)
  const isCurrentTrackPlaying = isPlayingTrackId === id
  const hasAudio = Boolean(track?.audioFile)

  const audioUrl = hasAudio
    ? `http://localhost:3000/api/files/${track?.audioFile ?? ""}`
    : ""

  const waveformRef = useRef<HTMLDivElement>(null)
  const wavesurfer = useRef<WaveSurfer | null>(null)

  // Load wavesurfer if audioFile exists
  useEffect(() => {
    if (!hasAudio || !waveformRef.current) return

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
  }, [audioUrl, dispatch, hasAudio])

  useEffect(() => {
    if (!wavesurfer.current) return
    if (!isCurrentTrackPlaying) {
      wavesurfer.current.pause()
    }
  }, [isPlayingTrackId, isCurrentTrackPlaying])

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
          isCurrentTrackPlaying ? styles.activeWave : styles.inactiveWave
        } ${!hasAudio ? styles.disabledWave : ""}`}
      >
        {!hasAudio && <div className={styles.placeholderLine} />}
      </div>
      <Button
        onClick={togglePlay}
        className={styles.playButton}
        disabled={!hasAudio}
        title={!hasAudio ? "Audio file missing" : ""}
      >
        {isCurrentTrackPlaying ? (
          <i className="fa-solid fa-pause"></i>
        ) : (
          <i className="fa-solid fa-play"></i>
        )}
      </Button>
    </div>
  )
}
