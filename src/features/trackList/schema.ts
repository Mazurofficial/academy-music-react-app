import z from 'zod';
// Track & TrackList schemas
export const trackIdSchema = z.string();

export const trackSchema = z.object({
   id: trackIdSchema,
   title: z.string(),
   artist: z.string(),
   album: z.string().nullable().optional(),
   genres: z.array(z.string()),
   slug: z.string(),
   coverImage: z.string().nullable().optional(),
   audioFile: z.string().nullable().optional(),
   createdAt: z.string().optional(),
   updatedAt: z.string(),
});

export const trackListSchema = z.array(trackSchema);
export const createTrackDtoSchema = trackSchema.pick({
   title: true,
   artist: true,
   album: true,
   genres: true,
   coverImage: true,
});
export const updateTrackDtoSchema = trackSchema.omit({
   slug: true,
   createdAt: true,
   updatedAt: true,
});

//types
export type TrackT = z.infer<typeof trackSchema>;
export type TrackIdT = z.infer<typeof trackIdSchema>;
export type TrackListT = z.infer<typeof trackListSchema>;
export type TrackListNormalizedT = {
   byId: Record<TrackIdT, TrackT>;
   ids: TrackIdT[];
};
export type CreateTrackDtoT = z.infer<typeof createTrackDtoSchema>;
export type UpdateTrackDtoT = z.infer<typeof updateTrackDtoSchema>;

// Meta information schema
export const metaSchema = z.object({
   total: z.number(),
   page: z.number(),
   limit: z.number(),
   totalPages: z.number(),
});

//types
export type MetaT = z.infer<typeof metaSchema>;

// TrackListQuery schema
export const trackQuerySchema = z
   .object({
      page: z.number(),
      limit: z.number(),
      sort: z.union([
         z.literal('title'),
         z.literal('artist'),
         z.literal('album'),
         z.literal('createdAt'),
      ]),
      order: z.union([z.literal('asc'), z.literal('desc')]),
      search: z.string(),
      genre: z.string(),
      artist: z.string(),
   })
   .partial();

//types
export type TrackQueryT = z.infer<typeof trackQuerySchema>;

// API schemas
export const loadTracksSchema = z.object({
   data: trackListSchema,
   meta: metaSchema,
});
export const trackListGraphQLSchema = z.object({
   tracks: loadTracksSchema,
});
export const creareTrackSchema = z.object({
   createTrack: trackSchema,
});

export type LoadTracksT = z.infer<typeof loadTracksSchema>;
export type GetTracksGraphT = { tracks: LoadTracksT };
export type CreateTrackGraphT = { createTrack: TrackT };
export type UpdateTrackGraphT = { updateTrack: TrackT };
export type DeleteTrackGraphResultT = {
   deleteTrack: boolean;
};
export type BulkDeleteTracksGraphResultT = {
   deleteTracks: {
      success: string[];
      failed: string[];
   };
};
export type UploadTrackFileGraphT = { uploadTrackFile: TrackT };
export type DeleteTrackFileGraphT = { deleteTrackFile: TrackT };

export const deleteTracksBulkSchema = z.object({
   success: z.array(trackIdSchema),
   failed: z.array(trackIdSchema),
});

//types
export type DeleteTracksBulkReturnT = z.infer<typeof deleteTracksBulkSchema>;
