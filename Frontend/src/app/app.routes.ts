import { Routes } from '@angular/router';
import { AccueilComponent } from './accueil.component';

export const routes: Routes = [
  { path: '', redirectTo: 'Accueil', pathMatch: 'full' },
  { path: 'Accueil', component: AccueilComponent }
];
