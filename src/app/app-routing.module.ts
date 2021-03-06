import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { UserAuthenticatedGuard } from './Core/Guards/user-authenticated.guard';
import { LoginPage } from './Pages/login/login.page';

const routes: Routes = [
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
    canActivate: [UserAuthenticatedGuard],
    loadChildren: () => import('./Pages/empleado/empleado.module').then( m => m.EmpleadoPageModule)
  },
  {
    path: 'equiposMedicion',
    canActivate: [UserAuthenticatedGuard],
    loadChildren: () => import('./Pages/EquipoMedicion/equipos-medicion/equipos-medicion.module').then( m => m.EquiposMedicionPageModule)
  },
  {
    path: 'cliente',
    canActivate: [UserAuthenticatedGuard],
    loadChildren: () => import('./Pages/cliente/cliente.module').then( m => m.ClientePageModule)
  },
  {
    path: 'visita',
    canActivate: [UserAuthenticatedGuard],
    loadChildren: () => import('./Pages/visita/visita.module').then( m => m.VisitaPageModule)
  },
  {
    path: 'plan',
    canActivate: [UserAuthenticatedGuard],
    loadChildren: () => import('./Pages/plan/plan.module').then( m => m.PlanPageModule)
  },
  {
    path: 'empresa',/* 
    canActivate: [UserAuthenticatedGuard], */
    loadChildren: () => import('./Pages/empresa/empresa.module').then( m => m.EmpresaPageModule)
  },
  {
    path: 'establecimiento',
    canActivate: [UserAuthenticatedGuard],
    loadChildren: () => import('./Pages/establecimiento/establecimiento.module').then( m => m.EstablecimientoPageModule)
  },
  {
    path: 'ubicacion',
    canActivate: [UserAuthenticatedGuard],
    loadChildren: () => import('./Pages/ubicacion/ubicacion.module').then( m => m.UbicacionPageModule)
  },
  {
    path: 'dashboard',
    canActivate: [UserAuthenticatedGuard],
    loadChildren: () => import('./Pages/dashboard/dashboard.module').then( m => m.DashboardPageModule)
  },
  {
    path: 'calendario',
    canActivate: [UserAuthenticatedGuard],
    loadChildren: () => import('./Pages/calendario/calendario.module').then( m => m.CalendarioPageModule)
  },
  {
    path: 'irregularidad',
    canActivate: [UserAuthenticatedGuard],
    loadChildren: () => import('./Pages/irregularidad/irregularidad.module').then( m => m.IrregularidadPageModule)
  },
  {
    path: 'licencia',
    canActivate: [UserAuthenticatedGuard],
    loadChildren: () => import('./Pages/licencia/licencia.module').then( m => m.LicenciaPageModule)
  },
  {
    path: 'pago',
    canActivate: [UserAuthenticatedGuard],
    loadChildren: () => import('./Pages/pago/pago.module').then( m => m.PagoPageModule)
  },
  { path: '**', 
    loadChildren: () => import('./Pages/login/login.module').then( m => m.LoginPageModule)
  },  // Wildcard redirect to login
];


@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})

export class AppRoutingModule {}
