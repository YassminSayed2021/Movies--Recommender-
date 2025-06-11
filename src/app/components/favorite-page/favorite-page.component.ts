import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  Firestore,
  collection,
  collectionData,
  doc,
  deleteDoc,
} from '@angular/fire/firestore';
import { getAuth, onAuthStateChanged, User } from 'firebase/auth';
import { Observable, of, Subscription } from 'rxjs';

@Component({
  selector: 'app-favorite-page',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './favorite-page.component.html',
  styleUrl: './favorite-page.component.css',
})
export class FavoritePageComponent implements OnInit, OnDestroy {
  favorites$: Observable<any[]> = of([]);
  userId: string | null = null;
  private authSubscription?: Subscription;

  constructor(private firestore: Firestore) {}

  ngOnInit(): void {
    const auth = getAuth();

    this.authSubscription = new Observable<User | null>((observer) => {
      return onAuthStateChanged(auth, (user) => {
        observer.next(user);
      });
    }).subscribe((user) => {
      if (!user) {
        this.favorites$ = of([]);
        this.userId = null;
        return;
      }

      this.userId = user.uid;

      const favCollection = collection(
        this.firestore,
        `favourites/${user.uid}/items`
      );
      this.favorites$ = collectionData(favCollection, { idField: 'docId' });
    });
  }

  async removeFavorite(docId: string) {
    if (!this.userId) return;

    const favDocRef = doc(
      this.firestore,
      `favourites/${this.userId}/items/${docId}`
    );

    try {
      await deleteDoc(favDocRef);
    } catch (error) {
      console.error('Error deleting favorite:', error);
    }
  }

  ngOnDestroy(): void {
    this.authSubscription?.unsubscribe();
  }
}
