import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { AiChatComponent } from '../ai-chat/ai-chat.component';
import { NewReleaseComponent } from '../new-release/new-release.component';
import { RecentlyUpdatedComponent } from '../recently-updated/recently-updated.component';
import { RecommendedComponent } from '../recommended/recommended.component';
import { SliderComponent } from '../slider/slider.component';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [
    RecentlyUpdatedComponent,
    NewReleaseComponent,
    RecommendedComponent,
    AiChatComponent,
    SliderComponent,
    CommonModule,
  ],
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css'],
})
export class HomePageComponent {}
