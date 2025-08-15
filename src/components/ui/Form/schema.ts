import { z } from 'zod';

export const trackFormSchema = z.object({
   title: z
      .string()
      .trim()
      .min(1, 'Title is required')
      .max(30, 'Title must be less than 30 characters'),
   artist: z
      .string()
      .trim()
      .min(1, 'Artist is required')
      .max(30, 'Artist must be less than 30 characters'),
   album: z
      .string()
      .max(30, 'Album must be less than 30 characters')
      .optional()
      .or(z.literal('')),
   genres: z.array(z.string()).default([]),
   coverImage: z
      .string()
      .regex(
         /^(https?:\/\/.*\.(?:png|jpg|jpeg|gif|webp))$/i,
         'Invalid image URL format'
      )
      .optional()
      .or(z.literal('')),
});
