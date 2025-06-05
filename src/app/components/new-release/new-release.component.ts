import { Component } from '@angular/core';
import { TmdbService } from '../../services/tmdb.service';
import { MovieCardComponent } from "../movie-card/movie-card.component";

@Component({
  selector: 'app-new-release',
  imports: [MovieCardComponent],
  templateUrl: './new-release.component.html',
  styleUrl: './new-release.component.css'
})
export class NewReleaseComponent {
  newMovies: any[] = [];
  newSeries: any[] = [];

    showAllMovies = false;
  showAllSeries = false;


  constructor(private tmdbService: TmdbService) {}

  ngOnInit() {
    this.tmdbService.getNewReleases().subscribe((data) => {
      this.newMovies = data.results;
      console.log(data);
    });

    this.tmdbService.getNewSeries().subscribe((data) => {
      this.newSeries = data.results;
            console.log(data);

    });
  }

}
