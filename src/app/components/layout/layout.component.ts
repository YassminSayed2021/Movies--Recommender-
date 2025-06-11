import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import * as bootstrap from 'bootstrap';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { SignupComponent } from '../signup/signup.component';
import { LoginComponent } from '../login/login.component';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { Router, NavigationEnd } from '@angular/router';
import { ViewportScroller } from '@angular/common';
import { filter } from 'rxjs/operators';


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

constructor(
  private authService: AuthService,
  private router: Router,
  private viewportScroller: ViewportScroller
) {
  this.authService.isLoggedIn$.subscribe((status) => {
    this.isLoggedIn = status;
  });

this.router.events
  .pipe(filter((e) => e instanceof NavigationEnd))
  .subscribe(() => {
    const fragment = this.router.parseUrl(this.router.url).fragment;
    setTimeout(() => {
      if (fragment) {
        const element = document.getElementById(fragment);
        if (element) {
          const yOffset = -120
          const y =
            element.getBoundingClientRect().top + window.scrollY + yOffset;
          window.scrollTo({ top: y, behavior: 'smooth' });
        }
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }, 100);
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
