import { gql } from '@apollo/client';

export const GET_TRACKS = gql`
   query GetTracks(
      $page: Int
      $limit: Int
      $sort: String
      $order: String
      $search: String
      $genre: String
      $artist: String
   ) {
      tracks(
         page: $page
         limit: $limit
         sort: $sort
         order: $order
         search: $search
         genre: $genre
         artist: $artist
      ) {
         data {
            id
            title
            artist
            album
            genres
            slug
            coverImage
            audioFile
            createdAt
            updatedAt
         }
         meta {
            total
            page
            limit
            totalPages
         }
      }
   }
`;

export const CREATE_TRACK = gql`
   mutation AddTrack($input: CreateTrackInput!) {
      createTrack(input: $input) {
         id
         title
         artist
         album
         genres
         slug
         coverImage
         audioFile
         createdAt
         updatedAt
      }
   }
`;

export const EDIT_TRACK = gql`
   mutation UpdateTrack($input: UpdateTrackInput!) {
      updateTrack(input: $input) {
         id
         title
         artist
         album
         genres
         slug
         coverImage
         audioFile
         updatedAt
      }
   }
`;

export const DELETE_TRACK = gql`
   mutation DeleteTrack($id: ID!) {
      deleteTrack(id: $id)
   }
`;

export const BULK_DELETE_TRACKS = gql`
   mutation BulkDeleteTracks($ids: [ID!]!) {
      deleteTracks(ids: $ids) {
         success
         failed
      }
   }
`;

export const UPLOAD_TRACK_FILE = gql`
   mutation UploadTrackFile($id: ID!, $file: Upload!) {
      uploadTrackFile(id: $id, file: $file) {
         id
         title
         artist
         album
         genres
         slug
         coverImage
         audioFile
         createdAt
         updatedAt
      }
   }
`;

export const DELETE_TRACK_FILE = gql`
   mutation DeleteTrackFile($id: ID!) {
      deleteTrackFile(id: $id) {
         id
         title
         artist
         album
         genres
         slug
         coverImage
         audioFile
         createdAt
         updatedAt
      }
   }
`;

export const GET_GENRES = gql`
   query GetGenres {
      genres
   }
`;
