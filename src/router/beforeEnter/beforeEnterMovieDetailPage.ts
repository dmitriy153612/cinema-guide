import { useMoviesStore } from '@/stores/moviesStore'
import { useGlobalStore } from '@/stores/globalStore'
import type { RouteLocationNormalized } from 'vue-router'

export const beforeEnterMovieDetailPage = async (to: RouteLocationNormalized) => {
  const moviesStore = useMoviesStore()
  const globalStore = useGlobalStore()
  globalStore.toggleScreenSpinner(true)
  await moviesStore.fetchGetMovie(Number(to.params.id))
  globalStore.toggleScreenSpinner(false)
  const err = moviesStore.movieError
  if (err && 'name' in err && err.name === 'TypeError') {
    return { name: 'NotFoundPage' }
  }
}
