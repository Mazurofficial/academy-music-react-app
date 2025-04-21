import type React from "react"
import { useState } from "react"
import type { Track } from "../../types/track"
import { useAppDispatch } from "../../app/hooks"
import { uploadTrackFile } from "../../features/trackList/trackListApiSlice"

type Props = {
  id: string
  currentTrack?: Track
}

export default function UploadTrackFile({ id, currentTrack }: Props) {
  const dispatch = useAppDispatch()
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
      // 10MB limit
      setError("File size exceeds 10MB.")
      return
    }

    setFile(selected)
    setError(null)
  }

  const handleUpload = async (id: string, file: File) => {
    const result = await dispatch(uploadTrackFile({ id, file }))
    if (uploadTrackFile.fulfilled.match(result)) {
      console.log("Upload success:", result.payload)
    } else {
      setError(result.payload ?? "Upload failed")
    }
  }

  const handleRemove = () => {
    setFile(null)
    setError(null)
  }

  return (
    <div>
      <input type="file" accept=".mp3, .wav" onChange={handleFileChange} />
      {file && (
        <div>
          <p>{file.name}</p>
          <button onClick={() => void handleUpload(id, file)}>Upload</button>
          <button onClick={handleRemove}>Remove</button>
        </div>
      )}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {currentTrack?.audioFile && (
        <audio
          controls
          src={currentTrack.audioFile}
          style={{ marginTop: "1rem" }}
        />
      )}
    </div>
  )
}
