import { Component } from '@angular/core';
import { TmdbService } from '../../services/tmdb.service';
import { TMDB } from '../../interfaces/tmdb';
import { MovieCardComponent } from "../movie-card/movie-card.component";
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-recommended',
  imports: [MovieCardComponent, NgClass],
  templateUrl: './recommended.component.html',
  styleUrl: './recommended.component.css'
})
export class RecommendedComponent {
  filterType: 'movies' | 'series' = 'movies';

      showAllMovies = false;
id = 550
  recommendedMovies: TMDB[] =[]
  recommendedSeries: TMDB[] =[]

constructor(private tmdb:TmdbService){}

ngOnInit(){
  this.tmdb.getMovieRecommendations(this.id).subscribe((data)=>{
    this.recommendedMovies=data.results;
    console.log(data);

})

this.tmdb.getSeriesRecommendations(this.id).subscribe((data)=>{
  this.recommendedSeries=data.results;
})

}
get displayedItems() {
  const list = this.filterType === 'movies' ? this.recommendedMovies : this.recommendedSeries;
  return this.showAllItems ? list : list.slice(0, 6);
}

showAllItems = false;

}
