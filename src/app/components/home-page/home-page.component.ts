import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import * as bootstrap from 'bootstrap';
import { LoginComponent } from '../../login/login.component';
import { AiChatComponent } from '../ai-chat/ai-chat.component';
import { FooterComponent } from '../footer/footer.component';
import { HeaderComponent } from '../header/header.component';
import { NewReleaseComponent } from '../new-release/new-release.component';
import { RecentlyUpdatedComponent } from '../recently-updated/recently-updated.component';
import { RecommendedComponent } from '../recommended/recommended.component';
import { SignupComponent } from '../signup/signup.component';
import { SliderComponent } from '../slider/slider.component';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [
    RecentlyUpdatedComponent,
    NewReleaseComponent,
    RecommendedComponent,
    AiChatComponent,
    HeaderComponent,
    FooterComponent,
    SliderComponent,
    SignupComponent,
    LoginComponent,
    CommonModule,
  ],
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css'],
})
export class HomePageComponent {
  isLoggedIn: boolean = false;

  constructor(private authService: AuthService) {
    this.authService.isLoggedIn$.subscribe((status) => {
      this.isLoggedIn = status;
    });
  }

  openSignup() {
    const el = document.getElementById('signupSidebar');
    if (el) {
      const instance = bootstrap.Offcanvas.getOrCreateInstance(el);
      instance.show();
    }
  }

  openLogin() {
    const el = document.getElementById('loginSidebar');
    if (el) {
      const instance = bootstrap.Offcanvas.getOrCreateInstance(el);
      instance.show();
    }
  }

  switchFromSignupToLogin() {
    const signup = bootstrap.Offcanvas.getInstance(
      document.getElementById('signupSidebar')!
    );
    signup?.hide();
    setTimeout(() => this.openLogin(), 300);
  }

  switchFromLoginToSignup() {
    const login = bootstrap.Offcanvas.getInstance(
      document.getElementById('loginSidebar')!
    );
    login?.hide();
    setTimeout(() => this.openSignup(), 300);
  }

  onUserIconClick() {
    if (!this.isLoggedIn) {
      this.openSignup();
    }
  }

  logout() {
    this.authService.logout();
  }
}
