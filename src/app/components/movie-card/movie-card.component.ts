import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-movie-card',
  imports: [],
  templateUrl: './movie-card.component.html',
  styleUrl: './movie-card.component.css'
})
export class MovieCardComponent {
//imgPath = "assets/Rectangle 9.png"
  @Input() data: any;

}
