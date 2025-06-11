import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './components/home-page/home-page.component';
import { NotfoundComponent } from './components/notfound/notfound.component';
import { DetailsPageComponent } from './components/details-page/details-page.component';
import { LayoutComponent } from './components/layout/layout.component';
import { FavoritePageComponent } from './components/favorite-page/favorite-page.component';
import { SearchComponent } from './components/search/search.component';
import { NgModule } from '@angular/core';

export const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: '', component: HomePageComponent },
      {
        path: 'details/:id',
        component: DetailsPageComponent,
        title: 'View Details',
      },
      {
        path: 'favorites',
        component: FavoritePageComponent,
        title: 'Your Favorites',
      },
      {
        path: 'search', component: SearchComponent , title: 'search results'
      }
    ],
  },
  {
    path: '**',
    component: LayoutComponent,
    children: [{ path: '', component: NotfoundComponent, title: 'Error 404' }],
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      anchorScrolling: 'enabled',
      scrollPositionRestoration: 'enabled'
    })
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}

