import { useGlobalStore } from '@/stores/globalStore'
import { useFavoritesStore } from '@/stores/favoritesStore'

export const beforeEnterAccount = async () => {
  const globalStore = useGlobalStore()
  const favoritesStore = useFavoritesStore()
  globalStore.toggleScreenSpinner(true)
  await favoritesStore.fetchGetFavoritesMovies()
  globalStore.toggleScreenSpinner(false)
}
