import { Component, EventEmitter, Output, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { RouterModule } from '@angular/router';

declare var bootstrap: any;

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements AfterViewInit {
  @Output() openSignup = new EventEmitter<void>();
  isLoggedIn = false;
  private navbarCollapseInstance: any;

  constructor(private authService: AuthService) {
    this.authService.isLoggedIn$.subscribe((status) => {
      this.isLoggedIn = status;
    });
  }

  ngAfterViewInit(): void {
    const navbar = document.getElementById('navbarContent');
    if (navbar) {
      this.navbarCollapseInstance = new bootstrap.Collapse(navbar, {
        toggle: false, // Important: Don't auto-toggle on init
      });
    }
  }

  onUserIconClick() {
    this.openSignup.emit();
  }

  logout() {
    this.authService.logout();
  }

  toggleNavbar() {
    const navbar = document.getElementById('navbarContent');
    if (!navbar || !this.navbarCollapseInstance) return;

    if (navbar.classList.contains('show')) {
      this.navbarCollapseInstance.hide();
    } else {
      this.navbarCollapseInstance.show();
    }
  }
}
