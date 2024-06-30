import { ref, shallowRef } from 'vue'
import { defineStore } from 'pinia'
import { type AxiosResponse } from 'axios'
import { useAxios } from '@/useAxios'
import {
  MOVIES_PATH,
  MOVIES_TOP_RAITING_PATH,
  GENRES_PATH,
  MOVIE_RANDOM_PATH,
  MOVES_LIMIT
} from '@/variables'
import type { MoviesQueryParams, MovieData, MoviesConfig, Genre } from '@/types/movies'

export const useMoviesStore = defineStore('moviesStore', () => {
  const movies = ref<MovieData[]>([])
  const moviesConfig = ref<MoviesConfig>({
    page: 1,
    count: 1
  })
  const isMoviesLoading = ref<boolean>(false)

  const movie = ref<MovieData | null>(null)
  const isMovieLoading = ref<boolean>(false)
  const movieError = ref<Error | null>(null)

  const moviesTopRaiting = shallowRef<MovieData[]>([])

  const movieRandom = shallowRef<MovieData | null>(null)
  const isMovieRandomLoading = ref<boolean>(false)

  const genres = shallowRef<Genre[] | null>(null)

  async function fetchGetMovies(filterParams: MoviesQueryParams, addMovies: boolean = false) {
    const params = { count: MOVES_LIMIT, page: 0, ...filterParams }
    isMoviesLoading.value = true

    try {
      const { config, data }: AxiosResponse<MovieData[], { params: MoviesConfig }> =
        await useAxios.get(MOVIES_PATH, { params })
      moviesConfig.value.page = config.params.page
      moviesConfig.value.count = config.params.count
      if (addMovies) {
        movies.value.push(...data)
      } else {
        movies.value = data
      }
      console.log(data)
    } catch (err) {
      console.error(err)
    } finally {
      isMoviesLoading.value = false
    }
  }

  async function fetchGetMovie(id: number | null) {
    isMovieLoading.value = true
    movieError.value = null
    try {
      const { data }: AxiosResponse<MovieData> = await useAxios.get(`${MOVIES_PATH}/${id}`)
      if (
        ('name' in data && data.name === 'PrismaClientValidationError') ||
        !Object.keys(data).length
      ) {
        const err = new TypeError('Invalid id')
        movieError.value = err
        throw err
      }
      movie.value = data
    } catch (err) {
      console.error(err)
    } finally {
      isMovieLoading.value = false
    }
  }

  async function fetchGetMoviesTopRaiting() {
    try {
      const { data }: AxiosResponse<MovieData[]> = await useAxios.get(MOVIES_TOP_RAITING_PATH)
      moviesTopRaiting.value = data
    } catch (err) {
      console.error(err)
    }
  }

  function formatGenres(genres: string[]): Genre[] {
    const gengesImgPaths: { [key: string]: string } = {
      adventure: '/img/genres/adventure.jpg',
      comedy: '/img/genres/comedy.jpg',
      drama: '/img/genres/drama.jpg',
      family: '/img/genres/family.jpg',
      fantasy: '/img/genres/fantasy.jpg',
      history: '/img/genres/history.jpg',
      mystery: '/img/genres/mystery.jpg',
      thriller: '/img/genres/thriller.jpg'
    }
    return genres.map((item) => {
      let imgUrl: string | null = null
      if (item in gengesImgPaths) {
        imgUrl = gengesImgPaths[item]
      }
      return {
        genre: item,
        imgUrl: imgUrl
      }
    })
  }
  async function fetchGetGenres() {
    try {
      const { data }: AxiosResponse<string[]> = await useAxios.get(GENRES_PATH)
      genres.value = formatGenres(data)
    } catch (err) {
      console.error(err)
    }
  }

  async function fetchGetMovieRandom() {
    isMovieRandomLoading.value = true
    try {
      const { data }: AxiosResponse<MovieData> = await useAxios.get(MOVIE_RANDOM_PATH)
      movieRandom.value = data
      console.log(data)
    } catch (err) {
      console.error(err)
    } finally {
      isMovieRandomLoading.value = false
    }
  }

  return {
    fetchGetMovies,
    isMoviesLoading,
    moviesConfig,
    movies,
    fetchGetMovie,
    isMovieLoading,
    movie,
    movieError,
    fetchGetMoviesTopRaiting,
    moviesTopRaiting,
    fetchGetGenres,
    genres,
    fetchGetMovieRandom,
    isMovieRandomLoading,
    movieRandom
  }
})
