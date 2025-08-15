import { ALL_GENRES } from '@/api/api';
import { http, HttpResponse } from 'msw';

export const handlers = [
   http.get(ALL_GENRES, () => {
      return HttpResponse.json(['Rock', 'Hip Hop', 'Jazz']);
   }),
];
