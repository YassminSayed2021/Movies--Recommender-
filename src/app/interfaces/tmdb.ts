export interface TMDB {
      id: number;
  title?: string;           
  name?: string;            
  poster_path: string;
  overview: string;
  vote_average: number;
  release_date?: string;
  first_air_date?: string;
  media_type?: string;
origin_country?: string;
original_language?: string;

}


export interface TmdbResponse {
  page: number;
  results: TMDB[];
  total_pages: number;
  total_results: number;
}

