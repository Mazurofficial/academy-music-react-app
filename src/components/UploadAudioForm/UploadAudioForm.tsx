import styles from "./UploadAudioForm.module.scss"
import { useState } from "react"
import { useAppDispatch, useAppSelector } from "../../app/hooks"
import {
  deleteTrackFile,
  uploadTrackFile,
} from "../../features/trackList/trackListApiSlice"
import { selectTrackById } from "../../features/trackList/trackListSelectors"
import Button from "../ui/Button/Button"
import type { Track } from "../../types/track"
import { getAudioFile } from "../../api/api"

export type UploadAudioFormProps = {
  id: Track["id"]
}

export default function UploadAudioForm({ id }: UploadAudioFormProps) {
  const dispatch = useAppDispatch()
  const track = useAppSelector(state => selectTrackById(state, id))
  const [file, setFile] = useState<File | null>(null)
  const [error, setError] = useState<string | null>(null)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0]
    if (!selected) return

    const validTypes = ["audio/mpeg", "audio/wav"]
    if (!validTypes.includes(selected.type)) {
      setError("Only MP3 or WAV files are allowed.")
      return
    }

    if (selected.size > 10 * 1024 * 1024) {
      setError("File size exceeds 10MB.")
      return
    }

    setFile(selected)
    setError(null)
  }

  const handleUpload = async () => {
    if (!file) return
    const result = await dispatch(uploadTrackFile({ id, file }))
    if (uploadTrackFile.fulfilled.match(result)) {
      setFile(null)
      console.log("Upload successful")
    } else {
      setError("Upload failed")
      console.error("Update failed:", result.payload)
    }
  }

  const handleRemove = () => {
    setFile(null)
    setError(null)
  }

  const handleDeleteFile = () => {
    void dispatch(deleteTrackFile(id))
  }

  return (
    <div className={styles.uploadContainer}>
      <input type="file" accept=".mp3,.wav" onChange={handleFileChange} />
      {file && (
        <div>
          <p>{file.name}</p>
          <Button onClick={handleUpload}>Upload</Button>
          <Button onClick={handleRemove}>Remove</Button>
        </div>
      )}
      {error && <p style={{ color: "red" }}>{error}</p>}
      {track?.audioFile && (
        <div className={styles.oldTrack}>
          <audio controls src={getAudioFile(track.audioFile)} />
          <Button onClick={handleDeleteFile}>Delete file</Button>
        </div>
      )}
    </div>
  )
}
