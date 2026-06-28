import { BACKDROP_SIZE, POSTER_SIZE, PROFILE_SIZE, TMDB_IMAGE_BASE_URL } from '../core/constants/Tmdb.constants'

export const getPosterUrl = (path: string | null | undefined, size = POSTER_SIZE) =>
  path ? `${TMDB_IMAGE_BASE_URL}/${size}${path}` : null

export const getBackdropUrl = (path: string | null | undefined, size = BACKDROP_SIZE) =>
  path ? `${TMDB_IMAGE_BASE_URL}/${size}${path}` : null

export const getProfileUrl = (path: string | null | undefined, size = PROFILE_SIZE) =>
  path ? `${TMDB_IMAGE_BASE_URL}/${size}${path}` : null