import type { z } from 'zod'
import type {
  castMemberSchema,
  episodeSchema,
  genreSchema,
  movieDetailSchema,
  movieListItemSchema,
  multiSearchItemSchema,
  seasonDetailSchema,
  tvDetailSchema,
  tvListItemSchema,
  videoSchema,
} from './index.zod'

export type MovieListItem = z.infer<typeof movieListItemSchema>
export type TVListItem = z.infer<typeof tvListItemSchema>
export type Genre = z.infer<typeof genreSchema>
export type MovieDetail = z.infer<typeof movieDetailSchema>
export type Video = z.infer<typeof videoSchema>
export type CastMember = z.infer<typeof castMemberSchema>
export type TVDetail = z.infer<typeof tvDetailSchema>
export type SeasonDetail = z.infer<typeof seasonDetailSchema>
export type Episode = z.infer<typeof episodeSchema>
export type MultiSearchItem = z.infer<typeof multiSearchItemSchema>