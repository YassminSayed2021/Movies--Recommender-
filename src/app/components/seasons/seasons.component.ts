import { Component, Input, OnInit } from '@angular/core';
import { TmdbService } from '../../services/tmdb.service';
import { TMDB } from '../../interfaces/tmdb';
import { FormsModule } from '@angular/forms';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-seasons',
  imports: [FormsModule,NgClass],
  templateUrl: './seasons.component.html',
  styleUrl: './seasons.component.css'
})
export class SeasonsComponent implements OnInit{
@Input() id!: number;
@Input() type: 'movie' | 'series' = 'movie'; 
@Input() data!: TMDB;



constructor(private tmdb: TmdbService){}
  ngOnInit(): void {
// this.data.seasons = this.data.seasons?.map(season => ({
//   ...season,
//   episodes: season.episodes ?? []
// }));
  }


getseasons(): string {
  if (!this.data?.seasons || this.data.seasons.length === 0) return 'N/A';
  return this.data.seasons.map(g => g.name).join(', ');

  
}


   selectedSeasonId: number | null = null;

  // toggleSeason(id: number) {
  //   this.selectedSeasonId = this.selectedSeasonId === id ? null : id;
  // }


  toggleSeason(seasonId: number, seasonNumber: number) {
  if (this.selectedSeasonId === seasonId) {
    this.selectedSeasonId = null;
    return;
  }

  this.selectedSeasonId = seasonId;

  this.tmdb.getSeason(this.id, seasonNumber).subscribe(seasonData => {
    const index = this.data.seasons.findIndex(s => s.id === seasonId);
    if (index > -1) {
      this.data.seasons[index].episodes = seasonData.episodes ?? [];
    }
  });
  }


}
