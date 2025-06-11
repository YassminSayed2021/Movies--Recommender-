import { inject, Injectable } from '@angular/core';
import {
  Auth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  signOut,
  onAuthStateChanged,
  User,
} from '@angular/fire/auth';
import { BehaviorSubject, from, Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private firebaseAuth = inject(Auth);
  private loggedIn = new BehaviorSubject<boolean>(false);
  isLoggedIn$ = this.loggedIn.asObservable();

  constructor() {
    // Watch auth state
    onAuthStateChanged(this.firebaseAuth, (user: User | null) => {
      this.loggedIn.next(!!user);
    });
  }

  register(
    email: string,
    password: string,
    firstName: string
  ): Observable<void> {
    const promise = createUserWithEmailAndPassword(
      this.firebaseAuth,
      email,
      password
    ).then((response) =>
      updateProfile(response.user, { displayName: firstName })
    );
    return from(promise);
  }

  login(email: string, password: string): Observable<any> {
    return from(signInWithEmailAndPassword(this.firebaseAuth, email, password));
  }

  logout(): void {
    signOut(this.firebaseAuth).then(() => {
      this.loggedIn.next(false);
    });
  }
}
