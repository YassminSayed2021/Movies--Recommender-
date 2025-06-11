import { Component, Input, OnInit } from '@angular/core';
import { Review } from '../../interfaces/tmdb';
import { TmdbService } from '../../services/tmdb.service';

@Component({
  selector: 'app-reviews',
  imports: [],
  templateUrl: './reviews.component.html',
  styleUrl: './reviews.component.css'
})
export class ReviewsComponent implements OnInit {
  @Input() id!: number;
  @Input() type: 'movie' | 'series' = 'movie';

  reviews: Review[] = [];
  isLoading = true;

  constructor(private tmdb: TmdbService) {}

  ngOnInit(): void {
    // const mediaType = this.type === 'series' ? 'tv' : 'movie';
    // this.tmdb.getReviews(mediaType, this.id).subscribe(data => {
    //   console.log(data);
    //   this.reviews = data.results;
    //   this.isLoading = false;
    // });
  }

  getAvatar(path: string | null): string {
    if (!path) return 'assets/user-placeholder.png';
    return path.includes('http') ? path.slice(1) : `https://image.tmdb.org/t/p/w185${path}`;
  }


}
