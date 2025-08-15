import type { TrackT } from '@/features/trackList/schema';

export default function normalizeTrackList(tracks: TrackT[]) {
   const byId: Record<string, TrackT> = {};
   const ids: string[] = [];
   for (const track of tracks) {
      byId[track.id] = track;
      ids.push(track.id);
   }
   return { byId, ids };
}
