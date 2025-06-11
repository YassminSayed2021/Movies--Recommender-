import { Component, Input } from '@angular/core';
import { TMDB } from '../../interfaces/tmdb';
import { RouterModule } from '@angular/router';
@Component({
  selector: 'app-movie-card',
  imports: [RouterModule],
  templateUrl: './movie-card.component.html',
  styleUrl: './movie-card.component.css'
})
export class MovieCardComponent {
//imgPath = "assets/Rectangle 9.png"
  @Input() data!: TMDB;


}
