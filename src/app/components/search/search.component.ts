import { Component, OnInit } from '@angular/core';
import { TMDB } from '../../interfaces/tmdb';
import { TmdbService } from '../../services/tmdb.service';
import { ActivatedRoute } from '@angular/router';
import { MovieCardComponent } from "../movie-card/movie-card.component";

@Component({
  selector: 'app-search',
  imports: [MovieCardComponent],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent implements OnInit {
  query: string = '';
  results: TMDB[] = [];

  constructor(private route: ActivatedRoute, private tmdb: TmdbService) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.query = params['query'] || '';
      if (this.query) {
        this.tmdb.search(this.query).subscribe(data => {
          this.results = data.results;
        });
      }
    });
  }
}