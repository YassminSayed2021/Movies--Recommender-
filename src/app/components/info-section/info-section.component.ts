import { Component, Input, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TmdbService } from '../../services/tmdb.service';
import { TMDB } from '../../interfaces/tmdb';

@Component({
  selector: 'app-info-section',
  imports: [FormsModule],
  templateUrl: './info-section.component.html',
  styleUrl: './info-section.component.css'
})
export class InfoSectionComponent implements OnInit{
@Input() id!: number;
@Input() type: 'movie' | 'series' = 'movie'; 
@Input() data!: TMDB;


constructor(private tmdb: TmdbService){}
  ngOnInit(): void {

      if (!this.id) {
    console.warn('infoComponent: id is undefined');
    return;
  }


// if(this.type=== 'movie'){
//   this.tmdb.movieInfo(this.id).subscribe((data) => {
//     console.log(data)

//   })
// }

  }

getGenres(): string {
  if (!this.data?.genres || this.data.genres.length === 0) return 'N/A';
  return this.data.genres.map(g => g.name).join(', ');
}

getProduction() :string[] {
  if (!this.data || !this.data.production_companies) return [];

  return this.data.production_companies.map(company => {
    return company.name + (company.origin_country ? ` (${company.origin_country})` : '');
  });

}



}
