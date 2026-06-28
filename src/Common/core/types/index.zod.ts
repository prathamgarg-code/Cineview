import { z } from 'zod'

export const paginatedSchema = <T extends z.ZodTypeAny>(itemSchema: T) =>
  z.object({
    page: z.number(),
    results: z.array(itemSchema),
    total_pages: z.number(),
    total_results: z.number(),
  })

export const movieListItemSchema = z.object({
  id: z.number(),
  title: z.string(),
  poster_path: z.string().nullable(),
  backdrop_path: z.string().nullable(),
  vote_average: z.number(),
  overview: z.string(),
  release_date: z.string(),
  genre_ids: z.array(z.number()).optional(),
})

export const tvListItemSchema = z.object({
  id: z.number(),
  name: z.string(),
  poster_path: z.string().nullable(),
  backdrop_path: z.string().nullable(),
  vote_average: z.number(),
  overview: z.string(),
  first_air_date: z.string(),
  genre_ids: z.array(z.number()).optional(),
})

export const genreSchema = z.object({
  id: z.number(),
  name: z.string(),
})

export const genreListResponseSchema = z.object({
  genres: z.array(genreSchema),
})

export const movieDetailSchema = z.object({
  id: z.number(),
  title: z.string(),
  overview: z.string(),
  poster_path: z.string().nullable(),
  backdrop_path: z.string().nullable(),
  vote_average: z.number(),
  release_date: z.string(),
  runtime: z.number().nullable(),
  genres: z.array(genreSchema),
  tagline: z.string().nullable().optional(),
})

export const videoSchema = z.object({
  id: z.string(),
  key: z.string(),
  site: z.string(),
  type: z.string(),
  name: z.string(),
})

export const videosResponseSchema = z.object({
  results: z.array(videoSchema),
})

export const castMemberSchema = z.object({
  id: z.number(),
  name: z.string(),
  character: z.string(),
  profile_path: z.string().nullable(),
})

export const creditsResponseSchema = z.object({
  cast: z.array(castMemberSchema),
})

export const tvDetailSchema = z.object({
  id: z.number(),
  name: z.string(),
  overview: z.string(),
  poster_path: z.string().nullable(),
  backdrop_path: z.string().nullable(),
  vote_average: z.number(),
  first_air_date: z.string(),
  number_of_seasons: z.number(),
  genres: z.array(genreSchema),
  seasons: z.array(
    z.object({
      id: z.number(),
      name: z.string(),
      season_number: z.number(),
      episode_count: z.number(),
      poster_path: z.string().nullable(),
      air_date: z.string().nullable().optional(),
    }),
  ),
})

export const episodeSchema = z.object({
  id: z.number(),
  name: z.string(),
  overview: z.string(),
  air_date: z.string().nullable(),
  episode_number: z.number(),
  season_number: z.number(),
  still_path: z.string().nullable(),
})

export const seasonDetailSchema = z.object({
  id: z.number(),
  name: z.string(),
  overview: z.string(),
  season_number: z.number(),
  episodes: z.array(episodeSchema),
})

export const multiSearchItemSchema = z.object({
  id: z.number(),
  media_type: z.enum(['movie', 'tv', 'person']),
  title: z.string().optional(),
  name: z.string().optional(),
  poster_path: z.string().nullable().optional(),
  profile_path: z.string().nullable().optional(),
  known_for_department: z.string().optional(),
  vote_average: z.number().optional(),
})

export const multiSearchResponseSchema = paginatedSchema(multiSearchItemSchema)

export const recentSearchesSchema = z.array(z.string().min(1)).max(10)