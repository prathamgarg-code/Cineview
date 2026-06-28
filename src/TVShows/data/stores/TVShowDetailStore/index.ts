import { makeAutoObservable, runInAction } from 'mobx'
import axios from 'axios'
import type { TVDetail } from '../../../../Common/core/types/Tmdb.types'
import type { TmdbService } from '../../../../Common/data/services/TmdbService'

type Status = 'idle' | 'loading' | 'success' | 'error'

export class TVShowDetailStore {
  show: TVDetail | null = null
  showStatus: Status = 'idle'
  notFound = false

  constructor(private tmdbService: TmdbService) {
    makeAutoObservable(this)
  }

  async fetchShow(showId: number) {
    this.show = null
    this.notFound = false
    this.showStatus = 'loading'

    try {
      const show = await this.tmdbService.getTVShowDetails(showId)
      runInAction(() => {
        this.show = show
        this.showStatus = 'success'
      })
    } catch (error) {
      runInAction(() => {
        this.showStatus = 'error'
        if (axios.isAxiosError(error) && error.response?.status === 404) {
          this.notFound = true
        }
      })
    }
  }
}