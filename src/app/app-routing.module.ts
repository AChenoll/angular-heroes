import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { canActivateGuard, canMatchGuard } from './auth/guards/auth.guard';

const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then(m=>m.AuthModule)
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
