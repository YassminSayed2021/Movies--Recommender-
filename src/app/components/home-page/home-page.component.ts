import { Component } from '@angular/core';

import { RecentlyUpdatedComponent } from '../recently-updated/recently-updated.component';
import { NewReleaseComponent } from '../new-release/new-release.component';
import { RecommendedComponent } from '../recommended/recommended.component';
import { AiChatComponent } from '../ai-chat/ai-chat.component';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { SliderComponent } from '../slider/slider.component';
import { SignupComponent } from '../signup/signup.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home-page',
  imports: [
    RecentlyUpdatedComponent,
    NewReleaseComponent,
    RecommendedComponent,
    AiChatComponent,
    HeaderComponent,
    FooterComponent,
    SliderComponent,
    SignupComponent,
    CommonModule,
  ],

  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css',
})
export class HomePageComponent {
  showSignup = false;

  toggleSignup(show: boolean) {
    this.showSignup = show;
  }
}
