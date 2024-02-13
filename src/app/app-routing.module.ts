import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { canActivateGuard, canMatchGuard } from './auth/guards/auth.guard';
import { canActivateGuardLogged, canMatchGuardLogged } from './auth/guards/public.guard';

const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then(m=>m.AuthModule),
    canMatch: [canMatchGuardLogged], // Al acceder a la pagina de autentificacion compruebao si el usuario ya esta logeado
    canActivate: [canActivateGuardLogged]
  },
  {
    path: 'heroes',
    loadChildren: ()=>import('./heroes/heroes.module').then(m=>m.HeroesModule),
    canMatch: [canMatchGuard],
    canActivate: [canActivateGuard]
  },
  {
    path: '404',
    redirectTo:'heroes',
    pathMatch:'full'
  },
  {
    path:'',
    redirectTo:'heroes',
    pathMatch:'full'
  },
  {
    path:'**',
    redirectTo:'404'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
