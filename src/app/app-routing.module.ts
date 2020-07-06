import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { UserAuthenticatedGuard } from './Core/Guards/user-authenticated.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    canActivate: [UserAuthenticatedGuard],
    loadChildren: () => import('./Pages/home/home.module').then( m => m.HomePageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./Pages/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'language-popup',
    loadChildren: () => import('./Pages/language-popup/language-popup.module').then( m => m.LanguagePopupPageModule)
  },
  {
    path: 'empleado',
    loadChildren: () => import('./Pages/empleado/empleado.module').then( m => m.EmpleadoPageModule)
  },
  {
    path: 'equiposMedicion',
    loadChildren: () => import('./Pages/EquipoMedicion/equipos-medicion/equipos-medicion.module').then( m => m.EquiposMedicionPageModule)
  },
  {
    path: 'cliente',
    loadChildren: () => import('./Pages/cliente/cliente.module').then( m => m.ClientePageModule)
  },
  {
    path: 'visita',
    loadChildren: () => import('./Pages/visita/visita.module').then( m => m.VisitaPageModule)
  },
  {
    path: 'plan',
    loadChildren: () => import('./Pages/plan/plan.module').then( m => m.PlanPageModule)
  },
  {
    path: 'empresa',
    loadChildren: () => import('./Pages/empresa/empresa.module').then( m => m.EmpresaPageModule)
  },
  {
    path: 'establecimiento',
    loadChildren: () => import('./Pages/establecimiento/establecimiento.module').then( m => m.EstablecimientoPageModule)
  },
  {
    path: 'ubicacion',
    loadChildren: () => import('./Pages/ubicacion/ubicacion.module').then( m => m.UbicacionPageModule)
  },
  {
    path: 'dashboard',
    loadChildren: () => import('./Pages/dashboard/dashboard.module').then( m => m.DashboardPageModule)
  }
];


@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})

export class AppRoutingModule {}
