import { useMoviesStore } from '@/stores/moviesStore'
import { useGlobalStore } from '@/stores/globalStore'

export const beforeEnterMainPage = async () => {
  const moviesStore = useMoviesStore()
  const globalStore = useGlobalStore()
  globalStore.toggleScreenSpinner(true)
  await Promise.all([moviesStore.fetchGetMovieRandom(), moviesStore.fetchGetMoviesTopRaiting()])
  globalStore.toggleScreenSpinner(false)
}
