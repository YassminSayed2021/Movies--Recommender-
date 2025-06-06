import { Component } from '@angular/core';
import { RecentlyUpdatedComponent } from '../recently-updated/recently-updated.component';
import { NewReleaseComponent } from '../new-release/new-release.component';
import { HeaderComponent } from '../header/header.component';

@Component({
  selector: 'app-home-page',
  imports: [RecentlyUpdatedComponent, NewReleaseComponent, HeaderComponent],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css',
})
export class HomePageComponent {}
