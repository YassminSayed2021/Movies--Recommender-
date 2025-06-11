import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Review, Season, TMDB, Trailer } from '../interfaces/tmdb';
import { TmdbResponse } from '../interfaces/tmdb';

@Injectable({
  providedIn: 'root'
})
export class TmdbService {
private apiKey = "9549fc06ebb41f9c445ad9c8dfdf0ce1"
  private baseUrl = 'https://api.themoviedb.org/3';

  constructor(private http : HttpClient) { }

  getRecentlyUpdated() {
    return this.http.get<{results:TMDB[]}>(`${this.baseUrl}/tv/on_the_air?api_key=${this.apiKey}&language=en-US&page=1`);
  }



  getNewReleases(): Observable<TmdbResponse> {
    return this.http.get<TmdbResponse>(`${this.baseUrl}/movie/now_playing?api_key=${this.apiKey}`);
  }

  getNewSeries(): Observable<TmdbResponse> {
    return this.http.get<TmdbResponse>(`${this.baseUrl}/tv/on_the_air?api_key=${this.apiKey}`);
  }


  getMovieRecommendations(id: number) {
  return this.http.get<{results:TMDB[]}>(`${this.baseUrl}/movie/${id}/recommendations?api_key=${this.apiKey}`);
}

getSeriesRecommendations(id: number) {
  return this.http.get<{results:TMDB[]}>(`${this.baseUrl}/tv/${id}/recommendations?api_key=${this.apiKey}`);
}

  getMovieTrailer(movieId: number): Observable<{ results: Trailer[] }> {
    return this.http.get<{ results: Trailer[] }>(
      `${this.baseUrl}/movie/${movieId}/videos?api_key=${this.apiKey}`
    );
  }

  getSeriesTrailer(seriesId: number): Observable<{ results: Trailer[] }> {
    return this.http.get<{ results: Trailer[] }>(
      `${this.baseUrl}/tv/${seriesId}/videos?api_key=${this.apiKey}`
    );
  }

  movieInfo(mid:number): Observable< TMDB>{
    return this.http.get<TMDB>(
      `${this.baseUrl}/movie/${mid}?api_key=${this.apiKey}&language=en-US
`
    )
  }

    serieInfo(sid:number): Observable<TMDB>{
    return this.http.get<TMDB>(
      `${this.baseUrl}/tv/${sid}?api_key=${this.apiKey}&language=en-US
`
    )
  }

getSeasons(id:number): Observable<TMDB>{
    return this.http.get<TMDB>(
      `${this.baseUrl}/tv/${id}?api_key=${this.apiKey}`
    )
  }

  getSeason(seriesId: number, seasonNumber: number): Observable<Season> {
  return this.http.get<Season>(
    `${this.baseUrl}/tv/${seriesId}/season/${seasonNumber}?api_key=${this.apiKey}&language=en-US`
  );
}

getReviews(mediaType: 'movie' | 'tv', id: number): Observable<{ results: Review[] }> {
  return this.http.get<{ results: Review[] }>(
    `${this.baseUrl}/${mediaType}/${id}/reviews?api_key=${this.apiKey}&language=en-US`
  );
}




}
