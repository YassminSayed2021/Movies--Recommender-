import { Routes } from '@angular/router';
import { HomePageComponent } from './components/home-page/home-page.component';
import { NotfoundComponent } from './components/notfound/notfound.component';

export const routes: Routes = [
    {
        path:'' , component:HomePageComponent
    },
    {
     path:'**' , component:NotfoundComponent, title: 'Error 404'

    }
];
