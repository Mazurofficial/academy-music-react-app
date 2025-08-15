import styles from './Audio.module.scss';
import { useRef, useEffect, useState } from 'react';
import {
   selectAllTrackList,
   selectTrackById,
} from '@/features/trackList/trackListSelectors';
import {
   playTrack,
   saveTrackProgress,
   stopTrack,
} from '@/features/audio/audioSlice';
import {
   selectPlayingTrackId,
   selectTrackProgress,
} from '@/features/audio/audioSelectors';
import { getAudioFile } from '@/api/api';
import { useAppDispatch, useAppSelector } from '@/app/hooks';
import type {
   TrackIdT,
   TrackListNormalizedT,
} from '@/features/trackList/schema';
import IconButtonCustom from '../Button/IconButton';
import PauseIcon from '@mui/icons-material/Pause';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';

export type AudioProps = {
   id: TrackIdT;
};

export default function Audio({ id }: AudioProps) {
   const dispatch = useAppDispatch();
   const track = useAppSelector((state) => selectTrackById(state, id));
   const isPlayingTrackId = useAppSelector(selectPlayingTrackId);
   const savedProgress = useAppSelector(selectTrackProgress(id));
   const isCurrentTrackPlaying = isPlayingTrackId === id;
   const tracks = useAppSelector(selectAllTrackList);

   // Collect all available tracks
   const getSongsHelper = (tracks: TrackListNormalizedT) => {
      const songsIds = Object.values(tracks.byId).map((track) => {
         if (track.audioFile && track.audioFile !== '') {
            return track.id;
         }
      });
      const filteredSongIds = songsIds.filter((id) => id !== undefined);
      return filteredSongIds;
   };

   const filteredSongIds = getSongsHelper(tracks);

   const nextTrack =
      // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
      filteredSongIds[filteredSongIds.indexOf(id) + 1] ??
      filteredSongIds[0] ??
      '';

   const audioRef = useRef<HTMLAudioElement>(null);

   const [progress, setProgress] = useState(0);
   const [duration, setDuration] = useState(0);

   const audioUrl = track.audioFile ? getAudioFile(track.audioFile) : '';

   // Processing progress updates
   useEffect(() => {
      const audioEl = audioRef.current;
      if (!audioEl) return;

      const updateTime = () => {
         setProgress(audioEl.currentTime);
      };
      const updateDuration = () => {
         setDuration(audioEl.duration);
      };

      audioEl.addEventListener('timeupdate', updateTime);
      audioEl.addEventListener('loadedmetadata', updateDuration);
      audioEl.addEventListener('ended', () => {
         dispatch(playTrack(nextTrack));
      });

      return () => {
         audioEl.removeEventListener('timeupdate', updateTime);
         audioEl.removeEventListener('loadedmetadata', updateDuration);
      };
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [dispatch]);

   // Playback control
   useEffect(() => {
      const audioEl = audioRef.current;
      if (!audioEl) return;

      if (isCurrentTrackPlaying) {
         // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
         audioEl.currentTime = savedProgress ?? 0;
         void audioEl.play();
      } else {
         audioEl.pause();
      }
   }, [isCurrentTrackPlaying, savedProgress]);

   // Play/pause toggle
   const togglePlay = () => {
      const audioEl = audioRef.current;
      if (!audioEl) return;

      if (isCurrentTrackPlaying) {
         dispatch(saveTrackProgress({ id, progress: audioEl.currentTime }));
         dispatch(stopTrack());
      } else {
         dispatch(playTrack(id));
      }
   };

   // Updates the audio currentTime and UI progress when user seeks via the range input
   const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
      const newTime = Number(e.target.value);
      const audioEl = audioRef.current;
      if (!audioEl) return;

      audioEl.currentTime = newTime;
      setProgress(newTime);
   };

   const formatTime = (sec: number): string => {
      const minutes = Math.floor(sec / 60);
      const seconds = Math.floor(sec % 60);
      return `${minutes.toString()}:${seconds.toString().padStart(2, '0')}`;
   };

   return (
      <>
         {track.audioFile ? (
            <div className={styles.audioContainer}>
               {isCurrentTrackPlaying ? (
                  <IconButtonCustom
                     onClick={togglePlay}
                     className={styles.playButton}
                     dataTestId={`pause-button-${id}`}
                     ariaLabel="pause button"
                  >
                     <PauseIcon />
                  </IconButtonCustom>
               ) : (
                  <IconButtonCustom
                     onClick={togglePlay}
                     className={styles.playButton}
                     dataTestId={`play-button-${id}`}
                     ariaLabel="play button"
                  >
                     <PlayArrowIcon />
                  </IconButtonCustom>
               )}
               <div
                  className={styles.audioControls}
                  data-testid={`audio-player-${id}`}
               >
                  <span className={styles.time}>{formatTime(progress)}</span>
                  <input
                     type="range"
                     min={0}
                     max={duration}
                     step={0.1}
                     value={progress}
                     onChange={handleSeek}
                     className={styles.progressBar}
                     data-testid={`audio-progress-${id}`}
                     aria-label="Audio progressbar"
                  />
                  <span className={styles.time}>{formatTime(duration)}</span>
                  <audio ref={audioRef} src={audioUrl} hidden />
               </div>
            </div>
         ) : (
            <p className={styles.fileNotFound}>Upload audio file first.</p>
         )}
      </>
   );
}
