import { makeAutoObservable, runInAction } from 'mobx'
import type { SeasonDetail } from '../../../../Common/core/types/Tmdb.types'
import type { TmdbService } from '../../../../Common/data/services/TmdbService'

type Status = 'idle' | 'loading' | 'success' | 'error'

export class SeasonDetailStore {
  season: SeasonDetail | null = null
  seasonStatus: Status = 'idle'

  constructor(private tmdbService: TmdbService) {
    makeAutoObservable(this)
  }

  async fetchSeason(showId: number, seasonNumber: number) {
    this.season = null
    this.seasonStatus = 'loading'

    try {
      const season = await this.tmdbService.getTVSeasonDetails(showId, seasonNumber)
      runInAction(() => {
        this.season = season
        this.seasonStatus = 'success'
      })
    } catch {
      runInAction(() => {
        this.seasonStatus = 'error'
      })
    }
  }
}