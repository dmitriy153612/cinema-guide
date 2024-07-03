import { shallowRef } from 'vue'
import { defineStore } from 'pinia'
import { type AxiosResponse } from 'axios'
import { useAxios } from '@/useAxios'
import { MOVIES_FAVORITES_PATH } from '@/variables'
import type { MovieData } from '@/types/movies'

export const useFavoritesStore = defineStore('favoritesStore', () => {
  const favoritesMovies = shallowRef<MovieData[]>([])
  
  async function fetchGetFavoritesMovies() {
    try {
      const { data }: AxiosResponse<MovieData[]> = await useAxios.get(MOVIES_FAVORITES_PATH)
      favoritesMovies.value = data
    } catch (err) {
      console.error(err)
    }
  }

  async function fetchAddMovieToFavorite(movieId: string) {
    try {
      await useAxios.post(MOVIES_FAVORITES_PATH, { id: movieId })
    } catch (err) {
      console.error(err)
    }
  }

  async function fetchDelMovieFromFavorites(movieId: string) {
    try {
      await useAxios.delete(`${MOVIES_FAVORITES_PATH}/${movieId}`)
    } catch (err) {
      console.error(err)
      fetchGetFavoritesMovies()
    }
  }

  function delMovieFromFavorites(movieId: string) {
    favoritesMovies.value = favoritesMovies.value.filter((movie) => {
      return movie.id !== Number(movieId)
    })
  }

  return {
    fetchGetFavoritesMovies,
    favoritesMovies,
    fetchAddMovieToFavorite,
    fetchDelMovieFromFavorites,
    delMovieFromFavorites
  }
})
