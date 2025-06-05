import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { TmdbService } from '../../services/tmdb.service';

@Component({
  selector: 'app-recently-updated',
  imports: [],
    providers: [TmdbService],
  templateUrl: './recently-updated.component.html',
  styleUrl: './recently-updated.component.css'
})
export class RecentlyUpdatedComponent implements OnInit {
scrollRight() {
    this.scrollContainer.nativeElement.scrollLeft += 200;
}
scrollLeft() {
    this.scrollContainer.nativeElement.scrollLeft -= 200;
}
  newShows : any[] = [];
  @ViewChild('scrollContainer', { static: false }) scrollContainer!: ElementRef;

  constructor(private tmdbService: TmdbService) {}


  ngOnInit(): void {
    this.tmdbService.getRecentlyUpdated().subscribe((res: any) => {
       this.newShows = res.results.slice(0, 10);
      console.log(res)
    });
  }
}
