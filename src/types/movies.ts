export interface MoviesQueryParams {
  id?: number
  page?: number
  title?: string
  genre?: string
  count?: number
}

export interface MoviesConfig {
  count: number
  page: number
}

export interface MovieData {
  id: number
  awardsSummary: string | string[] | null
  backdropUrl: string | null
  budget: string | null
  cast: string[]
  countriesOfOrigin: string[] | null
  director: string | null
  genres: string[] | null
  homepage: string | null
  keywords: string[] | null
  language: string | null
  languages: string[] | null
  originalTitle: string | null
  plot: string | null
  posterUrl: string | null
  production: string | null
  releaseDate: string | null
  releaseYear: number | null
  revenue: string | null
  runtime: number | null
  searchL: string | null
  status: string | null
  title: string | null
  tmdbRating: number | null
  trailerUrl: string | null
  trailerYouTubeId: string | null
}

export interface Genre {
  genre: string
  imgUrl: string | null
}
