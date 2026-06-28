import axios from 'axios'
import {
  TMDB_API_KEY,
  TMDB_BASE_URL,
  TMDB_DEFAULT_LANGUAGE,
} from '../core/constants/Tmdb.constants'

export const tmdbApiClient = axios.create({
  baseURL: TMDB_BASE_URL,
  params: {
    api_key: TMDB_API_KEY,
    language: TMDB_DEFAULT_LANGUAGE,
  },
})