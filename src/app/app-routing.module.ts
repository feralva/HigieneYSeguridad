import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
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
    path: 'empresa',
    loadChildren: () => import('./Pages/Empresa/alta-empresa/alta-empresa.module').then( m => m.AltaEmpresaPageModule)
  },
  {
    path: 'empleado',
    loadChildren: () => import('./Pages/empleado/empleado.module').then( m => m.EmpleadoPageModule)
  },
  {
    path: 'equiposMedicion',
    loadChildren: () => import('./Pages/EquipoMedicion/equipos-medicion/equipos-medicion.module').then( m => m.EquiposMedicionPageModule)
  }
];


@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})

export class AppRoutingModule {}
