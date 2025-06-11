import { Component, Input, OnInit } from '@angular/core';
import { TmdbService } from '../../services/tmdb.service';
import { Trailer } from '../../interfaces/tmdb';
import { SafeUrlPipe } from "../../pipes/safe-url.pipe";

@Component({
  selector: 'app-trailer',
  imports: [SafeUrlPipe],
  templateUrl: './trailer.component.html',
  styleUrl: './trailer.component.css'
})
export class TrailerComponent implements OnInit {


@Input() id!: number;
@Input() type: 'movie' | 'series' = 'movie'; 


trailerKey : string | null = null;

constructor(private tmdb: TmdbService ){}

  ngOnInit(): void {
      if (!this.id) {
    console.warn('TrailerComponent: id is undefined');
    return;
  }

    if(this.type === 'movie'){
this.tmdb.getMovieTrailer(this.id).subscribe(data => {
  console.log(this.id);
  console.log(data);
  const youtubeTrailer = data.results.find(t=> t.site === 'YouTube' && t.type === 'Trailer');
  console.log(youtubeTrailer)
  this.trailerKey = youtubeTrailer? youtubeTrailer.key : null;
})} else if(this.type === 'series'){

this.tmdb.getSeriesTrailer(this.id).subscribe(data => {
    const youtubeTrailer = data.results.find(t=> t.site === 'YouTube' && t.type === 'Trailer');
  this.trailerKey = youtubeTrailer? youtubeTrailer.key : null;

})}

}


}
