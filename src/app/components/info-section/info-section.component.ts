import { Component, Input, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TmdbService } from '../../services/tmdb.service';
import { TMDB } from '../../interfaces/tmdb';
import { CommonModule } from '@angular/common';
// =======================
import { Firestore, doc, setDoc } from '@angular/fire/firestore';
import { getAuth } from 'firebase/auth';

// =======================
@Component({
  selector: 'app-info-section',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './info-section.component.html',
  styleUrl: './info-section.component.css',
})
export class InfoSectionComponent implements OnInit {
  @Input() id!: number;
  @Input() type: 'movie' | 'series' = 'movie';
  @Input() data!: TMDB;
  message: string = '';
  messageType: 'success' | 'error' | '' = '';

  constructor(
    private tmdb: TmdbService,
    // =======================
    private firestore: Firestore
  ) {}
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
    return this.data.genres.map((g) => g.name).join(', ');
  }

  getProduction(): string[] {
    if (!this.data || !this.data.production_companies) return [];

    return this.data.production_companies.map((company) => {
      return (
        company.name +
        (company.origin_country ? ` (${company.origin_country})` : '')
      );
    });
  }

  // ===============================================================
  async addToFavourites() {
    const auth = getAuth();
    const user = auth.currentUser;

    if (!user) {
      this.message = 'You need to log in to add favourites.';
      this.messageType = 'error';
      this.clearMessageAfterDelay();
      return;
    }
    try {
      const favRef = doc(
        this.firestore,
        `favourites/${user.uid}/items/${this.data.id}`
      );
      await setDoc(favRef, {
        id: this.data.id,
        title: this.data.title,
        poster_path: this.data.poster_path,
        overview: this.data.overview,
        vote_average: this.data.vote_average,
        release_date: this.data.release_date,
        type: this.type,
      });

      this.message = '✅ Added to favourites!';
      this.messageType = 'success';
    } catch (error) {
      this.message = '❌ Failed to add favourite. Please try again.';
      this.messageType = 'error';
    }

    this.clearMessageAfterDelay();
  }
  clearMessageAfterDelay() {
    setTimeout(() => {
      this.message = '';
      this.messageType = '';
    }, 3000);
  }
}
