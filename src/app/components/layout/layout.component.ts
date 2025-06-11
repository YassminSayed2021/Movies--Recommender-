import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import * as bootstrap from 'bootstrap';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { SignupComponent } from '../signup/signup.component';
import { LoginComponent } from '../login/login.component';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [
    RouterModule,
    CommonModule,
    HeaderComponent,
    FooterComponent,
    SignupComponent,
    LoginComponent,
  ],
  templateUrl: './layout.component.html',
})
export class LayoutComponent {
  isLoggedIn = false;

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
    window.location.reload();
  }
}
