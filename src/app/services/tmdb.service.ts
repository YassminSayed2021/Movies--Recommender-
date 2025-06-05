import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TmdbService {
private apiKey = "9549fc06ebb41f9c445ad9c8dfdf0ce1"
  private baseUrl = 'https://api.themoviedb.org/3';

  constructor(private http : HttpClient) { }

  getRecentlyUpdated() {
    return this.http.get(`${this.baseUrl}/tv/on_the_air?api_key=${this.apiKey}&language=en-US&page=1`);
  }



  getNewReleases(): Observable<any> {
    return this.http.get(`${this.baseUrl}/movie/now_playing?api_key=${this.apiKey}`);
  }

  getNewSeries(): Observable<any> {
    return this.http.get(`${this.baseUrl}/tv/on_the_air?api_key=${this.apiKey}`);
  }



}
