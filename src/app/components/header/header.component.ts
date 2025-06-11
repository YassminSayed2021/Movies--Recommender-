import { Component, EventEmitter, Output, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { Router, RouterModule } from '@angular/router';
import { FormsModule, NgForm } from '@angular/forms';

declare var bootstrap: any;

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule,FormsModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})

export class HeaderComponent implements AfterViewInit {

    searchQuery: string = '';


  onSearch(form: any): void {
    console.log(form);
    if (this.searchQuery.trim()) {
      this.router.navigate(['/search'], { queryParams: { query: this.searchQuery.trim() } });
    }
  }

  
  @Output() openSignup = new EventEmitter<void>();
  isLoggedIn = false;
  private navbarCollapseInstance: any;

  constructor(private authService: AuthService , private router : Router) {
    this.authService.isLoggedIn$.subscribe((status) => {
      this.isLoggedIn = status;
    });
  }

  ngAfterViewInit(): void {
    const navbar = document.getElementById('navbarContent');
    if (navbar) {
      this.navbarCollapseInstance = new bootstrap.Collapse(navbar, {
        toggle: false,
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
