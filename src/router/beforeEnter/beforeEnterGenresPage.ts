import { useMoviesStore } from '@/stores/moviesStore'
import { useGlobalStore } from '@/stores/globalStore'

export const beforeEnterGenresPage = async () => {
  const moviesStore = useMoviesStore()
  const globalStore = useGlobalStore()
  globalStore.toggleScreenSpinner(true)
  await moviesStore.fetchGetGenres()
  globalStore.toggleScreenSpinner(false)
}
