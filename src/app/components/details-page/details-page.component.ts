import { Component } from '@angular/core';
import { TrailerComponent } from "../trailer/trailer.component";
import { ActivatedRoute } from '@angular/router';
import { TmdbService } from '../../services/tmdb.service';
import { InfoSectionComponent } from "../info-section/info-section.component";
import { Review, TMDB, TmdbResponse } from '../../interfaces/tmdb';
import { SeasonsComponent } from "../seasons/seasons.component";

@Component({
  selector: 'app-details-page',
  imports: [TrailerComponent, InfoSectionComponent, SeasonsComponent],
  templateUrl: './details-page.component.html',
  styleUrl: './details-page.component.css'
})
export class DetailsPageComponent {

type: 'movie' | 'series' = 'movie';


  movieId!: number;
  seriesId!: number;

  moviesInfo!:TMDB;
  seriesInfo!:TMDB;

  seasons !:TMDB;



    reviews: Review[] = [];
    isLoading = true;
  


  constructor(private route: ActivatedRoute, private tmdb: TmdbService) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.movieId = id;
    this.seriesId = id;

    this.tmdb.movieInfo(this.movieId).subscribe(data => {
      console.log(data)
this.moviesInfo = data;
    })
    ;

    this.tmdb.serieInfo(this.seriesId).subscribe(data => {
            console.log(data)
this.seriesInfo = data;
    });

this.tmdb.getSeasons(this.seriesId).subscribe(data => {
  console.log(data);
  this.seasons = data;  
});



  }



  }


  







