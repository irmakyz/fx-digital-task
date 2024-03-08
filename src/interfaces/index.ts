export interface Item {
  id: number;
  title?: string;
  name?: string;
  src: string;
  backdrop_path: string;
  poster_path: string;
  overview: string;
  release_date?: string;
  first_air_date?: string;
  vote_average: number;
}

export type ItemList = Item[];

export interface ItemDetails {
  title: string;
  imgUrl: string;
  overview: string;
  releaseDate: string;
  voteAvg: number;
}

export interface RootState {
  trendingMovies: Item[];
  trendingTVShows: Item[];
}
