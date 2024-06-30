import { useMoviesStore } from '@/stores/moviesStore'
import { useGlobalStore } from '@/stores/globalStore'
import type { RouteLocationNormalized } from 'vue-router'

export const beforeEnterGenrePage = async (to: RouteLocationNormalized) => {
  const moviesStore = useMoviesStore()
  const globalStore = useGlobalStore()
  globalStore.toggleScreenSpinner(true)
  const genre = to.params?.genre
  if (genre && !Array.isArray(genre)) {
    let count: number = 0
    if (globalStore.isMobileScreenWidth) {
      count = 5
    } else {
      count = 15
    }
    await moviesStore.fetchGetMovies({ genre: genre, count: count })
  }
  globalStore.toggleScreenSpinner(false)
}
