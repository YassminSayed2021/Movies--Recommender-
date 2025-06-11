import { Routes } from '@angular/router';
import { HomePageComponent } from './components/home-page/home-page.component';
import { NotfoundComponent } from './components/notfound/notfound.component';
import { DetailsPageComponent } from './components/details-page/details-page.component';
import { LayoutComponent } from './components/layout/layout.component';

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
    ],
  },
  {
    path: '**',
    component: LayoutComponent,
    children: [{ path: '', component: NotfoundComponent, title: 'Error 404' }],
  },
];
