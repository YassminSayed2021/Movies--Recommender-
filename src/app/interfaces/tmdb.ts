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
genres: { id: number, name: string }[];
  production_companies: ProductionCompany[];
    last_air_date?: string;

seasons: Season[];

}

export interface Review {
  author: string;
  content: string;
  created_at: string;
  id: string;
  url: string;
 
  reviews : Review[];
}


export interface Season {
  id: number;
  name: string;
  overview: string;
  poster_path: string;
  episode_count: number;
  season_number: number;
  episodes?: Episode[]; 
}

export interface Episode {
  id: number;
  name: string;
  episode_number: number;
  overview: string;
  still_path: string | null;
  air_date: string;
  season_number: number;
}






export interface ProductionCompany {
  id: number;
  logo_path: string | null;
  name: string;
  origin_country: string;
}



export interface TmdbResponse {
  page: number;
  results: TMDB[];
  total_pages: number;
  total_results: number;
}

export interface Trailer {
  id: string;
  key: string;
  name: string;
  site: string;
  type: string;
  
}


