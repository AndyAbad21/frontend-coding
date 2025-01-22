import { Routes } from '@angular/router';
import { provideRouter } from '@angular/router'; // Para configurar el enrutamiento
import { PredictComponent } from './components/predict/predict.component'; // Importa tu componente
import { HomeComponent } from './components/home/home.component';
import { AboutComponent } from './components/about/about.component';
import { ExplainpComponent } from './components/explainp/explainp.component';
import { FooterComponent } from './components/footer/footer.component';

export const routes: Routes = [
  // { path: '', redirectTo: '/predict', pathMatch: 'full' }, // Ruta inicial
  { path: 'home', component: HomeComponent }, // Ruta para el componente de predicción
  { path: 'predict', component: PredictComponent },
  { path: 'explainp', component: ExplainpComponent },
  { path: 'about', component: AboutComponent },
  { path: 'footer', component: FooterComponent },
  { path: '**', redirectTo: 'home', pathMatch: 'full' }
];
